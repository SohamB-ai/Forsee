import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    User as FirebaseUser
} from 'firebase/auth';

// --- TYPE DEFINITIONS ---

export type UserRole = 'admin' | 'engineer' | 'viewer' | null;

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    userRole: UserRole;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    setRole: (role: UserRole) => void;
    // user is managed by firebase, so we don't expose setUser directly for external override usually, 
    // but we might need it for the role logic if it modifies the user object locally. 
    // For now, I'll keep it to avoid breaking other components, but it might be no-op or just update local state.
    setUser: (user: User | null) => void;
    requestRole: (role: UserRole) => void;
    pendingRequest: UserRole;
}

// --- CONTEXT ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER ---

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [pendingRequest, setPendingRequest] = useState<UserRole>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Map Firebase User to App User
    const mapUser = (fbUser: FirebaseUser): User => ({
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || '',
        avatarUrl: fbUser.photoURL || '/avatar.png',
    });

    // Handle Auth State Changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                const appUser = mapUser(fbUser);
                setUser(appUser);

                // Restore role from local storage or default to viewer
                // In a real app, you'd fetch this from a database (Firestore) based on uid
                const storedRole = localStorage.getItem(`forsee_role_${fbUser.uid}`) as UserRole;
                setUserRole(storedRole || 'viewer');
            } else {
                setUser(null);
                setUserRole(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (name: string, email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // user state will update via onAuthStateChanged
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('forsee_role'); // Clear generic role if any
        // We might want to keep specific user roles in storage or specific DB
    };

    const setRole = (role: UserRole) => {
        setUserRole(role);
        if (user && role) {
            localStorage.setItem(`forsee_role_${user.id}`, role);
        }
    };

    const requestRole = (role: UserRole) => {
        if (!user) return;
        setPendingRequest(role);
        // Mock request logic
        console.log(`User ${user.email} requested role ${role}`);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userRole,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                loginWithGoogle,
                logout,
                setRole,
                setUser, // functionality limited as firebase controls state
                requestRole,
                pendingRequest,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// --- HOOK ---

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
