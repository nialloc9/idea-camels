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
    "{}",
    '{"colors":{"main000":"#f7c545","main001":"#DEAC2C","text000":"#2a2a2a","white000":"white","gray000":"#f4f4f2","gray001":"#686868"},"fonts":{"font000":"Darker Grotesque, sans-serif","font001":"Cairo, Playfair Display, sans-serif","font002":"Josefin Sans, Archivo Narrow, sans-serif"},"defaultFont":{"color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif"},"logos":{"main000":"test"},"breakpoints":{"tablet":768,"computer":1024,"computerLarge":1280,"computerXLarge":1920,"computerXXLarge":2568},"infoMessage":{"textAlign":"center"},"navigation":{"backgroundColor":"#f7c545","color":"white","fontFamily":"Darker Grotesque, sans-serif","size":"huge","button":{"backgroundColor":"#DEAC2C","color":"white"},"logoSize":23,"logo":{"src":"test"}},"block1":{"height":700,"width":728,"paddings":[0,20,0,20],"backgroundColor":"white","logo":"test","headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"subHeadingLineHeight":27,"subHeadingSize":27,"subHeadingMargins":[40,0,40,0],"buttonSize":"huge","color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif"},"block2":{"height":700,"image":"test","backgroundRepeat":"no-repeat"},"block3":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":650,"backgroundColor":"white","overlay":{"backgroundColor":"white","width":1000,"minHeight":500,"top":-210,"padding":50,"headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"headingWeight":800,"mainText":{"fontSize":22,"lineHeight":40,"fontWeight":400,"margins":[40,0,0,0]},"button":{"size":"huge","margins":[40,0,0,0]},"features":{"headerPadding":10,"headerFontFamily":"Josefin Sans, Archivo Narrow, sans-serif","headerMargins":[40,0,0,0],"headerBackgroundColor":"#f7c545","featuresMargins":[40,0,0,0]}}},"block4":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":700,"backgroundColor":"#f4f4f2","paddings":[0,20,40,20],"heading":{"size":50,"weight":200,"lineHeight":57},"subHeading":{"size":18,"lineHeight":25,"weight":400,"color":"#686868","margins":[-10,0,0,0]},"cardContainer":{"width":1000,"margins":[60,0,0,0],"paddings":[40,40,40,40]},"firstCard":{"image":{"src":"test","size":"small"}},"button":{"size":"large","margins":[40,0,0,0]}},"block5":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","height":700,"backgroundColor":"white","paddings":[20,20,0,20],"quoteContainerPaddings":[0,0,0,0],"card":{"width":1000},"carousel":{"size":"huge","textAlign":"center","image1":"test","image2":"test","image3":"test"},"quote":{"size":50,"weight":200,"lineHeight":57},"author":{"size":18,"lineHeight":25,"weight":400,"color":"#686868","margins":[-10,0,0,0]},"cardContainer":{"width":1000,"margins":[60,0,0,0],"paddings":[40,40,40,40]},"button":{"size":"huge","margins":[40,0,0,0],"backgroundColor":"#f7c545"}},"footer":{"color":"#2a2a2a","fontFamily":"Darker Grotesque, sans-serif","size":20,"height":400,"paddings":[60,0,0,0],"backgroundColor":"#f4f4f2","column1":{"imageSrc":"test","imageSize":"mini"},"column2":{"color":"#2a2a2a","hoverColor":"#f7c545"},"column3":{"iconColor":"#f7c545","iconSize":"small"}},"comingSoon":{"color":"#2a2a2a","fontFamily":"Cairo, Playfair Display, sans-serif","width":800,"backgroundColor":"#f4f4f2","paddings":[0,20,0,20],"headingSize":60,"headingLineHeight":66,"headingMargins":[40,0,0,0],"subHeadingLineHeight":27,"subHeadingSize":27,"subHeadingMargins":[40,0,40,0],"signUpWidth":500,"button":{"size":"large","margins":[40,0,0,0]}}}',
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1,
    0
);