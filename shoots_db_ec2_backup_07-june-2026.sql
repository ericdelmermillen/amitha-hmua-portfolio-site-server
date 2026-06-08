-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: shoots_db
-- ------------------------------------------------------
-- Server version       8.0.46-0ubuntu0.24.04.2
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8mb4 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `bio`
--
DROP TABLE IF EXISTS `bio`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `bio` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `bio_name` varchar(100) DEFAULT NULL,
  `bio_img_url` varchar(255) NOT NULL,
  `bio_text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `bio`
--
LOCK TABLES `bio` WRITE;

/*!40000 ALTER TABLE `bio` DISABLE KEYS */
;

INSERT INTO
  `bio`
VALUES
  (
    1,
    'Amitha Millen-Suwanta',
    'e0d7e126-eaab-4e1a-957a-fe9563ed71ec.jpeg',
    'Meet Amitha, a dynamic makeup artist and fashion stylist who thrives on celebrating the unique beauty of each person. With a deep understanding that beauty knows no bounds, she rejects the notion of a one-size-fits-all approach to makeup. Instead, she crafts bespoke experiences for her clients, considering their individuality, comfort levels, and personal style.\n\nLocated in the heart of Toronto, Ontario, Amitha\'s professional journey has been a whirlwind of diverse experiences within the beauty industry. Though she revels in all aspects of her craft, her passion ignites most brightly within the realms of Fashion and Bridal makeup.\n\nFrom esteemed corporations to celebrated singers, actors, and brands across Canada, the USA, and the UK, Amitha and her team ensure that each client embarks on a unique and unforgettable beauty journey.'
  );

/*!40000 ALTER TABLE `bio` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--
DROP TABLE IF EXISTS `knex_migrations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `knex_migrations`
--
LOCK TABLES `knex_migrations` WRITE;

/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */
;

INSERT INTO
  `knex_migrations`
VALUES
  (
    1,
    '20240614010117_create_users_table.js',
    1,
    '2024-06-21 19:07:12'
  ),
(
    2,
    '20240614011712_create_bio_table.js',
    1,
    '2024-06-21 19:07:12'
  ),
(
    3,
    '20240614014629_create_photographers_table.js',
    1,
    '2024-06-21 19:07:12'
  ),
(
    4,
    '20240614154555_create_models_table.js',
    1,
    '2024-06-21 19:07:12'
  ),
(
    5,
    '20240614155236_create_tags_table.js',
    1,
    '2024-06-21 19:07:12'
  ),
(
    6,
    '20240614214316_create_shoots_table.js',
    1,
    '2024-06-21 19:07:13'
  ),
(
    7,
    '20240614214446_create_photos_table.js',
    1,
    '2024-06-21 19:07:13'
  ),
(
    8,
    '20240614214622_create_shoot_photographers.js',
    1,
    '2024-06-21 19:07:13'
  ),
(
    9,
    '20240614214719_create_shoot_models.js',
    1,
    '2024-06-21 19:07:13'
  ),
(
    10,
    '20240614214756_create_shoot_tags.js',
    1,
    '2024-06-21 19:07:13'
  );

/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--
DROP TABLE IF EXISTS `knex_migrations_lock`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `knex_migrations_lock`
--
LOCK TABLES `knex_migrations_lock` WRITE;

/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */
;

INSERT INTO
  `knex_migrations_lock`
VALUES
  (1, 0);

/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `models`
--
DROP TABLE IF EXISTS `models`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `models` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `model_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 77 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `models`
--
LOCK TABLES `models` WRITE;

/*!40000 ALTER TABLE `models` DISABLE KEYS */
;

INSERT INTO
  `models`
VALUES
  (1, 'Test Model'),
(2, 'Atom K'),
(3, 'Anna Zemly'),
(4, 'Note Amit'),
(5, 'Ash Kalyn'),
(6, 'Amire'),
(7, 'Catherina A'),
(8, 'John Millen'),
(9, 'Veronica Ye'),
(10, 'Agatha'),
(11, 'Makhy '),
(12, 'Trevor Carter '),
(13, 'Natasha Rabura'),
(14, 'Grace '),
(15, 'Pattricia '),
(16, 'Adwoa'),
(17, 'Daniella Traa'),
(18, 'Ally'),
(19, 'Anna'),
(20, 'Jayden  Aj'),
(21, 'Caylen Walker'),
(22, 'Abby'),
(23, 'Don'),
(25, 'Gahaya'),
(26, 'Celia'),
(27, 'Mimi'),
(28, 'Hannah Zervos'),
(29, 'Gaiyan'),
(30, 'Luke'),
(31, 'Oleg'),
(32, 'Varintorn Yaroojjanont'),
(33, 'Natalia Polakowski'),
(34, 'Jessica Gwen'),
(35, 'Layla Harris'),
(36, 'Maria'),
(37, 'Gloria'),
(38, 'Ayesha'),
(39, 'Alex'),
(40, 'Issabella'),
(41, 'Molly'),
(42, 'College of Makeup Art and Design'),
(45, 'Ash Kalyn'),
(46, 'Abigail'),
(47, 'Vogue Italian Online'),
(49, 'Nasty Magazine'),
(50, 'Catherine'),
(51, 'Tangerine Bank'),
(52, 'MyDoh, RBC Bank'),
(53, 'Playapex'),
(54, 'Marcozo'),
(55, 'Huemanity Hair Color'),
(56, 'Paradox Unity'),
(57, 'Karina'),
(58, 'Natalia'),
(59, 'Hannas'),
(60, 'Kristien'),
(62, 'Rembo'),
(63, 'Shazeeda Gafoor'),
(64, 'Baie'),
(65, 'Barbara'),
(66, 'Emma Almeida'),
(67, 'Eric, Wesley, Oliver, Andrew, Ugo'),
(68, 'Bluivory'),
(69, 'Daria M'),
(70, 'Sharon'),
(71, 'Elite Models'),
(72, 'Rae'),
(73, 'Tressy'),
(75, 'Amitha Millen-Suwanta'),
(76, 'Anika Julia');

/*!40000 ALTER TABLE `models` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `photographers`
--
DROP TABLE IF EXISTS `photographers`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `photographers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `photographer_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `photographers`
--
LOCK TABLES `photographers` WRITE;

/*!40000 ALTER TABLE `photographers` DISABLE KEYS */
;

INSERT INTO
  `photographers`
VALUES
  (2, 'Jim Carry '),
(3, 'Oga'),
(4, 'Umair Shaikh'),
(5, 'AGIVA Canada'),
(6, 'Ariel Lii '),
(7, 'Ashley '),
(8, 'GJ'),
(9, 'Jainik'),
(10, 'Victoria'),
(11, 'Mark Gallardo'),
(12, 'Peter '),
(13, 'Emily '),
(14, 'Ryan '),
(15, 'Backdropsgallery'),
(16, 'The Purest Form'),
(17, 'Sean Leber'),
(18, 'Theater'),
(19, 'Vouge Italian Online'),
(20, 'Eli'),
(21, 'Hiep'),
(22, 'Boyu Jian'),
(23, 'Olega'),
(24, 'Matthew Bennette'),
(25, 'Jian Von Esmane'),
(26, 'Jim CMU'),
(27, 'Alfie'),
(29, 'Dimitri Traganis');

/*!40000 ALTER TABLE `photographers` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `photos`
--
DROP TABLE IF EXISTS `photos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `shoot_id` int unsigned NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `display_order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photos_shoot_id_foreign` (`shoot_id`),
  CONSTRAINT `photos_shoot_id_foreign` FOREIGN KEY (`shoot_id`) REFERENCES `shoots` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1847 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `photos`
--
LOCK TABLES `photos` WRITE;

/*!40000 ALTER TABLE `photos` DISABLE KEYS */
;

INSERT INTO
  `photos`
VALUES
  (
    1196,
    34,
    'e5e8bfdc-35cc-472b-b4e7-48707a55ac77.jpeg',
    1
  ),
(
    1197,
    34,
    '1329a911-f99f-4a1c-8db0-3d15dc7a664a.jpeg',
    2
  ),
(
    1198,
    34,
    'd5627a41-29ae-45b0-bb85-358de4211f66.jpeg',
    3
  ),
(
    1199,
    34,
    '39464983-dd3e-4156-aef9-1fbe8cc24fd2.jpeg',
    4
  ),
(
    1200,
    34,
    '22c70e49-93f3-48bb-8655-4c01070d88ca.jpeg',
    5
  ),
(
    1201,
    34,
    'f2fbf0c1-4ebd-4690-9999-685e41e660db.jpeg',
    6
  ),
(
    1202,
    34,
    '887008ca-4cde-4885-8ee8-c2e4c579cdfa.jpeg',
    7
  ),
(
    1203,
    34,
    '5e1bbecd-30dd-48ad-9128-981152d12ff3.jpeg',
    8
  ),
(
    1204,
    34,
    'af55c7ee-74b1-4b26-b0fb-251af3754528.jpeg',
    9
  ),
(
    1205,
    34,
    '649f2ac3-c6ed-4bed-897c-733b208c254e.jpeg',
    10
  ),
(
    1216,
    57,
    '605e5537-835b-4b13-a520-05b0fa8fc368.jpeg',
    1
  ),
(
    1217,
    57,
    'c88d1be4-3948-4ea3-b72f-7fb5a0605cd1.jpeg',
    2
  ),
(
    1218,
    57,
    'e3a7ee93-3f2a-4e63-8454-c85c11b7effd.jpeg',
    3
  ),
(
    1219,
    57,
    '0355d61a-3bef-4dd8-9396-f135a9c3782c.jpeg',
    4
  ),
(
    1220,
    57,
    'a8c8d9d5-2890-4998-a37c-d780aa25b9bb.jpeg',
    5
  ),
(
    1221,
    57,
    '83123091-d739-4cd3-8705-7322efe40509.jpeg',
    6
  ),
(
    1222,
    57,
    '09761f4f-a4ca-4453-9326-46881f0b9a6e.jpeg',
    7
  ),
(
    1223,
    51,
    '5980bf1e-abdc-49b9-9fd0-637ba0692a9f.jpeg',
    1
  ),
(
    1224,
    51,
    'e968f949-eadb-4cba-9dd7-90f8abaaff94.jpeg',
    2
  ),
(
    1225,
    51,
    '4a5472cc-6041-4f89-9219-bd2cb76a9e0f.jpeg',
    3
  ),
(
    1226,
    51,
    '97e7452b-7557-493c-a3e2-c5944481012e.jpeg',
    4
  ),
(
    1227,
    47,
    'e48dc234-12d3-4acd-a239-10f4ba227543.jpeg',
    1
  ),
(
    1228,
    47,
    'b5e07c39-acde-4f37-a259-ca6250d8315b.jpeg',
    2
  ),
(
    1229,
    47,
    '651a5636-f076-4184-b702-5d80ed07973b.jpeg',
    3
  ),
(
    1230,
    47,
    '635b0178-2577-4ade-b65a-03f0314c9d51.jpeg',
    4
  ),
(
    1231,
    52,
    'dab976e3-60b9-4fa3-a107-8a34e2321fb5.jpeg',
    1
  ),
(
    1242,
    55,
    '2414f603-1e37-4a12-8991-c4563b233948.jpeg',
    1
  ),
(
    1243,
    55,
    'b4dbb6d7-a98f-4d52-b8b2-508445c7483e.jpeg',
    2
  ),
(
    1244,
    55,
    '0ae7f41a-fdb7-4e78-9aa4-a84f99cc59ed.jpeg',
    3
  ),
(
    1245,
    55,
    '03f3b9da-4e4b-414e-83e1-00deb429ccf4.jpeg',
    4
  ),
(
    1246,
    55,
    'a062bcdd-8d78-4ac3-ba13-7a551acfa98b.jpeg',
    5
  ),
(
    1247,
    55,
    '024a4ba5-5f4b-42ab-95b5-23f9968cf945.jpeg',
    6
  ),
(
    1252,
    7,
    '5a232a78-c9f6-4335-8dce-a4c89641951e.jpeg',
    1
  ),
(
    1253,
    7,
    '5c89c631-98e6-4b0c-9514-bb6771d488fc.jpeg',
    2
  ),
(
    1254,
    7,
    '7d9460d9-e077-4d1d-b354-de484d39f965.jpeg',
    3
  ),
(
    1255,
    7,
    '40e459a3-5664-4ae6-a3b5-550be10969b5.jpeg',
    4
  ),
(
    1256,
    59,
    '92e4b8f2-89c1-4463-ae9c-ef51c08ff22a.jpeg',
    1
  ),
(
    1257,
    59,
    '1604e2ae-a716-418d-8258-3b9189365bfb.jpeg',
    2
  ),
(
    1258,
    59,
    'eae766fe-6a7b-4f67-a824-5d9bfe3f67c3.jpeg',
    3
  ),
(
    1263,
    4,
    '977a502c-7efc-4a3f-bc81-02e44a3d9544.jpeg',
    1
  ),
(
    1264,
    4,
    '9c9691e8-91e3-4804-a195-521092d8f638.jpeg',
    2
  ),
(
    1265,
    4,
    '60564b4f-b311-4745-9f7d-2b68d1d330a9.jpeg',
    3
  ),
(
    1266,
    4,
    'b9db2c59-8ac6-42ed-a99f-afa6cd10382b.jpeg',
    4
  ),
(
    1271,
    48,
    '1b48ad07-09cf-48f4-8f42-629a023322b6.jpeg',
    1
  ),
(
    1287,
    29,
    '190b5763-f589-4fe0-ba6b-28884e1fbb39.jpeg',
    1
  ),
(
    1288,
    29,
    '0a8d0a81-3d18-40c1-90f7-c0a5f0090bf1.jpeg',
    2
  ),
(
    1289,
    29,
    '3b616454-add8-4081-b803-4168581ed0fe.jpeg',
    3
  ),
(
    1290,
    41,
    '15a13361-697e-4332-818f-8eee4c994338.jpeg',
    1
  ),
(
    1291,
    41,
    '979837ca-f26d-4899-9aa6-aafcfa81884d.jpeg',
    2
  ),
(
    1292,
    41,
    '14ea4d45-9e1f-495c-b4a5-6409b807e833.jpeg',
    3
  ),
(
    1293,
    20,
    '0dabce78-d835-4405-9307-8fd0275b8ef9.jpeg',
    1
  ),
(
    1294,
    20,
    '30b02936-a9ff-406a-850e-912d7df6d1c4.jpeg',
    2
  ),
(
    1295,
    20,
    '1d26fa40-4cce-4636-af47-5859b6131863.jpeg',
    3
  ),
(
    1296,
    20,
    '174d2a65-1f67-4312-911a-dbf74b37d430.jpeg',
    4
  ),
(
    1297,
    20,
    '3503b1d5-fb9a-4445-9735-ee0de4e67994.jpeg',
    5
  ),
(
    1298,
    27,
    '6c02bf40-a774-4222-b776-36a60c07e3db.jpeg',
    1
  ),
(
    1299,
    27,
    '7c12127c-4c81-43d7-86c2-5d35d02692b5.jpeg',
    2
  ),
(
    1300,
    27,
    '953ba1f8-f968-4a1a-9d08-449562573d95.jpeg',
    3
  ),
(
    1301,
    27,
    'a82f198c-a403-48f2-ab25-9e560523e4fc.jpeg',
    4
  ),
(
    1302,
    27,
    '581b7215-b4df-4ee1-bc11-064fd6790220.jpeg',
    5
  ),
(
    1303,
    15,
    '1d8375fd-5549-4251-97e1-70248de46469.jpeg',
    1
  ),
(
    1304,
    15,
    'a99091dd-a60e-4ea6-b095-1b2476d28957.jpeg',
    2
  ),
(
    1305,
    15,
    '20b742c3-d4b1-435f-81c5-8ec333972809.jpeg',
    3
  ),
(
    1306,
    15,
    'ec2f171a-1174-4a28-bda1-15e14904f32f.jpeg',
    4
  ),
(
    1307,
    50,
    'd428de49-3a94-4e66-82bf-b5e7055ccb31.jpeg',
    1
  ),
(
    1308,
    50,
    'e6180952-51e7-406f-bbed-198415c0e6a5.jpeg',
    2
  ),
(
    1309,
    50,
    'a2ef9555-975e-4fc7-ba70-2a47799ac0f1.jpeg',
    3
  ),
(
    1316,
    61,
    'cf84bf32-2b56-4bf0-8759-c116ba3c641f.jpeg',
    1
  ),
(
    1317,
    61,
    'dd00817c-9eff-4127-8b3d-c6550c609584.jpeg',
    2
  ),
(
    1318,
    61,
    '2120576d-cdbe-46d3-a0f2-fed727d40d43.jpeg',
    3
  ),
(
    1319,
    18,
    '992a0ce8-3d9b-4b53-8787-0f5433c5d6ab.jpeg',
    1
  ),
(
    1320,
    18,
    '2224ca18-4935-4754-83e8-9f1608ac6cd1.jpeg',
    2
  ),
(
    1321,
    18,
    'b89a1901-42bf-4a9a-bbe1-b7bba1630a1e.jpeg',
    3
  ),
(
    1322,
    18,
    'b618e028-355a-4a38-bc9f-49fe91aeb44f.jpeg',
    4
  ),
(
    1323,
    18,
    'b38674dd-4383-413a-91ee-29244efc7944.jpeg',
    5
  ),
(
    1324,
    14,
    '9cb26eee-920e-4c05-a705-5e8ebf510f6b.jpeg',
    1
  ),
(
    1325,
    14,
    '627227e4-5272-41b7-a527-9d5510ed996a.jpeg',
    2
  ),
(
    1326,
    14,
    '9feaeb31-c299-4a3a-b23e-898c94e1b98a.jpeg',
    3
  ),
(
    1327,
    44,
    '0f8e05c1-4f47-467f-80d5-51193d48fb65.jpeg',
    1
  ),
(
    1328,
    44,
    'dca5adc0-9312-4bf2-80c6-0914741c1d20.jpeg',
    2
  ),
(
    1329,
    40,
    'e51a8bce-d2b7-4aaa-aff8-997cdcf7cebe.jpeg',
    1
  ),
(
    1330,
    40,
    '5f3677ef-7b03-4207-86d5-33aaad6da8e7.jpeg',
    2
  ),
(
    1331,
    40,
    'b72b0fe0-81c2-4855-984a-c27fbe4e51eb.jpeg',
    3
  ),
(
    1332,
    40,
    'a2102749-c28e-4e3c-ab19-10ecbc51950c.jpeg',
    4
  ),
(
    1333,
    16,
    '7fdfd094-1315-4146-a076-57649bdc056b.jpeg',
    1
  ),
(
    1334,
    16,
    'd913c3b1-167a-420a-ad54-accae446fa56.jpeg',
    2
  ),
(
    1335,
    16,
    'd3241b44-8a73-42c9-9de0-d1972265ab60.jpeg',
    3
  ),
(
    1336,
    16,
    '6fc6c79f-8c85-4ed3-8fcf-6abcd9d609cf.jpeg',
    4
  ),
(
    1337,
    17,
    '798b6ab2-98ab-4ad4-8e8b-172959ed47fe.jpeg',
    1
  ),
(
    1338,
    17,
    'aca547a6-ab93-4679-af3e-2e904c2e53ca.jpeg',
    2
  ),
(
    1339,
    17,
    'b57794a7-96c8-4176-b0cc-d7f16105305d.jpeg',
    3
  ),
(
    1340,
    62,
    '92808481-a3ae-4fd9-bad2-23b331bd07a3.jpeg',
    1
  ),
(
    1341,
    62,
    'efdbd0e9-068b-4724-83d8-e1faea464a5a.jpeg',
    2
  ),
(
    1342,
    62,
    'e9cac134-1541-42db-8edb-fbaac6167b25.jpeg',
    3
  ),
(
    1349,
    19,
    '53aade65-6c2a-4b82-8923-088919b8146e.jpeg',
    1
  ),
(
    1350,
    19,
    '9cc73295-1e33-4d8f-bc7e-5b34fb0e89c9.jpeg',
    2
  ),
(
    1351,
    19,
    '663b95ba-7699-4841-b5a3-2ee8da0715e1.jpeg',
    3
  ),
(
    1352,
    19,
    '87c67ad0-cc0e-4046-9dae-87d16de04624.jpeg',
    4
  ),
(
    1353,
    19,
    '93b047cf-574d-49be-b37b-c8ac28a5e97f.jpeg',
    5
  ),
(
    1354,
    9,
    'bbe311da-ed7f-46e6-bf6b-6d8a04549365.jpeg',
    1
  ),
(
    1355,
    9,
    '2e0e6936-84c7-455c-ad37-2c78a34cc501.jpeg',
    2
  ),
(
    1356,
    9,
    '8b6a8ec5-f907-4750-993b-844bfc600326.jpeg',
    3
  ),
(
    1357,
    9,
    '28a332ec-c925-46ba-9072-b027534969e0.jpeg',
    4
  ),
(
    1358,
    9,
    '865b2276-e551-4d37-99e5-54346d6398cd.jpeg',
    5
  ),
(
    1359,
    43,
    'b9995cba-2e47-4f65-9510-e0003aafbe3b.jpeg',
    1
  ),
(
    1360,
    43,
    'ae0eba09-0671-4fc7-9f88-819acd69bbf4.jpeg',
    2
  ),
(
    1361,
    43,
    'a6d7b0b9-f644-45d8-abdd-afc69eb4e9a5.jpeg',
    3
  ),
(
    1362,
    43,
    'f10c8161-c54e-4ee1-a5d8-9a61e57c65e1.jpeg',
    4
  ),
(
    1363,
    12,
    '67286586-c487-4a16-87dc-f322ae0252b6.jpeg',
    1
  ),
(
    1364,
    12,
    '9e86c5d5-6338-4316-867b-689bf3fe61ca.jpeg',
    2
  ),
(
    1365,
    12,
    '8226cd0a-6ffa-40b3-9d7a-7539fcb42817.jpeg',
    3
  ),
(
    1366,
    12,
    '4504ba92-c295-423a-846c-34389676ad6a.jpeg',
    4
  ),
(
    1367,
    60,
    'ba0e8d4c-1504-4613-9b56-8cdbf29df25e.jpeg',
    1
  ),
(
    1368,
    60,
    '8f9f5e57-6427-4713-9a33-69c185511279.jpeg',
    2
  ),
(
    1369,
    60,
    '27e3ed6d-61ac-4e87-89e6-4ed2b38420fb.jpeg',
    3
  ),
(
    1370,
    60,
    '51ac1ca3-2f90-4af8-9d97-9f9ff9ebb595.jpeg',
    4
  ),
(
    1371,
    60,
    '3a6a3101-8537-467e-aefd-99b556b9a473.jpeg',
    5
  ),
(
    1372,
    11,
    'c93705ed-4706-4464-8b3f-35ed6920e2b9.jpeg',
    1
  ),
(
    1373,
    11,
    '6d193bcd-6727-4c6e-9150-5cd30553ae50.jpeg',
    2
  ),
(
    1374,
    11,
    'f52f47f3-0782-41ae-bcb5-0cd1ad8ed321.jpeg',
    3
  ),
(
    1375,
    11,
    'b2da86db-8ea1-40e9-9b5e-f1fcad23ccf9.jpeg',
    4
  ),
(
    1376,
    11,
    'f27fd0c2-3e09-463c-913e-e30e137e0982.jpeg',
    5
  ),
(
    1382,
    49,
    'f6733383-01dd-436a-8a67-abb41fb30461.jpeg',
    1
  ),
(
    1383,
    49,
    'e86f0804-8f60-4516-908f-63b3f09013bf.jpeg',
    2
  ),
(
    1384,
    49,
    'abe49fd2-5931-4d14-998a-00a03b6b0021.jpeg',
    3
  ),
(
    1385,
    36,
    'cf405f98-b4d1-4248-98c7-59a94a4392d2.jpeg',
    1
  ),
(
    1386,
    36,
    'd30fa9ef-ab12-4443-9965-4b6a746e7fe0.jpeg',
    2
  ),
(
    1387,
    36,
    'e158e6d3-8085-4e73-9bab-d6d0cdaff4da.jpeg',
    3
  ),
(
    1388,
    36,
    '059db342-947c-437c-bd9a-5884978f62ed.jpeg',
    4
  ),
(
    1389,
    35,
    '0be9f309-94d5-4457-80f1-a21cc4e5c40d.jpeg',
    1
  ),
(
    1390,
    35,
    'b46e5577-bb4c-4e03-ac99-66832b9a7a25.jpeg',
    2
  ),
(
    1391,
    69,
    '99de1b07-e39b-49c1-9aa6-7a9e9f77336a.jpeg',
    1
  ),
(
    1392,
    69,
    '2dc3a47b-567b-477e-b379-1023aaf37326.jpeg',
    2
  ),
(
    1393,
    69,
    '533d324d-b708-4a90-819f-0c1eb4efd5eb.jpeg',
    3
  ),
(
    1394,
    69,
    '05388277-1a5a-491c-99ec-3d29f40b590c.jpeg',
    4
  ),
(
    1395,
    69,
    'a84d7745-1473-49c3-83d7-cba7ccb4a498.jpeg',
    5
  ),
(
    1396,
    69,
    '7179f3bc-547d-4f83-b1c6-ad460e059d77.jpeg',
    6
  ),
(
    1405,
    10,
    '9c316663-6761-45a0-8947-abbcbb6bd4f0.jpeg',
    1
  ),
(
    1406,
    10,
    'e54d19c7-ddf5-4608-9ea4-20cf7aa378b3.jpeg',
    2
  ),
(
    1407,
    10,
    '96b61c67-ec11-498c-a832-6e06dce875a7.jpeg',
    3
  ),
(
    1408,
    10,
    'f4a26790-3683-42b6-a04a-bf17e15a82fe.jpeg',
    4
  ),
(
    1409,
    10,
    '1caefac8-aa51-448b-a25d-aa29ce55f1cf.jpeg',
    5
  ),
(
    1410,
    10,
    'bbabcfe8-755e-4e0c-ac62-7866ce1096aa.jpeg',
    6
  ),
(
    1411,
    10,
    'a62f0b61-02b7-46cc-b0ec-27cd527e9d89.jpeg',
    7
  ),
(
    1412,
    72,
    '9b7e9375-fb94-49fc-8a25-033c0f1db95c.jpeg',
    1
  ),
(
    1413,
    72,
    'c3402d9d-c37f-463a-bcec-c69417cdfe00.jpeg',
    2
  ),
(
    1414,
    72,
    '447a97e8-7c43-4c4a-bf49-53dc401ca76e.jpeg',
    3
  ),
(
    1415,
    72,
    '07e2e218-7c7c-46a1-a0ea-a95590bfbf73.jpeg',
    4
  ),
(
    1416,
    72,
    '8b0d0652-db3e-4eca-b14f-df6ac0541873.jpeg',
    5
  ),
(
    1417,
    72,
    '8ae45951-5f3d-48d9-9543-8403eb244659.jpeg',
    6
  ),
(
    1418,
    70,
    '9fc02d57-b8fb-42ef-9508-bef61c5bf41a.jpeg',
    1
  ),
(
    1419,
    70,
    'e114deff-07bd-4266-a567-b9c327db0f64.jpeg',
    2
  ),
(
    1420,
    70,
    '9efcb6be-a997-4d97-b90c-5d1d0666284a.jpeg',
    3
  ),
(
    1421,
    70,
    'c66f3d38-34eb-4621-a15f-a3e0ed42a0c1.jpeg',
    4
  ),
(
    1422,
    70,
    '0b174c43-a885-4a08-9638-5a8061f9765b.jpeg',
    5
  ),
(
    1423,
    56,
    'bc147245-a052-4755-b17d-673965ce3921.jpeg',
    1
  ),
(
    1424,
    56,
    'f9cb5a23-99fd-4f4d-9eca-0304018286fd.jpeg',
    2
  ),
(
    1425,
    56,
    'a604ed76-146f-4f40-989a-f804d7d86c76.jpeg',
    3
  ),
(
    1426,
    56,
    '6f81f715-0be1-4caa-9def-8b9945a8c362.jpeg',
    4
  ),
(
    1427,
    54,
    'ce1bbd62-0d21-4c7a-9dd2-c0c586d5ea71.jpeg',
    1
  ),
(
    1428,
    54,
    '82e40892-f5df-4f23-9b2f-4b2fa1621853.jpeg',
    2
  ),
(
    1429,
    54,
    '1d160f9a-1faa-4338-885f-322d6db6cf09.jpeg',
    3
  ),
(
    1430,
    54,
    'a6134b59-1166-4d13-9735-fd59a167cc99.jpeg',
    4
  ),
(
    1431,
    54,
    '5073edb7-c705-4e0d-98e0-99ad2213ecb2.jpeg',
    5
  ),
(
    1432,
    54,
    '7d493802-8f8b-4c84-9ad6-b05b1c7bb9c4.jpeg',
    6
  ),
(
    1433,
    73,
    'fa669f86-3229-41c8-9839-58500c5b37b4.jpeg',
    1
  ),
(
    1434,
    73,
    'ff521c2f-dba7-4b18-af1a-a8836bfa252d.jpeg',
    2
  ),
(
    1435,
    73,
    'feeedd28-0fbf-4250-b11d-ebf9096a88a5.jpeg',
    3
  ),
(
    1436,
    73,
    '2140af2b-00dc-4eda-ab41-f683718ad266.jpeg',
    4
  ),
(
    1437,
    73,
    'ab27bd0a-79e1-49d5-9087-a7624f1de2b4.jpeg',
    5
  ),
(
    1438,
    74,
    'e507a88e-a510-4a44-9796-135a7976e1fc.jpeg',
    1
  ),
(
    1439,
    74,
    'd612d65d-0a92-4f33-8f2a-42883a2f6ae2.jpeg',
    2
  ),
(
    1440,
    75,
    '8d456110-e19b-429d-a818-1a4a6c88cdaf.jpeg',
    1
  ),
(
    1441,
    75,
    'c43baa90-9f8a-4b17-a943-360a32e9eded.jpeg',
    2
  ),
(
    1442,
    21,
    '5522b597-227b-40eb-a16a-4d75b1a1139e.jpeg',
    1
  ),
(
    1443,
    21,
    '8d7211ac-75f4-4fa3-ad1f-7d8ab6dccd5a.jpeg',
    2
  ),
(
    1444,
    21,
    '13028120-65a8-4e64-a0b0-c31bfcbec040.jpeg',
    3
  ),
(
    1445,
    21,
    '4e7a2a7a-8149-4409-8a63-866266699404.jpeg',
    4
  ),
(
    1454,
    23,
    'cfbb5a30-906e-4e9d-b2df-0f5587d70c47.jpeg',
    1
  ),
(
    1455,
    23,
    '048a81ac-72b1-414f-ad6b-1a33d6de4e00.jpeg',
    2
  ),
(
    1456,
    23,
    'd252039a-63c6-4b1a-af83-6d9c605c2be7.jpeg',
    3
  ),
(
    1457,
    23,
    '9dcd1060-1955-4c54-9804-fe5c7d2d4e75.jpeg',
    4
  ),
(
    1458,
    25,
    'fa177d74-8eb1-4b33-ab69-371df413119f.jpeg',
    1
  ),
(
    1459,
    25,
    '95bb8262-3a78-488f-a318-67a67275181d.jpeg',
    2
  ),
(
    1460,
    25,
    'f8d8e5c5-3e69-4813-aefc-4ab7e13ba402.jpeg',
    3
  ),
(
    1461,
    25,
    '47d22d87-a26b-4b15-9e71-5920d4945849.jpeg',
    4
  ),
(
    1462,
    32,
    '7cf78b44-969e-4cbd-8919-f5809802a549.jpeg',
    1
  ),
(
    1463,
    32,
    'c6504b84-987a-40c2-a711-1413dd97aa96.jpeg',
    2
  ),
(
    1464,
    32,
    'a73b1cd4-15d8-41a9-879f-dc3b17186119.jpeg',
    3
  ),
(
    1465,
    32,
    '2ae11836-0eb4-4222-a9a3-9b351f480d07.jpeg',
    4
  ),
(
    1466,
    32,
    'ede53545-40df-4ec7-b37c-6cc4b9026ad0.jpeg',
    5
  ),
(
    1483,
    58,
    'd6a5deea-5cc5-4228-aac0-4927e66d1bb7.jpeg',
    1
  ),
(
    1484,
    58,
    '3e91462f-7ccf-451b-979b-09954f7a4ec6.jpeg',
    2
  ),
(
    1485,
    58,
    'c96cea3c-6f16-4b93-aa88-aba21c01f858.jpeg',
    3
  ),
(
    1486,
    58,
    '8c4b8b1c-ef73-4aed-9053-e2bff4ad63c0.jpeg',
    4
  ),
(
    1487,
    58,
    '2e8814ce-24e7-4983-97cd-a8906ccbdbd7.jpeg',
    5
  ),
(
    1488,
    58,
    '7103221b-d0c2-4086-a93a-8f97cbdee0b1.jpeg',
    6
  ),
(
    1489,
    31,
    'c11333d6-c7b6-47f2-8c63-ef023987027e.jpeg',
    1
  ),
(
    1490,
    31,
    'de750aa9-5d8a-493b-ac69-e3d550c59c3f.jpeg',
    2
  ),
(
    1491,
    31,
    '5d4d836f-a6d5-44f8-a99c-4064529364e0.jpeg',
    3
  ),
(
    1492,
    53,
    'eec94269-edd6-41e6-a8b6-8e628b897432.jpeg',
    1
  ),
(
    1493,
    53,
    '3e8c5dcc-fa25-4115-843b-6d26f205070f.jpeg',
    2
  ),
(
    1494,
    53,
    'cea630db-0644-42a7-bbaa-b8e3d15650d7.jpeg',
    3
  ),
(
    1495,
    53,
    '19564c4f-62d9-4583-a69f-ac743b01bca2.jpeg',
    4
  ),
(
    1496,
    53,
    'fd9dc922-110b-4a08-a183-fd567aba930b.jpeg',
    5
  ),
(
    1497,
    53,
    '27a5e9e4-0328-44a8-a440-293218278663.jpeg',
    6
  ),
(
    1498,
    53,
    'dbb34fcd-68bd-484c-bc2a-2070f1d8633a.jpeg',
    7
  ),
(
    1499,
    53,
    '4994f1c7-96bb-4211-b88e-59152dcf02f9.jpeg',
    8
  ),
(
    1500,
    53,
    '328c8bca-3e85-4a41-9a94-dafab6d964bb.jpeg',
    9
  ),
(
    1587,
    79,
    '1998dabf-418c-4b4a-b9ec-90b8703cdae6.jpeg',
    1
  ),
(
    1588,
    79,
    '5c3c7a5a-b5e0-4947-83c8-15cebb87cfe2.jpeg',
    2
  ),
(
    1589,
    79,
    '1365c763-5b4c-449d-9fce-e59fc653b4dc.jpeg',
    3
  ),
(
    1590,
    79,
    '716bac46-3723-45fa-991a-440b55004a25.jpeg',
    4
  ),
(
    1597,
    80,
    '3a5a9c10-5f69-4e2a-a8a7-92763aaa5385.jpeg',
    1
  ),
(
    1598,
    80,
    '44daa692-dc56-44dd-8fdc-58632667afa2.jpeg',
    2
  ),
(
    1599,
    80,
    '3d528473-ea52-46c1-be88-196e2c957918.jpeg',
    3
  ),
(
    1600,
    80,
    'aece452c-ee29-489b-b3b7-0616c2befe67.jpeg',
    4
  ),
(
    1601,
    80,
    'f7112ce0-bcc8-4c80-8ed8-0147053bb948.jpeg',
    5
  ),
(
    1602,
    80,
    '94d4313c-8c7b-4aef-8b89-779e2ce6fe41.jpeg',
    6
  ),
(
    1603,
    33,
    '17b05171-155b-4ab4-a22a-c389c427a4f5.jpeg',
    1
  ),
(
    1604,
    33,
    'c882f545-7961-47ff-9785-44ba4ca1f897.jpeg',
    2
  ),
(
    1605,
    33,
    '4ed134bd-985c-48c3-8a05-957a33b3a25d.jpeg',
    3
  ),
(
    1606,
    33,
    '5568b618-cbad-4cd2-a25f-64944a46f5cd.jpeg',
    4
  ),
(
    1607,
    33,
    '624f33c3-0510-4ff3-bbf1-f7adcc1df45b.jpeg',
    5
  ),
(
    1622,
    78,
    '91992222-4e67-4006-a745-0c044f03de75.jpeg',
    1
  ),
(
    1623,
    78,
    '065a1d24-b82c-4ab7-85c3-a0d45fb977d2.jpeg',
    2
  ),
(
    1624,
    78,
    'dd8cd270-ae66-48ee-99d1-e08f290641ee.jpeg',
    3
  ),
(
    1625,
    78,
    '1370987f-042d-4a6c-b661-3488fc4e1f68.jpeg',
    4
  ),
(
    1626,
    78,
    '30543638-3436-43bf-a471-c713acf00c96.jpeg',
    5
  ),
(
    1637,
    81,
    '3994b81d-f37d-4de9-81c4-35d54d862c69.jpeg',
    1
  ),
(
    1638,
    81,
    '78eb1f4c-aef4-4160-a5bd-1985e387ef87.jpeg',
    2
  ),
(
    1639,
    81,
    '5300ce13-ea03-44d4-9f9e-eb4ae8f171cd.jpeg',
    3
  ),
(
    1640,
    81,
    '7380a1f2-4e51-47bc-9c81-88106d910c3e.jpeg',
    4
  ),
(
    1641,
    81,
    '4a3b7935-2df3-4902-9505-bdf1b72ad561.jpeg',
    5
  ),
(
    1656,
    82,
    '8cdb9fe0-43e6-41f9-b8ea-343aba23ddf3.jpeg',
    1
  ),
(
    1657,
    82,
    'ee53e476-38fa-4c22-851e-086cfb7ee22d.jpeg',
    2
  ),
(
    1658,
    82,
    '9919cfdd-6926-4d18-89e2-4d7925e29796.jpeg',
    3
  ),
(
    1659,
    82,
    '4a91a886-9936-4a6a-a996-80b8d648628d.jpeg',
    4
  ),
(
    1660,
    82,
    '7899cf9d-8662-4950-9ce2-a82433667e1c.jpeg',
    5
  ),
(
    1661,
    82,
    '96eacc79-9e8e-44b2-9bd1-d0ed2c33eeae.jpeg',
    6
  ),
(
    1662,
    82,
    'a2707c0f-da4a-4947-b3fe-1200cddf2dda.jpeg',
    7
  ),
(
    1663,
    64,
    'b8d635e7-45b6-4fb7-8273-a967d466fdad.jpeg',
    1
  ),
(
    1664,
    64,
    '8086cf95-56bf-4b14-a12b-82fe0f265d61.jpeg',
    2
  ),
(
    1665,
    64,
    '6c782597-c14a-4d76-aff8-d0c2619cb9b5.jpeg',
    3
  ),
(
    1666,
    64,
    '5f715a3d-aa8f-4d2f-8e58-7833a4a0f2cd.jpeg',
    4
  ),
(
    1667,
    64,
    'c1b79484-c7b2-445c-aeee-4fd23dc04d22.jpeg',
    5
  ),
(
    1668,
    64,
    '2fc533a8-8127-4a07-ac91-0a265ba40965.jpeg',
    6
  ),
(
    1669,
    64,
    '5236dd79-f6fa-433a-9afe-d9ffca6cea9d.jpeg',
    7
  ),
(
    1670,
    64,
    '6eb81cec-df35-4562-b242-818cec15ff11.jpeg',
    8
  ),
(
    1679,
    83,
    'e5542fd1-cdd5-4f2e-b572-a89c6f335403.jpeg',
    1
  ),
(
    1680,
    83,
    '6e9c1a80-03ae-4a74-b6a7-7f4c6412e545.jpeg',
    2
  ),
(
    1681,
    83,
    '4048cd85-5762-41af-9c19-3f91ac73ad45.jpeg',
    3
  ),
(
    1682,
    83,
    'dbb341e9-27d9-4b26-bb73-3631af62eaad.jpeg',
    4
  ),
(
    1698,
    87,
    '25e1aa32-1fab-496c-9c46-02caea7f5389.jpeg',
    1
  ),
(
    1699,
    87,
    'e2eeda0d-1334-4897-8e60-34767bf18e26.jpeg',
    2
  ),
(
    1700,
    87,
    'dc07edb6-22bd-42e3-a534-e309c0d19f36.jpeg',
    3
  ),
(
    1701,
    87,
    'ba420094-477e-4879-8fd1-92784f9d4204.jpeg',
    4
  ),
(
    1702,
    87,
    'adbcc405-84b8-40ae-ad0e-af94ff0733f7.jpeg',
    5
  ),
(
    1703,
    87,
    'cd1ed9c7-1a97-4ab3-bef7-5c153903f615.jpeg',
    6
  ),
(
    1825,
    112,
    'fa51cc1d-18d4-46ef-9971-390cfaf3cad4.jpeg',
    1
  ),
(
    1826,
    112,
    '0fc28e92-a0a3-4256-a151-6ef11ba70b5b.jpeg',
    2
  ),
(
    1827,
    112,
    'ca539a98-dd2c-4eec-a38a-15b885ce6863.jpeg',
    3
  ),
(
    1828,
    112,
    '345ef4c0-e4f8-4ebf-91da-19d329f30123.jpeg',
    4
  ),
(
    1829,
    112,
    'e88a30d4-1499-41cf-a8bf-2301159e38e5.jpeg',
    5
  );

/*!40000 ALTER TABLE `photos` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `shoot_models`
--
DROP TABLE IF EXISTS `shoot_models`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `shoot_models` (
  `shoot_id` int unsigned NOT NULL,
  `model_id` int unsigned NOT NULL,
  PRIMARY KEY (`shoot_id`, `model_id`),
  KEY `shoot_models_model_id_foreign` (`model_id`),
  CONSTRAINT `shoot_models_model_id_foreign` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shoot_models_shoot_id_foreign` FOREIGN KEY (`shoot_id`) REFERENCES `shoots` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `shoot_models`
--
LOCK TABLES `shoot_models` WRITE;

/*!40000 ALTER TABLE `shoot_models` DISABLE KEYS */
;

INSERT INTO
  `shoot_models`
VALUES
  (34, 1),
(4, 2),
(10, 3),
(43, 3),
(58, 3),
(9, 7),
(18, 7),
(11, 9),
(12, 10),
(49, 11),
(14, 13),
(78, 13),
(15, 14),
(31, 14),
(16, 15),
(19, 18),
(17, 19),
(20, 19),
(21, 20),
(21, 21),
(23, 23),
(25, 25),
(27, 27),
(72, 27),
(29, 29),
(32, 31),
(33, 32),
(36, 36),
(40, 40),
(44, 41),
(47, 42),
(7, 45),
(41, 46),
(35, 49),
(50, 50),
(51, 51),
(52, 52),
(53, 53),
(54, 54),
(55, 54),
(56, 55),
(57, 56),
(61, 57),
(64, 58),
(69, 62),
(81, 62),
(62, 63),
(60, 64),
(48, 65),
(59, 66),
(70, 67),
(73, 68),
(74, 68),
(75, 68),
(79, 69),
(80, 70),
(82, 71),
(83, 72),
(87, 73),
(112, 76);

/*!40000 ALTER TABLE `shoot_models` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `shoot_photographers`
--
DROP TABLE IF EXISTS `shoot_photographers`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `shoot_photographers` (
  `shoot_id` int unsigned NOT NULL,
  `photographer_id` int unsigned NOT NULL,
  PRIMARY KEY (`shoot_id`, `photographer_id`),
  KEY `shoot_photographers_photographer_id_foreign` (`photographer_id`),
  CONSTRAINT `shoot_photographers_photographer_id_foreign` FOREIGN KEY (`photographer_id`) REFERENCES `photographers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shoot_photographers_shoot_id_foreign` FOREIGN KEY (`shoot_id`) REFERENCES `shoots` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `shoot_photographers`
--
LOCK TABLES `shoot_photographers` WRITE;

/*!40000 ALTER TABLE `shoot_photographers` DISABLE KEYS */
;

INSERT INTO
  `shoot_photographers`
VALUES
  (7, 4),
(50, 4),
(9, 5),
(10, 6),
(11, 7),
(12, 7),
(14, 7),
(15, 7),
(16, 7),
(17, 7),
(18, 7),
(19, 7),
(20, 7),
(40, 7),
(41, 7),
(21, 8),
(23, 8),
(25, 8),
(27, 8),
(29, 8),
(31, 9),
(32, 10),
(83, 10),
(33, 11),
(53, 11),
(54, 11),
(55, 11),
(56, 11),
(79, 11),
(35, 12),
(36, 13),
(34, 15),
(44, 17),
(48, 17),
(47, 18),
(43, 19),
(49, 20),
(59, 20),
(60, 20),
(61, 20),
(62, 20),
(51, 21),
(52, 21),
(57, 22),
(58, 23),
(64, 25),
(69, 25),
(70, 25),
(72, 25),
(78, 25),
(80, 25),
(81, 25),
(82, 25),
(87, 25),
(4, 26),
(73, 27),
(74, 27),
(75, 27),
(112, 29);

/*!40000 ALTER TABLE `shoot_photographers` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `shoot_tags`
--
DROP TABLE IF EXISTS `shoot_tags`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `shoot_tags` (
  `shoot_id` int unsigned NOT NULL,
  `tag_id` int unsigned NOT NULL,
  PRIMARY KEY (`shoot_id`, `tag_id`),
  KEY `shoot_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `shoot_tags_shoot_id_foreign` FOREIGN KEY (`shoot_id`) REFERENCES `shoots` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shoot_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `shoot_tags`
--
LOCK TABLES `shoot_tags` WRITE;

/*!40000 ALTER TABLE `shoot_tags` DISABLE KEYS */
;

INSERT INTO
  `shoot_tags`
VALUES
  (34, 7),
(51, 7),
(52, 7),
(53, 7),
(55, 7),
(14, 8),
(20, 8),
(47, 8),
(57, 8),
(87, 8),
(112, 8),
(4, 9),
(10, 9),
(11, 9),
(18, 9),
(19, 9),
(27, 9),
(33, 9),
(34, 9),
(40, 9),
(43, 9),
(47, 9),
(49, 9),
(54, 9),
(60, 9),
(64, 9),
(69, 9),
(70, 9),
(78, 9),
(80, 9),
(81, 9),
(82, 9),
(83, 9),
(87, 9),
(4, 10),
(7, 10),
(9, 10),
(10, 10),
(11, 10),
(12, 10),
(15, 10),
(16, 10),
(17, 10),
(18, 10),
(19, 10),
(21, 10),
(25, 10),
(27, 10),
(31, 10),
(35, 10),
(36, 10),
(40, 10),
(41, 10),
(43, 10),
(44, 10),
(49, 10),
(50, 10),
(52, 10),
(54, 10),
(56, 10),
(58, 10),
(60, 10),
(61, 10),
(62, 10),
(64, 10),
(69, 10),
(70, 10),
(72, 10),
(79, 10),
(80, 10),
(81, 10),
(82, 10),
(83, 10),
(112, 10),
(10, 11),
(20, 11),
(69, 11),
(72, 11),
(78, 11),
(81, 11),
(21, 12),
(23, 12),
(25, 12),
(29, 12),
(32, 12),
(33, 12),
(49, 12),
(54, 12),
(70, 12),
(82, 12),
(47, 16),
(79, 16),
(23, 17),
(29, 17),
(32, 17),
(33, 17),
(48, 17),
(59, 17),
(58, 18),
(73, 18),
(74, 18),
(75, 18);

/*!40000 ALTER TABLE `shoot_tags` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `shoots`
--
DROP TABLE IF EXISTS `shoots`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `shoots` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `shoot_date` date DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 121 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `shoots`
--
LOCK TABLES `shoots` WRITE;

/*!40000 ALTER TABLE `shoots` DISABLE KEYS */
;

INSERT INTO
  `shoots`
VALUES
  (4, '2024-07-10', 56),
(7, '2024-07-10', 38),
(9, '2024-07-10', 89),
(10, '2024-07-10', 97),
(11, '2024-07-10', 93),
(12, '2024-07-10', 92),
(14, '2024-07-10', 81),
(15, '2024-07-10', 68),
(16, '2024-07-10', 83),
(17, '2024-07-10', 84),
(18, '2024-07-10', 63),
(19, '2024-07-10', 88),
(20, '2024-07-10', 73),
(21, '2024-07-11', 106),
(23, '2024-07-11', 39),
(25, '2024-07-11', 59),
(27, '2024-07-10', 66),
(29, '2024-07-10', 71),
(31, '2024-07-11', 79),
(32, '2024-07-11', 67),
(33, '2024-07-17', 70),
(34, '2024-07-10', 108),
(35, '2024-07-10', 95),
(36, '2024-07-10', 94),
(40, '2024-07-10', 82),
(41, '2024-07-10', 40),
(43, '2024-07-10', 91),
(44, '2024-07-10', 78),
(47, '2024-07-10', 116),
(48, '2024-07-10', 62),
(49, '2024-07-10', 69),
(50, '2024-07-10', 77),
(51, '2024-07-10', 111),
(52, '2024-07-10', 110),
(53, '2024-07-11', 105),
(54, '2024-07-10', 104),
(55, '2024-07-10', 109),
(56, '2024-07-10', 103),
(57, '2024-07-10', 102),
(58, '2024-07-11', 85),
(59, '2024-07-10', 54),
(60, '2024-07-10', 55),
(61, '2024-07-10', 80),
(62, '2024-07-10', 86),
(64, '2024-07-19', 37),
(69, '2024-07-10', 96),
(70, '2024-07-10', 101),
(72, '2024-07-10', 100),
(73, '2024-07-11', 112),
(74, '2024-07-11', 113),
(75, '2024-07-11', 115),
(78, '2024-07-17', 87),
(79, '2024-07-17', 60),
(80, '2024-07-17', 72),
(81, '2024-07-18', 57),
(82, '2024-07-18', 61),
(83, '2024-07-22', 64),
(87, '2024-07-23', 9),
(112, '2024-12-14', 8);

/*!40000 ALTER TABLE `shoots` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `tags`
--
DROP TABLE IF EXISTS `tags`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `tags`
--
LOCK TABLES `tags` WRITE;

/*!40000 ALTER TABLE `tags` DISABLE KEYS */
;

INSERT INTO
  `tags`
VALUES
  (7, 'Commercial'),
(8, 'Creative'),
(9, 'Styling'),
(10, 'Beauty'),
(11, 'Wigs'),
(12, 'Grooming'),
(16, 'Theater'),
(17, 'Celebrities'),
(18, 'Bridal'),
(25, 'Hairstyling');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */
;

INSERT INTO
  `users`
VALUES
  (
    1,
    'amithamillensuwanta@gmail.com',
    '$2b$10$rJVO3mFssaBrTOfwTRq0z.0gE7/qKgRYp2PLQf0WsecaJxuykWbcG'
  );

/*!40000 ALTER TABLE `users` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;