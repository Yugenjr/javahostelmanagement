# 🔌 MySQL Database Setup Guide

## ✅ YOUR SYSTEM NOW SUPPORTS MYSQL!

The application has been configured to use MySQL as the primary database. Here's how to set it up:

---

## 📋 Prerequisites

1. **MySQL Server** installed on your system
2. **MySQL running** on port 3306 (default)

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Start MySQL Service

```cmd
net start mysql80
```

**If you get "Access Denied" error:**
- Open Command Prompt/PowerShell **as Administrator**
- OR use Services app (Win+R → `services.msc`)

### Step 2: Create Database (Optional)

The application will **automatically create** the database `hostel_db` if it doesn't exist!

But if you want to create it manually:

```sql
mysql -u root -p

CREATE DATABASE hostel_db;
USE hostel_db;
SHOW TABLES;
EXIT;
```

### Step 3: Update Credentials (If Needed)

Open: `src/main/resources/application.properties`

Update these lines if your MySQL credentials are different:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

---

## 🎯 Current Configuration

### MySQL is NOW the Active Database:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

### Features Enabled:
✅ **Auto-Create Database** - Database created automatically
✅ **Auto-Create Tables** - All tables generated from entities
✅ **Sample Data** - Can seed initial data
✅ **Persistent Storage** - Data survives server restarts

---

## 🔄 Switching Between Databases

The `application.properties` file now has **3 database options**:

### Option 1: MySQL (Currently Active ✅)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_db...
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### Option 2: PostgreSQL (Commented)
```properties
#spring.datasource.url=jdbc:postgresql://localhost:5432/hostel_db
#spring.datasource.driverClassName=org.postgresql.Driver
#spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Option 3: H2 In-Memory (Commented)
```properties
#spring.datasource.url=jdbc:h2:mem:hostel
#spring.datasource.driverClassName=org.h2.Driver
#spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

**To switch:** Simply comment out the active database and uncomment your choice!

---

## 📊 Database Schema

When you start the backend, these tables will be **automatically created**:

### Tables Created:
1. **users** - Student, Warden, Admin accounts
2. **rooms** - Room information and allocation
3. **complaints** - Maintenance complaints
4. **fees** - Fee payments and tracking
5. **reports** - Generated reports

### Relationships:
- User ←→ Room (One-to-One)
- User ←→ Complaints (One-to-Many)
- User ←→ Fees (One-to-Many)

---

## 🔍 Verify MySQL Connection

### Method 1: Check Backend Logs

When you start the backend, look for:

```
✅ HikariPool-1 - Starting...
✅ HikariPool-1 - Start completed
✅ Hibernate: create table users ...
✅ Started HostelmanagementApplication in X seconds
```

### Method 2: Use MySQL Workbench

1. Open MySQL Workbench
2. Connect to localhost:3306
3. Check for `hostel_db` database
4. View tables and data

### Method 3: Command Line

```sql
mysql -u root -p

SHOW DATABASES;
USE hostel_db;
SHOW TABLES;
SELECT * FROM users;
```

---

## 🎨 Frontend Integration

### The Frontend Will Automatically:
✅ **Connect to MySQL** via backend API
✅ **Persist all data** (rooms, students, complaints, fees)
✅ **Fallback to mock data** if backend unavailable
✅ **Display real-time MySQL data** when connected

### API Endpoints Using MySQL:

- `GET /api/users` → Fetch from `users` table
- `GET /api/rooms` → Fetch from `rooms` table
- `GET /api/complaints` → Fetch from `complaints` table
- `GET /api/fees` → Fetch from `fees` table
- `POST /api/auth/register` → Insert into `users` table
- `PUT /api/rooms/{id}` → Update `rooms` table

---

## 🔧 Troubleshooting

### Issue 1: "Access Denied" for MySQL service

**Solution:**
```cmd
# Run as Administrator
net start mysql80
```

### Issue 2: "Unknown database 'hostel_db'"

**Solution:** 
- Database will be auto-created! Just start the backend.
- OR create manually: `CREATE DATABASE hostel_db;`

### Issue 3: Wrong username/password

**Solution:**
Update in `application.properties`:
```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Issue 4: Port 3306 already in use

**Solution:**
Change port in application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3307/hostel_db...
```

### Issue 5: "Access denied for user"

**Solution:**
```sql
# Grant permissions
mysql -u root -p

GRANT ALL PRIVILEGES ON hostel_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

## 💾 Data Persistence

### With MySQL:
✅ All data is **permanently stored**
✅ Data survives server restarts
✅ Multiple sessions can share data
✅ Production-ready setup

### vs H2 (In-Memory):
❌ Data lost on restart
❌ Cannot share between instances
❌ Only for testing

---

## 📈 Testing MySQL Integration

### Step-by-Step Test:

1. **Start MySQL:**
   ```cmd
   net start mysql80
   ```

2. **Start Backend:**
   ```cmd
   cd Hostelmanagement ; mvnw.cmd spring-boot:run
   ```

3. **Check Logs:** Look for successful connection

4. **Start Frontend:**
   ```cmd
   cd frontend ; npm start
   ```

5. **Test Features:**
   - Login as admin/admin123
   - Add a new room
   - Check MySQL to verify data:
     ```sql
     SELECT * FROM rooms;
     ```

6. **Restart Backend** and verify data persists!

---

## 🎯 Production Deployment

### For Production Use:

1. **Update credentials** in application.properties
2. **Use environment variables:**
   ```properties
   spring.datasource.username=${DB_USER:root}
   spring.datasource.password=${DB_PASS:root}
   ```

3. **Enable SSL:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hostel_db?useSSL=true
   ```

4. **Optimize connection pool:**
   ```properties
   spring.datasource.hikari.maximum-pool-size=10
   spring.datasource.hikari.minimum-idle=5
   ```

---

## 📝 Sample Data Script (Optional)

Create `src/main/resources/data.sql` for initial data:

```sql
-- Insert Admin User
INSERT INTO users (username, password, first_name, last_name, email, role, active, created_at, updated_at)
VALUES ('admin', '$2a$10$...', 'Admin', 'User', 'admin@hostel.com', 'ADMIN', true, NOW(), NOW());

-- Insert Sample Rooms
INSERT INTO rooms (room_number, room_type, capacity, floor, monthly_rent, status, created_at, updated_at)
VALUES 
('A101', 'SINGLE', 1, 1, 5000, 'AVAILABLE', NOW(), NOW()),
('A102', 'DOUBLE', 2, 1, 3500, 'AVAILABLE', NOW(), NOW());
```

---

## ✅ Summary

### What's Configured:
✅ MySQL as primary database
✅ Auto-create database enabled
✅ Auto-create tables from entities
✅ All CRUD operations ready
✅ Frontend integration complete
✅ Mock data fallback active

### What You Need To Do:
1. ✅ Start MySQL service
2. ✅ Update credentials if needed
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Test and enjoy!

---

## 🎉 Your Application Now Uses MySQL!

**Frontend** → **REST API** → **MySQL Database**

All your data (users, rooms, complaints, fees) will be stored in MySQL permanently!

**Test it now:**
1. Add a student
2. Allocate a room
3. Submit a complaint
4. Record a payment

**Everything is saved to MySQL!** 🚀

---

*For more help, check `application.properties` comments*

