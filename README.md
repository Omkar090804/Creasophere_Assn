# SigmaValue — Mini Real Estate Analysis Chatbot 

This package contains a **React** frontend and a **Django + DRF** backend that:
- Accepts a query (e.g., "Analyze Wakad")
- Parses a sample Excel file and returns:
  - A short (mocked) natural-language summary
  - JSON for charts (price/demand per year)
  - Filtered table rows for the requested area
- Includes a "Download filtered data" button in the frontend

## What's included
- `backend/` — Django project with a DRF endpoint `/api/analyze/`
- `frontend/` — React app (simple chat-style UI, Chart with Recharts)
- `backend/sample_data.xlsx` — sample Excel used by the API
- `run_commands.txt` — quick start commands

## Quick setup (development)

### Backend (Python 3.10+ recommended)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # on Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend (Node.js 18+ recommended)
```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000 for frontend and http://localhost:8000/api/analyze/?q=Wakad for the API.


