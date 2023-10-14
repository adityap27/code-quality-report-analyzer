package code.quality.analyzer.service;

import java.util.ArrayList;
import java.util.List;

import code.quality.analyzer.util.GitRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.springframework.stereotype.Service;

import code.quality.analyzer.util.CommitsAnalysisUtil;
import code.quality.analyzer.util.Constants;

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
		if(branch.isBlank()) {
			throw new RefNotFoundException("Invalid branch name");
		}
		List<String> commitIds = new ArrayList<String>();
		//If commit id is null or empty, last commit id will be fetched for analysis 
		if(commitId.isBlank()) {
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
	public String callAnalysisService(String repoPath) {
		// TODO Auto-generated method stub
		return null;
	}
}
