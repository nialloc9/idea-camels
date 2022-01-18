import React from 'react'
import { styled } from "../../utils/style";
import SemanticMessage from 'semantic-ui-react/dist/commonjs/collections/Message'

export const Message = styled(({width, margin, textAlign, visited, ...rest}) => (
    <SemanticMessage {...rest} />
))`
${({width = false}) => width && `width: ${width};`}
    ${({margin = false}) => margin && `margin: ${margin};`}
    ${({textAlign = false}) => textAlign && `text-align: ${textAlign};`}
`

