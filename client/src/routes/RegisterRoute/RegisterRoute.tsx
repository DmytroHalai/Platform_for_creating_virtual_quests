import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./RegisterRoute.css";
import { services } from "./registration";

function RegisterRoute(): JSX.Element {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
    };

    try {
      console.log(user);

      const response = await services.post(user);
      console.log("User registered:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container container">
        <div className="signup__form-wrapper">
          <h1 className="signup__title">LET'S GET ACQUAINTED</h1>
          <form className="signup__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="text"
                name="username"
                placeholder="ENTER YOUR USERNAME"
                className="form__input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <input
                type="email"
                name="email"
                placeholder="ENTER YOUR EMAIL"
                className="form__input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="ENTER YOUR PASSWORD"
                  className="form__input"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="REPEAT YOUR PASSWORD"
                  className="form__input"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            <div className="form__group">
              <input
                type="date"
                name="dateOfBirth"
                className="form__input"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <select
                name="gender"
                className="form__input"
                required
                onChange={handleChange}
              >
                <option value="">SELECT YOUR GENDER</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" className="signup__button">
              SIGN UP
            </button>

            <div className="signup__login-link">
              <p>ALREADY HAVE AN ACCOUNT?</p>
              <Link to="/login" className="login-now">
                LOG IN NOW
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterRoute;
