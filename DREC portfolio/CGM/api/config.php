<?php
/**
 * CGM Admin API - Database config for XAMPP (MySQL/MariaDB)
 * Only set JSON header when not included by a script that sends other output
 */
if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$db_host = 'localhost';
$db_name = 'cgm_db';
$db_user = 'root';
$db_pass = '';

try {
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database connection failed']);
    exit;
}

// Map frontend camelCase keys to DB snake_case columns
function submissionRowFromData($data) {
    $row = [
        'patient_type' => $data['patientType'] ?? null,
        'patient_name' => $data['patientName'] ?? null,
        'patient_contact' => $data['patientContact'] ?? null,
        'patient_email' => $data['patientEmail'] ?? null,
        'patient_age' => $data['patientAge'] ?? null,
        'patient_gender' => $data['patientGender'] ?? null,
        'height' => isset($data['height']) ? (float)$data['height'] : null,
        'weight' => isset($data['weight']) ? (float)$data['weight'] : null,
        'bmi' => $data['bmi'] ?? null,
        'fasting_glucose_mmol' => $data['fastingGlucoseMmol'] ?? null,
        'fasting_glucose' => $data['fastingGlucose'] ?? null,
        'postprandial_glucose_mmol' => $data['postprandialGlucoseMmol'] ?? null,
        'postprandial_glucose' => $data['postprandialGlucose'] ?? null,
        'hba1c' => $data['hba1c'] ?? null,
        'glucose_test_date' => $data['glucoseTestDate'] ?? null,
        'systolic_bp' => $data['systolicBP'] ?? null,
        'diastolic_bp' => $data['diastolicBP'] ?? null,
        'family_diabetes' => $data['family_diabetes'] ?? null,
        'sugary_foods' => $data['sugary_foods'] ?? null,
        'waist_exceeded' => $data['waist_exceeded'] ?? null,
        'regular_exercise_150min' => $data['regular_exercise_150min'] ?? null,
        'recent_glucose_level' => $data['recent_glucose_level'] ?? null,
        'prediabetic_fear_complications' => isset($data['prediabetic_fear_complications']) && is_array($data['prediabetic_fear_complications'])
            ? json_encode($data['prediabetic_fear_complications']) : null,
        'prediabetic_hypertension_cholesterol' => $data['prediabetic_hypertension_cholesterol'] ?? null,
        'diabetic_blurred_vision' => $data['diabetic_blurred_vision'] ?? null,
        'diabetic_night_vision' => $data['diabetic_night_vision'] ?? null,
        'diabetic_visual_spots' => $data['diabetic_visual_spots'] ?? null,
        'diabetic_foamy_urine' => $data['diabetic_foamy_urine'] ?? null,
        'diabetic_frequent_urination' => $data['diabetic_frequent_urination'] ?? null,
        'diabetic_edema' => $data['diabetic_edema'] ?? null,
        'diabetic_numbness' => $data['diabetic_numbness'] ?? null,
        'diabetic_shortness_breath' => $data['diabetic_shortness_breath'] ?? null,
        'diabetic_foot_pain' => $data['diabetic_foot_pain'] ?? null,
        'diabetic_cardiovascular_history' => $data['diabetic_cardiovascular_history'] ?? null,
        'diabetic_duration' => $data['diabetic_duration'] ?? null,
        'diabetic_recent_hba1c' => $data['diabetic_recent_hba1c'] ?? null,
        'diabetic_taking_medication' => $data['diabetic_taking_medication'] ?? null,
        'diabetic_insulin_injection' => $data['diabetic_insulin_injection'] ?? null,
        'meals_per_day' => $data['mealsPerDay'] ?? null,
        'sleep_quality' => $data['sleepQuality'] ?? null,
        'stress_level' => $data['stressLevel'] ?? null,
        'smoking' => $data['smoking'] ?? null,
        'alcohol' => $data['alcohol'] ?? null,
        'cholesterol' => $data['cholesterol'] ?? null,
        'waist_circumference' => $data['waistCircumference'] ?? null,
        'body_fat' => $data['bodyFat'] ?? null,
        'exercise_frequency' => $data['exerciseFrequency'] ?? null,
        'risk_score' => isset($data['riskScore']) ? (int)$data['riskScore'] : null,
        'risk_level' => $data['riskLevel'] ?? null,
    ];
    return $row;
}
