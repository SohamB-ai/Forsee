"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(() => {
        // Initialize from localStorage if available, otherwise default to dark
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return savedTheme === null ? true : savedTheme === "dark";
        }
        return true;
    });

    useEffect(() => {
        // Apply theme class to html element
        const html = document.documentElement;
        if (isDark) {
            html.classList.add("dark");
            html.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };


    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
