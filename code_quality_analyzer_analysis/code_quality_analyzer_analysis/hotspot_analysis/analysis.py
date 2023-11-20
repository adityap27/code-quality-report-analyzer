import pandas as pd

def get_top_entities(df: pd.DataFrame, smell_type: str, smell_subtypes: list, concat_column: str = 'Concatenated_Column', top: int = 10) -> list:
    """
    Analyzes a DataFrame containing information about specific smell and returns a list of top entities with smell distribution
    based on total smell count.

    :param df: DataFrame containing the smell information.
    :param smell_type: The main smell type to be considered (e.g., 'Design Smell', 'Implementation Smell').
    :param smell_subtypes: List defining subtypes of the specified smell_type. This will be considered for smell_distribution.
    :param concat_column: The name of the column in the DataFrame that contains concatenated project, package, type name (and method name).
    :param top: The number of top entities to return. Default is 10.
    :return: A list of dictionaries, where each dictionary represents an entity and includes:
             - The entity's concatenated column value,
             - A dictionary of smell distribution for each subtype,
             - The total number of smells associated with the entity.
            The list will be in descending order based on the total smell count of each entity.
    """
    # Create an empty list to store the results
    result_list = []

    # Iterate over unique values in Concatenated_Column
    for column_value in df[concat_column].unique():

        # Filter the dataframe for the current Concatenated_Column value
        subset_df = df[df[concat_column] == column_value]

        # Creating smell distribution dict, to store count of each sub-type of smell
        smell_distribution = {}
        for smell_subtype in smell_subtypes:
            smell_distribution[smell_subtype] = (subset_df[smell_type].str.lower().str.contains(smell_subtype.lower())).sum()

        # Calculate the total number of smells
        total_smells = sum(smell_distribution.values())

        dict = {}
        # Create the final dictionary for the current Concatenated_Column value
        dict[column_value] = {
            'smell_distribution': smell_distribution,
            'total_smells': total_smells
        }

        # Add the entity details to the list of top_entities.
        result_list.append(dict)

    # Sort the list based on total_smells in descending order
    sorted_list = sorted(result_list, key=lambda x: x[next(iter(x))]["total_smells"], reverse=True)

    # Only return top few
    top_entities = sorted_list[:top]

    return top_entities