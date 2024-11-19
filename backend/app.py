from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers.keyword_extraction import extract_keywords
from helpers.text_summarization import summarize_text
from helpers.topic_classification import classify_topic

app = Flask(__name__)
CORS(app)

@app.route('/extract_keywords', methods=['POST'])
def api_extract_keywords():
    data = request.json
    text = data['text']
    num_keywords = data['num_keywords']
    keywords = extract_keywords(text, num_keywords)
    return jsonify({'keywords': keywords})

@app.route('/summarize_text', methods=['POST'])
def api_summarize_text():
    data = request.json
    text = data['text']
    summary = summarize_text(text)
    return jsonify({'summary': summary})

@app.route('/classify_topic', methods=['POST'])
def api_classify_topic():
    data = request.json
    text = data['text']
    topic = classify_topic(text)
    return jsonify({'topic': topic})

if __name__ == '__main__':
    app.run(debug=True)