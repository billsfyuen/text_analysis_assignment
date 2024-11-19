from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.probability import FreqDist
import nltk

nltk.download('punkt')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

def summarize_text(text, num_sentences=3):
    sentences = sent_tokenize(text)
    words = word_tokenize(text.lower())
    
    # Remove stopwords and calculate word frequencies
    word_frequencies = FreqDist(word for word in words if word.isalnum() and word not in stop_words)
    
    # Calculate sentence scores based on word frequencies
    sentence_scores = {}
    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in word_frequencies:
                if sentence not in sentence_scores:
                    sentence_scores[sentence] = word_frequencies[word]
                else:
                    sentence_scores[sentence] += word_frequencies[word]
    
    # Sort sentences by score and select the top ones
    summary_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:num_sentences]
    
    # Sort the selected sentences in their original order
    summary_sentences.sort(key=lambda s: sentences.index(s))
    
    summary = ' '.join(summary_sentences)
    return summary