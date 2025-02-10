import { type JSX, useState } from "react"
import { Link } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"
import "./RegisterRoute.css"

function RegisterRoute(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /// Handle form submission with Redux and backend integration
  }

  return (
    <div className="signup">
      <div className="signup__container container">
        <div className="signup__form-wrapper">
          <h1 className="signup__title">LET'S GET ACQUAINTED</h1>
          <form className="signup__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input type="text" placeholder="ENTER YOUR USERNAME" className="form__input" required />
            </div>

            <div className="form__group">
              <input type="email" placeholder="ENTER YOUR EMAIL" className="form__input" required />
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="ENTER YOUR PASSWORD"
                  className="form__input"
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="REPEAT YOUR PASSWORD"
                  className="form__input"
                  required
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
              <input type="date" placeholder="DATE-OF-BIRTH" className="form__input" required />
            </div>

            <div className="form__group">
              <select className="form__input" required>
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
  )
}

export default RegisterRoute

