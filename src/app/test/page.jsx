"use client";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { supabase } from "../middleware";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const useSubsState = () => {
  const [subsState, setSubsState] = useState("No Subscription");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: authSession } }) => {
      setSession(authSession);
    });

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(authSession);
    });
  }, []);
  // useEffect(() => {
  //   const fetchSubscription = async () => {
  //     try {
  //       const customer = await stripe.customers.list({
  //         email: session.user.email,
  //       });
  //       console.log(customer);

  //       if (customer.data[0].email) {
  //         setSubsState(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (session) {
  //     fetchSubscription();
  //   }
  // }, [session]);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const customer = await stripe.subscriptions.search({
          query: `status: 'trialing' `,
        });

        console.log(customer);

        for (let i = 0; i < customer.data.length; i++) {
          if (customer.data[i].customer === "cus_O4cWf2DPwIgUxZ") {
            setSubsState(i);
            break; // Exit the loop if the condition is met
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (session) {
      fetchSubscription();
    }
  }, [session]);

  return <h1>You HAve {subsState}</h1>;
};

export default useSubsState;
