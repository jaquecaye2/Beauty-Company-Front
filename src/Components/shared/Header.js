import { useContext } from "react";
import Context from "../../Context/Context";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function Header() {
  const { openSidebar, setOpenSidebar, accessLevel, setToken } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  function canRenderHeader() {
    return !["/"].includes(location.pathname);
  }

  function logout() {
    setToken("")
    navigate("/");
  }

  function menu(){
    if (openSidebar){
      setOpenSidebar(false)
    } else {
      setOpenSidebar(true)
    }
    
  }

  // mudar o header de acordo com o usuario logo - se cliente adicionar no lado direito a fotinha

  return canRenderHeader() ? (
    <HeaderStyle>
      <div>
        <ion-icon onClick={menu} name="menu-outline"></ion-icon>
        <Link to={accessLevel === "company" ? ("/schedule/1") : ("/clientProfile")}>
          <div>
            <img src={logo} alt="logo da empresa" />
          </div>
        </Link>
      </div>
      <div>
        <ion-icon name="person-outline"></ion-icon>
        <ion-icon name="notifications-outline"></ion-icon>
        <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
      </div>
    </HeaderStyle>
  ) : null;
}

const HeaderStyle = styled.header`
  background-color: var(--cor-header);
  border: 1px solid var(--cor-lateral);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;

  a {
    text-decoration: none;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      margin: 0 0 0 10px;
      width: 175px;
    }

    h1 {
      font-size: 30px;
      color: var(--cor-detalhes);
    }
  }

  ion-icon {
    font-size: 30px;
    color: var(--cor-cinza);
    margin: 0 15px;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;
