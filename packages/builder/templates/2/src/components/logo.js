/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Link } from "components/link";
import { content, config } from "config";

export default function Logo({ isSticky, light, dark, ...props }) {
  return (
    <Link path={config.experiment.comingSoonUrl} sx={styles.logo} {...props}>
      <Image src={content.logo.image.src} alt={content.logo.image.alt} />
    </Link>
  );
}
const styles = {
  logo: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    img: {
      maxWidth: [128, null, "100%"],
      height: 37,
    },
  },
};
