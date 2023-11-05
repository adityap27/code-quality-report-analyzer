package code.quality.analyzer.service;

import code.quality.analyzer.model.TrendAnalysisRequest;

public interface CommitsAnalysisService {

	/**
	 * Clone git repository
	 * @param gitRepoLink repository link
	 * @return String repository folder path
	 */
	String cloneRepository(String gitRepoLink);
	
	/**
	 * Generate report for one commit analysis
	 * @param repoPath repository path
	 * @param branch branch name
	 * @param commitId commit id selected by user
	 * @return String report path
	 * @throws Exception
	 */
	String generateOneCommitReport(String repoPath, String branch, String commitId) throws Exception;
	
	/**
	 * Call python analysis service
	 * @param reportPath commit reports path
	 * @return String Output json with analysis data
	 */
	String callAnalysisService(String reportPath);
	
	/**
	 * Generate report for trend analysis
	 * @param repoPath repository path
	 * @param branch branch name
	 * @param noOfCommits number of commits
	 * @return TrendAnalysisRequest object
	 * @throws Exception
	 */
	TrendAnalysisRequest generateTrendAnalysisReport(String repoPath, String branch, int noOfCommits) throws Exception;

}
