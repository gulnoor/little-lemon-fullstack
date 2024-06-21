"use client";
import React, { useCallback, useEffect, useState } from "react";
import StripeForm from "../ui/Stripe";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe("pk_test_51PTenJImdZ3lHFXLlWgDHAR7ZwlfbTEM0KQpLWHwfGJjMbeIAgCGKLQqXffnYeZcx7yEEfX2KFugKQapDwMopAW800COUJn99r");
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
