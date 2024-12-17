from github import Github
from app.config import GITHUB_TOKEN

def get_repo_files(repo_name, branch_name="master"):
    """
    Fetch all files from a specific branch in a GitHub repository.

    Args:
        repo_name (str): The name of the repository (e.g., "user/repo").
        branch_name (str): The branch to fetch files from.

    Returns:
        list: A list of dictionaries containing file details (path, content, type).
    """
    try:
        print(f"Connecting to GitHub repository: {repo_name} on branch: {branch_name}")
        g = Github(GITHUB_TOKEN)
        repo = g.get_repo(repo_name)

        files = []
        contents = repo.get_contents("", ref=branch_name)
        while contents:
            file_content = contents.pop(0)
            if file_content.type == "dir":
                contents.extend(repo.get_contents(file_content.path, ref=branch_name))
            else:
                try:
                    content = file_content.decoded_content.decode("utf-8")
                    files.append({
                        "path": file_content.path,
                        "content": content,
                        "type": "text"
                    })
                except UnicodeDecodeError:
                    print(f"Skipped binary file: {file_content.path}")
                except Exception as e:
                    print(f"Error processing file {file_content.path}: {e}")
        return files

    except Exception as e:
        print(f"Error fetching repository files: {e}")
        raise