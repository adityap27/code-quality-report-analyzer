package code.quality.analyzer.model;

import java.util.List;

/**
 * Request object to call python trend analysis service
 */
public class TrendAnalysisRequest {
	private String reportPath;
	private List<String> commitIds;
	private String previousCommitId;
	public String getReportPath() {
		return reportPath;
	}
	public void setReportPath(String reportPath) {
		this.reportPath = reportPath;
	}
	public List<String> getCommitIds() {
		return commitIds;
	}
	public void setCommitIds(List<String> commitIds) {
		this.commitIds = commitIds;
	}
	public String getPreviousCommitId() {
		return previousCommitId;
	}
	public void setPreviousCommitId(String previousCommitId) {
		this.previousCommitId = previousCommitId;
	}
}
