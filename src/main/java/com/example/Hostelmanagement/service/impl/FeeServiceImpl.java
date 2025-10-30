package com.example.Hostelmanagement.service.impl;

import com.example.Hostelmanagement.entity.Fee;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.FeeRepository;
import com.example.Hostelmanagement.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FeeServiceImpl implements FeeService {

    @Autowired
    private FeeRepository feeRepository;

    @Override
    public Fee create(Fee fee) {
        return feeRepository.save(fee);
    }

    @Override
    public Fee update(Long id, Fee fee) {
        Optional<Fee> existing = feeRepository.findById(id);
        if (existing.isEmpty()) throw new RuntimeException("Fee record not found");
        Fee f = existing.get();
        f.setAmount(fee.getAmount());
        f.setFeeType(fee.getFeeType());
        f.setMonth(fee.getMonth());
        f.setYear(fee.getYear());
        f.setDueDate(fee.getDueDate());
        f.setDescription(fee.getDescription());
        if (fee.getStudent() != null) {
            f.setStudent(fee.getStudent());
        }
        return feeRepository.save(f);
    }

    @Override
    public Fee recordPayment(Long id, String transactionId) {
        Optional<Fee> existing = feeRepository.findById(id);
        if (existing.isEmpty()) throw new RuntimeException("Fee record not found");
        Fee f = existing.get();
        f.setPaymentStatus(Fee.PaymentStatus.PAID);
        f.setTransactionId(transactionId);
        f.setPaidDate(LocalDate.now());
        return feeRepository.save(f);
    }

    @Override
    public List<Fee> findByStudent(User student) {
        return feeRepository.findByStudent(student);
    }

    @Override
    public List<Fee> findAll() {
        return feeRepository.findAll();
    }

    @Override
    public Optional<Fee> findById(Long id) {
        return feeRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        feeRepository.deleteById(id);
    }
}

