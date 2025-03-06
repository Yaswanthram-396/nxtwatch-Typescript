import styled from "styled-components";
interface props {
  mode: boolean;
}
const Poper = styled.div<props>`
  position: fixed;
  z-index: 999;
  height: 200px;
  width: 32%;
  top: 40%;
  left: 36%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (!props.mode ? "#fff" : "rgb(33,33,33)")};
  border-radius: 10px;
  padding: 12px;
  @media (max-width: 600px) {
    width: 90% !important;
    top: 32% !important;
    left: 2% !important;
  }
  @media (min-width: 601px) and (max-width: 900px) {
    width: 56% !important;
    left: 20% !important;
  }
`;
const EntirePop = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PopBtn = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const CancelBtn = styled.button`
  color: rgb(148, 163, 184);
  font-size: 15px;
  cursor: pointer;
  padding: 15px 30px;
  border-radius: 5px;
  border: 1px solid rgb(148, 163, 184);
  background-color: transparent;
`;
const ConfirmBtn = styled.button`
  padding: 15px 30px;
  border-radius: 5px;
  border: 0px;
  background-color: rgb(59, 130, 246);
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

const LogoNavbar = styled.img`
  width: 100px;
`;

const NavbarList = styled.div`
  font-family: Roboto;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const LogoutSVG = styled.div`
  font-size: 24px;

  @media (min-width: 770px) {
    display: none;
  }
`;
const Poffile = styled.img`
  width: 32px;
    height: 32px;
    @media (max-width:771px) {
        display: none;
        `;

const LogoutBtn = styled.button`
  font-size: 16px;
  display: block;
  padding: 6px 16px;
  background-color: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 3px;
  @media (max-width: 771px) {
    display: none;
  }
`;
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0px 32px;
  align-items: center;
  height: 9vh;
`;
const ListElement = styled.li`
  list-style-type: none;
`;
const Heading3 = styled.h3<props>`
  color: ${(props) => (!props.mode ? "#000" : "#fff")};
`;
export {
  Poper,
  EntirePop,
  PopBtn,
  CancelBtn,
  ConfirmBtn,
  LogoNavbar,
  NavbarList,
  LogoutSVG,
  Poffile,
  LogoutBtn,
  NavbarContainer,
  Heading3,
  ListElement,
};
