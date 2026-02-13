import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const UserAvatar: React.FC = () => {
    const { user, userRole, logout, setRole } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
                <Avatar className="w-9 h-9 border-2 border-cyan-400/50">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-violet-500 text-white text-sm font-medium">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-border bg-foreground/5">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-cyan-400/50">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-violet-500 text-white font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">{user.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                        {userRole !== 'admin' && (
                            <>
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors text-left"
                                    onClick={() => {
                                        setRole(null);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Change Role</span>
                                </button>

                                <div className="h-px bg-border my-1" />
                            </>
                        )}

                        <button
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                                navigate('/login');
                            }}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
