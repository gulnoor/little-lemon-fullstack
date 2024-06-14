"use client";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MyTextField } from "@/app/ui/material3-inputs/inputs";
import { ThemeContext } from "@emotion/react";

import { AlertContext } from "@/app/lib/contexts/AlertContext";

const NewUser = () => {
  //TODO: move focus/ highlight/scroll to invalid input when submit is clicked
  // const [open, setOpen] = useState(false);
  // const [alert, setAlert] = useState({ type: "", message: "" });
  const { openAlert } = useContext(AlertContext);

  const { theme } = useContext(ThemeContext);
  const submitHandler = async (values) => {
    console.log(values);
    let response = null;
    try {
      response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      response = await response.json();
      openAlert(response);
    } catch (err) {
      console.log(err);
      openAlert(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      contact: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: submitHandler,
    validationSchema: Yup.object({
      //TODO: add phone number validation etc
      contact: Yup.string(),
      password: Yup.string().min(8).max(16).required(),
      email: Yup.string().email(),
      firstName: Yup.string()
        .required("No name no party")
        .min(2, "Name must be at least two character long"),
      lastName: Yup.string().optional(),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="
      flex  flex-wrap
      gap-5
      justify-center 
      w-full md:w-3/4 
      max-w-[600px]"
    >
      {/* <Snackbar
        onClose={() => {
          setOpen(false);
          setAlert({ type: "", message: "" });
        }}
        open={open}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => {
            setOpen(false);
            setAlert({ type: "", message: "" });
          }}
          variant="filled"
          sx={{ width: "100%" }}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar> */}
      <MyTextField
        label={"First Name"}
        formik={formik}
        theme={theme}
        type={"text"}
        className="w-full lg:w-[48%]"
      />
      <MyTextField
        label={"Last Name"}
        formik={formik}
        theme={theme}
        className="w-full  lg:w-[48%]"
        type={"text"}
      />
      <MyTextField
        label={"Contact"}
        formik={formik}
        className={"w-full"}
        theme={theme}
        type={"text"}
      />
      <MyTextField
        label={"Email"}
        formik={formik}
        theme={theme}
        type={"email"}
        className={"w-full"}
      />
      <MyTextField
        label={"Password"}
        formik={formik}
        theme={theme}
        className={"w-full"}
        type={"password"}
      />

      <button
        className="
        bg-[var(--md-sys-color-primary)] 
        w-full
        min-h-[48px] 
        text-xl text-[var(--md-sys-color-on-primary)] 
        rounded-full  
        flex justify-center items-center 
        px-4 py-3"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
};

export default NewUser;
