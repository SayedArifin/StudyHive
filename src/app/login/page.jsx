"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../middleware";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function App() {
  const [session, setSession] = useState(null);
  const router = useRouter();
  useEffect(() => {
    document.title = `Login Now`;
  }, []);

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

  if (!session) {
    return (
      <div style={styles.loginform}>
        <Auth
          theme="dark"
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={["google"]}
        />
      </div>
    );
  } else {
    router.push("/");
    return null;
  }
}

const styles = {
  loginform: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "white",
  },
};
