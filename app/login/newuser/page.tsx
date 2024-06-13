"use client";
import { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TokenContext } from "@/app/lib/contexts/tokenContext";
import { MyTextField } from "@/app/ui/material3-inputs/inputs";
import { ThemeContext } from "@emotion/react";

const NewUser = () => {
  const { token, setToken } = useContext(TokenContext);
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
      console.log(response);
    } catch (err) {
      //TODO: add error component
      console.log(err);
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
      {/* TODO: add response error message components */}
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
