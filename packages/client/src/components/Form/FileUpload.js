import React from "react";
import { useDropzone } from "react-dropzone";
import { Error } from "./Error";
import { Block } from "../Styled/Block";
import { Icon } from "../Styled/Icon";
import { Label } from "../Styled/Label";
import { remCalc } from "../../utils/style";
import withAnalytics from "../../hoc/withAnalytics";

/**
 *
 * @param string label
 * @param string accept e.g "image/jpeg, image/png"
 * @param string error
 * @param number maxFiles
 * @param func onSubmit
 * @param func onError
 * @param bool disabled
 * @param number minSize: in bytes
 * @param number maxSize: in bytes
 */
export const FileUpload = withAnalytics(
  ({
    label,
    accept,
    error,
    maxFiles = 1,
    onSubmit,
    onError,
    onCancel,
    disabled = false,
    minSize,
    maxSize,
    text,
  }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDropAccepted: onSubmit,
      onDropRejected: onError,
      onFileDialogCancel: onCancel,
      accept,
      maxFiles,
      disabled,
      minSize,
      maxSize,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <Block
          display="flex"
          alignItems="center"
          textAlign="center"
          margin="33% 0 0 0"
          color="#686868"
          hoverOpacity="0.5"
          opacity={isDragActive ? "0.5" : "1"}
          borderStyle="dashed"
          cursor="pointer"
          border={`${remCalc(1)} dashed #686868`}
          borderRadius={remCalc(10)}
          padding={remCalc(5)}
        >
          {text && <Block>{text}</Block>}
          <Icon name="plus circle" size="big" color="#686868" />
          <Label cursor="pointer" label={label} />
        </Block>
        <Error error={error} />
      </div>
    );
  }
);
