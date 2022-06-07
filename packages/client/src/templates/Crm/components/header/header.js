/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Button } from "theme-ui";
import { useState } from "react";
import Sticky from "react-stickynode";
import { DrawerProvider } from "../../contexts/drawer/drawer-provider";
import NavbarDrawer from "./navbar-drawer";
import Logo from "../logo";
import { Link } from "../link";

export default function Header({ content, config, onSetExperiment }) {
  const [state, setState] = useState({
    isMobileMenu: false,
    isSticky: false,
  });
  const handleStateChange = (status) => {
    status.status === Sticky.STATUS_FIXED
      ? setState({ ...state, isSticky: true })
      : setState({ ...state, isSticky: false });
  };

  return (
    <DrawerProvider>
      <Sticky
        enabled={true}
        top={0}
        activeClass="is-sticky"
        innerZ={100}
        onStateChange={handleStateChange}
      >
        <header
          sx={styles.header}
          className={state.isSticky ? "is-sticky" : ""}
        >
          <Container sx={styles.container}>
            <Logo
              content={content}
              config={config}
              isSticky={state.isSticky}
              sx={styles.logo}
            />
            <nav as="nav" sx={styles.navbar}>
              {content.header.items.map((item, i) => (
                <Link
                  key={i}
                  path="#"
                  label={item}
                  className={state.isSticky ? "is-sticky" : ""}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                />
              ))}
            </nav>
            <Button variant="primary" sx={styles.button}>
              {content.header.button.text}
            </Button>
            <NavbarDrawer
              content={content}
              onSetExperiment={onSetExperiment}
              isSticky={state.isSticky}
            />
          </Container>
        </header>
      </Sticky>
    </DrawerProvider>
  );
}

const styles = {
  header: {
    backgroundColor: "transparent",
    position: "fixed",
    left: 0,
    right: 0,
    py: [5],
    transition: "all 0.3s ease-in-out 0s",
    "&.is-sticky": {
      backgroundColor: "white",
      boxShadow: "0px 20px 50px #3b5a88",
      py: [3],
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navbar: {
    display: ["none", null, null, null, "flex"],
    alignItems: "center",
    a: {
      color: "white",
      cursor: "pointer",
      display: ["flex"],
      fontWeight: 400,
      padding: 0,
      transition: "all 0.3s ease-in-out 0s",
      "+ a": {
        ml: [null, null, null, null, 4, 7],
      },
    },
    ".is-sticky": {
      color: "text",
    },
    ".active": {
      color: "primary",
    },
  },
  button: {
    display: ["none", null, null, null, "inline-flex"],
    minHeight: 45,
    px: "18px",
  },
};
