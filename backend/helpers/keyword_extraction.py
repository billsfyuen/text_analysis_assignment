import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer

# Define the path to the nltk_data directory
# Downloaded data will be stored in project directory
project_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "nltk_data")

if not os.path.exists(project_path):
    try:
        os.makedirs(project_path)
    except OSError as e:
        print(f"Error creating directory {project_path}: {e}")
        raise

nltk.data.path.append(project_path)

def download_nltk_data():
    try:
        nltk.download('words', download_dir=project_path)
        nltk.download('punkt', download_dir=project_path)
        nltk.download('punkt_tab', download_dir=project_path)
        nltk.download('stopwords', download_dir=project_path)
    except Exception as e:
        print(f"Error downloading NLTK data: {e}")
        raise
    
download_nltk_data()

def extract_keywords(text, num_keywords):
    """
    Extract the most common keywords from the input text.

    Parameters:
    - text (str): The input text to analyze.

    Returns:
    - List[str]: A list of the most common keywords.
    """
    try: 
        tokenized_words = word_tokenize(text.lower())
        
        # Remove stopwords and non-alphabetic words
        stop_words = set(stopwords.words('english'))
        tokenized_words = [word for word in tokenized_words if word.isalpha() and word not in stop_words]
        cleaned_text = ' '.join(tokenized_words)
        
        # Get feature words, TF-IDF scores using TF-IDF vectorizer
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([cleaned_text])
        feature_words = vectorizer.get_feature_names_out()
        tfidf_scores = tfidf_matrix.toarray()[0]
        
        # Create (word, score) tuples
        word_scores = list(zip(feature_words, tfidf_scores))
        
        # Sort by score in descending order and get top keywords
        sorted_word_scores = sorted(word_scores, key=lambda x: x[1], reverse=True)
        keywords = [word for word, score in sorted_word_scores[:num_keywords]]
    
        return keywords
        
    except Exception as e:
        print(f"Error extracting keywords: {e}")
        raise