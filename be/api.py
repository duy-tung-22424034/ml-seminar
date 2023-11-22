from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS library
from sentence_transformers import SentenceTransformer, util
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# Load a Pre-trained Model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Prepare the Movie Database
movies = {
    'Stepbrother': 'Comedic journey full of adult humor and awkwardness.',
    'The Matrix': 'Deals with alternate realities and questioning what\'s real.',
    'Shutter Island': 'A mind-bending plot with twists and turns.',
    'Memento': 'A non-linear narrative that challenges the viewer\'s perception.',
    'Doctor Strange': 'Features alternate dimensions and reality manipulation.',
    'Paw Patrol': 'Children\'s animated movie where a group of adorable puppies save people from all sorts of emergencies.',
    'Interstellar': 'Features futuristic space travel with high stakes'
}

# Generate Embeddings
corpus_embeddings = model.encode(list(movies.values()), convert_to_tensor=True)

def find_similar_movies(query, top_k=1):
    query_embedding = model.encode(query, convert_to_tensor=True)
    
    # Compute cosine similarity between query and corpus
    cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]

    # Using torch.topk to find the highest 1 scores
    top_results = torch.topk(cos_scores, k=top_k)

    similar_movies = []
    for idx in top_results[1]:
        similar_movies.append(list(movies.keys())[idx])

    return similar_movies

# Example Query
# query = "A movie about virtual reality"
# similar_movies = find_similar_movies(query)
# print("Similar Movies:", similar_movies)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')  # Get the query from URL parameter
    top_k = request.args.get('top_k', default=1, type=int)
    similar_movies = find_similar_movies(query, top_k)
    return jsonify(similar_movies)

if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False in a production environment
