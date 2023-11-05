package code.quality.analyzer.util;

public class Constants {
	public static String EMPTY = "";
	public static int OneCommit = 1;
	public static String REPORT_PATH = "\\..\\Reports";
	public static String REPO_PATH = ".\\cloned-repos";
	public static String REPO_SUFFIX = "\\.git";

	public static String ANALYSIS_SERVICE_BASE_URL = "http://localhost:8000";

	//Test file constants
	public static String TEST_BRANCH = "main";
	public static String TEST_BRANCH_TREND = "master";
	public static int TEST_NO_OF_COMMITS = 3;
	public static String TEST_COMMIT_ID = "a2c6353a0ad9150a205c0d1af381665909a10a30";
	public static String TEST_REPO_URL = "https://github.com/roshni-joshi/Retail-Product-Management-System.git";
	public static String TEST_COMMIT_ID_2 = "e6012b9fbb79e2ee8aa8252cb873606233d0e531";
	public static String TEST_REPO_URL_2 = "https://github.com/roshni-joshi/Api-Gateway-CustomRoutes.git";
	public static String TEST_COMMIT_ID_3 = "ec1fdffca506b60e4b1bbccf29931b1d2544c790";
	public static String TEST_REPO_URL_3 = "https://github.com/roshni-joshi/taxi-ticket-system.git";
	public static String ONE_COMMIT_URL = "/onecommit/getanalysis";
	public static String TEST_REPO_URL_TREND = "https://github.com/ZYRzyr/FastJsonConverter.git";
	public static String ANALYSIS_SERVICE_TEST_RESPONSE = "{\"Architecture Smells\":{\r\n"
			+ "      \"total_smells\": 151,\r\n"
			+ "      \"smell_distribution\":{\r\n"
			+ "         \"Cyclic Dependency\":59,\r\n"
			+ "         \"Feature Concentration\":50\r\n"
			+ "      },\r\n"
			+ "      \"top_entities\":{\r\n"
			+ "         \"input||org.apache.maven\":16,\r\n"
			+ "         \"input||org.apache.maven.model.building\":14,\r\n"
			+ "         \"input||org.apache.maven.artifact\":9,\r\n"
			+ "         \"input||org.apache.maven.model\":6\r\n"
			+ "      }\r\n"
			+ "   },\r\n"
			+ "   \"Design Smells\":{\r\n"
			+ "      \"total_smells\":891,\r\n"
			+ "      \"smell_distribution\":{\r\n"
			+ "         \"Unutilized Abstraction\":593,\r\n"
			+ "         \"Broken Hierarchy\":83,\r\n"
			+ "         \"Insufficient Modularization\":51,\r\n"
			+ "         \"Deficient Encapsulation\":51,\r\n"
			+ "         \"Feature Envy\":42\r\n"
			+ "      },\r\n"
			+ "      \"top_entities\":{\r\n"
			+ "         \"input||org.apache.maven.cli||MavenCliTest\":16,\r\n"
			+ "         \"input||org.apache.maven.repository.legacy||DefaultUpdateCheckManagerTest\":6,\r\n"
			+ "         \"input||org.apache.maven.artifact.repository.metadata||ArtifactRepositoryMetadata\":3\r\n"
			+ "      }\r\n"
			+ "   }\r\n"
			+ "}";
}
