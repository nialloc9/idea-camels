export { default as styled } from "@emotion/styled";
export { ThemeProvider, withTheme } from "emotion-theming";

/**
 * turns px into rem
 * @param pixels
 * @returns {string}
 */
export const remCalc = (pixels) => {
    return `${(pixels / 16).toFixed(4)}rem`;
};

export const createMediaQuery = (breakpoint) =>
    `@media (min-width: ${breakpoint}px)`;

export const getMarginsOrPaddings = (values) => {
    if (!Array.isArray(values)) {
        return String(values)
            .split(" ")
            .map((o) => remCalc(o).join(" "));
    }

    return `${remCalc(values[0])} ${remCalc(values[1])} ${remCalc(
        values[2]
    )} ${remCalc(values[3])}`;
};
