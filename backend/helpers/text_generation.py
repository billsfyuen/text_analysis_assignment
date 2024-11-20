import os
import replicate
from dotenv import load_dotenv

# Language model from Replicate
# meta/meta-llama-3-8b-instruct

load_dotenv();

replicate.api = os.getenv('REPLICATE_API_TOKEN')

if replicate.api is None:
    raise ValueError("Repliate Token missing")

def generate_text(prompt):
    input = {
        "prompt": prompt,
        "max_new_tokens": 512,
        "system_prompt": "You are an expert in text classification",
        "prompt_template": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
    }

    try:
        output = replicate.run(
            "meta/meta-llama-3-8b-instruct",
            input=input
        )
        return ("".join(output))
    except Exception as e:
        print(f"Error: {e}")
        raise