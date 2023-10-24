package code.quality.analyzer.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
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
import code.quality.analyzer.service.CommitsAnalysisServiceImpl;
import code.quality.analyzer.util.Constants;

/**
 * Test OneCommitAnalysisController rest api
 */
@WebMvcTest
@ExtendWith(MockitoExtension.class)
public class OneCommitAnalysisControllerTest {

	@InjectMocks
	OneCommitAnalysisController oneCommitAnalysisController;
	
	@Autowired
	@Mock CommitsAnalysisServiceImpl commitsAnalysisService;
	
	CommitAnalysisRequest commitAnalysisRequest;
	MockMvc mockMvc;
	
	@BeforeEach
	void setUp() {
		commitAnalysisRequest = new CommitAnalysisRequest();
		commitAnalysisRequest.setGitRepoLink(Constants.TEST_REPO_URL);
		commitAnalysisRequest.setBranch("main");
		mockMvc = MockMvcBuilders.standaloneSetup(oneCommitAnalysisController).build();
	}
	
	@Test
	void testGetOneCommitAnalysis() throws Exception {
		when(commitsAnalysisService.callAnalysisService(anyString())).thenReturn(Constants.ANALYSIS_SERVICE_TEST_RESPONSE);
		when(commitsAnalysisService.cloneRepository(any())).thenCallRealMethod();
		when(commitsAnalysisService.generateOneCommitReport(any(), any(), any())).thenCallRealMethod();
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(Constants.ONE_COMMIT_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(commitAnalysisRequest)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn();
		
		String response = mvcResult.getResponse().getContentAsString();
		assertNotNull(response);
		assertEquals(Constants.ANALYSIS_SERVICE_TEST_RESPONSE, response);
	}
}
