import unittest
from unittest.mock import patch

import pandas as pd
from code_quality_analyzer_analysis.trend_analysis.analysis import (
    analyze_smell_files_in_folder_without_top_entities, analyze_commit_folders_in_folder, get_smell_commit_changes, get_total_lines_of_code
)


class TestTrendAnalysis(unittest.TestCase):
    architecture_smell = "Architecture Smell"
    design_smell = "Design Smell"
    implementation_smell = "Implementation Smell"
    testability_smell = "Testability Smell"
    test_smell = "Test Smell"
    sample_folder = "/sample_folder/"
    # Mocked return values for functions
    analyze_smell_files_mock = {
        architecture_smell: None,
        design_smell: {
            "smell_distribution": {"Smell1": 2, "Smell2": 1},
            "top_entities": {"EntityA": 2, "EntityB": 1},
            "total_smells": 3,
        },
        implementation_smell: None,
        testability_smell: {
            "smell_distribution": {"Smell3": 5, "Smell4": 8},
            "top_entities": {"EntityC": 7, "EntityD": 10},
            "total_smells": 13,
        },
        test_smell: None,
        "total_smells": 16,
        "user": "user1"
    }

    analyze_smell_files_empty_mock = {
        architecture_smell: None,
        design_smell: None,
        implementation_smell: None,
        testability_smell: None,
        test_smell: None,
        "total_smells": 0,
        "user": "user1"
    }

    analyze_smell_files_in_folder_without_top_entities_mock = {
        architecture_smell: None,
        design_smell: {
            "smell_distribution": {"Smell1": 2, "Smell2": 1},
            "total_smells": 3,
        },
        implementation_smell: None,
        testability_smell: {
            "smell_distribution": {"Smell3": 5, "Smell4": 8},
            "total_smells": 13,
        },
        test_smell: None,
        "total_smells": 16,
        "user": "user1"
    }

    full_repo_mock = {
        "full_repo": {
            "c0": analyze_smell_files_empty_mock,
            "c1": analyze_smell_files_in_folder_without_top_entities_mock,
            "c2": analyze_smell_files_empty_mock,
            "c3": analyze_smell_files_in_folder_without_top_entities_mock,
        }
    }

    pandas_dataframe_mock = pd.DataFrame({
        "Project Name": ["maven", "maven-core", "maven-compact"],
        "Package Name": ["org.apache.maven.api", "org.apache.maven.artifact", "org.apache.maven.toolchain.building"],
        "LOC": [20, 40, 10]
    })

    pandas_dataframe_empty_mock = pd.DataFrame({
        "Project Name": [],
        "Package Name": [],
        "LOC": []
    })

    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.analyze_smell_files_in_folder",
           return_value=analyze_smell_files_mock)
    def test_analyze_smell_files_in_folder_without_top_entities_some(self, _):
        result = analyze_smell_files_in_folder_without_top_entities(self.sample_folder)
        expected = self.analyze_smell_files_in_folder_without_top_entities_mock
        self.assertEqual(result, expected)

    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.analyze_smell_files_in_folder",
           return_value=analyze_smell_files_empty_mock)
    def test_analyze_smell_files_in_folder_without_top_entities_empty(self, _):
        result = analyze_smell_files_in_folder_without_top_entities(self.sample_folder)
        self.assertEqual(result, self.analyze_smell_files_empty_mock)

    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.analyze_smell_files_in_folder_without_top_entities",
           side_effect=[analyze_smell_files_empty_mock,
                        analyze_smell_files_in_folder_without_top_entities_mock,
                        analyze_smell_files_empty_mock,
                        analyze_smell_files_in_folder_without_top_entities_mock,
                        ]
           )
    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.get_smell_commit_changes",
           return_value=full_repo_mock)
    def test_analyze_commit_folders_in_folder(self, _, __):
        result = analyze_commit_folders_in_folder(
            "/sample_folder/", ["c1", "c2", "c3"], "c0",
            ["user1", "user1", "user1"], "user2"
        )
        expected = {
            "full_repo": {
                "c1": self.analyze_smell_files_in_folder_without_top_entities_mock,
                "c2": self.analyze_smell_files_empty_mock,
                "c3": self.analyze_smell_files_in_folder_without_top_entities_mock
            }
        }
        self.assertEqual(result, expected)

    def test_get_smell_commit_changes(self):
        commits = ["c0", "c1", "c2", "c3"]
        users = ["user2", "user1", "user1", "user1"]
        full_repo_mock = {
            "full_repo": {
                "c0": self.analyze_smell_files_empty_mock,
                "c1": self.analyze_smell_files_in_folder_without_top_entities_mock,
                "c2": self.analyze_smell_files_empty_mock,
                "c3": self.analyze_smell_files_in_folder_without_top_entities_mock,
            }
        }
        result = get_smell_commit_changes(full_repo_mock, commits, users)
        expected = {
            "full_repo": full_repo_mock["full_repo"],
            "commit_changes": {
                "c1": {
                    self.architecture_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.design_smell: {
                        "smell_distribution": {
                            "Smell1": 2,
                            "Smell2": 1
                        },
                        "total_smells": 3
                    },
                    self.implementation_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.testability_smell: {
                        "smell_distribution": {
                            "Smell3": 5,
                            "Smell4": 8
                        },
                        "total_smells": 13
                    },
                    self.test_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 16,
                    "user": "user1"
                },
                "c2": {
                    self.architecture_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.design_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.implementation_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.testability_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.test_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 0,
                    "user": "user1"
                },
                "c3": {
                    self.architecture_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.design_smell: {
                        "smell_distribution": {
                            "Smell1": 2,
                            "Smell2": 1
                        },
                        "total_smells": 3
                    },
                    self.implementation_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    self.testability_smell: {
                        "smell_distribution": {
                            "Smell3": 5,
                            "Smell4": 8
                        },
                        "total_smells": 13
                    },
                    self.test_smell: {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 16,
                    "user": "user1"
                }
            }
        }

        self.assertEqual(result, expected)

    @patch("pandas.read_csv", return_value=pandas_dataframe_mock)
    def test_get_total_lines_of_code(self, _):

        metrics_file_path = "test.csv"
        column_sum = "LOC"
        expected_lines_of_code = 70

        total_lines_of_code = get_total_lines_of_code(metrics_file_path, column_sum)

        self.assertEqual(total_lines_of_code, expected_lines_of_code)

    @patch("pandas.read_csv", return_value=pandas_dataframe_empty_mock)
    def test_get_total_lines_of_code_empty_case(self, _):

        metrics_file_path = "test.csv"
        column_sum = "LOC"
        expected_lines_of_code = 0

        total_lines_of_code = get_total_lines_of_code(metrics_file_path, column_sum)

        self.assertEqual(total_lines_of_code, expected_lines_of_code)