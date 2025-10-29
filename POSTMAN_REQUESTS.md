# Hostel Management API - Complete Postman Collection

## 🔐 Authentication

### 1. Login (Get JWT Token)
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### 2. Register New User
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "firstName": "New",
  "lastName": "User",
  "email": "newuser@hostel.com",
  "phoneNumber": "9876543215",
  "role": "STUDENT",
  "address": "123 New User St",
  "emergencyContact": "9876543299"
}
```

## 👥 User Management

### 3. Get All Users (Admin only)
```http
GET http://localhost:8080/api/users
Authorization: Bearer YOUR_JWT_TOKEN
```

### 4. Get User by ID
```http
GET http://localhost:8080/api/users/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### 5. Update User
```http
PUT http://localhost:8080/api/users/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name",
  "email": "updated@hostel.com",
  "phoneNumber": "9876543299",
  "address": "Updated Address",
  "emergencyContact": "9876543298"
}
```

### 6. Delete User (Admin only)
```http
DELETE http://localhost:8080/api/users/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🏠 Room Management

### 7. Get All Rooms
```http
GET http://localhost:8080/api/rooms
Authorization: Bearer YOUR_JWT_TOKEN
```

### 8. Get Room by ID
```http
GET http://localhost:8080/api/rooms/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### 9. Create New Room (Admin only)
```http
POST http://localhost:8080/api/rooms
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "roomNumber": "401",
  "floor": 4,
  "roomType": "SINGLE",
  "capacity": 1,
  "rent": 5500.00,
  "description": "Single room on 4th floor with AC"
}
```

### 10. Update Room
```http
PUT http://localhost:8080/api/rooms/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "roomNumber": "101",
  "floor": 1,
  "roomType": "SINGLE",
  "capacity": 1,
  "rent": 5200.00,
  "description": "Updated room description",
  "status": "AVAILABLE"
}
```

### 11. Delete Room (Admin only)
```http
DELETE http://localhost:8080/api/rooms/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### 12. Allocate Room to Student
```http
POST http://localhost:8080/api/rooms/1/allocate
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "studentId": 2
}
```

### 13. Deallocate Room
```http
POST http://localhost:8080/api/rooms/1/deallocate
Authorization: Bearer YOUR_JWT_TOKEN
```

### 14. Get Available Rooms
```http
GET http://localhost:8080/api/rooms/available
Authorization: Bearer YOUR_JWT_TOKEN
```

### 15. Get Rooms by Floor
```http
GET http://localhost:8080/api/rooms/floor/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📝 Complaint Management

### 16. Get All Complaints
```http
GET http://localhost:8080/api/complaints
Authorization: Bearer YOUR_JWT_TOKEN
```

### 17. Get Complaint by ID
```http
GET http://localhost:8080/api/complaints/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### 18. Create New Complaint
```http
POST http://localhost:8080/api/complaints
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Broken Window",
  "description": "The window in my room is broken and needs repair",
  "complaintType": "MAINTENANCE",
  "priority": "MEDIUM",
  "roomId": 1
}
```

### 19. Update Complaint Status (Warden/Admin)
```http
PUT http://localhost:8080/api/complaints/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "assignedTo": "Maintenance Team",
  "resolution": "Work in progress"
}
```

### 20. Resolve Complaint
```http
PUT http://localhost:8080/api/complaints/1/resolve
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "resolution": "Window has been repaired and replaced"
}
```

### 21. Get Complaints by Status
```http
GET http://localhost:8080/api/complaints/status/OPEN
Authorization: Bearer YOUR_JWT_TOKEN
```

### 22. Get My Complaints (Student)
```http
GET http://localhost:8080/api/complaints/my
Authorization: Bearer YOUR_JWT_TOKEN
```

## 💰 Fee Management

### 23. Get All Fees
```http
GET http://localhost:8080/api/fees
Authorization: Bearer YOUR_JWT_TOKEN
```

### 24. Get Fee by ID
```http
GET http://localhost:8080/api/fees/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### 25. Create Fee Record (Admin only)
```http
POST http://localhost:8080/api/fees
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "studentId": 2,
  "feeType": "HOSTEL_FEE",
  "amount": 5000.00,
  "dueDate": "2024-12-01T00:00:00",
  "description": "Monthly hostel fee for December"
}
```

### 26. Update Fee
```http
PUT http://localhost:8080/api/fees/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "amount": 5200.00,
  "dueDate": "2024-12-01T00:00:00",
  "description": "Updated monthly hostel fee"
}
```

### 27. Mark Fee as Paid
```http
POST http://localhost:8080/api/fees/1/pay
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "paymentMethod": "ONLINE",
  "transactionId": "TXN987654321"
}
```

### 28. Get Student Fees
```http
GET http://localhost:8080/api/fees/student/2
Authorization: Bearer YOUR_JWT_TOKEN
```

### 29. Get My Fees (Student)
```http
GET http://localhost:8080/api/fees/my
Authorization: Bearer YOUR_JWT_TOKEN
```

### 30. Get Overdue Fees
```http
GET http://localhost:8080/api/fees/overdue
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 Dashboard & Reports

### 31. Get Dashboard Summary
```http
GET http://localhost:8080/api/dashboard/summary
Authorization: Bearer YOUR_JWT_TOKEN
```

### 32. Generate Report
```http
POST http://localhost:8080/api/reports/generate
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "reportType": "OCCUPANCY",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "format": "PDF"
}
```

## 🔧 Demo Data Creation

### 33. Create Mock Students
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "student4",
  "password": "student123",
  "firstName": "Emily",
  "lastName": "Brown",
  "email": "emily.brown@student.com",
  "phoneNumber": "9876543216",
  "role": "STUDENT",
  "address": "456 Student Ave",
  "emergencyContact": "9876543297"
}
```

### 34. Create Mock Warden
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "warden2",
  "password": "warden123",
  "firstName": "Mike",
  "lastName": "Johnson",
  "email": "mike.johnson@hostel.com",
  "phoneNumber": "9876543230",
  "role": "WARDEN",
  "address": "Warden Quarters Block B",
  "emergencyContact": "9876543231"
}
```

### 35. Create Mock Room
```http
POST http://localhost:8080/api/rooms
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "roomNumber": "501",
  "floor": 5,
  "roomType": "DOUBLE",
  "capacity": 2,
  "rent": 7500.00,
  "description": "Double room on 5th floor with balcony"
}
```

## 📋 Pre-configured Demo Credentials

After running the application, these users will be automatically created:

- **Admin**: `admin` / `admin123`
- **Warden**: `warden1` / `warden123`  
- **Students**: `student1`, `student2`, `student3` / `student123`

## 🔑 How to Use

1. **First, login** with any of the demo credentials to get a JWT token
2. **Copy the token** from the login response
3. **Add the token** to the Authorization header as `Bearer YOUR_JWT_TOKEN`
4. **Use the token** for all subsequent API calls

## 📝 Notes

- Replace `YOUR_JWT_TOKEN` with the actual token received from login
- All timestamps should be in ISO format: `YYYY-MM-DDTHH:mm:ss`
- Admin users can access all endpoints
- Wardens can manage complaints and view reports  
- Students can only access their own data and create complaints

## Room Management

### 4. Create Room
```
POST http://localhost:8080/api/rooms
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "roomNumber": "101",
  "roomType": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "monthlyRent": 5000.00,
  "status": "AVAILABLE",
  "description": "Single occupancy room with attached bathroom",
  "amenities": "WiFi, AC, Study Table, Wardrobe"
}
```

### 5. Get All Rooms
```
GET http://localhost:8080/api/rooms
Authorization: Bearer {{token}}
```

### 6. Get Available Rooms
```
GET http://localhost:8080/api/rooms/available
Authorization: Bearer {{token}}
```

### 7. Update Room
```
PUT http://localhost:8080/api/rooms/1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "roomNumber": "101",
  "roomType": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "monthlyRent": 5500.00,
  "status": "OCCUPIED",
  "description": "Single occupancy room with attached bathroom - Updated",
  "amenities": "WiFi, AC, Study Table, Wardrobe, Mini Fridge"
}
```

## Complaint Management

### 8. Create Complaint (Student)
```
POST http://localhost:8080/api/complaints
Authorization: Bearer {{student_token}}
Content-Type: application/json

{
  "title": "AC not working",
  "description": "The air conditioning unit in room 101 is not cooling properly",
  "type": "ELECTRICAL",
  "priority": "HIGH",
  "student": {
    "id": 2
  }
}
```

### 9. Get All Complaints (Admin/Warden)
```
GET http://localhost:8080/api/complaints
Authorization: Bearer {{token}}
```

### 10. Update Complaint Status
```
PUT http://localhost:8080/api/complaints/1/status?status=RESOLVED&remarks=AC repaired and tested
Authorization: Bearer {{token}}
```

## Fee Management

### 11. Create Fee Record
```
POST http://localhost:8080/api/fees
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "amount": 5000.00,
  "dueDate": "2024-01-31",
  "feeType": "HOSTEL_FEE",
  "month": 1,
  "year": 2024,
  "student": {
    "id": 2
  }
}
```

### 12. Record Payment
```
POST http://localhost:8080/api/fees/1/pay?transactionId=TXN123456789
Authorization: Bearer {{token}}
```

### 13. Get Student Fees
```
GET http://localhost:8080/api/fees/student/2
Authorization: Bearer {{token}}
```

## User Management

### 14. Get All Users (Admin)
```
GET http://localhost:8080/api/users
Authorization: Bearer {{token}}
```

### 15. Get Users by Role
```
GET http://localhost:8080/api/users/role/STUDENT
Authorization: Bearer {{token}}
```

### 16. Update User
```
PUT http://localhost:8080/api/users/2
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe Updated",
  "email": "john.doe.updated@student.com",
  "phoneNumber": "9876543214",
  "address": "456 Updated St",
  "emergencyContact": "9876543215",
  "active": true
}
```

## Dashboard

### 17. Get Dashboard Statistics
```
GET http://localhost:8080/api/dashboard/stats
Authorization: Bearer {{token}}
```

## Reports

### 18. Generate Report
```
POST http://localhost:8080/api/reports
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "reportName": "Monthly Room Occupancy Report",
  "reportType": "ROOM_OCCUPANCY_REPORT",
  "reportData": "Sample report data",
  "fileFormat": "PDF",
  "generatedBy": {
    "id": 1
  }
}
```

## Testing Flow

1. **Register admin user** (#1)
2. **Login as admin** (#2) - Save the token
3. **Create some rooms** (#4)
4. **Register student user** (#3)
5. **Login as student** - Save student token
6. **Create complaint as student** (#8)
7. **View complaints as admin** (#9)
8. **Update complaint status** (#10)
9. **Create fee record** (#11)
10. **Record payment** (#12)
11. **Check dashboard stats** (#17)

## Environment Variables for Postman

Create these variables in Postman:
- `baseUrl`: http://localhost:8080
- `token`: (set after login)
- `student_token`: (set after student login)

## Response Examples

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MzI1NDIyfQ.example"
}
```

### Dashboard Stats Response
```json
{
  "totalStudents": 25,
  "totalWardens": 3,
  "totalRooms": 50,
  "availableRooms": 15,
  "occupiedRooms": 35,
  "pendingComplaints": 8,
  "resolvedComplaints": 42,
  "totalFeesCollected": 125000.0
}
```
