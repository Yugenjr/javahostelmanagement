package com.example.Hostelmanagement.service.impl;

import com.example.Hostelmanagement.entity.Room;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.RoomRepository;
import com.example.Hostelmanagement.repository.UserRepository;
import com.example.Hostelmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Room create(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room update(Long id, Room room) {
        Optional<Room> existing = roomRepository.findById(id);
        if (existing.isEmpty()) throw new RuntimeException("Room not found");
        Room r = existing.get();
        r.setRoomNumber(room.getRoomNumber());
        r.setRoomType(room.getRoomType());
        r.setCapacity(room.getCapacity());
        r.setFloor(room.getFloor());
        r.setMonthlyRent(room.getMonthlyRent());
        r.setStatus(room.getStatus());
        r.setDescription(room.getDescription());
        r.setAmenities(room.getAmenities());
        return roomRepository.save(r);
    }

    @Override
    public void delete(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public Optional<Room> findById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public List<Room> findAvailableRooms() {
        return roomRepository.findAvailableRooms();
    }

    @Override
    public Room allocateToStudent(Long roomId, Long studentId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!room.isAvailable()) {
            throw new RuntimeException("Room is not available for allocation");
        }

        if (student.getRole() != User.Role.STUDENT) {
            throw new RuntimeException("User is not a student");
        }

        room.setStudent(student);
        room.setStatus(Room.RoomStatus.OCCUPIED);

        return roomRepository.save(room);
    }

    @Override
    public Room deallocateRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setStudent(null);
        room.setStatus(Room.RoomStatus.AVAILABLE);

        return roomRepository.save(room);
    }

    @Override
    public List<Room> findByFloor(Integer floor) {
        return roomRepository.findByFloor(floor);
    }
}

