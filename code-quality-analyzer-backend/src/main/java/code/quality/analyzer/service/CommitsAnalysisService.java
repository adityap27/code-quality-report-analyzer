package code.quality.analyzer.service;

public interface CommitsAnalysisService {

	/**
	 * Clone git repository
	 * @param gitRepoLink repository link
	 * @return String repository folder path
	 */
	String cloneRepository(String gitRepoLink);
	
	/**
	 * Ganenerate report for given repository using designite
	 * @param repoPath repository path
	 * @param branch branch name
	 * @param noOfCommits no of commits for analysis
	 * @return String commits report paths
	 * @throws Exception
	 */
	String generateCommitsReport(String repoPath, String branch, int noOfCommits) throws Exception;
	
	/**
	 * Call python analysis service
	 * @param reportPath commit reports path
	 * @return String Output json with analysis data
	 */
	String callAnalysisService(String reportPath);
}
