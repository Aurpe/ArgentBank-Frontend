import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../common/LoginForm";
import "../loginpage/LoginPage.scss";
import { loginUser } from "../../api/fetchLoginUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main>
      <section>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
