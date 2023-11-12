from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from code_quality_analyzer_analysis.smell_analysis.analysis import analyze_smell_files_in_folder

from code_quality_analyzer_analysis.trend_analysis.analysis import analyze_commit_folders_in_folder


class SmellAnalysisView(APIView):

    def post(self, request):
        path = request.data.get('path', None)

        if not path:
            return Response({"error": "No path provided"}, status=status.HTTP_400_BAD_REQUEST)

        results = analyze_smell_files_in_folder(path)
        return Response(results, status=status.HTTP_200_OK)


class TrendAnalysisView(APIView):

    def post(self, request):
        report_path = request.data.get('reportPath', None)
        commits_data = request.data.get('commitsData', None)
        previous_commit = request.data.get('previousCommit', None)

        if not report_path:
            return Response({"error": "No path provided"}, status=status.HTTP_400_BAD_REQUEST)
        if not commits_data:
            return Response({"error": "No commitsData provided"}, status=status.HTTP_400_BAD_REQUEST)
        if not previous_commit:
            return Response({"error": "No previousCommit provided"}, status=status.HTTP_400_BAD_REQUEST)

        commits = list(commits_data.keys())
        users = list(commits_data.values())
        before_oldest_commit = list(previous_commit.keys())[0]
        before_oldest_commit_user = list(previous_commit.values())[0]

        results = analyze_commit_folders_in_folder(
            report_path, commits, before_oldest_commit, users, before_oldest_commit_user
        )
        return Response(results, status=status.HTTP_200_OK)
