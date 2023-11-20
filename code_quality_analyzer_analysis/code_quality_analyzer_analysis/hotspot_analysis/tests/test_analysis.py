import unittest

import pandas as pd
from code_quality_analyzer_analysis.hotspot_analysis.analysis import (get_top_entities)


class TestHotspotAnalysis(unittest.TestCase):

    design_smell = "Design Smell"
    design_smell_subtypes = [
        "Abstraction",
        "Encapsulation",
        "Modularization",
        "Hierarchy"]

    design_df = pd.DataFrame({
        "Concatenated_Column": ["Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||(default package)||MavenWrapperDownloader",
                                "Retail-Product-Management-System||com.product.microservices.apigatewayauth||ApiGatewayAuthApplication",
                                "Retail-Product-Management-System||com.product.microservices.apigatewayauth.filters||JwtRequestFilter",
                                "Retail-Product-Management-System||com.product.microservices.apigatewayauth.model||User"],
        "Design Smell": ["Abstraction",
                        "Unutilized Abstraction",
                        "Unutilized Abstraction",
                        "Unnecessary Abstraction",
                        "Unutilized Abstraction",
                        "Unnecessary Abstraction",
                        "Unutilized Abstraction",
                        "Unutilized Abstraction",
                        "Unutilized Abstraction",
                        "Unnecessary Abstraction"]
    })

    top_classes_list = [
        {'Retail-Product-Management-System||(default package)||MavenWrapperDownloader':
                {'smell_distribution': {'Abstraction': 7, 'Encapsulation': 0, 'Modularization': 0, 'Hierarchy': 0}, 'total_smells': 7}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth||ApiGatewayAuthApplication':
             {'smell_distribution': {'Abstraction': 1, 'Encapsulation': 0, 'Modularization': 0, 'Hierarchy': 0}, 'total_smells': 1}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth.filters||JwtRequestFilter':
             {'smell_distribution': {'Abstraction': 1, 'Encapsulation': 0, 'Modularization': 0, 'Hierarchy': 0}, 'total_smells': 1}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth.model||User':
             {'smell_distribution': {'Abstraction': 1, 'Encapsulation': 0, 'Modularization': 0, 'Hierarchy': 0}, 'total_smells': 1}}
        ]

    def test_get_top_entities(self):

        result = get_top_entities(self.design_df, self.design_smell, self.design_smell_subtypes)
        self.assertEqual(result, self.top_classes_list)