import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/initialData';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const STORAGE_KEY = 'hirelynk_currentUser';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading auth state from localStorage:', e);
    }
    return INITIAL_USERS[0]; // Default to Sarah Jenkins (Talent)
  });

  const { success, info } = useToast();

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state to localStorage:', e);
    }
  }, [currentUser]);

  const login = (email, password, role = 'talent') => {
    // Find matching demo user or create session
    const matched = INITIAL_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.role === role
    );
    const user = matched || {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      headline: role === 'recruiter' ? 'Senior Technical Recruiter' : 'Software Professional',
      location: 'San Francisco, CA',
      connectionsCount: 42,
      profileViews: 110,
      openToWork: role === 'talent',
      about: 'Passionate tech professional ready for new opportunities.'
    };
    setCurrentUser(user);
    success(`Welcome back, ${user.name}! Signed in as ${user.role.toUpperCase()}`);
    return user;
  };

  const register = (data) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role || 'talent',
      avatar: data.role === 'recruiter' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      headline: data.headline || (data.role === 'recruiter' ? `Recruiter @ ${data.company || 'TechCorp'}` : 'Software Engineer'),
      company: data.company || '',
      location: data.location || 'Remote',
      connectionsCount: 1,
      profileViews: 12,
      openToWork: data.role === 'talent',
      about: data.about || 'Excited to join the HireLynk professional network!',
      skills: data.skills || [{ name: 'Problem Solving', endorsements: 1 }],
      experience: [],
      education: []
    };
    setCurrentUser(newUser);
    success(`Account created successfully! Welcome to HireLynk, ${newUser.name}.`);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    info('You have been signed out.');
  };

  const switchRole = (role) => {
    const found = INITIAL_USERS.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      success(`Switched role to: ${found.name} (${found.role.toUpperCase()})`);
    }
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
    success('Profile updated successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
