# 🏨 Hostel Management System

A comprehensive, full-stack hostel management system built with **Spring Boot** and **React** for automating room allocation, student management, complaint tracking, and fee management.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- **🔐 Authentication & Authorization** - Role-based access control (Admin, Warden, Student)
- **🏠 Room Management** - Allocate, manage, and track room availability
- **👥 Student Management** - Complete student information system
- **📝 Complaint System** - Submit, track, and resolve maintenance issues
- **💰 Fee Management** - Track payments, dues, and generate receipts
- **📊 Reports & Analytics** - Generate comprehensive reports and visualizations
- **🔔 Real-time Notifications** - Stay updated with system activities

### Technical Features
- **Modern UI** - Beautiful, responsive Material-UI design
- **Mock Data Fallback** - Works even without backend (demo mode)
- **RESTful API** - Well-documented API endpoints
- **JWT Authentication** - Secure token-based authentication
- **PostgreSQL Database** - Reliable data persistence
- **H2 Database Support** - Quick testing without PostgreSQL setup

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.5.7**
  - Spring Data JPA
  - Spring Security
  - Spring Validation
- **PostgreSQL** (Primary Database)
- **H2** (In-memory Database for testing)
- **JWT** - JSON Web Token for authentication
- **Maven** - Dependency management

### Frontend
- **React 18**
- **Material-UI (MUI) 5**
- **React Router 6**
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Toastify** - Toast notifications
- **Formik & Yup** - Form validation

## 💻 System Requirements

- **Java Development Kit (JDK) 17+**
- **Node.js 16+** and **npm**
- **PostgreSQL 12+** (Optional - H2 works for testing)
- **Maven 3.6+** (or use included Maven wrapper)

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SECE-24-28/end-semester-project-Yugenjr.git
cd end-semester-project-Yugenjr
```

### 2. Backend Setup

#### Option A: Using PostgreSQL (Recommended)

1. Install and start PostgreSQL
2. Create a database:
```sql
CREATE DATABASE hostel_db;
```

3. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hostel_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

#### Option B: Using H2 (Quick Testing)

Uncomment H2 configuration in `application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:hostel
spring.datasource.driverClassName=org.h2.Driver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Method 1: Separate Terminal Windows

#### Terminal 1 - Start Backend:
```bash
cd Hostelmanagement
mvnw spring-boot:run
```
Or on Unix/Mac:
```bash
./mvnw spring-boot:run
```

Backend will run on: `http://localhost:8081`

#### Terminal 2 - Start Frontend:
```bash
cd Hostelmanagement/frontend
npm start
```

Frontend will run on: `http://localhost:3000`

### Method 2: Using Batch Scripts (Windows)

Use the provided batch scripts:
```bash
# Start backend only
start.bat

# Start full system (backend + frontend)
start-full-system.bat
```

## 🔑 Demo Credentials

The application includes demo users with mock data fallback:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Warden | `warden` | `warden123` |
| Student | `student1` | `student123` |

## 📁 Project Structure

```
Hostelmanagement/
├── src/
│   ├── main/
│   │   ├── java/com/example/Hostelmanagement/
│   │   │   ├── entity/          # JPA entities
│   │   │   ├── repository/      # Data access layer
│   │   │   ├── service/         # Business logic
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── security/        # Security configuration
│   │   │   ├── dto/             # Data transfer objects
│   │   │   └── exception/       # Exception handling
│   │   └── resources/
│   │       └── application.properties
│   └── test/                    # Unit tests
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── context/             # React context
│   │   ├── api/                 # API configuration
│   │   └── utils/               # Utility functions & mock data
│   └── package.json
├── docs/                        # Documentation
│   ├── PROJECT_SRS_DOCUMENT.md
│   ├── USE_CASE_DIAGRAM.md
│   ├── CLASS_DIAGRAM.md
│   ├── INTERACTION_DIAGRAMS.md
│   ├── ER_DIAGRAM.md
│   └── DB_SCHEMA.md
└── README.md
```

## 📡 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room

### Complaints
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/{id}` - Get complaint by ID
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}` - Update complaint
- `DELETE /api/complaints/{id}` - Delete complaint

### Fees
- `GET /api/fees` - Get all fee records
- `GET /api/fees/student/{studentId}` - Get fees by student
- `POST /api/fees` - Create fee record
- `PUT /api/fees/{id}` - Update fee record

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🎨 Features Showcase

### Modern Login Page
- Beautiful gradient design
- Tab-based login/registration
- Quick demo login buttons
- Form validation

### Comprehensive Dashboard
- Real-time statistics
- Interactive charts (Line, Pie, Bar)
- Recent activities
- Occupancy tracking

### Room Management
- Visual room cards
- Filter and search
- Status indicators
- Easy allocation

### Mock Data Support
- Automatic fallback when backend is unavailable
- Full functionality in demo mode
- Perfect for presentations

## 🧪 Testing

Run backend tests:
```bash
mvnw test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:
- System Requirements Specification (SRS)
- UML Diagrams (Use Case, Class, Interaction)
- ER Diagram
- Database Schema

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of an academic end-semester project.

## 👨‍💻 Author

**Yugen**
- GitHub: [@Yugenjr](https://github.com/Yugenjr)
- Institution: SECE 2024-28

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Material-UI Team
- All open-source contributors

---

**⭐ Star this repo if you find it helpful!**

For issues or questions, please create an issue on GitHub.

