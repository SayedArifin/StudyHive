"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { supabase } from "@/app/middleware";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [session, setSession] = useState(null);
  const path = usePathname();
  const notifyOnLogout = () => {
    toast.success("You Have Logged Out", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyOnLogin = () => {
    toast.success("You are Logged in", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      notifyOnLogin();
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    notifyOnLogout();
  };

  return path === "/login" ? null : (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/">StudyHive!</Link>
      </div>
      <div className="nav-link">
        {session ? <Link href="/profile">Profile</Link> : null}
        <Link href="/about">Course Outline</Link>
        <Link href="/pricing">Pricing</Link>

        <Link href="/login">
          {session ? (
            <button onClick={logout} className="nav-button">
              Log Out
            </button>
          ) : (
            <button className="nav-button">Get Started</button>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
