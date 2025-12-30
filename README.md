# ScrollEats - Food Discovery Platform 🍕

> A full-stack MERN application that brings the Instagram Reels experience to food discovery, allowing users to swipe through restaurant food videos, save favorites, and connect with food partners.

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

**Live Demo:** [Coming Soon]  
**GitHub:** [https://github.com/softdev-kartik-singhal/scrolleats](https://github.com/softdev-kartik-singhal/scrolleats)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [What I Learned](#what-i-learned)
- [Architecture](#architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

---

## 🎯 Overview

ScrollEats is a modern food discovery platform inspired by Instagram Reels and TikTok, built to solve the problem of finding and saving interesting food content. Users can browse vertical-scrolling food videos from restaurants, save their favorites, and food partners can showcase their dishes through engaging video content.

**Problem Solved:** Traditional restaurant browsing is static and uninspiring. ScrollEats brings dynamic, engaging video content to food discovery, making it easier for users to find dishes they love and for restaurants to showcase their offerings.

---

## ✨ Key Features

### For Users
- 📱 **Vertical Scrolling Reels** - Instagram-style infinite scroll with auto-play videos
- ❤️ **Like & Save System** - Interactive engagement with real-time updates
- 🔖 **Saved Reels Page** - Dedicated view for bookmarked content
- 🔐 **Secure Authentication** - JWT-based auth with HTTP-only cookies
- 🎨 **Modern Landing Page** - Gradient design with glassmorphism effects
- 📱 **Fully Responsive** - Mobile-first design that works on all devices

### For Food Partners
- 🏪 **Partner Dashboard** - Upload and manage food videos
- 📊 **Engagement Tracking** - View likes and saves on content
- 🎥 **Video Upload** - Direct integration with ImageKit CDN
- 👤 **Profile Management** - Showcase restaurant information

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI architecture
- **React Router** - Client-side routing with protected routes
- **Axios** - HTTP client for API communication
- **Material-UI Icons** - Modern icon library
- **CSS3** - Custom styling with Flexbox, Grid, and animations
- **Glassmorphism** - Modern UI design trend implementation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - RESTful API framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB with schema validation
- **JWT** - Stateless authentication tokens
- **bcrypt.js** - Password hashing for security
- **Cookie-Parser** - Secure cookie management
- **Multer** - File upload handling
- **ImageKit** - Cloud-based video storage and CDN

### DevOps & Tools
- **Git & GitHub** - Version control
- **Nodemon** - Development auto-reload
- **Vite** - Fast frontend build tool
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📚 What I Learned

### Full-Stack Development
✅ **MERN Stack Mastery** - Built complete application from scratch using MongoDB, Express, React, and Node.js  
✅ **RESTful API Design** - Implemented proper REST principles with clear endpoint structure  
✅ **State Management** - Managed complex client-side state with React hooks (useState, useEffect, useRef)  
✅ **Authentication Flow** - Implemented secure JWT-based authentication with refresh token strategy  

### Database & Backend
✅ **MongoDB Schema Design** - Created normalized schemas with proper relationships (User, FoodItem, Likes, Saves)  
✅ **Mongoose ODM** - Used population, virtuals, and schema validation  
✅ **Data Modeling** - Designed efficient many-to-many relationships for likes and saves  
✅ **Query Optimization** - Implemented efficient queries with aggregation pipelines  

### Frontend Development
✅ **React Best Practices** - Component composition, props drilling prevention, and custom hooks  
✅ **Responsive Design** - Mobile-first CSS with media queries and flexible layouts  
✅ **Intersection Observer API** - Auto-play videos based on viewport visibility  
✅ **Conditional Rendering** - Authentication-based UI with protected routes  
✅ **Modern CSS** - Glassmorphism, gradients, animations, and transitions  

### Security
✅ **Password Hashing** - Implemented bcrypt for secure password storage  
✅ **JWT Tokens** - Stateless authentication with HTTP-only cookies  
✅ **CORS Configuration** - Proper cross-origin request handling  
✅ **Input Validation** - Server-side validation to prevent malicious data  

### Cloud Services
✅ **ImageKit Integration** - Cloud storage for video files with CDN delivery  
✅ **MongoDB Atlas** - Cloud database deployment and management  
✅ **Environment Variables** - Secure configuration management  

### Development Practices
✅ **Git Workflow** - Proper version control with meaningful commits  
✅ **Code Organization** - MVC pattern with clear separation of concerns  
✅ **Error Handling** - Comprehensive try-catch blocks and error responses  
✅ **API Testing** - Manual testing with proper status codes and responses  

### Problem-Solving Skills
✅ **Debugging** - Resolved CORS issues, authentication bugs, and state management problems  
✅ **Performance Optimization** - Lazy loading, efficient queries, and CDN usage  
✅ **User Experience** - Smooth animations, loading states, and error messages  

---

## 🏗️ Architecture

### Project Structure
```
ScrollEats/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── food.controller.js
│   │   │   └── food-partner.controller.js
│   │   ├── models/           # Database schemas
│   │   │   ├── user.model.js
│   │   │   ├── foodItem.model.js
│   │   │   ├── foodPartner.model.js
│   │   │   ├── likes.model.js
│   │   │   └── save.model.js
│   │   ├── routes/           # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── foodItem.routes.js
│   │   │   └── food-partner.routes.js
│   │   ├── middlewares/      # Auth & validation
│   │   │   └── auth.middleware.js
│   │   ├── services/         # External services
│   │   │   └── storage.service.js
│   │   ├── db/               # Database connection
│   │   │   └── db.js
│   │   └── app.js            # Express app setup
│   └── server.js             # Entry point
│
├── frontend/ScrollEats/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Reel.jsx
│   │   │   └── BottomNav.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── general/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── SavedReels.jsx
│   │   │   ├── auth/
│   │   │   │   ├── UserLogin.jsx
│   │   │   │   ├── UserRegister.jsx
│   │   │   │   ├── Food-PartnerLogin.jsx
│   │   │   │   └── Food-PartnerRegister.jsx
│   │   │   └── food-partner/
│   │   │       ├── CreateFood.jsx
│   │   │       └── Profile.jsx
│   │   ├── routes/           # Routing config
│   │   │   └── AppRoutes.jsx
│   │   └── styles/           # CSS files
│   │       ├── Reels.css
│   │       ├── LandingPage.css
│   │       └── auth.css
│   └── index.html
│
└── README.md
```

### Data Flow
1. **User Authentication** → JWT token stored in HTTP-only cookie
2. **Video Upload** → Multer → ImageKit CDN → MongoDB URL storage
3. **Reels Feed** → MongoDB query → Populate likes/saves → React rendering
4. **Like/Save** → Optimistic UI update → API call → Database update

---

## 🚀 Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- ImageKit account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/softdev-kartik-singhal/scrolleats.git
cd scrolleats
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/scrolleats
JWT_SECRET=your_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

3. **Frontend Setup**
```bash
cd ../frontend/ScrollEats
npm install
```

4. **Run the Application**

Terminal 1 (Backend):
```bash
cd backend
nodemon server.js
```

Terminal 2 (Frontend):
```bash
cd frontend/ScrollEats
npm run dev
```

Access at: http://localhost:5173

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/user/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Food Endpoints

#### Get All Reels
```http
GET /api/food
Cookie: token=<jwt_token>
```

Response:
```json
{
  "message": "Food Items fetched successfully",
  "foodItems": [
    {
      "_id": "...",
      "name": "Margherita Pizza",
      "description": "Classic Italian pizza",
      "video": "https://...",
      "likesCount": 42,
      "likedBy": ["userId1", "userId2"],
      "savedBy": ["userId3"]
    }
  ]
}
```

#### Get Saved Reels
```http
GET /api/food/saved
Cookie: token=<jwt_token>
```

#### Like/Unlike Reel
```http
POST /api/food/like
Content-Type: application/json
Cookie: token=<jwt_token>

{
  "foodId": "food_item_id"
}
```

#### Save/Unsave Reel
```http
POST /api/food/save
Content-Type: application/json
Cookie: token=<jwt_token>

{
  "foodId": "food_item_id"
}
```

---

## 📸 Screenshots

### Landing Page
Modern gradient design with floating food cards and call-to-action buttons for new users.

### Reels Feed
Vertical scrolling interface with auto-playing videos, like/save buttons, and restaurant information.

### Saved Reels
Dedicated page showing all bookmarked food items for easy access.

---

## 🎓 Resume Highlights

**Key Achievements:**
- Built full-stack MERN application with 10+ API endpoints
- Implemented JWT authentication with secure cookie management
- Designed responsive UI with modern CSS (Glassmorphism, animations)
- Integrated cloud services (MongoDB Atlas, ImageKit CDN)
- Created efficient database schemas with proper relationships
- Implemented real-time like/save functionality with optimistic UI updates

**Technical Skills Demonstrated:**
- Full-Stack Development (MERN)
- RESTful API Design
- Database Modeling & Optimization
- Authentication & Security
- Cloud Integration
- Responsive Web Design
- Git Version Control

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Kartik Singhal**  
Full-Stack Developer

- GitHub: [@softdev-kartik-singhal](https://github.com/softdev-kartik-singhal)
- LinkedIn: [Add your LinkedIn]
- Portfolio: [Add your portfolio]

---

## 🙏 Acknowledgments

- Inspired by Instagram Reels and TikTok
- Built with modern web technologies
- Thanks to the open-source community

---

**⭐ If you found this project interesting, please give it a star!**
