package code.quality.analyzer.controller;

import static code.quality.analyzer.util.Constants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.service.CommitsAnalysisServiceImpl;

/**
 * Test OneCommitAnalysisController rest services
 */
@WebMvcTest
@ExtendWith(MockitoExtension.class)
public class CommitsAnalysisControllerTest {

	@InjectMocks
	CommitsAnalysisController oneCommitAnalysisController;
	
	@Autowired
	@Mock CommitsAnalysisServiceImpl commitsAnalysisService;
	
	CommitAnalysisRequest commitAnalysisRequest;
	MockMvc mockMvc;
	
	@BeforeEach
	void setUp() {
		commitAnalysisRequest = new CommitAnalysisRequest();
		commitAnalysisRequest.setGitRepoLink(REPO_URL);
		commitAnalysisRequest.setBranch(BRANCH);
		mockMvc = MockMvcBuilders.standaloneSetup(oneCommitAnalysisController).build();
		when(commitsAnalysisService.cloneRepository(anyString())).thenCallRealMethod();
	}
	
	@Test
	void testGetOneCommitAnalysis() throws Exception {
		when(commitsAnalysisService.generateOneCommitReport(anyString(), anyString(), any())).thenCallRealMethod();
		when(commitsAnalysisService.callAnalysisServiceOneCommit(anyString())).thenReturn(ANALYSIS_RESPONSE);
		callServiceAndTest(ONE_COMMIT_URL);
	}
	
	@Test
	void testGetTrendAnalysis() throws Exception {
		commitAnalysisRequest.setNoOfCommits(TOTAL_COMMITS_2);
		when(commitsAnalysisService.generateTrendAnalysisReport(anyString(), anyString(), anyInt())).thenCallRealMethod();
		when(commitsAnalysisService.callAnalysisServiceTrend(any(TrendAnalysisRequest.class))).thenReturn(ANALYSIS_RESPONSE);
		callServiceAndTest(TREND_URL);
	}
	
	@Test
	void testGetOneCommitAnalysisForRemoteBranch() throws Exception {
		commitAnalysisRequest.setBranch(REMOTE_BRANCH);
		when(commitsAnalysisService.generateOneCommitReport(anyString(), anyString(), any())).thenCallRealMethod();
		when(commitsAnalysisService.callAnalysisServiceOneCommit(anyString())).thenReturn(ANALYSIS_RESPONSE);
		callServiceAndTest(ONE_COMMIT_URL);
	}
	
	@Test
	void testGetTrendAnalysisForRemoteBranch() throws Exception {
		commitAnalysisRequest.setBranch(REMOTE_BRANCH);
		commitAnalysisRequest.setNoOfCommits(TOTAL_COMMITS_2);
		when(commitsAnalysisService.generateTrendAnalysisReport(anyString(), anyString(), anyInt())).thenCallRealMethod();
		when(commitsAnalysisService.callAnalysisServiceTrend(any(TrendAnalysisRequest.class))).thenReturn(ANALYSIS_RESPONSE);
		callServiceAndTest(TREND_URL);
	}
	
	@Test
	void testGetHotspotAnalysis() throws Exception {
		when(commitsAnalysisService.generateHotspotReport(anyString(), anyString())).thenCallRealMethod();
		when(commitsAnalysisService.callAnalysisServiceHotspot(anyString())).thenReturn(ANALYSIS_RESPONSE);
		callServiceAndTest(HOTSPOT_URL);
	}
	
	public void callServiceAndTest(String url) throws Exception {
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(url)
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(commitAnalysisRequest)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn();
		String response = mvcResult.getResponse().getContentAsString();
		assertNotNull(response);
		assertEquals(ANALYSIS_RESPONSE, response);
	}
}
