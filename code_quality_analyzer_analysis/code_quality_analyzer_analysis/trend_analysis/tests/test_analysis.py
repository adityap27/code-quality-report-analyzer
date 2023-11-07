import unittest
from unittest.mock import patch

from code_quality_analyzer_analysis.trend_analysis.analysis import (
    analyze_smell_files_in_folder_without_top_entities, analyze_commit_folders_in_folder, get_smell_commit_changes
)


class TestTrendAnalysis(unittest.TestCase):
    # Mocked return values for functions
    analyze_smell_files_mock = {
        "Architecture Smell": None,
        "Design Smell": {
            "smell_distribution": {"Smell1": 2, "Smell2": 1},
            "top_entities": {"EntityA": 2, "EntityB": 1},
            "total_smells": 3,
        },
        "Implementation Smell": None,
        "Testability Smell": {
            "smell_distribution": {"Smell3": 5, "Smell4": 8},
            "top_entities": {"EntityC": 7, "EntityD": 10},
            "total_smells": 13,
        },
        "Test Smell": None,
        "total_smells": 16
    }

    analyze_smell_files_empty_mock = {
        "Architecture Smell": None,
        "Design Smell": None,
        "Implementation Smell": None,
        "Testability Smell": None,
        "Test Smell": None,
        "total_smells": 0
    }

    analyze_smell_files_in_folder_without_top_entities_mock = {
        "Architecture Smell": None,
        "Design Smell": {
            "smell_distribution": {"Smell1": 2, "Smell2": 1},
            "total_smells": 3,
        },
        "Implementation Smell": None,
        "Testability Smell": {
            "smell_distribution": {"Smell3": 5, "Smell4": 8},
            "total_smells": 13,
        },
        "Test Smell": None,
        "total_smells": 16
    }

    full_repo_mock = {
        "full-repo": {
            "c0": analyze_smell_files_empty_mock,
            "c1": analyze_smell_files_in_folder_without_top_entities_mock,
            "c2": analyze_smell_files_empty_mock,
            "c3": analyze_smell_files_in_folder_without_top_entities_mock,
        }
    }

    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.analyze_smell_files_in_folder",
           return_value=analyze_smell_files_mock)
    def test_analyze_smell_files_in_folder_without_top_entities_some(self, _):
        result = analyze_smell_files_in_folder_without_top_entities("/sample_folder/")
        expected = self.analyze_smell_files_in_folder_without_top_entities_mock
        self.assertEqual(result, expected)

    @patch("code_quality_analyzer_analysis.trend_analysis.analysis.analyze_smell_files_in_folder",
           return_value=analyze_smell_files_empty_mock)
    def test_analyze_smell_files_in_folder_without_top_entities_empty(self, _):
        result = analyze_smell_files_in_folder_without_top_entities("/sample_folder/")
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
        result = analyze_commit_folders_in_folder("/sample_folder/", ["c1", "c2", "c3"], "c0")
        expected = {
            "full-repo": {
                "c1": self.analyze_smell_files_in_folder_without_top_entities_mock,
                "c2": self.analyze_smell_files_empty_mock,
                "c3": self.analyze_smell_files_in_folder_without_top_entities_mock
            }
        }
        self.assertEqual(result, expected)

    def test_get_smell_commit_changes(self):
        commits = ["c0", "c1", "c2", "c3"]
        result = get_smell_commit_changes(self.full_repo_mock, commits)
        expected = {
            "full-repo": self.full_repo_mock["full-repo"],
            "commit_changes": {
                "c1": {
                    "Architecture Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Design Smell": {
                        "smell_distribution": {
                            "Smell1": 2,
                            "Smell2": 1
                        },
                        "total_smells": 3
                    },
                    "Implementation Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Testability Smell": {
                        "smell_distribution": {
                            "Smell3": 5,
                            "Smell4": 8
                        },
                        "total_smells": 13
                    },
                    "Test Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 16
                },
                "c2": {
                    "Architecture Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Design Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Implementation Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Testability Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Test Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 0
                },
                "c3": {
                    "Architecture Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Design Smell": {
                        "smell_distribution": {
                            "Smell1": 2,
                            "Smell2": 1
                        },
                        "total_smells": 3
                    },
                    "Implementation Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "Testability Smell": {
                        "smell_distribution": {
                            "Smell3": 5,
                            "Smell4": 8
                        },
                        "total_smells": 13
                    },
                    "Test Smell": {
                        "smell_distribution": {

                        },
                        "total_smells": 0
                    },
                    "total_smells": 16
                }
            }
        }

        self.assertEqual(result, expected)
