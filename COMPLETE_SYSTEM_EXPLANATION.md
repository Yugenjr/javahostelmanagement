# 🎓 COMPLETE SYSTEM ARCHITECTURE EXPLANATION

## 📚 **TABLE OF CONTENTS:**
1. Architecture Overview
2. Backend (Spring Boot)
3. Frontend (React)
4. Database (MySQL)
5. Security (JWT)
6. DTOs (Data Transfer Objects)
7. REST API
8. Complete Flow Examples

---

## 🏗️ **1. ARCHITECTURE OVERVIEW**

### **System Type:** Full-Stack Web Application
```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│              (http://localhost:3000)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Requests (REST API Calls)
                     │
┌────────────────────▼────────────────────────────────────┐
│              REACT FRONTEND                             │
│  - UI Components (Login, Dashboard, etc.)               │
│  - State Management (Context API)                       │
│  - API Calls (Axios)                                    │
│  - Routing (React Router)                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP REST API (JSON)
                     │ Authorization: Bearer <JWT_TOKEN>
                     │
┌────────────────────▼────────────────────────────────────┐
│         SPRING BOOT BACKEND (Port 8081)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 1. CONTROLLERS (REST Endpoints)                  │   │
│  │    - Receive HTTP requests                       │   │
│  │    - Validate JWT tokens                         │   │
│  │    - Call services                               │   │
│  │    - Return JSON responses                       │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │ 2. DTOs (Data Transfer Objects)                  │   │
│  │    - Lightweight data containers                 │   │
│  │    - Validation annotations                      │   │
│  │    - No business logic                           │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │ 3. SERVICES (Business Logic)                     │   │
│  │    - Implement business rules                    │   │
│  │    - Call repositories                           │   │
│  │    - Handle transactions                         │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │ 4. REPOSITORIES (Data Access)                    │   │
│  │    - JPA interfaces                              │   │
│  │    - Database queries                            │   │
│  │    - CRUD operations                             │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │ 5. ENTITIES (Domain Models)                      │   │
│  │    - Database table mappings                     │   │
│  │    - Relationships (@OneToMany, etc.)            │   │
│  │    - Business objects                            │   │
│  └──────────────────┬───────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ JDBC (Java Database Connectivity)
                     │
┌────────────────────▼────────────────────────────────────┐
│              MYSQL DATABASE                             │
│  Tables: users, rooms, complaints, fees                 │
│  Relationships, Indexes, Constraints                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 **2. BACKEND (SPRING BOOT)**

### **Technology Stack:**
- **Spring Boot 3.5.7** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database access
- **Hibernate** - ORM (Object-Relational Mapping)
- **JWT (JSON Web Tokens)** - Stateless authentication
- **MySQL Connector** - Database driver

---

### **2.1 LAYERS EXPLAINED:**

#### **A. ENTITIES (Domain Models)**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;
    private String email;
    
    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN, WARDEN, STUDENT
    
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room; // Relationship to Room
}
```

**Purpose:**
- Represent database tables as Java classes
- Define relationships between tables
- Map Java objects to SQL tables
- Hibernate uses these to generate SQL

**Key Annotations:**
- `@Entity` - Marks as database table
- `@Table` - Specifies table name
- `@Id` - Primary key
- `@GeneratedValue` - Auto-increment
- `@ManyToOne` - Foreign key relationship
- `@OneToMany` - Inverse relationship
- `@Enumerated` - Store enum as string

---

#### **B. REPOSITORIES (Data Access Layer)**
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository provides:
    // - save()
    // - findById()
    // - findAll()
    // - delete()
    // - count()
    
    // Custom query methods:
    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
    boolean existsByUsername(String username);
}
```

**Purpose:**
- Interface between service layer and database
- Provides CRUD operations
- Custom query methods
- Spring Data JPA auto-implements methods

**How it works:**
```java
// Spring Data JPA reads method name and creates SQL:
findByUsername("admin")
// SQL: SELECT * FROM users WHERE username = 'admin'

findByRole(Role.STUDENT)
// SQL: SELECT * FROM users WHERE role = 'STUDENT'

existsByUsername("warden1")
// SQL: SELECT COUNT(*) > 0 FROM users WHERE username = 'warden1'
```

---

#### **C. DTOs (Data Transfer Objects)**
```java
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    // NO password field (security!)
    
    // Static factory method
    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        return dto;
    }
}
```

**Purpose:**
- **Security:** Don't expose sensitive data (passwords)
- **Flexibility:** Send only needed data
- **Validation:** Add @Valid annotations
- **API Contract:** Stable interface for frontend

**Why Not Send Entities Directly?**
```java
// ❌ BAD - Exposes password!
return ResponseEntity.ok(user);

// ✅ GOOD - Only safe data
return ResponseEntity.ok(UserDto.fromEntity(user));
```

**Common DTOs in System:**
- `UserDto` - User without password
- `ComplaintDto` - Complaint with student name
- `FeeDto` - Fee with payment details
- `LoginRequest` - Username + password input
- `AuthResponse` - JWT token + user info

---

#### **D. SERVICES (Business Logic Layer)**
```java
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Transactional
    public User createUser(User user) {
        // Business logic:
        // 1. Validate username is unique
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // 2. Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // 3. Set defaults
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        
        // 4. Save to database
        return userRepository.save(user);
    }
}
```

**Purpose:**
- Implement business rules
- Coordinate multiple repositories
- Handle transactions
- Validate data
- Process complex operations

**@Transactional:**
```java
@Transactional
public void transferRoom(Long studentId, Long newRoomId) {
    // All operations succeed or all fail (atomic)
    Student student = studentRepository.findById(studentId);
    Room oldRoom = student.getRoom();
    Room newRoom = roomRepository.findById(newRoomId);
    
    oldRoom.setCurrentOccupancy(oldRoom.getCurrentOccupancy() - 1);
    newRoom.setCurrentOccupancy(newRoom.getCurrentOccupancy() + 1);
    student.setRoom(newRoom);
    
    // If any step fails, entire transaction rolls back
}
```

---

#### **E. CONTROLLERS (REST API Endpoints)**
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(u -> ResponseEntity.ok(UserDto.fromEntity(u)))
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.ok(UserDto.fromEntity(created));
    }
}
```

**Purpose:**
- Define REST API endpoints
- Handle HTTP requests/responses
- Validate input
- Check authorization
- Return JSON

**Key Annotations:**
- `@RestController` - REST API controller
- `@RequestMapping` - Base URL path
- `@GetMapping` - HTTP GET endpoint
- `@PostMapping` - HTTP POST endpoint
- `@PathVariable` - URL parameter
- `@RequestBody` - JSON in request body
- `@Valid` - Validate input
- `@PreAuthorize` - Security check

---

## 🔐 **3. JWT AUTHENTICATION**

### **What is JWT?**
JWT (JSON Web Token) is a compact, URL-safe token for stateless authentication.

```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiJ9.abc123def456
```

### **JWT Structure:**
```javascript
// Header
{
  "alg": "HS256",  // Algorithm
  "typ": "JWT"     // Type
}

// Payload (Claims)
{
  "sub": "admin",           // Subject (username)
  "role": "ADMIN",          // Custom claim
  "iat": 1698765432,        // Issued at
  "exp": 1698851832         // Expiration (24 hours)
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

---

### **3.1 Authentication Flow:**

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: USER LOGIN                                           │
└──────────────────────────────────────────────────────────────┘

Frontend:
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
    │
    ▼
Backend (AuthController):
1. Validate credentials
2. Generate JWT token
3. Return token + user info

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
    │
    ▼
Frontend (AuthContext):
1. Store token in localStorage
2. Store user in state
3. Redirect to dashboard

┌──────────────────────────────────────────────────────────────┐
│ STEP 2: AUTHENTICATED REQUEST                                │
└──────────────────────────────────────────────────────────────┘

Frontend:
GET /api/users
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9..."
}
    │
    ▼
Backend (JwtAuthenticationFilter):
1. Extract token from header
2. Validate token signature
3. Decode payload (username, role)
4. Load user from database
5. Set SecurityContext
    │
    ▼
Controller (UserController):
1. Check @PreAuthorize("hasRole('ADMIN')")
2. If authorized, process request
3. Return data

Response:
{
  "data": [...]
}
```

---

### **3.2 JWT Implementation:**

#### **JwtUtil.java:**
```java
@Component
public class JwtUtil {
    private String SECRET_KEY = "your-secret-key-min-256-bits";
    
    // Generate token
    public String generateToken(String username, String role) {
        return Jwts.builder()
            .setSubject(username)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }
    
    // Extract username
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    // Validate token
    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }
}
```

#### **JwtAuthenticationFilter.java:**
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain chain) {
        // 1. Get Authorization header
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // 2. Extract token
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            
            // 3. Validate and set authentication
            if (username != null && jwtUtil.validateToken(token, username)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        chain.doFilter(request, response);
    }
}
```

---

## 🌐 **4. REST API**

### **What is REST?**
REST (Representational State Transfer) is an architectural style for web APIs.

**Principles:**
1. **Stateless** - Each request contains all needed information
2. **Resource-based** - URLs represent resources (users, rooms)
3. **HTTP Methods** - GET, POST, PUT, DELETE
4. **JSON** - Standard data format

---

### **4.1 HTTP Methods:**

```java
// CREATE - POST
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody User user) {
    User created = userService.save(user);
    return ResponseEntity.status(201).body(created);
}

// READ - GET
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findById(id));
}

// UPDATE - PUT
@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    User updated = userService.update(id, user);
    return ResponseEntity.ok(updated);
}

// DELETE - DELETE
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
```

---

### **4.2 API Endpoints in System:**

#### **Authentication:**
```
POST   /api/auth/login          - Login (get JWT token)
POST   /api/auth/register       - Register new user
GET    /api/auth/me             - Get current user info
```

#### **Users:**
```
GET    /api/users               - Get all users (Admin only)
GET    /api/users?role=STUDENT  - Get users by role
GET    /api/users/{id}          - Get user by ID
PUT    /api/users/{id}          - Update user
DELETE /api/users/{id}          - Delete user
```

#### **Rooms:**
```
GET    /api/rooms               - Get all rooms
GET    /api/rooms/{id}          - Get room by ID
POST   /api/rooms               - Create room
PUT    /api/rooms/{id}          - Update room
DELETE /api/rooms/{id}          - Delete room
GET    /api/rooms/available     - Get available rooms
```

#### **Complaints:**
```
GET    /api/complaints          - Get all complaints
GET    /api/complaints/student/{id} - Get student's complaints
POST   /api/complaints          - Create complaint
PUT    /api/complaints/{id}/status  - Update status
```

#### **Fees:**
```
GET    /api/fees                - Get all fees
GET    /api/fees/student/{id}   - Get student's fees
POST   /api/fees                - Create fee record
POST   /api/fees/{id}/pay       - Record payment
```

---

### **4.3 Request/Response Examples:**

#### **Login Request:**
```http
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5ODc2NTQzMiwiZXhwIjoxNjk4ODUxODMyfQ.abc123",
  "user": {
    "id": 1,
    "username": "admin",
    "firstName": "System",
    "lastName": "Administrator",
    "email": "admin@hostel.com",
    "role": "ADMIN"
  }
}
```

#### **Get Students Request:**
```http
GET http://localhost:8081/api/users?role=STUDENT
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "id": 3,
    "username": "student1",
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@student.com",
    "role": "STUDENT",
    "room": {
      "id": 1,
      "roomNumber": "A101"
    }
  },
  {
    "id": 4,
    "username": "student2",
    "firstName": "Bob",
    "lastName": "Smith",
    "email": "bob.smith@student.com",
    "role": "STUDENT",
    "room": {
      "id": 2,
      "roomNumber": "A102"
    }
  }
]
```

---

## ⚛️ **5. FRONTEND (REACT)**

### **5.1 Component Structure:**

```
src/
├── App.js                 - Main app, routing
├── index.js              - Entry point
├── components/
│   ├── Layout.js         - Sidebar, navigation
│   └── ProtectedRoute.js - Role-based access
├── pages/
│   ├── LoginNew.js       - Login UI
│   ├── Dashboard.js      - Dashboard page
│   ├── StudentsPage.js   - Student management
│   ├── ComplaintsPage.js - Complaint management
│   ├── PaymentsPage.js   - Fee management
│   └── SettingsPage.js   - User settings
├── context/
│   └── AuthContext.js    - Authentication state
└── api/
    └── axios.js          - API configuration
```

---

### **5.2 Key Concepts:**

#### **A. React Components:**
```javascript
// Functional Component
const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Email: {student.email}</p>
      <p>Room: {student.room?.roomNumber}</p>
    </div>
  );
};
```

#### **B. State Management (useState):**
```javascript
const StudentsPage = () => {
  // State: data that can change
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // When state changes, component re-renders
  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };
};
```

#### **C. Side Effects (useEffect):**
```javascript
useEffect(() => {
  // Runs when component mounts
  fetchStudents();
}, []); // Empty array = run once

useEffect(() => {
  // Runs when students change
  console.log('Students updated:', students);
}, [students]); // Run when students change
```

#### **D. Context API (Global State):**
```javascript
// AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    setToken(response.data.token);
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Use in components:
const Dashboard = () => {
  const { user, logout } = useAuth();
  return <div>Welcome {user.firstName}</div>;
};
```

---

### **5.3 API Calls with Axios:**

#### **axios.js (Configuration):**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### **Making API Calls:**
```javascript
// GET request
const fetchStudents = async () => {
  try {
    const response = await api.get('/api/users?role=STUDENT');
    setStudents(response.data);
  } catch (error) {
    console.error('Failed to fetch students:', error);
  }
};

// POST request
const createComplaint = async (complaintData) => {
  try {
    const response = await api.post('/api/complaints', complaintData);
    toast.success('Complaint submitted!');
  } catch (error) {
    toast.error('Failed to submit complaint');
  }
};

// PUT request
const updateComplaint = async (id, status) => {
  try {
    await api.put(`/api/complaints/${id}/status`, { status });
    toast.success('Status updated!');
  } catch (error) {
    toast.error('Failed to update');
  }
};
```

---

## 🗄️ **6. DATABASE (MYSQL)**

### **6.1 Schema:**

```sql
-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    role ENUM('ADMIN', 'WARDEN', 'STUDENT'),
    room_id BIGINT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Rooms Table
CREATE TABLE rooms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type ENUM('SINGLE', 'DOUBLE', 'TRIPLE'),
    capacity INT,
    current_occupancy INT DEFAULT 0,
    floor INT,
    monthly_rent DECIMAL(10,2),
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE'),
    amenities TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints Table
CREATE TABLE complaints (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    title VARCHAR(200),
    description TEXT,
    type ENUM('ELECTRICAL', 'PLUMBING', 'INTERNET', 'FURNITURE', 'CLEANING', 'MAINTENANCE'),
    priority ENUM('LOW', 'MEDIUM', 'HIGH'),
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED'),
    warden_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Fees Table
CREATE TABLE fees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    amount DECIMAL(10,2),
    fee_type ENUM('HOSTEL_FEE', 'MAINTENANCE_FEE', 'MESS_FEE'),
    month INT,
    year INT,
    due_date DATE,
    payment_status ENUM('PENDING', 'PAID', 'OVERDUE'),
    transaction_id VARCHAR(50),
    paid_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);
```

---

### **6.2 Relationships:**

```
users ─────┬─── room_id ───▶ rooms (Many users to One room)
           │
           └─── One user has Many complaints
           │
           └─── One user has Many fees

complaints ─── student_id ───▶ users (Many complaints to One user)

fees ──────── student_id ───▶ users (Many fees to One user)
```

---

## 🔄 **7. COMPLETE FLOW EXAMPLES**

### **EXAMPLE 1: Student Submits Complaint**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: FRONTEND (ComplaintsPage.js)                       │
└─────────────────────────────────────────────────────────────┘

User fills form:
- Title: "WiFi Not Working"
- Description: "Internet is slow"
- Type: INTERNET
- Priority: HIGH

Clicks "Submit" button

JavaScript code:
const handleSubmit = async () => {
  const complaintData = {
    title: "WiFi Not Working",
    description: "Internet is slow",
    type: "INTERNET",
    priority: "HIGH"
  };
  
  const response = await api.post('/api/complaints', complaintData);
  // api.post automatically adds: Authorization: Bearer <token>
};

┌─────────────────────────────────────────────────────────────┐
│ STEP 2: HTTP REQUEST                                        │
└─────────────────────────────────────────────────────────────┘

POST http://localhost:8081/api/complaints
Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "title": "WiFi Not Working",
  "description": "Internet is slow",
  "type": "INTERNET",
  "priority": "HIGH"
}

┌─────────────────────────────────────────────────────────────┐
│ STEP 3: BACKEND - Security Filter                          │
└─────────────────────────────────────────────────────────────┘

JwtAuthenticationFilter.doFilterInternal():
1. Extract token from Authorization header
2. Decode token: username="student1", role="STUDENT"
3. Load user from database
4. Set SecurityContext
5. Continue to controller

┌─────────────────────────────────────────────────────────────┐
│ STEP 4: BACKEND - Controller                               │
└─────────────────────────────────────────────────────────────┘

ComplaintController.create():

@PostMapping
@PreAuthorize("hasRole('STUDENT')")
public ResponseEntity<ComplaintDto> create(@Valid @RequestBody Complaint complaint) {
    // 1. @PreAuthorize checks if user has STUDENT role ✅
    // 2. @Valid validates complaint data
    
    // 3. Get current authenticated user
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = (User) auth.getPrincipal();
    
    // 4. Set student
    complaint.setStudent(currentUser);
    
    // 5. Call service
    Complaint createdComplaint = complaintService.create(complaint);
    
    // 6. Return DTO (not entity)
    return ResponseEntity.ok(ComplaintDto.fromEntity(createdComplaint));
}

┌─────────────────────────────────────────────────────────────┐
│ STEP 5: BACKEND - Service Layer                            │
└─────────────────────────────────────────────────────────────┘

ComplaintServiceImpl.create():

@Override
public Complaint create(Complaint complaint) {
    // Business logic:
    
    // 1. Set defaults
    complaint.setStatus(ComplaintStatus.PENDING);
    complaint.setCreatedAt(LocalDateTime.now());
    
    // 2. Validate
    if (complaint.getTitle() == null || complaint.getTitle().isEmpty()) {
        throw new RuntimeException("Title is required");
    }
    
    // 3. Save to database
    return complaintRepository.save(complaint);
}

┌─────────────────────────────────────────────────────────────┐
│ STEP 6: BACKEND - Repository/Database                      │
└─────────────────────────────────────────────────────────────┘

complaintRepository.save(complaint):

JPA/Hibernate generates SQL:
INSERT INTO complaints (
    student_id, title, description, type, priority, status, created_at
) VALUES (
    3, 'WiFi Not Working', 'Internet is slow', 'INTERNET', 'HIGH', 'PENDING', NOW()
);

Database returns:
id = 11 (auto-generated)

┌─────────────────────────────────────────────────────────────┐
│ STEP 7: BACKEND - Response                                 │
└─────────────────────────────────────────────────────────────┘

Return ComplaintDto:
{
  "id": 11,
  "title": "WiFi Not Working",
  "description": "Internet is slow",
  "type": "INTERNET",
  "priority": "HIGH",
  "status": "PENDING",
  "student": {
    "firstName": "Alice",
    "lastName": "Johnson"
  },
  "createdAt": "2025-10-30T10:30:00"
}

┌─────────────────────────────────────────────────────────────┐
│ STEP 8: FRONTEND - Handle Response                         │
└─────────────────────────────────────────────────────────────┘

const response = await api.post('/api/complaints', complaintData);

// response.data contains the ComplaintDto
const newComplaint = response.data;

// Update state
setComplaints([...complaints, newComplaint]);

// Show success message
toast.success('Complaint submitted successfully!');

// Close dialog
setOpenDialog(false);

// Component re-renders with new complaint in list
```

---

### **EXAMPLE 2: Warden Views All Students**

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (StudentsPage.js)                                 │
└─────────────────────────────────────────────────────────────┘

useEffect(() => {
  fetchStudents();
}, []);

const fetchStudents = async () => {
  const response = await api.get('/api/users?role=STUDENT');
  setStudents(response.data);
};

┌─────────────────────────────────────────────────────────────┐
│ HTTP REQUEST                                                │
└─────────────────────────────────────────────────────────────┘

GET http://localhost:8081/api/users?role=STUDENT
Authorization: Bearer <warden_token>

┌─────────────────────────────────────────────────────────────┐
│ BACKEND - Controller                                        │
└─────────────────────────────────────────────────────────────┘

UserController.getAllUsers():

@GetMapping
@PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
public ResponseEntity<List<UserSummaryDto>> getAllUsers(
    @RequestParam(required = false) String role
) {
    // 1. Check authorization ✅ (Warden has access)
    
    // 2. Parse role parameter
    User.Role userRole = User.Role.valueOf(role); // STUDENT
    
    // 3. Call repository
    List<User> users = userRepository.findByRole(userRole);
    
    // 4. Convert to DTOs
    List<UserSummaryDto> dtos = users.stream()
        .map(UserSummaryDto::fromEntity)
        .collect(Collectors.toList());
    
    return ResponseEntity.ok(dtos);
}

┌─────────────────────────────────────────────────────────────┐
│ BACKEND - Repository                                        │
└─────────────────────────────────────────────���───────────────┘

userRepository.findByRole(Role.STUDENT):

Generated SQL:
SELECT * FROM users 
WHERE role = 'STUDENT' 
  AND active = true;

Returns 8 User entities

┌─────────────────────────────────────────────────────────────┐
│ BACKEND - Response                                          │
└─────────────────────────────────────────────────────────────┘

[
  {
    "id": 3,
    "username": "student1",
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@student.com",
    "room": {"roomNumber": "A101"}
  },
  ... (7 more students)
]

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND - Render                                           │
└─────────────────────────────────────────────────────────────┘

setStudents(response.data);
// State updated → Component re-renders

return (
  <div>
    {students.map(student => (
      <StudentCard key={student.id} student={student} />
    ))}
  </div>
);
```

---

## 🎓 **8. KEY CONCEPTS SUMMARY**

### **DTO (Data Transfer Object):**
- **What:** Lightweight object for transferring data
- **Why:** Security (hide sensitive data), flexibility, validation
- **When:** Between controller and frontend, between layers
- **Example:** `UserDto` (without password), `ComplaintDto`

### **JWT (JSON Web Token):**
- **What:** Encrypted token containing user info
- **Why:** Stateless authentication (no server-side sessions)
- **How:** Generated on login, sent with every request
- **Structure:** Header.Payload.Signature

### **REST API:**
- **What:** Architectural style for web APIs
- **Principles:** Stateless, resource-based, HTTP methods
- **Methods:** GET (read), POST (create), PUT (update), DELETE
- **Format:** JSON request/response

### **Spring Boot Layers:**
1. **Controller:** Handle HTTP requests (REST endpoints)
2. **Service:** Business logic (rules, validation, coordination)
3. **Repository:** Database access (queries, CRUD)
4. **Entity:** Domain models (database tables as objects)

### **Security:**
- **Authentication:** Who are you? (Login with username/password)
- **Authorization:** What can you do? (`@PreAuthorize`, roles)
- **JWT Filter:** Validates token on every request
- **Password Hashing:** BCrypt (one-way, secure)

### **JPA/Hibernate:**
- **ORM:** Object-Relational Mapping (Java ↔ SQL)
- **Entities:** Java classes → Database tables
- **Repositories:** Interface → Auto-generated SQL
- **Relationships:** `@ManyToOne`, `@OneToMany`, etc.

---

## 🚀 **9. DATA FLOW SUMMARY**

```
USER ACTION
    ↓
REACT COMPONENT (UI)
    ↓
Axios HTTP Request (+ JWT Token)
    ↓
SPRING BOOT BACKEND
    ↓
JWT Authentication Filter (Validate Token)
    ↓
CONTROLLER (REST Endpoint, Authorization Check)
    ↓
DTO Conversion (Request → Entity)
    ↓
SERVICE (Business Logic, Validation)
    ↓
REPOSITORY (JPA Interface)
    ↓
HIBERNATE (Generate SQL)
    ↓
MYSQL DATABASE (Execute Query)
    ↓
Return Entity
    ↓
SERVICE (Process Result)
    ↓
DTO Conversion (Entity → Response)
    ↓
CONTROLLER (HTTP Response)
    ↓
Axios (Receive JSON)
    ↓
REACT COMPONENT (Update State, Re-render)
    ↓
USER SEES RESULT
```

---

## 📚 **10. TECHNOLOGY GLOSSARY**

- **Spring Boot:** Java framework for building web applications
- **JPA:** Java Persistence API (database access standard)
- **Hibernate:** ORM implementation (Java objects ↔ SQL)
- **REST:** Representational State Transfer (API architecture)
- **DTO:** Data Transfer Object (safe data container)
- **JWT:** JSON Web Token (stateless authentication)
- **BCrypt:** Password hashing algorithm
- **CORS:** Cross-Origin Resource Sharing (allow frontend-backend communication)
- **Axios:** JavaScript HTTP client
- **React:** JavaScript UI library
- **Context API:** React global state management
- **Material-UI:** React component library
- **MySQL:** Relational database management system
- **Maven:** Java build tool (mvnw.cmd)
- **npm:** Node Package Manager (JavaScript dependencies)

---

**YOU NOW UNDERSTAND THE COMPLETE SYSTEM!** 🎓✨

*From frontend click to database query and back - the entire flow!*

