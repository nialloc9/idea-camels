import React from "react";
import EditableBackgroundImage from "../../../../common/EditableBackgroundImage";
import { withTheme, remCalc } from "../../../../../utils/style";

export default withTheme(
  ({
    content: {
      block2: {
        image: { src },
      },
    },
    theme: {
      block2: { height, backgroundRepeat },
    },
    onSetExperiment,
  }) => (
    <EditableBackgroundImage
      src={src}
      height={height}
      backgroundRepeat={backgroundRepeat}
      editMinHeight={remCalc(400)}
      action="template-edit-background-image-click"
      label="block-2"
      onSubmit={(url) =>
        onSetExperiment({
          content: { block2: { image: { src: url } } },
        })
      }
    />
  )
);
