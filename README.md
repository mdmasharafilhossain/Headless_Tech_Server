# User Feedback Intelligence Backend API

A scalable **AI-powered Feedback Management System** that automatically analyzes user feedback and routes it to the appropriate team.

This backend integrates **LLM intelligence using LangChain.js and Google Gemini** to classify feedback and automate internal workflows.

Built with **Node.js, Express.js, TypeScript, MongoDB, Mongoose, Zod validation, LangChain, Gemini AI, and Nodemailer**, this system enables organizations to manage user feedback efficiently while leveraging AI to extract insights.

---

# Features

## AI-Powered Feedback Analysis

The system uses **LangChain + Google Gemini** to automatically extract insights from user feedback.

For every feedback submitted, the AI analyzes the message and determines:

- Feedback **Category**
- **Priority Level**
- **Sentiment Analysis**
- Responsible **Team**

Example:

Input:

"The login system is very slow and sometimes users cannot access their accounts."

AI Output:

Category: performance  
Priority: high  
Sentiment: negative  
Team: backend

These results are automatically stored in the database.

---

## Automated Team Email Notification

When feedback is created:

1. AI determines the responsible team
2. The backend sends an email notification to that team
3. The team receives full feedback details instantly

Email contains:

- User name
- Feedback message
- Category
- Priority
- Sentiment
- Assigned team

This enables **automatic issue routing** without manual triaging.

---

## Feedback Management System

Users can submit feedback including:

- Name
- Feedback message
- Email (optional)

The backend will:

1. Validate request data
2. Process AI analysis
3. Store feedback in database
4. Send notification email

---

## Feedback Filtering & Search

The system supports filtering feedback by:

- Name
- Category
- Priority

Example API queries:

GET /api/feedback?name=john  
GET /api/feedback?category=bug  
GET /api/feedback?priority=high  

This enables quick feedback investigation and analytics.

---

## Data Validation

All requests are validated using **Zod** before processing.

Validation rules include:

- Name length validation
- Feedback message length validation
- Optional email validation

Invalid requests are rejected before reaching the database.

---

## Error Handling

A global error handling middleware ensures:

- Consistent API error responses
- Clear error messages
- Prevention of server crashes

---

# Tech Stack

| Category | Technology |
|--------|-------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| AI Integration | LangChain.js |
| LLM Model | Google Gemini |
| Validation | Zod |
| Email Service | Nodemailer |
| HTTP Client | Axios |
| Environment Management | dotenv |

---

# API Endpoints

## Feedback APIs

| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/feedback` | POST | Create new feedback |
| `/api/feedback` | GET | Get all feedback |
| `/api/feedback?name=` | GET | Filter feedback by name |
| `/api/feedback?category=` | GET | Filter by category |
| `/api/feedback?priority=` | GET | Filter by priority |

---

# Example Request

### Create Feedback

POST /api/feedback

Body:

```json
{
  "name": "Mashrafil Hossain",
  "message": "The login system is very slow and sometimes users cannot access their accounts.",
  "email": "support@company.com"
}
```
# Example Response
```json
{
  "success": true,
  "data": {
    "_id": "694cdb0a07bc5c90f7c7e89a",
    "name": "Mashrafil Hossain",
    "message": "The login system is very slow and sometimes users cannot access their accounts.",
    "category": "performance",
    "priority": "high",
    "sentiment": "negative",
    "team": "backend",
    "createdAt": "2026-03-08T19:16:26.327Z"
  }
}
```
# Setup Instructions

## Prerequisites

Before running the project, ensure you have:

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn
- Gemini API key

---

## 1️⃣ Clone & Install

```bash
git clone https://github.com/mdmasharafilhossain/Headless_Tech_Server
cd Headless_Tech_Server
npm install
```

---

## 2️⃣ Setup Environment Variables

Create a `.env` file:

```bash
PORT=5000
DB_URL=your_mongoDB_url
GEMINI_API_KEY=your_gemini_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
CLIENT_URL_PROD=client_production_link
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```
Server will start at:
```bash 
http://localhost:5000
```


