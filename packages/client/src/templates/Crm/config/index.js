import content from "./content.json";
import theme1 from "./theme.json";

export default {
  ref: 2,
  name: "CRM Default",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 2,
      name: "CRM Default",
      theme: theme1,
    },
  ],
};
