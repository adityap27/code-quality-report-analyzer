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
        path = request.data.get('path', None)
        oldest_to_latest_ordered_commits = request.data.get('oldestToLatestOrderedCommits', None)
        commit_before_oldest_commit = request.data.get('commitBeforeOldestCommit', None)

        if not path:
            return Response({"error": "No path provided"}, status=status.HTTP_400_BAD_REQUEST)
        if not oldest_to_latest_ordered_commits:
            return Response({"error": "No oldestToLatestOrderedCommits provided"}, status=status.HTTP_400_BAD_REQUEST)

        results = analyze_commit_folders_in_folder(path, oldest_to_latest_ordered_commits, commit_before_oldest_commit)
        return Response(results, status=status.HTTP_200_OK)
