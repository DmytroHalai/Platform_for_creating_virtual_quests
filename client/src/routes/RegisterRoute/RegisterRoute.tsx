import { JSX, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './RegisterRoute.css';
import service from '../../services/service';
import { API_ENDP_REGISTER } from '../../services/api';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProfile } from '../../store/features/auth/thunks';

function RegisterRoute(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const  auth  = useSelector<any>((state) => state.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // debugging
    e.preventDefault();

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      // input validation
      setError('Password and confirmation must be the same. Please re-enter.');
      console.log(error);
    } else {
      try {
        const formData = {
          username: usernameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          dateOfBirth: dateRef.current?.value,
          gender: genderRef.current?.value,
        };

        await service.post(API_ENDP_REGISTER, formData);

        alert("Check your email and confirm"); // text

        dispath(fetchProfile());

        formRef.current?.reset();

        navigate('/')

      } catch (err: any) {
        console.log(err);
        alert(err.message);
        
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup__container container">
        <div className="signup__form-wrapper">
          <h1 className="signup__title">LET'S GET ACQUAINTED</h1>
          <form className="signup__form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form__group">
              <input
                ref={usernameRef}
                type="text"
                name="username"
                placeholder="ENTER YOUR USERNAME"
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="ENTER YOUR EMAIL"
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <div className="password-input">
                <input
                  name="password"
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="ENTER YOUR PASSWORD"
                  className="form__input"
                  required
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
                  name="confirmPasswor"
                  ref={confirmPasswordRef}
                  type={showConfirmPassword ? 'text' : 'password'}
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
              <input
                name="dateOfBirth"
                ref={dateRef}
                type="date"
                placeholder="DATE-OF-BIRTH"
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <select
                name="gender"
                ref={genderRef}
                className="form__input"
                required
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
