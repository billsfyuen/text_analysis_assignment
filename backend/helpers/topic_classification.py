from .topics import TOPICS
from .text_generation import generate_text

def prompt_constructor(topics, text):
    topic_string = ', '.join(topics)
    prompt = (
        f"Identify the relevant topic for the following text. Provide only the topic without any additional information.\n\n"
        f"Choose from: {topic_string}\n\n"
        f"Text: \"{text}\""
    )
    return prompt
    
def classify_topic(text):

    prompt = prompt_constructor(TOPICS, text)
    topic = generate_text(prompt)

    return topic