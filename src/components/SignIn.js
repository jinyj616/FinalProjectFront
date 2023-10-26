import React, { useState } from "react";
import { login } from "../api/AuthAPI";
import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 260px;
  max-width: 100%;
`;

export const Form = styled.form`
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="password"] {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    color: #2c3e50;
  }

  button {
    display: block;
    width: 90%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    font-size: 18px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #45a049;
    }
  }
`;

export default function SignIn() {
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    login(values)
      .then((response) => {
        localStorage.setItem("tokenType", response.tokenType);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        window.location.href = `/`;
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  };

  return (
    <FormContainer>
      <FormWrapper>
        <h2 style={{ color: "#ecf0f1" }}>Log In</h2>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="ID"
              onChange={handleChange}
              value={values.userId}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <div className="form-group">
            <button type="submit">LogIn</button>
          </div>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
}