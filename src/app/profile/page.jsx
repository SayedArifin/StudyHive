"use client";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { supabase } from "../middleware";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const Profile = () => {
  const [session, setSession] = useState(null);
  const [userEmail, setUserEmail] = useState("unknown");
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState("Not Subscribed");
  const [createdAt, setCreatedAt] = useState(0);
  const [nextPayload, setNextPayload] = useState(0);
  const [currentPayload, setCurrentPayload] = useState(0);
  const [subsId, setSubsId] = useState(0);
  const [pageReloaded, setPageReloaded] = useState(false);

  const formatUnixTimestamp = (timestamp) => {
    const dt = new Date(timestamp * 1000);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const cancelSubscription = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );
    if (confirmed) {
      try {
        await stripe.subscriptions.cancel(subsId);
        notify();
      } catch (error) {
        // Handle error
      }
      location.reload(true);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user) {
        setUserEmail(session.user.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && session.user) {
        setUserEmail(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const customer = await stripe.customers.list({
          email: session.user.email,
        });
        setUserId(customer.data[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    if (session) {
      fetchCustomerId();
    }
  }, [session]);
  useEffect(() => {
    const fetchSubscriptions = async (userId) => {
      try {
        if (session && session.user) {
          const customer = await stripe.customers.list({
            email: session.user.email,
          });
          const canceledSubscriptions = await stripe.subscriptions.search({
            query: 'status: "canceled"',
          });

          const trialSubscription = await stripe.subscriptions.search({
            query: `status: 'trialing'`,
          });

          const activeSubscription = await stripe.subscriptions.search({
            query: `status: 'active'`,
          });

          for (let i = 0; i < trialSubscription.data.length; i++) {
            if (trialSubscription.data[i].customer === userId) {
              setStatus("Trial");
              setCreatedAt(trialSubscription.data[i].created);
              setNextPayload(trialSubscription.data[i].current_period_end);
              setCurrentPayload(trialSubscription.data[i].current_period_start);
              setSubsId(trialSubscription.data[i].id);
              return; // Exit the function if trial subscription is found
            }
          }

          for (let i = 0; i < activeSubscription.data.length; i++) {
            if (activeSubscription.data[i].customer === userId) {
              setStatus("Active");
              setCreatedAt(activeSubscription.data[i].created);
              setNextPayload(activeSubscription.data[i].current_period_end);
              setCurrentPayload(
                activeSubscription.data[i].current_period_start
              );
              setSubsId(activeSubscription.data[i].id);
              return; // Exit the function if active subscription is found
            }
          }
          for (let i = 0; i < canceledSubscriptions.data.length; i++) {
            if (canceledSubscriptions.data[i].customer === userId) {
              setStatus("Canceled");
              setCreatedAt(canceledSubscriptions.data[i].created);
              setNextPayload(canceledSubscriptions.data[i].canceled_at);
              setCurrentPayload(
                canceledSubscriptions.data[i].current_period_start
              );
              setSubsId(canceledSubscriptions.data[i].id);
              return; // Exit the function if active subscription is found
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (session && userId) {
      // Add condition to ensure userId is available
      fetchSubscriptions(userId);
    }
  }, [session, userId]);
  useEffect(() => {
    if (!pageReloaded) {
      // Reload the page only once when the component mounts
      setPageReloaded(true);
      location.reload(true);
    }
  }, [pageReloaded]);

  return (
    <div className={styles.contentProfilePage}>
      <div className={styles.profileUserPage + " card"}>
        <div className={styles.imgUserProfile}>
          <img
            className={styles.profileBgHome}
            src="https://source.unsplash.com/800x600/?study"
            alt="profile background"
          />
          <img
            className={styles.avatar}
            src="https://source.unsplash.com/800x600/?smile"
            alt="avatar"
          />
        </div>
        {status === "Canceled" ? null : status === "Not Subscribed" ? (
          <button>
            <a href="/pricing">Subscribe Now</a>
          </button>
        ) : (
          <button onClick={cancelSubscription}>Cancel Subscription</button>
        )}

        <div className={styles.userProfileData}>
          <h1>{userEmail}</h1>
          <p>{status}</p>
        </div>
        <div className={styles.descriptionProfile}>
          {status === "Not Subscribed"
            ? "You needs to be subscribed"
            : "Its Time for Learn Something new. browse our All courses"}
        </div>
        <ul className={styles.dataUser}>
          <li>
            <a>
              <strong>
                {status === "Not Subscribed"
                  ? "----/--/--"
                  : formatUnixTimestamp(createdAt)}
              </strong>
              <span>Member Since</span>
            </a>
          </li>
          <li>
            <a>
              <strong>
                {status === "Not Subscribed"
                  ? "----/--/--"
                  : formatUnixTimestamp(currentPayload)}
              </strong>
              <span>
                {status === "Trial" ? "Trial Starts" : "Last Payment"}
              </span>
            </a>
          </li>
          <li>
            <a>
              <strong>
                {status === "Not Subscribed"
                  ? "----/--/--"
                  : formatUnixTimestamp(nextPayload)}
              </strong>
              <span>
                {status === "Canceled"
                  ? "Canceled At"
                  : status === "Trial"
                  ? "Trial Ends"
                  : "Last Payment"}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
