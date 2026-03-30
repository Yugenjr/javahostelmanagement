// Mock data for when backend is unavailable
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@hostel.com',
    phoneNumber: '1234567890',
    role: 'ADMIN',
    active: true,
  },
  {
    id: 2,
    username: 'warden',
    password: 'warden123',
    firstName: 'John',
    lastName: 'Warden',
    email: 'warden@hostel.com',
    phoneNumber: '9876543210',
    role: 'WARDEN',
    active: true,
  },
  {
    id: 3,
    username: 'student1',
    password: 'student123',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@student.com',
    phoneNumber: '5551234567',
    role: 'STUDENT',
    active: true,
  },
];

export const mockRooms = [
  {
    id: 1,
    roomNumber: 'A101',
    roomType: 'SINGLE',
    capacity: 1,
    floor: 1,
    monthlyRent: 5000,
    status: 'OCCUPIED',
    description: 'Single occupancy room with attached bathroom',
    amenities: 'AC, WiFi, Study Table, Wardrobe',
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
  },
  {
    id: 2,
    roomNumber: 'A102',
    roomType: 'DOUBLE',
    capacity: 2,
    floor: 1,
    monthlyRent: 3500,
    status: 'AVAILABLE',
    description: 'Double occupancy room with shared bathroom',
    amenities: 'Fan, WiFi, Study Tables, Wardrobes',
  },
  {
    id: 3,
    roomNumber: 'B201',
    roomType: 'TRIPLE',
    capacity: 3,
    floor: 2,
    monthlyRent: 2500,
    status: 'AVAILABLE',
    description: 'Triple sharing room',
    amenities: 'Fan, WiFi, Study Tables',
  },
  {
    id: 4,
    roomNumber: 'B202',
    roomType: 'SINGLE',
    capacity: 1,
    floor: 2,
    monthlyRent: 5500,
    status: 'AVAILABLE',
    description: 'Premium single room with balcony',
    amenities: 'AC, WiFi, Study Table, Wardrobe, Balcony',
  },
  {
    id: 5,
    roomNumber: 'C301',
    roomType: 'DOUBLE',
    capacity: 2,
    floor: 3,
    monthlyRent: 4000,
    status: 'MAINTENANCE',
    description: 'Double room under maintenance',
    amenities: 'AC, WiFi, Study Tables',
  },
];

export const mockComplaints = [
  {
    id: 1,
    title: 'AC Not Working',
    description: 'The air conditioner in room A101 has stopped working since yesterday.',
    type: 'ELECTRICAL',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
    assignedWarden: { id: 2, firstName: 'John', lastName: 'Warden' },
    createdAt: '2025-10-25T10:30:00',
    updatedAt: '2025-10-26T14:20:00',
  },
  {
    id: 2,
    title: 'Water Leakage',
    description: 'There is water leakage in the bathroom ceiling.',
    type: 'PLUMBING',
    priority: 'URGENT',
    status: 'PENDING',
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
    createdAt: '2025-10-28T09:15:00',
    updatedAt: '2025-10-28T09:15:00',
  },
  {
    id: 3,
    title: 'Broken Study Table',
    description: 'The study table leg is broken and needs replacement.',
    type: 'FURNITURE',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
    assignedWarden: { id: 2, firstName: 'John', lastName: 'Warden' },
    resolvedAt: '2025-10-27T16:45:00',
    wardenRemarks: 'Table replaced successfully.',
    createdAt: '2025-10-24T11:00:00',
    updatedAt: '2025-10-27T16:45:00',
  },
];

export const mockFees = [
  {
    id: 1,
    amount: 5000,
    dueDate: '2025-10-31',
    paidDate: '2025-10-15',
    feeType: 'HOSTEL_FEE',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    transactionId: 'TXN123456789',
    month: 10,
    year: 2025,
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
  },
  {
    id: 2,
    amount: 3000,
    dueDate: '2025-10-31',
    paidDate: '2025-10-20',
    feeType: 'MESS_FEE',
    paymentStatus: 'PAID',
    paymentMethod: 'BANK_TRANSFER',
    transactionId: 'TXN987654321',
    month: 10,
    year: 2025,
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
  },
  {
    id: 3,
    amount: 5000,
    dueDate: '2025-11-30',
    feeType: 'HOSTEL_FEE',
    paymentStatus: 'PENDING',
    month: 11,
    year: 2025,
    student: { id: 3, firstName: 'Alice', lastName: 'Johnson' },
  },
];

export const mockDashboardStats = {
  totalRooms: 50,
  occupiedRooms: 38,
  availableRooms: 10,
  maintenanceRooms: 2,
  totalStudents: 38,
  totalComplaints: 45,
  pendingComplaints: 12,
  resolvedComplaints: 28,
  totalRevenue: 190000,
  pendingFees: 25000,
  collectedFees: 165000,
  occupancyRate: 76,
};

export const mockRecentActivities = [
  { id: 1, type: 'room_allocation', message: 'Room B202 allocated to John Doe', time: '2 hours ago' },
  { id: 2, type: 'complaint', message: 'New complaint: AC Not Working in A101', time: '3 hours ago' },
  { id: 3, type: 'payment', message: 'Fee payment received from Alice Johnson', time: '5 hours ago' },
  { id: 4, type: 'complaint_resolved', message: 'Complaint resolved: Broken Study Table', time: '1 day ago' },
];

// Mock API functions
export const mockLogin = async (username, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: userWithoutPassword,
    };
  }
  throw new Error('Invalid credentials');
};

export const mockGetProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const { password: _, ...userWithoutPassword } = mockUsers[0];
  return userWithoutPassword;
};

export const mockGetRooms = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRooms;
};

export const mockGetComplaints = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockComplaints;
};

export const mockGetFees = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFees;
};

export const mockGetDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDashboardStats;
};

export const mockCreateComplaint = async (complaintData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    id: mockComplaints.length + 1,
    ...complaintData,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const mockUpdateComplaint = async (id, updateData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const complaint = mockComplaints.find(c => c.id === id);
  return { ...complaint, ...updateData, updatedAt: new Date().toISOString() };
};

