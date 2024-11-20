from .customize import TOPICS
from .text_generation import generate_text

def prompt_constructor(topics, text):

    if not isinstance(topics, list) or not all(isinstance(topic, str) for topic in topics):
        raise ValueError("Topics must be a list of strings.")
        
    topic_string = ', '.join(topics)
    prompt = (
        f"Identify the relevant topic for the following text. Provide only the topic without any additional information.\n\n"
        f"Choose from: {topic_string}\n\n"
        f"Text: \"{text}\""
    )
    print(prompt)
    return prompt
    
def classify_topic(text):

    prompt = prompt_constructor(TOPICS, text)

    try:
        topic = generate_text(prompt)
        return topic
    except Exception as e:
        print(f"Error: {e}")
        raise