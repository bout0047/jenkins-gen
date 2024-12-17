from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import random

repository_bp = Blueprint('repository', __name__)

@repository_bp.route('/repositories', methods=['GET'])
def get_repositories():
    repositories = []
    statuses = ['success', 'failed', 'in-progress']
    
    for i in range(5):
        scan_date = datetime.now() - timedelta(days=random.randint(1, 7))
        repositories.append({
            "id": str(i + 1),
            "name": f"example/repo-{i + 1}",
            "branch": random.choice(['main', 'develop']),
            "lastPipelineStatus": random.choice(statuses),
            "lastCodeQLScan": {
                "date": scan_date.isoformat(),
                "high": random.randint(0, 5),
                "medium": random.randint(2, 8),
                "low": random.randint(5, 15)
            }
        })
    
    return jsonify(repositories)