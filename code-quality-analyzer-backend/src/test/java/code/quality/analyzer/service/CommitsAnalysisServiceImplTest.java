package code.quality.analyzer.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

	private static CommitsAnalysisService commitsAnalysisService;
	
	@BeforeAll
	static void setUp() {
		commitsAnalysisService = new CommitsAnalysisServiceImpl();
	}
	
	@Test
	void testGenerateOneCommitReport() throws Exception {
		String path = commitsAnalysisService.generateOneCommitReport(Constants.TEST_REPO_PATH, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID);
		assertEquals(Constants.TEST_REPORT_PATH, path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
	
	@Test
	void testGenerateOneCommitReportException() throws Exception {
		assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport(Constants.TEST_REPO_PATH, "xyz", Constants.TEST_COMMIT_ID));
		assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(Constants.TEST_REPO_PATH, " ", Constants.TEST_COMMIT_ID));
		assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(Constants.TEST_REPO_PATH, null, Constants.TEST_COMMIT_ID));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport("", Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport(null, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID));
	}

	@Test
	void testAnalysisServiceCall() throws Exception {
		String response = commitsAnalysisService.callAnalysisService(Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID);
		assertTrue(response.startsWith("{\"Architecture Smell\""));
	}
}
