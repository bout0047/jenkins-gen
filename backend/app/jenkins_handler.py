import jenkins
from app.config import JENKINS_URL, JENKINS_USER, JENKINS_TOKEN

def send_to_jenkins(job_name, pipeline_script):
    """
    Send a pipeline script to Jenkins and trigger the build.

    Args:
        job_name (str): Name of the Jenkins job
        pipeline_script (str): The pipeline script content

    Returns:
        None
    """
    try:
        # Set a valid timeout value
        connect_timeout = 10
        server = jenkins.Jenkins(
            JENKINS_URL,
            username=JENKINS_USER,
            password=JENKINS_TOKEN,
            timeout=connect_timeout
        )

        pipeline_job_config = f"""
        <flow-definition plugin="workflow-job">
            <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps">
                <script>{pipeline_script}</script>
                <sandbox>true</sandbox>
            </definition>
        </flow-definition>
        """

        if server.job_exists(job_name):
            server.reconfig_job(job_name, pipeline_job_config)
        else:
            server.create_job(job_name, pipeline_job_config)

        server.build_job(job_name)
        print(f"Successfully triggered build for job '{job_name}'.")

    except jenkins.JenkinsException as e:
        print(f"Error interacting with Jenkins: {e}")
        raise