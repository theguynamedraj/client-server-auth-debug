# 🛠 The Silent Server – Backend Debugging Assignment

## 📌 Overview

This project is a backend debugging challenge focused on fixing a broken authentication flow in a Node.js + Express API.

The objective was to identify and resolve issues in:

- Session management  
- OTP verification  
- Cookie handling  
- JWT generation  
- Middleware authentication  

After debugging, the authentication flow works end-to-end.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- cookie-parser
- Custom middleware (Logger + Auth)

---

## 🔐 Authentication Flow

The fixed authentication flow works as follows:

### 1️⃣ Login – Generate Session + OTP

**Endpoint:**
```
POST /auth/login
```

- Accepts email and password
- Generates a temporary login session (2-minute expiry)
- Generates a 6-digit OTP
- Logs OTP in the server console
- Returns `loginSessionId`

---

### 2️⃣ Verify OTP – Create Session Cookie

**Endpoint:**
```
POST /auth/verify-otp
```

- Validates loginSessionId
- Verifies OTP
- Checks session expiry
- Sets secure HTTP-only cookie: `session_token`

---

### 3️⃣ Generate JWT Access Token

**Endpoint:**
```
POST /auth/token
```

- Reads `session_token` from cookies
- Validates session
- Issues JWT access token (15-minute expiry)

---

### 4️⃣ Access Protected Route

**Endpoint:**
```
GET /protected
```

- Requires `Authorization: Bearer <token>`
- Validates JWT
- Returns:
  - User info
  - Unique `success_flag`

---

## 🧪 How to Run

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start Server

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 🧪 Testing with curl

### Login

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"your@email.com\",\"password\":\"password123\"}"
```

---

### Verify OTP

```bash
curl -c cookies.txt -X POST http://localhost:3000/auth/verify-otp -H "Content-Type: application/json" -d "{\"loginSessionId\":\"<ID>\",\"otp\":\"<OTP>\"}"
```

---

### Get Token

```bash
curl -b cookies.txt -X POST http://localhost:3000/auth/token
```

---

### Access Protected Route

```bash
curl -H "Authorization: Bearer <JWT>" http://localhost:3000/protected
```

---

## 🐞 Bugs Identified & Fixed

| Issue | Fix Applied |
|-------|------------|
| Logger middleware not calling `next()` | Added `next()` |
| Auth middleware not calling `next()` | Added `next()` |
| Missing cookie-parser middleware | Added `app.use(cookieParser()` |
| `/auth/token` incorrectly reading Authorization header | Updated to read from cookie |
| OTP not logged to console | Fixed console logging |
| Short session expiry causing debugging issues | Increased during testing |

---

## 📁 Submission Details

- Public GitHub repository
- `output.txt` includes:
  - Login output
  - OTP verification output
  - Token generation output
  - Protected route output with `success_flag`

---

## 🎯 Key Concepts Demonstrated

- Stateful vs Stateless authentication
- Cookie-based sessions
- JWT-based access control
- Middleware debugging
- Request lifecycle in Express
- Expiry validation
- Secure cookie handling

---

## 👨‍💻 Author

**Raj Aryan**  
Backend & Full Stack Developer  

