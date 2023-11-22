package code.quality.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;
import code.quality.analyzer.service.CommitsAnalysisService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://csci5308vm3.research.cs.dal.ca"})
public class CommitsAnalysisController {
	
	@Autowired
	CommitsAnalysisService commitsAnalysisService;
	
	String branch, repoPath;
	
	@PostMapping("/onecommit/getanalysis")
	ResponseEntity<String> getOneCommitAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		setData(commitAnalysisRequest);
		String reportPath = commitsAnalysisService.generateOneCommitReport(repoPath, branch, commitAnalysisRequest.getCommitId());
		String jsonOutput = commitsAnalysisService.callAnalysisServiceOneCommit(reportPath);
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
	
	@PostMapping("/trend/getanalysis")
	ResponseEntity<String> getTrendAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		setData(commitAnalysisRequest);
		int noOfCommits = commitAnalysisRequest.getNoOfCommits();
		TrendAnalysisRequest request = commitsAnalysisService.generateTrendAnalysisReport(repoPath, branch, noOfCommits);
		String jsonOutput = commitsAnalysisService.callAnalysisServiceTrend(request);
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
	
	@PostMapping("/hotspot/getanalysis")
	ResponseEntity<String> getHotspotAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		setData(commitAnalysisRequest);
		String reportPath = commitsAnalysisService.generateHotspotReport(repoPath, branch);
		String jsonOutput = commitsAnalysisService.callAnalysisServiceHotspot(reportPath);
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
	
	private void setData(CommitAnalysisRequest commitAnalysisRequest) {
		repoPath = commitsAnalysisService.cloneRepository(commitAnalysisRequest.getGitRepoLink());
		branch = commitAnalysisRequest.getBranch();
	}
}
