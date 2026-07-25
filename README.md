# 🚀 URL Audit Service

A production-ready **URL Audit Service** built with **Node.js** and **Express.js**.

This application audits any HTTP/HTTPS URL and returns useful metadata such as HTTP status code, response time, page title, and final URL. It includes production-grade features like caching, request validation, rate limiting, concurrency control, structured logging, automated testing, and CI.

> **Built for Digital Heroes Training Task**

---

## 🌐 Live Demo

https://your-app.onrender.com

---

## 📂 GitHub Repository

https://github.com/yourusername/page-pulse

---

# ✨ Features

- ✅ URL Validation (HTTP/HTTPS only)
- ✅ Website Status Code Detection
- ✅ Response Time Measurement
- ✅ Page Title Extraction
- ✅ Final Redirect URL Detection
- ✅ Configurable Request Timeout
- ✅ In-Memory Caching (TTL configurable)
- ✅ Cache Hit Detection
- ✅ Per-IP Rate Limiting
- ✅ Concurrency Control
- ✅ Structured JSON Error Responses
- ✅ Structured Logging with Request IDs
- ✅ RESTful API
- ✅ Jest + Supertest Test Suite
- ✅ GitHub Actions Continuous Integration
- ✅ Docker Support
- ✅ Responsive Glassmorphism UI

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Libraries

- Axios
- Node Cache
- Joi
- Express Rate Limit
- Pino Logger
- UUID

### Testing

- Jest
- Supertest

### DevOps

- GitHub Actions
- Docker

---

# 📁 Project Structure

```text
page-pulse/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── public/
│   ├── index.html
│   └── style.css
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── tests/
│   └── audit.test.js
│
├── Dockerfile
├── package.json
├── server.js
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=3000

NODE_ENV=development

CACHE_TTL=60

RATE_LIMIT_WINDOW_MS=900000

RATE_LIMIT_MAX=100

CONCURRENCY_LIMIT=50

FETCH_TIMEOUT_MS=5000
```

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Run Production Server

```bash
npm start
```

Application will be available at:

```
http://localhost:3000
```

---

# 📡 API Contract

## POST `/api/audit`

Audits a website and returns useful metadata.

### Request

```http
POST /api/audit
```

```json
{
  "url": "https://example.com"
}
```

---

## Successful Response

```json
{
  "cached": false,
  "data": {
    "statusCode": 200,
    "responseTime": 153,
    "title": "Example Domain",
    "finalUrl": "https://example.com"
  }
}
```

---

## Cached Response

```json
{
  "cached": true,
  "data": {
    "statusCode": 200,
    "responseTime": "<1ms",
    "title": "Example Domain",
    "finalUrl": "https://example.com"
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "Please enter a valid HTTP or HTTPS URL."
  }
}
```

---

# 🧪 Running Tests

Run all automated tests.

```bash
npm test
```

Current Test Coverage

- ✅ Missing URL
- ✅ Invalid URL
- ✅ Successful Audit
- ✅ Cache Validation
- ✅ Request Timeout

---

# 🚦 Continuous Integration

GitHub Actions automatically runs the test suite on every push and pull request.

Workflow:

- Install Dependencies
- Run Jest Tests
- Verify Build

---

# 🐳 Docker

Build Docker Image

```bash
docker build -t url-audit-service .
```

Run Docker Container

```bash
docker run -p 3000:3000 url-audit-service
```

---

# 🔒 Production Features

- Input Validation
- Request Timeout
- Configurable Cache TTL
- Cache Hit Detection
- Rate Limiting
- Concurrency Control
- Structured Logging
- Request IDs
- REST API
- Error Handling
- Docker Ready
- CI Ready

---

# 📸 Application Preview

> Add a screenshot here after deployment.

Example

```
docs/screenshot.png
```

---

# 📜 Credits

Built for **Digital Heroes Training Task**

https://digitalheroesco.com

---

# 📄 License

This project is developed solely for the **Digital Heroes Training Task**.