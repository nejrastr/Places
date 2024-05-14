import React, { useEffect, useState, useContext } from "react";
import "./Auth.css";
import AuthContext from "../../shared/context/auth-contex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import Card from "../../shared/components/UIElements/Card";

const LogIn = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const logginFormHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };
  const validators = [
    { type: VALIDATOR_REQUIRE },
    { type: VALIDATOR_MINLENGTH, val: 5 },
  ];

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      name: { value: "", isValid: false },
    },
    false
  );

  const styles = {
    listStyle: "none",
    margin: "0 auto",
    padding: "1rem",
    width: "90%",
    maxWidth: "40rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    background: "white",
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLogin((prevMode) => !prevMode);
    console.log(formState.inputs);
  };
  return (
    <Card className="authentication">
      <form onSubmit={logginFormHandler}>
        <h2>Login Required</h2>
        {!isLogin && (
          <Input
            element="input"
            type="text"
            label="Name"
            id="name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          ></Input>
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          errorText="Please eneter a valid e-mail."
          onInput={inputHandler}
          value={formState.inputs.email.value}
          valid={formState.inputs.email.isValid}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_REQUIRE()]}
          errorText="Please eneter a valid password."
          onInput={inputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={logginFormHandler}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>
      <Button type="submit" inverse onClick={switchModeHandler}>
        Switch To {isLogin ? "Sign Up" : "Log In"}
      </Button>
    </Card>
  );
};

export default LogIn;
