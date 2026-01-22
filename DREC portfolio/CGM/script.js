// Bilingual display - no language switching needed
// All text will show both Chinese (Simplified) and English simultaneously

const translations = {
    zh: {
        // Navigation
        home: '首页',
        fillForm: '填写表单',
        // Hero
        heroTitle: 'CGM 患者健康评估',
        heroSubtitle: '请填写以下健康信息，我们将为您生成详细的健康报告',
        // Form Sections
        personalInfo: '个人基本资料',
        bmi: 'BMI (身体质量指数)',
        bloodGlucose: '血糖值 (Blood Glucose)',
        bodyFat: '体脂率与肥胖风险 (Body Fat & Obesity Risk)',
        bloodPressure: '血压与心脏健康 (Blood Pressure & Heart Health)',
        lifestyle: '生活习惯信息 (Lifestyle Information)',
        // Form Fields
        name: '姓名',
        age: '年龄',
        gender: '性别',
        email: '电子邮件',
        height: '身高 (cm)',
        weight: '体重 (kg)',
        yourBMI: '您的 BMI:',
        fastingGlucose: '空腹血糖 (mg/dL)',
        postprandialGlucose: '餐后血糖 (mg/dL)',
        hba1c: '糖化血红蛋白 HbA1c (%)',
        testDate: '检测日期',
        bodyFatPercent: '体脂率 (%)',
        waistCircumference: '腰围 (cm)',
        obesityRisk: '肥胖风险评估',
        systolicBP: '收缩压 (mmHg)',
        diastolicBP: '舒张压 (mmHg)',
        heartRate: '静息心率 (次/分钟)',
        cholesterol: '总胆固醇 (mg/dL)',
        exerciseFrequency: '运动频率',
        exerciseType: '运动类型 (可多选)',
        dietType: '饮食习惯',
        mealsPerDay: '每日用餐次数',
        sleepQuality: '睡眠品质',
        stressLevel: '压力水平',
        smoking: '吸烟习惯',
        alcohol: '饮酒习惯',
        additionalNotes: '其他备注或健康状况',
        // Options
        pleaseSelect: '请选择',
        male: '男性',
        female: '女性',
        other: '其他',
        lowRisk: '低风险',
        moderateRisk: '中等风险',
        highRisk: '高风险',
        veryHighRisk: '极高风险',
        // Buttons
        submit: '提交并生成报告',
        reset: '重置表单',
        print: '打印报告',
        back: '返回表单',
        // Report
        reportTitle: 'CGM 健康评估报告',
        chartTitle: '健康风险评估图表',
        // Footer
        professional: '专业血糖管理专家',
        contact: '联系方式',
        disclaimer: '免责声明：',
        disclaimerText: '本报告仅供参考，不能替代专业医疗建议。如有疑问，请咨询医生Chang或通过以上方式联系我们。'
    },
    en: {
        // Navigation
        home: 'Home',
        fillForm: 'Fill Form',
        // Hero
        heroTitle: 'CGM Patient Health Assessment',
        heroSubtitle: 'Please fill in the following health information, and we will generate a detailed health report for you',
        // Form Sections
        personalInfo: 'Personal Information',
        bmi: 'BMI (Body Mass Index)',
        bloodGlucose: 'Blood Glucose',
        bodyFat: 'Body Fat & Obesity Risk',
        bloodPressure: 'Blood Pressure & Heart Health',
        lifestyle: 'Lifestyle Information',
        // Form Fields
        name: 'Name',
        age: 'Age',
        gender: 'Gender',
        email: 'Email',
        height: 'Height (cm)',
        weight: 'Weight (kg)',
        yourBMI: 'Your BMI:',
        fastingGlucose: 'Fasting Glucose (mg/dL)',
        postprandialGlucose: 'Postprandial Glucose (mg/dL)',
        hba1c: 'HbA1c (%)',
        testDate: 'Test Date',
        bodyFatPercent: 'Body Fat (%)',
        waistCircumference: 'Waist Circumference (cm)',
        obesityRisk: 'Obesity Risk Assessment',
        systolicBP: 'Systolic BP (mmHg)',
        diastolicBP: 'Diastolic BP (mmHg)',
        heartRate: 'Resting Heart Rate (bpm)',
        cholesterol: 'Total Cholesterol (mg/dL)',
        exerciseFrequency: 'Exercise Frequency',
        exerciseType: 'Exercise Type (Multiple Selection)',
        dietType: 'Diet Type',
        mealsPerDay: 'Meals Per Day',
        sleepQuality: 'Sleep Quality',
        stressLevel: 'Stress Level',
        smoking: 'Smoking Habit',
        alcohol: 'Alcohol Consumption',
        additionalNotes: 'Additional Notes or Health Conditions',
        // Options
        pleaseSelect: 'Please select',
        male: 'Male',
        female: 'Female',
        other: 'Other',
        lowRisk: 'Low Risk',
        moderateRisk: 'Moderate Risk',
        highRisk: 'High Risk',
        veryHighRisk: 'Very High Risk',
        // Buttons
        submit: 'Submit and Generate Report',
        reset: 'Reset Form',
        print: 'Print Report',
        back: 'Back to Form',
        // Report
        reportTitle: 'CGM Health Assessment Report',
        chartTitle: 'Health Risk Assessment Chart',
        // Footer
        professional: 'Professional Blood Glucose Management Expert',
        contact: 'Contact',
        disclaimer: 'Disclaimer:',
        disclaimerText: 'This report is for reference only and cannot replace professional medical advice. If you have any questions, please consult Dr. Chang or contact us through the above methods.'
    }
};

// DOM Elements
// These will be initialized in DOMContentLoaded
let form, reportSection, reportContent, formSection;

// Check URL parameters for patient type
function getPatientTypeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type') || sessionStorage.getItem('patientType');
}

// Redirect to selection page if no patient type
function checkPatientType() {
    const patientType = getPatientTypeFromURL();
    if (!patientType || (patientType !== 'prediabetic' && patientType !== 'diabetic')) {
        window.location.href = 'patient-type-selection.html';
        return false;
    }
    return patientType;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form elements
    form = document.getElementById('cgmForm');
    reportSection = document.getElementById('report');
    reportContent = document.getElementById('reportContent');
    formSection = document.querySelector('.form-section');
    
    // Check if patient type is selected
    const patientType = checkPatientType();
    if (!patientType) return;
    
    // Set patient type in hidden input
    const patientTypeInput = document.getElementById('patientType');
    if (patientTypeInput) {
        patientTypeInput.value = patientType;
    }
    
    // Show/hide conditional fields based on patient type
    const prediabeticFields = document.querySelectorAll('.conditional-prediabetic');
    const diabeticFields = document.querySelectorAll('.conditional-diabetic');
    
    if (patientType === 'prediabetic') {
        prediabeticFields.forEach(field => {
            field.classList.add('show');
            field.style.display = 'block'; // Force display
        });
        diabeticFields.forEach(field => {
            field.classList.remove('show');
            field.style.display = 'none'; // Force hide
        });
        // Update question numbers for prediabetic (7-11)
        updateQuestionNumbers(['mealsPerDay', 'sleepQuality', 'stressLevel', 'smoking', 'alcohol'], 7);
    } else if (patientType === 'diabetic') {
        diabeticFields.forEach(field => {
            field.classList.add('show');
            field.style.display = 'block'; // Force display
        });
        prediabeticFields.forEach(field => {
            field.classList.remove('show');
            field.style.display = 'none'; // Force hide
        });
        // Update question numbers for diabetic (16-20)
        updateQuestionNumbers(['mealsPerDay', 'sleepQuality', 'stressLevel', 'smoking', 'alcohol'], 16);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navToggle && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Prevent zoom on input focus (iOS)
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input[type="number"], input[type="text"], input[type="email"], input[type="date"], select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.style.fontSize !== '16px') {
                    this.style.fontSize = '16px';
                }
            });
        });
    }
    
    // Setup form submission handler
    setupFormSubmission();
});

// Update question numbers dynamically
function updateQuestionNumbers(fieldNames, startNumber) {
    fieldNames.forEach((fieldName, index) => {
        const field = document.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                const label = formGroup.querySelector('label');
                if (label) {
                    const questionNumber = startNumber + index;
                    // Update label text with new question number
                    const labelText = label.innerHTML;
                    const newLabelText = labelText.replace(/^\d+\./, `${questionNumber}.`);
                    label.innerHTML = newLabelText;
                }
            }
        }
    });
}

// Setup form submission handler
function setupFormSubmission() {
    if (!form) return;
    
    // Remove existing listener if any
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    form = newForm;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // All fields are optional - no validation needed
        // Collect form data
        const formData = collectFormData();
        
        // Generate report
        generateReport(formData);
        
        // Generate risk assessment chart
        setTimeout(() => {
            generateRiskChart(formData);
        }, 300);
        
        // Show report section and hide form
        if (formSection) formSection.style.display = 'none';
        if (reportSection) reportSection.style.display = 'block';
        
        // Scroll to report
        if (reportSection) {
            reportSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Get age-adjusted BMI ranges
function getBMIRangesByAge(age) {
    const ageNum = parseInt(age) || 25; // Default to 25 if age not provided
    
    if (ageNum < 18) {
        // For children and teens, use standard ranges (simplified)
        return { underweight: 18.5, normal: 24.9, overweight: 29.9 };
    } else if (ageNum < 25) {
        // 18-24: Standard range
        return { underweight: 18.5, normal: 24.9, overweight: 29.9 };
    } else if (ageNum < 35) {
        // 25-34: Standard range
        return { underweight: 18.5, normal: 24.9, overweight: 29.9 };
    } else if (ageNum < 45) {
        // 35-44: Standard range
        return { underweight: 18.5, normal: 24.9, overweight: 29.9 };
    } else if (ageNum < 55) {
        // 45-54: Slightly more lenient
        return { underweight: 18.5, normal: 26.9, overweight: 29.9 };
    } else if (ageNum < 65) {
        // 55-64: More lenient for older adults
        return { underweight: 18.5, normal: 27.9, overweight: 29.9 };
    } else {
        // 65+: Most lenient (slightly higher BMI may be healthier for elderly)
        return { underweight: 18.5, normal: 27.9, overweight: 29.9 };
    }
}

// Real-time BMI calculation removed - BMI will only be displayed in report after submission

// Collect all form data
function collectFormData() {
    const formData = new FormData(form);
    const data = {};
    
    // Patient Type
    data.patientType = formData.get('patientType');
    
    // Personal Information (collected but NOT displayed in report)
    data.patientName = formData.get('patientName');
    data.patientContact = formData.get('patientContact');
    data.patientEmail = formData.get('patientEmail');
    data.patientAge = formData.get('patientAge');
    data.patientGender = formData.get('patientGender');
    
    // BMI
    const height = parseFloat(formData.get('height'));
    const weight = parseFloat(formData.get('weight'));
    data.height = height;
    data.weight = weight;
    // BMI formula: weight (kg) / height (m)^2
    // Convert height from cm to meters by dividing by 100
    data.bmi = height > 0 && weight > 0 ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null;
    
    // Blood Glucose - only mmol/L
    const fastingMmol = formData.get('fastingGlucoseMmol');
    data.fastingGlucoseMmol = fastingMmol || null;
    // Convert mmol/L to mg/dL for internal calculations (if needed)
    data.fastingGlucose = fastingMmol ? (parseFloat(fastingMmol) * 18.0182).toFixed(1) : null;
    
    const postprandialMmol = formData.get('postprandialGlucoseMmol');
    data.postprandialGlucoseMmol = postprandialMmol || null;
    data.postprandialGlucose = postprandialMmol ? (parseFloat(postprandialMmol) * 18.0182).toFixed(1) : null;
    
    data.hba1c = formData.get('hba1c');
    data.glucoseTestDate = formData.get('glucoseTestDate');
    
    // Blood Pressure - only systolic and diastolic
    data.systolicBP = formData.get('systolicBP');
    data.diastolicBP = formData.get('diastolicBP');
    
    // Lifestyle Information
    // Prediabetic specific fields
    data.family_diabetes = formData.get('family_diabetes');
    data.sugary_foods = formData.get('sugary_foods');
    data.waist_exceeded = formData.get('waist_exceeded');
    data.regular_exercise_150min = formData.get('regular_exercise_150min');
    data.recent_glucose_level = formData.get('recent_glucose_level');
    data.prediabetic_fear_complications = formData.getAll('prediabetic_fear_complications');
    
    // Diabetic patient specific fields
    data.diabetic_blurred_vision = formData.get('diabetic_blurred_vision');
    data.diabetic_night_vision = formData.get('diabetic_night_vision');
    data.diabetic_visual_spots = formData.get('diabetic_visual_spots');
    data.diabetic_foamy_urine = formData.get('diabetic_foamy_urine');
    data.diabetic_frequent_urination = formData.get('diabetic_frequent_urination');
    data.diabetic_edema = formData.get('diabetic_edema');
    data.diabetic_numbness = formData.get('diabetic_numbness');
    data.diabetic_decreased_sensation = formData.get('diabetic_decreased_sensation');
    data.diabetic_shortness_breath = formData.get('diabetic_shortness_breath');
    data.diabetic_foot_pain = formData.get('diabetic_foot_pain');
    data.diabetic_cardiovascular_history = formData.get('diabetic_cardiovascular_history');
    data.diabetic_duration = formData.get('diabetic_duration');
    data.diabetic_recent_hba1c = formData.get('diabetic_recent_hba1c');
    data.diabetic_taking_medication = formData.get('diabetic_taking_medication');
    data.diabetic_insulin_injection = formData.get('diabetic_insulin_injection');
    
    // Common lifestyle fields (for both patient types)
    data.mealsPerDay = formData.get('mealsPerDay');
    data.sleepQuality = formData.get('sleepQuality');
    data.stressLevel = formData.get('stressLevel');
    data.smoking = formData.get('smoking');
    data.alcohol = formData.get('alcohol');
    
    return data;
}

// Calculate prediabetic risk score
function calculatePrediabeticRiskScore(data) {
    let score = 0;
    
    // 1. 直系亲属（父母、兄弟姐妹）有没有糖尿病？
    if (data.family_diabetes === 'yes') {
        score += 2;
    }
    
    // 2. 过去7天内有没有喝含糖饮料、吃甜食/油炸？
    if (data.sugary_foods === 'almost_daily' || data.sugary_foods === 'occasional') {
        score += 2; // 几乎每天都喝或偶尔喝 - 2分
    } else if (data.sugary_foods === 'rarely') {
        score += 0; // 几乎不喝 - 0分
    }
    
    // 3. 腰围是否超标？（男 >90cm，女 >80cm）
    if (data.waist_exceeded === 'yes') {
        score += 2; // 有 - 2分
    } else if (data.waist_exceeded === 'no') {
        score += 0; // 没有 - 0分
    } else if (data.waist_exceeded === 'unsure') {
        score += 2; // 不清楚，可能有 - 2分
    }
    
    // 4. 每周是否有规律运动 ≥150 分钟？
    // Per spec: No = 2 points, Yes = 0 points
    if (data.regular_exercise_150min === 'no') {
        score += 2; // 否 / No - 2分
    }
    
    // 5. 最近一次空腹血糖 (FBS) 或糖化血红蛋白 (HbA1c) 是多少？
    if (data.recent_glucose_level === 'normal') {
        score += 0; // FBS < 5.6 或 HbA1c < 5.7% - 0分
    } else if (data.recent_glucose_level === 'prediabetic') {
        score += 2; // FBS 5.6–6.0 或 HbA1c 5.7–6.0% - 2分
    } else if (data.recent_glucose_level === 'diabetic') {
        score += 4; // FBS > 6.1 或 HbA1c > 6.1% - 4分
    }
    
    // Prediabetic total score is 12 (do NOT normalize)
    return score;
}

// Get risk level text based on prediabetic score
function getPrediabeticRiskLevel(score) {
    // 10-point scale (only options explicitly marked as "2分" are counted)
    if (score >= 0 && score <= 2) {
        return {
            level: 'low',
            text: '低风险 / Low Risk',
            class: 'status-normal'
        };
    } else if (score >= 3 && score <= 6) {
        return {
            level: 'moderate',
            text: '中等风险 / Moderate Risk',
            class: 'status-warning'
        };
    } else if (score >= 7 && score <= 10) {
        return {
            level: 'high',
            text: '高风险 / High Risk',
            class: 'status-danger'
        };
    }
    return {
        level: 'high',
        text: '高风险 / High Risk',
        class: 'status-danger'
    };
}

// Calculate diabetic risk score
function calculateDiabeticRiskScore(data) {
    let score = 0;
    
    // 1. 你是否视力模糊，看东西不清楚？
    if (data.diabetic_blurred_vision === 'yes') {
        score += 2;
    }
    
    // 2. 你会不会在夜晚或暗光下看东西更困难？
    if (data.diabetic_night_vision === 'yes') {
        score += 1;
    }
    
    // 3. 是否看东西有黑点、阴影或缺角？
    if (data.diabetic_visual_spots === 'yes') {
        score += 1;
    }
    
    // 4. 是否小便泡泡多、尿液有泡沫？
    if (data.diabetic_foamy_urine === 'yes') {
        score += 1;
    }
    
    // 5. 是否小便频繁，尤其是夜间？
    if (data.diabetic_frequent_urination === 'yes') {
        score += 1;
    }
    
    // 6. 是否容易水肿（脚、脚踝或眼皮浮肿）？
    if (data.diabetic_edema === 'yes') {
        score += 1;
    }
    
    // 7. 是否有手脚麻痹或者刺痛？
    if (data.diabetic_numbness === 'yes') {
        score += 1;
    }
    
    // 8. 是否感觉迟钝，容易被烫伤或受伤却不觉得疼？
    if (data.diabetic_decreased_sensation === 'yes') {
        score += 1;
    }
    
    // 9. 是否容易气喘、胸口闷痛？
    if (data.diabetic_shortness_breath === 'yes') {
        score += 1;
    }
    
    // 10. 是否走一小段路脚就酸痛或无力？
    if (data.diabetic_foot_pain === 'yes') {
        score += 1;
    }
    
    // 11. 曾经被医生告知心脏病、中风或动脉阻塞？
    if (data.diabetic_cardiovascular_history === 'yes') {
        score += 1;
    }
    
    // 12. 被诊断患上糖尿病多久了？
    if (data.diabetic_duration === 'less_than_5') {
        score += 0; // < 5 年 - 0分
    } else if (data.diabetic_duration === '5_10') {
        score += 2; // 5–10 年 - 2分
    } else if (data.diabetic_duration === 'more_than_10') {
        score += 2; // > 10 年 - 2分
    }
    
    // 13. 最近一次的糖化血红蛋白指数 (HbA1c) 是多少？
    if (data.diabetic_recent_hba1c === 'normal') {
        score += 0; // ≤ 6.3% - 0分
    } else if (data.diabetic_recent_hba1c === 'moderate') {
        score += 2; // 6.3% - 7% - 2分
    } else if (data.diabetic_recent_hba1c === 'high') {
        score += 2; // > 7.1% - 2分
    }
    
    // 14. 有在吃高血糖药吗？
    if (data.diabetic_taking_medication === 'none') {
        score += 0; // 无需药物/仅饮食控制 - 0分
    } else if (data.diabetic_taking_medication === 'one') {
        score += 2; // 1 种药 - 2分
    } else if (data.diabetic_taking_medication === 'multiple') {
        score += 2; // ≥2 种药 - 2分
    }
    
    // 15. 有在注射胰岛素💉吗？
    if (data.diabetic_insulin_injection === 'none') {
        score += 0; // 不用 - 0分
    } else if (data.diabetic_insulin_injection === 'once_daily') {
        score += 2; // 每日注射胰岛素1次 - 2分
    } else if (data.diabetic_insulin_injection === 'multiple_daily') {
        score += 2; // 每日多次注射 - 2分
    }
    
    return score;
}

// Get risk level text based on diabetic score
function getDiabeticRiskLevel(score) {
    if (score >= 0 && score <= 2) {
        return {
            level: 'low',
            text: '低风险 / Low Risk',
            class: 'status-normal'
        };
    } else if (score >= 3 && score <= 8) {
        return {
            level: 'moderate',
            text: '中等风险 / Moderate Risk',
            class: 'status-warning'
        };
    } else if (score >= 9 && score <= 12) {
        return {
            level: 'high',
            text: '高风险 / High Risk',
            class: 'status-danger'
        };
    } else if (score >= 13) {
        return {
            level: 'very-high',
            text: '极高风险 / Very High Risk',
            class: 'status-danger'
        };
    }
    return {
        level: 'high',
        text: '高风险 / High Risk',
        class: 'status-danger'
    };
}

// Calculate organ-specific risks
function calculateOrganRisks(data) {
    const risks = {
        eyes: 0,      // 眼睛 / Eyes (Retinopathy)
        kidneys: 0,   // 肾脏 / Kidneys (Nephropathy)
        nerves: 0,    // 神经 / Nerves (Neuropathy)
        heart: 0,     // 心脏 / Heart (Cardiovascular)
        handsFeet: 0  // 手脚 / Hands & Feet (Peripheral Neuropathy/Amputation Risk)
    };
    
    // Get glucose value (convert from mmol/L to mg/dL for calculations)
    let fastingGlucose = null;
    if (data.fastingGlucoseMmol) {
        fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
    } else if (data.fastingGlucose) {
        fastingGlucose = parseFloat(data.fastingGlucose);
    }
    
    let postprandialGlucose = null;
    if (data.postprandialGlucoseMmol) {
        postprandialGlucose = parseFloat(data.postprandialGlucoseMmol) * 18.0182;
    } else if (data.postprandialGlucose) {
        postprandialGlucose = parseFloat(data.postprandialGlucose);
    }
    
    // Eyes (Retinopathy) Risk - based on glucose control and duration
    let eyesScore = 0;
    if (fastingGlucose) {
        if (fastingGlucose >= 200) eyesScore += 40;
        else if (fastingGlucose >= 140) eyesScore += 30;
        else if (fastingGlucose >= 126) eyesScore += 20;
        else if (fastingGlucose >= 100) eyesScore += 10;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 8.0) eyesScore += 35;
        else if (hba1c >= 7.0) eyesScore += 25;
        else if (hba1c >= 6.5) eyesScore += 15;
    }
    if (data.patientType === 'diabetic') {
        eyesScore += 20; // Diabetic patients have higher baseline risk
    }
    if (data.systolicBP && parseFloat(data.systolicBP) >= 140) {
        eyesScore += 15; // Hypertension increases retinopathy risk
    }
    risks.eyes = Math.min(eyesScore, 100);
    
    // Kidneys (Nephropathy) Risk - based on glucose, BP, and protein markers
    let kidneysScore = 0;
    if (fastingGlucose) {
        if (fastingGlucose >= 200) kidneysScore += 35;
        else if (fastingGlucose >= 140) kidneysScore += 25;
        else if (fastingGlucose >= 126) kidneysScore += 15;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 8.0) kidneysScore += 30;
        else if (hba1c >= 7.0) kidneysScore += 20;
    }
    if (data.systolicBP && parseFloat(data.systolicBP) >= 140) {
        kidneysScore += 25; // High BP is major risk for kidney disease
    }
    if (data.diastolicBP && parseFloat(data.diastolicBP) >= 90) {
        kidneysScore += 20;
    }
    if (data.patientType === 'diabetic') {
        kidneysScore += 20;
    }
    risks.kidneys = Math.min(kidneysScore, 100);
    
    // Nerves (Neuropathy) Risk - based on glucose control
    let nervesScore = 0;
    if (fastingGlucose) {
        if (fastingGlucose >= 200) nervesScore += 40;
        else if (fastingGlucose >= 140) nervesScore += 30;
        else if (fastingGlucose >= 126) nervesScore += 20;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 8.0) nervesScore += 35;
        else if (hba1c >= 7.0) nervesScore += 25;
        else if (hba1c >= 6.5) nervesScore += 15;
    }
    if (data.patientType === 'diabetic') {
        nervesScore += 25;
    }
    // Check if patient reported neuropathy symptoms
    if (data.diabetic_complications && Array.isArray(data.diabetic_complications) && data.diabetic_complications.includes('neuropathy')) {
        nervesScore += 30;
    }
    risks.nerves = Math.min(nervesScore, 100);
    
    // Heart (Cardiovascular) Risk - based on multiple factors
    let heartScore = 0;
    if (data.systolicBP) {
        const systolic = parseFloat(data.systolicBP);
        if (systolic >= 140) heartScore += 30;
        else if (systolic >= 130) heartScore += 20;
        else if (systolic >= 120) heartScore += 10;
    }
    if (data.diastolicBP) {
        const diastolic = parseFloat(data.diastolicBP);
        if (diastolic >= 90) heartScore += 25;
        else if (diastolic >= 80) heartScore += 15;
    }
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        if (bmi >= 30) heartScore += 20;
        else {
            const ageNum = parseInt(data.patientAge) || 25;
            const ranges = getBMIRangesByAge(ageNum);
            if (bmi >= ranges.normal) heartScore += 10;
        }
    }
    if (data.smoking === 'regular') {
        heartScore += 25;
    } else if (data.smoking === 'occasional') {
        heartScore += 15;
    }
    if (fastingGlucose && fastingGlucose >= 126) {
        heartScore += 20; // Diabetes increases cardiovascular risk
    }
    if (data.patientType === 'diabetic') {
        heartScore += 15;
    }
    risks.heart = Math.min(heartScore, 100);
    
    // Hands & Feet (Peripheral Neuropathy/Amputation Risk) - based on glucose control and neuropathy symptoms
    let handsFeetScore = 0;
    if (fastingGlucose) {
        if (fastingGlucose >= 200) handsFeetScore += 45;
        else if (fastingGlucose >= 140) handsFeetScore += 35;
        else if (fastingGlucose >= 126) handsFeetScore += 25;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 8.0) handsFeetScore += 40;
        else if (hba1c >= 7.0) handsFeetScore += 30;
        else if (hba1c >= 6.5) handsFeetScore += 20;
    }
    if (data.patientType === 'diabetic') {
        handsFeetScore += 30; // Diabetic patients have higher risk
    }
    // Check for neuropathy symptoms (numbness, tingling, loss of sensation)
    if (data.diabetic_complications && Array.isArray(data.diabetic_complications)) {
        if (data.diabetic_complications.includes('neuropathy')) {
            handsFeetScore += 35;
        }
        if (data.diabetic_complications.includes('amputation')) {
            handsFeetScore += 50;
        }
    }
    risks.handsFeet = Math.min(handsFeetScore, 100);
    
    return risks;
}

// Get risk level text and color
function getRiskLevel(score) {
    if (score >= 70) {
        return { text: '高风险 / High Risk', class: 'status-danger', color: '#dc3545' };
    } else if (score >= 40) {
        return { text: '中等风险 / Moderate Risk', class: 'status-warning', color: '#ffc107' };
    } else if (score >= 20) {
        return { text: '低风险 / Low Risk', class: 'status-info', color: '#17a2b8' };
    } else {
        return { text: '正常 / Normal', class: 'status-normal', color: '#28a745' };
    }
}

// Generate comprehensive report
function generateReport(data) {
    const reportDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculate organ-specific risks
    const organRisks = calculateOrganRisks(data);
    const highestRisk = Math.max(organRisks.eyes, organRisks.kidneys, organRisks.nerves, organRisks.heart, organRisks.handsFeet);
    
    // Calculate risk score based on patient type
    let riskScore = null;
    let riskLevel = null;
    if (data.patientType === 'prediabetic') {
        riskScore = calculatePrediabeticRiskScore(data);
        riskLevel = getPrediabeticRiskLevel(riskScore);
    } else if (data.patientType === 'diabetic') {
        riskScore = calculateDiabeticRiskScore(data);
        riskLevel = getDiabeticRiskLevel(riskScore);
    }
    
    const notFilled = '未填写 / Not filled';
    const reportDateLabel = '报告生成日期 / Report Date';
    
    // Determine cover image based on patient type
    const coverImage = data.patientType === 'diabetic' 
        ? 'https://drec.pages.dev/chang%20pic/diabete.jpg'
        : 'https://drec.pages.dev/chang%20pic/prediabete.jpg';
    
    // Cover page HTML
    let html = `
        <!-- Report Cover Page -->
        <div class="report-cover-page" style="background-image: url('${coverImage}');">
            <div class="report-cover-content">
                <div class="report-cover-bottom">
                    <div class="report-cover-info-section">
                        <div class="report-cover-info-header">
                            <div class="report-cover-info-icon">📋</div>
                            <div class="report-cover-info-title">报告信息 / Report</div>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Name:</span>
                            <span class="report-cover-info-value">${data.patientName || notFilled}</span>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Gender:</span>
                            <span class="report-cover-info-value">${getGenderText(data.patientGender)}</span>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Phone:</span>
                            <span class="report-cover-info-value">${data.patientContact || notFilled}</span>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Type:</span>
                            <span class="report-cover-info-value">${data.patientType === 'prediabetic' ? 'Prediabetic' : data.patientType === 'diabetic' ? 'Diabetic' : 'N/A'}</span>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Date:</span>
                            <span class="report-cover-info-value">${reportDate}</span>
                        </div>
                    </div>
                    
                    <div class="report-cover-divider"></div>
                    
                    <div class="report-cover-info-section">
                        <div class="report-cover-info-header">
                            <div class="report-cover-info-icon">🩺</div>
                            <div class="report-cover-info-title">医生 / Physician</div>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Physician:</span>
                            <span class="report-cover-info-value">张医生 / Dr. Chang</span>
                        </div>
                        <div class="report-cover-info-item">
                            <span class="report-cover-info-label">Date:</span>
                            <span class="report-cover-info-value">${reportDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Report Content -->
        
        <!-- Organ-Specific Risk Assessment - Separate A4 Page -->
        <div class="report-section-item organ-risk-page">
            <!-- Human Body Visualization with Cards Around -->
            <div class="human-body-visualization-layout">
                <!-- Human Body Image in Center -->
                <div class="body-silhouette-container">
                    <img src="https://drec.pages.dev/chang%20pic/bodys.jpg" alt="Human Body" class="human-body-image">
                    <!-- Connection Points for Cards (invisible markers positioned on body image) -->
                    <!-- These points should align with the organs on the body.jpg image -->
                    <div class="connection-point" data-organ="eyes" style="position: absolute; top: 8%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="nerves" style="position: absolute; top: 12%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="heart" style="position: absolute; top: 38%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="kidneys" style="position: absolute; top: 63%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="handsFeet" style="position: absolute; top: 85%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                </div>
                
                <!-- Organ Cards Around Body -->
                <div class="organ-cards-layout">
                    <!-- Eyes Card (Top Left) -->
                    <div class="organ-card-positioned organ-card-top-left" data-organ="eyes">
                        <div class="organ-card-icon">👁️</div>
                        <h4 class="organ-card-title">眼睛 / Eyes</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.eyes).class}">
                            ${getRiskLevel(organRisks.eyes).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.eyes}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                                })()}
                                ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                                ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                                ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.eyes >= 70 ? '建议立即咨询眼科医生进行详细检查 / Recommend immediate ophthalmologist consultation' : organRisks.eyes >= 40 ? '建议定期进行眼科检查 / Recommend regular eye examinations' : '保持良好血糖控制，定期检查 / Maintain good glucose control and regular checkups'}</p>
                        </div>
                    </div>
                    
                    <!-- Nerves Card (Top Right) -->
                    <div class="organ-card-positioned organ-card-top-right" data-organ="nerves">
                        <div class="organ-card-icon">🧠</div>
                        <h4 class="organ-card-title">神经 / Nerves</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.nerves).class}">
                            ${getRiskLevel(organRisks.nerves).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.nerves}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                                })()}
                                ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                                ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.nerves >= 70 ? '建议立即咨询神经科医生 / Recommend immediate neurologist consultation' : organRisks.nerves >= 40 ? '建议定期进行神经功能检查 / Recommend regular neurological examinations' : '保持良好血糖控制 / Maintain good glucose control'}</p>
                        </div>
                    </div>
                    
                    <!-- Heart Card (Middle Right) -->
                    <div class="organ-card-positioned organ-card-middle-right" data-organ="heart">
                        <div class="organ-card-icon">❤️</div>
                        <h4 class="organ-card-title">心脏 / Heart</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.heart).class}">
                            ${getRiskLevel(organRisks.heart).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.heart}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                                ${data.smoking === 'regular' ? '<li>吸烟 / Smoking</li>' : ''}
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 126 ? '<li>糖尿病 / Diabetes</li>' : '';
                                })()}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.heart >= 70 ? '建议立即咨询心脏科医生 / Recommend immediate cardiologist consultation' : organRisks.heart >= 40 ? '建议定期进行心脏健康检查 / Recommend regular cardiovascular health checkups' : '保持健康生活方式，定期监测 / Maintain healthy lifestyle and regular monitoring'}</p>
                        </div>
                    </div>
                    
                    <!-- Kidneys Card (Middle Left) -->
                    <div class="organ-card-positioned organ-card-middle-left" data-organ="kidneys">
                        <div class="organ-card-icon">🫘</div>
                        <h4 class="organ-card-title">肾脏 / Kidneys</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.kidneys).class}">
                            ${getRiskLevel(organRisks.kidneys).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.kidneys}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 140 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                                })()}
                                ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                                ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.kidneys >= 70 ? '建议立即进行肾功能检查 / Recommend immediate kidney function tests' : organRisks.kidneys >= 40 ? '建议定期监测肾功能 / Recommend regular kidney function monitoring' : '控制血糖和血压，定期检查 / Control glucose and blood pressure, regular checkups'}</p>
                        </div>
                    </div>
                    
                    <!-- Hands & Feet Card (Bottom Right) -->
                    <div class="organ-card-positioned organ-card-bottom-right" data-organ="handsFeet">
                        <div class="organ-card-icon">🦶</div>
                        <h4 class="organ-card-title">手脚 / Hands & Feet</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.handsFeet).class}">
                            ${getRiskLevel(organRisks.handsFeet).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.handsFeet}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                                })()}
                                ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                                ${data.diabetic_complications && Array.isArray(data.diabetic_complications) && data.diabetic_complications.includes('neuropathy') ? '<li>神经病变 / Neuropathy</li>' : ''}
                                ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.handsFeet >= 70 ? '建议立即咨询医生 / Recommend immediate doctor consultation' : organRisks.handsFeet >= 40 ? '建议定期进行足部检查 / Recommend regular foot examinations' : '保持良好血糖控制，注意足部护理 / Maintain good glucose control and foot care'}</p>
                        </div>
                    </div>
                    
                    <!-- Hands & Feet Card (Bottom Right) -->
                    <div class="organ-card-positioned organ-card-bottom-right" data-organ="handsFeet">
                        <div class="organ-card-icon">🦶</div>
                        <h4 class="organ-card-title">手脚 / Hands & Feet</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.handsFeet).class}">
                            ${getRiskLevel(organRisks.handsFeet).text}
                        </div>
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.handsFeet}%</div>
                        <div class="organ-card-factors">
                            <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                            <ul>
                                ${(() => {
                                    let fastingGlucose = null;
                                    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                    return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                                })()}
                                ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                                ${data.diabetic_complications && Array.isArray(data.diabetic_complications) && data.diabetic_complications.includes('neuropathy') ? '<li>神经病变 / Neuropathy</li>' : ''}
                                ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                            </ul>
                        </div>
                        <div class="organ-card-recommendations">
                            <p><strong>建议 / Recommendations:</strong></p>
                            <p>${organRisks.handsFeet >= 70 ? '建议立即咨询医生 / Recommend immediate doctor consultation' : organRisks.handsFeet >= 40 ? '建议定期进行足部检查 / Recommend regular foot examinations' : '保持良好血糖控制，注意足部护理 / Maintain good glucose control and foot care'}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Connection Lines (Dashed) - Will be drawn with JavaScript for precise positioning -->
                <svg class="connection-lines" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                    <!-- Lines will be dynamically positioned -->
                </svg>
            </div>
            
        </div>
        
        <!-- Chart will be inserted here after report generation -->
        
        <div class="report-section-item report-section-with-bg risk-assessment-section bmi-page-section">
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 30px;">
                <h3 style="margin: 0; padding: 0; border: none; line-height: 1.2; font-size: 2.2rem; font-weight: 700; color: #000; font-family: 'Playfair Display', serif;">
                    BMI (身体质量指数)
                </h3>
                <h3 style="margin: 5px 0 0 0; padding: 0; border: none; line-height: 1.2; font-size: 1.6rem; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'Playfair Display', serif;">
                    BODY MASS INDEX
                </h3>
            </div>
            ${data.bmi ? generateBMIGauge(data.bmi, data.patientAge) : ''}
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">身高 / Height</div>
                    <div class="report-data-value">${data.height ? `${data.height.toFixed(1)} cm` : notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">体重 / Weight</div>
                    <div class="report-data-value">${data.weight ? `${data.weight.toFixed(1)} kg` : notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">BMI</div>
                    <div class="report-data-value">
                        ${data.bmi || '无法计算 / Cannot calculate'}
                        ${data.bmi ? getBMIStatus(data.bmi, data.patientAge) : ''}
                    </div>
                </div>
            </div>
            ${generateBMIAnalysis(data.bmi, data.patientAge)}
        </div>
        
        <div class="report-section-item report-section-with-bg risk-assessment-section">
            <h3 class="report-section-title">血糖值 / Blood Glucose</h3>
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">空腹血糖 / Fasting Glucose</div>
                    <div class="report-data-value">
                        ${data.fastingGlucoseMmol ? `${data.fastingGlucoseMmol} mmol/L` : notFilled}
                        ${data.fastingGlucose ? getGlucoseStatus(data.fastingGlucose, 'fasting') : ''}
                    </div>
                </div>
                ${data.postprandialGlucoseMmol ? `
                <div class="report-data-item">
                    <div class="report-data-label">餐后血糖 / Postprandial Glucose</div>
                    <div class="report-data-value">
                        ${data.postprandialGlucoseMmol} mmol/L
                        ${data.postprandialGlucose ? getGlucoseStatus(data.postprandialGlucose, 'postprandial') : ''}
                    </div>
                </div>
                ` : ''}
                ${data.hba1c ? `
                <div class="report-data-item">
                    <div class="report-data-label">HbA1c</div>
                    <div class="report-data-value">
                        ${data.hba1c}%
                        ${getHbA1cStatus(data.hba1c)}
                    </div>
                </div>
                ` : ''}
                ${data.glucoseTestDate ? `
                <div class="report-data-item">
                    <div class="report-data-label">检测日期 / Test Date</div>
                    <div class="report-data-value">${data.glucoseTestDate}</div>
                </div>
                ` : ''}
            </div>
            ${generateGlucoseAnalysis(data)}
            
            <h3 class="report-section-title" style="margin-top: 30px;">血压与心脏健康 / Blood Pressure & Heart Health</h3>
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">收缩压 / Systolic BP</div>
                    <div class="report-data-value">
                        ${data.systolicBP || notFilled} mmHg
                        ${data.systolicBP ? getBPStatus(data.systolicBP, 'systolic') : ''}
                    </div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">舒张压 / Diastolic BP</div>
                    <div class="report-data-value">
                        ${data.diastolicBP || notFilled} mmHg
                        ${data.diastolicBP ? getBPStatus(data.diastolicBP, 'diastolic') : ''}
                    </div>
                </div>
            </div>
            ${generateBPAnalysis(data)}
        </div>
        
        <div class="report-section-item report-section-with-bg lifestyle-section">
            ${riskScore !== null ? `
            <h3 class="report-section-title">${data.patientType === 'prediabetic' ? '糖尿病前期风险评估 / Prediabetic Risk Assessment' : '糖尿病患者风险评估 / Diabetic Patient Risk Assessment'}</h3>
            <div class="report-data-grid">
                <div class="report-data-item" style="grid-column: 1 / -1; text-align: center; padding: 18px;">
                    <div style="font-size: 30px; font-weight: bold; color: var(--primary-color); margin-bottom: 10px;">
                        ${riskScore} 分 / ${data.patientType === 'prediabetic' ? 12 : 20} Points
                    </div>
                    <div class="report-status ${riskLevel.class}" style="font-size: 16px; padding: 10px 18px; display: inline-block;">
                        ${riskLevel.text}
                    </div>
                </div>
            </div>
            ` : ''}
            <h3 class="report-section-title">生活习惯信息 / Lifestyle Information</h3>
            <div class="report-data-grid">
                ${data.exerciseFrequency ? `
                <div class="report-data-item">
                    <div class="report-data-label">运动频率 / Exercise Frequency</div>
                    <div class="report-data-value">${getExerciseFrequencyText(data.exerciseFrequency)}</div>
                </div>
                ` : ''}
                ${data.exerciseType && data.exerciseType.length > 0 ? `
                <div class="report-data-item">
                    <div class="report-data-label">运动类型 / Exercise Type</div>
                    <div class="report-data-value">${data.exerciseType.join(', ')}</div>
                </div>
                ` : ''}
                ${data.dietType ? `
                <div class="report-data-item">
                    <div class="report-data-label">饮食习惯 / Diet Type</div>
                    <div class="report-data-value">${getDietTypeText(data.dietType)}</div>
                </div>
                ` : ''}
                ${data.mealsPerDay ? `
                <div class="report-data-item">
                    <div class="report-data-label">每日用餐次数 / Meals Per Day</div>
                    <div class="report-data-value">${data.mealsPerDay}</div>
                </div>
                ` : ''}
                ${data.sleepQuality ? `
                <div class="report-data-item">
                    <div class="report-data-label">睡眠品质 / Sleep Quality</div>
                    <div class="report-data-value">${getSleepQualityText(data.sleepQuality)}</div>
                </div>
                ` : ''}
                ${data.stressLevel ? `
                <div class="report-data-item">
                    <div class="report-data-label">压力水平 / Stress Level</div>
                    <div class="report-data-value">${getStressLevelText(data.stressLevel)}</div>
                </div>
                ` : ''}
                ${data.smoking ? `
                <div class="report-data-item">
                    <div class="report-data-label">吸烟习惯 / Smoking Habit</div>
                    <div class="report-data-value">${getSmokingText(data.smoking)}</div>
                </div>
                ` : ''}
                ${data.alcohol ? `
                <div class="report-data-item">
                    <div class="report-data-label">饮酒习惯 / Alcohol Consumption</div>
                    <div class="report-data-value">${getAlcoholText(data.alcohol)}</div>
                </div>
                ` : ''}
            </div>
            ${(!data.exerciseFrequency && (!data.exerciseType || data.exerciseType.length === 0) && !data.dietType && !data.mealsPerDay && !data.sleepQuality && !data.stressLevel && !data.smoking && !data.alcohol) ? `
            <div class="report-analysis">
                <p>未提供生活习惯信息 / Lifestyle information not provided.</p>
            </div>
            ` : ''}
            ${generateLifestyleAnalysis(data)}
        </div>
        
        ${data.additionalNotes ? `
        <div class="report-section-item">
            <h3 class="report-section-title">其他备注 / Additional Notes</h3>
            <div class="report-analysis">
                <p>${data.additionalNotes}</p>
            </div>
        </div>
        ` : ''}
        
    `;
    
    reportContent.innerHTML = html;
    
    // Draw connection lines after DOM is updated
    setTimeout(() => {
        drawConnectionLines();
    }, 100);
}

// Draw dashed connection lines from cards to body organs
function drawConnectionLines() {
    const layout = document.querySelector('.human-body-visualization-layout');
    if (!layout) return;
    
    const svg = layout.querySelector('.connection-lines');
    if (!svg) return;
    
    // Get card positions
    const eyesCard = layout.querySelector('[data-organ="eyes"]');
    const nervesCard = layout.querySelector('[data-organ="nerves"]');
    const heartCard = layout.querySelector('[data-organ="heart"]');
    const kidneysCard = layout.querySelector('[data-organ="kidneys"]');
    const handsFeetCard = layout.querySelector('[data-organ="handsFeet"]');
    
    // Get layout dimensions
    const layoutRect = layout.getBoundingClientRect();
    
    // Calculate connection points
    function getCardCenter(card) {
        if (!card) return null;
        const rect = card.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - layoutRect.left,
            y: rect.top + rect.height / 2 - layoutRect.top
        };
    }
    
    // Get connection points from body image
    function getConnectionPoint(organ) {
        const point = layout.querySelector(`.connection-point[data-organ="${organ}"]`);
        if (!point) return null;
        const pointRect = point.getBoundingClientRect();
        return {
            x: pointRect.left + pointRect.width / 2 - layoutRect.left,
            y: pointRect.top + pointRect.height / 2 - layoutRect.top
        };
    }
    
    // Set SVG viewBox to match layout
    svg.setAttribute('viewBox', `0 0 ${layoutRect.width} ${layoutRect.height}`);
    
    // Clear existing lines
    svg.innerHTML = '';
    
    // Draw lines from cards to connection points on body image
    // Ensure all 5 organ cards are connected to their corresponding body parts
    const organs = [
        { card: eyesCard, organ: 'eyes', name: 'Eyes' },
        { card: nervesCard, organ: 'nerves', name: 'Nerves' },
        { card: heartCard, organ: 'heart', name: 'Heart' },
        { card: kidneysCard, organ: 'kidneys', name: 'Kidneys' },
        { card: handsFeetCard, organ: 'handsFeet', name: 'Hands & Feet' }
    ];
    
    organs.forEach(({ card, organ, name }) => {
        if (card) {
            const cardPos = getCardCenter(card);
            const bodyPoint = getConnectionPoint(organ);
            if (cardPos && bodyPoint) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', cardPos.x);
                line.setAttribute('y1', cardPos.y);
                line.setAttribute('x2', bodyPoint.x);
                line.setAttribute('y2', bodyPoint.y);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('stroke-dasharray', '5,5');
                line.setAttribute('opacity', '0.8');
                line.setAttribute('class', `connection-line connection-${organ}`);
                svg.appendChild(line);
            }
        }
    });
}

// Helper functions for status indicators
function getBMIStatus(bmi, age) {
    const bmiNum = parseFloat(bmi);
    const ageNum = parseInt(age) || 25;
    const ranges = getBMIRangesByAge(ageNum);
    
    if (bmiNum < ranges.underweight) {
        return `<span class="report-status status-warning">体重过轻 / Underweight</span>`;
    }
    if (bmiNum < ranges.normal) {
        return `<span class="report-status status-normal">正常范围 / Normal Range</span>`;
    }
    if (bmiNum < ranges.overweight) {
        return `<span class="report-status status-warning">体重过重 / Overweight</span>`;
    }
    return `<span class="report-status status-danger">肥胖 / Obese</span>`;
}

function getGlucoseStatus(value, type) {
    const glucose = parseFloat(value);
    if (type === 'fasting') {
        if (glucose < 70) return `<span class="report-status status-warning">偏低 / Low</span>`;
        if (glucose <= 100) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (glucose <= 125) return `<span class="report-status status-warning">偏高 (糖尿病前期) / High (Prediabetes)</span>`;
        return `<span class="report-status status-danger">高 (可能糖尿病) / High (Possible Diabetes)</span>`;
    } else {
        if (glucose < 140) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (glucose < 200) return `<span class="report-status status-warning">偏高 / High</span>`;
        return `<span class="report-status status-danger">高 / High</span>`;
    }
}

function getHbA1cStatus(value) {
    const hba1c = parseFloat(value);
    if (hba1c < 5.7) return `<span class="report-status status-normal">正常 / Normal</span>`;
    if (hba1c < 6.5) return `<span class="report-status status-warning">偏高 (糖尿病前期) / High (Prediabetes)</span>`;
    return `<span class="report-status status-danger">高 (可能糖尿病) / High (Possible Diabetes)</span>`;
}

function getBodyFatStatus(value, gender) {
    const bodyFat = parseFloat(value);
    if (gender === 'male') {
        if (bodyFat < 10) return `<span class="report-status status-warning">偏低 / Low</span>`;
        if (bodyFat <= 20) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (bodyFat <= 25) return `<span class="report-status status-warning">偏高 / High</span>`;
        return `<span class="report-status status-danger">过高 / Too High</span>`;
    } else {
        if (bodyFat < 18) return `<span class="report-status status-warning">偏低 / Low</span>`;
        if (bodyFat <= 28) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (bodyFat <= 32) return `<span class="report-status status-warning">偏高 / High</span>`;
        return `<span class="report-status status-danger">过高 / Too High</span>`;
    }
}

function getWaistStatus(value, gender) {
    const waist = parseFloat(value);
    if (gender === 'male') {
        return waist > 90 ? `<span class="report-status status-danger">风险 / Risk</span>` : `<span class="report-status status-normal">正常 / Normal</span>`;
    } else {
        return waist > 80 ? `<span class="report-status status-danger">风险 / Risk</span>` : `<span class="report-status status-normal">正常 / Normal</span>`;
    }
}

function getBPStatus(value, type) {
    const bp = parseFloat(value);
    if (type === 'systolic') {
        if (bp < 120) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (bp < 130) return `<span class="report-status status-warning">偏高 (高血压前期) / High (Prehypertension)</span>`;
        if (bp < 140) return `<span class="report-status status-warning">高血压第1期 / Hypertension Stage 1</span>`;
        return `<span class="report-status status-danger">高血压第2期 / Hypertension Stage 2</span>`;
    } else {
        if (bp < 80) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (bp < 90) return `<span class="report-status status-warning">偏高 / High</span>`;
        return `<span class="report-status status-danger">高 / High</span>`;
    }
}

function getHeartRateStatus(value) {
    const hr = parseFloat(value);
    if (hr < 60) return '<span class="report-status status-info">偏低 / Low</span>';
    if (hr <= 100) return '<span class="report-status status-normal">正常 / Normal</span>';
    return '<span class="report-status status-warning">偏高 / High</span>';
}

function getCholesterolStatus(value) {
    const chol = parseFloat(value);
    if (chol < 200) return '<span class="report-status status-normal">理想 / Ideal</span>';
    if (chol < 240) return '<span class="report-status status-warning">偏高 / High</span>';
    return '<span class="report-status status-danger">高 / High</span>';
}

// Text conversion functions - Bilingual
function getGenderText(gender) {
    const map = {
        'male': '男性 / Male',
        'female': '女性 / Female',
        'other': '其他 / Other'
    };
    return map[gender] || '未填写 / Not filled';
}

function getObesityRiskText(risk) {
    const map = {
        'low': '低风险 / Low Risk',
        'moderate': '中等风险 / Moderate Risk',
        'high': '高风险 / High Risk',
        'very-high': '极高风险 / Very High Risk'
    };
    return map[risk] || '未填写 / Not filled';
}

function getExerciseFrequencyText(freq) {
    const map = {
        'none': '几乎不运动 / Almost never',
        'light': '每周1-2次 (轻度) / 1-2 times/week (Light)',
        'moderate': '每周3-4次 (中度) / 3-4 times/week (Moderate)',
        'high': '每周5次以上 (高度) / 5+ times/week (High)'
    };
    return map[freq] || '未填写 / Not filled';
}

function getDietTypeText(diet) {
    const map = {
        'balanced': '均衡饮食 / Balanced Diet',
        'vegetarian': '素食 / Vegetarian',
        'low-carb': '低碳水化合物 / Low Carbohydrate',
        'mediterranean': '地中海饮食 / Mediterranean',
        'irregular': '不规律 / Irregular',
        'other': '其他 / Other'
    };
    return map[diet] || '未填写 / Not filled';
}

function getSleepQualityText(quality) {
    const map = {
        'excellent': '优秀 (7-9小时，品质好) / Excellent (7-9 hours, good quality)',
        'good': '良好 (6-7小时，品质尚可) / Good (6-7 hours, fair quality)',
        'fair': '一般 (5-6小时，品质普通) / Fair (5-6 hours, average quality)',
        'poor': '不佳 (<5小时或品质差) / Poor (<5 hours or poor quality)'
    };
    return map[quality] || '未填写 / Not filled';
}

function getStressLevelText(level) {
    const map = {
        'low': '低 / Low',
        'moderate': '中等 / Moderate',
        'high': '高 / High',
        'very-high': '非常高 / Very High'
    };
    return map[level] || '未填写 / Not filled';
}

function getSmokingText(smoking) {
    const map = {
        'never': '从不吸烟 / Never',
        'former': '已戒烟 / Former smoker',
        'occasional': '偶尔吸烟 / Occasional',
        'regular': '经常吸烟 / Regular'
    };
    return map[smoking] || '未填写 / Not filled';
}

function getAlcoholText(alcohol) {
    const map = {
        'never': '从不饮酒 / Never',
        'occasional': '偶尔 (每周1-2次) / Occasional (1-2 times/week)',
        'moderate': '适度 (每周3-4次) / Moderate (3-4 times/week)',
        'frequent': '经常 (每周5次以上) / Frequent (5+ times/week)'
    };
    return map[alcohol] || '未填写 / Not filled';
}

// Generate BMI Gauge Visualization - Redesigned
function generateBMIGauge(bmi, age) {
    if (!bmi) return '';
    const bmiNum = parseFloat(bmi);
    const ageNum = parseInt(age) || 25;
    const ranges = getBMIRangesByAge(ageNum);
    
    // Determine category and color
    let category = '';
    let categoryEn = '';
    let gaugeColor = '#ff6b6b';
    
    if (bmiNum < ranges.underweight) {
        category = '体重过轻';
        categoryEn = 'Underweight';
        gaugeColor = '#ff6b6b';
    } else if (bmiNum < ranges.normal) {
        category = '正常范围';
        categoryEn = 'Normal';
        gaugeColor = '#51cf66';
    } else if (bmiNum < ranges.overweight) {
        category = '体重过重';
        categoryEn = 'Overweight';
        gaugeColor = '#ffd43b';
    } else {
        category = '肥胖';
        categoryEn = 'Obesity';
        gaugeColor = '#ff6b6b';
    }
    
    // Calculate needle position (0-180 degrees for semicircle)
    // BMI range: 16-40, map to 0-180 degrees
    const minBMI = 16;
    const maxBMI = 40;
    const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, bmiNum));
    const needleAngle = ((normalizedBMI - minBMI) / (maxBMI - minBMI)) * 180;
    
    // Convert angle to radians for SVG
    const needleRad = (needleAngle - 90) * Math.PI / 180;
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    
    // Calculate needle end point
    const needleX = centerX + radius * Math.cos(needleRad);
    const needleY = centerY + radius * Math.sin(needleRad);
    
    // Calculate segment breakpoints
    function bmiToAngle(bmiValue) {
        return ((Math.max(minBMI, Math.min(maxBMI, bmiValue)) - minBMI) / (maxBMI - minBMI)) * 180;
    }
    
    function angleToPoint(angle, r) {
        const rad = (angle - 90) * Math.PI / 180;
        return {
            x: centerX + r * Math.cos(rad),
            y: centerY + r * Math.sin(rad)
        };
    }
    
    const angle18_5 = bmiToAngle(18.5);
    const angle25 = bmiToAngle(25);
    const angle30 = bmiToAngle(30);
    const angle35 = bmiToAngle(35);
    const angle40 = bmiToAngle(40);
    
    const p0 = angleToPoint(0, radius);
    const p18_5 = angleToPoint(angle18_5, radius);
    const p25 = angleToPoint(angle25, radius);
    const p30 = angleToPoint(angle30, radius);
    const p35 = angleToPoint(angle35, radius);
    const p40 = angleToPoint(angle40, radius);
    const p180 = angleToPoint(180, radius);
    
    // Label positions
    const labelRadius = radius + 25;
    const label16 = angleToPoint(bmiToAngle(16), labelRadius);
    const label17 = angleToPoint(bmiToAngle(17), labelRadius);
    const label18_5 = angleToPoint(angle18_5, labelRadius);
    const label25 = angleToPoint(angle25, labelRadius);
    const label30 = angleToPoint(angle30, labelRadius);
    const label35 = angleToPoint(angle35, labelRadius);
    const label40 = angleToPoint(angle40, labelRadius);
    
    // Create gauge HTML with SVG
    const gaugeHTML = `
        <div class="bmi-gauge-container">
            <div class="bmi-gauge-header">
                <h4>BMI = ${bmiNum} kg/m² (${category} / ${categoryEn})</h4>
            </div>
            <div class="bmi-gauge-wrapper">
                <svg class="bmi-gauge" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
                    <!-- Main semicircle arc background -->
                    <path d="M ${p0.x} ${p0.y} A ${radius} ${radius} 0 0 1 ${p180.x} ${p180.y}" 
                          fill="none" 
                          stroke="#e9ecef" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    
                    <!-- Red segment: Underweight (16-18.5) -->
                    <path d="M ${p0.x} ${p0.y} A ${radius} ${radius} 0 0 1 ${p18_5.x} ${p18_5.y}" 
                          fill="none" 
                          stroke="#ff6b6b" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    
                    <!-- Green segment: Normal (18.5 to normal range, but show up to 25 for visual) -->
                    <path d="M ${p18_5.x} ${p18_5.y} A ${radius} ${radius} 0 0 1 ${p25.x} ${p25.y}" 
                          fill="none" 
                          stroke="#51cf66" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    
                    <!-- Extended green to show normal range (25 to adjusted normal) -->
                    ${ranges.normal > 25 ? `
                    <path d="M ${p25.x} ${p25.y} A ${radius} ${radius} 0 0 1 ${angleToPoint(bmiToAngle(ranges.normal), radius).x} ${angleToPoint(bmiToAngle(ranges.normal), radius).y}" 
                          fill="none" 
                          stroke="#51cf66" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    ` : ''}
                    
                    <!-- Yellow segment: Overweight (normal range to 30) -->
                    <path d="M ${angleToPoint(bmiToAngle(ranges.normal), radius).x} ${angleToPoint(bmiToAngle(ranges.normal), radius).y} A ${radius} ${radius} 0 0 1 ${p30.x} ${p30.y}" 
                          fill="none" 
                          stroke="#ffd43b" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    
                    <!-- Red segment: Obesity (30-40) -->
                    <path d="M ${p30.x} ${p30.y} A ${radius} ${radius} 0 0 1 ${p180.x} ${p180.y}" 
                          fill="none" 
                          stroke="#ff6b6b" 
                          stroke-width="20" 
                          stroke-linecap="round"/>
                    
                    <!-- Needle -->
                    <line x1="${centerX}" y1="${centerY}" 
                          x2="${needleX}" y2="${needleY}" 
                          stroke="${gaugeColor}" 
                          stroke-width="4" 
                          stroke-linecap="round"/>
                    <circle cx="${centerX}" cy="${centerY}" r="6" fill="${gaugeColor}"/>
                    
                    <!-- BMI value in center -->
                    <text x="${centerX}" y="${centerY + 10}" 
                          font-size="48" 
                          font-weight="700" 
                          fill="#1a1a1a" 
                          text-anchor="middle" 
                          font-family="Arial, sans-serif">${bmiNum}</text>
                    
                    <!-- Labels on arc -->
                    <text x="${label16.x}" y="${label16.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">16</text>
                    <text x="${label17.x}" y="${label17.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">17</text>
                    <text x="${label18_5.x}" y="${label18_5.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">18.5</text>
                    <text x="${label25.x}" y="${label25.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">25</text>
                    <text x="${label30.x}" y="${label30.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">30</text>
                    <text x="${label35.x}" y="${label35.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">35</text>
                    <text x="${label40.x}" y="${label40.y + 5}" font-size="12" fill="#666" text-anchor="middle" font-weight="500">40</text>
                </svg>
            </div>
            
            <!-- Linear scale for low BMI values (16-18.5) -->
            <div class="bmi-linear-scale">
                <div class="linear-scale-line">
                    <div class="scale-segment red-segment" style="width: 60%;"></div>
                    <div class="scale-marker" style="left: 0%;">16</div>
                    <div class="scale-marker" style="left: 20%;">17</div>
                    <div class="scale-marker red-dot" style="left: 60%;">18.5</div>
                </div>
            </div>
            
            <div class="bmi-gauge-info">
                <p><strong>健康BMI范围 / Healthy BMI Range:</strong> ${ranges.underweight} kg/m² - ${ranges.normal} kg/m²</p>
                <p><strong>根据您的年龄 / Based on your age:</strong> ${ageNum} 岁 / years old</p>
            </div>
        </div>
    `;
    
    return gaugeHTML;
}

// Analysis generation functions - Bilingual
function generateBMIAnalysis(bmi, age) {
    if (!bmi) return '';
    const bmiNum = parseFloat(bmi);
    const ageNum = parseInt(age) || 25;
    const ranges = getBMIRangesByAge(ageNum);
    
    let analysis = '<div class="report-analysis"><h4>BMI 分析 / BMI Analysis</h4><p>';
    
    // Add age-specific note
    let ageNote = '';
    if (ageNum >= 45 && ageNum < 55) {
        ageNote = '根据您的年龄（45-54岁），BMI正常范围可适当放宽至26.9。<br>Based on your age (45-54 years), the normal BMI range can be appropriately extended to 26.9.';
    } else if (ageNum >= 55) {
        ageNote = '根据您的年龄（55岁以上），BMI正常范围可适当放宽至27.9。对于老年人，稍微高一点的BMI可能更健康。<br>Based on your age (55+ years), the normal BMI range can be appropriately extended to 27.9. For older adults, a slightly higher BMI may be healthier.';
    }
    
    if (bmiNum < ranges.underweight) {
        analysis += `您的 BMI 显示体重过轻。建议增加健康体重，通过均衡饮食和适当运动来改善。${ageNote ? '<br>' + ageNote : ''}<br>Your BMI indicates underweight. It is recommended to increase healthy weight through balanced diet and appropriate exercise.`;
    } else if (bmiNum < ranges.normal) {
        analysis += `您的 BMI 在正常范围内（根据您的年龄调整），这是良好的健康指标。请继续维持健康的生活习惯。${ageNote ? '<br>' + ageNote : ''}<br>Your BMI is within the normal range (adjusted for your age), which is a good health indicator. Please continue to maintain healthy lifestyle habits.`;
    } else if (bmiNum < ranges.overweight) {
        analysis += `您的 BMI 显示体重过重。建议通过饮食控制和规律运动来减重，以降低相关健康风险。${ageNote ? '<br>' + ageNote : ''}<br>Your BMI indicates overweight. It is recommended to lose weight through diet control and regular exercise to reduce related health risks.`;
    } else {
        analysis += `您的 BMI 显示肥胖，这可能增加多种健康风险。强烈建议寻求专业医疗建议，制定减重计划。${ageNote ? '<br>' + ageNote : ''}<br>Your BMI indicates obesity, which may increase various health risks. It is strongly recommended to seek professional medical advice and create a weight loss plan.`;
    }
    
    analysis += '</p></div>';
    return analysis;
}

function generateGlucoseAnalysis(data) {
    let analysis = '<div class="report-analysis"><h4>血糖分析 / Glucose Analysis</h4><p>';
    const fasting = parseFloat(data.fastingGlucose);
    
    if (fasting) {
        if (fasting < 70) {
            analysis += '您的空腹血糖偏低，可能需要注意低血糖的风险。<br>Your fasting glucose is low, and you may need to pay attention to the risk of hypoglycemia.';
        } else if (fasting <= 100) {
            analysis += '您的空腹血糖在正常范围内，这是良好的指标。<br>Your fasting glucose is within the normal range, which is a good indicator.';
        } else if (fasting <= 125) {
            analysis += '您的空腹血糖偏高，处于糖尿病前期阶段。建议调整饮食和生活方式，并定期监测。<br>Your fasting glucose is high, indicating prediabetes. It is recommended to adjust diet and lifestyle, and monitor regularly.';
        } else {
            analysis += '您的空腹血糖明显偏高，可能患有糖尿病。强烈建议寻求专业医疗评估和治疗。<br>Your fasting glucose is significantly high, and you may have diabetes. It is strongly recommended to seek professional medical evaluation and treatment.';
        }
    }
    
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 6.5) {
            analysis += '您的 HbA1c 值显示可能患有糖尿病，需要立即医疗关注。<br>Your HbA1c value indicates possible diabetes and requires immediate medical attention.';
        }
    }
    
    analysis += '</p></div>';
    return analysis;
}

function generateObesityAnalysis(data) {
    let analysis = '<div class="report-analysis"><h4>肥胖风险分析 / Obesity Risk Analysis</h4><p>';
    
    if (data.bmi) {
        const bmiNum = parseFloat(data.bmi);
        const ageNum = parseInt(data.patientAge) || 25;
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmiNum >= ranges.normal) {
            analysis += `根据您的 BMI 和相关指标（已根据您的年龄${ageNum}岁调整），您可能有较高的肥胖相关健康风险。<br>Based on your BMI and related indicators (adjusted for your age of ${ageNum} years), you may have a higher risk of obesity-related health issues.`;
        }
    }
    
    if (data.waistCircumference) {
        const waist = parseFloat(data.waistCircumference);
        const gender = data.patientGender;
        if ((gender === 'male' && waist > 90) || (gender === 'female' && waist > 80)) {
            analysis += '您的腰围超过建议范围，这与代谢症候群和心血管疾病风险增加有关。<br>Your waist circumference exceeds the recommended range, which is associated with increased risk of metabolic syndrome and cardiovascular disease.';
        }
    }
    
    analysis += '</p></div>';
    return analysis;
}

function generateBPAnalysis(data) {
    let analysis = '<div class="report-analysis"><h4>血压分析 / Blood Pressure Analysis</h4><p>';
    const systolic = parseFloat(data.systolicBP);
    const diastolic = parseFloat(data.diastolicBP);
    
    if (systolic && diastolic) {
        if (systolic < 120 && diastolic < 80) {
            analysis += '您的血压在正常范围内，请继续维持健康的生活方式。<br>Your blood pressure is within the normal range. Please continue to maintain a healthy lifestyle.';
        } else if (systolic < 130 && diastolic < 80) {
            analysis += '您的血压处于高血压前期，建议调整生活方式以预防高血压。<br>Your blood pressure is in the prehypertension stage. It is recommended to adjust your lifestyle to prevent hypertension.';
        } else {
            analysis += '您的血压偏高，建议寻求医疗建议，可能需要药物治疗和生活方式调整。<br>Your blood pressure is high. It is recommended to seek medical advice, and you may need medication and lifestyle adjustments.';
        }
    }
    
    analysis += '</p></div>';
    return analysis;
}

function generateLifestyleAnalysis(data) {
    let analysis = '<div class="report-analysis"><h4>生活习惯分析 / Lifestyle Analysis</h4><p>';
    
    if (data.exerciseFrequency === 'none' || data.exerciseFrequency === 'light') {
        analysis += '您的运动量可能不足，建议增加规律运动以改善整体健康。<br>Your exercise level may be insufficient. It is recommended to increase regular exercise to improve overall health.';
    }
    
    if (data.sleepQuality === 'poor' || data.sleepQuality === 'fair') {
        analysis += '您的睡眠品质可能需要改善，良好的睡眠对血糖控制和整体健康非常重要。<br>Your sleep quality may need improvement. Good sleep is very important for blood glucose control and overall health.';
    }
    
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        analysis += '您的高压力水平可能影响血糖控制和整体健康，建议学习压力管理技巧。<br>Your high stress level may affect blood glucose control and overall health. It is recommended to learn stress management techniques.';
    }
    
    if (data.smoking === 'regular' || data.smoking === 'occasional') {
        analysis += '吸烟会增加心血管疾病和糖尿病并发症的风险，强烈建议戒烟。<br>Smoking increases the risk of cardiovascular disease and diabetes complications. It is strongly recommended to quit smoking.';
    }
    
    analysis += '</p></div>';
    return analysis;
}

function generateRecommendations(data) {
    let recommendations = '<div class="report-recommendations"><h4>健康建议 / Health Recommendations</h4><ul>';
    
    // BMI recommendations (age-adjusted)
    if (data.bmi) {
        const bmiNum = parseFloat(data.bmi);
        const ageNum = parseInt(data.patientAge) || 25;
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmiNum >= ranges.normal) {
            recommendations += '<li>制定减重计划，目标是每周减重 0.5-1 公斤 / Create a weight loss plan, aiming to lose 0.5-1 kg per week</li>';
            recommendations += '<li>减少高热量、高糖分食物的摄取 / Reduce intake of high-calorie and high-sugar foods</li>';
        } else if (bmiNum < ranges.underweight) {
            recommendations += '<li>增加健康体重，通过均衡营养和适当运动 / Increase healthy weight through balanced nutrition and appropriate exercise</li>';
        }
    }
    
    // Glucose recommendations
    if (data.fastingGlucose) {
        const fasting = parseFloat(data.fastingGlucose);
        if (fasting > 100) {
            recommendations += '<li>控制碳水化合物摄取，选择低升糖指数的食物 / Control carbohydrate intake, choose foods with low glycemic index</li>';
            recommendations += '<li>规律监测血糖，记录饮食和血糖变化 / Regularly monitor blood glucose and record diet and glucose changes</li>';
            recommendations += '<li>考虑咨询营养师制定个人化饮食计划 / Consider consulting a nutritionist to create a personalized diet plan</li>';
        }
    }
    
    // Blood pressure recommendations
    if (data.systolicBP && parseFloat(data.systolicBP) >= 120) {
        recommendations += '<li>减少钠盐摄取，控制在每日 5 克以下 / Reduce sodium intake, keep it below 5g per day</li>';
        recommendations += '<li>增加蔬果摄取，特别是富含钾的食物 / Increase intake of fruits and vegetables, especially those rich in potassium</li>';
    }
    
    // Exercise recommendations
    if (data.exerciseFrequency === 'none' || data.exerciseFrequency === 'light') {
        recommendations += '<li>开始规律运动，目标每周至少 150 分钟中等强度运动 / Start regular exercise, aim for at least 150 minutes of moderate-intensity exercise per week</li>';
        recommendations += '<li>从轻度活动开始，如快走、游泳或骑自行车 / Start with light activities such as brisk walking, swimming, or cycling</li>';
    }
    
    // Sleep recommendations
    if (data.sleepQuality === 'poor' || data.sleepQuality === 'fair') {
        recommendations += '<li>建立规律的睡眠时间表，每天固定时间睡觉和起床 / Establish a regular sleep schedule, sleep and wake up at fixed times daily</li>';
        recommendations += '<li>创造良好的睡眠环境，避免睡前使用电子设备 / Create a good sleep environment, avoid using electronic devices before bed</li>';
    }
    
    // Stress recommendations
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        recommendations += '<li>学习压力管理技巧，如深呼吸、冥想或瑜伽 / Learn stress management techniques such as deep breathing, meditation, or yoga</li>';
        recommendations += '<li>确保充足的休息和放松时间 / Ensure adequate rest and relaxation time</li>';
    }
    
    // General recommendations
    recommendations += '<li>定期进行健康检查，追踪各项指标的变化 / Regular health check-ups to track changes in various indicators</li>';
    recommendations += '<li>如有任何健康疑虑，请咨询专业医疗人员 / If you have any health concerns, please consult a medical professional</li>';
    recommendations += '<li>保持积极的心态，健康管理是一个持续的过程 / Maintain a positive attitude, health management is an ongoing process</li>';
    
    recommendations += '</ul></div>';
    return recommendations;
}

// Show form function
function showForm() {
    reportSection.style.display = 'none';
    formSection.style.display = 'block';
    formSection.scrollIntoView({ behavior: 'smooth' });
    form.reset();
    // Destroy chart if exists
    if (window.riskChartInstance) {
        window.riskChartInstance.destroy();
        window.riskChartInstance = null;
    }
    document.getElementById('chartContainer').style.display = 'none';
}

// Calculate health risks
function calculateHealthRisks(data) {
    const risks = {
        diabetes: 0,
        hypertension: 0,
        cardiovascular: 0,
        obesity: 0,
        metabolic: 0,
        healthy: 0
    };
    
    // Diabetes Risk Calculation
    let diabetesScore = 0;
    if (data.fastingGlucose) {
        const glucose = parseFloat(data.fastingGlucose);
        if (glucose >= 126) diabetesScore += 40;
        else if (glucose >= 100) diabetesScore += 25;
        else if (glucose < 70) diabetesScore += 10;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 6.5) diabetesScore += 30;
        else if (hba1c >= 5.7) diabetesScore += 20;
    }
    if (data.postprandialGlucose) {
        const pp = parseFloat(data.postprandialGlucose);
        if (pp >= 200) diabetesScore += 20;
        else if (pp >= 140) diabetesScore += 15;
    }
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ageNum = parseInt(data.patientAge) || 25;
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmi >= 30) diabetesScore += 15;
        else if (bmi >= ranges.normal) diabetesScore += 10;
    }
    if (data.exerciseFrequency === 'none' || data.exerciseFrequency === 'light') {
        diabetesScore += 10;
    }
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        diabetesScore += 5;
    }
    risks.diabetes = Math.min(diabetesScore, 100);
    
    // Hypertension Risk Calculation
    let hypertensionScore = 0;
    if (data.systolicBP) {
        const systolic = parseFloat(data.systolicBP);
        if (systolic >= 140) hypertensionScore += 40;
        else if (systolic >= 130) hypertensionScore += 25;
        else if (systolic >= 120) hypertensionScore += 15;
    }
    if (data.diastolicBP) {
        const diastolic = parseFloat(data.diastolicBP);
        if (diastolic >= 90) hypertensionScore += 30;
        else if (diastolic >= 80) hypertensionScore += 20;
    }
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ageNum = parseInt(data.patientAge) || 25;
        const ranges = getBMIRangesByAge(ageNum);
        if (bmi >= ranges.normal) {
            hypertensionScore += 15;
        }
    }
    if (data.smoking === 'regular' || data.smoking === 'occasional') {
        hypertensionScore += 10;
    }
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        hypertensionScore += 10;
    }
    risks.hypertension = Math.min(hypertensionScore, 100);
    
    // Cardiovascular Risk Calculation
    let cardiovascularScore = 0;
    if (data.systolicBP && parseFloat(data.systolicBP) >= 140) {
        cardiovascularScore += 25;
    }
    if (data.cholesterol) {
        const chol = parseFloat(data.cholesterol);
        if (chol >= 240) cardiovascularScore += 25;
        else if (chol >= 200) cardiovascularScore += 15;
    }
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        if (bmi >= 30) {
            cardiovascularScore += 20;
        } else {
            const ageNum = parseInt(data.patientAge) || 25;
            const ranges = getBMIRangesByAge(ageNum);
            if (bmi >= ranges.normal) {
                cardiovascularScore += 10;
            }
        }
    }
    if (data.smoking === 'regular') {
        cardiovascularScore += 20;
    }
    if (data.exerciseFrequency === 'none') {
        cardiovascularScore += 15;
    }
    if (data.diabetes && risks.diabetes >= 50) {
        cardiovascularScore += 15;
    }
    risks.cardiovascular = Math.min(cardiovascularScore, 100);
    
    // Obesity Risk Calculation (age-adjusted)
    let obesityScore = 0;
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ageNum = parseInt(data.patientAge) || 25;
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmi >= 30) obesityScore += 40;
        else if (bmi >= ranges.normal) obesityScore += 25;
        else if (bmi >= ranges.overweight) obesityScore += 15;
    }
    if (data.waistCircumference) {
        const waist = parseFloat(data.waistCircumference);
        const gender = data.patientGender;
        if ((gender === 'male' && waist > 90) || (gender === 'female' && waist > 80)) {
            obesityScore += 25;
        }
    }
    if (data.bodyFat) {
        const bodyFat = parseFloat(data.bodyFat);
        const gender = data.patientGender;
        if ((gender === 'male' && bodyFat > 25) || (gender === 'female' && bodyFat > 32)) {
            obesityScore += 20;
        }
    }
    if (data.exerciseFrequency === 'none') {
        obesityScore += 15;
    }
    risks.obesity = Math.min(obesityScore, 100);
    
    // Metabolic Syndrome Risk
    let metabolicScore = 0;
    if (risks.diabetes >= 30) metabolicScore += 25;
    if (risks.hypertension >= 30) metabolicScore += 20;
    if (risks.obesity >= 30) metabolicScore += 25;
    if (data.waistCircumference) {
        const waist = parseFloat(data.waistCircumference);
        const gender = data.patientGender;
        if ((gender === 'male' && waist > 90) || (gender === 'female' && waist > 80)) {
            metabolicScore += 20;
        }
    }
    if (data.cholesterol && parseFloat(data.cholesterol) >= 200) {
        metabolicScore += 10;
    }
    risks.metabolic = Math.min(metabolicScore, 100);
    
    // Calculate healthy percentage (inverse of average risk)
    const totalRisk = risks.diabetes + risks.hypertension + risks.cardiovascular + risks.obesity + risks.metabolic;
    const avgRisk = totalRisk / 5;
    risks.healthy = Math.max(0, 100 - avgRisk);
    
    return risks;
}

// Generate Risk Assessment Chart
function generateRiskChart(data) {
    const risks = calculateHealthRisks(data);
    const chartContainer = document.getElementById('chartContainer');
    const chartCanvas = document.getElementById('riskChart');
    const chartLegend = document.getElementById('chartLegend');
    
    if (!chartContainer || !chartCanvas) return;
    
    // Show chart container and ensure it's visible
    chartContainer.style.display = 'block';

    // Show CTA page (next page after chart)
    const ctaPage = document.getElementById('ctaPage');
    if (ctaPage) ctaPage.style.display = 'block';
    
    // Scroll chart into view smoothly
    setTimeout(() => {
        chartContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 500);
    
    // Destroy existing chart if any
    if (window.riskChartInstance) {
        window.riskChartInstance.destroy();
    }
    
    // Prepare chart data
    const chartData = [];
    const chartLabels = [];
    const chartColors = [];
    const chartDescriptions = [];
    
    // Add risks to chart (only if risk > 0)
    if (risks.diabetes > 0) {
        chartData.push(risks.diabetes);
        chartLabels.push('糖尿病风险 / Diabetes Risk');
        chartColors.push('#dc3545'); // Red
        chartDescriptions.push(getRiskDescription(risks.diabetes, '糖尿病 / Diabetes'));
    }
    
    if (risks.hypertension > 0) {
        chartData.push(risks.hypertension);
        chartLabels.push('高血压风险 / Hypertension Risk');
        chartColors.push('#ff6b6b'); // Light red
        chartDescriptions.push(getRiskDescription(risks.hypertension, '高血压 / Hypertension'));
    }
    
    if (risks.cardiovascular > 0) {
        chartData.push(risks.cardiovascular);
        chartLabels.push('心血管疾病风险 / Cardiovascular Disease Risk');
        chartColors.push('#ff9800'); // Orange
        chartDescriptions.push(getRiskDescription(risks.cardiovascular, '心血管疾病 / Cardiovascular Disease'));
    }
    
    if (risks.obesity > 0) {
        chartData.push(risks.obesity);
        chartLabels.push('肥胖风险 / Obesity Risk');
        chartColors.push('#ffc107'); // Yellow
        chartDescriptions.push(getRiskDescription(risks.obesity, '肥胖 / Obesity'));
    }
    
    if (risks.metabolic > 0) {
        chartData.push(risks.metabolic);
        chartLabels.push('代谢症候群风险 / Metabolic Syndrome Risk');
        chartColors.push('#f44336'); // Dark red
        chartDescriptions.push(getRiskDescription(risks.metabolic, '代谢症候群 / Metabolic Syndrome'));
    }
    
    if (risks.healthy > 0) {
        chartData.push(risks.healthy);
        chartLabels.push('健康状态 / Healthy Status');
        chartColors.push('#28a745'); // Green
        chartDescriptions.push('您的健康指标良好 / Your health indicators are good');
    }
    
    // Create chart
    const ctx = chartCanvas.getContext('2d');
    
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    
    window.riskChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColors,
                borderColor: '#ffffff',
                borderWidth: isMobile ? 1 : 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: isMobile ? 1.2 : 1.5,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value.toFixed(1)}%`;
                        }
                    }
                }
            },
            interaction: {
                intersect: true
            }
        }
    });
    
    // Generate legend
    let legendHTML = '';
    chartLabels.forEach((label, index) => {
        const value = chartData[index];
        const color = chartColors[index];
        const description = chartDescriptions[index];
        legendHTML += `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${color};"></div>
                <div class="legend-text">
                    <div class="legend-label">${label}</div>
                    <div class="legend-value">${value.toFixed(1)}% - ${description}</div>
                </div>
            </div>
        `;
    });
    chartLegend.innerHTML = legendHTML;
}

// Get risk description - Bilingual
function getRiskDescription(risk, disease) {
    if (risk >= 70) {
        return `极高风险 - 强烈建议立即寻求医疗协助 / Very High Risk - Strongly recommend seeking medical assistance immediately`;
    } else if (risk >= 50) {
        return `高风险 - 建议尽快咨询专业医疗人员 / High Risk - Recommend consulting a medical professional as soon as possible`;
    } else if (risk >= 30) {
        return `中等风险 - 需要关注并调整生活方式 / Moderate Risk - Need attention and lifestyle adjustments`;
    } else if (risk >= 15) {
        return `低风险 - 保持良好习惯 / Low Risk - Maintain good habits`;
    } else {
        return `风险较低 - 继续维持 / Lower Risk - Continue to maintain`;
    }
}

