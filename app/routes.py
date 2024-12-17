from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import random

api = Blueprint('api', __name__)

# Mock data generators
def generate_metrics():
    return {
        "repositories": random.randint(5, 15),
        "activePipelines": random.randint(1, 8),
        "securityIssues": random.randint(10, 50),
        "totalScans": random.randint(20, 100),
        "repositoryTrend": {"value": random.randint(1, 20), "isPositive": random.choice([True, False])},
        "pipelineTrend": {"value": random.randint(1, 30), "isPositive": random.choice([True, False])},
        "securityTrend": {"value": random.randint(1, 15), "isPositive": random.choice([True, False])},
        "scansTrend": {"value": random.randint(1, 25), "isPositive": random.choice([True, False])}
    }

def generate_activities():
    statuses = ['success', 'failed', 'in-progress']
    events = ['Push', 'Pull Request', 'Pipeline Run', 'Security Scan']
    activities = []
    
    for i in range(5):
        time_ago = datetime.now() - timedelta(minutes=random.randint(1, 60))
        activities.append({
            "id": str(i + 1),
            "repo": f"example/repo-{i + 1}",
            "event": random.choice(events),
            "status": random.choice(statuses),
            "time": time_ago.strftime("%Y-%m-%d %H:%M:%S")
        })
    
    return activities

def generate_security_stats():
    return {
        "high": random.randint(1, 10),
        "medium": random.randint(5, 20),
        "low": random.randint(10, 30)
    }

# API Routes
@api.route('/metrics', methods=['GET'])
def get_metrics():
    return jsonify(generate_metrics())

@api.route('/activities', methods=['GET'])
def get_activities():
    return jsonify(generate_activities())

@api.route('/security/stats', methods=['GET'])
def get_security_stats():
    return jsonify(generate_security_stats())