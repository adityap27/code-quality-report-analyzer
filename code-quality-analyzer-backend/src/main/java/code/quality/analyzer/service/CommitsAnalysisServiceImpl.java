package code.quality.analyzer.service;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import code.quality.analyzer.util.CommitsAnalysisUtil;
import code.quality.analyzer.util.Constants;

@Service
public class CommitsAnalysisServiceImpl implements CommitsAnalysisService {

	private static Logger logger = LogManager.getLogger(CommitsAnalysisServiceImpl.class);
	
	@Override
	public String cloneRepository(String gitRepoLink) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String generateCommitsReport(String repoPath, String branch, int noOfCommits) throws Exception {
		logger.info("BEGIN generateCommitsReport()");
		String reportPath = Constants.EMPTY;
		try {
			List<String> commitIds = CommitsAnalysisUtil.getCommitIds(repoPath, branch, noOfCommits);
			reportPath = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		} catch (Exception e) {
			logger.error("Exception Occured while genearting commits report" + e, e);
			throw e;
		}
		return reportPath;
	}

	@Override
	public String callAnalysisService(String repoPath) {
		// TODO Auto-generated method stub
		return null;
	}

}
