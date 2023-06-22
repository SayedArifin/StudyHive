"use client";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import getStripe from "../../../getStripe";
import { supabase } from "../middleware";
import { useRouter } from "next/navigation";
import useSubsState from "../../../components/ActiveSubscription";
import Link from "next/link";
import { pricingPlans } from "../../../api/arrow_api";

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
        successUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/success`,
        cancelUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/cancel`,
        customerEmail: session.user.email,
      });
      console.warn(error.message);
    } else {
      router.push("/login");
    }
  }

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
              <Link
                href="/course"
                style={{ color: "blue", textDecoration: "none" }}
              >
                {"\u00A0here"}
              </Link>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Pricing;
