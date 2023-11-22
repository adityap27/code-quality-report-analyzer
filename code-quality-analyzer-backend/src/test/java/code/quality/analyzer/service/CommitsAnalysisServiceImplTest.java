package code.quality.analyzer.service;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static code.quality.analyzer.util.Constants.*;
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
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;

import code.quality.analyzer.exception.InvalidCommitsException;
import code.quality.analyzer.model.TrendAnalysisRequest;

/**
 * Test CommitsAnalysisServiceImplTest class methods
 */
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@TestPropertySource("classpath:application.properties")
class CommitsAnalysisServiceImplTest {
    private static CommitsAnalysisService analysisService;
    private static String repoPath;
    ResponseDefinitionBuilder builder;

    @Autowired
    private static WireMockServer wireMockServer;

    @Value("${analysis.service.base.url}")
	private String baseUrl;

	@Value("${analysis.service.one.commit.url}")
	private String oneCommitUrl;

	@Value("${analysis.service.trend.url}")
	private String trendUrl;
	
	@Value("${analysis.service.hotspot.url}")
	private String hotspotUrl;

    @BeforeEach
    void setUp() {
        analysisService = new CommitsAnalysisServiceImpl();
        ReflectionTestUtils.setField(analysisService, "baseUrl", baseUrl);
        ReflectionTestUtils.setField(analysisService, "oneCommitUrl", oneCommitUrl);
        ReflectionTestUtils.setField(analysisService, "trendUrl", trendUrl);
        ReflectionTestUtils.setField(analysisService, "hotspotUrl", hotspotUrl);
        repoPath = analysisService.cloneRepository(REPO_URL);
        builder = aResponse().withStatus(HTTP_STATUS).withHeader("Content-Type", "application/json").withBody(ANALYSIS_RESPONSE);
    }

    @Test
    void testGenerateOneCommitReport() throws Exception {
        String path = analysisService.generateOneCommitReport(repoPath, BRANCH, COMMIT2);
        assertEquals(repoPath + REPORT_PATH + "/" + COMMIT2, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }
    
    @Test
    void testGenerateOneCommitReportForRemoteBranch() throws Exception {
        String path = analysisService.generateOneCommitReport(repoPath, REMOTE_BRANCH, REMOTE_COMMIT);
        assertEquals(repoPath + REPORT_PATH + "/" + REMOTE_COMMIT, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }

    @Test
    void testGenerateOneCommitReportException() throws Exception {
    	assertThrows(RefNotFoundException.class, () -> analysisService.generateOneCommitReport(repoPath, "xyz", COMMIT1));
        assertThrows(InvalidRefNameException.class, () -> analysisService.generateOneCommitReport(repoPath, " ", COMMIT2));
        assertThrows(InvalidRefNameException.class, () -> analysisService.generateOneCommitReport(repoPath, null, COMMIT1));
        assertThrows(RefNotFoundException.class, () -> analysisService.generateOneCommitReport("", BRANCH, COMMIT2));
        assertThrows(RefNotFoundException.class, () -> analysisService.generateOneCommitReport(null, BRANCH, COMMIT2));
    }

    @Test
    void testCallAnalysisServiceOneCommit() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(PORT));
        wireMockServer.start();
        WireMock.configureFor(LOCALHOST, PORT);
        stubFor(post(urlEqualTo(oneCommitUrl)).willReturn(builder));

        String response = analysisService.callAnalysisServiceOneCommit(REPORT_PATH + "/" + COMMIT1);
        assertNotNull(response);
        assertEquals(ANALYSIS_RESPONSE, response);
        wireMockServer.stop();
    }

    @Test
    void testGenerateTrendAnalysisReport() throws Exception {
    	TrendAnalysisRequest request = analysisService.generateTrendAnalysisReport(repoPath, BRANCH, TOTAL_COMMITS_2);
    	assertNotNull(request);
    	assertEquals(TOTAL_COMMITS_2, request.getCommitsData().size());
    	assertEquals(USER2, request.getPreviousCommit().get(COMMIT3));
    	assertEquals(repoPath + REPORT_PATH, request.getReportPath());
    }

    @Test
    void testGenerateTrendAnalysisReportForRemoteBranch() throws Exception {
    	TrendAnalysisRequest request = analysisService.generateTrendAnalysisReport(repoPath, REMOTE_BRANCH, TOTAL_COMMITS_2);
    	assertNotNull(request);
    	assertEquals(TOTAL_COMMITS_2, request.getCommitsData().size());
    	assertEquals(repoPath + REPORT_PATH, request.getReportPath());
    }
    
    @Test
    void testGenerateTrendAnalysisReportForAllCommits() throws Exception {
    	repoPath = analysisService.cloneRepository(REPO_URL_ALLCOMMITS);
    	TrendAnalysisRequest request = analysisService.generateTrendAnalysisReport(repoPath, BRANCH, TOTAL_COMMITS_1);
    	assertNotNull(request);
    	assertEquals(TOTAL_COMMITS_1, request.getCommitsData().size());
    	assertNull(request.getPreviousCommit());
    	assertEquals(repoPath + REPORT_PATH, request.getReportPath());
    }

    @Test
    void testGenerateTrendAnalysisReportForZeroCommits() throws Exception {
    	assertThrows(InvalidCommitsException.class, () -> analysisService.generateTrendAnalysisReport(repoPath, BRANCH, ZERO));
    }

    @Test
    void testCallAnalysisServiceTrend() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(PORT));
        wireMockServer.start();
        WireMock.configureFor(LOCALHOST, PORT);
        stubFor(post(urlEqualTo(trendUrl)).willReturn(builder));

        String response = analysisService.callAnalysisServiceTrend(new TrendAnalysisRequest());
        assertNotNull(response);
        assertEquals(ANALYSIS_RESPONSE, response);
        wireMockServer.stop();
    }
    
    @Test
    void testGenerateHotspotReport() throws Exception {
        String path = analysisService.generateHotspotReport(repoPath, BRANCH);
        assertEquals(repoPath + REPORT_PATH + "/" + COMMIT1, path);
        assertEquals(true, Files.exists(Paths.get(path)));
    }
    
    @Test
    void testCallAnalysisServiceHotspot() throws Exception {
        wireMockServer = new WireMockServer(new WireMockConfiguration().port(PORT));
        wireMockServer.start();
        WireMock.configureFor(LOCALHOST, PORT);
        stubFor(post(urlEqualTo(hotspotUrl)).willReturn(builder));

        String response = analysisService.callAnalysisServiceHotspot(REPORT_PATH + "/" + COMMIT1);
        assertNotNull(response);
        assertEquals(ANALYSIS_RESPONSE, response);
        wireMockServer.stop();
    }
}
