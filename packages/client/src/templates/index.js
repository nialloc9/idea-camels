import IdeaCamelsDefault, {
  config as ideaCamelsDefaultConfig,
} from "./IdeaCamelsDefault";

const templates = [
  {
    ref: ideaCamelsDefaultConfig.ref,
    template: IdeaCamelsDefault,
    config: ideaCamelsDefaultConfig,
  },
];

/**
 * @description find template from templateRef
 * @param {*} templateRef
 * @returns
 */
export const findTemplate = (templateRef) =>
  templates.find((o) => o.ref === templateRef);

/**
 * @description find themes from themeRef
 * @param {*} themeRef
 * @returns [themes]
 */
export const findThemeAndContent = ({ templateRef, themeRef }) => {
  const {
    config: { themes, content },
  } = findTemplate(templateRef);

  const theme = themes.find(({ ref }) => themeRef === ref);

  return { theme, content };
};

export default templates;
