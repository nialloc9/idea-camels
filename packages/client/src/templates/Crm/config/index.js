import content from "./content.json";
import theme1 from "./theme.json";
import theme2 from "./theme2.json";
import theme3 from "./theme3.json";

export default {
  ref: 2,
  name: "CRM Default",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 2,
      name: "Default",
      theme: theme1,
    },
    {
      ref: 2,
      templateRef: 2,
      name: "Professional",
      theme: theme2,
    },
    {
      ref: 3,
      templateRef: 2,
      name: "Crayola",
      theme: theme3,
    },
  ],
};
