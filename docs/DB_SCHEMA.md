# DATABASE SCHEMA
## Hostel Management System

## 1. DATABASE CREATION AND SETUP

### **1.1 Database Creation Script**

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS hostel 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE hostel;

-- Set SQL mode for strict data validation
SET SQL_MODE = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
```

### **1.2 Database Configuration**

```sql
-- Optimize database settings for performance
SET GLOBAL innodb_buffer_pool_size = 1073741824; -- 1GB
SET GLOBAL innodb_log_file_size = 268435456;     -- 256MB
SET GLOBAL max_connections = 200;
SET GLOBAL wait_timeout = 28800;                 -- 8 hours
SET GLOBAL interactive_timeout = 28800;
```

## 2. TABLE CREATION SCRIPTS

### **2.1 Users Table**

```sql
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
    
    -- Indexes for performance
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (active),
    INDEX idx_role_active (role, active),
    
    -- Constraints
    CONSTRAINT chk_users_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_users_phone_format CHECK (phone_number IS NULL OR phone_number REGEXP '^[0-9]{10,15}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **2.2 Rooms Table**

```sql
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
    
    -- Foreign Key Constraints
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_room_number (room_number),
    INDEX idx_status (status),
    INDEX idx_floor (floor),
    INDEX idx_student_id (student_id),
    INDEX idx_room_type (room_type),
    INDEX idx_status_type (status, room_type),
    INDEX idx_floor_status (floor, status),
    
    -- Constraints
    CONSTRAINT chk_rooms_floor CHECK (floor > 0 AND floor <= 20),
    CONSTRAINT chk_rooms_capacity CHECK (capacity > 0 AND capacity <= 4),
    CONSTRAINT chk_rooms_rent CHECK (monthly_rent > 0),
    CONSTRAINT chk_rooms_capacity_type CHECK (
        (room_type = 'SINGLE' AND capacity = 1) OR 
        (room_type = 'DOUBLE' AND capacity = 2)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **2.3 Complaints Table**

```sql
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('ELECTRICAL', 'PLUMBING', 'INTERNET', 'MAINTENANCE', 'CLEANLINESS', 'SECURITY', 'OTHER') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED') DEFAULT 'PENDING',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    warden_remarks TEXT,
    student_id BIGINT NOT NULL,
    assigned_to BIGINT NULL,
    
    -- Foreign Key Constraints
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_student_id (student_id),
    INDEX idx_type (type),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_student_status (student_id, status),
    INDEX idx_status_priority (status, priority),
    INDEX idx_type_status (type, status),
    
    -- Constraints
    CONSTRAINT chk_complaints_title_length CHECK (CHAR_LENGTH(title) >= 5),
    CONSTRAINT chk_complaints_description_length CHECK (CHAR_LENGTH(description) >= 10),
    CONSTRAINT chk_complaints_resolved_date CHECK (
        resolved_at IS NULL OR resolved_at >= submitted_at
    ),
    CONSTRAINT chk_complaints_resolved_status CHECK (
        (status IN ('RESOLVED', 'CLOSED') AND resolved_at IS NOT NULL) OR
        (status NOT IN ('RESOLVED', 'CLOSED') AND resolved_at IS NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **2.4 Fees Table**

```sql
CREATE TABLE fees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    room_rent DECIMAL(10,2) NOT NULL,
    maintenance_charge DECIMAL(10,2) DEFAULT 0,
    electricity_charge DECIMAL(10,2) DEFAULT 0,
    water_charge DECIMAL(10,2) DEFAULT 0,
    other_charges DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('PENDING', 'PARTIALLY_PAID', 'PAID', 'OVERDUE') DEFAULT 'PENDING',
    due_date DATE NOT NULL,
    paid_date DATE NULL,
    payment_method ENUM('CASH', 'CARD', 'ONLINE', 'BANK_TRANSFER') NULL,
    transaction_id VARCHAR(100) NULL,
    late_fee DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Unique Constraints
    UNIQUE KEY unique_student_month_year (student_id, month, year),
    
    -- Indexes for performance
    INDEX idx_student_id (student_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date),
    INDEX idx_month_year (month, year),
    INDEX idx_student_status (student_id, status),
    INDEX idx_status_due_date (status, due_date),
    INDEX idx_payment_method (payment_method),
    INDEX idx_transaction_id (transaction_id),
    
    -- Constraints
    CONSTRAINT chk_fees_year CHECK (year >= 2020 AND year <= 2030),
    CONSTRAINT chk_fees_month CHECK (month IN (
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    )),
    CONSTRAINT chk_fees_amounts CHECK (
        room_rent >= 0 AND 
        maintenance_charge >= 0 AND 
        electricity_charge >= 0 AND 
        water_charge >= 0 AND 
        other_charges >= 0 AND
        total_amount >= 0 AND 
        paid_amount >= 0 AND 
        paid_amount <= total_amount AND
        late_fee >= 0
    ),
    CONSTRAINT chk_fees_total_calculation CHECK (
        total_amount = room_rent + maintenance_charge + electricity_charge + 
                      water_charge + other_charges + late_fee
    ),
    CONSTRAINT chk_fees_payment_status CHECK (
        (status = 'PAID' AND paid_amount = total_amount AND paid_date IS NOT NULL) OR
        (status = 'PARTIALLY_PAID' AND paid_amount > 0 AND paid_amount < total_amount) OR
        (status IN ('PENDING', 'OVERDUE') AND paid_amount < total_amount)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 3. ADDITIONAL TABLES FOR EXTENDED FUNCTIONALITY

### **3.1 Audit Log Table**

```sql
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id BIGINT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id BIGINT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **3.2 System Settings Table**

```sql
CREATE TABLE system_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    data_type ENUM('STRING', 'INTEGER', 'BOOLEAN', 'DECIMAL', 'JSON') DEFAULT 'STRING',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **3.3 Notifications Table**

```sql
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('INFO', 'WARNING', 'ERROR', 'SUCCESS') DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(50),
    related_entity_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    
    -- Foreign Key
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    INDEX idx_user_read (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 4. SAMPLE DATA INSERTION

### **4.1 Insert Default Users**

```sql
-- Insert Admin User
INSERT INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact) VALUES
('admin', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'System', 'Administrator', 'admin@hostel.com', '9876543210', 'ADMIN', 'Admin Office, Main Building', '9876543211');

-- Insert Warden Users
INSERT INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact) VALUES
('warden1', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'Jane', 'Smith', 'warden1@hostel.com', '9876543220', 'WARDEN', 'Warden Quarters, Block A', '9876543221'),
('warden2', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'Michael', 'Johnson', 'warden2@hostel.com', '9876543230', 'WARDEN', 'Warden Quarters, Block B', '9876543231');

-- Insert Sample Students
INSERT INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact) VALUES
('student1', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'John', 'Doe', 'john.doe@student.com', '9876543212', 'STUDENT', 'Student Address 1', '9876543299'),
('student2', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'Alice', 'Johnson', 'alice.johnson@student.com', '9876543213', 'STUDENT', 'Student Address 2', '9876543299'),
('student3', '$2a$10$6kGgLqXxnyZpSpE4X8Jz0.h8ey7nM4pFGF0NfF4QzJKHkE5.d3G/a', 'Bob', 'Wilson', 'bob.wilson@student.com', '9876543214', 'STUDENT', 'Student Address 3', '9876543299');
```

### **4.2 Insert Sample Rooms**

```sql
-- Insert Rooms for 3 floors, 10 rooms per floor
-- Floor 1: Rooms 101-110 (5 Single, 5 Double)
INSERT INTO rooms (room_number, floor, room_type, capacity, status, monthly_rent, description) VALUES
('101', 1, 'SINGLE', 1, 'AVAILABLE', 5000.00, 'Single room on ground floor with window facing garden'),
('102', 1, 'SINGLE', 1, 'AVAILABLE', 5000.00, 'Single room on ground floor with window facing garden'),
('103', 1, 'SINGLE', 1, 'AVAILABLE', 5000.00, 'Single room on ground floor with window facing garden'),
('104', 1, 'SINGLE', 1, 'AVAILABLE', 5000.00, 'Single room on ground floor with window facing garden'),
('105', 1, 'SINGLE', 1, 'AVAILABLE', 5000.00, 'Single room on ground floor with window facing garden'),
('106', 1, 'DOUBLE', 2, 'AVAILABLE', 7000.00, 'Double room on ground floor with attached bathroom'),
('107', 1, 'DOUBLE', 2, 'AVAILABLE', 7000.00, 'Double room on ground floor with attached bathroom'),
('108', 1, 'DOUBLE', 2, 'AVAILABLE', 7000.00, 'Double room on ground floor with attached bathroom'),
('109', 1, 'DOUBLE', 2, 'AVAILABLE', 7000.00, 'Double room on ground floor with attached bathroom'),
('110', 1, 'DOUBLE', 2, 'AVAILABLE', 7000.00, 'Double room on ground floor with attached bathroom');

-- Floor 2: Rooms 201-210
INSERT INTO rooms (room_number, floor, room_type, capacity, status, monthly_rent, description) VALUES
('201', 2, 'SINGLE', 1, 'AVAILABLE', 5200.00, 'Single room on first floor with balcony'),
('202', 2, 'SINGLE', 1, 'AVAILABLE', 5200.00, 'Single room on first floor with balcony'),
('203', 2, 'SINGLE', 1, 'AVAILABLE', 5200.00, 'Single room on first floor with balcony'),
('204', 2, 'SINGLE', 1, 'AVAILABLE', 5200.00, 'Single room on first floor with balcony'),
('205', 2, 'SINGLE', 1, 'AVAILABLE', 5200.00, 'Single room on first floor with balcony'),
('206', 2, 'DOUBLE', 2, 'AVAILABLE', 7200.00, 'Double room on first floor with study area'),
('207', 2, 'DOUBLE', 2, 'AVAILABLE', 7200.00, 'Double room on first floor with study area'),
('208', 2, 'DOUBLE', 2, 'AVAILABLE', 7200.00, 'Double room on first floor with study area'),
('209', 2, 'DOUBLE', 2, 'AVAILABLE', 7200.00, 'Double room on first floor with study area'),
('210', 2, 'DOUBLE', 2, 'AVAILABLE', 7200.00, 'Double room on first floor with study area');

-- Floor 3: Rooms 301-310
INSERT INTO rooms (room_number, floor, room_type, capacity, status, monthly_rent, description) VALUES
('301', 3, 'SINGLE', 1, 'AVAILABLE', 5500.00, 'Single room on second floor with city view'),
('302', 3, 'SINGLE', 1, 'AVAILABLE', 5500.00, 'Single room on second floor with city view'),
('303', 3, 'SINGLE', 1, 'AVAILABLE', 5500.00, 'Single room on second floor with city view'),
('304', 3, 'SINGLE', 1, 'AVAILABLE', 5500.00, 'Single room on second floor with city view'),
('305', 3, 'SINGLE', 1, 'AVAILABLE', 5500.00, 'Single room on second floor with city view'),
('306', 3, 'DOUBLE', 2, 'AVAILABLE', 7500.00, 'Double room on second floor with premium amenities'),
('307', 3, 'DOUBLE', 2, 'AVAILABLE', 7500.00, 'Double room on second floor with premium amenities'),
('308', 3, 'DOUBLE', 2, 'AVAILABLE', 7500.00, 'Double room on second floor with premium amenities'),
('309', 3, 'DOUBLE', 2, 'AVAILABLE', 7500.00, 'Double room on second floor with premium amenities'),
('310', 3, 'DOUBLE', 2, 'AVAILABLE', 7500.00, 'Double room on second floor with premium amenities');
```

### **4.3 Allocate Some Rooms to Students**

```sql
-- Allocate room 101 to student1
UPDATE rooms SET student_id = (SELECT id FROM users WHERE username = 'student1'), 
                 status = 'OCCUPIED' 
WHERE room_number = '101';

-- Allocate room 201 to student2
UPDATE rooms SET student_id = (SELECT id FROM users WHERE username = 'student2'), 
                 status = 'OCCUPIED' 
WHERE room_number = '201';
```

### **4.4 Insert Sample Complaints**

```sql
-- Insert sample complaints
INSERT INTO complaints (title, description, type, priority, status, student_id, submitted_at) VALUES
('Air Conditioning Not Working', 'The AC in room 101 has been making strange noises and not cooling properly for the past 2 days. Please send someone to fix it.', 'ELECTRICAL', 'HIGH', 'PENDING', 
    (SELECT id FROM users WHERE username = 'student1'), NOW()),

('WiFi Connection Issues', 'Internet connection is very slow in room 101, making it difficult to attend online classes. Speed test shows only 2 Mbps.', 'INTERNET', 'MEDIUM', 'IN_PROGRESS', 
    (SELECT id FROM users WHERE username = 'student1'), DATE_SUB(NOW(), INTERVAL 1 DAY)),

('Water Leakage in Bathroom', 'There is water leakage from the bathroom ceiling in room 201. Water is dripping continuously.', 'PLUMBING', 'HIGH', 'RESOLVED', 
    (SELECT id FROM users WHERE username = 'student2'), DATE_SUB(NOW(), INTERVAL 3 DAY));

-- Update resolved complaint
UPDATE complaints SET 
    resolved_at = DATE_SUB(NOW(), INTERVAL 1 DAY),
    warden_remarks = 'Plumber fixed the pipe and ceiling has been repaired. Issue resolved successfully.',
    status = 'RESOLVED'
WHERE title = 'Water Leakage in Bathroom';
```

### **4.5 Insert Sample Fees**

```sql
-- Insert fees for current month
INSERT INTO fees (student_id, month, year, room_rent, maintenance_charge, electricity_charge, water_charge, total_amount, due_date) VALUES
((SELECT id FROM users WHERE username = 'student1'), 'October', 2025, 5000.00, 500.00, 200.00, 100.00, 5800.00, '2025-10-31'),
((SELECT id FROM users WHERE username = 'student2'), 'October', 2025, 5200.00, 500.00, 180.00, 100.00, 5980.00, '2025-10-31');

-- Mark one fee as paid
UPDATE fees SET 
    status = 'PAID', 
    paid_amount = total_amount, 
    paid_date = '2025-10-15',
    payment_method = 'ONLINE',
    transaction_id = 'TXN123456789'
WHERE student_id = (SELECT id FROM users WHERE username = 'student2') 
  AND month = 'October' AND year = 2025;
```

### **4.6 Insert System Settings**

```sql
INSERT INTO system_settings (setting_key, setting_value, description, data_type) VALUES
('hostel_name', 'SECE Hostel Management System', 'Name of the hostel', 'STRING'),
('max_complaints_per_month', '5', 'Maximum complaints a student can submit per month', 'INTEGER'),
('late_fee_percentage', '5.0', 'Late fee percentage for overdue payments', 'DECIMAL'),
('maintenance_charge_default', '500.00', 'Default maintenance charge per month', 'DECIMAL'),
('complaint_auto_close_days', '30', 'Days after which resolved complaints are auto-closed', 'INTEGER'),
('email_notifications_enabled', 'true', 'Enable email notifications', 'BOOLEAN');
```

## 5. DATABASE VIEWS

### **5.1 Active Students View**

```sql
CREATE VIEW v_active_students AS
SELECT 
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    r.room_number,
    r.room_type,
    r.monthly_rent,
    r.floor
FROM users u
LEFT JOIN rooms r ON u.id = r.student_id
WHERE u.role = 'STUDENT' AND u.active = TRUE;
```

### **5.2 Room Occupancy View**

```sql
CREATE VIEW v_room_occupancy AS
SELECT 
    r.id,
    r.room_number,
    r.floor,
    r.room_type,
    r.capacity,
    r.status,
    r.monthly_rent,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number
FROM rooms r
LEFT JOIN users u ON r.student_id = u.id;
```

### **5.3 Pending Complaints View**

```sql
CREATE VIEW v_pending_complaints AS
SELECT 
    c.id,
    c.title,
    c.description,
    c.type,
    c.priority,
    c.status,
    c.submitted_at,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    r.room_number
FROM complaints c
JOIN users u ON c.student_id = u.id
LEFT JOIN rooms r ON u.id = r.student_id
WHERE c.status IN ('PENDING', 'IN_PROGRESS')
ORDER BY c.priority DESC, c.submitted_at ASC;
```

### **5.4 Fee Summary View**

```sql
CREATE VIEW v_fee_summary AS
SELECT 
    f.id,
    u.first_name,
    u.last_name,
    u.email,
    r.room_number,
    f.month,
    f.year,
    f.total_amount,
    f.paid_amount,
    (f.total_amount - f.paid_amount) AS pending_amount,
    f.status,
    f.due_date,
    f.paid_date,
    CASE 
        WHEN f.status = 'OVERDUE' THEN DATEDIFF(NOW(), f.due_date)
        ELSE 0 
    END AS days_overdue
FROM fees f
JOIN users u ON f.student_id = u.id
LEFT JOIN rooms r ON u.id = r.student_id
ORDER BY f.due_date DESC;
```

## 6. STORED PROCEDURES

### **6.1 Monthly Fee Generation Procedure**

```sql
DELIMITER $$

CREATE PROCEDURE sp_generate_monthly_fees(
    IN p_month VARCHAR(20),
    IN p_year INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_student_id BIGINT;
    DECLARE v_room_rent DECIMAL(10,2);
    DECLARE v_maintenance_charge DECIMAL(10,2);
    DECLARE v_due_date DATE;
    
    -- Cursor to get all students with allocated rooms
    DECLARE student_cursor CURSOR FOR
        SELECT u.id, r.monthly_rent
        FROM users u
        JOIN rooms r ON u.id = r.student_id
        WHERE u.role = 'STUDENT' AND u.active = TRUE AND r.status = 'OCCUPIED';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Set due date to last day of the month
    SET v_due_date = LAST_DAY(STR_TO_DATE(CONCAT(p_year, '-', 
        CASE p_month
            WHEN 'January' THEN '01'
            WHEN 'February' THEN '02'
            WHEN 'March' THEN '03'
            WHEN 'April' THEN '04'
            WHEN 'May' THEN '05'
            WHEN 'June' THEN '06'
            WHEN 'July' THEN '07'
            WHEN 'August' THEN '08'
            WHEN 'September' THEN '09'
            WHEN 'October' THEN '10'
            WHEN 'November' THEN '11'
            WHEN 'December' THEN '12'
        END, '-01'), '%Y-%m-%d'));
    
    -- Get default maintenance charge
    SELECT CAST(setting_value AS DECIMAL(10,2)) INTO v_maintenance_charge
    FROM system_settings 
    WHERE setting_key = 'maintenance_charge_default';
    
    OPEN student_cursor;
    
    fee_loop: LOOP
        FETCH student_cursor INTO v_student_id, v_room_rent;
        IF done THEN
            LEAVE fee_loop;
        END IF;
        
        -- Insert fee record if not exists
        INSERT IGNORE INTO fees (
            student_id, month, year, room_rent, maintenance_charge, 
            total_amount, due_date
        ) VALUES (
            v_student_id, p_month, p_year, v_room_rent, v_maintenance_charge,
            v_room_rent + v_maintenance_charge, v_due_date
        );
        
    END LOOP;
    
    CLOSE student_cursor;
    
    -- Return summary
    SELECT 
        COUNT(*) AS total_fees_generated,
        SUM(total_amount) AS total_amount
    FROM fees 
    WHERE month = p_month AND year = p_year;
    
END$$

DELIMITER ;
```

### **6.2 Room Allocation Procedure**

```sql
DELIMITER $$

CREATE PROCEDURE sp_allocate_room(
    IN p_room_id BIGINT,
    IN p_student_id BIGINT,
    OUT p_result VARCHAR(200)
)
BEGIN
    DECLARE v_room_status VARCHAR(20);
    DECLARE v_student_role VARCHAR(20);
    DECLARE v_student_has_room INT DEFAULT 0;
    DECLARE v_room_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR: Transaction failed';
    END;
    
    START TRANSACTION;
    
    -- Check if room exists and is available
    SELECT status INTO v_room_status 
    FROM rooms 
    WHERE id = p_room_id;
    
    IF v_room_status IS NULL THEN
        SET p_result = 'ERROR: Room does not exist';
        ROLLBACK;
    ELSEIF v_room_status != 'AVAILABLE' THEN
        SET p_result = 'ERROR: Room is not available';
        ROLLBACK;
    ELSE
        -- Check if student exists and is a student
        SELECT role INTO v_student_role
        FROM users 
        WHERE id = p_student_id AND active = TRUE;
        
        IF v_student_role IS NULL THEN
            SET p_result = 'ERROR: Student does not exist or is inactive';
            ROLLBACK;
        ELSEIF v_student_role != 'STUDENT' THEN
            SET p_result = 'ERROR: User is not a student';
            ROLLBACK;
        ELSE
            -- Check if student already has a room
            SELECT COUNT(*) INTO v_student_has_room
            FROM rooms 
            WHERE student_id = p_student_id;
            
            IF v_student_has_room > 0 THEN
                SET p_result = 'ERROR: Student already has a room allocated';
                ROLLBACK;
            ELSE
                -- Allocate room
                UPDATE rooms 
                SET student_id = p_student_id, status = 'OCCUPIED'
                WHERE id = p_room_id;
                
                SET p_result = 'SUCCESS: Room allocated successfully';
                COMMIT;
            END IF;
        END IF;
    END IF;
    
END$$

DELIMITER ;
```

## 7. TRIGGERS

### **7.1 Audit Trail Trigger**

```sql
DELIMITER $$

CREATE TRIGGER tr_users_audit_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, new_values, user_id)
    VALUES ('users', NEW.id, 'INSERT', 
            JSON_OBJECT(
                'username', NEW.username,
                'first_name', NEW.first_name,
                'last_name', NEW.last_name,
                'email', NEW.email,
                'role', NEW.role
            ),
            NEW.id);
END$$

CREATE TRIGGER tr_users_audit_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, user_id)
    VALUES ('users', NEW.id, 'UPDATE',
            JSON_OBJECT(
                'username', OLD.username,
                'first_name', OLD.first_name,
                'last_name', OLD.last_name,
                'email', OLD.email,
                'role', OLD.role
            ),
            JSON_OBJECT(
                'username', NEW.username,
                'first_name', NEW.first_name,
                'last_name', NEW.last_name,
                'email', NEW.email,
                'role', NEW.role
            ),
            NEW.id);
END$$

DELIMITER ;
```

### **7.2 Fee Status Update Trigger**

```sql
DELIMITER $$

CREATE TRIGGER tr_fees_status_update
BEFORE UPDATE ON fees
FOR EACH ROW
BEGIN
    -- Update status based on paid amount
    IF NEW.paid_amount = 0 THEN
        IF NEW.due_date < CURDATE() THEN
            SET NEW.status = 'OVERDUE';
        ELSE
            SET NEW.status = 'PENDING';
        END IF;
    ELSEIF NEW.paid_amount = NEW.total_amount THEN
        SET NEW.status = 'PAID';
        IF NEW.paid_date IS NULL THEN
            SET NEW.paid_date = CURDATE();
        END IF;
    ELSEIF NEW.paid_amount > 0 AND NEW.paid_amount < NEW.total_amount THEN
        SET NEW.status = 'PARTIALLY_PAID';
    END IF;
END$$

DELIMITER ;
```

## 8. PERFORMANCE OPTIMIZATION

### **8.1 Additional Indexes for Complex Queries**

```sql
-- Composite indexes for frequently used query combinations
CREATE INDEX idx_users_role_active_created ON users(role, active, created_at);
CREATE INDEX idx_rooms_status_floor_type ON rooms(status, floor, room_type);
CREATE INDEX idx_complaints_student_status_priority ON complaints(student_id, status, priority);
CREATE INDEX idx_fees_student_year_month ON fees(student_id, year, month);
CREATE INDEX idx_fees_status_due_date_student ON fees(status, due_date, student_id);

-- Full-text indexes for search functionality
CREATE FULLTEXT INDEX idx_complaints_title_description ON complaints(title, description);
CREATE FULLTEXT INDEX idx_rooms_description ON rooms(description);
```

### **8.2 Partitioning Strategy**

```sql
-- Partition fees table by year for better performance
ALTER TABLE fees PARTITION BY RANGE (year) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p2027 VALUES LESS THAN (2028),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partition audit_logs by date for better performance
ALTER TABLE audit_logs PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

**Created by:** Yugendra  
**Date:** October 29, 2025  
**Version:** 1.0
