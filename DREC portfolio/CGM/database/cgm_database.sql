-- CGM Patient Assessment - Database for XAMPP (MySQL/MariaDB)
-- Run this in phpMyAdmin or: mysql -u root -p < cgm_database.sql

CREATE DATABASE IF NOT EXISTS cgm_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cgm_db;

-- Table: all patient form submissions (one row per submission)
CREATE TABLE IF NOT EXISTS cgm_submissions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Patient type & basic info
  patient_type VARCHAR(20) DEFAULT NULL COMMENT 'diabetic | prediabetic',
  patient_name VARCHAR(255) DEFAULT NULL,
  patient_contact VARCHAR(255) DEFAULT NULL,
  patient_email VARCHAR(255) DEFAULT NULL,
  patient_age VARCHAR(20) DEFAULT NULL,
  patient_gender VARCHAR(20) DEFAULT NULL,

  -- BMI
  height DECIMAL(6,2) DEFAULT NULL,
  weight DECIMAL(6,2) DEFAULT NULL,
  bmi VARCHAR(20) DEFAULT NULL,

  -- Blood glucose
  fasting_glucose_mmol VARCHAR(20) DEFAULT NULL,
  fasting_glucose VARCHAR(20) DEFAULT NULL,
  postprandial_glucose_mmol VARCHAR(20) DEFAULT NULL,
  postprandial_glucose VARCHAR(20) DEFAULT NULL,
  hba1c VARCHAR(20) DEFAULT NULL,
  glucose_test_date VARCHAR(50) DEFAULT NULL,

  -- Blood pressure
  systolic_bp VARCHAR(20) DEFAULT NULL,
  diastolic_bp VARCHAR(20) DEFAULT NULL,

  -- Prediabetic fields
  family_diabetes VARCHAR(10) DEFAULT NULL,
  sugary_foods VARCHAR(30) DEFAULT NULL,
  waist_exceeded VARCHAR(20) DEFAULT NULL,
  regular_exercise_150min VARCHAR(10) DEFAULT NULL,
  recent_glucose_level VARCHAR(30) DEFAULT NULL,
  prediabetic_fear_complications TEXT DEFAULT NULL COMMENT 'JSON array: dialysis,cardiovascular,neuropathy,amputation',
  prediabetic_hypertension_cholesterol VARCHAR(10) DEFAULT NULL COMMENT 'yes | no',

  -- Diabetic fields (eyes, urine, etc.)
  diabetic_blurred_vision VARCHAR(10) DEFAULT NULL,
  diabetic_night_vision VARCHAR(10) DEFAULT NULL,
  diabetic_visual_spots VARCHAR(10) DEFAULT NULL,
  diabetic_foamy_urine VARCHAR(10) DEFAULT NULL,
  diabetic_frequent_urination VARCHAR(10) DEFAULT NULL,
  diabetic_edema VARCHAR(10) DEFAULT NULL,
  diabetic_numbness VARCHAR(10) DEFAULT NULL,
  diabetic_shortness_breath VARCHAR(10) DEFAULT NULL,
  diabetic_foot_pain VARCHAR(10) DEFAULT NULL,
  diabetic_cardiovascular_history VARCHAR(10) DEFAULT NULL,
  diabetic_duration VARCHAR(30) DEFAULT NULL,
  diabetic_recent_hba1c VARCHAR(30) DEFAULT NULL,
  diabetic_taking_medication VARCHAR(30) DEFAULT NULL,
  diabetic_insulin_injection VARCHAR(30) DEFAULT NULL,

  -- Lifestyle (common)
  meals_per_day VARCHAR(20) DEFAULT NULL,
  sleep_quality VARCHAR(30) DEFAULT NULL,
  stress_level VARCHAR(30) DEFAULT NULL,
  smoking VARCHAR(30) DEFAULT NULL,
  alcohol VARCHAR(30) DEFAULT NULL,

  -- Additional
  cholesterol VARCHAR(20) DEFAULT NULL,
  waist_circumference VARCHAR(20) DEFAULT NULL,
  body_fat VARCHAR(20) DEFAULT NULL,
  exercise_frequency VARCHAR(30) DEFAULT NULL,

  -- Risk assessment (糖尿病前期/糖尿病患者风险评估)
  risk_score INT DEFAULT NULL COMMENT 'Prediabetic: 0-12, Diabetic: 0-19',
  risk_level VARCHAR(80) DEFAULT NULL COMMENT 'e.g. 低风险/中等风险/高风险',

  PRIMARY KEY (id),
  KEY idx_patient_type (patient_type),
  KEY idx_created_at (created_at),
  KEY idx_patient_name (patient_name(100)),
  KEY idx_patient_email (patient_email(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users (simple login for admin page)
-- Default: username=admin, password=admin123 (change in production)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin is created on first login: username=admin, password=admin123 (see api/auth.php)

-- If you already have cgm_submissions without risk columns, run this once:
-- ALTER TABLE cgm_submissions ADD COLUMN risk_score INT DEFAULT NULL COMMENT 'Prediabetic: 0-12, Diabetic: 0-19' AFTER exercise_frequency;
-- ALTER TABLE cgm_submissions ADD COLUMN risk_level VARCHAR(80) DEFAULT NULL COMMENT 'e.g. 低风险/中等风险/高风险' AFTER risk_score;

-- If you already have cgm_submissions without prediabetic_hypertension_cholesterol, run once:
-- ALTER TABLE cgm_submissions ADD COLUMN prediabetic_hypertension_cholesterol VARCHAR(10) DEFAULT NULL COMMENT 'yes | no' AFTER prediabetic_fear_complications;
