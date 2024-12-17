import openai
from app.config import OPENAI_API_KEY

# Initialize the OpenAI client
client = openai.OpenAI(api_key=OPENAI_API_KEY)

def summarize_content(content, max_lines=50):
    if not content:
        return ""
    lines = content.splitlines()
    if len(lines) > max_lines:
        return "\n".join(lines[:max_lines]) + f"\n... (truncated, {len(lines) - max_lines} lines omitted)"
    return content

def clean_pipeline_script(pipeline_script):
    if not pipeline_script:
        return ""
    pipeline_script = pipeline_script.strip()
    if pipeline_script.startswith("```groovy"):
        pipeline_script = pipeline_script[len("```groovy"):].strip()
    if pipeline_script.endswith("```"):
        pipeline_script = pipeline_script[:-len("```")].strip()
    return pipeline_script

def generate_pipeline(repo_name, branch_name, files, batch_size=5, max_lines=50):
    if not files or not repo_name or not branch_name:
        print("Error: Missing required inputs (files, repo_name, or branch_name).")
        return None

    file_names = [file["path"] for file in files]

    prompt = (
        "You are a highly experienced DevOps Engineer specializing in Jenkins pipelines. "
        "Generate a Jenkins **declarative pipeline** that adapts to the project's requirements "
        "based on the provided repository files and contents.\n\n"
        "### Requirements for the Pipeline:\n"
        "1. Dynamically identify the applicable programming languages, frameworks, and tools.\n"
        "2. Include only relevant stages:\n"
        "   - **Checkout**: Fetch code from the repository using the given branch.\n"
        "   - **Setup**: Set up the appropriate environment.\n"
        "   - **Dependencies**: Install dependencies if applicable.\n"
        "   - **Linting**: Run code quality checks.\n"
        "   - **Unit Tests**: Execute unit tests if available.\n"
        "   - **Build**: Build the project if necessary.\n"
        "   - **Security Scan**: Perform security checks.\n"
        "   - **Docker Packaging**: Build Docker image if Dockerfile exists.\n"
        "   - **Deploy**: Deploy if Docker is configured.\n"
        "3. Use conditional logic to include or skip stages based on project files.\n"
        "4. Follow Jenkins best practices.\n\n"
        f"### Repository Details:\n"
        f"- Repository Name: {repo_name}\n- Branch: {branch_name}\n\n"
        "### Files in the Repository:\n"
    )

    for name in file_names:
        prompt += f"- {name}\n"

    for i in range(0, len(files), batch_size):
        batch = files[i:i + batch_size]
        for file in batch:
            summarized_content = summarize_content(file["content"], max_lines)
            prompt += f"\n### File: {file['path']}\n{summarized_content}\n"

    prompt += "\nOutput only the Jenkins pipeline code in declarative syntax."

    try:
        response = client.chat.completions.create(
            model="gpt-4-0613",
            messages=[
                {"role": "system", "content": "You are a CI/CD expert assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=2000,
        )
        pipeline_script = response.choices[0].message.content
        return clean_pipeline_script(pipeline_script)

    except Exception as e:
        print(f"Error generating pipeline: {e}")
        raise