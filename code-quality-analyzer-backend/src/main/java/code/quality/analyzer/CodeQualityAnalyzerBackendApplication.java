package code.quality.analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"code.quality.analyzer"})
@SpringBootApplication
public class CodeQualityAnalyzerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeQualityAnalyzerBackendApplication.class, args);
	}

}
