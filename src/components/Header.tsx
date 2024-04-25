import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";
import { Theme } from "../styles/theme";
import { Link } from "react-router-dom";

export const Header = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const toggleState = useThemeStore((state) => state.theme);
  return (
    <Nav>
      <Logo>
        <Link to="/">
          <img src="/logo/logo.png" alt="" />
        </Link>
      </Logo>
      <NavMenu>
        <Link to="/">
          <img src="/icons/home-icon.svg" alt="Home" />
          <span>Home</span>
        </Link>
        {/* <Link to="/map">
          <img
            src="/icons/map.svg"
            alt="Map"
            style={{ width: "16px", height: "16px" }}
          />
          <span>Map</span>
        </Link> */}
      </NavMenu>
      <Wrapper>
        <ThemeButton onClick={toggleTheme}>
          {toggleState === "Light" ? "Dark" : "Light"}
        </ThemeButton>
      </Wrapper>
    </Nav>
  );
};

const Nav = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: #324c74;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 113px;
  img {
    display: block;
    width: 50px;
    height: 50px;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-start;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 75px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    text-decoration-line: none;
    img {
      height: 25px;
      min-width: 25px;
      width: 25px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 20px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      white-space: nowrap;
      position: relative;
      padding-top: 7px;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;
const Wrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ThemeButton = styled.button<{ theme: Theme }>`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease-in-out;
`;
