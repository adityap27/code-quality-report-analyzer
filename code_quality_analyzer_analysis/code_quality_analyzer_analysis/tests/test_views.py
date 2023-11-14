from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch


class SmellAnalysisViewTests(APITestCase):
    def setUp(self) -> None:
        self.url = reverse("smell_analysis")

    @patch("code_quality_analyzer_analysis.views.analyze_smell_files_in_folder")
    def test_post_with_no_path(self, mock_analyze):
        response = self.client.post(self.url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        mock_analyze.assert_not_called()

    @patch("code_quality_analyzer_analysis.views.analyze_smell_files_in_folder")
    def test_post_with_valid_path(self, mock_analyze):
        mock_analyze.return_value = {"result": "some_result"}
        data = {"path": "some/valid/path"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_analyze.assert_called_once_with("some/valid/path")


class TrendAnalysisViewTests(APITestCase):
    def setUp(self) -> None:
        self.url = reverse("trend_analysis")
        self.path = "some/path"

    @patch("code_quality_analyzer_analysis.views.analyze_commit_folders_in_folder")
    def test_post_with_no_path(self, mock_analyze):
        response = self.client.post(self.url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        mock_analyze.assert_not_called()

    @patch("code_quality_analyzer_analysis.views.analyze_commit_folders_in_folder")
    def test_post_with_no_commits_data(self, mock_analyze):
        data = {"reportPath": self.path}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        mock_analyze.assert_not_called()

    @patch("code_quality_analyzer_analysis.views.analyze_commit_folders_in_folder")
    def test_post_with_no_previous_commit(self, mock_analyze):
        mock_analyze.return_value = {"result": "some_result"}
        data = {
            "reportPath": self.path,
            "commitsData": {
                "commit1": "user1",
                "commit2": "user2",
            }
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_analyze.assert_called_once_with(self.path, ["commit1", "commit2"], "", ["user1", "user2"], "")

    @patch("code_quality_analyzer_analysis.views.analyze_commit_folders_in_folder")
    def test_post_with_complete_data(self, mock_analyze):
        mock_analyze.return_value = {"result": "some_result"}
        data = {
            "reportPath": self.path,
            "commitsData": {
                "commit1": "user1",
                "commit2": "user2",
            },
            "previousCommit": {
                "commit0": "user0"
            }
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_analyze.assert_called_once_with(self.path, ["commit1", "commit2"], "commit0", ["user1", "user2"], "user0")
