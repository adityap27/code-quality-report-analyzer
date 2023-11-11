package code.quality.analyzer.service;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.util.Constants;

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
        repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL);
    }

    @Test
    void testGenerateOneCommitReport() throws Exception {
        String path = commitsAnalysisService.generateOneCommitReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2);
        assertEquals(repoPath + Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID_2, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }

    @Test
    void testGenerateOneCommitReportException() throws Exception {
        assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, "xyz", Constants.TEST_COMMIT_ID_1));
        assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, " ", Constants.TEST_COMMIT_ID_2));
        assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, null, Constants.TEST_COMMIT_ID_1));
        assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport("", Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
        assertThrows(UnsupportedOperationException.class, () -> commitsAnalysisService.generateOneCommitReport(null, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
    }

    @Test
    void testCallAnalysisServiceOneCommit() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(8000));
        wireMockServer.start();
        WireMock.configureFor(Constants.TEST_LOCALHOST, 8000);

        stubFor(post(urlEqualTo(Constants.ANALYSIS_SERVICE_ONE_COMMIT_URL))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisServiceOneCommit(Constants.REPORT_PATH + "\\" + Constants.TEST_COMMIT_ID_1);
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
    }
    
    @Test
    void testGenerateTrendAnalysisReport() throws Exception {
    	TrendAnalysisRequest trendAnalysisRequest = commitsAnalysisService.generateTrendAnalysisReport(repoPath, Constants.TEST_BRANCH, 2);
    	assertNotNull(trendAnalysisRequest);
    	assertEquals(2, trendAnalysisRequest.getCommitsData().size());
    	assertEquals(Constants.TEST_USER_2, trendAnalysisRequest.getPreviousCommit().get(Constants.TEST_COMMIT_ID_3));
    	assertEquals(repoPath + Constants.REPORT_PATH, trendAnalysisRequest.getReportPath());
    }
    
    @Test
    void testGenerateTrendAnalysisReportForAllCommits() throws Exception {
    	TrendAnalysisRequest trendAnalysisRequest = commitsAnalysisService.generateTrendAnalysisReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_TOTAL_COMMITS);
    	assertNotNull(trendAnalysisRequest);
    	assertEquals(Constants.TEST_TOTAL_COMMITS, trendAnalysisRequest.getCommitsData().size());
    	assertNull(trendAnalysisRequest.getPreviousCommit());
    	assertEquals(repoPath + Constants.REPORT_PATH, trendAnalysisRequest.getReportPath());
    }
    
    @Test
    void testGenerateTrendAnalysisReportForZeroCommits() throws Exception {
    	assertThrows(InvalidCommitsException.class, () -> commitsAnalysisService.generateTrendAnalysisReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_ZERO));
    }    
    
    @Test
    void testCallAnalysisServiceTrend() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(8000));
        wireMockServer.start();
        WireMock.configureFor(Constants.TEST_LOCALHOST, 8000);

        stubFor(post(urlEqualTo(Constants.ANALYSIS_SERVICE_TREND_URL))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisServiceTrend(new TrendAnalysisRequest());
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
    }
}
