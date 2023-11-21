package code.quality.analyzer.service;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.util.Constants;

/**
 * Test CommitsAnalysisServiceImplTest class methods
 */
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@TestPropertySource("classpath:application.properties")
class CommitsAnalysisServiceImplTest {
    private static CommitsAnalysisService commitsAnalysisService;
    private static String repoPath;

    @Autowired
    private static WireMockServer wireMockServer;

    @Value("${analysis.service.base.url}")
	private String baseUrl;

	@Value("${analysis.service.one.commit.url}")
	private String oneCommiUrl;

	@Value("${analysis.service.trend.url}")
	private String trendUrl;
	
	@Value("${analysis.service.hotspot.url}")
	private String hotspotUrl;

    @BeforeEach
    void setUp() {
        commitsAnalysisService = new CommitsAnalysisServiceImpl();
        ReflectionTestUtils.setField(commitsAnalysisService, "baseUrl", baseUrl);
        ReflectionTestUtils.setField(commitsAnalysisService, "oneCommiUrl", oneCommiUrl);
        ReflectionTestUtils.setField(commitsAnalysisService, "trendUrl", trendUrl);
        ReflectionTestUtils.setField(commitsAnalysisService, "hotspotUrl", hotspotUrl);
        repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL);
    }

    @Test
    void testGenerateOneCommitReport() throws Exception {
        String path = commitsAnalysisService.generateOneCommitReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2);
        assertEquals(repoPath + Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID_2, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }
    
    @Test
    void testGenerateOneCommitReportForRemoteBranch() throws Exception {
    	String repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL);
        String path = commitsAnalysisService.generateOneCommitReport(repoPath, Constants.TEST_REMOTE_BRANCH, Constants.TEST_REMOTE_COMMIT_ID_1);
        assertEquals(repoPath + Constants.REPORT_PATH + "/" + Constants.TEST_REMOTE_COMMIT_ID_1, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }

    @Test
    void testGenerateOneCommitReportException() throws Exception {
    	assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, "xyz", Constants.TEST_COMMIT_ID_1));
        assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, " ", Constants.TEST_COMMIT_ID_2));
        assertThrows(InvalidRefNameException.class, () -> commitsAnalysisService.generateOneCommitReport(repoPath, null, Constants.TEST_COMMIT_ID_1));
        assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport("", Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
        assertThrows(RefNotFoundException.class, () -> commitsAnalysisService.generateOneCommitReport(null, Constants.TEST_BRANCH, Constants.TEST_COMMIT_ID_2));
    }

    @Test
    void testCallAnalysisServiceOneCommit() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(Constants.TEST_PORT));
        wireMockServer.start();
        WireMock.configureFor(Constants.TEST_LOCALHOST, Constants.TEST_PORT);
        stubFor(post(urlEqualTo(oneCommiUrl))
                .willReturn(aResponse()
                        .withStatus(Constants.TEST_HTTP_STATUS)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisServiceOneCommit(Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID_1);
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
        wireMockServer.stop();
    }

    @Test
    void testGenerateTrendAnalysisReport() throws Exception {
    	TrendAnalysisRequest trendAnalysisRequest = commitsAnalysisService.generateTrendAnalysisReport(repoPath, Constants.TEST_BRANCH, Constants.TEST_TOTAL_COMMITS_2);
    	assertNotNull(trendAnalysisRequest);
    	assertEquals(2, trendAnalysisRequest.getCommitsData().size());
    	assertEquals(Constants.TEST_USER_2, trendAnalysisRequest.getPreviousCommit().get(Constants.TEST_COMMIT_ID_3));
    	assertEquals(repoPath + Constants.REPORT_PATH, trendAnalysisRequest.getReportPath());
    }

    @Test
    void testGenerateTrendAnalysisReportForRemoteBranch() throws Exception {
    	String repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL);
    	TrendAnalysisRequest trendAnalysisRequest = commitsAnalysisService.generateTrendAnalysisReport(repoPath, Constants.TEST_REMOTE_BRANCH, Constants.TEST_TOTAL_COMMITS_2);
    	assertNotNull(trendAnalysisRequest);
    	assertEquals(2, trendAnalysisRequest.getCommitsData().size());
    	assertEquals(repoPath + Constants.REPORT_PATH, trendAnalysisRequest.getReportPath());
    }
    
    @Test
    void testGenerateTrendAnalysisReportForAllCommits() throws Exception {
    	repoPath = commitsAnalysisService.cloneRepository(Constants.TEST_REPO_URL_ALLCOMMITS);
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
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(Constants.TEST_PORT));
        wireMockServer.start();
        WireMock.configureFor(Constants.TEST_LOCALHOST, Constants.TEST_PORT);
        stubFor(post(urlEqualTo(trendUrl))
                .willReturn(aResponse()
                        .withStatus(Constants.TEST_HTTP_STATUS)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisServiceTrend(new TrendAnalysisRequest());
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
        wireMockServer.stop();
    }
    
    @Test
    void testGenerateHotspotReport() throws Exception {
        String path = commitsAnalysisService.generateHotspotReport(repoPath, Constants.TEST_BRANCH);
        assertEquals(repoPath + Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID_1, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }
    
    @Test
    void testCallAnalysisServiceHotspot() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(Constants.TEST_PORT));
        wireMockServer.start();
        WireMock.configureFor(Constants.TEST_LOCALHOST, Constants.TEST_PORT);
        stubFor(post(urlEqualTo(hotspotUrl))
                .willReturn(aResponse()
                        .withStatus(Constants.TEST_HTTP_STATUS)
                        .withHeader("Content-Type", "application/json")
                        .withBody(Constants.ANALYSIS_SERVICE_TEST_RESPONSE)));

        String response = commitsAnalysisService.callAnalysisServiceHotspot(Constants.REPORT_PATH + "/" + Constants.TEST_COMMIT_ID_1);
        assertNotNull(response);
        assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
        wireMockServer.stop();
    }
}
