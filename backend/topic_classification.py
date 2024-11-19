from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

topics = ['sports', 'politics', 'technology', 'entertainment']
X = [
    "The team scored a goal in the final minute of the match.",
    "The president signed a new bill into law yesterday.",
    "The new smartphone features an advanced AI chip.",
    "The movie won several awards at the festival."
]
y = topics

def classify_topic(text):
    model = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', MultinomialNB()),
    ])
    model.fit(X, y)
    return model.predict([text])[0]