"use client";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {props.name === "time" ? (
        <select id={props.name} {...field} {...props}>
          {props.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input id={props.name} {...field} {...props} />
      )}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const Reservation = () => {
  //TODO: get times from db based on selected date
  const availTimes = ["dhai", "teen", "sarhe char"];
  const handleSubmit = (values) => {
    console.log(values);
    fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json().then((res) => console.log(res.message));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Formik
      initialValues={{
        persons: "",
        date: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        specialRequest: "",
      }}
      validationSchema={Yup.object({
        date: Yup.date().required(),
        persons: Yup.number().min(1, "min 1 person").max(10).required(),
        time: Yup.string().required(),
        occasion: Yup.string().optional(),
        firstname: Yup.string()
          .required("No name no party")
          .min(1, "Name must be at least one character long"),
        lastname: Yup.string().optional(),
        email: Yup.string().email(),
        specialrequest: Yup.string().optional(),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <TextInput label={"Persons"} name={"persons"} type={"text"}></TextInput>
        <TextInput label={"Date"} name={"date"} type={"date"}></TextInput>
        <TextInput
          label={"Time"}
          name={"time"}
          type={"time"}
          options={availTimes}
        ></TextInput>
        <TextInput
          label={"First Name"}
          name={"firstname"}
          type={"text"}
        ></TextInput>
        <TextInput
          name={"lastname"}
          label={"Last Name"}
          type={"text"}
        ></TextInput>
        <TextInput label={"Email"} name={"email"} type={"text"}></TextInput>
        <TextInput
          label={"Special Request"}
          name={"specialrequest"}
          type={"textarea"}
        ></TextInput>
        <button id={"submit"} type={"submit"}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default Reservation;
