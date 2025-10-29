package com.example.Hostelmanagement.repository;

import com.example.Hostelmanagement.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByRoomNumber(String roomNumber);

    boolean existsByRoomNumber(String roomNumber);

    List<Room> findByStatus(Room.RoomStatus status);

    List<Room> findByRoomType(Room.RoomType roomType);

    List<Room> findByFloor(Integer floor);

    @Query("SELECT r FROM Room r WHERE r.status = 'AVAILABLE'")
    List<Room> findAvailableRooms();

    @Query("SELECT r FROM Room r WHERE r.status = 'OCCUPIED'")
    List<Room> findOccupiedRooms();


    @Query("SELECT r FROM Room r WHERE r.monthlyRent BETWEEN :minRent AND :maxRent")
    List<Room> findByRentRange(@Param("minRent") BigDecimal minRent, @Param("maxRent") BigDecimal maxRent);

    @Query("SELECT COUNT(r) FROM Room r WHERE r.status = :status")
    long countByStatus(@Param("status") Room.RoomStatus status);

    @Query("SELECT COUNT(r) FROM Room r WHERE r.status = 'AVAILABLE'")
    long countAvailableRooms();

    @Query("SELECT COUNT(r) FROM Room r WHERE r.status = 'OCCUPIED'")
    long countOccupiedRooms();

    @Query("SELECT r FROM Room r WHERE r.floor = :floor AND r.status = 'AVAILABLE'")
    List<Room> findAvailableRoomsByFloor(@Param("floor") Integer floor);

    @Query("SELECT r FROM Room r WHERE r.roomType = :roomType AND r.status = 'AVAILABLE'")
    List<Room> findAvailableRoomsByType(@Param("roomType") Room.RoomType roomType);

    @Query("SELECT r FROM Room r WHERE " +
           "(LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')))" )
    List<Room> searchRooms(@Param("search") String search);
}
