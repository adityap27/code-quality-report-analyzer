package code.quality.analyzer.service;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import code.quality.analyzer.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test CommitsAnalysisServiceImplTest class methods
 */
@ExtendWith(MockitoExtension.class)
class CommitsAnalysisServiceImplTest {
    private static CommitsAnalysisService commitsAnalysisService;
    private static String repoPath;

    @Autowired
    private static WireMockServer wireMockServer;

    @BeforeAll
    static void setUp() {
        commitsAnalysisService = new CommitsAnalysisServiceImpl();
        repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL_2);
    }

    @Test
    void testGenerateOneCommitReport() throws Exception {
        String path = commitsAnalysisService.generateOneCommitReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2);
        assertEquals(repoPath + Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID_2, path);
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
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(8000));
        wireMockServer.start();
        WireMock.configureFor("localhost", 8000);

        stubFor(post(urlEqualTo("/smell_analysis/"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisService(Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID);
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
    }
}
