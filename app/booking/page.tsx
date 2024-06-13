"use client";
import styled from "@emotion/styled";
import heroImg from "/public/assets/images/corporate-memphis/Mesa de trabajo 1.png";
import { Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { MyForm, StyledTextField } from "./BookingForm.styles";
import { fetchAPI } from "./availTimesAPI";
import { ThemeContext } from "../lib/contexts/themeContext";
import Image from "next/image";
import { TokenContext } from "../lib/contexts/tokenContext";

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const StyledHero = styled.div`
  display: flex;
  background: var(--md-sys-color-tertiary-container);
  margin: 8px 8px 0 8px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  color: var(--md-sys-color-on-tertiary-container);
  @media screen and (min-width: 768px) {
    margin: 8px 8px 0 32px;
  }
  @media screen and (max-width: 601px) {
    & > img {
      display: none;
    }
  }
`;
const Styledh1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  padding: 24px;
  @media screen and (min-width: 601px) {
    font-size: 4rem;
  }
  @media screen and (min-width: 841px) {
    font-size: 7vw;
  }
`;

const StyledChip = styled.div`
  display: inline-flex;
  height: 48px;
  width: 70px;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  border-radius: 12px;
  background-color: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface);
  &:hover {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }
`;
export const MyTextInput = ({ label, formik, type }) => {
  const { theme } = useContext(ThemeContext);
  const name = camelCase(label);

  return (
    <StyledTextField
      id={camelCase(label)}
      label={label}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      type={type}
      name={name}
      theme={theme}
      {...formik.getFieldProps(name)}
      InputLabelProps={label === "Date" ? { shrink: true } : null}
      multiline={type === "textarea" ? true : false}
      minRows={type === "textarea" ? 3 : null}
    ></StyledTextField>
  );
};
const handleSubmit = async (values, token) => {
  let response = null;
  try {
    response = await fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      body: JSON.stringify({...values}),
    });
    response = await response.json();
    console.log(response);
  } catch (err) {
    //TODO: add error component
    console.log(err);
  }
};
const BookingForm = () => {
  const chipRefs = useRef([]);
  const [availTimes, setAvailTimes] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);

  const formik = useFormik({
    initialValues: {
      persons: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      specialRequest: "",
    },
    onSubmit: (values) => {
      handleSubmit(values, token);
    },
    validationSchema: yup.object({
      date: yup.date().required(),
      persons: yup.number().min(1, "min 1 person").max(10).required(),
      time: yup.string().required(),
      occasion: yup.string().optional(),
      firstName: yup
        .string()
        .required("No name no party")
        .min(2, "Name must be at least two character long"),
      lastName: yup.string().optional(),
      email: yup.string().email(),
      specialRequest: yup.string().optional(),
    }),
  });
  useEffect(() => {
    formik.setFieldValue("time", "");
    fetchAPI(formik.values.date)
      .then(function (resolvedValue) {
        setAvailTimes(resolvedValue);
      })
      .catch(function (rejectValue) {
        setAvailTimes(rejectValue);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.date]);

  const handleChipClick = (time, i) => {
    return () => {
      formik.setFieldValue("time", time);
      chipRefs.current.forEach((div) => {
        div.style.backgroundColor =
          "var(--md-sys-color-surface-container-highest)";
        div.style.color = "var(--md-sys-color-on-surface)";
      });
      chipRefs.current[i].style.backgroundColor =
        "var(--md-sys-color-tertiary-container)";
      chipRefs.current[i].style.color =
        "var(--md-sys-color-on-tertiary-container)";
    };
  };

  return (
    <>
      <StyledHero>
        <Styledh1>Reservation</Styledh1>
        <Image
          src={heroImg}
          alt=""
          style={{
            maxWidth: "35%",
            borderRadius: "120px",
            margin: "8px",
          }}
        />
      </StyledHero>
      <MyForm onSubmit={formik.handleSubmit}>
        <MyTextInput
          label="Persons"
          type="number"
          formik={formik}
        ></MyTextInput>
        <MyTextInput formik={formik} label="Date" type={"date"}></MyTextInput>
        <StyledTextField
          select
          id="time"
          label="Time"
          error={formik.touched["time"] && Boolean(formik.errors["time"])}
          helperText={formik.touched["time"] && formik.errors["time"]}
          name={"time"}
          theme={theme}
          {...formik.getFieldProps("time")}
        >
          <MenuItem value="">
            {formik.values.date ? "Select Time" : "Select Date First"}
          </MenuItem>
          {formik.values.date &&
            availTimes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </StyledTextField>
        {formik.values.date && (
          <h1
            className="title-large"
            style={{
              color: "var(--md-sys-color-on-surface)",
              marginBottom: "16px",
            }}
          >
            Available Times
          </h1>
        )}
        <div
          className="
        grid grid-cols-[repeat(auto-fill,70px)] 
        justify-around 
        w-full 
        gap-4 
        min-h-[16px] 
        px-0 py-4 
        border-solid 
        border-t-2 border-t-[color:var(--md-sys-color-outline)]"
        >
          {availTimes.map((time, i) => {
            return (
              <StyledChip
                ref={(el) => (chipRefs.current[i] = el)}
                onClick={handleChipClick(time, i)}
                label={time}
                key={time}
              >
                {time}
              </StyledChip>
            );
          })}
        </div>
        <MyTextInput
          formik={formik}
          label="First Name"
          type="text"
        ></MyTextInput>
        <MyTextInput
          label="Last Name"
          formik={formik}
          type="text"
        ></MyTextInput>
        <MyTextInput label="Email" formik={formik} type="email"></MyTextInput>
        <MyTextInput
          label="Special Request"
          formik={formik}
          type="textarea"
        ></MyTextInput>
        <Button
          variant="contained"
          sx={{
            width: "80%",
            margin: "auto",
          }}
          type="submit"
        >
          Submit
        </Button>
      </MyForm>
    </>
  );
};

export default BookingForm;
