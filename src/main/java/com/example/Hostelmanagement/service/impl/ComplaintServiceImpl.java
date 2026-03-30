package com.example.Hostelmanagement.service.impl;

import com.example.Hostelmanagement.entity.Complaint;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.ComplaintRepository;
import com.example.Hostelmanagement.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint create(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint update(Long id, Complaint complaint) {
        Optional<Complaint> existing = complaintRepository.findById(id);
        if (existing.isEmpty()) throw new RuntimeException("Complaint not found");
        Complaint c = existing.get();
        c.setTitle(complaint.getTitle());
        c.setDescription(complaint.getDescription());
        c.setType(complaint.getType());
        c.setPriority(complaint.getPriority());
        if (complaint.getStudent() != null) {
            c.setStudent(complaint.getStudent());
        }
        return complaintRepository.save(c);
    }

    @Override
    public Complaint updateStatus(Long id, Complaint.ComplaintStatus status, String wardenRemarks) {
        Optional<Complaint> existing = complaintRepository.findById(id);
        if (existing.isEmpty()) throw new RuntimeException("Complaint not found");
        Complaint c = existing.get();
        c.setStatus(status);
        c.setWardenRemarks(wardenRemarks);
        if (status == Complaint.ComplaintStatus.RESOLVED) {
            c.setResolvedAt(java.time.LocalDateTime.now());
        }
        return complaintRepository.save(c);
    }

    @Override
    public List<Complaint> findAll() {
        return complaintRepository.findAll();
    }

    @Override
    public List<Complaint> findByStudent(User student) {
        return complaintRepository.findByStudent(student);
    }

    @Override
    public Optional<Complaint> findById(Long id) {
        return complaintRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        complaintRepository.deleteById(id);
    }
}

