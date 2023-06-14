"use client";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { supabase } from "../src/app/middleware";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const useSubsState = () => {
  const [subsState, setSubsState] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: authSession } }) => {
      setSession(authSession);
    });

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(authSession);
    });
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const customer = await stripe.customers.list({
          email: session.user.email,
        });

        if (customer.data[0].email) {
          setSubsState(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (session) {
      fetchSubscription();
    }
  }, [session]);

  return subsState;
};

export default useSubsState;
