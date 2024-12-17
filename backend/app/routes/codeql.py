from flask import Blueprint, jsonify
import random

codeql_bp = Blueprint('codeql', __name__)

@codeql_bp.route('/codeql/results', methods=['GET'])
def get_codeql_results():
    vulnerabilities = []
    severities = ['high', 'medium', 'low']
    
    for i in range(15):
        severity = random.choice(severities)
        vulnerabilities.append({
            "id": str(i + 1),
            "severity": severity,
            "filePath": f"src/components/Component{i + 1}.tsx",
            "line": random.randint(1, 100),
            "description": f"Sample vulnerability {i + 1}",
            "githubUrl": f"https://github.com/example/repo/blob/main/src/components/Component{i + 1}.tsx#L{random.randint(1, 100)}"
        })
    
    return jsonify({
        "high": len([v for v in vulnerabilities if v['severity'] == 'high']),
        "medium": len([v for v in vulnerabilities if v['severity'] == 'medium']),
        "low": len([v for v in vulnerabilities if v['severity'] == 'low']),
        "vulnerabilities": vulnerabilities
    })