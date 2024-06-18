"use client";
import { useContext } from "react";
import MyButton from "../ui/MyButton";
import * as Yup from "yup";
import { TokenContext } from "../lib/contexts/tokenContext";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { AlertContext } from "../lib/contexts/AlertContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { setToken } = useContext(TokenContext);
  const { openAlert } = useContext(AlertContext);
  const submitHandler = async (values) => {
    console.log(values);

    try {
      let response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      response = await response.json();
      openAlert(response);
      if (response.message === "login successful") {
        setToken(response.token);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      openAlert({ type: "error", message: err.message });
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
    <form
      onSubmit={formik.handleSubmit}
      className="
      bg-[var(--md-sys-color-surface-container)] rounded-lg shadow-xl
      p-4 md:p-8
      min-h-[82vh]
      animate__animated animate__fadeInUp animate__faster flex flex-col gap-8 justify-center w-full md:w-3/4 max-w-[600px]"
    >
      <h2>Sign in to your account</h2>
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
        type="email"
        id="email"
        name="email"
        label="Email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        // type="email"
        {...formik.getFieldProps("email")}
      ></TextField>
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
        type="password"
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
      <MyButton
        href="/login/newuser"
        variant={"text"}
        style={""}
        textSize={"text-lg"}
      >
        Don&apos;t have an account? Register for free
      </MyButton>
    </form>
  );
};

export default Login;
