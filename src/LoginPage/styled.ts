import styled from "styled-components";

const NxwLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const LoginField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 25%;
  height: 44%;
  padding: 34px;
  justify-content: space-between;
  box-shadow: 0px 0px 25px #f1f1f1;
  @media (max-width: 600px) {
    width: 56%;
  }
  @media (min-width: 601px) and (max-width: 600px) {
    width: 56%;
  }
`;
const LogoImageCon = styled.div`
  text-align: center;
`;
const LogoImage = styled.img`
  width: 50%;
`;

const LoginInputFildsBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputsWithbtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UsernameCon = styled.div`
  display: flex;
  flex-direction: column;
  color: #909090;
  gap: 8px;
`;
const UsernameHeading = styled.p`
  margin: 0px;
  font-size: 14px;
  font-weight: 500;
`;
const UserInput = styled.input`
  height: 32px;
  width: 94%;
  border: 1px solid #cccccc;
  padding: 5px;
  padding-left: 12px;
  font-size: 14px;
  border-radius: 4px;
`;
const PasswordCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #909090;
`;
const LoginButton = styled.button`
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 600;
  background-color: #4f46e5;
  color: #fff;
  border: 0px;
  border-radius: 8px;
  width: 100%;
`;
const Error = styled.p`
  margin: 0px;
  margin-top: 8px;
  color: #ff0b37;
`;
export {
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
};
