-- ===================================
-- HOSTEL MANAGEMENT SYSTEM - SAMPLE DATA
-- ===================================

USE hostel_db;

-- Clear existing data (optional - comment out if you want to keep existing data)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE fees;
-- TRUNCATE TABLE complaints;
-- TRUNCATE TABLE rooms;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- ===================================
-- INSERT ROOMS
-- ===================================
INSERT INTO rooms (room_number, room_type, capacity, current_occupancy, floor, monthly_rent, status, description, amenities, created_at, updated_at) VALUES
('A101', 'SINGLE', 1, 1, 1, 5000.00, 'OCCUPIED', 'Premium single room with attached bathroom', 'AC, WiFi, Study Table, Wardrobe, Attached Bathroom, Balcony', NOW(), NOW()),
('A102', 'DOUBLE', 2, 2, 1, 4000.00, 'OCCUPIED', 'Spacious double sharing room', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('A103', 'TRIPLE', 3, 2, 1, 3500.00, 'OCCUPIED', 'Triple sharing with large space', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('A104', 'DOUBLE', 2, 0, 1, 4000.00, 'AVAILABLE', 'Well-ventilated double room', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('B101', 'SINGLE', 1, 1, 2, 5500.00, 'OCCUPIED', 'Deluxe single room with premium amenities', 'AC, WiFi, Study Table, King Size Bed, Wardrobe, Attached Bathroom, Balcony, Mini Fridge', NOW(), NOW()),
('B102', 'DOUBLE', 2, 0, 2, 4200.00, 'AVAILABLE', 'Modern double sharing room', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom, Balcony', NOW(), NOW()),
('B103', 'TRIPLE', 3, 0, 2, 3700.00, 'AVAILABLE', 'Triple sharing with modern interiors', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('B104', 'SINGLE', 1, 0, 2, 5200.00, 'AVAILABLE', 'Single occupancy with garden view', 'AC, WiFi, Study Table, Wardrobe, Attached Bathroom, Balcony', NOW(), NOW()),
('C101', 'SINGLE', 1, 0, 3, 5200.00, 'MAINTENANCE', 'Under renovation - AC replacement', 'AC, WiFi, Study Table, Wardrobe, Attached Bathroom', NOW(), NOW()),
('C102', 'DOUBLE', 2, 0, 3, 4000.00, 'AVAILABLE', 'Top floor double room', 'AC, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('C103', 'TRIPLE', 3, 0, 3, 3500.00, 'AVAILABLE', 'Affordable triple sharing', 'Fan, WiFi, Study Tables, Wardrobes, Attached Bathroom', NOW(), NOW()),
('D101', 'SINGLE', 1, 0, 4, 5300.00, 'AVAILABLE', 'Executive single room', 'AC, WiFi, Study Table, Premium Bed, Large Wardrobe, Attached Bathroom, Balcony', NOW(), NOW());

-- ===================================
-- INSERT USERS (Students, Wardens, Admin)
-- ===================================
-- Password for all users: password (hashed with BCrypt - $2a$10$...)
-- Note: In production, passwords should be properly hashed

-- Admin User (if not exists)
INSERT INTO users (username, password, first_name, last_name, email, phone_number, address, emergency_contact, role, active, created_at, updated_at)
SELECT 'admin', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'System', 'Administrator', 'admin@hostel.com', '9999999999', 'Admin Office, Hostel Campus', '9999999998', 'ADMIN', true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- Warden Users
INSERT INTO users (username, password, first_name, last_name, email, phone_number, address, emergency_contact, role, active, created_at, updated_at)
SELECT 'warden1', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'John', 'Warden', 'john.warden@hostel.com', '9876543220', 'Warden Office, Block A', '9876543221', 'WARDEN', true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'warden1');

INSERT INTO users (username, password, first_name, last_name, email, phone_number, address, emergency_contact, role, active, created_at, updated_at)
SELECT 'warden2', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Sarah', 'Smith', 'sarah.smith@hostel.com', '9876543230', 'Warden Office, Block B', '9876543231', 'WARDEN', true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'warden2');

-- Student Users
INSERT INTO users (username, password, first_name, last_name, email, phone_number, address, emergency_contact, role, active, room_id, created_at, updated_at) VALUES
('student1', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Alice', 'Johnson', 'alice.johnson@student.com', '9876543210', '123 Main St, New York, NY', '9876543211', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'A101' LIMIT 1), NOW(), NOW()),
('student2', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Bob', 'Smith', 'bob.smith@student.com', '9876543212', '456 Oak Ave, Boston, MA', '9876543213', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'A102' LIMIT 1), NOW(), NOW()),
('student3', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Carol', 'Williams', 'carol.williams@student.com', '9876543214', '789 Pine Rd, Chicago, IL', '9876543215', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'A102' LIMIT 1), NOW(), NOW()),
('student4', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'David', 'Brown', 'david.brown@student.com', '9876543216', '321 Elm St, Seattle, WA', '9876543217', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'A103' LIMIT 1), NOW(), NOW()),
('student5', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Emma', 'Davis', 'emma.davis@student.com', '9876543218', '654 Maple Dr, Austin, TX', '9876543219', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'B101' LIMIT 1), NOW(), NOW()),
('student6', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Frank', 'Miller', 'frank.miller@student.com', '9876543220', '987 Cedar Ln, Miami, FL', '9876543221', 'STUDENT', true, (SELECT id FROM rooms WHERE room_number = 'A103' LIMIT 1), NOW(), NOW()),
('student7', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Grace', 'Wilson', 'grace.wilson@student.com', '9876543222', '159 Birch Ave, Denver, CO', '9876543223', 'STUDENT', true, NULL, NOW(), NOW()),
('student8', '$2a$10$EIXhJ6tqF7vQKhzF8rJQmOMdVqF7Y.qLJxp7Y5YqF7YqF7YqF7YqF', 'Henry', 'Moore', 'henry.moore@student.com', '9876543224', '753 Spruce St, Portland, OR', '9876543225', 'STUDENT', true, NULL, NOW(), NOW());

-- ===================================
-- INSERT COMPLAINTS
-- ===================================
INSERT INTO complaints (student_id, title, description, type, priority, status, created_at, updated_at, warden_remarks, resolved_at) VALUES
((SELECT id FROM users WHERE username = 'student1' LIMIT 1), 'WiFi Not Working', 'Internet connection is very slow in my room. Unable to attend online classes properly.', 'INTERNET', 'HIGH', 'IN_PROGRESS', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW(), 'Technician assigned. Will be resolved by tomorrow.', NULL),
((SELECT id FROM users WHERE username = 'student2' LIMIT 1), 'AC Not Cooling', 'Air conditioner stopped cooling. Room temperature is very high.', 'ELECTRICAL', 'HIGH', 'PENDING', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), NULL, NULL),
((SELECT id FROM users WHERE username = 'student3' LIMIT 1), 'Water Leakage', 'Water is leaking from bathroom ceiling. Urgent attention required.', 'PLUMBING', 'HIGH', 'PENDING', DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY), NULL, NULL),
((SELECT id FROM users WHERE username = 'student4' LIMIT 1), 'Furniture Broken', 'Study table leg is broken. Difficult to study.', 'FURNITURE', 'MEDIUM', 'RESOLVED', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), 'New table installed', DATE_SUB(NOW(), INTERVAL 1 DAY)),
((SELECT id FROM users WHERE username = 'student5' LIMIT 1), 'Room Cleaning', 'Room needs thorough cleaning. Not cleaned for 3 days.', 'CLEANING', 'LOW', 'RESOLVED', DATE_SUB(NOW(), INTERVAL 6 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 'Cleaning done', DATE_SUB(NOW(), INTERVAL 2 DAY)),
((SELECT id FROM users WHERE username = 'student1' LIMIT 1), 'Lights Flickering', 'Tube light in room is flickering continuously.', 'ELECTRICAL', 'MEDIUM', 'IN_PROGRESS', DATE_SUB(NOW(), INTERVAL 1 DAY), NOW(), 'Electrician will visit today', NULL),
((SELECT id FROM users WHERE username = 'student6' LIMIT 1), 'Door Lock Issue', 'Room door lock is jammed. Difficult to lock properly.', 'MAINTENANCE', 'MEDIUM', 'PENDING', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), NULL, NULL),
((SELECT id FROM users WHERE username = 'student2' LIMIT 1), 'Window Pane Broken', 'Window glass cracked. Security concern.', 'MAINTENANCE', 'HIGH', 'IN_PROGRESS', DATE_SUB(NOW(), INTERVAL 4 DAY), NOW(), 'Glass ordered. Will be installed tomorrow.', NULL),
((SELECT id FROM users WHERE username = 'student7' LIMIT 1), 'Pest Control Needed', 'Mosquitoes in room. Need pest control spray.', 'CLEANING', 'LOW', 'PENDING', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), NULL, NULL),
((SELECT id FROM users WHERE username = 'student8' LIMIT 1), 'Noisy Fan', 'Ceiling fan making loud noise.', 'ELECTRICAL', 'LOW', 'RESOLVED', DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY), 'Fan serviced', DATE_SUB(NOW(), INTERVAL 3 DAY));

-- ===================================
-- INSERT FEES
-- ===================================
-- October 2025 Fees
INSERT INTO fees (student_id, amount, fee_type, month, year, due_date, payment_status, transaction_id, paid_date, created_at, updated_at) VALUES
((SELECT id FROM users WHERE username = 'student1' LIMIT 1), 5000.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100001', '2025-10-05', DATE_SUB(NOW(), INTERVAL 25 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student2' LIMIT 1), 4000.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100002', '2025-10-06', DATE_SUB(NOW(), INTERVAL 24 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student3' LIMIT 1), 4000.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'OVERDUE', NULL, NULL, DATE_SUB(NOW(), INTERVAL 20 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student4' LIMIT 1), 3500.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100003', '2025-10-07', DATE_SUB(NOW(), INTERVAL 23 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student5' LIMIT 1), 5500.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100004', '2025-10-08', DATE_SUB(NOW(), INTERVAL 22 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student6' LIMIT 1), 3500.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100005', '2025-10-09', DATE_SUB(NOW(), INTERVAL 21 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student7' LIMIT 1), 4200.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'OVERDUE', NULL, NULL, DATE_SUB(NOW(), INTERVAL 20 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student8' LIMIT 1), 3700.00, 'HOSTEL_FEE', 10, 2025, '2025-10-10', 'PAID', 'TXN2025100006', '2025-10-04', DATE_SUB(NOW(), INTERVAL 26 DAY), NOW());

-- November 2025 Fees (Current Month)
INSERT INTO fees (student_id, amount, fee_type, month, year, due_date, payment_status, transaction_id, paid_date, created_at, updated_at) VALUES
((SELECT id FROM users WHERE username = 'student1' LIMIT 1), 5000.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student2' LIMIT 1), 4000.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student3' LIMIT 1), 4000.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student4' LIMIT 1), 3500.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PAID', 'TXN2025110001', '2025-10-28', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student5' LIMIT 1), 5500.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student6' LIMIT 1), 3500.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student7' LIMIT 1), 4200.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW()),
((SELECT id FROM users WHERE username = 'student8' LIMIT 1), 3700.00, 'HOSTEL_FEE', 11, 2025, '2025-11-10', 'PENDING', NULL, NULL, NOW(), NOW());

-- Maintenance Fees
INSERT INTO fees (student_id, amount, fee_type, month, year, due_date, payment_status, transaction_id, paid_date, created_at, updated_at) VALUES
((SELECT id FROM users WHERE username = 'student1' LIMIT 1), 500.00, 'MAINTENANCE_FEE', 10, 2025, '2025-10-15', 'PAID', 'TXN2025100101', '2025-10-10', DATE_SUB(NOW(), INTERVAL 20 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student2' LIMIT 1), 500.00, 'MAINTENANCE_FEE', 10, 2025, '2025-10-15', 'PENDING', NULL, NULL, DATE_SUB(NOW(), INTERVAL 20 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student3' LIMIT 1), 500.00, 'MAINTENANCE_FEE', 10, 2025, '2025-10-15', 'OVERDUE', NULL, NULL, DATE_SUB(NOW(), INTERVAL 20 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student4' LIMIT 1), 500.00, 'MAINTENANCE_FEE', 10, 2025, '2025-10-15', 'PAID', 'TXN2025100102', '2025-10-12', DATE_SUB(NOW(), INTERVAL 18 DAY), NOW()),
((SELECT id FROM users WHERE username = 'student5' LIMIT 1), 500.00, 'MAINTENANCE_FEE', 10, 2025, '2025-10-15', 'PAID', 'TXN2025100103', '2025-10-11', DATE_SUB(NOW(), INTERVAL 19 DAY), NOW());

-- Update room current_occupancy based on students
UPDATE rooms r SET current_occupancy = (SELECT COUNT(*) FROM users u WHERE u.room_id = r.id AND u.role = 'STUDENT' AND u.active = true);

-- ===================================
-- VERIFICATION QUERIES
-- ===================================
-- SELECT 'Total Users:', COUNT(*) FROM users;
-- SELECT 'Total Rooms:', COUNT(*) FROM rooms;
-- SELECT 'Total Complaints:', COUNT(*) FROM complaints;
-- SELECT 'Total Fees:', COUNT(*) FROM fees;
--
-- SELECT 'Students per Room:', room_number, COUNT(u.id) as student_count
-- FROM rooms r
-- LEFT JOIN users u ON r.id = u.room_id
-- GROUP BY r.id;

-- ===================================
-- SUCCESS MESSAGE
-- ===================================
SELECT '✅ Sample data inserted successfully!' AS Status;
SELECT COUNT(*) AS 'Total Users' FROM users;
SELECT COUNT(*) AS 'Total Rooms' FROM rooms;
SELECT COUNT(*) AS 'Total Complaints' FROM complaints;
SELECT COUNT(*) AS 'Total Fees' FROM fees;

