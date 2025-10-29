package com.example.Hostelmanagement.config;

import com.example.Hostelmanagement.entity.*;
import com.example.Hostelmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.math.BigDecimal;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 Initializing Database with Mock Data...");

        createUsers();
        createRooms();
        createComplaints();
        createFees();

        System.out.println("✅ Database initialization completed!");
        System.out.println("📋 Demo Credentials:");
        System.out.println("   Admin: admin / admin123");
        System.out.println("   Warden: warden1 / warden123");
        System.out.println("   Students: student1, student2, student3 / student123");
    }

    private void createUsers() {
        // Create admin user
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("Administrator")
                    .email("admin@hostel.com")
                    .phoneNumber("9876543210")
                    .role(User.Role.ADMIN)
                    .address("Admin Office")
                    .emergencyContact("9876543211")
                    .active(true)
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Admin user created");
        }

        // Create warden user
        if (userRepository.findByUsername("warden1").isEmpty()) {
            User warden = User.builder()
                    .username("warden1")
                    .password(passwordEncoder.encode("warden123"))
                    .firstName("Jane")
                    .lastName("Smith")
                    .email("warden@hostel.com")
                    .phoneNumber("9876543220")
                    .role(User.Role.WARDEN)
                    .address("Warden Quarters")
                    .emergencyContact("9876543221")
                    .active(true)
                    .build();
            userRepository.save(warden);
            System.out.println("✅ Warden user created");
        }

        // Create sample students
        String[] studentData = {
            "student1,John,Doe,john.doe@student.com,9876543212",
            "student2,Alice,Johnson,alice.johnson@student.com,9876543213",
            "student3,Bob,Wilson,bob.wilson@student.com,9876543214"
        };

        for (String data : studentData) {
            String[] parts = data.split(",");
            if (userRepository.findByUsername(parts[0]).isEmpty()) {
                User student = new User();
                student.setUsername(parts[0]);
                student.setPassword(passwordEncoder.encode("student123"));
                student.setFirstName(parts[1]);
                student.setLastName(parts[2]);
                student.setEmail(parts[3]);
                student.setPhoneNumber(parts[4]);
                student.setRole(User.Role.STUDENT);
                student.setAddress("Student Address " + parts[0]);
                student.setEmergencyContact("9876543299");
                userRepository.save(student);
            }
        }
        System.out.println("✅ Student users created");
    }

    private void createRooms() {
        if (roomRepository.count() == 0) {
            // Create rooms for different floors and types
            for (int floor = 1; floor <= 3; floor++) {
                for (int roomNum = 1; roomNum <= 10; roomNum++) {
                    Room room = new Room();
                    room.setRoomNumber(floor + String.format("%02d", roomNum));
                    room.setFloor(floor);
                    room.setRoomType(roomNum <= 5 ? Room.RoomType.SINGLE : Room.RoomType.DOUBLE);
                    room.setCapacity(roomNum <= 5 ? 1 : 2);
                    room.setStatus(Room.RoomStatus.AVAILABLE);
                    room.setMonthlyRent(roomNum <= 5 ? new BigDecimal("5000") : new BigDecimal("7000"));
                    room.setDescription("Room " + room.getRoomNumber() + " on floor " + floor);
                    roomRepository.save(room);
                }
            }

            // Allocate some rooms to students
            User student1 = userRepository.findByUsername("student1").orElse(null);
            User student2 = userRepository.findByUsername("student2").orElse(null);

            if (student1 != null) {
                Room room101 = roomRepository.findByRoomNumber("101").orElse(null);
                if (room101 != null) {
                    room101.setStatus(Room.RoomStatus.OCCUPIED);
                    room101.setStudent(student1);
                    roomRepository.save(room101);
                }
            }

            if (student2 != null) {
                Room room201 = roomRepository.findByRoomNumber("201").orElse(null);
                if (room201 != null) {
                    room201.setStatus(Room.RoomStatus.OCCUPIED);
                    room201.setStudent(student2);
                    roomRepository.save(room201);
                }
            }

            System.out.println("✅ Sample rooms created (30 rooms across 3 floors)");
        }
    }

    private void createComplaints() {
        if (complaintRepository.count() == 0) {
            User student1 = userRepository.findByUsername("student1").orElse(null);
            User student2 = userRepository.findByUsername("student2").orElse(null);

            if (student1 != null) {
                Complaint complaint1 = new Complaint();
                complaint1.setTitle("Air Conditioning Not Working");
                complaint1.setDescription("The AC in room 101 has been making strange noises and not cooling properly for the past 2 days.");
                complaint1.setType(Complaint.ComplaintType.ELECTRICAL);
                complaint1.setPriority(Complaint.Priority.HIGH);
                complaint1.setStatus(Complaint.ComplaintStatus.PENDING);
                complaint1.setStudent(student1);
                complaintRepository.save(complaint1);

                Complaint complaint2 = new Complaint();
                complaint2.setTitle("WiFi Connection Issues");
                complaint2.setDescription("Internet connection is very slow in room 101, making it difficult to attend online classes.");
                complaint2.setType(Complaint.ComplaintType.INTERNET);
                complaint2.setPriority(Complaint.Priority.MEDIUM);
                complaint2.setStatus(Complaint.ComplaintStatus.IN_PROGRESS);
                complaint2.setStudent(student1);
                complaintRepository.save(complaint2);
            }

            if (student2 != null) {
                Complaint complaint3 = new Complaint();
                complaint3.setTitle("Water Leakage");
                complaint3.setDescription("There is water leakage from the bathroom ceiling in room 201.");
                complaint3.setType(Complaint.ComplaintType.PLUMBING);
                complaint3.setPriority(Complaint.Priority.HIGH);
                complaint3.setStatus(Complaint.ComplaintStatus.RESOLVED);
                complaint3.setStudent(student2);
                complaint3.setResolvedAt(LocalDateTime.now().minusDays(1));
                complaint3.setWardenRemarks("Plumber fixed the pipe and ceiling has been repaired.");
                complaintRepository.save(complaint3);
            }

            System.out.println("✅ Sample complaints created");
        }
    }

    private void createFees() {
        if (feeRepository.count() == 0) {
            User student1 = userRepository.findByUsername("student1").orElse(null);
            User student2 = userRepository.findByUsername("student2").orElse(null);

            if (student1 != null) {
                // Paid fee
                Fee fee1 = new Fee();
                fee1.setStudent(student1);
                fee1.setFeeType(Fee.FeeType.HOSTEL_FEE);
                fee1.setAmount(new BigDecimal("5000.00"));
                fee1.setDueDate(LocalDate.now().minusDays(30));
                fee1.setPaidDate(LocalDate.now().minusDays(25));
                fee1.setPaymentStatus(Fee.PaymentStatus.PAID);
                fee1.setPaymentMethod(Fee.PaymentMethod.ONLINE);
                fee1.setTransactionId("TXN123456789");
                fee1.setMonth(LocalDate.now().minusMonths(1).getMonthValue());
                fee1.setYear(LocalDate.now().getYear());
                fee1.setRemarks("Monthly hostel fee for October");
                feeRepository.save(fee1);

                // Pending fee
                Fee fee2 = new Fee();
                fee2.setStudent(student1);
                fee2.setFeeType(Fee.FeeType.HOSTEL_FEE);
                fee2.setAmount(new BigDecimal("5000.00"));
                fee2.setDueDate(LocalDate.now().plusDays(15));
                fee2.setPaymentStatus(Fee.PaymentStatus.PENDING);
                fee2.setMonth(LocalDate.now().getMonthValue());
                fee2.setYear(LocalDate.now().getYear());
                fee2.setRemarks("Monthly hostel fee for November");
                feeRepository.save(fee2);
            }

            if (student2 != null) {
                // Overdue fee
                Fee fee3 = new Fee();
                fee3.setStudent(student2);
                fee3.setFeeType(Fee.FeeType.SECURITY_DEPOSIT);
                fee3.setAmount(new BigDecimal("10000.00"));
                fee3.setDueDate(LocalDate.now().minusDays(10));
                fee3.setPaymentStatus(Fee.PaymentStatus.OVERDUE);
                fee3.setMonth(LocalDate.now().getMonthValue());
                fee3.setYear(LocalDate.now().getYear());
                fee3.setRemarks("Security deposit for room allocation");
                feeRepository.save(fee3);
            }

            System.out.println("✅ Sample fees created");
        }
    }
}
