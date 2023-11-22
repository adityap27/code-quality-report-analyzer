package code.quality.analyzer.service;

import org.springframework.stereotype.Service;

import code.quality.analyzer.model.CommitAnalysisRequest;
import code.quality.analyzer.model.HotspotAnalysisRequest;
import code.quality.analyzer.model.OneCommitAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;

@Service
public class GenerateReportServiceImpl implements GenerateReportService {

	@Override
	public OneCommitAnalysisRequest generateOneCommitReport(CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		return new OneCommitAnalysisRequest();
	}

	@Override
	public TrendAnalysisRequest generateTrendAnalysisReport(CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		return new TrendAnalysisRequest();
	}

	@Override
	public HotspotAnalysisRequest generateHotspotReport(CommitAnalysisRequest commitAnalysisRequest) throws Exception {
		return new HotspotAnalysisRequest();
	}
}
