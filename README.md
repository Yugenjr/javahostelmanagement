# 🏠 HOSTEL MANAGEMENT SYSTEM

## 📋 Project Overview

A comprehensive **Hostel Management System** built with **Spring Boot** and **React.js** that streamlines hostel operations including room allocation, student management, complaint handling, and fee management. The system provides role-based access for administrators, wardens, and students.

---

## 🎯 Features

### 👨‍💼 **Admin Features**
- Complete user management (Create, Update, Delete users)
- Room inventory management and allocation
- System-wide reporting and analytics
- Fee structure configuration
- System settings management

### 👨‍🏫 **Warden Features**
- Complaint management and resolution
- Room occupancy monitoring
- Student oversight
- Maintenance request handling

### 👨‍🎓 **Student Features**
- Personal profile management
- Complaint submission and tracking
- Fee status monitoring
- Room allocation requests

---

## 🛠️ Technology Stack

### **Backend**
- **Framework:** Spring Boot 3.5.7
- **Language:** Java 17
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA / Hibernate
- **Security:** Spring Security with JWT
- **Build Tool:** Maven

### **Frontend**
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.14.1
- **HTTP Client:** Axios 1.4.0
- **Build Tool:** Create React App
- **Styling:** CSS3 with Responsive Design

### **Development Tools**
- **IDE:** IntelliJ IDEA / VS Code  
- **Version Control:** Git
- **API Testing:** Postman
- **Database Client:** MySQL Workbench

---

## 📊 System Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   React Frontend│ ←─────────────────→ │ Spring Boot API │
│   (Port 3000)   │                     │   (Port 8080)   │
└─────────────────┘                     └─────────────────┘
                                                  │
                                                  │ JPA/Hibernate
                                                  ▼
                                        ┌─────────────────┐
                                        │  MySQL Database │
                                        │   (Port 3306)   │
                                        └─────────────────┘
```

---

## 🚀 Quick Start

### **Prerequisites**
- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/SECE-24-28/end-semester-project-Yugenjr.git
cd end-semester-project-Yugenjr
```

### **2. Database Setup**
```bash
# Run the database setup script
setup-database.bat
```

### **3. Backend Setup**
```bash
# Compile and run Spring Boot application
mvnw clean compile
mvnw spring-boot:run
```

### **4. Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### **5. Access Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **API Documentation:** http://localhost:8080/swagger-ui.html

---

## 🔐 Demo Credentials

### **Admin Account**
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Full system management

### **Warden Account**
- **Username:** `warden1`
- **Password:** `warden123`
- **Access:** Complaint and room management

### **Student Accounts**
- **Username:** `student1`, `student2`, `student3`
- **Password:** `student123`
- **Access:** Personal dashboard and complaints

---

## 📁 Project Structure

```
hostel-management-system/
├── docs/                          # Documentation
│   ├── PROJECT_SRS_DOCUMENT.md    # Complete SRS with all diagrams
│   ├── USE_CASE_DIAGRAM.md        # Use case specifications
│   ├── CLASS_DIAGRAM.md           # Class relationships
│   ├── INTERACTION_DIAGRAMS.md    # Sequence & activity diagrams
│   ├── ER_DIAGRAM.md              # Entity relationship model
│   └── DB_SCHEMA.md               # Database schema & scripts
├── src/main/java/                 # Backend source code
│   └── com/example/Hostelmanagement/
│       ├── controller/            # REST controllers
│       ├── service/               # Business logic
│       ├── repository/            # Data access layer
│       ├── entity/                # JPA entities
│       ├── dto/                   # Data transfer objects
│       ├── config/                # Configuration classes
│       └── security/              # Security implementation
├── frontend/                      # React frontend
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API services
│   │   └── utils/                 # Utility functions
│   ├── public/                    # Static assets
│   └── package.json               # Frontend dependencies
├── target/                        # Compiled classes
├── *.bat                         # Windows batch scripts for setup
├── pom.xml                       # Maven configuration
├── TESTING_CREDENTIALS.md         # Testing information
└── README.md                     # This file
```

---

## 🗄️ Database Schema

### **Core Tables**
- **`users`** - User accounts (Admin, Warden, Students)
- **`rooms`** - Room inventory and allocation
- **`complaints`** - Student complaints and resolution
- **`fees`** - Fee management and payment tracking

### **Sample Data**
- 30 rooms across 3 floors (Single ₹5000, Double ₹7000)
- 5 user accounts with different roles
- Sample complaints and fee records
- Comprehensive test data for development

---

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### **User Management**
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### **Room Management**
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available` - Get available rooms
- `POST /api/rooms/{id}/allocate` - Allocate room to student

### **Complaint Management**
- `GET /api/complaints` - Get complaints (role-based)
- `POST /api/complaints` - Submit new complaint
- `PUT /api/complaints/{id}/status` - Update complaint status

### **Dashboard**
- `GET /api/dashboard/stats` - Get dashboard statistics

---

## 🧪 Testing

### **Manual Testing**
1. Use provided demo credentials
2. Navigate through different user roles
3. Test major workflows (room allocation, complaints, etc.)
4. Verify data persistence and security

### **API Testing**
- Import `Hostel_Management_API.postman_collection.json`
- Use Postman or similar tools
- Test all endpoints with different roles

### **Database Testing**
- Verify data integrity
- Test foreign key constraints
- Validate business rules

---

## 📈 Key Metrics

- **30 Rooms** managed across 3 floors
- **3 User Roles** with distinct permissions
- **5+ Complaint Types** for comprehensive issue tracking
- **Automated Fee Generation** with payment tracking
- **JWT-based Security** with 24-hour token expiration
- **Responsive Design** for mobile and desktop

---

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Role-based Access Control** (RBAC)
- **Password Encryption** using BCrypt
- **CORS Configuration** for secure cross-origin requests
- **Input Validation** and SQL injection prevention
- **Audit Trail** for tracking user actions

---

## 🎨 UI/UX Features

- **Responsive Design** for all devices
- **Intuitive Navigation** with role-based menus
- **Real-time Updates** for complaints and notifications
- **Clean Interface** with modern CSS styling
- **Form Validation** with user-friendly error messages
- **Dashboard Analytics** with visual statistics

---

## 📊 Reporting Features

- **Room Occupancy Reports** with floor-wise breakdown
- **Complaint Analytics** by type, priority, and status
- **Fee Collection Reports** with payment tracking
- **User Activity Logs** for audit purposes
- **Monthly Summaries** for administrative overview

---

## 🚀 Deployment

### **Development Environment**
```bash
# Start full system
start-full-system.bat

# Or manual startup
# Terminal 1: Backend
mvnw spring-boot:run

# Terminal 2: Frontend
cd frontend && npm start
```

### **Production Deployment**
1. Build frontend: `npm run build`
2. Package backend: `mvnw clean package`
3. Configure production database
4. Deploy JAR file with embedded Tomcat
5. Serve frontend through reverse proxy

---

## 📝 Documentation

Complete project documentation available in `/docs` folder:

1. **[SRS Document](docs/PROJECT_SRS_DOCUMENT.md)** - Complete system specification
2. **[Use Case Diagram](docs/USE_CASE_DIAGRAM.md)** - Actor interactions
3. **[Class Diagram](docs/CLASS_DIAGRAM.md)** - System architecture
4. **[Interaction Diagrams](docs/INTERACTION_DIAGRAMS.md)** - Sequence & activity flows
5. **[ER Diagram](docs/ER_DIAGRAM.md)** - Database relationships
6. **[DB Schema](docs/DB_SCHEMA.md)** - Complete database design

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support and queries:
- **Developer:** Yugendra
- **Institution:** SECE (2024-28)
- **Project Type:** End Semester Project
- **Academic Year:** 2025

---

## 📜 License

This project is developed as an academic assignment for SECE (2024-28) and is intended for educational purposes.

---

## 🎖️ Acknowledgments

- **Spring Boot Team** for the excellent framework
- **React Team** for the powerful frontend library
- **MySQL Team** for the robust database system
- **SECE Faculty** for guidance and support

---

**⭐ Star this repository if you found it helpful!**

---

*Last Updated: October 29, 2025*  
*Version: 1.0*  
*Developer: Yugendra*
