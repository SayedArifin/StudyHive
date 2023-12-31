"use client";
import { useEffect, useState } from "react";
import styl from "./Profile.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { supabase } from "../middleware";
import Stripe from "stripe";
import { toast } from "react-toastify";

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

  const formatUnixTimestamp = (timestamp) => {
    const dt = new Date(timestamp * 1000);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    document.title = `Profile`;
  }, []);
  const notify = () => {
    toast.success("Your Subscribtion has been Cancelled", {
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
  const notifyOnError = () => {
    toast.error("Something went wrong , please try again", {
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
  const notifyOnCancelled = () => {
    toast.warn("You have cancelled the process, Subscription still on", {
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

  const cancelSubscription = () => {
    confirmAlert({
      title: "Confirm to Cancel Subscription",
      message: "Are you sure you want to cancel your subscription?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await stripe.subscriptions.cancel(subsId);
              notify();
            } catch (error) {
              notifyOnError();
            }
            location.reload(true);
          },
        },
        {
          label: "No",
          onClick: () => notifyOnCancelled(),
        },
      ],
    });
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

  return (
    <div className={styl.contentProfilePage}>
      <div className={styl.profileUserPage + " ccard"}>
        <div className={styl.imgUserProfile}>
          <img
            className={styl.profileBgHome}
            src="https://notepd.s3.amazonaws.com/default-cover.png"
            alt="profile background"
          />
          <img
            className={styl.avatar}
            src="https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
            alt="avatar"
          />
        </div>

        <div className={styl.userProfileData}>
          <h1>{userEmail}</h1>
          <p>{status}</p>
          {status === "Canceled" ? null : status === "Not Subscribed" ? (
            <button>
              <a href="/pricing">Subscribe Now</a>
            </button>
          ) : (
            <button onClick={cancelSubscription}>Cancel Subscription</button>
          )}
        </div>
        <div className={styl.descriptionProfile}>
          {status === "Not Subscribed"
            ? "You needs to be subscribed"
            : "Its Time for Learn Something new. browse our All courses"}
        </div>
        <ul className={styl.dataUser}>
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
                  : "Next Payment Date"}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
