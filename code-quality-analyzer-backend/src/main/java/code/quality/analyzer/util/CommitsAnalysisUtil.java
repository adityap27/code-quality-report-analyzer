package code.quality.analyzer.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.internal.storage.file.FileRepository;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;

import Designite.Designite;
import code.quality.analyzer.exception.InvalidCommitsException;

public class CommitsAnalysisUtil {
	
	private static Logger logger = LogManager.getLogger(CommitsAnalysisUtil.class);

	/**
	 * Fetch commit ids for given repository and number of commits
	 * @param repoPath repository path
	 * @param branchname branch name
	 * @param noOfCommits number of commits
	 * @return List<String> list of commit ids
	 * @throws Exception
	 */
	public static List<String> getCommitIds(String repoPath, String branchname, int noOfCommits) throws Exception {
		logger.info("BEGIN getCommitIds()");
		List<String> commitIds = new ArrayList<String>();
		if (noOfCommits == 0) {
			return commitIds;
		}
		Git git = checkoutAndValidate(repoPath, branchname);
		Iterable<RevCommit> commits = git.log().setMaxCount(noOfCommits).call();
		commits.forEach(commit -> commitIds.add(commit.getName()));
		return commitIds;
	}
	
	/**
	 * Validate repoPath and branch name. Checkout to given branch
	 * @param repoPath repository path
	 * @param branchname branch name
	 * @return Git git repository with checked out branch
	 * @throws Exception
	 */
	public static Git checkoutAndValidate(String repoPath, String branchname) throws Exception {
		logger.info("BEGIN checkoutAndValidate()");
		Repository repository = new FileRepository(repoPath + Constants.REPO_SUFFIX);
		Git git = new Git(repository);
		git.checkout().setCreateBranch(false).setName(branchname).call();
		return git;
	}
	
	/**
	 * generate report for given number of commits using designite
	 * @param commitIds from and to commit ids
	 * @param repoPath repository path
	 * @param branch branch name
	 * @return String commits report path
	 * @throws Exception
	 */
	public static String generateReports(List<String> commitIds, String repoPath, String branch) throws Exception {
		logger.info("BEGIN generateReports()");
		if(commitIds == null || commitIds.isEmpty()) {
			throw new InvalidCommitsException("Invalid commits");
		}
		String reportPath = repoPath + Constants.REPORT_PATH;
		String toCommit = commitIds.get(0);
		if(!commitIds.isEmpty() && commitIds.size() != 1) {
			toCommit = commitIds.get(commitIds.size()-1);
		}
		String[] args = new String[] 
			{"-i", repoPath, 
			"-o", reportPath, 
			"-ac", branch, 
			"-fr", commitIds.get(0), 
			"-to", toCommit};
		
		Designite.main(args);
		if(commitIds.size() == 1) {
			reportPath = reportPath + "\\" + commitIds.get(0);
		}
		return reportPath;
	}
}
