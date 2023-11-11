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
import java.util.Map;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.service.CommitsAnalysisService;
import code.quality.analyzer.service.CommitsAnalysisServiceImpl;

/**
 * Test CommitsAnalysisUtil class methods
 */
class CommitsAnalysisUtilTest {

	private static List<String> commitIds = null;
	private static String repoPath;
	private static CommitsAnalysisService commitsAnalysisService;

	@BeforeEach
	void setUp() {
		commitIds = new ArrayList<String>();
		commitsAnalysisService = new CommitsAnalysisServiceImpl();
		repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL);
	}

	@Test
	void testGetCommitIdsForOneCommit() throws Exception {
		commitIds.add(Constants.TEST_COMMIT_ID_1);
		List<String> ids = new ArrayList<String>(CommitsAnalysisUtil.getCommitIds(repoPath, Constants.TEST_BRANCH, Constants.ONE).keySet());
		assertEquals(false, ids.isEmpty());
		assertEquals(Constants.ONE, ids.size());
		assertEquals(commitIds.get(0), ids.get(0));
	}
	
	@ParameterizedTest
	@CsvSource({"2,2", "1,1", "5,5", "0,0"})
	void testGetCommitIdsForTrend(int noOfCommits, int expectedSize) throws Exception {
		Map<String, String> commitsData = CommitsAnalysisUtil.getCommitIds(repoPath, Constants.TEST_BRANCH, noOfCommits);
		if(noOfCommits == 0) {
			assertEquals(true, commitsData.isEmpty());
		} else {
			assertEquals(false, commitsData.isEmpty());
			assertEquals(Constants.TEST_USER_1, commitsData.get(Constants.TEST_COMMIT_ID_1));
		}
		assertEquals(expectedSize, commitsData.size());
	}

	@Test
	void testGetCommitIdsOneCommitException() throws Exception {
		assertThrows(RefNotFoundException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, "abc", Constants.ONE));
		assertThrows(InvalidRefNameException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, " ", Constants.ONE));
		assertThrows(InvalidRefNameException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, null, Constants.ONE));
		assertThrows(UnsupportedOperationException.class, () -> CommitsAnalysisUtil.getCommitIds("", Constants.TEST_BRANCH, Constants.ONE));
		assertThrows(UnsupportedOperationException.class, () -> CommitsAnalysisUtil.getCommitIds(null, Constants.TEST_BRANCH, Constants.ONE));
	}

	@Test
	void testGenerateReportsForOneCommit() throws Exception {
		commitIds.add(Constants.TEST_COMMIT_ID_1);
		String path = CommitsAnalysisUtil.generateReports(commitIds, repoPath, Constants.TEST_BRANCH);
		assertEquals(repoPath + Constants.REPORT_PATH + "\\" + commitIds.get(0), path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
	
	@Test
	void testGenerateReportsForException() {
		assertThrows(InvalidCommitsException.class, () -> CommitsAnalysisUtil.generateReports(null, repoPath, Constants.TEST_BRANCH));
		assertThrows(InvalidCommitsException.class, () -> CommitsAnalysisUtil.generateReports(new ArrayList<String>(), repoPath, Constants.TEST_BRANCH));
	}
	
	@Test
	void testGenerateReportsForTrend() throws Exception {
		commitIds.add(Constants.TEST_COMMIT_ID_1);
		commitIds.add(Constants.TEST_COMMIT_ID_2);
		commitIds.add(Constants.TEST_COMMIT_ID_3);
		String path = CommitsAnalysisUtil.generateReports(commitIds, repoPath, Constants.TEST_BRANCH);
		assertEquals(repoPath + Constants.REPORT_PATH, path);
		assertEquals(true, Files.exists(Paths.get(path)));
		assertEquals(true, Files.isDirectory(Paths.get(path)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(Constants.TEST_COMMIT_ID_1)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(Constants.TEST_COMMIT_ID_2)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(Constants.TEST_COMMIT_ID_3)));
	}
}
