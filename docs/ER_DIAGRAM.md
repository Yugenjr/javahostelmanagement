# ER DIAGRAM
## Hostel Management System

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
```

## Entity Relationships

### **1. USERS Entity**
**Attributes:**
- **id (PK):** Unique identifier for each user
- **username:** Unique login identifier  
- **password:** Encrypted password using BCrypt
- **first_name, last_name:** User's full name
- **email:** Unique email address for communication
- **phone_number:** Contact number
- **role:** User type (ADMIN, WARDEN, STUDENT)
- **address:** Physical address
- **emergency_contact:** Emergency contact number
- **active:** Account status flag
- **created_at, updated_at:** Audit timestamps

**Business Rules:**
- Username must be unique across all users
- Email must be unique and valid format
- Password must be encrypted before storage
- Only STUDENT role users can be allocated rooms
- ADMIN role has full system access
- WARDEN role can manage complaints

### **2. ROOMS Entity**
**Attributes:**
- **id (PK):** Unique room identifier
- **room_number:** Human-readable room identifier (e.g., "101", "202")
- **floor:** Floor number where room is located
- **room_type:** Type of room (SINGLE, DOUBLE)
- **capacity:** Maximum occupants allowed
- **status:** Current room status (AVAILABLE, OCCUPIED, MAINTENANCE)
- **monthly_rent:** Monthly rental amount
- **description:** Additional room details
- **student_id (FK):** Reference to allocated student
- **created_at, updated_at:** Audit timestamps

**Business Rules:**
- Room number must be unique
- Only AVAILABLE rooms can be allocated
- Room capacity determines room_type
- Monthly rent varies by room type
- Student can only have one room at a time

### **3. COMPLAINTS Entity**
**Attributes:**
- **id (PK):** Unique complaint identifier
- **title:** Brief complaint summary
- **description:** Detailed complaint description
- **type:** Category of complaint (ELECTRICAL, PLUMBING, etc.)
- **priority:** Urgency level (LOW, MEDIUM, HIGH, URGENT)
- **status:** Current complaint status
- **submitted_at:** When complaint was created
- **resolved_at:** When complaint was resolved
- **warden_remarks:** Warden's notes on resolution
- **student_id (FK):** Reference to student who submitted

**Business Rules:**
- Only students can submit complaints
- Status follows workflow: PENDING → IN_PROGRESS → RESOLVED → CLOSED
- High priority complaints require immediate attention
- Resolved complaints must have warden remarks
- Students can track their complaint status

### **4. FEES Entity**
**Attributes:**
- **id (PK):** Unique fee record identifier
- **student_id (FK):** Reference to student
- **month, year:** Fee period
- **room_rent:** Room rental amount
- **maintenance_charge:** Additional maintenance fees
- **total_amount:** Sum of all charges
- **paid_amount:** Amount paid by student
- **status:** Payment status (PENDING, PAID, OVERDUE)
- **due_date:** Payment deadline
- **paid_date:** Actual payment date
- **created_at:** Record creation timestamp

**Business Rules:**
- One fee record per student per month
- Total amount = room_rent + maintenance_charge
- Status becomes OVERDUE after due_date
- Partial payments are tracked
- Only students with rooms generate fees

## Relationship Details

### **USERS ←→ ROOMS (1:0..1)**
- **Relationship:** "has" or "is allocated"
- **Cardinality:** One user can have zero or one room
- **Foreign Key:** rooms.student_id references users.id
- **Constraints:** 
  - Only STUDENT role users can be allocated rooms
  - Student can have maximum one room
  - Room status changes to OCCUPIED when allocated

### **USERS ←→ COMPLAINTS (1:*)**
- **Relationship:** "submits"
- **Cardinality:** One user can submit multiple complaints
- **Foreign Key:** complaints.student_id references users.id
- **Constraints:**
  - Only STUDENT role users can submit complaints
  - Complaint must have valid student reference
  - Student can view only their own complaints

### **USERS ←→ FEES (1:*)**
- **Relationship:** "pays"
- **Cardinality:** One user can have multiple fee records
- **Foreign Key:** fees.student_id references users.id
- **Constraints:**
  - Only students with allocated rooms generate fees
  - Unique constraint on (student_id, month, year)
  - Fee amount based on allocated room rent

## Database Indexes

### **Performance Indexes**
```sql
-- Users table indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);

-- Rooms table indexes  
CREATE INDEX idx_rooms_number ON rooms(room_number);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_rooms_floor ON rooms(floor);
CREATE INDEX idx_rooms_student ON rooms(student_id);

-- Complaints table indexes
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_student ON complaints(student_id);
CREATE INDEX idx_complaints_type ON complaints(type);
CREATE INDEX idx_complaints_submitted ON complaints(submitted_at);

-- Fees table indexes
CREATE INDEX idx_fees_student ON fees(student_id);
CREATE INDEX idx_fees_status ON fees(status);
CREATE INDEX idx_fees_due_date ON fees(due_date);
CREATE UNIQUE INDEX idx_fees_student_period ON fees(student_id, month, year);
```

### **Composite Indexes for Complex Queries**
```sql
-- Frequently used combinations
CREATE INDEX idx_complaints_student_status ON complaints(student_id, status);
CREATE INDEX idx_fees_student_status ON fees(student_id, status);
CREATE INDEX idx_rooms_status_type ON rooms(status, room_type);
CREATE INDEX idx_users_role_active ON users(role, active);
```

## Data Integrity Constraints

### **Primary Key Constraints**
- All tables have auto-incrementing BIGINT primary keys
- Ensures unique identification of each record

### **Foreign Key Constraints**
- **rooms.student_id → users.id** (ON DELETE SET NULL)
- **complaints.student_id → users.id** (ON DELETE CASCADE)
- **fees.student_id → users.id** (ON DELETE CASCADE)

### **Unique Constraints**
- **users.username:** Prevents duplicate usernames
- **users.email:** Prevents duplicate email addresses
- **rooms.room_number:** Prevents duplicate room numbers
- **fees(student_id, month, year):** Prevents duplicate monthly fees

### **Check Constraints**
```sql
-- Ensure valid data ranges
ALTER TABLE rooms ADD CONSTRAINT chk_rooms_capacity 
CHECK (capacity > 0 AND capacity <= 4);

ALTER TABLE rooms ADD CONSTRAINT chk_rooms_rent 
CHECK (monthly_rent > 0);

ALTER TABLE fees ADD CONSTRAINT chk_fees_amounts 
CHECK (total_amount >= 0 AND paid_amount >= 0 AND paid_amount <= total_amount);

ALTER TABLE complaints ADD CONSTRAINT chk_complaints_dates 
CHECK (resolved_at IS NULL OR resolved_at >= submitted_at);
```

## Entity Normalization

### **First Normal Form (1NF)**
- All attributes contain atomic values
- No repeating groups or arrays
- Each record is unique

### **Second Normal Form (2NF)**
- Meets 1NF requirements
- All non-key attributes depend on entire primary key
- No partial dependencies

### **Third Normal Form (3NF)**
- Meets 2NF requirements  
- No transitive dependencies
- All attributes depend only on primary key

### **Business Rule Enforcement**
- Referential integrity through foreign keys
- Domain constraints through ENUM types
- Business logic validation in application layer
- Audit trails through timestamp fields

**Created by:** Yugendra  
**Date:** October 29, 2025  
**Version:** 1.0
