import unittest
from unittest.mock import patch

from code_quality_analyzer_analysis.trend_analysis.analysis import (analyze_smell_files_in_folder_without_top_entities, analyze_commit_folders_in_folder)


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
            "total_smells": 17,
        },
        "Test Smell": None,
        "total": 20
    }

    analyze_smell_files_empty_mock = {
        "Architecture Smell": None,
        "Design Smell": None,
        "Implementation Smell": None,
        "Testability Smell": None,
        "Test Smell": None,
        "total": 20
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
            "total_smells": 17,
        },
        "Test Smell": None,
        "total": 20
    }

    analyze_smell_files_in_folder_without_top_entities_mock_empty = {
        "Architecture Smell": None,
        "Design Smell": None,
        "Implementation Smell": None,
        "Testability Smell": None,
        "Test Smell": None,
        "total": 0
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
           side_effect=[analyze_smell_files_in_folder_without_top_entities_mock, analyze_smell_files_in_folder_without_top_entities_mock_empty, analyze_smell_files_in_folder_without_top_entities_mock])
    def test_analyze_commit_folders_in_folder(self, _):
        result = analyze_commit_folders_in_folder("/sample_folder/", ["c1","c2","c3"], None)
        expected = {
            "full-repo": {
            "c1" : self.analyze_smell_files_in_folder_without_top_entities_mock,
            "c2" : self.analyze_smell_files_in_folder_without_top_entities_mock_empty,
            "c3" : self.analyze_smell_files_in_folder_without_top_entities_mock
            }
        }
        self.assertEqual(result, expected)