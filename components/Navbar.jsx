"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/middleware";

const Navbar = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/">StudyHive!</Link>
      </div>
      <div className="nav-link">
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
