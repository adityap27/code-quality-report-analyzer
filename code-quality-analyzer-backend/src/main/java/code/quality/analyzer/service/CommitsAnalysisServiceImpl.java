package code.quality.analyzer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.model.OneCommitAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.util.CommitsAnalysisUtil;
import code.quality.analyzer.util.Constants;
import code.quality.analyzer.util.GitRepository;

@Service
public class CommitsAnalysisServiceImpl implements CommitsAnalysisService {

	private static Logger logger = LogManager.getLogger(CommitsAnalysisServiceImpl.class);

	@Value("${analysis.service.base.url}")
	private String baseUrl;
	
	@Value("${analysis.service.one.commit.url}")
	private String oneCommiUrl;
	
	@Value("${analysis.service.trend.url}")
	private String trendUrl;
	
	@Value("${analysis.service.hotspot.url}")
	private String hotspotUrl;
	
	@Override
	public String cloneRepository(String gitRepoLink) {
		logger.info("BEGIN cloneRepository()");
		GitRepository g = new GitRepository(gitRepoLink, Constants.REPO_PATH);
		g.cloneRepo();
		return g.getLocalRepoFullPath();
	}

	@Override
	public String generateOneCommitReport(String repoPath, String branch, String commitId) throws Exception {
		logger.info("BEGIN generateOneCommitReport()");
		List<String> commitIds = null;
		CommitsAnalysisUtil.checkoutAndValidate(repoPath, branch);
		//If commit id is null or empty, last commit id will be fetched for analysis
		if(commitId == null || commitId.isBlank()) {
			commitIds = new ArrayList<String>(CommitsAnalysisUtil.getCommitIds(repoPath, branch, Constants.ONE).keySet());
		} else {
			commitIds = new ArrayList<String>();
			commitIds.add(commitId);
		}
		String reportPath = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		return reportPath;
	}

	@Override
	public String callAnalysisServiceOneCommit(String repoPath) {
		logger.info("BEGIN callAnalysisServiceOneCommit()");
		RestTemplate restTemplate = new RestTemplate();

		OneCommitAnalysisRequest req = new OneCommitAnalysisRequest();
		req.setReportPath(repoPath);
		HttpEntity<OneCommitAnalysisRequest> request = new HttpEntity<>(req);
		ResponseEntity<String> response = restTemplate
				.exchange(baseUrl + oneCommiUrl, HttpMethod.POST, request, String.class);

		return response.getBody();
	}

	@Override
	public TrendAnalysisRequest generateTrendAnalysisReport(String repoPath, String branch, int noOfCommits)
			throws Exception {
		logger.info("BEGIN generateTrendAnalysisReport()");
		TrendAnalysisRequest trendAnalysisRequest = null;
		if(noOfCommits == 0) {
			throw new InvalidCommitsException("Invalid number of commits");
		}
		Map<String, String> commitsData = CommitsAnalysisUtil.getCommitIds(repoPath, branch, noOfCommits+1);
		List<String> commitIds = new ArrayList<String>(commitsData.keySet());
		String reportPath = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		Map<String, String> previousCommit = null;
		if(commitIds.size() == noOfCommits+1) {
			previousCommit = new HashMap<String, String>();
			String previousCommitId = commitIds.get(commitIds.size()-1);
			String previousUser = commitsData.remove(previousCommitId);
			previousCommit.put(previousCommitId, previousUser);
		}
		trendAnalysisRequest = new TrendAnalysisRequest();
		trendAnalysisRequest.setCommitsData(commitsData);
		trendAnalysisRequest.setPreviousCommit(previousCommit);
		trendAnalysisRequest.setReportPath(reportPath);
		return trendAnalysisRequest;
	}

	@Override
	public String callAnalysisServiceTrend(TrendAnalysisRequest trendAnalysisRequest) {
		logger.info("BEGIN callAnalysisServiceTrend()");
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<TrendAnalysisRequest> request = new HttpEntity<>(trendAnalysisRequest);
		ResponseEntity<String> response = restTemplate
				.exchange(baseUrl + trendUrl, HttpMethod.POST, request, String.class);
		return response.getBody();
	}

	@Override
	public String generateHotspotReport(String repoPath, String branch) throws Exception {
		return null;
	}

	@Override
	public String callAnalysisServiceHotspot(String reportPath) {
		return null;
	}
}
