import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist

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
        nltk.download('averaged_perceptron_tagger', download_dir=project_path)
        nltk.download('maxent_ne_chunker', download_dir=project_path)
        nltk.download('words', download_dir=project_path)
        nltk.download('punkt', download_dir=project_path)
        nltk.download('punkt_tab', download_dir=project_path)
        nltk.download('stopwords', download_dir=project_path)
    except Exception as e:
        print(f"Error downloading NLTK data: {e}")
        raise
    
download_nltk_data()

stop_words = set(stopwords.words('english'))

def extract_keywords(text, num_keywords=5):
    """
    Extract the most common keywords from the input text.

    Parameters:
    - text (str): The input text to analyze.

    Returns:
    - List[str]: A list of the most common keywords.
    """
    try: 
        words = word_tokenize(text.lower())
        # Filter out non-alphanumeric words and stop words
        words = [word for word in words if word.isalnum() and word not in stop_words]
        freq_dist = FreqDist(words)
        return [word for word, _ in freq_dist.most_common(num_keywords)]
    except Exception as e:
        print(f"Error extracting keywords: {e}")
        raise