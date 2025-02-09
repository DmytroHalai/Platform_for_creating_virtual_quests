"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import "./LoginRoute.css"
import {JSX} from 'react';

interface LoginFormData {
  email: string
  password: string
}

interface ValidationErrors {
  email?: string
  password?: string
}

function LoginRoute(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  const validateField = (name: string, value: string) => {
    let error = ""

    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "password":
        if (value.length < 1) {
          error = "Password is required"
        }
        break
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate all fields before submission
    const errors: ValidationErrors = {}
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value)
      if (error) {
        errors[name as keyof ValidationErrors] = error
      }
    })

    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      try {
        /// Make API call to login
        /// const response = await fetch('/api/login', {
        ///   method: 'POST',
        ///   headers: {
        ///     'Content-Type': 'application/json',
        ///   },
        ///   body: JSON.stringify(formData),
        /// });
        ///
        /// if (!response.ok) {
        ///   throw new Error('Invalid credentials');
        /// }
        ///
        /// const data = await response.json();
        /// Handle successful login (e.g., store token, redirect)
      } catch (err) {
        setError("Invalid email or password")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSocialLogin = (provider: string) => {
    /// Implement social login logic here
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__form-wrapper">
          <h1 className="login__title">HELLO AGAIN!</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                name="email"
                placeholder="ENTER YOUR EMAIL"
                className={`form__input ${validationErrors.email ? "form__input--error" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {validationErrors.email && <span className="form__error">{validationErrors.email}</span>}
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="ENTER YOUR PASSWORD"
                  className={`form__input ${validationErrors.password ? "form__input--error" : ""}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {validationErrors.password && <span className="form__error">{validationErrors.password}</span>}
            </div>

            {error && <div className="form__error form__error--general">{error}</div>}

            <button type="submit" className="login__button" disabled={isLoading}>
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>

            <div className="login__register-link">
              <p>DON'T HAVE AN ACCOUNT?</p>
              <Link to="/register" className="register-now">
                REGISTER NOW
              </Link>
            </div>

            <div className="social-login">
              <p className="social-login__title">LOG IN VIA</p>
              <div className="social-login__buttons">
                <button type="button" className="social-button" onClick={() => handleSocialLogin("instagram")}>
                  <Instagram />
                </button>
                <button type="button" className="social-button" onClick={() => handleSocialLogin("twitter")}>
                  <Twitter />
                </button>
                <button type="button" className="social-button" onClick={() => handleSocialLogin("linkedin")}>
                  <Linkedin />
                </button>
                <button type="button" className="social-button" onClick={() => handleSocialLogin("facebook")}>
                  <Facebook />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginRoute

