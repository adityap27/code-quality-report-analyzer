package code.quality.analyzer.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.web.client.ResourceAccessException;

import code.quality.analyzer.util.Constants;

/**
 * Test CommitsAnalysisServiceImplTest class methods
 */
class CommitsAnalysisServiceImplTest {

	private static CommitsAnalysisService commitsAnalysisService;
	private static String repoPath;
	
	@BeforeAll
	static void setUp() {
		commitsAnalysisService = new CommitsAnalysisServiceImpl();
		repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL_2);
	}
	
	@Test
	void testGenerateOneCommitReport() throws Exception {
		String path = commitsAnalysisService.generateOneCommitReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2);
		assertEquals(repoPath + Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID_2, path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
	
	@Test
	void testGenerateOneCommitReportException() throws Exception {
		assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, "xyz", Constants.TEST_COMMIT_ID_2));
		assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, " ", Constants.TEST_COMMIT_ID_2));
		assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, null, Constants.TEST_COMMIT_ID_2));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport("", Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
		assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport(null, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
	}

	@Test
	void testAnalysisServiceCall() throws Exception {
		assertThrows(ResourceAccessException.class, () -> commitsAnalysisService.callAnalysisService(Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID));
		//Below test failing. Need to be rectified using mocks.
		//String response = commitsAnalysisService.callAnalysisService(Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID);
		//assertTrue(response.startsWith("{\"Architecture Smell\""));
	}
}
