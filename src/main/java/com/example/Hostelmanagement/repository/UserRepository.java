package com.example.Hostelmanagement.repository;

import com.example.Hostelmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    long countByRole(User.Role role);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByRole(User.Role role);

    List<User> findByActiveTrue();

    List<User> findByRoleAndActiveTrue(User.Role role);

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.active = true")
    List<User> findActiveUsersByRole(@Param("role") User.Role role);

    // Removed duplicate countByRole declaration

    @Query("SELECT u FROM User u WHERE u.role = 'STUDENT' AND u.room IS NULL")
    List<User> findStudentsWithoutRoom();

    @Query("SELECT u FROM User u WHERE u.role = 'STUDENT' AND u.room IS NOT NULL")
    List<User> findStudentsWithRoom();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.active = true")
    long countActiveUsersByRole(@Param("role") User.Role role);

    @Query("SELECT u FROM User u WHERE " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))" )
    List<User> searchUsers(@Param("search") String search);
}
