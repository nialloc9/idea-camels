/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import EditableImageContainer from "../../common/EditableImageContainer";

export default function Logo({
  content,
  config,
  isSticky,
  light,
  dark,
  onSetContent,
  ...props
}) {
  return (
    <EditableImageContainer
      component={Image}
      src={content.logo.image.src}
      alt={content.logo.image.alt}
      onSubmit={(src) => ({ logo: { image: { src } } })}
    />
  );
}
