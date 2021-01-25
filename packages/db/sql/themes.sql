USE idea_camels;

DROP TABLE IF EXISTS themes;

CREATE TABLE themes
(
  theme_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  content TEXT,
  theme TEXT,
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (theme_ref)
);

INSERT INTO `idea_camels`.`themes`
(
  `theme_ref`,
  `name`,
  `content`,
  `theme`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`
)
VALUES
  (
    1,
    "ideacamels",
    '"navigation":{"logo":{"src":"test","alot":"Logo text."},"items":[{"text":"About Us","href":"coming-soon"},{"text":"Products","href":"comint-soon"},{"text":"Sign Up","href":"comint-soon"}]},"block1":{"logo":{"src":"test","alt":"test"},"heading":{"text":"Have an idea? Not sure if it is worth doing?"},"subHeading":{"text":"Find out are people searching for your idea. All in under 1 hour!!"},"button":{"text":"Buy Now"}},"block2":{"image":{"src":"test"}},"block3":{"heading":{"text":"Welcome to Idea Camels"},"mainText":{"text":"Combining a super modern UI with paid search to create a landing page and drive traffic to it based on other internet users search keywords. Do not spend time creating a fully fleged site when all you want to know is it worth the development time. Instead you can know in a matter of days if your new idea is worth persuing."},"button":{"text":"Learn More"},"featureHeader":{"text":"FEATURES"},"features":[{"header":{"text":"Validation"},"description":{"text":"Idea Camels combines paid search with simplified landing pages to tell you are people searching for your answer to their problem. By providing reports and a list of emails of people who interacted with your idea page you can be sure your idea is one worth doing."}},{"header":{"text":"Simple"},"description":{"text":"SEO, Development, Paid Search. A never ending list of hoops to jump through and all you want is to know 'is it worth doing?'. Idea Camels simplifies all of this by providing one seamless experience to provide feedback on your idea as soon as possible."}},{"header":{"text":"Fast"},"description":{"text":"Whether you are a developer, marketing exec, or any other are of the business who wants to wait months to know if people even want your product? Idea Camels can provide your with the validation you need to move your idea into development."}}]},"block4":{"heading":{"text":"Start Creating!"},"subHeading":{"text":"Do not waste time on development and validate your idea now."},"card":{"image":{"src":"test","alt":"test"},"heading":{"text":"Test your ideas"},"subHeading":{"text":"Rapidly test an idea by creating a landing page and testing adwords to see if it is worth continuing. All in one place."},"button":{"text":"Get Started"}}},"block5":{"carousel":[{"image":{"src":"test","alt":""},"header":{"text":"Create a landing page in minutes from our predesigned templates"}},{"image":{"src":"test","alt":""},"header":{"text":"Register keywords and a budget to drive traffic to your landing page"}},{"image":{"src":"test","alt":""},"header":{"text":"Analysis the results and build an email list of interested customers"}}],"quote":{"text":"Gut feelings have no place in a world where data driven assumptions can be made."},"author":{"text":"Tim Ford, Marketing Director"},"button":{"text":"JOIN US"}},"footer":{"column1":{"image":{"src":"test","alt":"test"},"text":{"text":"Idea Camels"}},"column2":[{"text":"Contact Us","action":"footer-contact"},{"text":"Terms And Conditions","action":"footer-t&q"},{"text":"Privacy","action":"footer-privacy"},{"text":"Cookies Policy","action":"footer-policy"}],"column3":[{"href":"/coming-soon","action":"footer-facebook","name":"facebook"},{"href":"/coming-soon","action":"footer-twitter","name":"twitter"},{"href":"/coming-soon","action":"footer-linkedin","name":"linkedin"}]}}',
    '{"colors":{"main000":"#f7c545","main001":"#DEAC2C","text000":"#2a2a2a","white000":"white","gray000":"#f4f4f2","gray001":"#686868"},"fonts":{"font000":"Darker Grotesque, sans-serif","font001":"Cairo, Playfair Display, sans-serif","font002":"Josefin Sans, Archivo Narrow, sans-serif"},"defaultFont":{"color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif"},"logos":{"main000":"test"},"breakpoints":{"tablet":768,"computer":1024,"computerLarge":1280,"computerXLarge":1920,"computerXXLarge":2568},"infoMessage":{"textAlign":"center"},"navigation":{"backgroundColor":"#f7c545","color":"white","fontFamily":"Darker Grotesque, sans-serif","size":"huge","button":{"backgroundColor":"#DEAC2C","color":"white"},"logoSize":23},"block1":{"height":700,"width":728,"paddings":[0,20,0,20],"backgroundColor":"white","logo":"test","headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"subHeadingLineHeight":27,"subHeadingSize":27,"subHeadingMargins":[40,0,40,0],"buttonSize":"huge","color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif"},"block2":{"height":700,"image":"test","backgroundRepeat":"no-repeat"},"block3":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":650,"backgroundColor":"white","overlay":{"backgroundColor":"white","width":1000,"minHeight":500,"top":-210,"padding":50,"headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"headingWeight":800,"mainText":{"fontSize":22,"lineHeight":40,"fontWeight":400,"margins":[40,0,0,0]},"button":{"size":"huge","margins":[40,0,0,0]},"features":{"headerPadding":10,"headerFontFamily":"Josefin Sans, Archivo Narrow, sans-serif","headerMargins":[40,0,0,0],"headerBackgroundColor":"#f7c545","featuresMargins":[40,0,0,0]}}},"block4":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":700,"backgroundColor":"#f4f4f2","paddings":[0,20,40,20],"heading":{"size":50,"weight":200,"lineHeight":57},"subHeading":{"size":18,"lineHeight":25,"weight":400,"color":"#686868","margins":[-10,0,0,0]},"cardContainer":{"width":1000,"margins":[60,0,0,0],"paddings":[40,40,40,40]},"firstCard":{"image":{"size":"small"}},"button":{"size":"large","margins":[40,0,0,0]}},"block5":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":700,"backgroundColor":"white","paddings":[20,20,0,20],"quoteContainerPaddings":[0,0,0,0],"card":{"width":1000},"carousel":{"size":"huge","textAlign":"center","image1":"test","image2":"test","image3":"test"},"quote":{"size":50,"weight":200,"lineHeight":57},"author":{"size":18,"lineHeight":25,"weight":400,"color":"#686868","margins":[-10,0,0,0]},"cardContainer":{"width":1000,"margins":[60,0,0,0],"paddings":[40,40,40,40]},"button":{"size":"huge","margins":[40,0,0,0],"backgroundColor":"#f7c545"}},"footer":{"color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif","size":20,"height":400,"paddings":[60,0,0,0],"backgroundColor":"#f4f4f2","column1":{"imageSize":"mini"},"column2":{"color":"#2a2a2a","hoverColor":"#f7c545"},"column3":{"iconColor":"#f7c545","iconSize":"small"}},"comingSoon":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","width":800,"backgroundColor":"#f4f4f2","paddings":[0,20,0,20],"headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"subHeadingLineHeight":27,"subHeadingSize":27,"subHeadingMargins":[40,0,40,0],"signUpWidth":500,"button":{"size":"large","margins":[40,0,0,0]}}}',
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1,
    0
);