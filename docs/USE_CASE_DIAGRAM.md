# USE CASE DIAGRAM
## Hostel Management System

```
                          HOSTEL MANAGEMENT SYSTEM
                               USE CASE DIAGRAM

    ┌─────────────┐                                           ┌─────────────┐
    │   STUDENT   │                                           │    ADMIN    │
    └─────────────┘                                           └─────────────┘
          │                                                          │
          │                                                          │
    ┌─────▼──────┐              ┌─────────────────┐            ┌─────▼──────┐
    │   Login    │              │     System      │            │   Login    │
    └─────┬──────┘              │                 │            └─────┬──────┘
          │                     │                 │                  │
    ┌─────▼──────┐              │  ┌───────────┐  │            ┌─────▼──────┐
    │View Profile│              │  │  Validate │  │            │Manage Users│
    └─────┬──────┘              │  │   Users   │  │            └─────┬──────┘
          │                     │  └───────────┘  │                  │
    ┌─────▼──────┐              │                 │            ┌─────▼──────┐
    │Update Info │              │  ┌───────────┐  │            │Manage Rooms│
    └─────┬──────┘              │  │  Manage   │  │            └─────┬──────┘
          │                     │  │  Rooms    │  │                  │
    ┌─────▼──────┐              │  └───────────┘  │            ┌─────▼──────┐
    │Submit      │              │                 │            │View Reports│
    │Complaint   │              │  ┌───────────┐  │            └─────┬──────┘
    └─────┬──────┘              │  │  Handle   │  │                  │
          │                     │  │Complaints │  │            ┌─────▼──────┐
    ┌─────▼──────┐              │  └───────────┘  │            │System      │
    │View        │              │                 │            │Config      │
    │Complaints  │              │  ┌───────────┐  │            └────────────┘
    └─────┬──────┘              │  │  Manage   │  │
          │                     │  │   Fees    │  │
    ┌─────▼──────┐              │  └───────────┘  │      ┌─────────────┐
    │View Fee    │              │                 │      │   WARDEN    │
    │Status      │              │  ┌───────────┐  │      └─────────────┘
    └────────────┘              │  │Generate   │  │             │
                                │  │ Reports   │  │             │
                                │  └───────────┘  │       ┌─────▼──────┐
                                │                 │       │   Login    │
                                └─────────────────┘       └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │View        │
                                                          │Complaints  │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │Update      │
                                                          │Complaint   │
                                                          │Status      │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │Add Warden  │
                                                          │Remarks     │
                                                          └─────┬──────┘
                                                                │
                                                          ┌─────▼──────┐
                                                          │View Room   │
                                                          │Occupancy   │
                                                          └────────────┘
```

## Actors and Their Use Cases

### **STUDENT**
- **Login:** Authenticate to access the system
- **View Profile:** View personal information and details
- **Update Info:** Modify personal information
- **Submit Complaint:** Report issues or problems
- **View Complaints:** Check status of submitted complaints
- **View Fee Status:** Check payment status and dues

### **WARDEN** 
- **Login:** Authenticate to access the system
- **View Complaints:** View all student complaints
- **Update Complaint Status:** Change complaint status (Pending → In Progress → Resolved)
- **Add Warden Remarks:** Add comments and resolution notes
- **View Room Occupancy:** Monitor room allocation and availability

### **ADMIN**
- **Login:** Authenticate with administrative privileges
- **Manage Users:** Create, update, delete user accounts
- **Manage Rooms:** Add, modify, allocate rooms
- **View Reports:** Generate system reports and analytics
- **System Config:** Configure system settings and parameters

## System Use Cases

### **Core System Functions**
- **Validate Users:** Authenticate and authorize users
- **Manage Rooms:** Handle room inventory and allocation
- **Handle Complaints:** Process complaint lifecycle
- **Manage Fees:** Track payments and billing
- **Generate Reports:** Create system analytics and reports

## Use Case Relationships

### **Include Relationships**
- All user actions include "Login" use case
- "Manage Users" includes "Validate Users" 
- "Submit Complaint" includes user validation

### **Extend Relationships**
- "View Reports" extends to specialized report types
- "Update Complaint Status" extends to "Add Warden Remarks"

### **Generalization**
- All actors inherit basic "User" authentication capabilities
- Different user roles have specialized permissions and access levels

## Use Case Priorities

### **High Priority**
1. User Authentication & Authorization
2. Room Management & Allocation
3. Complaint Submission & Tracking

### **Medium Priority**
1. Fee Management & Payment Tracking
2. User Profile Management
3. Basic Reporting

### **Low Priority**
1. Advanced Analytics
2. System Configuration
3. Audit Trail Features

**Created by:** Yugendra  
**Date:** October 29, 2025  
**Version:** 1.0
