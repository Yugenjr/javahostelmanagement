package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.RoomDto;
import com.example.Hostelmanagement.entity.Room;
import com.example.Hostelmanagement.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAll() {
        List<RoomDto> rooms = roomService.findAll().stream()
                .map(RoomDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomDto>> getAvailable() {
        List<RoomDto> rooms = roomService.findAvailableRooms().stream()
                .map(RoomDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getById(@PathVariable Long id) {
        return roomService.findById(id)
                .map(room -> ResponseEntity.ok(RoomDto.fromEntity(room)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<RoomDto> create(@Valid @RequestBody Room room) {
        Room createdRoom = roomService.create(room);
        return ResponseEntity.ok(RoomDto.fromEntity(createdRoom));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<RoomDto> update(@PathVariable Long id, @Valid @RequestBody Room room) {
        Room updatedRoom = roomService.update(id, room);
        return ResponseEntity.ok(RoomDto.fromEntity(updatedRoom));
    }

    @PostMapping("/{id}/allocate")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<RoomDto> allocateRoom(@PathVariable Long id, @RequestBody AllocationRequest request) {
        Room room = roomService.allocateToStudent(id, request.getStudentId());
        return ResponseEntity.ok(RoomDto.fromEntity(room));
    }

    @PostMapping("/{id}/deallocate")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<RoomDto> deallocateRoom(@PathVariable Long id) {
        Room room = roomService.deallocateRoom(id);
        return ResponseEntity.ok(RoomDto.fromEntity(room));
    }

    @GetMapping("/floor/{floor}")
    public ResponseEntity<List<RoomDto>> getRoomsByFloor(@PathVariable Integer floor) {
        List<RoomDto> rooms = roomService.findByFloor(floor).stream()
                .map(RoomDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.ok().build();
    }

    public static class AllocationRequest {
        private Long studentId;

        public Long getStudentId() {
            return studentId;
        }

        public void setStudentId(Long studentId) {
            this.studentId = studentId;
        }
    }
}

