# 🔐 HOSTEL MANAGEMENT SYSTEM - TESTING CREDENTIALS

## 📋 LOGIN CREDENTIALS

### 🔧 Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Administrator
- **Email:** `admin@hostel.com`
- **Phone:** `9876543210`
- **Access:** Full system access, user management, reports, room allocation

### 👨‍💼 Warden Account
- **Username:** `warden1`
- **Password:** `warden123`
- **Role:** Warden
- **Name:** Jane Smith
- **Email:** `warden@hostel.com`
- **Phone:** `9876543220`
- **Access:** Complaint management, room oversight, student management

### 👨‍🎓 Student Accounts

#### Student 1
- **Username:** `student1`
- **Password:** `student123`
- **Name:** John Doe
- **Email:** `john.doe@student.com`
- **Phone:** `9876543212`
- **Room:** 101 (Single, ₹5000/month)
- **Status:** Active, Room Allocated

#### Student 2
- **Username:** `student2`
- **Password:** `student123`
- **Name:** Alice Johnson
- **Email:** `alice.johnson@student.com`
- **Phone:** `9876543213`
- **Room:** 201 (Single, ₹5000/month)
- **Status:** Active, Room Allocated

#### Student 3
- **Username:** `student3`
- **Password:** `student123`
- **Name:** Bob Wilson
- **Email:** `bob.wilson@student.com`
- **Phone:** `9876543214`
- **Room:** Not Allocated
- **Status:** Active, Available for Room Assignment

---

## 🌐 APPLICATION URLS

### Frontend
- **Login Page:** `http://localhost:3000`
- **Dashboard:** `http://localhost:3000/dashboard`

### Backend API
- **Base API URL:** `http://localhost:8080/api`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **API Documentation:** `http://localhost:8080/v3/api-docs`

### Database
- **MySQL Database:** `hostel`
- **Username:** `root`
- **Password:** `yugen842007`
- **Port:** `3306`
- **URL:** `jdbc:mysql://localhost:3306/hostel`

---

## 🧪 TESTING SCENARIOS

### 1. Authentication Testing
```
✅ Login as Admin → Full access to all features
✅ Login as Warden → Complaint management, room oversight
✅ Login as Student → Personal dashboard, complaint submission
✅ Invalid credentials → Error handling
✅ JWT token expiration → Auto logout after 24 hours
```

### 2. Room Management Testing
```
✅ Admin can view all rooms (30 rooms across 3 floors)
✅ Admin can allocate rooms to students
✅ Available rooms: 101-110, 201-210, 301-310
✅ Room types: Single (₹5000), Double (₹7000)
✅ Occupied rooms: 101 (John Doe), 201 (Alice Johnson)
```

### 3. Complaint System Testing
```
✅ Sample complaints exist for testing:
   - Student1: AC not working (HIGH priority, PENDING)
   - Student1: WiFi issues (MEDIUM priority, IN_PROGRESS)
   - Student2: Water leakage (HIGH priority, RESOLVED)
```

### 4. User Roles & Permissions
```
ADMIN can:
✅ Manage all users
✅ Allocate/deallocate rooms
✅ View all complaints
✅ Generate reports
✅ System configuration

WARDEN can:
✅ View/manage complaints
✅ Update complaint status
✅ Add warden remarks
✅ View room occupancy

STUDENT can:
✅ View personal dashboard
✅ Submit complaints
✅ View complaint status
✅ Update profile
```

---

## 🔍 API ENDPOINTS FOR TESTING

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available` - Get available rooms
- `POST /api/rooms/{roomId}/allocate` - Allocate room

### Complaints
- `GET /api/complaints` - Get complaints (filtered by role)
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/{id}` - Update complaint
- `PUT /api/complaints/{id}/status` - Update complaint status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

---

## 🧪 POSTMAN TESTING

### Import Postman Collection
```
File: Hostel_Management_API.postman_collection.json
Location: Project root directory
```

### Sample API Calls
```
1. Login Request:
   POST http://localhost:8080/api/auth/login
   Body: {"username": "admin", "password": "admin123"}

2. Get Dashboard Stats:
   GET http://localhost:8080/api/dashboard/stats
   Header: Authorization: Bearer <token>

3. Create Complaint:
   POST http://localhost:8080/api/complaints
   Header: Authorization: Bearer <student_token>
   Body: {
     "title": "Test Complaint",
     "description": "Testing complaint system",
     "type": "MAINTENANCE",
     "priority": "MEDIUM"
   }
```

---

## 🚀 QUICK START TESTING

### Step 1: Start Application
```cmd
cd "C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement"
run-integrated-app.bat
```

### Step 2: Test Login Flow
1. Open `http://localhost:3000`
2. Login with `admin` / `admin123`
3. Verify dashboard loads with statistics
4. Test navigation between different modules

### Step 3: Test Student Features
1. Logout and login as `student1` / `student123`
2. View personal dashboard
3. Submit a new complaint
4. Check complaint status

### Step 4: Test Warden Features
1. Login as `warden1` / `warden123`
2. View pending complaints
3. Update complaint status
4. Add warden remarks

---

## 📊 SAMPLE DATA OVERVIEW

- **Total Rooms:** 30 (across 3 floors)
- **Occupied Rooms:** 2
- **Available Rooms:** 28
- **Total Users:** 5 (1 Admin, 1 Warden, 3 Students)
- **Sample Complaints:** 3 (1 Pending, 1 In Progress, 1 Resolved)
- **Room Types:** Single (₹5000), Double (₹7000)

---

## 🐛 TROUBLESHOOTING

### Common Issues:
1. **MySQL Connection Error** → Ensure MySQL is running
2. **CORS Error** → Check frontend is running on port 3000
3. **401 Unauthorized** → Check JWT token is valid
4. **Database Not Found** → Run `setup-database.bat`

### Default Ports:
- **Frontend:** 3000
- **Backend:** 8080
- **MySQL:** 3306

---

**🎯 Ready to Test! Use these credentials to explore all features of the Hostel Management System.**
