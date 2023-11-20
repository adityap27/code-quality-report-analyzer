import unittest

import pandas as pd
from code_quality_analyzer_analysis.hotspot_analysis.analysis import (get_top_entities, get_hotspot_analysis)


class TestHotspotAnalysis(unittest.TestCase):

    design_smell = "Design Smell"
    implementation_smell = "Implementation Smell"
    sample_folder = "/sample_folder/"
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
    top_method_list = [
        {'Retail-Product-Management-System||(default package)||MavenWrapperDownloader||m2':
             {'smell_distribution': {'Long Method': 1, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 1, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 2, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 4}},
        {'Retail-Product-Management-System||(default package)||MavenWrapperDownloader||m3':
             {'smell_distribution': {'Long Method': 1, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 1, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 0, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 2}},
        {'Retail-Product-Management-System||(default package)||MavenWrapperDownloader||m1':
             {'smell_distribution': {'Long Method': 1, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 0, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 0, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 1}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth||ApiGatewayAuthApplication||m1':
             {'smell_distribution': {'Long Method': 0, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 0, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 1, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 1}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth.filters||JwtRequestFilter||m1':
             {'smell_distribution': {'Long Method': 0, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 0, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 1, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 1}},
        {'Retail-Product-Management-System||com.product.microservices.apigatewayauth.model||User||m1':
             {'smell_distribution': {'Long Method': 1, 'Complex Method': 0, 'Long Parameter List': 0, 'Long Identifier': 0, 'Long Statement': 0, 'Complex Conditional': 0, 'Virtual Method Call from Constructor': 0, 'Empty Catch Clause': 0, 'Magic Number': 0, 'Duplicate Code': 0, 'Missing Default': 0}, 'total_smells': 1}}]

    def test_get_top_entities(self):

        result = get_top_entities(self.design_df, self.design_smell, self.design_smell_subtypes)
        self.assertEqual(result, self.top_classes_list)


    def test_get_hotspot_analysis(self, _, __, ___):
        expected = {
        "top_classes_list": self.top_classes_list,
        "top_methods_list": self.top_method_list
        }

        result = get_hotspot_analysis(self.sample_folder)

        self.assertEqual(result, expected)