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
	 * Call python analysis service for one commit analysis
	 * @param reportPath commit reports path
	 * @return String Output json with analysis data
	 */
	String callAnalysisServiceOneCommit(String reportPath);
	
	/**
	 * Generate report for trend analysis
	 * @param repoPath repository path
	 * @param branch branch name
	 * @param noOfCommits number of commits
	 * @return TrendAnalysisRequest object
	 * @throws Exception
	 */
	TrendAnalysisRequest generateTrendAnalysisReport(String repoPath, String branch, int noOfCommits) throws Exception;

	/**
	 * Call python analysis service for trend analysis
	 * @param trendAnalysisRequest request object
	 * @return String output json data
	 */
	String callAnalysisServiceTrend(TrendAnalysisRequest trendAnalysisRequest);
	
	/**
	 * Generate report for hotspot analysis
	 * @param repoPath repository path
	 * @param branch branch name
	 * @return String report path
	 * @throws Exception
	 */
	String generateHotspotReport(String repoPath, String branch) throws Exception;
	
	/**
	 * Call python analysis service for hotspot analysis
	 * @param reportPath report path
	 * @return String Output json with analysis data
	 */
	String callAnalysisServiceHotspot(String reportPath);
}
