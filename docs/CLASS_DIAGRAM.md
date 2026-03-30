# CLASS DIAGRAM
## Hostel Management System

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
│ + User(username: String, password: String, role: Role)                      │
│ + getters() / setters()                                                     │
│ + builder(): UserBuilder                                                    │
│ + isActive(): Boolean                                                       │
│ + getFullName(): String                                                     │
│ + hasRole(role: Role): Boolean                                              │
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
│ + Room(roomNumber: String, floor: Integer, roomType: RoomType)              │
│ + getters() / setters()                                                     │
│ + isAvailable(): Boolean                                                    │
│ + isOccupied(): Boolean                                                     │
│ + allocateToStudent(student: User): void                                    │
│ + deallocate(): void                                                        │
│ + calculateMonthlyRent(): BigDecimal                                        │
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
│ + Complaint(title: String, description: String, type: ComplaintType)       │
│ + getters() / setters()                                                     │
│ + resolve(remarks: String): void                                            │
│ + updateStatus(status: ComplaintStatus): void                               │
│ + isOverdue(): Boolean                                                      │
│ + getResolutionTime(): Duration                                             │
│ + isPending(): Boolean                                                      │
│ + isResolved(): Boolean                                                     │
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
│ + Fee(student: User, month: String, year: Integer)                          │
│ + getters() / setters()                                                     │
│ + calculateTotal(): BigDecimal                                              │
│ + markAsPaid(amount: BigDecimal): void                                      │
│ + markAsPaid(amount: BigDecimal, paidDate: LocalDate): void                 │
│ + isOverdue(): Boolean                                                      │
│ + isPaid(): Boolean                                                         │
│ + getRemainingAmount(): BigDecimal                                          │
│ + getDaysOverdue(): Long                                                    │
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
│ + refreshToken(request: TokenRefreshRequest): ResponseEntity<AuthResponse>  │
│ + getCurrentUser(): ResponseEntity<User>                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              UserController                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ - userService: UserService                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllUsers(): ResponseEntity<List<User>>                                 │
│ + getUserById(id: Long): ResponseEntity<User>                               │
│ + getUserProfile(): ResponseEntity<User>                                    │
│ + updateProfile(user: User): ResponseEntity<User>                           │
│ + createUser(user: User): ResponseEntity<User>                              │
│ + updateUser(id: Long, user: User): ResponseEntity<User>                    │
│ + deleteUser(id: Long): ResponseEntity<String>                              │
│ + activateUser(id: Long): ResponseEntity<String>                            │
│ + deactivateUser(id: Long): ResponseEntity<String>                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              RoomController                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ - roomService: RoomService                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllRooms(): ResponseEntity<List<Room>>                                 │
│ + getRoomById(id: Long): ResponseEntity<Room>                               │
│ + getAvailableRooms(): ResponseEntity<List<Room>>                           │
│ + getRoomsByFloor(floor: Integer): ResponseEntity<List<Room>>               │
│ + getRoomsByType(type: RoomType): ResponseEntity<List<Room>>                │
│ + allocateRoom(roomId: Long, studentId: Long): ResponseEntity<String>       │
│ + deallocateRoom(roomId: Long): ResponseEntity<String>                      │
│ + createRoom(room: Room): ResponseEntity<Room>                              │
│ + updateRoom(id: Long, room: Room): ResponseEntity<Room>                    │
│ + deleteRoom(id: Long): ResponseEntity<String>                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           ComplaintController                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ - complaintService: ComplaintService                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllComplaints(): ResponseEntity<List<Complaint>>                       │
│ + getComplaintById(id: Long): ResponseEntity<Complaint>                     │
│ + getMyComplaints(): ResponseEntity<List<Complaint>>                        │
│ + getComplaintsByStatus(status: ComplaintStatus): ResponseEntity<List<>>    │
│ + getComplaintsByPriority(priority: Priority): ResponseEntity<List<>>       │
│ + createComplaint(complaint: Complaint): ResponseEntity<Complaint>          │
│ + updateComplaint(id: Long, complaint: Complaint): ResponseEntity<>         │
│ + updateComplaintStatus(id: Long, status: String): ResponseEntity<String>   │
│ + addWardenRemarks(id: Long, remarks: String): ResponseEntity<String>       │
│ + deleteComplaint(id: Long): ResponseEntity<String>                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FeeController                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ - feeService: FeeService                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllFees(): ResponseEntity<List<Fee>>                                   │
│ + getFeeById(id: Long): ResponseEntity<Fee>                                 │
│ + getMyFees(): ResponseEntity<List<Fee>>                                    │
│ + getFeesByStudent(studentId: Long): ResponseEntity<List<Fee>>              │
│ + getFeesByStatus(status: FeeStatus): ResponseEntity<List<Fee>>             │
│ + createFee(fee: Fee): ResponseEntity<Fee>                                  │
│ + updateFee(id: Long, fee: Fee): ResponseEntity<Fee>                        │
│ + markFeeAsPaid(id: Long, amount: BigDecimal): ResponseEntity<String>       │
│ + generateMonthlyFees(month: String, year: Integer): ResponseEntity<String> │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           DashboardController                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ - dashboardService: DashboardService                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getDashboardStats(): ResponseEntity<DashboardStats>                      │
│ + getRoomOccupancyStats(): ResponseEntity<RoomOccupancyStats>               │
│ + getComplaintStats(): ResponseEntity<ComplaintStats>                      │
│ + getFeeCollectionStats(): ResponseEntity<FeeCollectionStats>              │
│ + getMonthlyReport(month: String, year: Integer): ResponseEntity<Report>    │
└───────────────────────────���─────────────────────────────────────────────────┘
```

## Service Layer Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AuthService                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - userRepository: UserRepository                                            │
│ - passwordEncoder: PasswordEncoder                                          │
│ - jwtUtil: JwtUtil                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + authenticate(username: String, password: String): AuthResponse            │
│ + register(user: User): String                                              │
│ + validateToken(token: String): Boolean                                     │
│ + refreshToken(token: String): AuthResponse                                 │
│ + logout(token: String): void                                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              UserService                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - userRepository: UserRepository                                            │
│ - passwordEncoder: PasswordEncoder                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllUsers(): List<User>                                                 │
│ + getUserById(id: Long): Optional<User>                                     │
│ + getUserByUsername(username: String): Optional<User>                       │
│ + createUser(user: User): User                                              │
│ + updateUser(id: Long, user: User): User                                    │
│ + deleteUser(id: Long): void                                                │
│ + activateUser(id: Long): void                                              │
│ + deactivateUser(id: Long): void                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              RoomService                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - roomRepository: RoomRepository                                            │
│ - userRepository: UserRepository                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getAllRooms(): List<Room>                                                 │
│ + getAvailableRooms(): List<Room>                                           │
│ + getRoomsByFloor(floor: Integer): List<Room>                               │
│ + allocateRoom(roomId: Long, studentId: Long): void                         │
│ + deallocateRoom(roomId: Long): void                                        │
│ + createRoom(room: Room): Room                                              │
│ + updateRoom(id: Long, room: Room): Room                                    │
│ + getRoomOccupancyStats(): RoomOccupancyStats                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Repository Layer Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            UserRepository                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ extends JpaRepository<User, Long>                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ + findByUsername(username: String): Optional<User>                          │
│ + findByEmail(email: String): Optional<User>                                │
│ + findByRole(role: Role): List<User>                                        │
│ + findByActiveTrue(): List<User>                                            │
│ + existsByUsername(username: String): Boolean                               │
│ + existsByEmail(email: String): Boolean                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            RoomRepository                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ extends JpaRepository<Room, Long>                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ + findByStatus(status: RoomStatus): List<Room>                              │
│ + findByFloor(floor: Integer): List<Room>                                   │
│ + findByRoomType(type: RoomType): List<Room>                                │
│ + findByRoomNumber(roomNumber: String): Optional<Room>                      │
│ + findByStudent(student: User): Optional<Room>                              │
│ + countByStatus(status: RoomStatus): Long                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          ComplaintRepository                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ extends JpaRepository<Complaint, Long>                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ + findByStudent(student: User): List<Complaint>                             │
│ + findByStatus(status: ComplaintStatus): List<Complaint>                    │
│ + findByPriority(priority: Priority): List<Complaint>                       │
│ + findByType(type: ComplaintType): List<Complaint>                          │
│ + findByStudentOrderBySubmittedAtDesc(student: User): List<Complaint>       │
│ + countByStatus(status: ComplaintStatus): Long                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Utility Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                               JwtUtil                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ - secret: String                                                            │
│ - expiration: Long                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + generateToken(user: User): String                                         │
│ + validateToken(token: String, user: User): Boolean                         │
│ + getUsernameFromToken(token: String): String                               │
│ + getExpirationDateFromToken(token: String): Date                           │
│ + isTokenExpired(token: String): Boolean                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            SecurityConfig                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ - jwtAuthenticationEntryPoint: JwtAuthenticationEntryPoint                  │
│ - jwtRequestFilter: JwtRequestFilter                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ + passwordEncoder(): PasswordEncoder                                        │
│ + authenticationManager(): AuthenticationManager                            │
│ + filterChain(): SecurityFilterChain                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Class Relationships Summary

### **Inheritance**
- All Controller classes extend BaseController (if implemented)
- All Service classes implement their respective interfaces
- All Repository interfaces extend JpaRepository

### **Composition/Aggregation**
- **User** has one **Room** (0..1 relationship)
- **User** has many **Complaints** (1..* relationship)  
- **User** has many **Fees** (1..* relationship)

### **Dependencies**
- **Controllers** depend on **Services**
- **Services** depend on **Repositories**
- **Services** may depend on other **Services**
- **Security** components depend on **JwtUtil**

### **Association**
- **Room** is associated with **User** (student)
- **Complaint** is associated with **User** (student)
- **Fee** is associated with **User** (student)

**Created by:** Yugendra  
**Date:** October 29, 2025  
**Version:** 1.0
