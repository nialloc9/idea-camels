/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "./link";

export default function Logo({
  content,
  config,
  isSticky,
  light,
  dark,
  ...props
}) {
  return <Image src={content.logo.image.src} alt={content.logo.image.alt} />;
}
const styles = {
  logo: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    img: {
      maxWidth: [128, null, "100%"],
    },
  },
};
