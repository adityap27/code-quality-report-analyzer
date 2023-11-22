package code.quality.analyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import code.quality.analyzer.model.HotspotAnalysisRequest;
import code.quality.analyzer.model.OneCommitAnalysisRequest;
import code.quality.analyzer.model.TrendAnalysisRequest;

@Service
public class CallAnalysisServiceImpl implements CallAnalysisService {

	@Value("${analysis.service.base.url}")
	private String baseUrl;
	
	@Value("${analysis.service.one.commit.url}")
	private String oneCommitUrl;
	
	@Value("${analysis.service.trend.url}")
	private String trendUrl;
	
	@Value("${analysis.service.hotspot.url}")
	private String hotspotUrl;
	
	@Override
	public String callOneCommitAnalysisService(OneCommitAnalysisRequest request) {
		return null;
	}

	@Override
	public String callTrendAnalysisService(TrendAnalysisRequest request) {
		return null;
	}

	@Override
	public String callHotspotAnalysisService(HotspotAnalysisRequest request) {
		return null;
	}
}
