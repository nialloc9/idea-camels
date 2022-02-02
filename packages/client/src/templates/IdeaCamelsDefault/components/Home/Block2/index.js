import React from "react";
import { EditableBackgroundImage } from "../../Edit";
import { withTheme, remCalc } from "../../../../../utils/style";
import { createImagePreview } from "../../../../../utils/utils";

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
      onSubmit={(file) =>
        onSetExperiment({
          content: { block2: { image: { src: createImagePreview(file) } } },
          imageFiles: { block2: { image: { src: file } } },
        })
      }
    />
  )
);
