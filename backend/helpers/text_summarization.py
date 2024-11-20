from transformers import pipeline

# Text Summarization model from Hugging Face
# facebook/bart-large-cnn

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text, max_length=130, min_length=30):
    """
    Summarize the input text using a pre-trained summarization model.

    Parameters:
    - text (str): The input text to summarize.
    - max_length (int): The maximum length of the summary (default is 130).
    - min_length (int): The minimum length of the summary (default is 30).

    Returns:
    - str: The summarized text.
    """
    try:
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Error: {e}")
        raise