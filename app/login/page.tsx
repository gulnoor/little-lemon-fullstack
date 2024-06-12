"use client";
import * as Yup from "yup";
import { useContext } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { useFormik } from "formik";
import cat from "@/public/assets/images/a cute cat made of lemons.png";
import { TextField } from "@mui/material";
import Image from "next/image";

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
      <h1 className="mb-12 max-w-[600px]">Log In to make your Reservation</h1>
      <div className="flex">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-11 justify-center w-full md:w-3/4 max-w-[600px]"
        >
          {/* TODO: add error message components */}
          <TextField
            sx={{
              maxWidth: "600px",
              "& .MuiInputBase-root": {
                backgroundColor: "var(--md-sys-color-surface-container-highest)",
              },
              " & .MuiOutlinedInput-root > fieldset": {
                borderWidth: "2px",
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
              maxWidth: "600px",
              "& .MuiInputBase-root": {
                backgroundColor: "var(--md-sys-color-surface-container-highest)",
              },
              " & .MuiOutlinedInput-root > fieldset": {
                borderWidth: "2px",
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
            className=" bg-[var(--md-sys-color-primary)] max-w-[600px] text-xl min-h-[48px] rounded-full  text-[var(--md-sys-color-on-primary)] flex justify-center items-center px-4 py-3"
            type="submit"
          >
            Log In
          </button>
        </form>
        <Image
          className="hidden md:block w-1/4 mx-auto"
          src={cat}
          alt={`Little Lemon Logo`}
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
};

export default Login;
