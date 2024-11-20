from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers.keyword_extraction import extract_keywords
from helpers.text_summarization import summarize_text
from helpers.topic_classification import classify_topic
from helpers.text_generation import generate_text

app = Flask(__name__)
CORS(app)

@app.route('/extract_keywords', methods=['POST'])
def api_extract_keywords():
    """
    API endpoint to extract keywords from the provided text.
    Expects a JSON payload with 'text' and 'num_keywords'.
    Returns a JSON object containing the extracted keywords.
    """
    data = request.json
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input.'}), 400
    
    text = data['text']
    
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': 'text must be non-empty'}), 400
    
    keywords = extract_keywords(text)
    return jsonify({'keywords': keywords})

@app.route('/summarize_text', methods=['POST'])
def api_summarize_text():
    """
    API endpoint to summarize the provided text.
    Expects a JSON payload with 'text'.
    Returns a JSON object containing the summarized text.
    """
    data = request.json
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input.'}), 400
    
    text = data['text']
    
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': 'text must be non-empty'}), 400
    
    summary = summarize_text(text)
    return jsonify({'summary': summary})

@app.route('/classify_topic', methods=['POST'])
def api_classify_topic():
    """
    API endpoint to classify the topic of the provided text.
    Expects a JSON payload with 'text'.
    Returns a JSON object containing the classified topic.
    """
    data = request.json
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input.'}), 400
    
    text = data['text']
    
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': 'text must be non-empty'}), 400
    
    topic = classify_topic(text)
    return jsonify({'topic': topic})

# Not in assignment, for development purposes
@app.route('/generate_text', methods=['POST'])
def api_generate_text():
    """
    API endpoint to generate text based on a prompt.
    Expects a JSON payload with 'prompt'.
    Returns a JSON object containing the generated text.
    If the prompt is missing, returns a 400 error.
    """
    data = request.json
    prompt = data['prompt']

    if not data or 'prompt' not in data:
        return jsonify({'error': 'Invalid input. Expected key: prompt'}), 400

    generated_text = generate_text(prompt)
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)