"use client";
import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { AlertContext } from "../lib/contexts/AlertContext";

const StripeForm = ({}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const { openAlert } = useContext(AlertContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      confirmParams: {},
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.error(error);
      setErrorMessage(error.message);
      openAlert({ type: "error", message: error.message });
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log("success");
    }
  };
  return (
    <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
      <h2 className="pb-4">Enter Payment Details</h2>
      <PaymentElement></PaymentElement>
      <Button type="submit">Submit</Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default StripeForm;
