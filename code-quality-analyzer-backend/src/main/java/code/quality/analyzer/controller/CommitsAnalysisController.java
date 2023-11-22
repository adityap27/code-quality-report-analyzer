package code.quality.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.service.CallAnalysisService;
import code.quality.analyzer.service.GenerateReportService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://csci5308vm3.research.cs.dal.ca"})
public class CommitsAnalysisController {

	@Autowired
	GenerateReportService reportService;
	
	@Autowired
	CallAnalysisService callAnalysisService;
	
	@PostMapping("/onecommit/getanalysis")
	ResponseEntity<String> getOneCommitAnalysis(@RequestBody CommitAnalysisRequest commitsRequest) throws Exception {
		return null;
	}
	
	@PostMapping("/trend/getanalysis")
	ResponseEntity<String> getTrendAnalysis(@RequestBody CommitAnalysisRequest commitsRequest) throws Exception {
		return null;
	}
	
	@PostMapping("/hotspot/getanalysis")
	ResponseEntity<String> getHotspotAnalysis(@RequestBody CommitAnalysisRequest commitsRequest) throws Exception {
		return null;
	}
}
