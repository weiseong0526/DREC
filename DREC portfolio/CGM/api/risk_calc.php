<?php
/**
 * Risk calculation - same logic as frontend (script.js)
 * Uses DB column names (snake_case). Call with a submission row array.
 */

function calculatePrediabeticRiskScore(array $data) {
    $score = 0;
    if (!empty($data['family_diabetes']) && $data['family_diabetes'] === 'yes') {
        $score += 2;
    }
    if (!empty($data['sugary_foods']) && in_array($data['sugary_foods'], ['almost_daily', 'occasional'])) {
        $score += 2;
    }
    if (!empty($data['waist_exceeded'])) {
        if ($data['waist_exceeded'] === 'yes' || $data['waist_exceeded'] === 'unsure') {
            $score += 2;
        }
    }
    if (!empty($data['regular_exercise_150min']) && $data['regular_exercise_150min'] === 'no') {
        $score += 2;
    }
    if (!empty($data['recent_glucose_level'])) {
        if ($data['recent_glucose_level'] === 'normal') {
            $score += 0;
        } elseif ($data['recent_glucose_level'] === 'prediabetic') {
            $score += 2;
        } elseif ($data['recent_glucose_level'] === 'diabetic') {
            $score += 4;
        }
    }
    return $score;
}

function getPrediabeticRiskLevel($score) {
    if ($score >= 0 && $score <= 2) {
        return '低风险 / Low Risk';
    }
    if ($score >= 3 && $score <= 6) {
        return '中等风险 / Moderate Risk';
    }
    return '高风险 / High Risk';
}

function calculateDiabeticRiskScore(array $data) {
    $score = 0;
    if (!empty($data['diabetic_blurred_vision']) && $data['diabetic_blurred_vision'] === 'yes') {
        $score += 2;
    }
    if (!empty($data['diabetic_night_vision']) && $data['diabetic_night_vision'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_visual_spots']) && $data['diabetic_visual_spots'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_foamy_urine']) && $data['diabetic_foamy_urine'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_frequent_urination']) && $data['diabetic_frequent_urination'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_edema']) && $data['diabetic_edema'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_numbness']) && $data['diabetic_numbness'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_shortness_breath']) && $data['diabetic_shortness_breath'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_foot_pain']) && $data['diabetic_foot_pain'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_cardiovascular_history']) && $data['diabetic_cardiovascular_history'] === 'yes') {
        $score += 1;
    }
    if (!empty($data['diabetic_duration'])) {
        if (in_array($data['diabetic_duration'], ['5_10', 'more_than_10'])) {
            $score += 2;
        }
    }
    if (!empty($data['diabetic_recent_hba1c'])) {
        if (in_array($data['diabetic_recent_hba1c'], ['moderate', 'high'])) {
            $score += 2;
        }
    }
    if (!empty($data['diabetic_taking_medication'])) {
        if (in_array($data['diabetic_taking_medication'], ['one', 'multiple'])) {
            $score += 2;
        }
    }
    if (!empty($data['diabetic_insulin_injection'])) {
        if (in_array($data['diabetic_insulin_injection'], ['once_daily', 'multiple_daily'])) {
            $score += 2;
        }
    }
    return $score;
}

function getDiabeticRiskLevel($score) {
    if ($score >= 0 && $score <= 2) {
        return '低风险 / Low Risk';
    }
    if ($score >= 3 && $score <= 8) {
        return '中等风险 / Moderate Risk';
    }
    if ($score >= 9 && $score <= 12) {
        return '高风险 / High Risk';
    }
    if ($score >= 13) {
        return '极高风险 / Very High Risk';
    }
    return '高风险 / High Risk';
}

/**
 * Ensure risk_score and risk_level are set on a submission row (same result as patient report).
 * Modifies $row in place. Use after fetching from DB when risk_score/risk_level may be null.
 */
function ensureRiskForSubmission(array &$row) {
    $pt = isset($row['patient_type']) ? trim($row['patient_type']) : '';
    if ($pt !== 'prediabetic' && $pt !== 'diabetic') {
        return;
    }
    if (isset($row['risk_score']) && $row['risk_score'] !== null && $row['risk_score'] !== '') {
        return; // already stored
    }
    if ($pt === 'prediabetic') {
        $row['risk_score'] = calculatePrediabeticRiskScore($row);
        $row['risk_level'] = getPrediabeticRiskLevel($row['risk_score']);
    } else {
        $row['risk_score'] = calculateDiabeticRiskScore($row);
        $row['risk_level'] = getDiabeticRiskLevel($row['risk_score']);
    }
}
