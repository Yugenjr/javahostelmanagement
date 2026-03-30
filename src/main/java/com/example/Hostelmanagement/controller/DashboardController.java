package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.entity.Room;
import com.example.Hostelmanagement.entity.Complaint;
import com.example.Hostelmanagement.entity.Fee;
import com.example.Hostelmanagement.repository.UserRepository;
import com.example.Hostelmanagement.repository.RoomRepository;
import com.example.Hostelmanagement.repository.ComplaintRepository;
import com.example.Hostelmanagement.repository.FeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private FeeRepository feeRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // User stats
        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole(User.Role.STUDENT);
        long totalWardens = userRepository.countByRole(User.Role.WARDEN);

        // Room stats
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.countByStatus(Room.RoomStatus.AVAILABLE);
        long occupiedRooms = roomRepository.countByStatus(Room.RoomStatus.OCCUPIED);

        // Complaint stats
        long totalComplaints = complaintRepository.count();
        long pendingComplaints = complaintRepository.countByStatus(Complaint.ComplaintStatus.PENDING);
        long resolvedComplaints = complaintRepository.countByStatus(Complaint.ComplaintStatus.RESOLVED);

        // Fee stats
        long totalFees = feeRepository.count();
        long paidFees = feeRepository.countByPaymentStatus(Fee.PaymentStatus.PAID);
        long pendingFees = feeRepository.countByPaymentStatus(Fee.PaymentStatus.PENDING);

        // Calculate total fees collected
        BigDecimal totalFeesCollected = feeRepository.findByPaymentStatus(Fee.PaymentStatus.PAID)
                .stream()
                .map(Fee::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        stats.put("totalUsers", totalUsers);
        stats.put("totalStudents", totalStudents);
        stats.put("totalWardens", totalWardens);
        stats.put("totalRooms", totalRooms);
        stats.put("availableRooms", availableRooms);
        stats.put("occupiedRooms", occupiedRooms);
        stats.put("totalComplaints", totalComplaints);
        stats.put("pendingComplaints", pendingComplaints);
        stats.put("resolvedComplaints", resolvedComplaints);
        stats.put("totalFees", totalFees);
        stats.put("paidFees", paidFees);
        stats.put("pendingFees", pendingFees);
        stats.put("totalFeesCollected", totalFeesCollected);

        return ResponseEntity.ok(stats);
    }
}
