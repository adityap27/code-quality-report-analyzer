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


def get_smell_commit_changes(trend_analysis_dict: dict, commits: list, users: list) -> dict:
    """
    Calculates the difference between adjacent commits smells
    :param trend_analysis_dict: Dictionary containing all commits smells
    :param commits: List representing order of commits
    :param users: List representing order of users as per commit
    :return: dictionary containing difference between commit smells
    """
    trend_analysis_dict["commit_changes"] = {}

    for i in range(1, len(commits)):
        current_commit = commits[i]
        previous_commit = commits[i - 1]

        trend_analysis_dict["commit_changes"][current_commit] = {
            "Architecture Smell": {
                "smell_distribution": {},
                "total_smells": 0
            },
            "Design Smell": {
                "smell_distribution": {},
                "total_smells": 0
            },
            "Implementation Smell": {
                "smell_distribution": {},
                "total_smells": 0
            },
            "Testability Smell": {
                "smell_distribution": {},
                "total_smells": 0
            },
            "Test Smell": {
                "smell_distribution": {},
                "total_smells": 0
            },
            "total_smells": 0,
            "user": users[i],
        }

        current_commit_dict = trend_analysis_dict["full_repo"][current_commit]
        previous_commit_dict = trend_analysis_dict["full_repo"][previous_commit]

        total_smells = 0
        # Iterate over the smell types
        for type in current_commit_dict:
            if isinstance(current_commit_dict[type], dict):
                total_smell_type = 0
                # Iterate over the smell subtypes
                for subtype in current_commit_dict[type]["smell_distribution"]:
                    # Get current commit subtype smell stats
                    current_commit_smell_value = current_commit_dict[type]["smell_distribution"].get(subtype, 0)
                    # Get previous commit subtype smell stats
                    previous_commit_smell_value = 0
                    if isinstance(previous_commit_dict[type], dict):
                        previous_commit_smell_value = previous_commit_dict[type]["smell_distribution"].get(subtype, 0)
                    # Subtract previous from current
                    smell_sub = current_commit_smell_value - previous_commit_smell_value
                    # Only add if the difference is greater than 0
                    if smell_sub > 0:
                        trend_analysis_dict["commit_changes"][current_commit][type]["smell_distribution"][subtype] = smell_sub
                        total_smell_type += smell_sub

                # Calculate the total smells for the type
                trend_analysis_dict["commit_changes"][current_commit][type]["total_smells"] = total_smell_type

                total_smells += total_smell_type

        # Calculate the overall total smells
        trend_analysis_dict["commit_changes"][current_commit]["total_smells"] = total_smells

    return trend_analysis_dict


def analyze_commit_folders_in_folder(
        folder_path: str, commits: list, before_oldest_commit: str, users: list, before_oldest_commit_user: str
) -> dict:
    """
    Analyzes all commit folders in a parent repository folder
    :param folder_path: Path to the folder containing all the commit sub-folders
    :param commits: List of commits in an ordered form. initial commit would be first and followed by the more recent ones
    :param users: List of users per commit in an ordered form
    :param before_oldest_commit: Commit hash of the previous commit of the oldest commit in oldest_to_latest_ordered_commits
    :param before_oldest_commit_user: user before the oldest commit
    :return: Dictionary containing analysis of all the commits
    """
    trend_analysis_dict = {"full_repo": {}}
    commits.insert(0, before_oldest_commit)
    users.insert(0, before_oldest_commit_user)

    for index, commit in enumerate(commits):
        path = folder_path + "/" + commit

        trend_analysis_dict["full_repo"][commit] = analyze_smell_files_in_folder_without_top_entities(path)
        trend_analysis_dict["full_repo"][commit]["user"] = users[index]

    trend_analysis_dict = get_smell_commit_changes(trend_analysis_dict, commits, users)
    trend_analysis_dict["full_repo"].pop(before_oldest_commit, None)

    return trend_analysis_dict
