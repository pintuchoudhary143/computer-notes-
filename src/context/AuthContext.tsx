import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types/auth';

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  login: (identity: string, pass: string) => { success: boolean; message: string };
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    rollNo?: string;
    designation?: string;
  }) => { success: boolean; username: string; message: string };
  logout: () => void;
  allUsers: UserAccount[];
}

const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    id: 'user_teacher_default',
    username: 'teacher',
    email: 'teacher@pavn.edu',
    password: 'teacher123',
    fullName: 'श्री सुरेश चन्द शर्मा',
    role: 'teacher',
    designation: 'वरिष्ठ अध्यापक एवं कक्षाध्यापक',
    schoolName: 'पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_student_default',
    username: 'student',
    email: 'student@pavn.edu',
    password: 'student123',
    fullName: 'राहुल शर्मा',
    role: 'student',
    rollNo: '901',
    schoolName: 'पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी',
    createdAt: new Date().toISOString()
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load users database from localStorage
  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('pavn_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_ACCOUNTS;
  });

  // Current session user
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const session = localStorage.getItem('pavn_current_session_user');
      if (session) {
        return JSON.parse(session);
      }
    } catch (e) {}
    return null; // Not logged in by default, so login/signup appears first!
  });

  // Sync users to localStorage
  const saveUsers = (usersList: UserAccount[]) => {
    setAllUsers(usersList);
    try {
      localStorage.setItem('pavn_registered_users', JSON.stringify(usersList));
    } catch (e) {
      console.warn('Failed to save users:', e);
    }
  };

  // Sign up handler
  const signup = (data: {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    rollNo?: string;
    designation?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    
    // Check if email already registered
    const exists = allUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, username: '', message: 'यह ईमेल आईडी पहले से पंजीकृत है! कृपया लॉगिन करें।' };
    }

    // Auto-generate assigned official Username
    const prefix = data.role === 'teacher' ? 'TEACHER' : 'STUDENT';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const assignedUsername = `${prefix}_${randomSuffix}`;

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      username: assignedUsername,
      email: cleanEmail,
      password: data.password,
      fullName: data.fullName.trim(),
      role: data.role,
      rollNo: data.rollNo?.trim(),
      designation: data.designation?.trim(),
      schoolName: 'पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी',
      createdAt: new Date().toISOString()
    };

    const updated = [...allUsers, newUser];
    saveUsers(updated);

    // Auto log in after signup
    setCurrentUser(newUser);
    try {
      localStorage.setItem('pavn_current_session_user', JSON.stringify(newUser));
    } catch (e) {}

    return {
      success: true,
      username: assignedUsername,
      message: `पंजीकरण सफल! आपका आधिकारिक यूजरनेम "${assignedUsername}" है।`
    };
  };

  // Login handler (matches by registered Email OR assigned Username + Password)
  const login = (identity: string, pass: string) => {
    const cleanId = identity.trim().toLowerCase();

    // Match either username (case-insensitive) OR email (case-insensitive)
    const found = allUsers.find(
      u => (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) && u.password === pass
    );

    if (found) {
      setCurrentUser(found);
      try {
        localStorage.setItem('pavn_current_session_user', JSON.stringify(found));
      } catch (e) {}
      return { success: true, message: `स्वागत है, ${found.fullName}!` };
    }

    return { 
      success: false, 
      message: 'अमान्य यूजरनेम / ईमेल आईडी अथवा गलत पासवर्ड! कृपया पुनः प्रयास करें।' 
    };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('pavn_current_session_user');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        allUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
