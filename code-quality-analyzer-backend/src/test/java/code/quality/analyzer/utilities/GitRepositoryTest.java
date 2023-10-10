package code.quality.analyzer.utilities;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

import static org.junit.jupiter.api.Assertions.assertTrue;

class GitRepositoryTest {

    private static final String localRepoBaseTestPath = "./test-cloned-repos";
    private GitRepository g;

    @BeforeEach
    void setUp() {
        g = new GitRepository("https://github.com/adityap27/linear_regression.git", GitRepositoryTest.localRepoBaseTestPath);
    }

    @AfterEach
    void tearDown() {
        try {
            FileUtils.deleteDirectory(new File(GitRepositoryTest.localRepoBaseTestPath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    void testCloneRepoSuccess() {
        g.cloneRepo();
        File file = new File(GitRepositoryTest.localRepoBaseTestPath);
        assertTrue(file.exists() && file.isDirectory());
    }

    @Test
    void testCloneRepoSkip() {
        ByteArrayOutputStream outTemp = new ByteArrayOutputStream(); // Temporary output stream.
        PrintStream outMain = System.out;
        System.setOut(new PrintStream(outTemp)); // Switch from Standard output stream(console) to our temporary one. This helps in checking output string, in current test case.

        g.cloneRepo();
        g.cloneRepo();
        File file = new File(GitRepositoryTest.localRepoBaseTestPath);

        String outputString = outTemp.toString();
        assertTrue(file.exists() && file.isDirectory() && outputString.contains("Cloning Skipped."));

        System.setOut(outMain); // Switch back to the Standard output stream(console).
        System.out.println(outputString);
    }
}