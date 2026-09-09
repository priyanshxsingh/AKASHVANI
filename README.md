# 🌧️ AKASHVANI

## AI-Powered Flood Early Warning & Inundation Prediction System

> **AI/ML-Based Integrated Heavy Rainfall Early Warning and Inundation Prediction System**

AKASHVANI is an AI/ML-powered platform designed to provide **early warnings for heavy rainfall, flood risk, and potential inundation**.

The system combines meteorological data, environmental parameters, machine-learning predictions, risk analysis, and an interactive dashboard to transform complex data into **actionable flood-risk information**.

---

## 🚨 Problem Statement

Heavy rainfall and flooding can cause significant damage to:

- Human lives
- Infrastructure
- Roads and transportation
- Agriculture
- Public utilities
- Local economies

Existing warning systems may not always provide sufficiently localized and actionable information.

AKASHVANI aims to address this problem by integrating multiple data sources and machine-learning models into a unified platform capable of:

**Collect → Fuse → Analyze → Predict → Assess Risk → Visualize → Alert**

---

## 🎯 Objectives

- Detect heavy rainfall conditions.
- Analyze meteorological and environmental parameters.
- Predict potential flood risks.
- Predict potential inundation risks.
- Provide location-based risk assessment.
- Identify high-risk and priority areas.
- Visualize weather and flood-risk information.
- Provide early-warning information.
- Integrate machine-learning predictions with a web-based dashboard.
- Build a modular and scalable architecture for future real-time data integration.

---

## ✨ Features

### 🌧️ Heavy Rainfall Detection

Analyzes rainfall and meteorological parameters to identify potentially dangerous rainfall conditions.

### 🌊 Flood Risk Prediction

Uses a trained machine-learning model to estimate potential flood risk from environmental and meteorological inputs.

### 🧠 AI/ML Prediction

The system integrates a trained machine-learning model:

```text
AKASHVANI_AI_MODEL.joblib
```

to generate predictions.

### 🗺️ Risk Visualization

The dashboard can display:

- Risk levels
- Rainfall
- Flood probability
- Vulnerable locations
- Priority areas
- Weather information
- Prediction results

### 📊 Interactive Dashboard

Provides a centralized interface for monitoring weather conditions, flood risk, predictions, and important statistics.

### 🚨 Early Warning

The system categorizes locations according to their predicted risk to help identify areas requiring attention.

### 🔐 Authentication

Clerk is used for:

- User registration
- User login
- Session management
- Protected routes
- User account management

### ⚡ FastAPI Backend

FastAPI provides the API layer connecting the frontend with the machine-learning system.

### 🧩 Modular ML Architecture

The ML system is organized into separate components:

```text
fusion_engine.py
ml_engine.py
risk_engine.py
```

This keeps the prediction pipeline modular and easier to maintain.

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Clerk

## Backend

- Python
- FastAPI
- Uvicorn
- Joblib

## Machine Learning

- Python
- NumPy
- Pandas
- Scikit-learn
- XGBoost
- Random Forest
- LSTM
- CNN
- PyTorch
- TensorFlow
- SHAP
- Joblib

## Geospatial Processing

- GeoPandas
- Rasterio
- GDAL
- PostGIS

## Deployment

- Vercel
- Render

---

# 📁 Project Structure

```text
AKASHVANI/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── services/
│   │   └── ml_service.py
│   │
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env
│   └── .gitignore
│
├── ml/
│   ├── model/
│   │   └── AKASHVANI_AI_MODEL.joblib
│   │
│   ├── .gitignore
│   ├── fusion_engine.py
│   ├── ml_engine.py
│   └── risk_engine.py
│
├── .gitignore
└── README.md
```

---

# 🧠 Machine Learning Architecture

The machine-learning layer is responsible for processing environmental inputs, running the trained model, and generating a flood-risk assessment.

```text
                    ┌──────────────────────┐
                    │    Input Weather     │
                    │   & Environment Data │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Fusion Engine      │
                    │ fusion_engine.py     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     ML Engine        │
                    │    ml_engine.py      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Trained Model      │
                    │                      │
                    │ AKASHVANI_AI_MODEL   │
                    │      .joblib         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Risk Engine       │
                    │   risk_engine.py     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Risk Assessment    │
                    │                      │
                    │ LOW / MODERATE /     │
                    │ HIGH / CRITICAL      │
                    └──────────────────────┘
```

---

# 🤖 ML Components

## `fusion_engine.py`

Responsible for combining and preparing relevant input data before the data is passed to the machine-learning pipeline.

Potential input parameters may include:

- Rainfall
- Temperature
- Humidity
- Atmospheric pressure
- Weather observations
- Numerical Weather Prediction data
- Geographic information
- Environmental parameters

---

## `ml_engine.py`

Responsible for interacting with the trained machine-learning model.

The trained model is located at:

```text
ml/model/AKASHVANI_AI_MODEL.joblib
```

The general inference flow is:

```text
Input Features
      │
      ▼
Feature Preparation
      │
      ▼
Trained ML Model
      │
      ▼
Prediction
```

---

## `risk_engine.py`

Responsible for processing the model output and converting it into an understandable risk assessment.

Possible risk categories include:

```text
LOW
MODERATE
HIGH
CRITICAL
```

General flow:

```text
ML Prediction
      │
      ▼
Risk Processing
      │
      ▼
Risk Classification
      │
      ├── LOW
      ├── MODERATE
      ├── HIGH
      └── CRITICAL
```

---

# 📦 ML Model

The trained model is stored inside:

```text
ml/model/AKASHVANI_AI_MODEL.joblib
```

The ML directory contains:

```text
ml/
│
├── model/
│   └── AKASHVANI_AI_MODEL.joblib
│
├── .gitignore
├── fusion_engine.py
├── ml_engine.py
└── risk_engine.py
```

The `.joblib` file is loaded by the ML engine during prediction.

---

# 🔌 Backend–ML Integration

The FastAPI backend communicates with the machine-learning layer through:

```text
backend/services/ml_service.py
```

The complete integration flow is:

```text
React Frontend
      │
      │ HTTP Request
      ▼
FastAPI Backend
      │
      ▼
ml_service.py
      │
      ▼
fusion_engine.py
      │
      ▼
ml_engine.py
      │
      ▼
AKASHVANI_AI_MODEL.joblib
      │
      ▼
risk_engine.py
      │
      ▼
Prediction Result
      │
      ▼
FastAPI Response
      │
      ▼
React Dashboard
```

---

# 🔌 API

The FastAPI backend provides the communication layer between the frontend and the ML system.

Example prediction endpoint:

```text
POST /predict
```

Example request:

```json
{
  "rainfall": 88.5,
  "temperature": 27.4,
  "humidity": 91,
  "latitude": 26.14,
  "longitude": 91.73
}
```

Example response:

```json
{
  "risk_level": "HIGH",
  "probability": 87.4,
  "prediction": "Flood Risk Detected"
}
```

> API fields may vary depending on the current backend and ML implementation.

---

# 🔄 Prediction Workflow

```text
┌──────────────────────────────┐
│ Weather / Environmental Data │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Fusion Engine           │
│     fusion_engine.py         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        ML Engine             │
│       ml_engine.py           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   AKASHVANI_AI_MODEL.joblib  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Risk Engine            │
│      risk_engine.py          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Risk Assessment         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      FastAPI Response        │
└──────────────────────────────┘
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Git
- Node.js
- npm
- Python 3

---

# 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd AKASHVANI
```

---

# 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=your_backend_url
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 3. Backend Setup

Open a new terminal.

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment.

### macOS / Linux

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 4. ML Setup

The trained model should be present at:

```text
ml/model/AKASHVANI_AI_MODEL.joblib
```

The ML layer contains:

```text
ml/
├── model/
│   └── AKASHVANI_AI_MODEL.joblib
├── .gitignore
├── fusion_engine.py
├── ml_engine.py
└── risk_engine.py
```

The backend uses the ML layer to generate prediction results.

---

# 🌐 Deployment

## Frontend

The AKASHVANI frontend is deployed using Vercel.

Live application:

```text
https://akashvani-alpha.vercel.app/
```

## Backend

The FastAPI backend is deployed using Render.

Live backend:

```text
https://akashvani-x2pf.onrender.com
```

Frontend backend configuration:

```env
VITE_API_URL=https://akashvani-x2pf.onrender.com
```

---

# 🔐 Environment Variables

Never commit sensitive environment variables or secrets to GitHub.

## Frontend `.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=
```

## Backend `.env`

```env
MODEL_PATH=../ml/model/AKASHVANI_AI_MODEL.joblib
```

---

# 🚫 `.gitignore`

Recommended `.gitignore`:

```gitignore
# Environment files
.env
.env.*
!.env.example

# Node
node_modules/
dist/

# Python
venv/
.venv/
env/
__pycache__/
*.py[cod]

# Logs
*.log

# Jupyter
.ipynb_checkpoints/
```

---

# 📊 Risk Levels

| Risk Level | Meaning |
|------------|---------|
| 🟢 Low | Normal conditions |
| 🟡 Moderate | Conditions require monitoring |
| 🟠 High | Potentially dangerous conditions |
| 🔴 Critical | Immediate attention recommended |

> Actual risk thresholds depend on the implementation of the trained model and risk engine.

---

# 🧪 Prototype Data

The current prototype may use **mocked, simulated, or locally generated data** where live weather, radar, satellite, or observational feeds are not yet connected.

This allows the complete application workflow to be demonstrated while keeping the architecture ready for integration with real-world data sources.

---

# 📡 Future Real-Time Data Integration

Future versions can integrate:

- Satellite data
- Weather radar data
- Automatic Weather Stations
- Numerical Weather Prediction data
- Real-time rainfall data
- Water-level sensors
- Geographic information
- Historical flood datasets

---

# 🚀 Future Improvements

Future versions of AKASHVANI can integrate:

- 🛰️ Satellite imagery
- 📡 Weather radar data
- 🌧️ Automatic Weather Stations
- 🌦️ Numerical Weather Prediction (NWP) data
- 🗺️ High-resolution inundation maps
- 📍 Real-time geolocation
- 📱 Mobile application
- 🔔 SMS alerts
- 📧 Email alerts
- 🔔 Push notifications
- 🧠 Continuous ML model improvement
- 🗃️ Historical flood database
- 🌊 Real-time water-level monitoring
- 📊 Advanced analytics
- 🏙️ Urban drainage information
- 🧭 Evacuation route recommendations
- 🤖 Advanced ensemble ML models
- 🧠 Explainable AI using SHAP
- 🌐 Real-time weather API integration
- 🛰️ Satellite-based flood monitoring
- 📡 IoT sensor integration

---

# ⚠️ Disclaimer

AKASHVANI is a **prototype / hackathon project** designed to demonstrate an AI-assisted flood early-warning architecture.

Predictions generated by the prototype should not be considered a substitute for official meteorological, hydrological, or disaster-management warnings.

For real-world deployment, the system would require:

- Extensive model validation
- Reliable real-time data sources
- Calibrated prediction models
- Large-scale historical datasets
- Infrastructure testing
- Continuous monitoring
- Model performance evaluation
- Integration with authorized disaster-management systems

---

# 👥 Team

**Project:** AKASHVANI

**Domain:**

AI/ML-Based Heavy Rainfall Early Warning & Flood/Inundation Prediction

**Event:**

Smart India Hackathon (SIH)

---

# ⭐ Vision

> **"From rainfall prediction to actionable early warning — saving lives through intelligent technology."**

AKASHVANI aims to transform complex environmental data into **simple, actionable, location-aware flood-risk information** that can help communities and authorities prepare before disaster strikes.
