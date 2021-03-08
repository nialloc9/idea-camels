import React from "react";
import {useDropzone} from 'react-dropzone'
import {Error} from "./Error";
import {Block} from "../Styled/Block";
import {Icon} from "../Styled/Icon";
import {Label} from "../Styled/Label";
import { remCalc } from "../../../../utils/style";

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
export const FileUpload = ({ iconSize="big", borderStyle="dashed", border=`${remCalc(1)}, dashed #686868`, padding=remCalc(5), label, accept, error, maxFiles=1, onSubmit, onError, disabled=false, minSize, maxSize }) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDropAccepted: onSubmit, onDropRejected: onError, accept, maxFiles, disabled, minSize, maxSize })
    
    return (
      <div {...getRootProps()}>
        
        <input {...getInputProps()} />
        
        <Block display="flex" alignItems="center" textAlign="center" color="#686868" hoverOpacity="0.5" opacity={isDragActive ? "0.5" : "1"} borderStyle={borderStyle} cursor="pointer" border={border} borderRadius={remCalc(10)} padding={padding}>
            <Icon name="plus circle" size={iconSize} color="#686868" />
            <Label cursor="pointer" label={label} />
        </Block>
        <Error error={error} />
      </div>
    )
  }