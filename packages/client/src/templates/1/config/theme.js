
const MAIN_000 = "lightgrey";
const MAIN_001 = "grey";

const TEXT_000 = "#2a2a2a";

const WHITE_000 = "white";

const FONT_000 = "'Darker Grotesque', sans-serif";
const FONT_001 = "Cairo, 'Playfair Display', sans-serif";
const FONT_002 = "'Josefin Sans', 'Archivo Narrow', sans-serif";

const GRAY_000 = "#f4f4f2";
const GRAY_001 = "#686868";

const defaultFont = {
  color: TEXT_000,
  fontFamily: FONT_000,
};

export default {
  colors: {
    main000: MAIN_000,
    main001: MAIN_001,
    text000: TEXT_000,
    white000: WHITE_000,
    gray000: GRAY_000,
    gray001: GRAY_001,
  },
  fonts: {
    font000: FONT_000,
    font001: FONT_001,
    font002: FONT_002,
  },
  defaultFont: {
    color: TEXT_000,
    fontFamily: FONT_000,
  },
  // landing page
  breakpoints: {
    tablet: 768,
    computer: 1024,
    computerLarge: 1280,
    computerXLarge: 1920,
    computerXXLarge: 2568,
  },
  infoMessage: {
    textAlign: "center",
  },
  navigation: {
    backgroundColor: MAIN_000,
    color: WHITE_000,
    fontFamily: defaultFont.fontFamily,
    size: "huge",
    button: {
      backgroundColor: MAIN_001,
      color: WHITE_000,
    },
    logoSize: 23
  },
  block1: {
    height: 700,
    width: 728,
    paddings: [0, 20, 0, 20],
    backgroundColor: WHITE_000,
    headingSize: 60,
    headingLineHeight: 66,
    headingMargins: [40, 0, 0, 0],
    subHeadingLineHeight: 27,
    subHeadingSize: 27,
    subHeadingMargins: [40, 0, 40, 0],
    buttonSize: "huge",
    ...defaultFont,
  },
  block2: {
    height: 700,
    backgroundRepeat: "repeat",
  },
  block3: {
    ...defaultFont,
    height: 650,
    backgroundColor: WHITE_000,
    fontFamily: FONT_001,
    overlay: {
      backgroundColor: WHITE_000,
      width: 1000,
      minHeight: 500,
      top: -210,
      padding: 50,
      headingSize: 60,
      headingLineHeight: 66,
      headingMargins: [40, 0, 0, 0],
      headingWeight: 800,
      mainText: {
        fontSize: 22,
        lineHeight: 40,
        fontWeight: 400,
        margins: [40, 0, 0, 0],
      },
      button: {
        size: "huge",
        margins: [40, 0, 0, 0],
      },
      features: {
        headerPadding: 10,
        headerFontFamily: FONT_002,
        headerMargins: [40, 0, 0, 0],
        headerBackgroundColor: MAIN_000,
        featuresMargins: [40, 0, 0, 0],
      },
    },
  },
  block4: {
    ...defaultFont,
    fontFamily: FONT_001,
    height: 700,
    backgroundColor: GRAY_000,
    paddings: [0, 20, 40, 20],
    heading: {
      size: 50,
      weight: 200,
      lineHeight: 57,
    },
    subHeading: {
      size: 18,
      lineHeight: 25,
      weight: 400,
      color: GRAY_001,
      margins: [-10, 0, 0, 0],
    },
    cardContainer: {
      width: 1000,
      margins: [60, 0, 0, 0],
      paddings: [40, 40, 40, 40],
    },
    firstCard: {
      image: {
        size: "small",
      },
    },
    button: {
      size: "large",
      margins: [40, 0, 0, 0],
    },
  },
  block5: {
    ...defaultFont,
    fontFamily: FONT_001,
    height: 700,
    backgroundColor: WHITE_000,
    paddings: [20, 20, 0, 20],
    quoteContainerPaddings: [0, 0, 0, 0],
    card: {
      width: 1000,
    },
    carousel: {
      size: "huge",
      textAlign: "center",
    },
    quote: {
      size: 50,
      weight: 200,
      lineHeight: 57,
    },
    author: {
      size: 18,
      lineHeight: 25,
      weight: 400,
      color: GRAY_001,
      margins: [-10, 0, 0, 0],
    },
    cardContainer: {
      width: 1000,
      margins: [60, 0, 0, 0],
      paddings: [40, 40, 40, 40],
    },
    button: {
      size: "huge",
      margins: [40, 0, 0, 0],
      backgroundColor: MAIN_000,
    },
  },
  footer: {
    ...defaultFont,
    size: 20,
    height: 400,
    paddings: [60, 0, 0, 0],
    backgroundColor: GRAY_000,
    column1: {
      imageSize: "mini",
    },
    column2: {
      color: TEXT_000,
      hoverColor: MAIN_000,
    },
    column3: {
      iconColor: MAIN_000,
      iconSize: "small",
    },
  },
  comingSoon: {
    ...defaultFont,
    width: 800,
    fontFamily: FONT_001,
    backgroundColor: GRAY_000,
    paddings: [0, 20, 0, 20],
    headingSize: 60,
    headingLineHeight: 66,
    headingMargins: [40, 0, 0, 0],
    subHeadingLineHeight: 27,
    subHeadingSize: 27,
    subHeadingMargins: [40, 0, 40, 0],
    signUpWidth: 500,
    button: {
      size: "large",
      margins: [40, 0, 0, 0],
    },
  },
};