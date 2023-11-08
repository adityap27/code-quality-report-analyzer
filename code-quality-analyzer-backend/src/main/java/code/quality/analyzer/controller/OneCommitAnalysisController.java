package code.quality.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.service.CommitsAnalysisService;

@RestController
@RequestMapping("/onecommit")
public class OneCommitAnalysisController {
	
	@Autowired
	CommitsAnalysisService commitsAnalysisService;
	@CrossOrigin(origins = {"http://localhost:3000", "http://csci5308vm3.research.cs.dal.ca"})
	@PostMapping("/getanalysis")
	ResponseEntity<String> getOneCommitAnalysis(@RequestBody CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		String repoPath = commitsAnalysisService.cloneRepository(commitAnalysisRequest.getGitRepoLink());
		String reportPath = commitsAnalysisService.generateOneCommitReport(repoPath, commitAnalysisRequest.getBranch(), commitAnalysisRequest.getCommitId());
		String jsonOutput = commitsAnalysisService.callAnalysisService(reportPath);
		
		return new ResponseEntity<String>(jsonOutput, HttpStatus.OK);
	}
}
