from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from code_quality_analyzer_analysis.smell_analysis.analysis import analyze_smell_files_in_folder


class SmellAnalysisView(APIView):

    def post(self, request):
        path = request.data.get('path', None)

        if not path:
            return Response({"error": "No path provided"}, status=status.HTTP_400_BAD_REQUEST)

        results = analyze_smell_files_in_folder(path)
        return Response(results, status=status.HTTP_200_OK)
