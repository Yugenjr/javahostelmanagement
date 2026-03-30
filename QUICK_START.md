# 🚀 Quick Start Guide - Hostel Management System

## 🎯 Three Ways to Run the Application

### Method 1: Automatic (Easiest) ⚡

**Double-click**: `START-FULL-APP.bat`

This will:
- ✅ Start the backend server on port 8081
- ✅ Install frontend dependencies if needed
- ✅ Start the frontend on port 3000
- ✅ Open your browser automatically

**Wait for**: Both terminal windows to show "Compiled successfully!" and "Started HostelmanagementApplication"

---

### Method 2: Manual Start (Two Terminals) 🖥️

#### Terminal 1 - Backend
```cmd
cd Hostelmanagement
mvnw.cmd spring-boot:run
```

#### Terminal 2 - Frontend (After backend starts)
```cmd
cd Hostelmanagement\frontend
npm install
npm start
```

---

### Method 3: Demo Mode Only (Frontend) 🎨

If you just want to see the UI with mock data:

```cmd
cd Hostelmanagement\frontend
npm install
npm start
```

The app will automatically use mock data when backend is unavailable!

---

## 🔑 Login Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | `admin` | `admin123` | Full system access |
| **Warden** | `warden` | `warden123` | Manage rooms & complaints |
| **Student** | `student1` | `student123` | View & submit complaints |

---

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081
- **H2 Console** (if enabled): http://localhost:8081/h2-console

---

## ⚙️ Database Setup (Optional)

### Using H2 (Default - No Setup Needed)
The application is pre-configured to use H2 in-memory database. Just run and go!

### Using PostgreSQL (Production)

1. **Install PostgreSQL** from https://www.postgresql.org/download/

2. **Create Database**:
```sql
CREATE DATABASE hostel_db;
```

3. **Update Configuration** in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hostel_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

4. **Uncomment PostgreSQL settings** and comment out H2 settings in `application.properties`

---

## 🐛 Troubleshooting

### Port Already in Use
If port 8081 or 3000 is already in use:

**For Backend (Port 8081)**:
- Change port in `application.properties`: `server.port=8082`

**For Frontend (Port 3000)**:
- Set environment variable: `PORT=3001 npm start`

### Backend Not Starting
1. Check Java version: `java -version` (Should be 17+)
2. Clean and rebuild:
```cmd
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

### Frontend Not Starting
1. Delete `node_modules` and reinstall:
```cmd
cd frontend
rmdir /s /q node_modules
npm install
npm start
```

### Database Connection Error
- If using PostgreSQL, ensure it's running: `net start postgresql-x64-14`
- Verify credentials in `application.properties`
- Or switch to H2 by updating `application.properties`

---

## 📦 What's Included

✅ Complete authentication system with JWT
✅ Beautiful, modern UI with Material-UI
✅ Room management with visual cards
✅ Complaint tracking system
✅ Fee management
✅ Interactive dashboard with charts
✅ Mock data fallback for demos
✅ Responsive design (works on mobile!)
✅ Role-based access control
✅ Real-time notifications

---

## 📱 Features by Role

### Admin
- View full dashboard with analytics
- Manage all rooms
- View all students
- Handle all complaints
- Generate reports
- Manage fees

### Warden
- View dashboard statistics
- Manage rooms
- Assign rooms to students
- Handle complaints
- View fee status

### Student
- View personal dashboard
- Submit complaints
- Track complaint status
- View fee dues
- View assigned room

---

## 💡 Tips for Best Experience

1. **Use Chrome or Firefox** for best compatibility
2. **Start backend first**, wait 10-20 seconds, then start frontend
3. **Check console logs** if something doesn't work
4. **Use demo mode** (mock data) for quick presentations
5. **Clear browser cache** if you see old data

---

## 🎓 For Development

### Backend Development
```cmd
mvnw.cmd spring-boot:run
# Hot reload enabled with spring-boot-devtools
```

### Frontend Development
```cmd
cd frontend
npm start
# Hot reload enabled by default with React
```

### Run Tests
```cmd
# Backend tests
mvnw.cmd test

# Frontend tests
cd frontend
npm test
```

---

## 📧 Need Help?

- Check console logs for errors
- Verify all dependencies are installed
- Ensure ports 8081 and 3000 are available
- Try running in demo mode (frontend only)

---

## ✨ First Time Setup Checklist

- [ ] Java 17+ installed
- [ ] Node.js 16+ installed  
- [ ] Navigated to Hostelmanagement folder
- [ ] Run `mvnw.cmd clean install` once
- [ ] Run `cd frontend && npm install` once
- [ ] Double-click `START-FULL-APP.bat`
- [ ] Wait for both servers to start
- [ ] Open http://localhost:3000
- [ ] Login with demo credentials
- [ ] Enjoy! 🎉

---

**Made with ❤️ for SECE 2024-28**

