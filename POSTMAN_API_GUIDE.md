# 🚀 Postman API Guide - Hostel Management System

## 🔐 Setup Instructions

### 1. Start MySQL Server
```cmd
net start mysql80
```

### 2. Start Backend
```cmd
cd C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement
mvnw.cmd spring-boot:run
```

### 3. Backend Running at:
**Base URL**: `http://localhost:8081`

---

## 📋 API Endpoints for Postman

### 🔑 AUTHENTICATION

#### 1. Register User (Create Account)
```
POST http://localhost:8081/api/auth/register
Content-Type: application/json

Body (JSON):
{
  "username": "warden1",
  "password": "warden123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@hostel.com",
  "phoneNumber": "9876543210",
  "role": "WARDEN",
  "address": "123 Main St",
  "emergencyContact": "9999999999"
}
```

**Roles**: `ADMIN`, `WARDEN`, `STUDENT`

#### 2. Login
```
POST http://localhost:8081/api/auth/login
Content-Type: application/json

Body (JSON):
{
  "username": "warden1",
  "password": "warden123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "warden1",
    "firstName": "John",
    "lastName": "Doe",
    "role": "WARDEN"
  }
}
```

**IMPORTANT**: Copy the `token` value for all subsequent requests!

---

### 👥 USERS / STUDENTS (Warden Access)

#### 3. Get All Students
```
GET http://localhost:8081/api/users?role=STUDENT
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Get All Users
```
GET http://localhost:8081/api/users
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 5. Get User by ID
```
GET http://localhost:8081/api/users/{id}
Authorization: Bearer YOUR_TOKEN_HERE

Example: http://localhost:8081/api/users/1
```

#### 6. Update User
```
PUT http://localhost:8081/api/users/{id}
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "firstName": "John",
  "lastName": "Doe Updated",
  "email": "john.updated@hostel.com",
  "phoneNumber": "9876543210",
  "address": "456 New Street",
  "emergencyContact": "8888888888"
}
```

#### 7. Delete User
```
DELETE http://localhost:8081/api/users/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 🏠 ROOMS (Warden Access)

#### 8. Get All Rooms
```
GET http://localhost:8081/api/rooms
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 9. Get Room by ID
```
GET http://localhost:8081/api/rooms/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 10. Create Room
```
POST http://localhost:8081/api/rooms
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "roomNumber": "A101",
  "roomType": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "monthlyRent": 5000,
  "status": "AVAILABLE",
  "description": "Single occupancy room with attached bathroom",
  "amenities": "AC, WiFi, Study Table, Wardrobe"
}
```

**Room Types**: `SINGLE`, `DOUBLE`, `TRIPLE`, `DORMITORY`
**Status**: `AVAILABLE`, `OCCUPIED`, `MAINTENANCE`, `OUT_OF_ORDER`

#### 11. Update Room
```
PUT http://localhost:8081/api/rooms/{id}
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "roomNumber": "A101",
  "roomType": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "monthlyRent": 5500,
  "status": "OCCUPIED",
  "description": "Updated description",
  "amenities": "AC, WiFi, Study Table, Wardrobe, TV"
}
```

#### 12. Delete Room
```
DELETE http://localhost:8081/api/rooms/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 13. Allocate Room to Student
```
POST http://localhost:8081/api/rooms/{roomId}/allocate/{studentId}
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 📝 COMPLAINTS (Warden Access)

#### 14. Get All Complaints
```
GET http://localhost:8081/api/complaints
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 15. Get Complaint by ID
```
GET http://localhost:8081/api/complaints/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 16. Create Complaint
```
POST http://localhost:8081/api/complaints
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "title": "AC Not Working",
  "description": "The AC in room A101 has stopped working since yesterday",
  "type": "ELECTRICAL",
  "priority": "HIGH"
}
```

**Types**: `ELECTRICAL`, `PLUMBING`, `FURNITURE`, `CLEANING`, `INTERNET`, `SECURITY`, `OTHER`
**Priority**: `LOW`, `MEDIUM`, `HIGH`, `URGENT`

#### 17. Update Complaint
```
PUT http://localhost:8081/api/complaints/{id}
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "title": "AC Not Working - Updated",
  "description": "AC still not working, needs urgent attention",
  "type": "ELECTRICAL",
  "priority": "URGENT"
}
```

#### 18. Update Complaint Status
```
PUT http://localhost:8081/api/complaints/{id}/status
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "status": "IN_PROGRESS"
}
```

**Status**: `PENDING`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `REJECTED`

#### 19. Add Warden Remarks
```
PUT http://localhost:8081/api/complaints/{id}/remarks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "wardenRemarks": "Technician assigned, will be fixed by tomorrow"
}
```

#### 20. Delete Complaint
```
DELETE http://localhost:8081/api/complaints/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 💰 FEES (Warden Access)

#### 21. Get All Fees
```
GET http://localhost:8081/api/fees
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 22. Get Fees by Student ID
```
GET http://localhost:8081/api/fees/student/{studentId}
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 23. Create Fee Record
```
POST http://localhost:8081/api/fees
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "studentId": 1,
  "amount": 5000,
  "dueDate": "2025-11-30",
  "feeType": "HOSTEL_FEE",
  "month": 11,
  "year": 2025,
  "paymentStatus": "PENDING"
}
```

**Fee Types**: `HOSTEL_FEE`, `MESS_FEE`, `SECURITY_DEPOSIT`, `MAINTENANCE_FEE`, `OTHER`
**Payment Status**: `PENDING`, `PAID`, `OVERDUE`, `PARTIAL`, `CANCELLED`

#### 24. Update Fee Record
```
PUT http://localhost:8081/api/fees/{id}
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "amount": 5500,
  "dueDate": "2025-11-30",
  "feeType": "HOSTEL_FEE",
  "paymentStatus": "PENDING"
}
```

#### 25. Record Payment
```
PUT http://localhost:8081/api/fees/{id}/pay
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body (JSON):
{
  "paymentMethod": "UPI",
  "transactionId": "TXN123456789",
  "paidDate": "2025-10-29"
}
```

**Payment Methods**: `CASH`, `CARD`, `BANK_TRANSFER`, `UPI`, `CHEQUE`, `ONLINE`

#### 26. Delete Fee Record
```
DELETE http://localhost:8081/api/fees/{id}
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 📊 DASHBOARD (Warden Access)

#### 27. Get Dashboard Statistics
```
GET http://localhost:8081/api/dashboard/stats
Authorization: Bearer YOUR_TOKEN_HERE

Response:
{
  "totalRooms": 50,
  "occupiedRooms": 38,
  "availableRooms": 10,
  "maintenanceRooms": 2,
  "totalStudents": 38,
  "totalComplaints": 45,
  "pendingComplaints": 12,
  "resolvedComplaints": 28,
  "totalRevenue": 190000,
  "pendingFees": 25000,
  "collectedFees": 165000,
  "occupancyRate": 76
}
```

---

## 🔧 Postman Collection Setup

### Create Environment Variables:
1. Variable: `base_url` → Value: `http://localhost:8081`
2. Variable: `token` → Value: (paste token after login)

### Add Authorization Header:
```
Key: Authorization
Value: Bearer {{token}}
```

---

## 📝 Sample Data for Testing

### 1. Create Warden Account
```json
POST /api/auth/register
{
  "username": "warden1",
  "password": "warden123",
  "firstName": "John",
  "lastName": "Warden",
  "email": "warden@hostel.com",
  "phoneNumber": "9876543210",
  "role": "WARDEN"
}
```

### 2. Create Student Account
```json
POST /api/auth/register
{
  "username": "student1",
  "password": "student123",
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@student.com",
  "phoneNumber": "8765432109",
  "role": "STUDENT",
  "address": "123 Student Street",
  "emergencyContact": "9999888877"
}
```

### 3. Create Room
```json
POST /api/rooms
{
  "roomNumber": "A101",
  "roomType": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "monthlyRent": 5000,
  "status": "AVAILABLE",
  "description": "Single room with AC",
  "amenities": "AC, WiFi, Study Table"
}
```

### 4. Create Complaint
```json
POST /api/complaints
{
  "title": "WiFi Not Working",
  "description": "WiFi connection is very slow in my room",
  "type": "INTERNET",
  "priority": "MEDIUM"
}
```

### 5. Create Fee Record
```json
POST /api/fees
{
  "studentId": 2,
  "amount": 5000,
  "dueDate": "2025-11-30",
  "feeType": "HOSTEL_FEE",
  "month": 11,
  "year": 2025,
  "paymentStatus": "PENDING"
}
```

---

## 🧪 Testing Workflow

### Step-by-Step:

1. **Start MySQL**: `net start mysql80`

2. **Start Backend**: `mvnw.cmd spring-boot:run`

3. **Register Warden**:
   ```
   POST /api/auth/register (with WARDEN role)
   ```

4. **Login as Warden**:
   ```
   POST /api/auth/login
   Copy the token from response
   ```

5. **Add Token to Postman**:
   - Go to Authorization tab
   - Type: Bearer Token
   - Token: Paste your token

6. **Create Students**:
   ```
   POST /api/auth/register (with STUDENT role) - repeat 3-5 times
   ```

7. **Create Rooms**:
   ```
   POST /api/rooms - create 5-10 rooms
   ```

8. **View Data in Frontend**:
   - Login as warden1/warden123
   - See all data from MySQL

9. **Create Complaints**:
   ```
   POST /api/complaints - create 2-3 complaints
   ```

10. **Create Fee Records**:
    ```
    POST /api/fees - create fee records for students
    ```

---

## ✅ Verification

### Check MySQL Database:
```sql
mysql -u root -p

USE hostel_db;

-- View all tables
SHOW TABLES;

-- Check data
SELECT * FROM users;
SELECT * FROM rooms;
SELECT * FROM complaints;
SELECT * FROM fees;

-- Count records
SELECT COUNT(*) FROM users WHERE role = 'STUDENT';
SELECT COUNT(*) FROM rooms WHERE status = 'AVAILABLE';
```

---

## 🎯 Warden Access Summary

### ✅ Warden Can See:
1. **Dashboard** - Statistics and charts
2. **Students** - All student records
3. **Rooms** - All room management
4. **Complaints** - All complaints (can update status)
5. **Fees** - All fee records

### ❌ Warden Cannot See:
- Reports (Admin only)
- Settings (Admin only)

---

## 🚀 Quick Start Commands

```cmd
# Terminal 1 - MySQL
net start mysql80

# Terminal 2 - Backend
cd C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement
mvnw.cmd spring-boot:run

# Terminal 3 - Frontend
cd C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement\frontend
npm start
```

---

## 📞 API Base URLs

- **Backend API**: http://localhost:8081
- **Frontend**: http://localhost:3000

---

**Now you can use Postman to populate MySQL database and the frontend will display real data!** 🎉

