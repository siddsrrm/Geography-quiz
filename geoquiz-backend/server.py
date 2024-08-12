from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

# Initialize Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the app
CORS(app)

# Configure SQLAlchemy to use an SQLite database file named 'quiz_results.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz_results.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable SQLAlchemy event system to save resources

# Initialize SQLAlchemy with the app
db = SQLAlchemy(app)

# Define a model for storing quiz results
class QuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    quiz_type = db.Column(db.String(50), nullable=False)  
    score = db.Column(db.Integer, nullable=False) 
    total_questions = db.Column(db.Integer, nullable=False) 
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc)) 

# Create the database tables if they don't already exist
with app.app_context():
    db.create_all()

# Define a route for saving a quiz result (HTTP POST method)
@app.route('/api/results/', methods=['POST'])
def save_result():
    data = request.json  # Get the JSON data sent with the request
    new_result = QuizResult( #create QuizResult object from JSON data
        quiz_type=data['quiz_type'], 
        score=data['score'],  
        total_questions=data['total_questions'] 
    )
    db.session.add(new_result)  # Add the new result to the database session
    db.session.commit()  # Commit the session to save the result in the database
    return jsonify({'message': 'Result saved successfully'}), 201  # Return a success message

# Define a route for retrieving quiz results (HTTP GET method)
@app.route('/api/results/', methods=['GET'])
def get_results():
    results = QuizResult.query.all()  # Query all results from the database
    results_list = [
        {
            'quiz_type': result.quiz_type, 
            'score': result.score, 
            'total_questions': result.total_questions, 
            'date': result.date 
        }
        for result in results  # Iterate over the results
    ]
    return jsonify(results_list), 200  # Return the list of results as JSON

# Start the Flask development server if the script is executed directly
if __name__ == "__main__":
    app.run(debug=True)
