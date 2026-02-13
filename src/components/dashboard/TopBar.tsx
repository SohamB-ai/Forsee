import { Search, MapPin, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef } from "react";

export function TopBar() {
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement !== searchInputRef.current) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div id="topbar" className="flex items-center justify-between p-4 bg-[var(--glass)] backdrop-blur-md rounded-2xl shadow-[var(--shadow-1)] mb-6 z-10 relative">
            <div className="flex items-center gap-4">
                {/* Org Selector */}
                <div id="select-org">
                    <Select defaultValue="org-1">
                        <SelectTrigger className="w-[180px] bg-[var(--card-bg)] border-none shadow-sm h-10 rounded-xl">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[var(--accent-color)]" />
                                <SelectValue placeholder="Select Organization" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="org-1">Global Fleet A</SelectItem>
                            <SelectItem value="org-2">Northeast Region</SelectItem>
                            <SelectItem value="org-3">European Operations</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Center Search */}
            <div className="flex-1 max-w-md mx-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <Input
                    id="search-assets"
                    ref={searchInputRef}
                    placeholder="Search assets... (/)"
                    className="pl-10 h-10 bg-[var(--card-bg)] border-none shadow-sm rounded-xl focus:ring-1 focus:ring-[var(--accent-color)] transition-all"
                />
            </div>

            {/* User Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full" id="user-menu">
                        <Avatar className="h-10 w-10 border-2 border-[var(--bg)] shadow-sm">
                            <AvatarImage src="/avatars/01.png" alt="@user" />
                            <AvatarFallback className="bg-[var(--accent-color)] text-white">OP</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Operator</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                op@forsee.ai
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
