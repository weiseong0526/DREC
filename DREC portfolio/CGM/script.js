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
const form = document.getElementById('cgmForm');
const reportSection = document.getElementById('report');
const reportContent = document.getElementById('reportContent');
const formSection = document.querySelector('.form-section');

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
            const requiredInputs = field.querySelectorAll('[data-required="true"]');
            requiredInputs.forEach(inp => {
                inp.setAttribute('required', 'required');
            });
        });
        diabeticFields.forEach(field => field.classList.remove('show'));
    } else if (patientType === 'diabetic') {
        diabeticFields.forEach(field => {
            field.classList.add('show');
            const requiredInputs = field.querySelectorAll('[data-required="true"]');
            requiredInputs.forEach(inp => {
                inp.setAttribute('required', 'required');
            });
        });
        prediabeticFields.forEach(field => field.classList.remove('show'));
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
});

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


// Blood glucose unit conversion functions
function mgdlToMmol(mgdl) {
    return (mgdl / 18.0182).toFixed(1);
}

function mmolToMgdl(mmol) {
    return (mmol * 18.0182).toFixed(1);
}

// Auto-convert between glucose units
const fastingGlucoseMgdl = document.getElementById('fastingGlucoseMgdl');
const fastingGlucoseMmol = document.getElementById('fastingGlucoseMmol');
const postprandialGlucoseMgdl = document.getElementById('postprandialGlucoseMgdl');
const postprandialGlucoseMmol = document.getElementById('postprandialGlucoseMmol');

if (fastingGlucoseMgdl && fastingGlucoseMmol) {
    fastingGlucoseMgdl.addEventListener('input', function() {
        if (this.value) {
            fastingGlucoseMmol.value = mgdlToMmol(this.value);
        }
    });
    
    fastingGlucoseMmol.addEventListener('input', function() {
        if (this.value) {
            fastingGlucoseMgdl.value = mmolToMgdl(this.value);
        }
    });
}

if (postprandialGlucoseMgdl && postprandialGlucoseMmol) {
    postprandialGlucoseMgdl.addEventListener('input', function() {
        if (this.value) {
            postprandialGlucoseMmol.value = mgdlToMmol(this.value);
        }
    });
    
    postprandialGlucoseMmol.addEventListener('input', function() {
        if (this.value) {
            postprandialGlucoseMgdl.value = mmolToMgdl(this.value);
        }
    });
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Additional validation for prediabetic patients
    const patientType = getPatientTypeFromURL();
    if (patientType === 'prediabetic') {
        const recentFbs = document.querySelector('input[name="prediabetic_recent_fbs"]').value;
        const recentHba1c = document.querySelector('input[name="prediabetic_recent_hba1c"]').value;
        if (!recentFbs && !recentHba1c) {
            alert('请至少填写空腹血糖 (FBS) 或糖化血红蛋白 (HbA1c) 中的一项 / Please fill in at least FBS or HbA1c');
            return;
        }
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // Generate report
    generateReport(formData);
    
    // Generate risk assessment chart
    setTimeout(() => {
        generateRiskChart(formData);
    }, 300);
    
    // Show report section and hide form
    formSection.style.display = 'none';
    reportSection.style.display = 'block';
    
    // Scroll to report
    reportSection.scrollIntoView({ behavior: 'smooth' });
});

// Collect all form data
function collectFormData() {
    const formData = new FormData(form);
    const data = {};
    
    // Patient Type
    data.patientType = formData.get('patientType');
    
    // Personal Information
    data.patientName = formData.get('patientName');
    data.patientContact = formData.get('patientContact');
    data.patientAge = formData.get('patientAge');
    data.patientGender = formData.get('patientGender');
    data.patientEmail = formData.get('patientEmail');
    
    // BMI
    const height = parseFloat(formData.get('height'));
    const weight = parseFloat(formData.get('weight'));
    data.height = height;
    data.weight = weight;
    // BMI formula: weight (kg) / height (m)^2
    // Convert height from cm to meters by dividing by 100
    data.bmi = height > 0 && weight > 0 ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null;
    
    // Blood Glucose - handle dual units
    const fastingMgdl = formData.get('fastingGlucoseMgdl');
    const fastingMmol = formData.get('fastingGlucoseMmol');
    data.fastingGlucoseMgdl = fastingMgdl || null;
    data.fastingGlucoseMmol = fastingMmol || null;
    // Store primary value (prefer mg/dL if both filled, otherwise use whichever is filled)
    data.fastingGlucose = fastingMgdl || (fastingMmol ? (parseFloat(fastingMmol) * 18.0182).toFixed(1) : null);
    
    const postprandialMgdl = formData.get('postprandialGlucoseMgdl');
    const postprandialMmol = formData.get('postprandialGlucoseMmol');
    data.postprandialGlucoseMgdl = postprandialMgdl || null;
    data.postprandialGlucoseMmol = postprandialMmol || null;
    data.postprandialGlucose = postprandialMgdl || (postprandialMmol ? (parseFloat(postprandialMmol) * 18.0182).toFixed(1) : null);
    
    data.hba1c = formData.get('hba1c');
    data.glucoseTestDate = formData.get('glucoseTestDate');
    
    // Body Fat & Obesity
    data.bodyFat = formData.get('bodyFat');
    data.waistCircumference = formData.get('waistCircumference');
    data.obesityRisk = formData.get('obesityRisk');
    
    // Blood Pressure & Cholesterol
    data.systolicBP = formData.get('systolicBP');
    data.diastolicBP = formData.get('diastolicBP');
    data.heartRate = formData.get('heartRate');
    data.cholesterol = formData.get('cholesterol');
    data.triglycerides = formData.get('triglycerides');
    data.ldl = formData.get('ldl');
    data.hdl = formData.get('hdl');
    data.bpTestDate = formData.get('bpTestDate');
    
    // Lifestyle
    data.exerciseFrequency = formData.get('exerciseFrequency');
    data.exerciseType = formData.getAll('exerciseType');
    data.mealsPerDay = formData.get('mealsPerDay');
    data.sleepQuality = formData.get('sleepQuality');
    data.stressLevel = formData.get('stressLevel');
    data.smoking = formData.get('smoking');
    data.alcohol = formData.get('alcohol');
    data.additionalNotes = formData.get('additionalNotes');
    
    // Conditional fields based on patient type
    if (data.patientType === 'prediabetic') {
        data.prediabetic_family_diabetes = formData.get('prediabetic_family_diabetes');
        data.prediabetic_sugary_foods = formData.get('prediabetic_sugary_foods');
        data.prediabetic_recent_fbs = formData.get('prediabetic_recent_fbs');
        data.prediabetic_recent_hba1c = formData.get('prediabetic_recent_hba1c');
        data.prediabetic_fear_complications = formData.getAll('prediabetic_fear_complications');
        data.prediabetic_hypertension = formData.get('prediabetic_hypertension');
        data.prediabetic_high_cholesterol = formData.get('prediabetic_high_cholesterol');
        data.prediabetic_preferred_method = formData.get('prediabetic_preferred_method');
        data.prediabetic_willing_20min = formData.get('prediabetic_willing_20min');
    } else if (data.patientType === 'diabetic') {
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
        data.diabetic_fear_complications = formData.getAll('diabetic_fear_complications');
    }
    
    return data;
}

// Calculate organ-specific risks
function calculateOrganRisks(data) {
    const risks = {
        eyes: 0,      // 眼睛 / Eyes (Retinopathy)
        kidneys: 0,   // 肾脏 / Kidneys (Nephropathy)
        nerves: 0,    // 神经 / Nerves (Neuropathy)
        heart: 0      // 心脏 / Heart (Cardiovascular)
    };
    
    // Get glucose value (prefer mg/dL, convert mmol/L if needed)
    let fastingGlucose = null;
    if (data.fastingGlucoseMgdl) {
        fastingGlucose = parseFloat(data.fastingGlucoseMgdl);
    } else if (data.fastingGlucoseMmol) {
        fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
    } else if (data.fastingGlucose) {
        fastingGlucose = parseFloat(data.fastingGlucose);
    }
    
    let postprandialGlucose = null;
    if (data.postprandialGlucoseMgdl) {
        postprandialGlucose = parseFloat(data.postprandialGlucoseMgdl);
    } else if (data.postprandialGlucoseMmol) {
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
    if (data.cholesterol) {
        const chol = parseFloat(data.cholesterol);
        if (chol >= 240) heartScore += 25;
        else if (chol >= 200) heartScore += 15;
    }
    if (data.ldl) {
        const ldl = parseFloat(data.ldl);
        if (ldl >= 160) heartScore += 30;
        else if (ldl >= 130) heartScore += 20;
        else if (ldl >= 100) heartScore += 10;
    }
    if (data.hdl) {
        const hdl = parseFloat(data.hdl);
        const gender = data.patientGender;
        if ((gender === 'male' && hdl < 40) || (gender === 'female' && hdl < 50)) {
            heartScore += 15;
        }
    }
    if (data.triglycerides && parseFloat(data.triglycerides) >= 200) {
        heartScore += 15;
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
    const highestRisk = Math.max(organRisks.eyes, organRisks.kidneys, organRisks.nerves, organRisks.heart);
    
    const notFilled = '未填写 / Not filled';
    const reportDateLabel = '报告生成日期 / Report Date';
    
    let html = `
        <div class="report-section-item">
            <div style="text-align: center; margin-bottom: 30px; color: var(--text-light);">
                <p>${reportDateLabel}: ${reportDate}</p>
            </div>
        </div>
        
        <!-- Organ-Specific Risk Assessment -->
        <div class="report-section-item">
            <h3 class="report-section-title">器官风险评估 / Organ Risk Assessment</h3>
            <div class="organ-risk-grid">
                <!-- Eyes Risk -->
                <div class="organ-risk-card">
                    <div class="organ-icon">👁️</div>
                    <h4 class="organ-name">眼睛 / Eyes</h4>
                    <div class="organ-risk-level ${getRiskLevel(organRisks.eyes).class}">
                        ${getRiskLevel(organRisks.eyes).text}
                    </div>
                    <div class="organ-risk-score">风险评分 / Risk Score: ${organRisks.eyes}%</div>
                    <div class="organ-risk-details">
                        <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                        <ul>
                            ${(() => {
                                let fastingGlucose = null;
                                if (data.fastingGlucoseMgdl) fastingGlucose = parseFloat(data.fastingGlucoseMgdl);
                                else if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                            })()}
                            ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                            ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                            ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                        </ul>
                        <p><strong>建议 / Recommendations:</strong></p>
                        <p>${organRisks.eyes >= 70 ? '建议立即咨询眼科医生进行详细检查 / Recommend immediate ophthalmologist consultation' : organRisks.eyes >= 40 ? '建议定期进行眼科检查 / Recommend regular eye examinations' : '保持良好血糖控制，定期检查 / Maintain good glucose control and regular checkups'}</p>
                    </div>
                </div>
                
                <!-- Kidneys Risk -->
                <div class="organ-risk-card">
                    <div class="organ-icon">🫘</div>
                    <h4 class="organ-name">肾脏 / Kidneys</h4>
                    <div class="organ-risk-level ${getRiskLevel(organRisks.kidneys).class}">
                        ${getRiskLevel(organRisks.kidneys).text}
                    </div>
                    <div class="organ-risk-score">风险评分 / Risk Score: ${organRisks.kidneys}%</div>
                    <div class="organ-risk-details">
                        <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                        <ul>
                            ${(() => {
                                let fastingGlucose = null;
                                if (data.fastingGlucoseMgdl) fastingGlucose = parseFloat(data.fastingGlucoseMgdl);
                                else if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                return fastingGlucose && fastingGlucose >= 140 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                            })()}
                            ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                            ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                        </ul>
                        <p><strong>建议 / Recommendations:</strong></p>
                        <p>${organRisks.kidneys >= 70 ? '建议立即进行肾功能检查 / Recommend immediate kidney function tests' : organRisks.kidneys >= 40 ? '建议定期监测肾功能 / Recommend regular kidney function monitoring' : '控制血糖和血压，定期检查 / Control glucose and blood pressure, regular checkups'}</p>
                    </div>
                </div>
                
                <!-- Nerves Risk -->
                <div class="organ-risk-card">
                    <div class="organ-icon">🧠</div>
                    <h4 class="organ-name">神经 / Nerves</h4>
                    <div class="organ-risk-level ${getRiskLevel(organRisks.nerves).class}">
                        ${getRiskLevel(organRisks.nerves).text}
                    </div>
                    <div class="organ-risk-score">风险评分 / Risk Score: ${organRisks.nerves}%</div>
                    <div class="organ-risk-details">
                        <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                        <ul>
                            ${(() => {
                                let fastingGlucose = null;
                                if (data.fastingGlucoseMgdl) fastingGlucose = parseFloat(data.fastingGlucoseMgdl);
                                else if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                return fastingGlucose && fastingGlucose >= 200 ? '<li>血糖控制不佳 / Poor glucose control</li>' : '';
                            })()}
                            ${data.hba1c && parseFloat(data.hba1c) >= 7.0 ? '<li>HbA1c偏高 / Elevated HbA1c</li>' : ''}
                            ${data.patientType === 'diabetic' ? '<li>糖尿病患者 / Diabetic patient</li>' : ''}
                        </ul>
                        <p><strong>建议 / Recommendations:</strong></p>
                        <p>${organRisks.nerves >= 70 ? '建议立即咨询神经科医生 / Recommend immediate neurologist consultation' : organRisks.nerves >= 40 ? '建议定期进行神经功能检查 / Recommend regular neurological examinations' : '保持良好血糖控制 / Maintain good glucose control'}</p>
                    </div>
                </div>
                
                <!-- Heart Risk -->
                <div class="organ-risk-card">
                    <div class="organ-icon">❤️</div>
                    <h4 class="organ-name">心脏 / Heart</h4>
                    <div class="organ-risk-level ${getRiskLevel(organRisks.heart).class}">
                        ${getRiskLevel(organRisks.heart).text}
                    </div>
                    <div class="organ-risk-score">风险评分 / Risk Score: ${organRisks.heart}%</div>
                    <div class="organ-risk-details">
                        <p><strong>主要风险因素 / Main Risk Factors:</strong></p>
                        <ul>
                            ${data.systolicBP && parseFloat(data.systolicBP) >= 140 ? '<li>高血压 / Hypertension</li>' : ''}
                            ${data.cholesterol && parseFloat(data.cholesterol) >= 200 ? '<li>高胆固醇 / High cholesterol</li>' : ''}
                            ${data.ldl && parseFloat(data.ldl) >= 130 ? '<li>LDL偏高 / Elevated LDL</li>' : ''}
                            ${data.smoking === 'regular' ? '<li>吸烟 / Smoking</li>' : ''}
                            ${(() => {
                                let fastingGlucose = null;
                                if (data.fastingGlucoseMgdl) fastingGlucose = parseFloat(data.fastingGlucoseMgdl);
                                else if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
                                else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
                                return fastingGlucose && fastingGlucose >= 126 ? '<li>糖尿病 / Diabetes</li>' : '';
                            })()}
                        </ul>
                        <p><strong>建议 / Recommendations:</strong></p>
                        <p>${organRisks.heart >= 70 ? '建议立即咨询心脏科医生 / Recommend immediate cardiologist consultation' : organRisks.heart >= 40 ? '建议定期进行心脏健康检查 / Recommend regular cardiovascular health checkups' : '保持健康生活方式，定期监测 / Maintain healthy lifestyle and regular monitoring'}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Chart will be inserted here after report generation -->
        
        <div class="report-section-item">
            <h3 class="report-section-title">个人基本资料 / Personal Information</h3>
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">患者类型 / Patient Type</div>
                    <div class="report-data-value">${data.patientType === 'prediabetic' ? '糖尿病前期/边缘 / Prediabetic/Borderline' : data.patientType === 'diabetic' ? '糖尿病患者 / Diabetic Patient' : notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">姓名 / Name</div>
                    <div class="report-data-value">${data.patientName || notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">联系电话 / Contact Number</div>
                    <div class="report-data-value">${data.patientContact || notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">年龄 / Age</div>
                    <div class="report-data-value">${data.patientAge || notFilled} 岁 / years old</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">性别 / Gender</div>
                    <div class="report-data-value">${getGenderText(data.patientGender)}</div>
                </div>
                ${data.patientEmail ? `
                <div class="report-data-item">
                    <div class="report-data-label">电子邮件 / Email</div>
                    <div class="report-data-value">${data.patientEmail}</div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="report-section-item">
            <h3 class="report-section-title">BMI (身体质量指数) / Body Mass Index</h3>
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
        
        <div class="report-section-item">
            <h3 class="report-section-title">血糖值 / Blood Glucose</h3>
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">空腹血糖 / Fasting Glucose</div>
                    <div class="report-data-value">
                        ${data.fastingGlucoseMgdl ? `${data.fastingGlucoseMgdl} mg/dL` : ''}
                        ${data.fastingGlucoseMmol ? `${data.fastingGlucoseMmol} mmol/L` : ''}
                        ${!data.fastingGlucoseMgdl && !data.fastingGlucoseMmol ? notFilled : ''}
                        ${data.fastingGlucose ? getGlucoseStatus(data.fastingGlucose, 'fasting') : ''}
                    </div>
                </div>
                ${data.postprandialGlucoseMgdl || data.postprandialGlucoseMmol ? `
                <div class="report-data-item">
                    <div class="report-data-label">餐后血糖 / Postprandial Glucose</div>
                    <div class="report-data-value">
                        ${data.postprandialGlucoseMgdl ? `${data.postprandialGlucoseMgdl} mg/dL` : ''}
                        ${data.postprandialGlucoseMmol ? `${data.postprandialGlucoseMmol} mmol/L` : ''}
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
        </div>
        
        <div class="report-section-item">
            <h3 class="report-section-title">体脂率与肥胖风险 / Body Fat & Obesity Risk</h3>
            <div class="report-data-grid">
                ${data.bodyFat ? `
                <div class="report-data-item">
                    <div class="report-data-label">体脂率 / Body Fat</div>
                    <div class="report-data-value">
                        ${data.bodyFat}%
                        ${getBodyFatStatus(data.bodyFat, data.patientGender)}
                    </div>
                </div>
                ` : ''}
                ${data.waistCircumference ? `
                <div class="report-data-item">
                    <div class="report-data-label">腰围 / Waist Circumference</div>
                    <div class="report-data-value">
                        ${data.waistCircumference} cm
                        ${getWaistStatus(data.waistCircumference, data.patientGender)}
                    </div>
                </div>
                ` : ''}
                ${data.obesityRisk ? `
                <div class="report-data-item">
                    <div class="report-data-label">肥胖风险评估 / Obesity Risk Assessment</div>
                    <div class="report-data-value">${getObesityRiskText(data.obesityRisk)}</div>
                </div>
                ` : ''}
            </div>
            ${generateObesityAnalysis(data)}
        </div>
        
        <div class="report-section-item">
            <h3 class="report-section-title">血压与心脏健康 / Blood Pressure & Heart Health</h3>
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
                ${data.heartRate ? `
                <div class="report-data-item">
                    <div class="report-data-label">静息心率 / Resting Heart Rate</div>
                    <div class="report-data-value">
                        ${data.heartRate} bpm
                        ${getHeartRateStatus(data.heartRate)}
                    </div>
                </div>
                ` : ''}
                ${data.cholesterol ? `
                <div class="report-data-item">
                    <div class="report-data-label">总胆固醇 / Total Cholesterol</div>
                    <div class="report-data-value">
                        ${data.cholesterol} mg/dL
                        ${getCholesterolStatus(data.cholesterol)}
                    </div>
                </div>
                ` : ''}
                ${data.triglycerides ? `
                <div class="report-data-item">
                    <div class="report-data-label">甘油三酯 / Triglycerides (TG)</div>
                    <div class="report-data-value">
                        ${data.triglycerides} mg/dL
                        ${parseFloat(data.triglycerides) >= 200 ? '<span class="report-status status-danger">高 / High</span>' : parseFloat(data.triglycerides) >= 150 ? '<span class="report-status status-warning">偏高 / Elevated</span>' : '<span class="report-status status-normal">正常 / Normal</span>'}
                    </div>
                </div>
                ` : ''}
                ${data.ldl ? `
                <div class="report-data-item">
                    <div class="report-data-label">低密度脂蛋白 / LDL</div>
                    <div class="report-data-value">
                        ${data.ldl} mg/dL
                        ${parseFloat(data.ldl) >= 160 ? '<span class="report-status status-danger">高 / High</span>' : parseFloat(data.ldl) >= 130 ? '<span class="report-status status-warning">偏高 / Elevated</span>' : parseFloat(data.ldl) >= 100 ? '<span class="report-status status-info">接近理想 / Near Ideal</span>' : '<span class="report-status status-normal">理想 / Ideal</span>'}
                    </div>
                </div>
                ` : ''}
                ${data.hdl ? `
                <div class="report-data-item">
                    <div class="report-data-label">高密度脂蛋白 / HDL</div>
                    <div class="report-data-value">
                        ${data.hdl} mg/dL
                        ${(() => {
                            const hdl = parseFloat(data.hdl);
                            const gender = data.patientGender;
                            if ((gender === 'male' && hdl < 40) || (gender === 'female' && hdl < 50)) {
                                return '<span class="report-status status-danger">偏低 / Low</span>';
                            }
                            return '<span class="report-status status-normal">正常 / Normal</span>';
                        })()}
                    </div>
                </div>
                ` : ''}
                ${data.bpTestDate ? `
                <div class="report-data-item">
                    <div class="report-data-label">检测日期 / Test Date</div>
                    <div class="report-data-value">${data.bpTestDate}</div>
                </div>
                ` : ''}
            </div>
            ${generateBPAnalysis(data)}
        </div>
        
        <div class="report-section-item">
            <h3 class="report-section-title">生活习惯信息 / Lifestyle Information</h3>
            <div class="report-data-grid">
                <div class="report-data-item">
                    <div class="report-data-label">运动频率 / Exercise Frequency</div>
                    <div class="report-data-value">${getExerciseFrequencyText(data.exerciseFrequency)}</div>
                </div>
                ${data.exerciseType && data.exerciseType.length > 0 ? `
                <div class="report-data-item">
                    <div class="report-data-label">运动类型 / Exercise Type</div>
                    <div class="report-data-value">${data.exerciseType.join(', ')}</div>
                </div>
                ` : ''}
                <div class="report-data-item">
                    <div class="report-data-label">饮食习惯 / Diet Type</div>
                    <div class="report-data-value">${getDietTypeText(data.dietType)}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">每日用餐次数 / Meals Per Day</div>
                    <div class="report-data-value">${data.mealsPerDay || notFilled}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">睡眠品质 / Sleep Quality</div>
                    <div class="report-data-value">${getSleepQualityText(data.sleepQuality)}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">压力水平 / Stress Level</div>
                    <div class="report-data-value">${getStressLevelText(data.stressLevel)}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">吸烟习惯 / Smoking Habit</div>
                    <div class="report-data-value">${getSmokingText(data.smoking)}</div>
                </div>
                <div class="report-data-item">
                    <div class="report-data-label">饮酒习惯 / Alcohol Consumption</div>
                    <div class="report-data-value">${getAlcoholText(data.alcohol)}</div>
                </div>
            </div>
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
        
        <div class="report-section-item">
            <h3 class="report-section-title">综合建议 / Recommendations</h3>
            ${generateRecommendations(data)}
        </div>
        
        <div class="report-section-item">
            <div class="cta-section-report">
                <h3 class="cta-title">想了解更多如何预防糖尿病？ / Want to Learn More About Preventing Diabetes?</h3>
                <p class="cta-description">参加医生Chang的免费线上分享会，学习科学的血糖管理方法<br>Join Dr. Chang's free online sharing session to learn scientific blood glucose management methods</p>
                <a href="https://dreasonchang.com/dreason-253606?fbclid=IwRlRTSAPJPuxleHRuA2FlbQIxMABzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEevsPwp420ilZmtKUJL6LrHgygMGJSxhS7muBVo_o7uRXXos15YMN5D3xYMu8_aem_0hJLupGgm0gy1ROCCP1P1w" target="_blank" rel="noopener noreferrer" class="btn-register">
                    立即报名参加 / Register Now
                </a>
            </div>
        </div>
    `;
    
    reportContent.innerHTML = html;
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

