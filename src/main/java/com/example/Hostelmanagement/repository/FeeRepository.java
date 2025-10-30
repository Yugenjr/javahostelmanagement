package com.example.Hostelmanagement.repository;

import com.example.Hostelmanagement.entity.Fee;
import com.example.Hostelmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {

    List<Fee> findByStudent(User student);

    List<Fee> findByPaymentStatus(Fee.PaymentStatus status);

    long countByPaymentStatus(Fee.PaymentStatus status);

    @Query("SELECT f FROM Fee f WHERE f.year = :year AND f.month = :month")
    List<Fee> findByMonthAndYear(@Param("month") Integer month, @Param("year") Integer year);

    @Query("SELECT SUM(f.amount) FROM Fee f WHERE f.paymentStatus = 'PAID'")
    Double sumCollectedFees();

    // Removed duplicate countByPaymentStatus declaration
}

