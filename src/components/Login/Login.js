import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
    try {
      const url = "http://localhost:3000/api/user/login";
      const { data: res } = await axios.post(url, user);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "이메일을 입력하세요.";
    } else if (!regex.test(values.email)) {
      errors.email = "이메일 형식이 아닙니다.";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요.";
    } else if (values.password.length < 6) {
      errors.password = "비밀번호는 최소 6자리 이상 필수";
    }
    return errors;
  };

  return (
    <div className="form-content">
      <form className="form">
        <h1>로그인</h1>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            name="email"
            value={user.email}
            required
            onChange={handleChange}
            placeholder="이메일을 입력하세요."
            type="text"
            className="form-input"
          />
          <p>{formErrors.email}</p>
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            value={user.password}
            required
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            type="password"
            className="form-input"
          />
          <p>{formErrors.password}</p>
        </div>
        <div className="form-btn">
          <button
            type="submit"
            className="form-input-btn"
            onClick={handleSubmit}
          >
            로그인
          </button>
          <button className="form-input-btn">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              취소
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
