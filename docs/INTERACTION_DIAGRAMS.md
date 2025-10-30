# INTERACTION DIAGRAMS
## Hostel Management System

## 1. SEQUENCE DIAGRAMS

### **1.1 Student Login Sequence Diagram**

```
Student    Frontend    AuthController    AuthService    UserRepository    Database
   │           │             │              │               │             │
   │  Enter    │             │              │               │             │
   │Credentials│             │              │               │             │
   │──────────►│             │              │               │             │
   │           │             │              │               │             │
   │           │  Validate   │              │               │             │
   │           │   Form      │              │               │             │
   │           │             │              │               │             │
   │           │ POST /login │              │               │             │
   │           │────────────►│              │               │             │
   │           │             │ authenticate │               │             │
   │           │             │─────────────►│               │             │
   │           │             │              │ findByUsername│             │
   │           │             │              │──────────────►│             │
   │           │             │              │               │ SELECT *    │
   │           │             │              │               │ FROM users  │
   │           │             │              │               │ WHERE       │
   │           │             │              │               │ username=?  │
   │           │             │              │               │────────────►│
   │           │             │              │               │ User Data   │
   │           │             │              │               │◄────────────│
   │           │             │              │ User Object   │             │
   │           │             │              │◄──────────────│             │
   │           │             │              │               │             │
   │           │             │ validatePassword              │             │
   │           │             │ (BCrypt)     │               │             │
   │           │             │              │               │             │
   │           │             │ generateJWT  │               │             │
   │           │             │ Token        │               │             │
   │           │             │              │               │             │
   │           │             │ AuthResponse │               │             │
   │           │             │◄─────────────│               │             │
   │           │ 200 OK      │              │               │             │
   │           │ JWT Token   │              │               │             │
   │           │ User Info   │              │               │             │
   │           │◄────────────│              │               │             │
   │  Success  │             │              │               │             │
   │ Response  │             │              │               │             │
   │◄──────────│             │              │               │             │
   │           │             │              │               │             │
   │  Store    │             │              │               │             │
   │  Token    │             │              │               │             │
   │           │             │              │               │             │
   │ Redirect  │             │              │               │             │
   │    to     │             │              │               │             │
   │Dashboard  │             │              │               │             │
```

### **1.2 Room Allocation Sequence Diagram**

```
Admin      Frontend    RoomController    RoomService    UserRepository    RoomRepository    Database
  │           │             │              │               │                 │             │
  │ Select    │             │              │               │                 │             │
  │ Room &    │             │              │               │                 │             │
  │ Student   │             │              │               │                 │             │
  │──────────►│             │              │               │                 │             │
  │           │             │              │               │                 │             │
  │           │ POST /rooms/│              │               │                 │             │
  │           │ {id}/       │              │               │                 │             │
  │           │ allocate    │              │               │                 │             │
  │           │────────────►│              │               │                 │             │
  │           │             │ allocateRoom │               │                 │             │
  │           │             │─────────────►│               │                 │             │
  │           │             │              │ findById     │                 │             │
  │           │             │              │ (studentId)  │                 │             │
  │           │             │              │──────────────►│                 │             │
  │           │             │              │               │ SELECT * FROM   │             │
  │           │             │              │               │ users WHERE     │             │
  │           │             │              │               │ id=? AND        │             │
  │           │             │              │               │ role='STUDENT'  │             │
  │           │             │              │               │─────────────────────────────►│
  │           │             │              │               │ Student Data    │             │
  │           │             │              │               │◄─────────────────────────────│
  │           │             │              │ Student      │                 │             │
  │           │             │              │◄──────────────│                 │             │
  │           │             │              │               │ findById        │             │
  │           │             │              │               │ (roomId)        │             │
  │           │             │              │               │────────────────►│             │
  │           │             │              │               │                 │ SELECT *    │
  │           │             │              │               │                 │ FROM rooms  │
  │           │             │              │               │                 │ WHERE id=?  │
  │           │             │              │               │                 │────────────►│
  │           │             │              │               │                 │ Room Data   │
  │           │             │              │               │                 │◄────────────│
  │           │             │              │               │ Room Object     │             │
  │           │             │              │               │◄────────────────│             │
  │           │             │              │               │                 │             │
  │           │             │ validateAllocation           │                 │             │
  │           │             │ - Room Available?            │                 │             │
  │           │             │ - Student Eligible?          │                 │             │
  │           │             │ - No Existing Room?          │                 │             │
  │           │             │              │               │                 │             │
  │           │             │              │               │ save(room)      │             │
  │           │             │              │               │────────────────►│             │
  │           │             │              │               │                 │ UPDATE      │
  │           │             │              │               │                 │ rooms SET   │
  │           │             │              │               │                 │ student_id=?│
  │           │             │              │               │                 │ status=     │
  │           │             │              │               │                 │ 'OCCUPIED'  │
  │           │             │              │               │                 │ WHERE id=?  │
  │           │             │              │               │                 │────────────►│
  │           │             │              │               │                 │ Success     │
  │           │             │              │               │                 │◄────────────│
  │           │             │              │               │ Updated Room    │             │
  │           │             │              │               │◄────────────────│             │
  │           │             │              │               │                 │             │
  │           │             │ Success      │               │                 │             │
  │           │             │ Message      │               │                 │             │
  │           │             │◄─────────────│               │                 │             │
  │           │ 200 OK      │              │               │                 │             │
  │           │ "Room       │              │               │                 │             │
  │           │ Allocated   │              │               │                 │             │
  │           │ Successfully│              │               │                 │             │
  │           │◄────────────│              │               │                 │             │
  │ Success   │             │              │               │                 │             │
  │ Message   │             │              │               │                 │             │
  │◄──────────│             │              │               │                 │             │
  │           │             │              │               │                 │             │
  │ Refresh   │             │              │               │                 │             │
  │ Room List │             │              │               │                 │             │
```

### **1.3 Complaint Submission Sequence Diagram**

```
Student    Frontend   ComplaintController   ComplaintService   ComplaintRepository   Database
   │           │              │                 │                    │              │
   │  Fill     │              │                 │                    │              │
   │Complaint  │              │                 │                    │              │
   │  Form     │              │                 │                    │              │
   │──────────►│              │                 │                    │              │
   │           │              │                 │                    │              │
   │           │ Validate     │                 │                    │              │
   │           │ Form Data    │                 │                    │              │
   │           │              │                 │                    │              │
   │           │ POST         │                 │                    │              │
   │           │ /complaints  │                 │                    │              │
   │           │─────────────►│                 │                    │              │
   │           │              │ createComplaint │                    │              │
   │           │              │────────────────►│                    │              │
   │           │              │                 │ getCurrentUser()   │              │
   │           │              │                 │ (from JWT)         │              │
   │           │              │                 │                    │              │
   │           │              │                 │ validateComplaint  │              │
   │           │              │                 │ - Title not empty  │              │
   │           │              │                 │ - Description len  │              │
   │           │              │                 │ - Valid type       │              │
   │           │              │                 │                    │              │
   │           │              │                 │ setDefaultValues   │              │
   │           │              │                 │ - status=PENDING   │              │
   │           │              │                 │ - submittedAt=now  │              │
   │           │              │                 │ - student=current  │              │
   │           │              │                 │                    │              │
   │           │              │                 │ save(complaint)    │              │
   │           │              │                 │───────────────────►│              │
   │           │              │                 │                    │ INSERT INTO │
   │           │              │                 │                    │ complaints  │
   │           │              │                 │                    │ (title,     │
   │           │              │                 │                    │ description,│
   │           │              │                 │                    │ type,       │
   │           │              │                 │                    │ priority,   │
   │           │              │                 │                    │ status,     │
   │           │              │                 │                    │ student_id, │
   │           │              │                 │                    │ submitted_at│
   │           │              │                 │                    │ ) VALUES... │
   │           │              │                 │                    │─────────────│
   │           │              │                 │                    │ Generated   │
   │           │              │                 │                    │ ID          │
   │           │              │                 │                    │◄────────────│
   │           │              │                 │ Saved Complaint    │              │
   │           │              │                 │◄───────────────────│              │
   │           │              │                 │                    │              │
   │           │              │                 │ sendNotification   │              │
   │           │              │                 │ (to Wardens)       │              │
   │           │              │                 │                    │              │
   │           │              │ Created         │                    │              │
   │           │              │ Complaint       │                    │              │
   │           │              │◄────────────────│                    │              │
   │           │ 201 CREATED  │                 │                    │              │
   │           │ Complaint    │                 │                    │              │
   │           │ Object       │                 │                    │              │
   │           │◄─────────────│                 │                    │              │
   │ Success   │              │                 │                    │              │
   │ Message   │              │                 │                    │              │
   │ "Complaint│              │                 │                    │              │
   │ Submitted"│              │                 │                    │              │
   │◄──────────│              │                 │                    │              │
   │           │              │                 │                    │              │
   │ Update    │              │                 │                    │              │
   │ Complaint │              │                 │                    │              │
   │ List      │              │                 │                    │              │
```

## 2. ACTIVITY DIAGRAMS

### **2.1 Student Registration Activity Diagram**

```
                    STUDENT REGISTRATION PROCESS

    START
      │
      ▼
   ┌─────────┐
   │ Access  │
   │Register │
   │  Page   │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │  Fill   │
   │Personal │
   │ Details │
   └────┬────┘
        │
        ▼
   ┌─────────┐       NO   ┌─────────┐
   │Validate │◄──────────┤ Valid   │
   │  Form   │           │ Data?   │
   └────┬────┘           └─────────┘
        │ YES                 │
        ▼                     │
   ┌─────────┐                │
   │ Check   │                │
   │Username │                │
   │Available│                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐       NO       │
   │Username │◄───────────────┤
   │Available│                │
   └────┬────┘                │
        │ YES                 │
        ▼                     │
   ┌─────────┐                │
   │ Check   │                │
   │ Email   │                │
   │Available│                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐       NO       │
   │ Email   │◄───────────────┤
   │Available│                │
   └────┬────┘                │
        │ YES                 │
        ▼                     │
   ┌─────────┐                │
   │ Encrypt │                │
   │Password │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Save to │                │
   │Database │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Send    │                │
   │Welcome  │                │
   │ Email   │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Show    │◄───────────────┘
   │Success  │
   │Message  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │Redirect │
   │ to      │
   │ Login   │
   └────┬────┘
        │
        ▼
      END
```

### **2.2 Complaint Resolution Activity Diagram**

```
                    COMPLAINT RESOLUTION PROCESS

    START
      │
      ▼
   ┌─────────┐
   │ Student │
   │ Submits │
   │Complaint│
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ System  │
   │ Assigns │
   │ ID &    │
   │ Status  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Notify  │
   │ Warden  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Warden  │
   │ Reviews │
   │Complaint│
   └────┬────┘
        │
        ▼
   ┌─────────┐     HIGH     ┌─────────┐
   │ Check   │────────────► │ Assign  │
   │Priority │              │ to      │
   └────┬────┘              │Maintenance│
        │                   │ Team    │
        │ MEDIUM/LOW         └────┬────┘
        ▼                        │
   ┌─────────┐                  │
   │ Add to  │                  │
   │ Warden  │                  │
   │ Queue   │                  │
   └────┬────┘                  │
        │                       │
        ▼                       │
   ┌─────────┐                  │
   │ Update  │◄─────────────────┘
   │ Status  │
   │ to      │
   │IN_PROGRESS
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Work    │
   │ on      │
   │ Issue   │
   └────┬────┘
        │
        ▼
   ┌─────────┐       NO   ┌─────────┐
   │ Issue   │◄──────────┤ Fixed?  │
   │Resolved?│           │         │
   └────┬────┘           └─────────┘
        │ YES                 │
        ▼                     │
   ┌─────────┐             ┌─▼───────┐
   │ Add     │             │ Add     │
   │ Warden  │             │ More    │
   │ Remarks │             │ Work    │
   └────┬────┘             └─────────┘
        │                       │
        ▼                       │
   ┌─────────┐                  │
   │ Update  │                  │
   │ Status  │                  │
   │ to      │                  │
   │RESOLVED │                  │
   └────┬────┘                  │
        │                       │
        ▼                       │
   ┌─────────┐                  │
   │ Notify  │                  │
   │ Student │                  │
   └────┬────┘                  │
        │                       │
        ▼                       │
   ┌─────────┐       NO         │
   │Student  │◄─────────────────┘
   │Satisfied│
   └────┬────┘
        │ YES
        ▼
   ┌─────────┐
   │ Close   │
   │Complaint│
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Update  │
   │Archives │
   └────┬────┘
        │
        ▼
      END
```

### **2.3 Fee Payment Activity Diagram**

```
                      FEE PAYMENT PROCESS

    START
      │
      ▼
   ┌─────────┐
   │ System  │
   │Generate │
   │Monthly  │
   │ Fees    │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │Calculate│
   │ Amount  │
   │ Based   │
   │on Room  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Set Due │
   │ Date    │
   │(End of  │
   │ Month)  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Notify  │
   │ Student │
   │   via   │
   │ Email   │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Student │
   │ Views   │
   │ Fee     │
   │ Status  │
   └────┬────┘
        │
        ▼                     
   ┌─────────┐      YES   ┌─────────┐
   │ Make    │◄──────────┤ Pay     │
   │ Payment │           │ Now?    │
   └────┬────┘           └─────────┘
        │                     │ NO
        ▼                     │
   ┌─────────┐                │
   │ Process │                │
   │ Payment │                │
   │ Details │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Update  │                │
   │ Fee     │                │
   │ Status  │                │
   │ to PAID │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │Generate │                │
   │ Receipt │                │
   └────┬────┘                │
        │                     │
        ▼                     │
   ┌─────────┐                │
   │ Email   │                │
   │ Receipt │                │
   │ to      │                │
   │ Student │                │
   └────┬────┘               ┌▼─────────┐
        │                   │ Wait     │
        ▼                   │ for      │  
      END                   │ Payment  │
                            └──────────┘
                                 │
                                 ▼
                            ┌─────────┐      YES
                            │ Due     │───────────┐
                            │ Date    │           │
                            │Passed?  │           │
                            └─────────┘           │
                                 │ NO             │
                                 ▼                │
                            ┌─────────┐           │
                            │Continue │           │
                            │Waiting  │           │
                            └─────────┘           │
                                 │                │
                                 ▼                ▼
                            ┌─────────┐     ┌─────────┐
                            │ Send    │     │ Mark    │
                            │Reminder │     │ Fee as  │
                            │ Email   │     │OVERDUE  │
                            └─────────┘     └─────────┘
                                                 │
                                                 ▼
                                           ┌─────────┐
                                           │ Send    │
                                           │ Overdue │
                                           │ Notice  │
                                           └─────────┘
                                                 │
                                                 ▼
                                               END
```

## 3. COLLABORATION DIAGRAMS

### **3.1 User Authentication Collaboration**

```
                    USER AUTHENTICATION COLLABORATION

    1: login(credentials)
┌─────────┐ ──────────────► ┌─────────────┐
│         │                 │             │
│ Student │                 │   Frontend  │
│         │                 │             │
└─────────┘                 └─────────────┘
                                    │
                                    │ 2: POST /api/auth/login
                                    ▼
                            ┌─────────────┐
                            │             │
                            │AuthController│
                            │             │
                            └─────────────┘
                                    │
                                    │ 3: authenticate(username, password)
                                    ▼
                            ┌─────────────┐
                            │             │
                            │ AuthService │
                            │             │
                            └─────────────┘
                                    │
                                    │ 4: findByUsername(username)
                                    ▼
                            ┌─────────────┐
                            │             │
                            │UserRepository│
                            │             │
                            └─────────────┘
                                    │
                                    │ 5: SELECT * FROM users...
                                    ▼
                            ┌─────────────┐
                            │             │
                            │   Database  │
                            │             │
                            └─────────────┘
```

### **3.2 Room Allocation Collaboration**

```
                     ROOM ALLOCATION COLLABORATION

    1: allocateRoom(roomId, studentId)
┌─────────┐ ──────────────────────────► ┌─────────────┐
│         │                             │             │
│  Admin  │                             │   Frontend  │
│         │                             │             │
└─────────┘                             └─────────────┘
                                                │
                                                │ 2: POST /api/rooms/{id}/allocate
                                                ▼
                                        ┌─────────────┐
                                        │             │
                                        │RoomController│
                                        │             │
                                        └─────────────┘
                                                │
                                                │ 3: allocateRoom(roomId, studentId)
                                                ▼
                                        ┌─────────────┐
                                        │             │
                                        │ RoomService │
                                        │             │
                                        └─────────────┘
                                    ┌──────────┴──────────┐
                                    │                     │
                    4: findById(studentId)    5: findById(roomId)
                                    ▼                     ▼
                            ┌─────────────┐       ┌─────────────┐
                            │             │       │             │
                            │UserRepository│       │RoomRepository│
                            │             │       │             │
                            └─────────────┘       └─────────────┘
                                    │                     │
                                    │ 6: student data     │ 7: room data
                                    └──────────┬──────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │             │
                                        │ RoomService │
                                        │             │
                                        └─────────────┘
                                               │
                                               │ 8: save(updatedRoom)
                                               ▼
                                        ┌─────────────┐
                                        │             │
                                        │RoomRepository│
                                        │             │
                                        └─────────────┘
```

**Created by:** Yugendra  
**Date:** October 29, 2025  
**Version:** 1.0
