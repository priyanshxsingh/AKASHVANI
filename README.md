# AKASHVANI

## Prerequisites

Verify that the necessary dependencies are installed on your system:

```bash
node --version
npm --version
python3 --version
git --version
```

---

## Installation & Setup

### 1. ML / FastAPI Backend

Navigate to the ML directory:

```bash
cd ml
```

Create a virtual environment:

```bash
python3.12 -m venv venv
```

Activate the virtual environment:

* **Linux / macOS:**
  ```bash
  source venv/bin/activate
  ```
* **Windows:**
  ```bash
  .\venv\Scripts\activate
  ```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

* **API:** http://localhost:8000
* **Swagger Docs:** http://localhost:8000/docs

---

### 2. Frontend

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

* **Frontend:** http://localhost:5173

---

## Running Both Services

Running AKASHVANI locally requires two terminals running simultaneously:

* **Terminal 1:** FastAPI Backend (`http://localhost:8000`)
* **Terminal 2:** React/Vite Frontend (`http://localhost:5173`)