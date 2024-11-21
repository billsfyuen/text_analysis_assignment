# AI Text Analysis Assignment

This is a coding assignment developed by Bill YUEN for a job interview.

## Features

- Keyword Extraction: Identifies and extracts the most important keywords or phrases from a text.
- Text Summarization: Generates a concise summary of a longer text.
- Topic Classification: Categorizes the text into predefined topics (e.g., sports, politics, technology, entertainment).

## Project Structure

1. Backend (Python/Flask)
2. Frontend (Next.js)

## Setup and Installation

### Pre-installation

1. Clone the project from Github

   ```
   git clone git@github.com:billsfyuen/text_analysis_assignment.git
   ```

2. Models from [Hugging Face](https://huggingface.co/facebook/bart-large-cnn) and [Replicate](https://replicate.com/meta/meta-llama-3-8b-instruct) are utilized in this project. You need to connect to the internet while using it.

3. Set up a `.env` file in the project root to include the required API token. In the `.env` file, include the following line:

   ```
   REPLICATE_API_TOKEN=your_secret_key
   ```

Make sure to replace `your_secret_key` with your actual API token.
The program will still run without the API token, but some features may not function properly.

### Backend

1. Navigate to the `backend` directory:

   ```
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use `.venv\\Scripts\\activate`
   ```

3. Install the required packages (and platform-specific packages):

   ```
   pip install tensorflow tf-keras transformers scikit-learn
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

The backend server will start running on `http://127.0.0.1:5000`.

### Frontend

1. Navigate to the `frontend` directory:

   ```
   cd frontend
   ```

2. Install the required packages:

   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

The frontend will be accessible at `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Choose an analysis option.
3. Enter the text you want to analyze in the provided text area and click the button.
4. The system will display the extracted keywords, text summary, and classified topic.

## Customization

1. The number of keywords (for Keyword Extraction) and the list of predefined topics (for Topic Classification) can be customized
2. Simply make updates in `backend/helpers/customize.py`.
