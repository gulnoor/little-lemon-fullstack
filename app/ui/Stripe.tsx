"use client";
import React, { useCallback } from "react";
import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";

const StripeForm = ({ options, stripe }) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Elements options={options} stripe={stripe}>
      <form onSubmit={submitHandler}>
        <PaymentElement></PaymentElement>
        <CardElement className="w-full"></CardElement>
        <button>Submit</button>
      </form>
    </Elements>
  );
};

export default StripeForm;
