"use client";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import getStripe from "../../../getStripe";
import { supabase } from "../middleware";
import { useRouter } from "next/navigation";
import useSubsState from "../../../components/ActiveSubscription";

const Pricing = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();
  const subsState = useSubsState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    }, []);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleCheckout(priceId) {
    if (session) {
      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        successUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/course`,
        cancelUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/pricing`,
        customerEmail: session.user.email,
      });
      console.warn(error.message);
    } else {
      router.push("/login");
    }
  }

  const pricingPlans = [
    {
      imgSrc: "https://i.postimg.cc/26VwFNC8/Student-Discipline-main-image.png",
      header: "Monthly Plan",
      features: ["All content available for 30 days", "Trial is not available"],
      price: "1080 ৳",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_1,
    },
    {
      imgSrc: "https://i.postimg.cc/QdS5CYc8/R-removebg-preview.png",
      header: "Half Year Plan",
      features: ["All contents are available for 6 month", "7 days free trial"],
      price: "6240 ৳",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_2,
    },
    {
      imgSrc:
        "https://i.postimg.cc/3xbRzsgv/procrastinating-employee-flat-color-detailed-character-vector-removebg-preview.png",
      header: "Yearly Plan",
      features: ["All contents are available for 1 year", "14 days free trial"],
      price: "12000 ৳",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_3,
    },
  ];

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.panel + " " + style["pricing-table"]}>
          {pricingPlans.map((plan, index) => (
            <div className={style["pricing-plan"]} key={index}>
              <img src={plan.imgSrc} alt="" className={style["pricing-img"]} />
              <h2 className={style["pricing-header"]}>{plan.header}</h2>
              <ul className={style["pricing-features"]}>
                {plan.features.map((feature, index) => (
                  <li className={style["pricing-features-item"]} key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
              <span className={style["pricing-price"]}>{plan.price}</span>
              {!subsState ? (
                <button
                  onClick={() => handleCheckout(plan.priceId)}
                  className={
                    style["pricing-button"] + " " + style["is-featured"]
                  }
                >
                  subscribe
                </button>
              ) : null}
            </div>
          ))}
        </div>
        {subsState ? (
          <>
            <h1 className={style["pricing-subscriber"]}>
              {`You have an active subscription in ${session.user.email}`}
            </h1>
            <p className={style["pricing-subscriber"]}>
              Browse our all course by clicking
              <a
                href="/course"
                style={{ color: "blue", textDecoration: "none" }}
              >
                {"\u00A0here"}
              </a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Pricing;
