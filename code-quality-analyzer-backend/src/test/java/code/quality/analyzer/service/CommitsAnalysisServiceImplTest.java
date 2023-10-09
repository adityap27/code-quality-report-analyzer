/**
 * 
 */
package code.quality.analyzer.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import code.quality.analyzer.util.Constants;

/**
 * Test CommitsAnalysisServiceImplTest class methods
 */
class CommitsAnalysisServiceImplTest {

	private static String repoPath = "C:\\Users\\rosha\\OneDrive\\Desktop\\test\\Retail-Product-Management-System";
	private static String branch = "main";
	private static String reportPath = repoPath + Constants.REPORT_PATH;
	
	private static CommitsAnalysisService commitsAnalysisService;
	
	@BeforeAll
	static void setUp() {
		commitsAnalysisService = new CommitsAnalysisServiceImpl();
	}
	
	@Test
	void testGenerateCommitsReport() throws Exception {
		String path = commitsAnalysisService.generateCommitsReport(repoPath, branch, Constants.OneCommit);
		assertEquals(reportPath, path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
	
	@Test
	void testGenerateCommitsReportException() throws Exception {
		assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateCommitsReport(repoPath, "xyz", Constants.OneCommit));
		assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateCommitsReport(repoPath, null, Constants.OneCommit));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateCommitsReport("", branch, Constants.OneCommit));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateCommitsReport(null, branch, Constants.OneCommit));
	}
}
