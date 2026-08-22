"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Button } from "@heroui/react";

import { ThemeSwitch } from "./ThemeSwitch";
import { FreeClass } from "./FreeClass";


const NavBar = () => {
    const sideMenuRef = useRef(null);
    const [burger, setBurger] = useState(true)

    const openMenu = () => {
        if (sideMenuRef.current) {
            setBurger(false)
            sideMenuRef.current.style.transform = "translateX(0)";
        }
    };

    const closeMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = "translateX(-100%)";
            setBurger(true)
        }
    };


    return (
        <nav className="w-full mx-auto fixed px-5 lg:px-8 py-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md shadow-sm transition-colors duration-300">

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
                    <div onClick={closeMenu}><FreeClass/> </div>                  
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

            {/* Right Side: Theme Toggle + CTA */}
            <div className="flex items-center gap-4">
                <ThemeSwitch />
                <div className="hidden md:block"><FreeClass /></div>
            </div>
        </nav>
    );
};

export default NavBar;