Steps to run:

1: Activate the virtual environment
cd /Users/nsac/Projects/MiniProject  # Go to the parent directory
source .venv/bin/activate           # Activate the virtual environment
cd mini-project/backend/collegeRAG  # Go to the backend directory
pip install -r requirements.txt     # Install Python dependencies
uvicorn main:app --reload          # Start the FastAPI server

2: Run the frontend
cd /Users/nsac/Projects/MiniProject/mini-project
npm install
npm run dev

