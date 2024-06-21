"use client";
import React, { useCallback, useEffect, useState } from "react";
import StripeForm from "../ui/Stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
    <section>
      <Elements
        options={{
          clientSecret: secret,
          appearance: {},
        }}
        stripe={stripe}
      >
        <StripeForm key={secret}></StripeForm>
      </Elements>
    </section>
  ) : (
    <h1>creating intent</h1>
  );
};

export default Checkout;
