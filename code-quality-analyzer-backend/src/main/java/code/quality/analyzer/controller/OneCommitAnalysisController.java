package code.quality.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.service.CommitsAnalysisService;

@RestController
@RequestMapping("/onecommit")
public class OneCommitAnalysisController {
	
	@Autowired
	CommitsAnalysisService commitsAnalysisService;
	
	@PostMapping("/getanalysis")
	ResponseEntity<String> getOneCommitAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		String repoPath = commitsAnalysisService.cloneRepository(commitAnalysisRequest.getGitRepoLink());
		String reportPath = commitsAnalysisService.generateOneCommitReport(repoPath, commitAnalysisRequest.getBranch(), commitAnalysisRequest.getCommitId());
		String jsonOutput = commitsAnalysisService.callAnalysisService(reportPath);
		
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
}
