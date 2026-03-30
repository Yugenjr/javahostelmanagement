# 🎯 QUICK REFERENCE - Admin CRUD Operations

## 🚀 Start Commands

```bash
# Terminal 1 - Backend
cd C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement
mvn spring-boot:run

# Terminal 2 - Frontend
cd C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement\frontend
npm start
```

## 🔑 Login
- URL: http://localhost:3000
- Username: `admin`
- Password: `admin123`

## 📋 Admin Operations

### Students Management
| Action | How To |
|--------|--------|
| **View All** | Click "Students" in sidebar |
| **Add** | Click "Add Student" → Fill form → Submit |
| **Edit** | Click ✏️ pencil icon → Modify → Save |
| **Delete** | Click 🗑️ trash icon → Confirm |
| **Search** | Type in search box |

### Rooms Management
| Action | How To |
|--------|--------|
| **View All** | Click "Rooms" in sidebar |
| **Add** | Click "Add Room" → Fill form → Submit |
| **Edit** | Click ✏️ pencil icon → Modify → Save |
| **Delete** | Click 🗑️ trash icon → Confirm |
| **Filter** | Use status dropdown |

### Fee Management (NEW!)
| Action | How To |
|--------|--------|
| **View All** | Click "Payments" in sidebar |
| **Add Fee** | Click "Add Fee" → Select student → Enter amount → Set due date → Submit |
| **Edit Fee** | Click ✏️ pencil icon → Modify → Update Fee |
| **Delete Fee** | Click 🗑️ trash icon → Confirm |
| **Record Payment** | Click "Pay Now" → Enter transaction ID → Confirm |

### Complaints Management
| Action | How To |
|--------|--------|
| **View All** | Click "Complaints" in sidebar |
| **Add** | Click "Add Complaint" → Fill form → Submit |
| **Edit** | Click ✏️ pencil icon → Modify → Save |
| **Delete** | Click 🗑️ trash icon → Confirm |
| **Update Status** | Click complaint → Change status → Add remarks → Save |

## 🔄 After Every Operation

1. ✅ Toast notification appears (success/error)
2. ✅ Data auto-refreshes from database
3. ✅ UI updates with latest data
4. ✅ Changes persist in MySQL database

## 🗄️ Verify in Database

```sql
-- View students
SELECT * FROM user WHERE role = 'STUDENT';

-- View fees
SELECT * FROM fee ORDER BY created_at DESC;

-- View rooms
SELECT * FROM room;

-- View complaints
SELECT * FROM complaint;

-- View statistics
SELECT COUNT(*) as total_students FROM user WHERE role = 'STUDENT';
SELECT COUNT(*) as total_fees FROM fee;
SELECT COUNT(*) as pending_fees FROM fee WHERE payment_status = 'PENDING';
SELECT COUNT(*) as paid_fees FROM fee WHERE payment_status = 'PAID';
```

## 🎨 UI Elements

### Common Buttons
- 🟢 **Green Button** = Create/Add new record
- 🔵 **Blue Button** = Primary action (Save, Submit)
- 🟡 **Yellow/Orange Button** = Warning action
- 🔴 **Red Button** = Delete/Remove
- ✏️ **Pencil Icon** = Edit
- 🗑️ **Trash Icon** = Delete

### Status Colors
- 🟢 **Green** = Success, Paid, Available, Active
- 🟡 **Orange** = Pending, Warning
- 🔴 **Red** = Error, Overdue, Inactive
- 🔵 **Blue** = Info, In Progress

## 📊 Dashboard Stats

The dashboard shows real-time statistics:
- Total Students
- Available Rooms
- Pending Complaints
- Fees Collected

All stats update automatically when you add/edit/delete records!

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't fetch data | Check backend is running on port 8081 |
| 401 Unauthorized | Re-login to get new token |
| Changes not saving | Check MySQL is running |
| No toast notification | Check browser console for errors |

## 🎯 Success Indicators

You'll know it's working when:
1. ✅ Toast notification: "Added/Updated/Deleted successfully!"
2. ✅ Table/list updates immediately
3. ✅ Database query shows the change
4. ✅ Page refresh still shows the data (it's persistent!)

## 📞 API Endpoints (for reference)

```
Backend: http://localhost:8081
Frontend: http://localhost:3000

Students: /api/users
Rooms: /api/rooms
Fees: /api/fees
Complaints: /api/complaints
Dashboard: /api/dashboard/stats
```

## 🎉 That's It!

**Everything is configured and ready to use!**

Just login, click any section, and start managing your hostel data with full CRUD operations and database persistence! 🚀

