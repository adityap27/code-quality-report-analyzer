package code.quality.analyzer.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.model.SmellAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.util.CommitsAnalysisUtil;
import code.quality.analyzer.util.Constants;
import code.quality.analyzer.util.GitRepository;

@Service
public class CommitsAnalysisServiceImpl implements CommitsAnalysisService {

	private static Logger logger = LogManager.getLogger(CommitsAnalysisServiceImpl.class);

	@Override
	public String cloneRepository(String gitRepoLink) {
		GitRepository g = new GitRepository(gitRepoLink, Constants.REPO_PATH);
		g.cloneRepo();
		return g.getLocalRepoFullPath();
	}

	@Override
	public String generateOneCommitReport(String repoPath, String branch, String commitId) throws Exception {
		logger.info("BEGIN generateOneCommitReport()");
		String reportPath = Constants.EMPTY;
		List<String> commitIds = new ArrayList<String>();
		CommitsAnalysisUtil.checkoutAndValidate(repoPath, branch);
		//If commit id is null or empty, last commit id will be fetched for analysis
		if(commitId == null || commitId.isBlank()) {
			commitIds = CommitsAnalysisUtil.getCommitIds(repoPath, branch, Constants.OneCommit);
		} else {
			commitIds.add(commitId);
		}
		try {
			reportPath = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		} catch (Exception e) {
			logger.error("Exception Occured while genearting one commit report" + e, e);
			throw e;
		}
		return reportPath;
	}

	@Override
	public String callAnalysisServiceOneCommit(String repoPath) {
		RestTemplate restTemplate = new RestTemplate();

		SmellAnalysisRequest req = new SmellAnalysisRequest();
		req.setPath(repoPath);

		HttpEntity<SmellAnalysisRequest> request = new HttpEntity<>(req);
		ResponseEntity<String> response = restTemplate
				.exchange(Constants.ANALYSIS_SERVICE_BASE_URL + Constants.ANALYSIS_SERVICE_ONE_COMMIT_URL, HttpMethod.POST, request, String.class);

		return response.getBody();
	}

	@Override
	public TrendAnalysisRequest generateTrendAnalysisReport(String repoPath, String branch, int noOfCommits)
			throws Exception {
		TrendAnalysisRequest trendAnalysisRequest = null;
		if(noOfCommits == 0) {
			throw new InvalidCommitsException("Invalid number of commits");
		}
		List<String> commitIds = CommitsAnalysisUtil.getCommitIds(repoPath, branch, noOfCommits+1);
		String reportPath = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		String previousCommitId = null;
		if(commitIds.size() == noOfCommits+1) {
			previousCommitId = commitIds.remove(commitIds.size()-1);
		}
		Collections.reverse(commitIds);
		trendAnalysisRequest = new TrendAnalysisRequest();
		trendAnalysisRequest.setCommitIds(commitIds);
		trendAnalysisRequest.setPreviousCommitId(previousCommitId);
		trendAnalysisRequest.setReportPath(reportPath);
		return trendAnalysisRequest;
	}
}
