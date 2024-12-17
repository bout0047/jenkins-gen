from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import random

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = []
    events = [
        'Pipeline failed',
        'Security vulnerability found',
        'New pull request',
        'CodeQL scan completed'
    ]
    
    for i in range(8):
        time_ago = datetime.now() - timedelta(minutes=random.randint(1, 120))
        event = random.choice(events)
        notifications.append({
            "id": str(i + 1),
            "title": event,
            "message": f"Details about {event.lower()}",
            "timestamp": time_ago.isoformat(),
            "read": random.choice([True, False])
        })
    
    return jsonify(notifications)

@notification_bp.route('/notifications/mark-all-read', methods=['POST'])
def mark_all_read():
    return jsonify({"status": "success", "message": "All notifications marked as read"})