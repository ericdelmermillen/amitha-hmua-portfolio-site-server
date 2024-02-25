CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);

INSERT INTO users (
	email, 
    password
) 
VALUES (
	'amithamillensuwants@gmail.com', 
    '12345678', 
    'admin');


CREATE TABLE photographers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photographer_name VARCHAR(255) NOT NULL,
  websiteURL VARCHAR(255),
  instagramURL VARCHAR(255),
  facebookURL VARCHAR(255),
  twitterURL VARCHAR(255),
  pinterestURL VARCHAR(255)
);

INSERT INTO photographers (
  photographer_name,
  websiteURL,
  instagramURL,
  facebookURL,
  twitterURL,
  pinterestURL
)
VALUES 
  ('Natasha Gerschon', 'https://www.natashagerschon.com/', 'https://www.instagram.com/natashagerschon/', NULL, 'https://twitter.com/natashagerschon/', 'https://www.pinterest.ca/natashagerschon/'),
  ('Michael Kai Young', 'https://michaelkaiyoung.format.com/landing/', 'https://www.instagram.com/michaelkaiyoung/', 'https://www.facebook.com/michaelky/', 'https://twitter.com/michaelkaiyoung/', 'https://www.pinterest.ca/michaelkaiyoungphoto/'),
  ('Colin Gaudette Sabad', NULL, 'https://www.instagram.com/colingaudet45/', 'https://www.facebook.com/ColinGaudetPhotography/', 'https://twitter.com/colingaudet1/', NULL),
  ('Elijah Yutuc', 'https://www.elijahyutuc.com/', 'https://www.instagram.com/elijahyutuc/', NULL, 'https://twitter.com/eliyutucmyphoto/', NULL),
  ('Mark Binks', 'https://www.markbinks.com/', 'https://www.instagram.com/binksheadshots/', 'https://www.facebook.com/MarkBinksPhotography/', 'https://twitter.com/markbinks/', 'https://www.pinterest.com/markbinks/'),
  ('Alvaro Goveia', 'https://www.alvarogoveia.com/', 'https://www.instagram.com/alvarogoveia/', NULL, 'https://twitter.com/AlvaroGoveia/', NULL),
  ('Generic Eric', 'https://www.genericeric.com/', 'https://www.instagram.com/genericeric/', NULL, 'https://twitter.com/genericeric/', NULL)
;



CREATE TABLE models (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  model_name VARCHAR(255) NOT NULL,
  agency VARCHAR(255),
  agencyURL VARCHAR(255)
);

INSERT INTO models (model_name, agency, agencyURL)
	VALUES
    ('Samira Salastname', 'Sutherland Models', 'https://www.sutherlandmodels.com/'),
    ('Madison Samadison', 'Anita Norris Models', 'https://www.anitanorrismodels.com/'),
    ('Sadie Sadieson', 'Icon Models', 'https://iconmodels.ca/'),
    ('Gwen Gwendovish', 'Sutherland Models', 'https://www.sutherlandmodels.com/'),
    ('Joan Smithers', 'Icon Models', 'https://iconmodels.ca/'),
    ('Carey Burns', 'Icon Models', 'https://iconmodels.ca/'),
    ('Anika Anikason', 'Spot 6 Management', 'http://www.spot6management.com/'),
    ('Young Jiayan', 'Anita Norris Models', 'https://www.anitanorrismodels.com/'),
    ('Jas Jasserson', 'Next Models Canada', 'https://www.nextmodels.ca/'),
    ('Sage Saganaki', 'Sutherland Models', 'https://www.sutherlandmodels.com/')
;


-- if possible simplify this for the display order
CREATE TABLE shoots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shoot_date DATE,
  shoot_title VARCHAR(255) NOT NULL,
  shoot_blurb TEXT NOT NULL,
  display_order INT DEFAULT NULL
);


DELIMITER //

CREATE TRIGGER set_display_order_default
BEFORE INSERT ON shoots
FOR EACH ROW
BEGIN
	DECLARE total_rows INT;
    SELECT COUNT(*) INTO total_rows FROM shoots;
    SET NEW.display_order = total_rows + 1;
END;
//

DELIMITER ;


INSERT INTO shoots 
    (shoot_date, shoot_title, shoot_blurb, display_order)
VALUES
    ('2023-09-18', 'Urban Chic', 'Step into the vibrant streets of the city with \'Urban Chic,\' where sophistication meets urban edge. Natasha Gerschon captures the essence of contemporary fashion against the backdrop of bustling streets and modern architecture. Samira embodies the epitome of urban elegance, showcasing the latest trends with confidence and style. From sleek silhouettes to bold statement pieces, this collection celebrates the fusion of streetwear and high fashion. Each photograph tells a story of urban life, blending gritty realism with refined glamour. Join us on a journey through the concrete jungle, where every corner is a runway and every moment is an opportunity to shine.', NULL),
    ('2020-07-25', 'Vintage Vibes', 'Step into a world of timeless elegance with \'Vintage Vibes,\' a captivating fashion shoot that pays homage to the glamour of bygone eras. Madison embodies the essence of retro chic as she poses amidst vintage props and classic backdrops, exuding sophistication and allure. Michael Kai Young\'s masterful photography captures every detail, from the soft glow of ambient lighting to the rich textures of vintage fabrics. Each frame tells a story of nostalgia and beauty, inviting viewers to journey back in time and experience the allure of vintage fashion. With a blend of timeless elegance and contemporary flair, \'Vintage Vibes\' celebrates the enduring appeal of fashion through the ages.', NULL),
    ('2022-03-09', 'Modern Elegance', 'Step into the world of modern elegance with Sadie as she embodies sophistication and grace in this stunning fashion shoot captured by Colin Gaudette. From sleek silhouettes to bold statement pieces, each photograph showcases the perfect fusion of contemporary style and timeless beauty. Against a backdrop of urban landscapes and architectural marvels, Sadie exudes confidence and poise, effortlessly captivating the viewer with her magnetic presence. With every click of the camera, Colin masterfully captures the essence of modernity, infusing each image with an air of effortless chic. Join us on a visual journey that celebrates the intersection of innovation and classic allure, where every detail is meticulously curated to inspire and captivate.', NULL),
    ('2021-04-29', 'Bohemian Rhapsody', 'Step into the whimsical world of Bohemian Rhapsody, where the free-spirited essence of boho-chic meets the timeless allure of vintage glamour. With Gwen as our muse, Elijah Yutuc\'s lens captures the essence of wanderlust and artistic expression. From flowing maxi dresses adorned with intricate embroidery to eclectic jewelry pieces that tell stories of faraway lands, every frame exudes a sense of effortless elegance and individuality. Amidst the backdrop of sun-dappled meadows and ethereal landscapes, Gwen embodies the spirit of a modern-day bohemian goddess, radiating confidence and grace with every pose. Join us on a visual journey that celebrates the beauty of self-expression, creativity, and the timeless allure of bohemian style.', NULL),
    ('2020-05-22', 'Glamour in the City', 'Get ready to experience the epitome of urban glamour in our latest fashion shoot, \'Glamour in the City\'. Join models Joan Smither and Carrey Burns as they take to the bustling streets, capturing the essence of sophistication and style against the backdrop of the city skyline. From sleek skyscrapers to quaint cobblestone streets, this collection showcases the fusion of high fashion and metropolitan allure. Michael Kai Young\'s expert lens brings to life the energy and vibrancy of the city, while Joan and Carrey exude confidence and grace in every shot. Whether it\'s a chic cocktail dress or trendy streetwear, this shoot celebrates the diversity and dynamism of urban fashion. Step into the world of \'Glamour in the City\' and discover the allure of city life through the lens of fashion.', NULL),
    ('2020-10-27', 'Tropical Paradise', 'Immerse yourself in the vibrant colors and exotic beauty of our \'Tropical Paradise\' fashion shoot. Set against the backdrop of palm-fringed beaches and azure waters, model Anika embodies the essence of island chic in every frame. Photographer Michael Kai Young skillfully captures the allure of paradise, showcasing Anika\'s effortless elegance and natural charm. From flowing sundresses to bold swimsuits, each ensemble exudes tropical flair, perfectly complemented by the lush surroundings. Join us on a visual journey to a world where every moment feels like a dreamy escape to paradise.', NULL),
    ('2023-08-20', 'Street Style Chronicles', 'Embark on a visual journey through the bustling streets of the city with \'Street Style Chronicles\' Featuring the enigmatic Young Jiayan as the focal point, this captivating photoshoot captures the essence of urban fashion at its finest. From vibrant graffiti-lined alleyways to chic sidewalk cafes, each frame tells a unique story of style, attitude, and self-expression. Micheal Kai\'s keen eye for detail brings out the raw energy and authenticity of street fashion, while Young Jiayan effortlessly embodies the spirit of the city with every pose. Whether it\'s edgy leather jackets or eclectic vintage finds, this collection celebrates the diverse and ever-evolving tapestry of urban style. Join us as we explore the dynamic intersection of fashion, culture, and individuality in the vibrant streetscape.', NULL),
    ('2020-12-28', 'High Fashion Fusion', 'Step into the world of avant-garde fashion with \'High Fashion Fusion\' Mark Binks, renowned for his visionary photography, collaborates with Jas to push the boundaries of conventional style. This captivating fusion of high fashion and artistic expression showcases Jas\'s versatility as a model, while Binks\'s masterful composition and lighting create a visual feast for the senses. From urban landscapes to sleek studio sets, each image tells a story of elegance, sophistication, and bold creativity. Join us on a journey where fashion transcends its traditional limits and becomes a form of art.', NULL),
    ('2023-01-02', 'Minimalist Marvel', 'Experience the allure of simplicity in this stunning minimalist fashion shoot featuring the captivating Samira. Against a backdrop of clean lines and neutral tones, Samira exudes effortless elegance and timeless beauty. Colin Gaudette Sabad\'s masterful photography captures the essence of minimalism, highlighting Samira\'s grace and poise with every shot. From sleek silhouettes to understated accessories, this collection celebrates the beauty of restraint and sophistication. Join us as we explore the art of minimalism in fashion, where less truly becomes more.', NULL),
    ('2021-12-08', 'Ethnic Extravaganza', 'Step into a world of cultural celebration with our Ethnic Extravaganza fashion shoot. Embracing the rich diversity of global heritage, this collection showcases the fusion of traditional elements with contemporary style. Sage exudes confidence and grace as she models vibrant garments inspired by various ethnic cultures. Alvaro Goveia\'s lens captures the intricate details and textures, bringing to life the essence of each ensemble. From intricate embroidery to bold patterns, every outfit tells a story of craftsmanship and creativity. Join us on a journey that celebrates the beauty of cultural exchange and the universal language of fashion.', NULL)
    ;
    
-- should delete photos linked to shoots table on deleting the linked shoots entry
CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shoot_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE
);

INSERT INTO photos 
	(shoot_id, photo_url)
VALUES 
	(1, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1693922590430-QS63RCFVDWXGELU2TW74/23_Samira_Creative1570.jpg'),
	(1, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1693923166114-2K6OHZ2VCUCOWU7I522X/23_Samira_Creative1291.jpg'),
    (1, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1693923263735-GIDRPMS5ZN96D9UM6XCT/23_Samira_Creative1045.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701829437182-GGZCGS7K47MYLV0L1U53/MKY+MADISON+11.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792246116-GJMGQ0KH1B0EOCNIGJNQ/MKY+MADISON+10.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792308401-AJBNLT5OSFVYIO0QD5AU/MKY+MADISON+07.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792389655-48SKTYH7U8AQEEL25VNF/MKY+MADISON+02.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792457840-SS1GLNOK6TUAZSNG0CQ2/MKY+MADISON+03.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792546646-Q1WUO9JKRRAAYRWXJOMO/MKY+MADISON+06.jpg'),
    (2, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701792613384-M5XAXQURQZQSR4XCNF8K/MKY+MADISON+05.2.jpg'),
    (3, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1706225479495-K4W5QCMYX9KKKY1KLLRP/sadie-robert-beauty-01102024-final01.jpg'),
    (3, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1706225513943-E7Z7P5QXZX7AF4RXO0VT/sadie-robert-beauty-01102024-final03.jpg'),
    (3, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1706225547425-U9SLW1ZGHI2OO2GZDNBI/sadie-robert-beauty-01102024-final05.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288495928-M4VTC2V74XH5L5N008LE/003_108.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288509556-5PHMF1WFTNFLWR8F94XA/003_006.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288525490-QPNA51U6ZS5VB97UQMXJ/002_139_crop.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288533349-EUKG3KMKR00RFQ6GHQO3/002_115.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288554354-T6PEHE8E3Q83PXIQDCFX/001_159.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288576032-DY69U8K23OH6V7XAIZXS/004_027.jpg'),
    (4, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1668288560457-9T17LUQ3RH8D5II6HFAQ/001_064.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864282505-XRWIY5G99K587WFEJIIX/MKY+-+JOA+09.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864305269-KLRBFL0FWLANXZBIIPKW/MKY+-+JOA+02.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864334862-CX2BYDL4EUVZPPVC268F/MKY+-+JOA+01.jpg'),
	(5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864383579-LZ635E5R9RRU1W02IWXS/MKY+-+JOA+08.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864383579-LZ635E5R9RRU1W02IWXS/MKY+-+JOA+08.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864400294-ZN7XUGA9PETEFMTRBO0E/MKY+-+JOA+06.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864437826-0FGRCE46WWKFAODWA4XK/MKY+-+JOA+07.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864487636-5I25O1ECM37IB4M1AIX3/MKY+-+JOA+03.jpg'),
    (5, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1670864513691-65Y1ZZ6APGKRJTI0OHKI/MKY+-+JOA+11.jpg'),
    (6, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1703356350323-PE0KPWPG8D6YIZHCTBXA/IMG_1082.jpg'),
    (6, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1703356527021-BJARY1L2HA7OJUFH0339/IMG_1071.jpg'),
    (6, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1703356584994-SZ8I8Q43L2W9NLNL1XF8/IMG_1073.jpg'),
    (6, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1703356640213-AIKV29S2Q632CUHOC7U6/IMG_1077.jpg'),
    (6, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1703356706889-1D0EL7UOV1FX7Y57YL4D/IMG_1075.JPG'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476874996-F9TC07Q90V5BULNZGQDZ/MKY_JIAYAN+02.2.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476882392-QE1B7KHJ1CQ860107Q4B/MKY_JIAYAN+01.2.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476891206-VOFNY0MADKWHQS26E1UX/MKY_JIAYAN+04.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476898709-3U0239GADZJ64H3H7X2K/MKY_JIAYAN+03.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476909257-678S70ENHTOGH1Y7GUVK/MKY_JIAYAN+05.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476919126-5ZKEDXYQ5FCOKOBSONDP/MKY_JIAYAN+06.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476929405-D9RAT3LR27HQ3RPM15J6/MKY_JIAYAN+07.1.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476936993-X75FXT1N6OR3PVU7ANTA/MKY_JIAYAN+08.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476945568-FV3V6A8PJENHW3TTIEID/MKY_JIAYAN+09.jpg'),
    (7, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1676476963957-EA61AT6QLE67YTON6VW9/MKY_JIAYAN+10.jpg'),
    (8, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701830456393-X681UZ069F7MP1YOPG5G/WEB+REZ_3+STARNDING-6.jpg'),
    (8, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701830456296-83HVGOARWLZ871IPDXQQ/WEB+REZ_3shot-5.jpg'), 
    (8, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701830513668-7DF04JYPLK9FKYFWSS2Y/WEB+REZ_MOSSY+WINDOW-3.jpg'),
    (8, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1701830519816-3GZVCZIYKZ37HUZWBRKB/WEB+REZ_WICKER+CHAIR-4.jpg'),
	(9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409060233-1HANCSSY9HW8D298120U/Sabad-Samira-Beauty-11132023-Final08.jpg'),
    (9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409155468-C2U1YAKEF68CNJ3LCIOI/Sabad-Samira-Beauty-11132023-Final05.jpg'),
    (9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409226746-2Q58UAT08IYUBMTO2J13/Sabad-Samira-Beauty-11132023-Final03.jpg'),
    (9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409279287-Q1G523JRMY3KQH0PSXCS/Sabad-Samira-Beauty-11132023-Final04.jpg'),
    (9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409359533-2QQE6OG1KXOPI9PB45V0/Sabad-Samira-Beauty-11132023-Final07.jpg'),
    (9, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1702409412508-7V6ETYFKW7WSCG6KKDPI/Sabad-Samira-Beauty-11132023-Final06.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690739504052-HPPZBIA7X86VSGWE4VL6/Sage+4.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690739659168-7BB6G14SVWTL0V78DKJL/Sage+7.2.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690739859556-YVS6Q8F4X48D2R6ZU94F/Sage+8.1.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690740023780-3ZZSTK8IJ6D0LT3J3ZPQ/Sage+12.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690740089146-MTO6LHGNR0D5UG86L2IY/Sage+10.1.jpg'),
    (10, 'https://images.squarespace-cdn.com/content/v1/5c2b8497620b859e3110e2e9/1690740240717-XRABRLKJYMI58K1L4EDC/Sage+5.jpg')
;



CREATE TABLE shoot_photographers (
  shoot_id INT NOT NULL,
  photographer_id INT NOT NULL,
  PRIMARY KEY (shoot_id, photographer_id),
  FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE,
  FOREIGN KEY (photographer_id) REFERENCES photographers(id) ON DELETE CASCADE
);


INSERT INTO shoot_photographers 
	(shoot_id, photographer_id)
VALUES 
	(1, 1), (2, 2), (3, 3), (4, 4), (5, 2), (6, 2), (7, 2), (8, 5), (9, 3), (10, 6), (10, 7)
;


CREATE TABLE shoot_models (
  shoot_id INT NOT NULL,
  model_id INT NOT NULL,
  PRIMARY KEY (shoot_id, model_id),
  FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE,
  FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
);


INSERT INTO shoot_models 
	(shoot_id, model_id)
VALUES 
	(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 1), (10, 10)
;

-- shoots all view