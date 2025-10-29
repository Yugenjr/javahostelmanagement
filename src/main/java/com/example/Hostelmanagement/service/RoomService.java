package com.example.Hostelmanagement.service;

import com.example.Hostelmanagement.entity.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    Room create(Room room);
    Room update(Long id, Room room);
    void delete(Long id);
    Optional<Room> findById(Long id);
    List<Room> findAll();
    List<Room> findAvailableRooms();
    Room allocateToStudent(Long roomId, Long studentId);
    Room deallocateRoom(Long roomId);
    List<Room> findByFloor(Integer floor);
}

