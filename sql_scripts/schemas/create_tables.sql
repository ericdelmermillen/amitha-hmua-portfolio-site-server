CREATE DATABASE shoots_db;

USE shoots_db;

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
    '12345678');


CREATE TABLE photographers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photographer_name VARCHAR(255) NOT NULL
);

INSERT INTO photographers (
  photographer_name
)
VALUES 
  ('Natasha Gerschon'),
  ('Michael Kai Young'),
  ('Colin Gaudette Sabad'),
  ('Elijah Yutuc'),
  ('Mark Binks'),
  ('Alvaro Goveia'),
  ('Generic Eric')
;

CREATE TABLE models (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  model_name VARCHAR(255) NOT NULL
);

-- INSERT INTO models (model_name, agency, agencyURL)
INSERT INTO models (model_name)
	VALUES
    ('Samira Salastname'),
    ('Madison Samadison'),
    ('Sadie Sadieson'),
    ('Gwen Gwendovish'),
    ('Joan Smithers'),
    ('Carey Burns'),
    ('Anika Anikason'),
    ('Young Jiayan'),
    ('Jas Jasserson'),
    ('Sage Saganaki')
;

CREATE TABLE tags (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(255) NOT NULL
);

INSERT INTO tags (tag_name)
	VALUES
    ('Bridal'),
    ('Editorial'),
    ('Commercial'),
    ('Beauty'),
    ('Hair'),
    ('Wig')
;


CREATE TABLE shoots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shoot_date DATE,
  display_order INT DEFAULT NULL
);

-- DELIMITER //
-- CREATE TRIGGER set_display_order
-- BEFORE INSERT ON shoots
-- FOR EACH ROW
-- BEGIN
--     DECLARE last_id INT;
--     SET last_id = (SELECT IFNULL(MAX(id), 0) FROM shoots);
--     SET NEW.display_order = last_id + 1;
-- END;
-- //
-- DELIMITER ;


--


INSERT INTO shoots 
    (shoot_date, 
    display_order)
VALUES
    ('2023-09-18', 1),
    ('2020-07-25', 2),
    ('2022-03-09', 3),
    ('2021-04-29', 4),
    ('2020-05-22', 5),
    ('2020-10-27', 6),
    ('2023-08-20', 7),
    ('2020-12-28', 8),
    ('2023-01-02', 9),
    ('2021-12-08', 10)
    ;

    
CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shoot_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  display_order INT DEFAULT NULL,
  FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER set_display_order_default_photos
BEFORE INSERT ON photos
FOR EACH ROW
BEGIN
    DECLARE total_rows INT;
    SELECT COUNT(*) INTO total_rows FROM photos WHERE shoot_id = NEW.shoot_id;
    SET NEW.display_order = total_rows + 1;
END;
//

DELIMITER ;


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

CREATE TABLE shoot_tags (
  shoot_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (shoot_id, tag_id),
  FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);


INSERT INTO shoot_tags
	(shoot_id, tag_id)
VALUES 
	(1, 1), (1, 4), (2, 2), (2, 5), (3, 2), (3, 3), (4, 4), (5, 1), (5, 5), (5, 6), (6, 7), (7, 2), (7, 3), (8, 2), (8,1), (9, 3), (9,7), (10, 2), (10,6)
;
