USE shoots_db;

-- get users
SELECT * FROM users;


-- get all photographers
SELECT * FROM photographers;


-- get photographer by id
SELECT * FROM photographers WHERE id = <id>;

-- add photographers
INSERT INTO photographers 
  (photographer_name, websiteURL, instagramURL, facebookURL, twitterURL, pinterestURL)
VALUES
	('<photographer name>', '<https://websiteurl.com>', '<https://instagram.com/name>', 
    '<https://facebook.com/name>', '<https://twitter.com/name>', '<https://pinterest.com/name>');
    
-- delete photographers by id
DELETE FROM photographers WHERE id = <id>;

-- get all models
SELECT * FROM models;


-- get model by id
SELECT * FROM models WHERE id = <id>;

-- add model
INSERT INTO models 
	(model_name, agency, agencyURL)
VALUES
	('<model name>', '<agency name>', '<https://agencyurl.com>');
    
-- delete model by id
DELETE FROM models WHERE id = <id>;


-- select shoots with photographer
SELECT 
--     shoots.id AS shoot_id, 
--     photographers.id AS photographer_id, 
--     shoot_date, 
--     shoot_title, 
--     photographer_name
*
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id;


-- select shoots with model
SELECT 
    shoots.id AS shoot_id, 
    photographers.id AS photographer_id, 
    models.id AS model_id, 
    shoot_date, 
    shoot_title, 
    photographer_name,
    model_name

FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
GROUP BY shoots.id;



-- get all photographers and models with the shoot
SELECT 
    shoots.id AS shoot_id, 
    photographers.id AS photographer_id, 
    models.id AS model_id, 
    shoot_date, 
    shoot_title, 
    photographer_name,
    GROUP_CONCAT(model_name) AS model_names,
    GROUP_CONCAT(photographer_name) AS photographer_names
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
GROUP BY shoots.id, shoot_date, shoot_title;

-- get shoots with photographers, models, photos groupded by shoots.id with only the first photo
SELECT 
    shoots.id AS shoot_id, 
    shoots.shoot_date,
    shoots.display_order,
    GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,
    GROUP_CONCAT(DISTINCT models.model_name) AS models,
    shoots.shoot_title, 
    shoots.shoot_blurb, 
    SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url), ',', 1) AS photo_url
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
LEFT JOIN 
    photos ON shoots.id = photos.shoot_id
GROUP BY 
    shoots.id, shoots.shoot_date, shoots.shoot_title, shoots.shoot_blurb
ORDER BY shoots.display_order;


-- shoots summary with pagination
SELECT 
    shoots.id AS shoot_id, 
    shoots.shoot_date,
    shoots.display_order,
    GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,
    GROUP_CONCAT(DISTINCT models.model_name) AS models,
    shoots.shoot_title, 
    shoots.shoot_blurb, 
    SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url), ',', 1) AS photo_url
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
LEFT JOIN 
    photos ON shoots.id = photos.shoot_id
GROUP BY 
    shoots.id, shoots.shoot_date, shoots.shoot_title, shoots.shoot_blurb
ORDER BY 
    shoots.display_order
LIMIT 
    10 -- Number of rows per page
OFFSET 
    0; -- Starting point for pagination




-- update display order
UPDATE shoots
SET display_order = 1
WHERE id = 10;


-- shoots summary view with shoot id, shoot date, photographers, models, title, blurb, first photo from shoot
CREATE VIEW shoots_summary_view AS
SELECT 
    shoots.id AS shoot_id, 
    shoots.shoot_date, 
    shoots.display_order,
    GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,
    GROUP_CONCAT(DISTINCT models.model_name) AS models,
    shoots.shoot_title, 
    shoots.shoot_blurb, 
    SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url), ',', 1) AS photo_url
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
LEFT JOIN 
    photos ON shoots.id = photos.shoot_id
GROUP BY 
    shoots.id, shoots.shoot_date, shoots.shoot_title, shoots.shoot_blurb
    ORDER BY shoots.display_order;
    
-- get all shoots
SELECT * FROM shoots_summary_view;


-- by id: set session max len for concat on each call in case server was restarted
SET SESSION group_concat_max_len = 2560;

SELECT 
    shoots.id AS shoot_id, 
    shoots.shoot_date,
    GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,
    GROUP_CONCAT(DISTINCT models.model_name) AS models,
    shoots.shoot_title, 
    shoots.shoot_blurb, 
    GROUP_CONCAT(DISTINCT SUBSTRING_INDEX(photos.photo_url, ',', 1) ORDER BY photos.id ASC SEPARATOR ',') AS photo_url
FROM 
    shoots
LEFT JOIN 
    shoot_photographers ON shoots.id = shoot_photographers.shoot_id
LEFT JOIN 
    photographers ON shoot_photographers.photographer_id = photographers.id
LEFT JOIN 
    shoot_models ON shoots.id = shoot_models.shoot_id
LEFT JOIN 
    models ON shoot_models.model_id = models.id
LEFT JOIN 
    photos ON shoots.id = photos.shoot_id
WHERE shoots.id = 5
GROUP BY 
    shoots.id, shoots.shoot_date, shoots.shoot_title, shoots.shoot_blurb;



