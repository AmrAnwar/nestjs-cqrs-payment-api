CREATE DATABASE IF NOT EXISTS `emnify`;
USE `emnify`;

-- MariaDB dump 10.19  Distrib 10.9.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: emnify
-- ------------------------------------------------------
-- Server version10.9.2-MariaDB-1:10.9.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cdr`
--

DROP TABLE IF EXISTS `cdr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cdr` (
  `cdr_id` int(11) NOT NULL AUTO_INCREMENT,
  `sim_id` int(11) NOT NULL,
  `ratezone_id` int(11) NOT NULL,
  `timestamp` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `volume` decimal(14,6) NOT NULL,
  PRIMARY KEY (`cdr_id`),
  KEY `FK_8c79b055bbaa26be6f984feea10` (`sim_id`),
  KEY `FK_55c050f43d7683ba892a3562840` (`ratezone_id`),
  CONSTRAINT `FK_55c050f43d7683ba892a3562840` FOREIGN KEY (`ratezone_id`) REFERENCES `ratezone` (`ratezone_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8c79b055bbaa26be6f984feea10` FOREIGN KEY (`sim_id`) REFERENCES `sim` (`sim_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cdr`
--

LOCK TABLES `cdr` WRITE;
/*!40000 ALTER TABLE `cdr` DISABLE KEYS */;
INSERT INTO `cdr` VALUES
(1,1,2,'2022-09-14 18:13:25.000000',0.000000),
(2,2,1,'2022-09-14 18:13:25.000000',0.000000),
(3,3,2,'2022-09-14 18:13:25.000000',0.000000),
(4,4,3,'2022-09-14 18:13:25.000000',0.000000),
(5,5,1,'2022-09-14 18:13:25.000000',0.000000),
(6,6,3,'2022-09-14 18:13:25.000000',0.000000),
(7,7,2,'2022-09-14 18:13:25.000000',0.000000),
(8,8,1,'2022-09-14 18:13:25.000000',0.000000),
(9,9,1,'2022-09-14 18:13:25.000000',0.000000),
(10,1,2,'2022-09-14 18:13:25.000000',0.000000),
(11,2,3,'2022-09-14 18:13:25.000000',0.000000),
(12,3,3,'2022-09-14 18:13:25.000000',0.000000),
(13,4,2,'2022-09-14 18:13:25.000000',0.000000),
(14,5,2,'2022-09-14 18:13:25.000000',0.000000),
(15,6,3,'2022-09-14 18:13:25.000000',0.000000),
(16,7,1,'2022-09-14 18:13:25.000000',0.000000),
(17,8,1,'2022-09-14 18:13:25.000000',0.000000),
(18,9,2,'2022-09-14 18:13:25.000000',0.000000),
(19,1,1,'2022-09-17 12:34:24.000000',0.000000),
(20,1,1,'2022-09-18 03:05:08.876000',1.000000),
(21,1,1,'2022-09-18 03:07:15.632000',1.000000),
(22,1,1,'2022-09-18 03:13:33.063000',1.000000),
(23,1,1,'2022-09-18 03:14:18.013000',1.000000),
(24,1,1,'2022-09-18 03:15:24.289000',1.000000),
(25,1,1,'2022-09-18 03:17:33.496000',1.000000),
(26,1,1,'2022-09-18 03:18:17.607000',1.000000),
(27,1,1,'2022-09-18 03:18:41.397000',1.000000),
(28,1,1,'2022-09-18 03:23:50.018000',1.000000),
(29,1,1,'2022-09-18 03:24:09.712000',30.000000),
(30,1,1,'2022-09-18 14:05:17.341000',30.000000),
(31,1,1,'2022-09-18 14:15:49.330000',30.000000),
(32,1,1,'2022-09-18 14:16:04.616000',30.000000),
(33,1,1,'2022-09-18 14:19:12.385000',30.000000),
(34,1,1,'2022-09-18 22:02:20.906000',30.000000),
(35,1,1,'2022-09-18 22:02:48.272000',100.000000),
(36,1,1,'2022-09-18 22:24:11.026000',100.000000),
(37,1,1,'2022-09-18 22:24:12.035000',100.000000),
(38,1,1,'2022-09-18 23:32:11.499000',123.000000),
(39,1,1,'2022-09-18 23:32:49.895000',123123.000000),
(40,2,1,'2022-09-18 23:33:28.760000',123123.000000),
(41,2,1,'2022-09-18 23:34:03.888000',123123.000000),
(42,2,1,'2022-09-18 23:34:44.051000',123123.000000),
(43,2,1,'2022-09-18 23:35:57.105000',123123.000000),
(44,2,1,'2022-09-18 23:39:02.059000',123123.000000),
(45,2,1,'2022-09-18 23:39:46.498000',123123.000000),
(46,2,1,'2022-09-18 23:40:29.738000',123123.000000),
(47,2,1,'2022-09-18 23:41:07.435000',123123.000000),
(48,2,1,'2022-09-18 23:42:31.067000',123123.000000),
(49,2,1,'2022-09-18 23:47:03.075000',123123.000000),
(50,2,1,'2022-09-18 23:47:51.020000',123123.000000),
(51,2,1,'2022-09-18 23:53:15.792000',123123.000000),
(52,2,1,'2022-09-18 23:53:33.262000',123123.000000);
/*!40000 ALTER TABLE `cdr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency_exchange`
--

DROP TABLE IF EXISTS `currency_exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency_exchange` (
  `from_currency` enum('USD','EUR') NOT NULL,
  `to_currency` enum('USD','EUR') NOT NULL,
  `exchange_rate` decimal(14,6) NOT NULL,
  PRIMARY KEY (`from_currency`,`to_currency`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency_exchange`
--

LOCK TABLES `currency_exchange` WRITE;
/*!40000 ALTER TABLE `currency_exchange` DISABLE KEYS */;
INSERT INTO `currency_exchange` VALUES
('USD','EUR',1.200000),
('EUR','USD',2.000000);
/*!40000 ALTER TABLE `currency_exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inclusive_volume`
--

DROP TABLE IF EXISTS `inclusive_volume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inclusive_volume` (
  `volume_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `organisation_id` int(11) NOT NULL,
  `remaining_volume` decimal(14,6) NOT NULL,
  `initial_volume` decimal(14,6) NOT NULL,
  PRIMARY KEY (`volume_id`),
  UNIQUE KEY `REL_984fd60865ca4b2e1c44c55ec3` (`organisation_id`),
  CONSTRAINT `FK_984fd60865ca4b2e1c44c55ec32` FOREIGN KEY (`organisation_id`) REFERENCES `organisation` (`organisation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inclusive_volume`
--

LOCK TABLES `inclusive_volume` WRITE;
/*!40000 ALTER TABLE `inclusive_volume` DISABLE KEYS */;
INSERT INTO `inclusive_volume` VALUES
(19,'2022-09-18 00:58:04.991000',1,0.000000,20.000000),
(26,'2022-09-18 00:59:50.875000',2,-123103.000000,20.000000);
/*!40000 ALTER TABLE `inclusive_volume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation`
--

DROP TABLE IF EXISTS `organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation` (
  `organisation_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`organisation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation`
--

LOCK TABLES `organisation` WRITE;
/*!40000 ALTER TABLE `organisation` DISABLE KEYS */;
INSERT INTO `organisation` VALUES
(1,''),
(2,''),
(3,''),
(4,'AmroOrganisation'),
(5,'AmroOrganisation'),
(6,'AmroOrganisation'),
(7,'AmroOrganisation'),
(8,'AmroOrganisation'),
(9,'AmroOrganisation');
/*!40000 ALTER TABLE `organisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `timestamp` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `organisation_id` int(11) NOT NULL,
  `cost` decimal(14,6) NOT NULL,
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `sim_id` int(11) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK_4c0cab743ed1259b50cfd0245d6` (`organisation_id`),
  KEY `FK_fc545681096a4bf44f07669a919` (`sim_id`),
  CONSTRAINT `FK_4c0cab743ed1259b50cfd0245d6` FOREIGN KEY (`organisation_id`) REFERENCES `organisation` (`organisation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fc545681096a4bf44f07669a919` FOREIGN KEY (`sim_id`) REFERENCES `sim` (`sim_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES
('2022-09-18 01:23:50.198796',1,0.000000,1,1),
('2022-09-18 01:24:09.805508',1,33.000000,2,1),
('2022-09-18 12:05:17.424887',1,33.000000,3,1),
('2022-09-18 12:15:49.461997',1,33.000000,4,1),
('2022-09-18 12:16:04.666322',1,33.000000,5,1),
('2022-09-18 12:19:12.851868',1,33.000000,6,1),
('2022-09-18 20:02:20.994335',1,33.000000,7,1),
('2022-09-18 20:02:48.318329',1,110.000000,8,1),
('2022-09-18 20:24:11.096368',1,110.000000,9,1),
('2022-09-18 20:24:12.097753',1,110.000000,10,1),
('2022-09-18 21:32:12.664614',1,135.300000,11,1),
('2022-09-18 21:32:51.013405',1,135435.300000,12,1),
('2022-09-18 21:34:04.977880',2,135435.300000,13,2),
('2022-09-18 21:34:45.124897',2,135435.300000,14,2),
('2022-09-18 21:35:58.208201',2,135435.300000,15,2),
('2022-09-18 21:41:08.552325',2,135435.300000,16,2),
('2022-09-18 21:42:32.194209',2,135435.300000,17,2),
('2022-09-18 21:47:04.201520',2,135435.300000,18,2),
('2022-09-18 21:47:52.118955',2,135435.300000,19,2),
('2022-09-18 21:53:16.929665',2,135435.300000,20,2),
('2022-09-18 21:53:34.371212',2,135435.300000,21,2);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate` (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `ratezone_id` int(11) DEFAULT NULL,
  `amount_per_volume` decimal(14,6) NOT NULL,
  PRIMARY KEY (`rate_id`),
  UNIQUE KEY `REL_4fb39b6434b79b58f88f3db88e` (`ratezone_id`),
  CONSTRAINT `FK_4fb39b6434b79b58f88f3db88ea` FOREIGN KEY (`ratezone_id`) REFERENCES `ratezone` (`ratezone_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES
(1,1,1.100000),
(2,2,1.200000);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratezone`
--

DROP TABLE IF EXISTS `ratezone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratezone` (
  `ratezone_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ratezone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratezone`
--

LOCK TABLES `ratezone` WRITE;
/*!40000 ALTER TABLE `ratezone` DISABLE KEYS */;
INSERT INTO `ratezone` VALUES
(1,'US'),
(2,'APAC'),
(3,'Europe');
/*!40000 ALTER TABLE `ratezone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sim`
--

DROP TABLE IF EXISTS `sim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sim` (
  `sim_id` int(11) NOT NULL AUTO_INCREMENT,
  `organisation_id` int(11) DEFAULT NULL,
  `registered_at` datetime NOT NULL,
  `iccid` varchar(255) NOT NULL,
  PRIMARY KEY (`sim_id`),
  KEY `FK_8cd1c9f2fb8b521cb314efe976c` (`organisation_id`),
  CONSTRAINT `FK_8cd1c9f2fb8b521cb314efe976c` FOREIGN KEY (`organisation_id`) REFERENCES `organisation` (`organisation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sim`
--

LOCK TABLES `sim` WRITE;
/*!40000 ALTER TABLE `sim` DISABLE KEYS */;
INSERT INTO `sim` VALUES
(1,1,'2022-09-14 18:13:25',''),
(2,2,'2022-09-14 18:13:25',''),
(3,3,'2022-09-14 18:13:25',''),
(4,1,'2022-09-14 18:13:25',''),
(5,2,'2022-09-14 18:13:25',''),
(6,3,'2022-09-14 18:13:25',''),
(7,1,'2022-09-14 18:13:25',''),
(8,2,'2022-09-14 18:13:25',''),
(9,3,'2022-09-14 18:13:25','');
/*!40000 ALTER TABLE `sim` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-22 10:07:04
# 