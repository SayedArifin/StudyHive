import { loadStripe } from "@stripe/stripe-js";

const getStripe = async () => {
  const apiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripe = await loadStripe(apiKey);
  return stripe;
};

export default getStripe;
