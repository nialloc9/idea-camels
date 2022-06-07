/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Link as A } from "theme-ui";
import { Link as MenuLink } from "react-scroll";
import Play from "./icons/play";

export function NavLink({ path, label, children, ...rest }) {
  return (
    <MenuLink
      to={path}
      spy={true}
      offset={-70}
      smooth={true}
      duration={500}
      className="nav-item"
      activeClass="active"
      {...rest}
    >
      {label}
    </MenuLink>
  );
}

export function Link({ path, label, children, ...rest }) {
  return (
    <A href={path} {...rest}>
      {children ? children : label}
    </A>
  );
}

export function LearnMore({ path, label, children, ...rest }) {
  return (
    <A sx={styles.learnMore} {...rest}>
      {label ?? "Learn More"} <Play />
    </A>
  );
}

const styles = {
  learnMore: {
    color: "primary",
    cursor: "pointer",
    fontSize: [1, null, null, null, "15px"],
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    svg: {
      ml: 2,
    },
  },
};
