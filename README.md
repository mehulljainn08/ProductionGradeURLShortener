# 🔗 Production-Grade URL Shortener

Hey there! 👋  
This is a full-stack URL Shortener I built using **Spring Boot** (Java) on the backend and **React** on the frontend. It’s more than just a basic project — it includes authentication, analytics, caching, and a modern dashboard. I tried to build it like something I’d actually want to use (or even deploy at scale someday).

---

## 🌐 Live Demo

- 🖥️ Frontend (Netlify): (https://privurl.netlify.app/)
- ⚙️ Backend (Render): (https://mehulj-privurl.onrender.com/)




## What It Does

- 🔐 Lets users **register/login** and manage their own URLs (with JWT-based auth)
- 🔗 Converts long URLs into short ones (like `mehul.ly/abc123`)
- 📈 Tracks every click with **timestamps and analytics**
- 🧠 Caches data using **Redis** to improve performance
- 📊 Shows everything in a clean, modern **dashboard**

It's fully functional, responsive, and deployed — backend on **Render**, frontend on **Netlify**.


  #Tech Stack

  Frontend -React + Vite + Tailwind CSS          
  Backend  -Spring Boot, Java 17                
  Auth     - JWT (JSON Web Tokens)                
  DB       - MongoDB                              
                                
 Hosting  - Netlify (frontend), Render (backend) 

---

##  How to Run Locally

###  Backend (Spring Boot)

cd shortener
./mvnw spring-boot:run
Frontend (React)

**cd shortener-frontend**
npm install
npm run dev


**Environment Variables**
**Backend (application.properties)**
spring.data.mongodb.uri=<your_mongodb_uri>
jwt.secret=<your_jwt_secret>
redis.host=localhost
redis.port=6379
**Frontend (.env)**
VITE_API_BASE_URL=http://localhost:8080/api



