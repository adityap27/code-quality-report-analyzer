package code.quality.analyzer.service;

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
}
