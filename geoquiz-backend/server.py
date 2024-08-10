from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz_results.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class QuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quiz_type = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
with app.app_context():
    db.create_all()

@app.route('/api/results/', methods=['POST'])
def save_result():
    data = request.json
    new_result = QuizResult(
        quiz_type = data['quiz_type'],
        score = data['score'],
        total_questions = data['total_questions']
    )
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'message': 'Result saved successfully'}), 201

@app.route('/api/results', methods=['GET'])
def get_results():
    results = QuizResult.query.all()
    results_list = [
        {
            'quiz_type': result.quiz_type,
            'score': result.score,
            'total_questions': result.total_questions,
            'data': result.date
        }
        for result in results
    ]
    return jsonify(results_list), 200

if __name__ == "__main__":
    app.run(debug=True)

