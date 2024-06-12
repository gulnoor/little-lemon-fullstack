"use client";
import * as Yup from "yup";
import { useContext } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { ErrorMessage, Field, useFormik } from "formik";
import { TextField } from "@mui/material";

const Login = () => {
  const { token, setToken } = useContext(TokenContext);
  const submitHandler = async (values) => {
    console.log(values);
    console.log(JSON.stringify({ ...values }));

    try {
      let response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      response = await response.json();
      if (response.message == "login successful") {
        setToken(() => response.token);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: submitHandler,
    validationSchema: Yup.object({
      email: Yup.string().email("Email is invalid").required(),
      password: Yup.string().required(),
    }),
  });

  return (
    <section>
      <h1 className="mb-8">Log In to make your Reservation</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 justify-center "
      >
        {/* TODO: add error message components */}
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "var(--md-sys-color-surface-container-highest)",
            },
          }}
          id="email"
          name="email"
          label="Email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          // type="email"
          {...formik.getFieldProps("email")}
        >
          gg
        </TextField>
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "var(--md-sys-color-surface-container-highest)",
            },
          }}
          id="password"
          name="password"
          label="Password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          // type="email"
          {...formik.getFieldProps("password")}
        ></TextField>
        <button
          className=" bg-[var(--md-sys-color-primary)] w-fit text-xl min-h-[48px] rounded-full  text-[var(--md-sys-color-on-primary)] flex justify-center items-center px-4 py-3"
          type="submit"
        >
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
