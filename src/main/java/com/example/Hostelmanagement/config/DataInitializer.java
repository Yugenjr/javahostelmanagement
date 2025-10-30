package com.example.Hostelmanagement.config;

import com.example.Hostelmanagement.entity.*;
import com.example.Hostelmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Autowired(required = false)
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() > 3) {
            System.out.println("Database already has users. Skipping sample data initialization.");
            System.out.println("Existing users: " + userRepository.count());
            return;
        }

        System.out.println("Initializing database with sample data...");

        // Create Students
        User student1 = createStudent("student1", "student123", "Alice", "Johnson", "alice@student.com", "9876543210");
        User student2 = createStudent("student2", "student123", "Bob", "Smith", "bob@student.com", "9876543211");
        User student3 = createStudent("student3", "student123", "Carol", "Williams", "carol@student.com", "9876543212");
        User student4 = createStudent("student4", "student123", "David", "Brown", "david@student.com", "9876543213");
        User student5 = createStudent("student5", "student123", "Emma", "Davis", "emma@student.com", "9876543214");

        List<User> students = Arrays.asList(student1, student2, student3, student4, student5);
        userRepository.saveAll(students);
        System.out.println("Created 5 students");

        // Create Warden
        User warden = createWarden("warden1", "warden123", "John", "Warden", "warden@hostel.com", "9876543220");
        userRepository.save(warden);
        System.out.println("Created warden");

        // Create Admin
        User admin = createAdmin("admin", "admin123", "Admin", "User", "admin@hostel.com", "9876543230");
        userRepository.save(admin);
        System.out.println("Created admin");

        // Create Rooms
        List<Room> rooms = Arrays.asList(
            createRoom("A101", Room.RoomType.SINGLE, 1, 1, 5000.0, Room.RoomStatus.OCCUPIED),
            createRoom("A102", Room.RoomType.DOUBLE, 2, 1, 4000.0, Room.RoomStatus.OCCUPIED),
            createRoom("A103", Room.RoomType.TRIPLE, 3, 1, 3500.0, Room.RoomStatus.OCCUPIED),
            createRoom("A104", Room.RoomType.DOUBLE, 2, 1, 4000.0, Room.RoomStatus.AVAILABLE),
            createRoom("B101", Room.RoomType.SINGLE, 1, 2, 5500.0, Room.RoomStatus.OCCUPIED),
            createRoom("B102", Room.RoomType.DOUBLE, 2, 2, 4200.0, Room.RoomStatus.AVAILABLE),
            createRoom("B103", Room.RoomType.TRIPLE, 3, 2, 3700.0, Room.RoomStatus.AVAILABLE),
            createRoom("C101", Room.RoomType.SINGLE, 1, 3, 5200.0, Room.RoomStatus.MAINTENANCE)
        );
        roomRepository.saveAll(rooms);
        System.out.println("Created 8 rooms");

        // Assign rooms to students
        student1.setRoom(rooms.get(0));
        student2.setRoom(rooms.get(1));
        student3.setRoom(rooms.get(1));
        student4.setRoom(rooms.get(2));
        student5.setRoom(rooms.get(4));
        userRepository.saveAll(students);
        System.out.println("Assigned rooms to students");

        // Create Complaints
        List<Complaint> complaints = Arrays.asList(
            createComplaint(student1, "WiFi Not Working", "Internet connection is very slow in my room",
                Complaint.ComplaintType.INTERNET, Complaint.Priority.HIGH, Complaint.ComplaintStatus.IN_PROGRESS),
            createComplaint(student2, "AC Not Cooling", "Air conditioner is not working properly",
                Complaint.ComplaintType.ELECTRICAL, Complaint.Priority.MEDIUM, Complaint.ComplaintStatus.PENDING),
            createComplaint(student3, "Water Leakage", "Water is leaking from bathroom ceiling",
                Complaint.ComplaintType.PLUMBING, Complaint.Priority.HIGH, Complaint.ComplaintStatus.PENDING),
            createComplaint(student4, "Furniture Broken", "Study table is broken",
                Complaint.ComplaintType.FURNITURE, Complaint.Priority.LOW, Complaint.ComplaintStatus.RESOLVED),
            createComplaint(student5, "Room Cleaning", "Room needs thorough cleaning",
                Complaint.ComplaintType.CLEANING, Complaint.Priority.MEDIUM, Complaint.ComplaintStatus.RESOLVED),
            createComplaint(student1, "Lights Not Working", "Tube light is flickering",
                Complaint.ComplaintType.ELECTRICAL, Complaint.Priority.MEDIUM, Complaint.ComplaintStatus.IN_PROGRESS)
        );
        complaintRepository.saveAll(complaints);
        System.out.println("Created 6 complaints");

        // Create Fee Records
        List<Fee> fees = Arrays.asList(
            createFee(student1, 5000.0, "HOSTEL_FEE", 10, 2025, Fee.PaymentStatus.PAID, "TXN123456"),
            createFee(student1, 5000.0, "HOSTEL_FEE", 11, 2025, Fee.PaymentStatus.PENDING, null),
            createFee(student2, 4000.0, "HOSTEL_FEE", 10, 2025, Fee.PaymentStatus.PAID, "TXN123457"),
            createFee(student2, 4000.0, "HOSTEL_FEE", 11, 2025, Fee.PaymentStatus.PENDING, null),
            createFee(student3, 4000.0, "HOSTEL_FEE", 10, 2025, Fee.PaymentStatus.OVERDUE, null),
            createFee(student3, 4000.0, "HOSTEL_FEE", 11, 2025, Fee.PaymentStatus.PENDING, null),
            createFee(student4, 3500.0, "HOSTEL_FEE", 10, 2025, Fee.PaymentStatus.PAID, "TXN123458"),
            createFee(student4, 3500.0, "HOSTEL_FEE", 11, 2025, Fee.PaymentStatus.PENDING, null),
            createFee(student5, 5500.0, "HOSTEL_FEE", 10, 2025, Fee.PaymentStatus.PAID, "TXN123459"),
            createFee(student5, 5500.0, "HOSTEL_FEE", 11, 2025, Fee.PaymentStatus.PENDING, null),
            createFee(student1, 500.0, "MAINTENANCE_FEE", 10, 2025, Fee.PaymentStatus.PAID, "TXN123460"),
            createFee(student2, 500.0, "MAINTENANCE_FEE", 10, 2025, Fee.PaymentStatus.PENDING, null)
        );
        feeRepository.saveAll(fees);
        System.out.println("Created 12 fee records");

        System.out.println("Database initialization complete!");
        System.out.println("Sample users:");
        System.out.println("  Admin: admin / admin123");
        System.out.println("  Warden: warden1 / warden123");
        System.out.println("  Students: student1-student5 / student123");
    }

    private User createStudent(String username, String password, String firstName, String lastName, String email, String phone) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder != null ? passwordEncoder.encode(password) : password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setRole(User.Role.STUDENT);
        user.setActive(true);
        user.setAddress("123 Student St, City");
        user.setEmergencyContact("Emergency: " + phone);
        return user;
    }

    private User createWarden(String username, String password, String firstName, String lastName, String email, String phone) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder != null ? passwordEncoder.encode(password) : password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setRole(User.Role.WARDEN);
        user.setActive(true);
        user.setAddress("456 Warden Ave, City");
        user.setEmergencyContact("Emergency: " + phone);
        return user;
    }

    private User createAdmin(String username, String password, String firstName, String lastName, String email, String phone) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder != null ? passwordEncoder.encode(password) : password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setRole(User.Role.ADMIN);
        user.setActive(true);
        user.setAddress("789 Admin Rd, City");
        user.setEmergencyContact("Emergency: " + phone);
        return user;
    }

    private Room createRoom(String roomNumber, Room.RoomType type, int capacity, int floor, double rent, Room.RoomStatus status) {
        Room room = new Room();
        room.setRoomNumber(roomNumber);
        room.setRoomType(type);
        room.setCapacity(capacity);
        room.setFloor(floor);
        room.setMonthlyRent(BigDecimal.valueOf(rent));
        room.setStatus(status);
        room.setDescription("Well-furnished " + type.name().toLowerCase() + " room");
        room.setAmenities("AC, WiFi, Study Table, Wardrobe, Attached Bathroom");
        return room;
    }

    private Complaint createComplaint(User student, String title, String description,
                                     Complaint.ComplaintType type, Complaint.Priority priority,
                                     Complaint.ComplaintStatus status) {
        Complaint complaint = new Complaint();
        complaint.setStudent(student);
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setType(type);
        complaint.setPriority(priority);
        complaint.setStatus(status);
        complaint.setCreatedAt(LocalDateTime.now().minusDays((long)(Math.random() * 10)));

        if (status == Complaint.ComplaintStatus.RESOLVED) {
            complaint.setWardenRemarks("Issue has been resolved successfully");
            complaint.setResolvedAt(LocalDateTime.now().minusDays((long)(Math.random() * 5)));
            complaint.setUpdatedAt(LocalDateTime.now().minusDays((long)(Math.random() * 5)));
        } else if (status == Complaint.ComplaintStatus.IN_PROGRESS) {
            complaint.setWardenRemarks("Working on it");
            complaint.setUpdatedAt(LocalDateTime.now().minusDays((long)(Math.random() * 3)));
        }

        return complaint;
    }

    private Fee createFee(User student, double amount, String feeType, int month, int year,
                         Fee.PaymentStatus status, String transactionId) {
        Fee fee = new Fee();
        fee.setStudent(student);
        fee.setAmount(BigDecimal.valueOf(amount));

        // Convert string to FeeType enum
        Fee.FeeType type = Fee.FeeType.HOSTEL_FEE;
        if ("MAINTENANCE_FEE".equals(feeType)) {
            type = Fee.FeeType.MAINTENANCE_FEE;
        } else if ("MESS_FEE".equals(feeType)) {
            type = Fee.FeeType.MESS_FEE;
        }
        fee.setFeeType(type);

        fee.setMonth(month);
        fee.setYear(year);
        fee.setDueDate(LocalDate.of(year, month, 10));
        fee.setPaymentStatus(status);
        fee.setTransactionId(transactionId);

        if (status == Fee.PaymentStatus.PAID) {
            fee.setPaidDate(LocalDate.of(year, month, 5));
        }

        return fee;
    }
}

