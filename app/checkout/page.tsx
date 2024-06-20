"use client";
import React, { useCallback, useEffect, useState } from "react";
import StripeForm from "../ui/Stripe";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Checkout = () => {
  const [secret, setSecret] = useState(undefined);
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
    });
    const data = await response.json();
    console.log("secret", data.clientSecret);
    setSecret(data.clientSecret);
    return data.clientSecret;
  }, []);
  useEffect(() => {
    fetchClientSecret();
  }, []);
  return secret ? (
    <div>
      <StripeForm
        key={secret}
        stripe={stripe}
        options={{
          clientSecret: secret,
          appearance: {},
        }}
      ></StripeForm>
    </div>
  ) : (
    <h1>creating intent</h1>
  );
};

export default Checkout;
