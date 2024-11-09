"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
// import logo from '../../assets/logo.svg'

function Header() {
  // State to track if the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      
      {/* Mobile menu */}
      <nav
        id="mobile-menu-placeholder"
        className={`mobile-menu flex-col items-center space-y-8 md:hidden px-8 ${
          isMenuOpen ? 'flex' : 'hidden' // Show or hide the mobile menu based on isMenuOpen state
        }`}
      >
        <ul className="w-full text-center text-sky-300">
          <li className="border-b border-gray-300 pb-4 pt-4">
            <Link href="/" className="hover:text-secondary font-bold">Home</Link>
          </li>
          <li className="border-b border-gray-300 pb-4 pt-4">
            <Link href="/about" className="hover:text-secondary font-bold">About</Link>
          </li>
        </ul>
        
        <div className="flex flex-col mt-6 space-y-2 items-center">
          <SignedOut>
            <button className="animate-bounce focus:animate-none hover:animate-none bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold py-2 px-4 rounded">
              <SignInButton />
            </button>
          </SignedOut>
    
        </div>
      </nav>
      <header className="bg-slate-900 sticky top-0 z-50 px-6">
        <div className="container mx-auto flex justify-between items-center py-3">
          {/* Left section: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex justify-center items-center gap-2">
            {/* <Image src={logo} alt="Remindly Logo" width={30} height={30} /> */}
            <h1 className="text-xl font-extrabold leading-none tracking-normal text-gray-900 md:text-2xl md:tracking-tight">
              <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                Remindly
              </span>
            </h1>
            </Link>
          </div>
          
          {/* Hamburger menu (for mobile) */}
          <div className="flex md:hidden space-x-3 gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
            <button
              id="hamburger"
              className="text-white focus:outline-none"
              onClick={toggleMenu} // Toggle the menu on click
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
   
          </div>
          
          {/* Center section: Menu */}
          <nav className="hidden md:flex md:flex-grow justify-center">
            <ul className="flex justify-center space-x-4 text-sky-300">
              <li><Link href="/" className="hover:text-secondary font-bold">Home</Link></li>
              <li><Link href="/about" className="hover:text-secondary font-bold">About</Link></li>
            </ul>
          </nav>
          
          {/* Right section: Buttons (for desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <SignedOut>
              <button className="animate-bounce focus:animate-none hover:animate-none bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold py-2 px-4 rounded">
                <SignInButton />
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
