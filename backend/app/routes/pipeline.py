from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import random

pipeline_bp = Blueprint('pipeline', __name__)

@pipeline_bp.route('/pipelines', methods=['GET'])
def get_pipelines():
    pipeline_stages = [
        'Checkout',
        'Setup',
        'Build',
        'Test',
        'Security Scan',
        'Deploy'
    ]
    
    pipelines = []
    statuses = ['success', 'failed', 'in-progress']
    
    for i in range(10):
        stages = []
        current_status = random.choice(statuses)
        
        for stage in pipeline_stages:
            if current_status == 'in-progress':
                if len(stages) < random.randint(1, len(pipeline_stages) - 1):
                    stage_status = 'success'
                elif len(stages) == len(pipeline_stages) - 1:
                    stage_status = 'in-progress'
                else:
                    stage_status = 'none'
            elif current_status == 'failed':
                if len(stages) < random.randint(1, len(pipeline_stages) - 1):
                    stage_status = 'success'
                elif len(stages) == len(pipeline_stages) - 1:
                    stage_status = 'failed'
                else:
                    stage_status = 'none'
            else:
                stage_status = 'success'
            
            stages.append({
                "name": stage,
                "status": stage_status
            })
        
        time_ago = datetime.now() - timedelta(minutes=random.randint(1, 120))
        pipelines.append({
            "id": str(i + 1),
            "name": f"Pipeline #{i + 1}",
            "branch": random.choice(['main', 'develop', 'feature/new-feature']),
            "status": current_status,
            "timestamp": time_ago.isoformat(),
            "logsUrl": f"https://jenkins.example.com/job/pipeline-{i + 1}/logs",
            "stages": stages
        })
    
    return jsonify(pipelines)