"use client";
import serialize from "form-serialize";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: "true" });
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        response.text().then((text) => console.log(text));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername((prev) => e.target.value)}
          value={username}
          type="text"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword((prev) => e.target.value)}
          type="text"
          name="password"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
