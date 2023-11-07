package code.quality.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.service.CommitsAnalysisService;
import code.quality.analyzer.util.Constants;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommitsAnalysisController {
	
	@Autowired
	CommitsAnalysisService commitsAnalysisService;
	
	@PostMapping("/onecommit/getanalysis")
	ResponseEntity<String> getOneCommitAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		String repoPath = commitsAnalysisService.cloneRepository(commitAnalysisRequest.getGitRepoLink());
		String reportPath = commitsAnalysisService.generateOneCommitReport(repoPath, commitAnalysisRequest.getBranch(), commitAnalysisRequest.getCommitId());
		String jsonOutput = commitsAnalysisService.callAnalysisServiceOneCommit(reportPath);
		
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
	
	@PostMapping("/trend/getanalysis")
	ResponseEntity<String> getTrendAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		return new ResponseEntity<String>(Constants.EMPTY, HttpStatus.OK);
	}
}
