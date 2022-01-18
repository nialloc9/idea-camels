import ReactDropzone from "react-dropzone";
import { styled, remCalc } from "../../utils/style";

export const DropZone = styled(ReactDropzone)`
  width: ${({ width = remCalc(100) }) => width};
  height: ${({ height = remCalc(100) }) => height};
  border-width: ${({ borderWidth = remCalc(2) }) => borderWidth};
  border-style: ${({ borderStyle = "dashed" }) => borderStyle};
  border-radius: ${({ borderRadius = remCalc(5) }) => borderRadius};
  border-color: ${({ borderColor = "#f4f4f2" }) => borderColor} !important;
  cursor: ${({ cursor = "pointer" }) => cursor};
`;
