/**
 *
 */
package code.quality.analyzer.util;

import static code.quality.analyzer.util.Constants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;

import code.quality.analyzer.exception.InvalidCommitsException;

/**
 * Test CommitsAnalysisUtil class methods
 */
class CommitsAnalysisUtilTest {

	private static List<String> commitIds = null;
	private static String repoPath;

	@BeforeEach
	void setUp() {
		commitIds = new ArrayList<String>();
		repoPath = CommitsAnalysisUtil.cloneRepository(REPO_URL);
	}

	@Test
	void testGetCommitIdsForOneCommitAndHotspot() throws Exception {
		commitIds.add(COMMIT1);
		List<String> ids = new ArrayList<String>(CommitsAnalysisUtil.getCommitIds(repoPath, BRANCH, ONE).keySet());
		assertEquals(false, ids.isEmpty());
		assertEquals(ONE, ids.size());
		assertEquals(commitIds.get(0), ids.get(0));
	}
	
	@ParameterizedTest
	@CsvSource({"2,2", "1,1", "5,5", "0,0"})
	void testGetCommitIdsForTrend(int noOfCommits, int expectedSize) throws Exception {
		Map<String, String> commitsData = CommitsAnalysisUtil.getCommitIds(repoPath, BRANCH, noOfCommits);
		if(noOfCommits == 0) {
			assertEquals(true, commitsData.isEmpty());
		} else {
			assertEquals(false, commitsData.isEmpty());
			assertEquals(USER1, commitsData.get(COMMIT1));
		}
		assertEquals(expectedSize, commitsData.size());
	}

	@Test
	void testGetCommitIdsExceptionInvalidBranch() throws Exception {
		assertThrows(RefNotFoundException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, "abc", Constants.ONE));
		assertThrows(InvalidRefNameException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, " ", Constants.ONE));
		assertThrows(InvalidRefNameException.class, () -> CommitsAnalysisUtil.getCommitIds(repoPath, null, Constants.ONE));
	}

	@ParameterizedTest
	@MethodSource("invalidRepo")
	void testGetCommitIdsExceptionInvalidRepo(String repo) throws Exception {
		assertThrows(RefNotFoundException.class, () -> CommitsAnalysisUtil.getCommitIds(repo, BRANCH, ONE));
	}
	
	@Test
	void testGenerateReportsForOneCommitAndHotspot() throws Exception {
		commitIds.add(COMMIT1);
		String path = CommitsAnalysisUtil.generateReports(commitIds, repoPath, BRANCH);
		assertEquals(repoPath + REPORT_PATH + "/" + commitIds.get(0), path);
		assertEquals(true, Files.exists(Paths.get(path)));
	}
	
	@Test
	void testGenerateReportsForException() {
		List<String> emptyList = new ArrayList<String>();
		assertThrows(InvalidCommitsException.class, () -> CommitsAnalysisUtil.generateReports(null, repoPath, BRANCH));
		assertThrows(InvalidCommitsException.class, () -> CommitsAnalysisUtil.generateReports(emptyList, repoPath, BRANCH));
	}
	
	@Test
	void testGenerateReportsForTrend() throws Exception {
		commitIds.add(COMMIT1);
		commitIds.add(COMMIT2);
		commitIds.add(COMMIT3);
		String path = CommitsAnalysisUtil.generateReports(commitIds, repoPath, BRANCH);
		assertEquals(repoPath + REPORT_PATH, path);
		assertEquals(true, Files.exists(Paths.get(path)));
		assertEquals(true, Files.isDirectory(Paths.get(path)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(COMMIT1)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(COMMIT2)));
		assertEquals(true, Files.exists(Paths.get(path).resolve(COMMIT3)));
	}
	
	private static Stream<String> invalidRepo() {
        return Stream.of(EMPTY, null);
    }
}
