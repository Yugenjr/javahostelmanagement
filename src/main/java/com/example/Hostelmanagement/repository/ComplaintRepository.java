package com.example.Hostelmanagement.repository;

import com.example.Hostelmanagement.entity.Complaint;
import com.example.Hostelmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStatus(Complaint.ComplaintStatus status);

    List<Complaint> findByAssignedWarden(User warden);

    List<Complaint> findByStudent(User student);

    @Query("SELECT c FROM Complaint c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Complaint> searchComplaints(@Param("search") String search);

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.status = :status")
    long countByStatus(@Param("status") Complaint.ComplaintStatus status);
}

