import React from 'react';
import { EditableBackgroundImage, createImagePreview } from '../../Edit'
import { withTheme } from '../../../utils/style'

export default withTheme(({ content: { block2: { image: { src } } }, theme: { block2: {height, backgroundRepeat} }, onSetExperiment }) => 
<EditableBackgroundImage 
  src={src} 
  height={height} 
  backgroundRepeat={backgroundRepeat} 
  onSubmit={file => onSetExperiment({ content: { block2: { image: { src: createImagePreview(file) } } }, imageFiles: { block2: { image: { src: file } } } })} 
  />)
