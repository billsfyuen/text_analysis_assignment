import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist

project_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "backend", "nltk_data")

if not os.path.exists(project_path):
    os.makedirs(project_path)

nltk.data.path.append(project_path)

nltk.download('punkt', download_dir=project_path)
nltk.download('punkt_tab', download_dir=project_path)
nltk.download('stopwords', download_dir=project_path)

stop_words = set(stopwords.words('english'))

def extract_keywords(text, num_keywords=5):
    words = word_tokenize(text.lower())
    words = [word for word in words if word.isalnum() and word not in stop_words]
    freq_dist = FreqDist(words)
    return [word for word, _ in freq_dist.most_common(num_keywords)]