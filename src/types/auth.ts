export type UserRole = 'teacher' | 'student';

export interface UserAccount {
  id: string;
  username: string;       // Assigned/Chosen username (e.g., 'TEACHER_7821', 'STUDENT_901')
  email: string;          // Registered email
  password: string;       // Account password
  fullName: string;       // User's full name
  role: UserRole;         // 'teacher' or 'student'
  schoolName?: string;
  designation?: string;   // For teacher, e.g., 'वरिष्ठ अध्यापक'
  rollNo?: string;        // For student, e.g., '901'
  createdAt: string;
}

export interface AuthState {
  user: UserAccount | null;
  isAuthenticated: boolean;
}
