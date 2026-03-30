          │                     │  │Complaints │  │            ┌─────▼──────┐
    ┌─────▼──────┐              │  └───────────┘  │            │System      │
    │View        │              │                 │            │Config      │
    │Complaints  │              │  ┌───────────┐  │            └────────────┘
    └─────┬──────┘              │  │  Manage   │  │
          │                     │  │   Fees    │  │
    ┌─────▼──────┐              │  └───────────┘  │      ┌─────────────┐
    │View Fee    │              │                 │      │   WARDEN    │
    │Status      │              │  ┌───────────┐  │      └─────────────┘
    └────────────┘              │  │Generate   │  │             │
                                │  │ Reports   │  │             │
                                │  └───────────┘  │       ┌─────▼──────┐
                                │                 │       │   Login    │
                                └─────────────────┘       └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │View        │
                                                          │Complaints  │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │Update      │
                                                          │Complaint   │
                                                          │Status      │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │Add Warden  │
                                                          │Remarks     │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │View Room   │
                                                          │Occupancy   │
                                                          └────────────┘

    ACTORS:
    • Student: Submit complaints, view personal info, check fee status
    • Warden: Manage complaints, view room occupancy, add remarks
    • Admin: Complete system management, user management, reports
    
    MAIN USE CASES:
    1. Authentication & Authorization
    2. User Profile Management
    3. Room Allocation & Management
    4. Complaint Submission & Resolution
    5. Fee Management & Tracking
    6. Dashboard & Reporting
```

---

## **6. CLASS DIAGRAM**

```
                          HOSTEL MANAGEMENT SYSTEM
                              CLASS DIAGRAM

┌─────────────────────────────────────────────────────────────────────────────┐
│                                    User                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ - id: Long                                                                  │
│ - username: String                                                          │
│ - password: String                                                          │
│ - firstName: String                                                         │
│ - lastName: String                                                          │
│ - email: String                                                             │
│ - phoneNumber: String                                                       │
│ - role: Role (ADMIN, WARDEN, STUDENT)                                       │
│ - address: String                                                           │
│ - emergencyContact: String                                                  │
│ - active: Boolean                                                           │
│ - createdAt: LocalDateTime                                                  │
│ - updatedAt: LocalDateTime                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ + User()                                                                    │
│ + getters() / setters()                                                     │
│ + builder(): UserBuilder                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ 1
                                      │
                                      │ 0..1
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   Room                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ - id: Long                                                                  │
│ - roomNumber: String                                                        │
│ - floor: Integer                                                            │
│ - roomType: RoomType (SINGLE, DOUBLE)                                       │
│ - capacity: Integer                                                         │
│ - status: RoomStatus (AVAILABLE, OCCUPIED, MAINTENANCE)                     │
│ - monthlyRent: BigDecimal                                                   │
│ - description: String                                                       │
│ - createdAt: LocalDateTime                                                  │
│ - updatedAt: LocalDateTime                                                  │
│ - student: User                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ + Room()                                                                    │
│ + getters() / setters()                                                     │
│ + isAvailable(): Boolean                                                    │
│ + allocateToStudent(student: User): void                                    │
│ + deallocate(): void                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ 1
                                      │
                                      │ 0..*
┌─────────────────────────────────────────────────────────────────────────────┐
│                                Complaint                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - id: Long                                                                  │
│ - title: String                                                             │
│ - description: String                                                       │
│ - type: ComplaintType (ELECTRICAL, PLUMBING, INTERNET, MAINTENANCE, OTHER)  │
│ - priority: Priority (LOW, MEDIUM, HIGH, URGENT)                            │
│ - status: ComplaintStatus (PENDING, IN_PROGRESS, RESOLVED, CLOSED)          │
│ - submittedAt: LocalDateTime                                                │
│ - resolvedAt: LocalDateTime                                                 │
│ - wardenRemarks: String                                                     │
│ - student: User                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ + Complaint()                                                               │
│ + getters() / setters()                                                     │
│ + resolve(remarks: String): void                                            │
│ + updateStatus(status: ComplaintStatus): void                               │
│ + isOverdue(): Boolean                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ *
                                      │
                                      │ 1
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   Fee                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ - id: Long                                                                  │
│ - student: User                                                             │
│ - month: String                                                             │
│ - year: Integer                                                             │
│ - roomRent: BigDecimal                                                      │
│ - maintenanceCharge: BigDecimal                                             │
│ - totalAmount: BigDecimal                                                   │
│ - paidAmount: BigDecimal                                                    │
│ - status: FeeStatus (PENDING, PAID, OVERDUE)                               │
│ - dueDate: LocalDate                                                        │
│ - paidDate: LocalDate                                                       │
│ - createdAt: LocalDateTime                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ + Fee()                                                                     │
│ + getters() / setters()                                                     │
│ + calculateTotal(): BigDecimal                                              │
│ + markAsPaid(amount: BigDecimal): void                                      │
│ + isOverdue(): Boolean                                                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              AuthController                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ - authService: AuthService                                                  │
│ - jwtUtil: JwtUtil                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + login(request: AuthRequest): ResponseEntity<AuthResponse>                 │
│ + register(request: RegisterRequest): ResponseEntity<String>                │
│ + logout(): ResponseEntity<String>                                          │
└─────────────────────────────────────────────────────────────────────────────┘
# HOSTEL MANAGEMENT SYSTEM
┌─────────────────────────────────────────────────────────────────────────────┐
│                              UserController                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ - userService: UserService                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllUsers(): ResponseEntity<List<User>>                                 │
│ + getUserProfile(): ResponseEntity<User>                                    │
│ + updateProfile(user: User): ResponseEntity<User>                           │
│ + createUser(user: User): ResponseEntity<User>                              │
│ + deleteUser(id: Long): ResponseEntity<String>                              │
└─────────────────────────────────────────────────────────────────────────────┘

RELATIONSHIPS:
• User (1) ←→ (0..1) Room: One user can have at most one room
• User (1) ←→ (0..*) Complaint: One user can have multiple complaints  
• User (1) ←→ (0..*) Fee: One user can have multiple fee records
• Controllers depend on their respective Services
• Services depend on their respective Repositories
```

---

## **7. INTERACTION DIAGRAMS**

### **7.1 Student Login Sequence Diagram**

```
Student    Frontend    AuthController    AuthService    UserRepository    Database
   │           │             │              │               │             │
   │  Login    │             │              │               │             │
   │ Request   │             │              │               │             │
   │──────────►│             │              │               │             │
   │           │ POST /login │              │               │             │
   │           │────────────►│              │               │             │
   │           │             │ authenticate │               │             │
   │           │             │─────────────►│               │             │
   │           │             │              │ findByUsername│             │
   │           │             │              │──────────────►│             │
   │           │             │              │               │ SELECT *    │
   │           │             │              │               │────────────►│
   │           │             │              │               │ User Data   │
   │           │             │              │               │◄────────────│
   │           │             │              │ User Object   │             │
   │           │             │              │◄──────────────│             │
   │           │             │ validatePass │               │             │
   │           │             │              │               │             │
   │           │             │ generateJWT  │               │             │
   │           │             │              │               │             │
   │           │             │ AuthResponse │               │             │
   │           │             │◄─────────────│               │             │
   │           │ JWT Token   │              │               │             │
   │           │◄────────────│              │               │             │
   │  Token    │             │              │               │             │
   │◄──────────│             │              │               │             │
```

### **7.2 Room Allocation Activity Diagram**

```
                    ROOM ALLOCATION PROCESS

    START
      │
      ▼
   ┌─────────┐
   │ Admin   │
   │ Login   │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Access  │
   │Room Mgmt│
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Select  │
   │Available│
   │ Room    │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Select  │
   │ Student │
   └────┬────┘
        │
        ▼
   ┌─────────┐       NO   ┌─────────┐
   │Validate │◄──────────┤ Valid   │
   │Selection│           │ Data?   │
   └────┬────┘           └─────────┘
        │ YES                 │
        ▼                     │
   ┌─────────┐                │
   │ Allocate│                │
   │  Room   │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Update  │                │
   │Database │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Send    │                │
   │Success  │                │
   │Response │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Update  │◄───────────────┘
   │   UI    │
   └────┬────┘
        │
        ▼
      END
```

---

## **8. ER DIAGRAM**

```
                          HOSTEL MANAGEMENT SYSTEM
                              ER DIAGRAM

    ┌─────────────────────────────────────────────────────────────┐
    │                         USERS                               │
    │─────────────────────────────────────────────────────────────│
    │ PK │ id (BIGINT, AUTO_INCREMENT)                            │
    │    │ username (VARCHAR(50), UNIQUE, NOT NULL)               │
    │    │ password (VARCHAR(255), NOT NULL)                      │
    │    │ first_name (VARCHAR(50), NOT NULL)                     │
    │    │ last_name (VARCHAR(50), NOT NULL)                      │
    │    │ email (VARCHAR(100), UNIQUE, NOT NULL)                 │
    │    │ phone_number (VARCHAR(15))                             │
    │    │ role (ENUM: ADMIN, WARDEN, STUDENT)                    │
    │    │ address (TEXT)                                          │
    │    │ emergency_contact (VARCHAR(15))                        │
    │    │ active (BOOLEAN, DEFAULT TRUE)                         │
    │    │ created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)      │
    │    │ updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)      │
    └─────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ has
                                    │
                                    │ 0..1
    ┌─────────────────────────────────────────────────────────────┐
    │                         ROOMS                               │
    │─────────────────────────────────────────────────────────────│
    │ PK │ id (BIGINT, AUTO_INCREMENT)                            │
    │    │ room_number (VARCHAR(10), UNIQUE, NOT NULL)            │
    │    │ floor (INT, NOT NULL)                                  │
    │    │ room_type (ENUM: SINGLE, DOUBLE)                       │
    │    │ capacity (INT, NOT NULL)                               │
    │    │ status (ENUM: AVAILABLE, OCCUPIED, MAINTENANCE)        │
    │    │ monthly_rent (DECIMAL(10,2), NOT NULL)                 │
    │    │ description (TEXT)                                      │
    │ FK │ student_id (BIGINT, REFERENCES users(id))              │
    │    │ created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)      │
    │    │ updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)      │
    └─────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ submits
                                    │
                                    │ *
    ┌─────────────────────────────────────────────────────────────┐
    │                      COMPLAINTS                             │
    │─────────────────────────────────────────────────────────────│
    │ PK │ id (BIGINT, AUTO_INCREMENT)                            │
    │    │ title (VARCHAR(100), NOT NULL)                         │
    │    │ description (TEXT, NOT NULL)                           │
    │    │ type (ENUM: ELECTRICAL, PLUMBING, INTERNET,            │
    │    │       MAINTENANCE, OTHER)                              │
    │    │ priority (ENUM: LOW, MEDIUM, HIGH, URGENT)             │
    │    │ status (ENUM: PENDING, IN_PROGRESS, RESOLVED, CLOSED)  │
    │    │ submitted_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)    │
    │    │ resolved_at (TIMESTAMP, NULL)                          │
    │    │ warden_remarks (TEXT)                                   │
    │ FK │ student_id (BIGINT, NOT NULL, REFERENCES users(id))    │
    └─────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ pays
                                    │
                                    │ *
    ┌─────────────────────────────────────────────────────────────┐
    │                         FEES                                │
    │─────────────────────────────────────────────────────────────│
    │ PK │ id (BIGINT, AUTO_INCREMENT)                            │
    │ FK │ student_id (BIGINT, NOT NULL, REFERENCES users(id))    │
    │    │ month (VARCHAR(20), NOT NULL)                          │
    │    │ year (INT, NOT NULL)                                   │
    │    │ room_rent (DECIMAL(10,2), NOT NULL)                    │
    │    │ maintenance_charge (DECIMAL(10,2), DEFAULT 0)          │
    │    │ total_amount (DECIMAL(10,2), NOT NULL)                 │
    │    │ paid_amount (DECIMAL(10,2), DEFAULT 0)                 │
    │    │ status (ENUM: PENDING, PAID, OVERDUE)                  │
    │    │ due_date (DATE, NOT NULL)                              │
    │    │ paid_date (DATE, NULL)                                 │
    │    │ created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)      │
    └─────────────────────────────────────────────────────────────┘

RELATIONSHIPS:
• users(1) ←→ rooms(0..1): Each user can have at most one room
• users(1) ←→ complaints(*): Each user can have multiple complaints
• users(1) ←→ fees(*): Each user can have multiple fee records

INDEXES:
• users: UNIQUE(username), UNIQUE(email), INDEX(role)
• rooms: UNIQUE(room_number), INDEX(status), INDEX(floor)
• complaints: INDEX(status), INDEX(priority), INDEX(student_id)
• fees: INDEX(student_id), INDEX(status), UNIQUE(student_id, month, year)
```

---

## **9. DATABASE SCHEMA**

### **9.1 Table Creation Scripts**

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS hostel 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hostel;

-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    role ENUM('ADMIN', 'WARDEN', 'STUDENT') NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(15),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (active)
);

-- Rooms Table
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    floor INT NOT NULL,
    room_type ENUM('SINGLE', 'DOUBLE') NOT NULL,
    capacity INT NOT NULL,
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    monthly_rent DECIMAL(10,2) NOT NULL,
    description TEXT,
    student_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_room_number (room_number),
    INDEX idx_status (status),
    INDEX idx_floor (floor),
    INDEX idx_student_id (student_id)
);

-- Complaints Table
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('ELECTRICAL', 'PLUMBING', 'INTERNET', 'MAINTENANCE', 'OTHER') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'PENDING',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    warden_remarks TEXT,
    student_id BIGINT NOT NULL,
    
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_student_id (student_id),
    INDEX idx_type (type),
    INDEX idx_submitted_at (submitted_at)
);

-- Fees Table
CREATE TABLE fees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    room_rent DECIMAL(10,2) NOT NULL,
    maintenance_charge DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('PENDING', 'PAID', 'OVERDUE') DEFAULT 'PENDING',
    due_date DATE NOT NULL,
    paid_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_month_year (student_id, month, year),
    INDEX idx_student_id (student_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
);

-- Insert Sample Data
INSERT INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact) VALUES
('admin', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'System', 'Administrator', 'admin@hostel.com', '9876543210', 'ADMIN', 'Admin Office', '9876543211'),
('warden1', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'Jane', 'Smith', 'warden@hostel.com', '9876543220', 'WARDEN', 'Warden Quarters', '9876543221'),
('student1', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'John', 'Doe', 'john.doe@student.com', '9876543212', 'STUDENT', 'Student Address 1', '9876543299');
```

### **9.2 Sample Queries**

```sql
-- Get all available rooms
SELECT * FROM rooms WHERE status = 'AVAILABLE' ORDER BY floor, room_number;

-- Get pending complaints with student details
SELECT c.*, u.first_name, u.last_name, u.phone_number 
FROM complaints c 
JOIN users u ON c.student_id = u.id 
WHERE c.status = 'PENDING' 
ORDER BY c.priority DESC, c.submitted_at ASC;

-- Get monthly fee summary
SELECT 
    u.first_name, 
    u.last_name, 
    f.month, 
    f.year, 
    f.total_amount, 
    f.paid_amount, 
    f.status 
FROM fees f 
JOIN users u ON f.student_id = u.id 
WHERE f.year = 2025 AND f.month = 'October';

-- Room occupancy statistics
SELECT 
    status, 
    COUNT(*) as count,
    ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM rooms)), 2) as percentage
FROM rooms 
GROUP BY status;
```

---

## **10. TECHNOLOGY STACK**

### **10.1 Backend Technologies**
- **Framework:** Spring Boot 3.5.7
- **Language:** Java 17
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA / Hibernate
- **Security:** Spring Security with JWT
- **Build Tool:** Maven

### **10.2 Frontend Technologies**
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.14.1
- **HTTP Client:** Axios 1.4.0
- **Build Tool:** Create React App
- **Styling:** CSS3, Responsive Design

### **10.3 Development Tools**
- **IDE:** IntelliJ IDEA / VS Code
- **Version Control:** Git
- **API Testing:** Postman
- **Database Client:** MySQL Workbench

---

## **CONCLUSION**

The Hostel Management System provides a comprehensive solution for managing hostel operations with modern web technologies. The system offers scalable architecture, secure implementation, user-friendly interface, and comprehensive feature set covering all hostel management needs.

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Developer:** Yugendra  
**Institution:** SECE (2024-28)
## SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

---

### **PROJECT DETAILS**
- **Project Name:** Hostel Management System
- **Developer:** Yugendra
- **Institution:** SECE
- **Academic Year:** 2024-28
- **Date:** October 29, 2025
- **Version:** 1.0

---

## **TABLE OF CONTENTS**

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Use Case Diagram](#5-use-case-diagram)
6. [Class Diagram](#6-class-diagram)
7. [Interaction Diagrams](#7-interaction-diagrams)
8. [ER Diagram](#8-er-diagram)
9. [Database Schema](#9-database-schema)
10. [Technology Stack](#10-technology-stack)

---

## **1. INTRODUCTION**

### **1.1 Purpose**
The Hostel Management System is a comprehensive web-based application designed to streamline hostel operations including room allocation, student management, complaint handling, and fee management. The system provides different interfaces for administrators, wardens, and students to efficiently manage hostel-related activities.

### **1.2 Scope**
This system covers:
- **User Management:** Admin, Warden, and Student roles
- **Room Management:** Room allocation, availability tracking
- **Complaint Management:** Issue reporting and resolution
- **Fee Management:** Payment tracking and billing
- **Dashboard Analytics:** Real-time statistics and reports

---

## **2. SYSTEM OVERVIEW**

### **2.1 System Description**
The Hostel Management System is a full-stack web application built with:
- **Frontend:** React.js with responsive design
- **Backend:** Spring Boot REST API
- **Database:** MySQL with JPA/Hibernate
- **Security:** JWT-based authentication and authorization

### **2.2 System Features**
- Role-based access control
- Real-time dashboard with statistics
- Automated room allocation
- Complaint tracking and resolution
- Fee management and payment tracking

---

## **3. FUNCTIONAL REQUIREMENTS**

### **3.1 User Authentication and Authorization**
- **REQ-001:** System shall provide secure login/logout functionality
- **REQ-002:** System shall support role-based access (Admin, Warden, Student)
- **REQ-003:** System shall use JWT tokens for session management

### **3.2 User Management**
- **REQ-004:** Admin shall be able to create, update, and delete user accounts
- **REQ-005:** Users shall be able to update their personal profiles
- **REQ-006:** System shall maintain user activity logs

### **3.3 Room Management**
- **REQ-007:** Admin shall be able to manage room inventory
- **REQ-008:** System shall track room availability and occupancy
- **REQ-009:** System shall support room allocation to students

### **3.4 Complaint Management**
- **REQ-010:** Students shall be able to submit complaints
- **REQ-011:** System shall categorize complaints by type and priority
- **REQ-012:** Wardens shall be able to view and update complaint status

### **3.5 Fee Management**
- **REQ-013:** System shall calculate monthly fees based on room type
- **REQ-014:** System shall track payment status for each student
- **REQ-015:** System shall generate fee reports and statements

---

## **4. NON-FUNCTIONAL REQUIREMENTS**

### **4.1 Performance Requirements**
- **NFR-001:** System shall respond to user requests within 2 seconds
- **NFR-002:** System shall support concurrent access by 100+ users
- **NFR-003:** Database queries shall execute within 1 second

### **4.2 Security Requirements**
- **NFR-004:** All API endpoints shall be secured with JWT authentication
- **NFR-005:** Passwords shall be encrypted using bcrypt hashing
- **NFR-006:** System shall implement CORS policy for cross-origin requests

### **4.3 Usability Requirements**
- **NFR-007:** System shall have responsive design for mobile devices
- **NFR-008:** Interface shall be intuitive and user-friendly
- **NFR-009:** System shall provide clear error messages and feedback

---

## **5. USE CASE DIAGRAM**

```
                          HOSTEL MANAGEMENT SYSTEM
                               USE CASE DIAGRAM

    ┌─────────────┐                                           ┌─────────────┐
    │   STUDENT   │                                           │    ADMIN    │
    └─────────────┘                                           └─────────────┘
          │                                                          │
          │                                                          │
    ┌─────▼──────┐              ┌─────────────────┐            ┌─────▼──────┐
    │   Login    │              │     System      │            │   Login    │
    └─────┬──────┘              │                 │            └─────┬──────┘
          │                     │                 │                  │
    ┌─────▼──────┐              │  ┌───────────┐  │            ┌─────▼──────┐
    │View Profile│              │  │  Validate │  │            │Manage Users│
    └─────┬──────┘              │  │   Users   │  │            └─────┬──────┘
          │                     │  └───────────┘  │                  │
    ┌─────▼──────┐              │                 │            ┌─────▼──────┐
    │Update Info │              │  ┌───────────┐  │            │Manage Rooms│
    └─────┬──────┘              │  │  Manage   │  │            └─────┬──────┘
          │                     │  │  Rooms    │  │                  │
    ┌─────▼──────┐              │  └───────────┘  │            ┌─────▼──────┐
    │Submit      │              │                 │            │View Reports│
    │Complaint   │              │  ┌───────────┐  │            └─────┬──────┘
    └─────┬──────┘              │  │  Handle   │  │                  │

