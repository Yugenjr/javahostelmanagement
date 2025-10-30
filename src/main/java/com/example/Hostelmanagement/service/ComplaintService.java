package com.example.Hostelmanagement.service;

import com.example.Hostelmanagement.entity.Complaint;
import com.example.Hostelmanagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface ComplaintService {
    Complaint create(Complaint complaint);
    Complaint update(Long id, Complaint complaint);
    Complaint updateStatus(Long id, Complaint.ComplaintStatus status, String wardenRemarks);
    List<Complaint> findAll();
    List<Complaint> findByStudent(User student);
    Optional<Complaint> findById(Long id);
    void delete(Long id);
}

