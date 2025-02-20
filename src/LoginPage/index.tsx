import React from "react";
import Cookies from "js-cookie";
import ConfigurationContext, { ConfigurationContextType } from "../context";
import {
  NxwLogin,
  LoginField,
  LogoImageCon,
  LogoImage,
  LoginInputFildsBtn,
  InputsWithbtn,
  Inputs,
  UsernameCon,
  UsernameHeading,
  UserInput,
  PasswordCon,
  LoginButton,
  Error,
} from "./styled";

// Define state interface
interface UserLoginState {
  username: string;
  password: string;
  showPass: boolean;
  error: boolean;
}

class LoginPage extends React.Component<{}, UserLoginState> {
  static contextType = ConfigurationContext;
context!: ConfigurationContextType;

  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPass: false,  
      error: false,
    };
  }

  handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleShowPass = () => {
    this.setState((prevState) => ({ showPass: !prevState.showPass }));
  };
  handleSubmit = async () => {
    const { username, password, error } = this.state;
    try {
      const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      console.log(response);
      if (!response.ok) {
        console.log("try");
        this.setState((prevState) => ({
          ...prevState,
          error: !error,
        }));
        return;
      }

      const data = await response.json();
      const token = data.jwt_token;
      console.log(token);
      Cookies.set("jwt_token", token, { expires: 0.1 });

      console.log("Login successful! Token stored.");

      window.location.href = "/NxtWatch/Home";
    } catch (error) {
      console.log("There was a problem with the login request:", error);
      this.setState((prevState) => ({
        ...prevState,
        error: !error,
      }));
    }
  };
  render() {
    const { username, password, showPass, error } = this.state;
    const { mode } = this.context;
console.log(error)
    return (
      <NxwLogin>
        <LoginField>
          <LogoImageCon>
            <LogoImage
              src={
                mode
                  ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              }
              alt="logo"
            />
          </LogoImageCon>
          <LoginInputFildsBtn>
            <InputsWithbtn>
              <Inputs>
                {/* Username Input */}
                <UsernameCon>
                  <UsernameHeading>USERNAME</UsernameHeading>
                  <UserInput
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={this.handleChangeUsername}
                  />
                </UsernameCon>

                {/* Password Input */}
                <PasswordCon>
                  <UsernameHeading>PASSWORD</UsernameHeading>
                  <UserInput
                    type={showPass ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={this.handleChangePassword}
                  />
                </PasswordCon>
              </Inputs>

              {/* Show Password Checkbox */}
              <form>
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPass}
                  onChange={this.handleShowPass}
                />
                <label htmlFor="showPassword">Show password</label>
              </form>
            </InputsWithbtn>

            <LoginButton type="button" onClick={this.handleSubmit}>
              Login
            </LoginButton>

            {/* Error Message */}
            {error && <Error data-testid="Password-didn't-match">*Username or Password didn't match</Error>}
          </LoginInputFildsBtn>
        </LoginField>
      </NxwLogin>
    );
  }
}

export default LoginPage;
