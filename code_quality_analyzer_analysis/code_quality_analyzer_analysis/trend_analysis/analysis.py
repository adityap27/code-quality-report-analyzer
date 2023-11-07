from code_quality_analyzer_analysis.smell_analysis.analysis import (analyze_smell_files_in_folder)

def analyze_smell_files_in_folder_without_top_entities(folder_path: str) -> dict:
    """
    Analyzes all smell files in a folder, removes un-necessary fields for trend analysis like top_entities.
    :param folder_path: Path to the folder containing the smell files
    :return: Dictionary containing analysis of all the files, without top_entities
    """
    # Retrieve the smells of a folder
    smells_data = analyze_smell_files_in_folder(folder_path)

    for key in smells_data.keys():
        if isinstance(smells_data[key], dict):
            del(smells_data[key]["top_entities"])

    return smells_data

def analyze_commit_folders_in_folder(folder_path: str, oldest_to_latest_ordered_commits: list, commit_before_oldest_commit: str) -> dict:
    """
    Analyzes all commit folders in a parent repository folder
    :param folder_path: Path to the folder containing all the commit sub-folders
    :param oldest_to_latest_ordered_commits: List of commits in an ordered form. initial commit would be first and followed by the more recent ones
    :param commit_before_oldest_commit: Commit hash of the previous commit of the oldest commit in oldest_to_latest_ordered_commits
    :return: Dictionary containing analysis of all the commits
    """
    trend_analysis_dict = {"full-repo": {}}

    for commit in oldest_to_latest_ordered_commits:
        path = folder_path + "/" + commit

        trend_analysis_dict["full-repo"][commit] = analyze_smell_files_in_folder_without_top_entities(path)

    return trend_analysis_dict