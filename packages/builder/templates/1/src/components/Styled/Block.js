import { styled, createMediaQuery } from "../../utils/style";

export const Block = styled.div`
    margin: ${({ margin = 0 }) => margin};
    padding: ${({ padding = 0 }) => padding};
    ${({ height = false }) => height && `height: ${height};`}
    ${({ wordBreak = false }) =>
        wordBreak && `word-break: ${wordBreak};`}
    ${({
        lineHeight = false,
    }) => lineHeight && `line-height: ${lineHeight};`}
    ${({
        textAlign = false,
    }) => textAlign && `text-align: ${textAlign};`}
    ${({
        verticalAlign = false,
    }) => verticalAlign && `vertical-align: ${verticalAlign};`}
    ${({
        display = false,
    }) => display && `display: ${display};`}
    ${({ background = false }) =>
        background && `background: ${background};`}
    ${({
        backgroundColor = false,
    }) => backgroundColor && `background-color: ${backgroundColor};`}
    ${({
        backgroundImage = false,
    }) =>
        backgroundImage &&
        `background-image: url("${backgroundImage}");`}
    ${({
        backgroundPosition = false,
    }) =>
        backgroundPosition &&
        `background-position: ${backgroundPosition};`}
    ${({
        backgroundPositionY = false,
    }) =>
        backgroundPositionY &&
        `background-position-y: ${backgroundPositionY};`}
    ${({
        backgroundRepeat = false,
    }) => backgroundRepeat && `background-repeat: ${backgroundRepeat};`}
    ${({
        backgroundSize = false,
    }) => backgroundSize && `background-size: ${backgroundSize};`}
    ${({
        position = false,
    }) => position && `position: ${position};`}
    ${({ width = false }) =>
        width && `width: ${width};`}
    ${({ float = false }) =>
        float && `float: ${float};`}
    ${({ border = false }) =>
        border && `border: ${border};`}
    ${({ opacity = false }) =>
        opacity && `opacity: ${opacity};`}
    ${({ minHeight = false }) =>
        minHeight && `min-height: ${minHeight};`}
    ${({
        maxHeight = false,
    }) => maxHeight && `max-height: ${maxHeight};`}
    ${({
        maxWidth = false,
    }) => maxWidth && `max-width: ${maxWidth};`}
    ${({ fontSize = false }) =>
        fontSize && `font-size: ${fontSize};`}
    ${({ fontWeight = false }) =>
        fontWeight && `font-weight: ${fontWeight};`}
    ${({
        wordSpacing = false,
    }) => wordSpacing && `word-spacing: ${wordSpacing};`}
    ${({
        color = false,
    }) => color && `color: ${color};`}
    ${({ overflow = false }) =>
        overflow && `overflow: ${overflow};`}
    ${({ overflowX = false }) =>
        overflowX && `overflow-x: ${overflowX};`}
    ${({
        overflowY = false,
    }) => overflowY && `overflow-y: ${overflowY};`}
    ${({ top = false }) =>
        top && `top: ${top};`}
    ${({ right = false }) =>
        right && `right: ${right};`}
    ${({ left = false }) =>
        left && `left: ${left};`}
    ${({ bottom = false }) =>
        bottom && `bottom: ${bottom};`}
    ${({ minWidth = false }) =>
        minWidth && `min-width: ${minWidth};`}
    ${({ border = false }) =>
        border && `border: ${border};`}
    ${({ borderRadius = false }) =>
        borderRadius && `border-radius: ${borderRadius};`}
    ${({
        cursor = false,
    }) => cursor && `cursor: ${cursor};`}
    ${({ textDecoration = false }) =>
        textDecoration && `text-decoration: ${textDecoration};`}
    ${({
        whiteSpace = false,
    }) => whiteSpace && `white-space: ${whiteSpace};`}
    ${({
        boxShadow = false,
    }) => boxShadow && `box-shadow: ${boxShadow};`}
    ${({ zIndex = false }) =>
        zIndex && `z-index: ${zIndex};`}
    ${({ justifyContent = false }) =>
        justifyContent && `justify-content: ${justifyContent};`}
    ${({ flexDirection = false }) =>
        flexDirection && `flex-direction: ${flexDirection};`}
    ${({
        borderBottom = false,
    }) => borderBottom && `border-bottom: ${borderBottom};`}
    ${({
        alignItems = false,
    }) => alignItems && `align-items: ${alignItems};`}
    ${({
        wordBreak = false,
    }) => wordBreak && `word-break: ${wordBreak};`}
    
    ${({
        theme: { breakpoints },
    }) => createMediaQuery(breakpoints.tablet)} {
        ${({ tabletBackground = false }) =>
            tabletBackground && `background: ${tabletBackground};`}
        ${({ tabletHeight = false }) =>
            tabletHeight && `height: ${tabletHeight};`}
        ${({
            tabletWidth = false,
        }) => tabletWidth && `width: ${tabletWidth};`}
        ${({
            tabletMaxHeight = false,
        }) => tabletMaxHeight && `max-height: ${tabletMaxHeight};`}
        ${({
            tabletMinHeight = false,
        }) => tabletMinHeight && `min-height: ${tabletMinHeight};`}
        ${({
            tabletDisplay = false,
        }) => tabletDisplay && `display: ${tabletDisplay};`}
        ${({
            tabletMargin = false,
        }) => tabletMargin && `margin: ${tabletMargin};`}
        ${({
            tabletPadding = false,
        }) => tabletPadding && `padding: ${tabletPadding};`}
        ${({
            tabletFontSize = false,
        }) => tabletFontSize && `font-size: ${tabletFontSize};`}
    }

    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.computer)} {
        ${({ computerMargin = false }) =>
            computerMargin && `margin: ${computerMargin};`}
        ${({ computerBackground = false }) =>
            computerBackground &&
            `background: ${computerBackground};`}
        ${({
            computerPadding = false,
        }) => computerPadding && `padding: ${computerPadding};`}
        ${({
            computerWidth = false,
        }) => computerWidth && `width: ${computerWidth};`}
        ${({
            computerHeight = false,
        }) => computerHeight && `height: ${computerHeight};`}
        ${({
            computerMinHeight = false,
        }) =>
            computerMinHeight &&
            `min-height: ${computerMinHeight};`}
        ${({
            computerMinWidth = false,
        }) => computerMinWidth && `min-width: ${computerMinWidth}`};
        ${({ computerMaxWidth = false }) =>
            computerMaxWidth && `max-width: ${computerMaxWidth}`};
    }

    ${({ theme: { breakpoints } }) =>
        createMediaQuery(breakpoints.computerLarge)} {
        ${({ computerLargeBackground = false }) =>
            computerLargeBackground &&
            `background: ${computerLargeBackground};`}
        ${({ computerLargeHeight = false }) =>
            computerLargeHeight &&
            `height: ${computerLargeHeight};`}
            ${({
            computerLargeMargin = false,
        }) => computerLargeMargin && `margin: ${computerLargeMargin};`}
    }

    &:hover {
        ${({ hoverColor = false }) => hoverColor && `color: ${hoverColor};`}
        ${({ hoverWidth = false }) =>
            hoverWidth && `width: ${hoverWidth};`}
        ${({
            hoverHeight = false,
        }) => hoverHeight && `height: ${hoverHeight};`}
        ${({
            hoverMargin = false,
        }) => hoverMargin && `margin: ${hoverMargin};`}
        ${({
            hoverPadding = false,
        }) => hoverPadding && `padding: ${hoverPadding};`}
        ${({
            hoverBorder = false,
        }) => hoverBorder && `border: ${hoverBorder};`}
        ${({
            hoverBoxShadow = false,
        }) => hoverBoxShadow && `box-shadow: ${hoverBoxShadow};`}
        ${({
            hoverTransition = false,
        }) => hoverTransition && `transition: ${hoverTransition};`}
        ${({
            hoverTransition = false,
        }) =>
            hoverTransition &&
            `-webkit-transition: ${hoverTransition};`}
        ${({
            hoverTransform = false,
        }) => hoverTransform && `-ms-transform: ${hoverTransform};`}
        ${({
            hoverTransform = false,
        }) =>
            hoverTransform &&
            `-webkit-transform: ${hoverTransform};`}
        ${({
            hoverTransform = false,
        }) => hoverTransform && `transform: ${hoverTransform};`}
        ${({
            hoverOpacity = false,
        }) => hoverOpacity && `opacity: ${hoverOpacity};`}
    }

    ::-webkit-scrollbar {
        ${({ scrollBarWidth = false }) =>
            scrollBarWidth && `width: ${scrollBarWidth};`}
        ${({ scrollBackgroundColor = false }) =>
            scrollBackgroundColor &&
            `background-color: ${scrollBackgroundColor};`}
      ${({
            scrollBarBorderRadius = false,
        }) =>
            scrollBarBorderRadius && `border-radius: ${scrollBarBorderRadius};`}
    }

    ::-webkit-scrollbar-thumb {
        ${({ scrollBarThumbBackgroundColor = false }) =>
            scrollBarThumbBackgroundColor &&
            `background-color: ${scrollBarThumbBackgroundColor};`}
        ${({ scrollBarThumbBorderRadius = false }) =>
            scrollBarThumbBorderRadius &&
            `border-radius: ${scrollBarThumbBorderRadius};`}
    }

    ${({ scrollBarFaceColor = false }) =>
        scrollBarFaceColor &&
        `::-webkit-scrollbar-face-color: ${scrollBarFaceColor};`}
    ${({ scrollBarArrowColor = false }) =>
        scrollBarArrowColor &&
        `::-webkit-scrollbar-arrow-color: ${scrollBarArrowColor};`}
    ${({
        scrollBarTrackColor = false,
    }) =>
        scrollBarTrackColor &&
        `::-webkit-scrollbar-track-color: ${scrollBarTrackColor};`}
    
    ${({
        filter = false,
    }) =>
        filter &&
        `-webkit-filter: ${filter};
    -moz-filter: ${filter};
    -o-filter: ${filter};
    -ms-filter: ${filter};
    filter: ${filter};`}

    ${({ backdropFilter = false }) =>
        backdropFilter &&
        `backdrop-filter: ${backdropFilter};  
    -webkit-backdrop-filter: ${backdropFilter};`}
    backdrop-filter: blur(2px);
`;
