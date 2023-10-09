/**
 * 
 */
package code.quality.analyzer.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

/**
 * Test CommitsAnalysisUtil class methods
 */
class CommitsAnalysisUtilTest {

	private static String repoPath = "C:\\Users\\rosha\\OneDrive\\Desktop\\test\\Retail-Product-Management-System";
	private static String branch = "main";
	private static String reportPath = repoPath + Constants.REPORT_PATH;
	private static List<String> commitIds = null; 
	
	@BeforeAll
	static void setUp() {
		commitIds = new ArrayList<String>();
		commitIds.add("192dbcc594b418324fbb80cf6ea5f6f369178266");
	}
	
	@Test
	void testGetCommitIdsOneCommit() throws Exception {
		List<String> ids = CommitsAnalysisUtil.getCommitIds(repoPath, branch, Constants.OneCommit);
		assertEquals(false, ids.isEmpty());
		assertEquals(Constants.OneCommit, ids.size());
		assertEquals(commitIds.get(0), ids.get(0));
	}
	
	@Test
	void testGetCommitIdsOneCommitException() throws Exception {
		assertThrows(RefNotFoundException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, "sss", Constants.OneCommit));
		assertThrows(InvalidRefNameException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, null, Constants.OneCommit));
		assertThrows(UnsupportedOperationException.class, () -> CommitsAnalysisUtil.getCommitIds("", branch, Constants.OneCommit));
		assertThrows(UnsupportedOperationException.class, () -> CommitsAnalysisUtil.getCommitIds(null, branch, Constants.OneCommit));
	}
	
	@Test
	void testGenerateReports() throws Exception {
		String path = CommitsAnalysisUtil.generateReports(commitIds, repoPath, branch);
		assertEquals(reportPath, path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
}
