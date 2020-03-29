import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";
import { SIGNUP } from "../Mutation/AuthMutation";
import { LOG_IN } from "../Query/AuthQuery";
import { LOCAL_LOGIN } from "../Mutation/AuthMutation";
import { useMutation, useQuery } from "@apollo/react-hooks";
/////////////////css///////////////////////////
const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  width: 350px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
///////////////////////////////////////////
export default () => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const password = useInput("");
  const bio = useInput("");
  const email = useInput("");
  const [createUser] = useMutation(SIGNUP);
  const [setToken] = useMutation(LOCAL_LOGIN);
  const { loading, data } = useQuery(LOG_IN, {
    variables: {
      email: email.value,
      password: password.value
    }
  });
  /////////////onSubmit////////////////
  const onLogIn = async e => {
    e.preventDefault();

    if (email.value !== "" && password.value !== "" && data.logIn !== null) {
      setToken({
        variables: {
          token: data.logIn
        }
      });
      email.setValue("");
      password.setValue("");
    } else {
      alert("유저 정보가 일치하지 않습니다.");
    }
  };

  const onSignUp = async e => {
    e.preventDefault();

    if (email.value !== "" && password.value !== "" && name.value !== "") {
      try {
        await createUser({
          variables: {
            email: email.value,
            password: password.value,
            name: name.value,
            bio: bio.value
          }
        });
        email.setValue("");
        password.setValue("");
        name.setValue("");
        bio.setValue("");
        setAction("logIn");
        alert("회원가입에 성공하였습니다.");
        window.location.reload();
      } catch (error) {
        alert("유저정보가 이미 존재합니다.");
        console.log(error);
      }
    }
  };
  //////////////////////////////////////////
  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form onSubmit={onLogIn}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        ) : (
          <form onSubmit={onSignUp}>
            <Input placeholder={"name"} {...name} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"bio"} {...bio} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Sign up"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
