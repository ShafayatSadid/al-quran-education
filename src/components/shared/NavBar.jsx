// components/shared/NavBar.jsx
"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Avatar, Button, Dropdown, Label, Skeleton } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import { ThemeSwitch } from "./ThemeSwitch";
import { FreeClass } from "./FreeClass";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
    const sideMenuRef = useRef(null);
    const [burger, setBurger] = useState(true);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const openMenu = () => {
        if (sideMenuRef.current) {
            setBurger(false);
            sideMenuRef.current.style.transform = "translateX(0)";
        }
    };

    const closeMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = "translateX(-100%)";
            setBurger(true);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <nav className="w-full mx-auto fixed px-5 lg:px-8 py-4 flex justify-between items-center z-20 border-b border-accent/50 bg-background/80 backdrop-blur-md shadow-sm transition-colors duration-300">

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                {
                    burger ? <HiMenuAlt1
                        className="w-6 h-6 text-foreground cursor-pointer hover:text-primary transition"
                        onClick={openMenu}
                    /> : <></>
                }
            </div>

            {/* Mobile Side Menu */}
            <ul
                ref={sideMenuRef}
                style={{ transform: "translateX(-100%)" }}
                className="flex md:hidden flex-col gap-6 py-20 px-8 fixed left-0 top-0 bottom-0 w-64 z-50 h-screen bg-background shadow-2xl transition-transform duration-300 text-foreground"
            >
                <div className="absolute left-6 top-6">
                    <IoClose
                        onClick={closeMenu}
                        className="w-6 h-6 cursor-pointer hover:text-primary transition"
                    />
                </div>
                <li>
                    <Link
                        onClick={closeMenu}
                        href="/"
                        className="font-heading text-lg font-bold hover:text-primary transition"
                    >
                        হোম
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={closeMenu}
                        href="/about"
                        className="font-heading text-lg font-bold hover:text-primary transition"
                    >
                        আমাদের সম্পর্কে
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={closeMenu}
                        href="/teachers"
                        className="font-heading text-lg font-bold hover:text-primary transition"
                    >
                        শিক্ষকবৃন্দ
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={closeMenu}
                        href="/courses"
                        className="font-heading text-lg font-bold hover:text-primary transition"
                    >
                        কোর্সসমূহ
                    </Link>
                </li>
                <li className="mt-6">
                    <div onClick={closeMenu}><FreeClass /> </div>
                </li>
            </ul>

            {/* Logo - Al Quran Education */}
            <div className="flex-1 md:flex-none text-center md:text-left">
                <Link href="/">
                    <h1 className="font-heading text-2xl font-extrabold tracking-tight leading-tight">
                        <span className="text-primary">AL-QURAN</span>
                        <br />
                        <span className="text-accent text-sm font-semibold tracking-wider">
                            — EDUCATION
                        </span>
                    </h1>
                </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-8 py-2.5 bg-background/70 backdrop-blur-sm shadow-md border border-border">
                <li>
                    <Link
                        href="/"
                        className="font-body text-sm font-semibold text-foreground hover:text-primary transition"
                    >
                        হোম
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="font-body text-sm font-semibold text-foreground hover:text-primary transition"
                    >
                        আমাদের সম্পর্কে
                    </Link>
                </li>
                <li>
                    <Link
                        href="/teachers"
                        className="font-body text-sm font-semibold text-foreground hover:text-primary transition"
                    >
                        শিক্ষকবৃন্দ
                    </Link>
                </li>
                <li>
                    <Link
                        href="/courses"
                        className="font-body text-sm font-semibold text-foreground hover:text-primary transition"
                    >
                        কোর্সসমূহ
                    </Link>
                </li>
            </ul>

            {/* Right Side: Theme Toggle + CTA + Admin Profile */}
            <div className="flex items-center gap-4">
                <ThemeSwitch />
                <div className="hidden md:block"><FreeClass /></div>

                {/* ✅ অ্যাডমিন প্রোফাইল ড্রপডাউন (শুধুমাত্র লগইন থাকলে দেখাবে) */}
                {user ? (
                    <Dropdown>
                        <Dropdown.Trigger className="rounded-full cursor-pointer">
                            <Avatar size="md">
                                <Avatar.Image alt={user?.name} src={user?.image} />
                                <Avatar.Fallback delayMs={600}>
                                    {user?.name?.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                        </Dropdown.Trigger>

                        <Dropdown.Popover className="bg-card border border-border shadow-2xl rounded-2xl p-0 min-w-[220px]">
                            {/* User Info Header */}
                            <div className="px-4 pt-4 pb-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm">
                                        <Avatar.Image alt={user?.name} src={user?.image} />
                                        <Avatar.Fallback delayMs={600}>
                                            {user?.name?.slice(0, 2).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="font-heading text-sm font-semibold text-foreground leading-5">
                                            {user?.name}
                                        </p>
                                        <p className="font-body text-xs text-muted leading-4 truncate max-w-[140px]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    id="dashboard"
                                    textValue="Dashboard"
                                    href="/dashboard"
                                >
                                    <div className="flex items-center gap-3">
                                        <Persons className="size-4 text-muted" />
                                        <Label className="text-foreground">ড্যাশবোর্ড</Label>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="profile"
                                    textValue="Profile"
                                    href="/profile"
                                >
                                    <div className="flex items-center gap-3">
                                        <Gear className="size-4 text-muted" />
                                        <Label className="text-foreground">প্রোফাইল</Label>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="logout"
                                    textValue="Logout"
                                    variant="danger"
                                    className="mt-1 border-t border-border pt-2"
                                >
                                    <div
                                        onClick={handleSignOut}
                                        className="flex w-full items-center justify-between gap-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ArrowRightFromSquare className="size-4 text-error" />
                                            <Label className="text-error">লগআউট</Label>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                ) : <></>}
            </div>
        </nav>
    );
};

export default NavBar;