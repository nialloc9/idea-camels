import logo from 'static/logo.png';
import logoColor from 'static/logoColor.png';
import block2Image from 'static/block2Image.webp';
import block4FirstImage from 'static/block4FirstImage.png';

const defaultFont = {
    color: '#2a2a2a',
    fontFamily: "'Darker Grotesque', sans-serif"
};

export default {
    breakpoints: {
        tablet: 768
    },
    navigation: {
        backgroundColor: '#f7c545',
        color: 'white',
        fontFamily: defaultFont.fontFamily,
        size: 'huge',
        button: {
            backgroundColor: '#DEAC2C',
            color: 'white'
        },
        logoSize: 23,
        logo
    },
    block1: {
        height: 700,
        width: 728,
        paddings: [0, 20, 0, 20],
        backgroundColor: 'white',
        logo: logoColor,
        headingSize: 60,
        headingLineHeight: 66,
        headingMargins: [40, 0, 0, 0],
        subHeadingLineHeight: 27,
        subHeadingSize: 27,
        subHeadingMargins: [40, 0, 40, 0],
        buttonSize: 'huge',
        ...defaultFont,
    },
    block2: {
        height: 700,
        image: block2Image
    },
    block3: {
        ...defaultFont,
        height: 900,
        backgroundColor: 'white',
        fontFamily: 'Jubilat, Georgia, sans-serif',
        overlay: {
            backgroundColor: 'white',
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
                size: 'huge',
                margins: [40, 0, 0, 0],
            },
            features: {
                headerPadding: 10,
                headerFontFamily: "'Brandon Grotesque', Arial, sans-serif",
                headerMargins: [40, 0, 0, 0],
                headerBackgroundColor: '#f7c545',
                featuresMargins: [40, 0, 0, 0],
            }
        }
    },
    block4: {
        ...defaultFont,
        fontFamily: "Jubilat, Georgia, sans-serif",
        height: 700,
        backgroundColor: '#f4f4f2',
        paddings: [0, 20, 0, 20],
        headingContainerPaddings: [40, 0, 0, 0],
        heading: {
            size: 50,
            weight: 200,
            lineHeight: 57,
        },
        subHeading: {
            size: 18,
            lineHeight: 25,
            weight: 400,
            color: '#686868',
            margins: [-10, 0, 0, 0]
        },
        cardContainer: {
            width: 1000,
            margins: [40, 0, 0, 0]
        },
        firstCard: {
            block4FirstImage
        },
        button: {
            size: 'huge',
            margins: [40, 0, 0, 0]
        }
    }
}