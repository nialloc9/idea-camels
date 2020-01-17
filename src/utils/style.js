export {default as styled} from '@emotion/styled';
export {ThemeProvider, withTheme} from 'emotion-theming';

/**
 * turns px into rem
 * @param pixels
 * @returns {string}
 */
export const remCalc = pixels => {
    return `${(pixels / 16).toFixed(4)}rem`;
};

export const createMediaQuery = breakpoint => `@media (min-width: ${breakpoint}px)`;