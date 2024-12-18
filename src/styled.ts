import styled, { createGlobalStyle } from "styled-components";
interface AppStyleProps {
  mode: boolean;
}
export const AppStyle = styled.div<AppStyleProps>`
  position: relative;
  background-color: ${(props) => (props.mode ? "#23231D" : "white")};
  color: ${(props) => (props.mode ? "white" : "black")};
`;

export const GlobalStyle = createGlobalStyle`
  
  body {
    font-family:poppins; 
    margin: 0px;}
a{
    text-decoration: none;
}

form {
    display: flex;
  }
  div{
      font-family: Roboto;
    }
     
`;
