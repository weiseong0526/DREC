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
        // Update question numbers for prediabetic (7-9: hypertension/cholesterol, smoking, alcohol)
        const prediabeticBlock = document.querySelector('.conditional-prediabetic');
        updateQuestionNumbers(['prediabetic_hypertension_cholesterol', 'smoking', 'alcohol'], 7, prediabeticBlock);
    } else if (patientType === 'diabetic') {
        diabeticFields.forEach(field => {
            field.classList.add('show');
            field.style.display = 'block'; // Force display
        });
        prediabeticFields.forEach(field => {
            field.classList.remove('show');
            field.style.display = 'none'; // Force hide
        });
        // Update question numbers for diabetic (12-13: smoking, alcohol only) — scope to diabetic block only
        const diabeticBlock = document.querySelector('.conditional-diabetic');
        updateQuestionNumbers(['smoking', 'alcohol'], 12, diabeticBlock);
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

// Update question numbers dynamically (scope = optional container to search within, e.g. .conditional-diabetic)
function updateQuestionNumbers(fieldNames, startNumber, scope) {
    const root = scope || document;
    fieldNames.forEach((fieldName, index) => {
        const field = root.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
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

        var declarationAgree = document.getElementById('declarationAgree');
        var declarationError = document.getElementById('declarationError');
        if (declarationError) declarationError.textContent = '';
        if (!declarationAgree || !declarationAgree.checked) {
            if (declarationError) declarationError.textContent = '请先勾选上方声明后再提交。Please check the declaration above to continue.';
            if (declarationAgree) declarationAgree.focus();
            return;
        }

        // All fields are optional - no validation needed
        // Collect form data
        const formData = collectFormData();
        
        // 糖尿病前期/糖尿病患者风险评估 — 写入后台列表
        if (formData.patientType === 'prediabetic') {
            formData.riskScore = calculatePrediabeticRiskScore(formData);
            formData.riskLevel = getPrediabeticRiskLevel(formData.riskScore).text;
        } else if (formData.patientType === 'diabetic') {
            formData.riskScore = calculateDiabeticRiskScore(formData);
            formData.riskLevel = getDiabeticRiskLevel(formData.riskScore).text;
        }
        
        // Save to backend (XAMPP database) — only when opened via http(s), not file://
        var apiBase = (function() {
            var loc = window.location;
            if (loc.protocol === 'file:') return null;
            return loc.origin + loc.pathname.replace(/\/[^/]*$/, '/');
        })();
        if (apiBase) {
            fetch(apiBase + 'api/save_submission.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(function(r) {
                    return r.text().then(function(text) {
                        var j = {};
                        try { j = JSON.parse(text); } catch (e) { j = { error: 'Invalid response', message: text.slice(0, 200) }; }
                        return { ok: r.ok, status: r.status, json: j };
                    });
                })
                .then(function(result) {
                    if (!result.ok && window.console && console.warn) {
                        console.warn('CGM save_submission:', result.status, result.json);
                        if (result.json && result.json.message) {
                            console.warn('CGM save_submission error message:', result.json.message);
                        }
                    }
                })
                .catch(function(err) {
                    if (window.console && console.warn) console.warn('CGM save_submission network/parse error:', err);
                });
        }
        
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
    data.prediabetic_hypertension_cholesterol = formData.get('prediabetic_hypertension_cholesterol');
    
    // Diabetic patient specific fields
    data.diabetic_blurred_vision = formData.get('diabetic_blurred_vision');
    data.diabetic_night_vision = formData.get('diabetic_night_vision');
    data.diabetic_visual_spots = formData.get('diabetic_visual_spots');
    data.diabetic_foamy_urine = formData.get('diabetic_foamy_urine');
    data.diabetic_frequent_urination = formData.get('diabetic_frequent_urination');
    data.diabetic_edema = formData.get('diabetic_edema');
    data.diabetic_numbness = formData.get('diabetic_numbness');
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
    
    // Additional health metrics (if available in form)
    data.cholesterol = formData.get('cholesterol');
    data.waistCircumference = formData.get('waistCircumference');
    data.bodyFat = formData.get('bodyFat');
    data.exerciseFrequency = formData.get('exerciseFrequency');
    
    // Map waist_exceeded to waistCircumference if actual value not provided
    if (!data.waistCircumference && data.waist_exceeded) {
        // Use estimated values based on gender if waist exceeded
        if (data.waist_exceeded === 'yes' || data.waist_exceeded === 'unsure') {
            data.waistCircumference = data.patientGender === 'male' ? '95' : '85'; // Slightly above threshold
        }
    }
    
    // Map regular_exercise_150min to exerciseFrequency if not provided
    if (!data.exerciseFrequency && data.regular_exercise_150min) {
        data.exerciseFrequency = data.regular_exercise_150min === 'yes' ? 'moderate' : 'none';
    }
    
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
    
    // 4. 是否有手脚麻痹或者刺痛？
    if (data.diabetic_numbness === 'yes') {
        score += 1;
    }
    
    // 5. 是否容易气喘、胸口闷痛？
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

// Get effective HbA1c numeric value (for diabetic form: diabetic_recent_hba1c → approximate %)
function getEffectiveHba1c(data) {
    if (data.hba1c) return parseFloat(data.hba1c);
    if (data.patientType === 'diabetic' && data.diabetic_recent_hba1c) {
        const map = { normal: 6, moderate: 6.65, high: 7.5 };
        return map[data.diabetic_recent_hba1c] || 6;
    }
    return null;
}

// Calculate organ-specific risks (diabetic complications: 眼睛, 心脏, 肾脏, 中风, 神经)
function calculateOrganRisks(data) {
    const risks = {
        eyes: 0,      // 眼睛 / Eyes (Retinopathy) — 血糖, 血压, 年龄, 眼睛相关
        kidneys: 0,   // 肾脏 / Kidneys (Nephropathy) — 年龄, 血糖, 血压, 吸烟, BMI, 尿, 水肿
        stroke: 0,    // 中风 / Stroke — 年龄(女), BMI, 血糖, 血压, 喘, 吸烟喝酒, 手脚麻痹
        heart: 0,     // 心脏 / Heart — 年龄(男), BMI, 血糖, 血压, 喘, 吸烟喝酒, 脚酸痛, 心脏病史, 水肿
        nerves: 0     // 神经 / Nerves (Neuropathy) — 年龄, 血糖, BMI, 吸烟, 手脚麻痹
    };
    
    let fastingGlucose = null;
    if (data.fastingGlucoseMmol) fastingGlucose = parseFloat(data.fastingGlucoseMmol) * 18.0182;
    else if (data.fastingGlucose) fastingGlucose = parseFloat(data.fastingGlucose);
    
    const hba1c = getEffectiveHba1c(data);
    const age = parseInt(data.patientAge, 10) || 50;
    const isMale = data.patientGender === 'male';
    const systolic = data.systolicBP ? parseFloat(data.systolicBP) : null;
    const diastolic = data.diastolicBP ? parseFloat(data.diastolicBP) : null;
    const bmi = data.bmi ? parseFloat(data.bmi) : null;
    
    // —— 眼睛 Eyes: 血糖, 血压, 年龄, 眼睛相关 ——
    let eyesScore = 0;
    if (hba1c) {
        if (hba1c >= 7.5) eyesScore += 35;
        else if (hba1c >= 7.0) eyesScore += 25;
        else if (hba1c >= 6.5) eyesScore += 15;
    }
    if (fastingGlucose) {
        if (fastingGlucose >= 200) eyesScore += 30;
        else if (fastingGlucose >= 140) eyesScore += 20;
        else if (fastingGlucose >= 126) eyesScore += 10;
    }
    if (systolic >= 140) eyesScore += 20;
    if (diastolic >= 90) eyesScore += 15;
    if (age >= 60) eyesScore += 15;
    else if (age >= 50) eyesScore += 10;
    else if (age >= 40) eyesScore += 5;
    if (data.patientType === 'diabetic') {
        if (data.diabetic_blurred_vision === 'yes' || data.diabetic_night_vision === 'yes' || data.diabetic_visual_spots === 'yes') eyesScore += 25;
    }
    risks.eyes = Math.min(eyesScore, 100);
    
    // —— 心脏 Heart: 年龄(男), BMI, 血糖, 血压, 喘, 吸烟喝酒, 脚酸痛, 心脏病史, 水肿 ——
    let heartScore = 0;
    if (isMale) {
        if (age >= 60) heartScore += 15;
        else if (age >= 50) heartScore += 10;
        else if (age >= 40) heartScore += 5;
    }
    if (bmi) {
        if (bmi >= 30) heartScore += 18;
        else if (bmi >= 25) heartScore += 10;
    }
    if (hba1c && hba1c >= 7.0) heartScore += 15;
    if (fastingGlucose && fastingGlucose >= 126) heartScore += 12;
    if (systolic >= 140) heartScore += 20;
    else if (systolic >= 130) heartScore += 12;
    if (diastolic >= 90) heartScore += 15;
    else if (diastolic >= 80) heartScore += 8;
    if (data.diabetic_shortness_breath === 'yes') heartScore += 15;
    if (data.smoking === 'regular') heartScore += 20;
    else if (data.smoking === 'occasional') heartScore += 10;
    if (data.alcohol === 'frequent' || data.alcohol === 'regular') heartScore += 10;
    else if (data.alcohol === 'moderate') heartScore += 5;
    if (data.diabetic_foot_pain === 'yes') heartScore += 12;
    if (data.diabetic_cardiovascular_history === 'yes') heartScore += 25;
    if (data.diabetic_edema === 'yes') heartScore += 12;
    risks.heart = Math.min(heartScore, 100);
    
    // —— 肾脏 Kidneys: 年龄, 血糖, 血压, 吸烟, BMI, 尿, 水肿 ——
    let kidneysScore = 0;
    if (age >= 60) kidneysScore += 12;
    else if (age >= 50) kidneysScore += 6;
    if (hba1c && hba1c >= 7.0) kidneysScore += 18;
    if (fastingGlucose && fastingGlucose >= 126) kidneysScore += 10;
    if (systolic >= 140) kidneysScore += 20;
    if (diastolic >= 90) kidneysScore += 15;
    if (data.smoking === 'regular') kidneysScore += 15;
    else if (data.smoking === 'occasional') kidneysScore += 8;
    if (bmi && bmi >= 30) kidneysScore += 10;
    if (data.diabetic_foamy_urine === 'yes' || data.diabetic_frequent_urination === 'yes') kidneysScore += 20;
    if (data.diabetic_edema === 'yes') kidneysScore += 15;
    risks.kidneys = Math.min(kidneysScore, 100);
    
    // —— 中风 Stroke: 年龄(女), BMI, 血糖, 血压, 喘, 吸烟喝酒, 手脚麻痹 ——
    let strokeScore = 0;
    if (!isMale) {
        if (age >= 60) strokeScore += 15;
        else if (age >= 50) strokeScore += 10;
        else if (age >= 40) strokeScore += 5;
    }
    if (bmi && bmi >= 30) strokeScore += 15;
    else if (bmi && bmi >= 25) strokeScore += 8;
    if (hba1c && hba1c >= 7.0) strokeScore += 15;
    if (fastingGlucose && fastingGlucose >= 126) strokeScore += 10;
    if (systolic >= 140) strokeScore += 20;
    if (diastolic >= 90) strokeScore += 12;
    if (data.diabetic_shortness_breath === 'yes') strokeScore += 15;
    if (data.smoking === 'regular') strokeScore += 18;
    else if (data.smoking === 'occasional') strokeScore += 10;
    if (data.alcohol === 'frequent' || data.alcohol === 'regular') strokeScore += 10;
    else if (data.alcohol === 'moderate') strokeScore += 5;
    if (data.diabetic_numbness === 'yes') strokeScore += 20;
    risks.stroke = Math.min(strokeScore, 100);
    
    // —— 神经 Nerves (Neuropathy): 年龄, 血糖, BMI, 吸烟, 手脚麻痹 ——
    let nervesScore = 0;
    if (age >= 60) nervesScore += 12;
    else if (age >= 50) nervesScore += 6;
    if (hba1c && hba1c >= 7.5) nervesScore += 25;
    else if (hba1c && hba1c >= 7.0) nervesScore += 18;
    else if (hba1c && hba1c >= 6.5) nervesScore += 10;
    if (fastingGlucose && fastingGlucose >= 140) nervesScore += 15;
    if (bmi && bmi >= 30) nervesScore += 10;
    if (data.smoking === 'regular') nervesScore += 15;
    else if (data.smoking === 'occasional') nervesScore += 8;
    if (data.diabetic_numbness === 'yes') nervesScore += 30;
    risks.nerves = Math.min(nervesScore, 100);
    
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
    
    // Calculate organ-specific risks (眼睛, 心脏, 肾脏, 中风, 神经)
    const organRisks = calculateOrganRisks(data);
    const highestRisk = Math.max(organRisks.eyes, organRisks.kidneys, organRisks.stroke, organRisks.heart, organRisks.nerves);
    
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
        
        <!-- Risk Assessment Chart - Page 2 -->
        <div class="chart-container" id="chartContainer" style="display: block;">
            <div class="chart-wrapper">
                <div class="chart-page-title">
                    <div class="chart-page-title-cn">健康风险评估图表</div>
                    <div class="chart-page-title-en">Health Risk Assessment Chart</div>
                </div>
                <!-- Main content with risk cards -->
                <div class="chart-main-content">
                    <!-- Risk info cards -->
                    <div class="chart-legend" id="chartLegend"></div>
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
                    <div class="connection-point" data-organ="stroke" style="position: absolute; top: 12%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="heart" style="position: absolute; top: 38%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="kidneys" style="position: absolute; top: 63%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                    <div class="connection-point" data-organ="nerves" style="position: absolute; top: 85%; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; opacity: 0; pointer-events: none;"></div>
                </div>
                
                <!-- Organ Cards Around Body -->
                <div class="organ-cards-layout">
                    <!-- Eyes Card (Top Left) -->
                    <div class="organ-card-positioned organ-card-top-left" data-organ="eyes">
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.eyes}%</div>
                        <div class="organ-card-icon">👁️</div>
                        <h4 class="organ-card-title">眼睛 / Eyes</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.eyes).class}">
                            ${getRiskLevel(organRisks.eyes).text}
                        </div>
                    </div>
                    
                    <!-- Stroke Card (Top Right) — 年龄(女), BMI, 血糖, 血压, 喘, 吸烟喝酒, 手脚麻痹 -->
                    <div class="organ-card-positioned organ-card-top-right" data-organ="stroke">
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.stroke}%</div>
                        <div class="organ-card-icon">🫀</div>
                        <h4 class="organ-card-title">中风 / Stroke</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.stroke).class}">
                            ${getRiskLevel(organRisks.stroke).text}
                        </div>
                    </div>
                    
                    <!-- Heart Card (Middle Right) — 年龄(男), BMI, 血糖, 血压, 喘, 吸烟喝酒, 脚酸痛, 心脏病史, 水肿 -->
                    <div class="organ-card-positioned organ-card-middle-right" data-organ="heart">
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.heart}%</div>
                        <div class="organ-card-icon">❤️</div>
                        <h4 class="organ-card-title">心脏 / Heart</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.heart).class}">
                            ${getRiskLevel(organRisks.heart).text}
                        </div>
                    </div>
                    
                    <!-- Kidneys Card (Middle Left) — 年龄, 血糖, 血压, 吸烟, BMI, 尿, 水肿 -->
                    <div class="organ-card-positioned organ-card-middle-left" data-organ="kidneys">
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.kidneys}%</div>
                        <div class="organ-card-icon">🫘</div>
                        <h4 class="organ-card-title">肾脏 / Kidneys</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.kidneys).class}">
                            ${getRiskLevel(organRisks.kidneys).text}
                        </div>
                    </div>
                    
                    <!-- Nerves Card (Bottom Right) — 年龄, 血糖, BMI, 吸烟, 手脚麻痹 -->
                    <div class="organ-card-positioned organ-card-bottom-right" data-organ="nerves">
                        <div class="organ-card-score">风险评分 / Risk Score: ${organRisks.nerves}%</div>
                        <div class="organ-card-icon">🧠</div>
                        <h4 class="organ-card-title">神经 / Nerves</h4>
                        <div class="organ-card-status ${getRiskLevel(organRisks.nerves).class}">
                            ${getRiskLevel(organRisks.nerves).text}
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
                        ${(() => {
                            // Check both mmol/L and mg/dL values to ensure low glucose is detected
                            if (data.fastingGlucoseMmol) {
                                const glucoseMmol = parseFloat(data.fastingGlucoseMmol);
                                // Convert to mg/dL for status check, or check mmol/L directly (3.9 mmol/L = 70 mg/dL)
                                const glucoseMgdl = glucoseMmol * 18.0182;
                                return getGlucoseStatus(glucoseMgdl, 'fasting');
                            } else if (data.fastingGlucose) {
                                return getGlucoseStatus(data.fastingGlucose, 'fasting');
                            }
                            return '';
                        })()}
                    </div>
                </div>
                ${data.postprandialGlucoseMmol ? `
                <div class="report-data-item">
                    <div class="report-data-label">餐后血糖 / Postprandial Glucose</div>
                    <div class="report-data-value">
                        ${data.postprandialGlucoseMmol} mmol/L
                        ${(() => {
                            // Check mmol/L value and convert for status check
                            if (data.postprandialGlucoseMmol) {
                                const glucoseMmol = parseFloat(data.postprandialGlucoseMmol);
                                const glucoseMgdl = glucoseMmol * 18.0182;
                                return getGlucoseStatus(glucoseMgdl, 'postprandial');
                            } else if (data.postprandialGlucose) {
                                return getGlucoseStatus(data.postprandialGlucose, 'postprandial');
                            }
                            return '';
                        })()}
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
            ${data.patientType === 'diabetic' ? `
            <div class="risk-index-widget">
                <div class="risk-index-header">
                    <span class="risk-index-header-label">Current Assessment:</span>
                    <span class="risk-index-current risk-index-${riskLevel.level}">${(riskLevel.text || '').split(' / ')[1] || riskLevel.text}</span>
                    <div class="risk-index-current-cn">${(riskLevel.text || '').split(' / ')[0] || ''}</div>
                </div>
                <div class="risk-index-bar" aria-label="Risk index bar">
                    <div class="risk-index-seg risk-index-seg-low"></div>
                    <div class="risk-index-seg risk-index-seg-moderate"></div>
                    <div class="risk-index-seg risk-index-seg-high"></div>
                    <div class="risk-index-seg risk-index-seg-very-high"></div>
                    <div class="risk-index-marker" style="left: ${(() => {
                        const map = { low: 12.5, moderate: 37.5, high: 62.5, 'very-high': 87.5 };
                        return map[riskLevel.level] ?? 37.5;
                    })()}%;" title="${riskLevel.text || ''}">
                        <div class="risk-index-marker-badge">↑ 指向：${(riskLevel.text || '').split(' / ')[0] || riskLevel.level}（${(riskLevel.text || '').split(' / ')[1] || riskLevel.level}）</div>
                        <div class="risk-index-marker-triangle"></div>
                    </div>
                </div>
                <div class="risk-index-legend">
                    <div class="risk-index-legend-item"><span class="dot dot-low"></span>Low</div>
                    <div class="risk-index-legend-item"><span class="dot dot-moderate"></span>Moderate</div>
                    <div class="risk-index-legend-item"><span class="dot dot-high"></span>High</div>
                    <div class="risk-index-legend-item"><span class="dot dot-very-high"></span>Very High</div>
                </div>
            </div>
            ` : `
            <div class="report-data-grid">
                <div class="report-data-item" style="grid-column: 1 / -1; text-align: center; padding: 18px;">
                    <div style="font-size: 30px; font-weight: bold; color: var(--primary-color); margin-bottom: 10px;">
                        ${riskScore} 分 / ${data.patientType === 'prediabetic' ? 12 : 19} Points
                    </div>
                    <div class="report-status ${riskLevel.class}" style="font-size: 16px; padding: 10px 18px; display: inline-block;">
                        ${riskLevel.text}
                    </div>
                </div>
            </div>
            `}
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
                ${data.family_diabetes ? `
                <div class="report-data-item">
                    <div class="report-data-label">家族糖尿病史 / Family Diabetes History</div>
                    <div class="report-data-value">${data.family_diabetes === 'yes' ? '有 / Yes' : '没有 / No'}</div>
            </div>
                ` : ''}
                ${data.sugary_foods ? `
                <div class="report-data-item">
                    <div class="report-data-label">含糖食物/饮料摄入 / Sugary Foods/Drinks Consumption</div>
                    <div class="report-data-value">${getSugaryFoodsText(data.sugary_foods)}</div>
                </div>
                ` : ''}
                ${data.waist_exceeded ? `
                <div class="report-data-item">
                    <div class="report-data-label">腰围是否超标 / Waist Circumference Exceeded</div>
                    <div class="report-data-value">${getWaistExceededText(data.waist_exceeded)}</div>
                </div>
                ` : ''}
                ${data.waistCircumference ? `
                <div class="report-data-item">
                    <div class="report-data-label">腰围 / Waist Circumference</div>
                    <div class="report-data-value">${data.waistCircumference} cm</div>
                </div>
                ` : ''}
                ${data.regular_exercise_150min ? `
                <div class="report-data-item">
                    <div class="report-data-label">每周规律运动 ≥150分钟 / Regular Exercise ≥150 min/week</div>
                    <div class="report-data-value">${data.regular_exercise_150min === 'yes' ? '是 / Yes' : '否 / No'}</div>
                </div>
                ` : ''}
                ${data.bodyFat ? `
                <div class="report-data-item">
                    <div class="report-data-label">体脂率 / Body Fat Percentage</div>
                    <div class="report-data-value">${data.bodyFat}%</div>
                </div>
                ` : ''}
                ${data.cholesterol ? `
                <div class="report-data-item">
                    <div class="report-data-label">总胆固醇 / Total Cholesterol</div>
                    <div class="report-data-value">${data.cholesterol} mg/dL</div>
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
    
    // Generate chart immediately after report is generated (chart is now page 2)
    setTimeout(() => {
        generateRiskChart(data);
    }, 200);
}

// Draw dashed connection lines from cards to body organs
function drawConnectionLines() {
    const layout = document.querySelector('.human-body-visualization-layout');
    if (!layout) return;
    
    const svg = layout.querySelector('.connection-lines');
    if (!svg) return;
    
    // Get card positions (眼睛, 中风, 心脏, 肾脏, 神经)
    const eyesCard = layout.querySelector('[data-organ="eyes"]');
    const strokeCard = layout.querySelector('[data-organ="stroke"]');
    const heartCard = layout.querySelector('[data-organ="heart"]');
    const kidneysCard = layout.querySelector('[data-organ="kidneys"]');
    const nervesCard = layout.querySelector('[data-organ="nerves"]');
    
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
        { card: strokeCard, organ: 'stroke', name: 'Stroke' },
        { card: heartCard, organ: 'heart', name: 'Heart' },
        { card: kidneysCard, organ: 'kidneys', name: 'Kidneys' },
        { card: nervesCard, organ: 'nerves', name: 'Nerves' }
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
        if (glucose < 70) return `<span class="report-status status-warning">血糖低 / Low Blood Glucose (Hypoglycemia)</span>`;
        if (glucose <= 100) return `<span class="report-status status-normal">正常 / Normal</span>`;
        if (glucose <= 125) return `<span class="report-status status-warning">偏高 (糖尿病前期) / High (Prediabetes)</span>`;
        return `<span class="report-status status-danger">高 (可能糖尿病) / High (Possible Diabetes)</span>`;
    } else {
        // Postprandial glucose (2-hour after meal)
        if (glucose < 80) return `<span class="report-status status-warning">血糖低 / Low Blood Glucose (Hypoglycemia)</span>`;
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

function getSugaryFoodsText(sugaryFoods) {
    const map = {
        'almost_daily': '几乎每天都喝 / Almost daily',
        'occasional': '偶尔喝 / Occasional',
        'rarely': '几乎不喝 / Rarely'
    };
    return map[sugaryFoods] || '未填写 / Not filled';
}

function getWaistExceededText(waistExceeded) {
    const map = {
        'yes': '有 / Yes',
        'no': '没有 / No',
        'unsure': '不清楚，可能有 / Unsure, possibly'
    };
    return map[waistExceeded] || '未填写 / Not filled';
}

// Generate BMI Gauge Visualization - Redesigned
function generateBMIGauge(bmi, age) {
    if (!bmi) return '';
    const bmiNum = parseFloat(bmi);
    
    // BMI ranges matching the image:
    // Underweight: < 18.5 (blue)
    // Normal: 18.5 – 24.9 (green)
    // Overweight: 25.0 – 29.9 (yellow)
    // Obese: 30.0 – 34.9 (orange)
    // Extremely Obese: ≥ 35.0 (red)
    
    // Determine category
    let category = '';
    let categoryEn = '';
    let categoryColor = '#F44336';
    if (bmiNum < 18.5) {
        category = '体重过轻';
        categoryEn = 'Underweight';
        categoryColor = '#2196F3';
    } else if (bmiNum < 25.0) {
        category = '正常';
        categoryEn = 'Normal';
        categoryColor = '#4CAF50';
    } else if (bmiNum < 30.0) {
        category = '体重过重';
        categoryEn = 'Overweight';
        categoryColor = '#FFC107';
    } else if (bmiNum < 35.0) {
        category = '肥胖';
        categoryEn = 'Obese';
        categoryColor = '#FF9800';
    } else {
        category = '极度肥胖';
        categoryEn = 'Extremely Obese';
        categoryColor = '#F44336';
    }
    
    // Calculate position on horizontal bar (BMI range: 15-45)
    const minBMI = 15;
    const maxBMI = 45;
    const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, bmiNum));
    const positionPercent = ((normalizedBMI - minBMI) / (maxBMI - minBMI)) * 100;
    
    // Calculate segment widths (based on BMI ranges)
    const segment1Width = ((18.5 - minBMI) / (maxBMI - minBMI)) * 100; // Underweight
    const segment2Width = ((25.0 - 18.5) / (maxBMI - minBMI)) * 100; // Normal
    const segment3Width = ((30.0 - 25.0) / (maxBMI - minBMI)) * 100; // Overweight
    const segment4Width = ((35.0 - 30.0) / (maxBMI - minBMI)) * 100; // Obese
    const segment5Width = ((maxBMI - 35.0) / (maxBMI - minBMI)) * 100; // Extremely Obese
    
    
    // Create horizontal bar gauge HTML matching the image design
    const gaugeHTML = `
        <div class="bmi-gauge-container" style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div class="bmi-gauge-header" style="margin-bottom: 20px;">
                <div style="font-size: 0.95rem; color: #666; margin-bottom: 15px;">
                    <span>Current Assessment:</span>
                    <span style="font-size: 2rem; font-weight: 700; color: ${categoryColor}; margin-left: 10px;">${categoryEn}</span>
            </div>
            </div>
            
            <div class="bmi-bar-container" style="position: relative; margin: 40px 0 60px 0;">
                <!-- Horizontal bar with 5 segments -->
                <div style="display: flex; width: 100%; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                    <!-- Segment 1: Underweight (Blue) -->
                    <div style="width: ${segment1Width}%; background: #2196F3; height: 100%;"></div>
                    <!-- Segment 2: Normal (Green) -->
                    <div style="width: ${segment2Width}%; background: #4CAF50; height: 100%;"></div>
                    <!-- Segment 3: Overweight (Yellow) -->
                    <div style="width: ${segment3Width}%; background: #FFC107; height: 100%;"></div>
                    <!-- Segment 4: Obese (Orange) -->
                    <div style="width: ${segment4Width}%; background: #FF9800; height: 100%;"></div>
                    <!-- Segment 5: Extremely Obese (Red) -->
                    <div style="width: ${segment5Width}%; background: #F44336; height: 100%;"></div>
                </div>
                
                <!-- Position indicator (您的位置) -->
                <div style="position: absolute; top: -35px; left: ${positionPercent}%; transform: translateX(-50%); text-align: center;">
                    <div style="background: #000; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; margin-bottom: 4px;">
                        您的位置
                    </div>
                    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid ${categoryColor}; margin: 0 auto;"></div>
                </div>
            </div>
            
            <!-- Category labels with colored dots -->
            <div class="bmi-category-labels" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-top: 20px;">
                <div style="text-align: center;">
                    <div style="width: 12px; height: 12px; background: #2196F3; border-radius: 50%; margin: 0 auto 6px;"></div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 4px;">Underweight</div>
                    <div style="font-size: 0.75rem; color: #666;">&lt; 18.5</div>
                </div>
                <div style="text-align: center;">
                    <div style="width: 12px; height: 12px; background: #4CAF50; border-radius: 50%; margin: 0 auto 6px;"></div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 4px;">Normal</div>
                    <div style="font-size: 0.75rem; color: #666;">18.5 - 24.9</div>
                </div>
                <div style="text-align: center;">
                    <div style="width: 12px; height: 12px; background: #FFC107; border-radius: 50%; margin: 0 auto 6px;"></div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 4px;">Overweight</div>
                    <div style="font-size: 0.75rem; color: #666;">25 - 29.9</div>
                </div>
                <div style="text-align: center;">
                    <div style="width: 12px; height: 12px; background: #FF9800; border-radius: 50%; margin: 0 auto 6px;"></div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 4px;">Obese</div>
                    <div style="font-size: 0.75rem; color: #666;">30 - 34.9</div>
                </div>
                <div style="text-align: center;">
                    <div style="width: 12px; height: 12px; background: #F44336; border-radius: 50%; margin: 0 auto 6px;"></div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 4px;">Extremely Obese</div>
                    <div style="font-size: 0.75rem; color: #666;">&gt; 35.0</div>
                </div>
            </div>
            
            <div class="bmi-gauge-info" style="margin-top: 25px; text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 1.1rem; margin: 5px 0;"><strong>BMI = ${bmiNum.toFixed(1)} kg/m²</strong></p>
                <p style="font-size: 0.95rem; color: #666; margin: 5px 0;">${category} / ${categoryEn}</p>
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
    // Chart container is now inside reportContent, will be hidden when reportContent is hidden
    // document.getElementById('chartContainer').style.display = 'none';
}

// Calculate health risks
function calculateHealthRisks(data) {
    const risks = {
        diabetes: 0,
        hypertension: 0,
        cardiovascular: 0,
        obesity: 0,
        metabolic: 0,
        lowValues: 0,
        healthy: 0,
        bmiStatus: null
    };
    
    // Get age once for use throughout the function
    const ageNum = parseInt(data.patientAge) || 25;
    
    // Diabetes Risk Calculation - based on actual form data
    let diabetesScore = 0;
    
    // Fasting Glucose (primary indicator)
    if (data.fastingGlucose) {
        const glucose = parseFloat(data.fastingGlucose);
        if (glucose >= 126) diabetesScore += 40; // Diabetes threshold (7.0 mmol/L)
        else if (glucose >= 100) diabetesScore += 25; // Prediabetes threshold (5.6 mmol/L)
        else if (glucose < 70) diabetesScore += 15; // Hypoglycemia risk (increased from 10)
    }
    
    // HbA1c (glycated hemoglobin - 3-month average)
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 6.5) diabetesScore += 30; // Diabetes threshold
        else if (hba1c >= 5.7) diabetesScore += 20; // Prediabetes threshold
    }
    
    // Postprandial Glucose (2-hour after meal)
    if (data.postprandialGlucose) {
        const pp = parseFloat(data.postprandialGlucose);
        if (pp >= 200) diabetesScore += 20; // Diabetes threshold (11.1 mmol/L)
        else if (pp >= 140) diabetesScore += 15; // Prediabetes threshold (7.8 mmol/L)
    }
    
    // BMI (obesity increases diabetes risk)
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmi >= 30) diabetesScore += 15; // Obesity
        else if (bmi >= ranges.normal) diabetesScore += 10; // Overweight
    }
    
    // Exercise frequency (sedentary lifestyle increases risk)
    if (data.exerciseFrequency === 'none' || data.exerciseFrequency === 'light') {
        diabetesScore += 10;
    } else if (data.regular_exercise_150min === 'no') {
        diabetesScore += 10; // Use alternative field if exerciseFrequency not available
    }
    
    // Stress level (chronic stress affects glucose metabolism)
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        diabetesScore += 5;
    }
    
    // Family history (if available)
    if (data.family_diabetes === 'yes') {
        diabetesScore += 5;
    }
    
    // Sugary foods consumption (increases diabetes risk)
    if (data.sugary_foods === 'almost_daily') {
        diabetesScore += 10; // Almost daily consumption
    } else if (data.sugary_foods === 'occasional') {
        diabetesScore += 5; // Occasional consumption
    }
    
    // Meals per day (irregular eating patterns affect glucose control)
    if (data.mealsPerDay === '1-2') {
        diabetesScore += 5; // Too few meals can cause glucose spikes
    } else if (data.mealsPerDay === '6+') {
        diabetesScore += 3; // Too many meals may indicate poor portion control
    }
    
    // Sleep quality (poor sleep affects glucose metabolism)
    if (data.sleepQuality === 'poor') {
        diabetesScore += 8; // Poor sleep significantly affects glucose
    } else if (data.sleepQuality === 'fair') {
        diabetesScore += 4; // Fair sleep has moderate impact
    }
    
    // Alcohol consumption (excessive alcohol affects glucose)
    if (data.alcohol === 'frequent') {
        diabetesScore += 5; // Frequent alcohol consumption
    } else if (data.alcohol === 'moderate') {
        diabetesScore += 2; // Moderate consumption
    }
    
    risks.diabetes = Math.min(diabetesScore, 100);
    
    // Hypertension Risk Calculation - based on actual form data
    let hypertensionScore = 0;
    
    // Systolic Blood Pressure (primary indicator)
    if (data.systolicBP) {
        const systolic = parseFloat(data.systolicBP);
        if (systolic >= 140) hypertensionScore += 40; // Stage 2 Hypertension
        else if (systolic >= 130) hypertensionScore += 25; // Stage 1 Hypertension
        else if (systolic >= 120) hypertensionScore += 15; // Elevated BP
        else if (systolic < 90) hypertensionScore += 10; // Low blood pressure (hypotension)
    }
    
    // Diastolic Blood Pressure (primary indicator)
    if (data.diastolicBP) {
        const diastolic = parseFloat(data.diastolicBP);
        if (diastolic >= 90) hypertensionScore += 30; // Stage 2 Hypertension
        else if (diastolic >= 80) hypertensionScore += 20; // Stage 1 Hypertension
        else if (diastolic < 60) hypertensionScore += 10; // Low blood pressure (hypotension)
    }
    
    // BMI (obesity increases hypertension risk, underweight also a concern)
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ranges = getBMIRangesByAge(ageNum);
        if (bmi >= ranges.normal) {
            hypertensionScore += 15; // Overweight/obesity
        } else if (bmi < ranges.underweight) {
            hypertensionScore += 5; // Underweight may indicate nutritional issues
        }
    }
    
    // Smoking (increases blood pressure)
    if (data.smoking === 'regular' || data.smoking === 'occasional') {
        hypertensionScore += 10;
    }
    
    // Stress level (chronic stress increases BP)
    if (data.stressLevel === 'high' || data.stressLevel === 'very-high') {
        hypertensionScore += 10;
    }
    
    // Sleep quality (poor sleep increases blood pressure)
    if (data.sleepQuality === 'poor') {
        hypertensionScore += 8; // Poor sleep significantly affects BP
    } else if (data.sleepQuality === 'fair') {
        hypertensionScore += 4; // Fair sleep has moderate impact
    }
    
    // Alcohol consumption (excessive alcohol increases BP)
    if (data.alcohol === 'frequent') {
        hypertensionScore += 8; // Frequent alcohol consumption
    } else if (data.alcohol === 'moderate') {
        hypertensionScore += 4; // Moderate consumption
    }
    
    // Age (older age increases risk, but we use patientAge if available)
    if (ageNum >= 65) {
        hypertensionScore += 5;
    } else if (ageNum >= 45) {
        hypertensionScore += 3;
    }
    
    risks.hypertension = Math.min(hypertensionScore, 100);
    
    // Cardiovascular Risk Calculation - based on actual form data
    let cardiovascularScore = 0;
    
    // High Blood Pressure (major risk factor)
    if (data.systolicBP && parseFloat(data.systolicBP) >= 140) {
        cardiovascularScore += 25;
    } else if (data.systolicBP && parseFloat(data.systolicBP) >= 130) {
        cardiovascularScore += 15;
    } else if (data.systolicBP && parseFloat(data.systolicBP) < 90) {
        cardiovascularScore += 8; // Low blood pressure may indicate heart issues
    }
    if (data.diastolicBP && parseFloat(data.diastolicBP) >= 90) {
        cardiovascularScore += 15;
    } else if (data.diastolicBP && parseFloat(data.diastolicBP) < 60) {
        cardiovascularScore += 8; // Low diastolic BP
    }
    
    // High Cholesterol (if available)
    if (data.cholesterol) {
        const chol = parseFloat(data.cholesterol);
        if (chol >= 240) cardiovascularScore += 25; // High cholesterol
        else if (chol >= 200) cardiovascularScore += 15; // Borderline high
        else if (chol < 120) cardiovascularScore += 3; // Very low cholesterol (rare, but may need attention)
    }
    
    // BMI/Obesity (increases cardiovascular risk)
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        if (bmi >= 30) {
            cardiovascularScore += 20; // Obesity
        } else {
            const ranges = getBMIRangesByAge(ageNum);
            if (bmi >= ranges.normal) {
                cardiovascularScore += 10; // Overweight
            }
        }
    }
    
    // Smoking (major risk factor)
    if (data.smoking === 'regular') {
        cardiovascularScore += 20;
    } else if (data.smoking === 'occasional') {
        cardiovascularScore += 10;
    }
    
    // Sedentary lifestyle
    if (data.exerciseFrequency === 'none') {
        cardiovascularScore += 15;
    } else if (data.regular_exercise_150min === 'no') {
        cardiovascularScore += 15; // Use alternative field
    }
    
    // Diabetes (if present, increases cardiovascular risk)
    if (risks.diabetes >= 50) {
        cardiovascularScore += 15;
    }
    
    // Age (older age increases risk)
    if (ageNum >= 65) {
        cardiovascularScore += 10;
    } else if (ageNum >= 45) {
        cardiovascularScore += 5;
    }
    
    // Male gender (higher CVD risk)
    if (data.patientGender === 'male') {
        cardiovascularScore += 8;
    }
    
    // Blood glucose (prediabetic/diabetic: fasting glucose or HbA1c)
    if (data.fastingGlucose) {
        const glucose = parseFloat(data.fastingGlucose);
        if (glucose >= 126) cardiovascularScore += 12;
        else if (glucose >= 100) cardiovascularScore += 8;
    }
    if (data.hba1c) {
        const hba1c = parseFloat(data.hba1c);
        if (hba1c >= 6.5) cardiovascularScore += 10;
        else if (hba1c >= 5.7) cardiovascularScore += 6;
    }
    
    // Cardiovascular history (if diabetic patient has history)
    if (data.diabetic_cardiovascular_history === 'yes') {
        cardiovascularScore += 20;
    }
    
    // Sleep quality (poor sleep increases cardiovascular risk)
    if (data.sleepQuality === 'poor') {
        cardiovascularScore += 10; // Poor sleep significantly affects heart health
    } else if (data.sleepQuality === 'fair') {
        cardiovascularScore += 5; // Fair sleep has moderate impact
    }
    
    // Alcohol consumption (excessive alcohol increases cardiovascular risk)
    if (data.alcohol === 'frequent') {
        cardiovascularScore += 10; // Frequent alcohol consumption
    } else if (data.alcohol === 'moderate') {
        cardiovascularScore += 5; // Moderate consumption (some studies show benefit, but excessive is harmful)
    }
    
    risks.cardiovascular = Math.min(cardiovascularScore, 100);
    
    // Obesity Risk Calculation (age-adjusted) - based on actual form data
    let obesityScore = 0;
    let bmiStatus = null; // Track BMI status: 'underweight', 'normal', 'overweight', 'obese'
    
    // BMI (primary indicator, age-adjusted)
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ranges = getBMIRangesByAge(ageNum);
        
        if (bmi >= 30) {
            obesityScore += 40; // Obesity
            bmiStatus = 'obese';
        } else if (bmi >= ranges.normal) {
            obesityScore += 25; // Overweight
            bmiStatus = 'overweight';
        } else if (bmi >= ranges.overweight) {
            obesityScore += 15; // Slightly overweight
            bmiStatus = 'overweight';
        } else if (bmi < ranges.underweight) {
            // Underweight is not an obesity risk, but we track it for health assessment
            bmiStatus = 'underweight';
            obesityScore = 0; // No obesity risk, but will still display in chart
        } else {
            // Normal weight
            bmiStatus = 'normal';
            obesityScore = 0; // No obesity risk, but will still display in chart
        }
    }
    
    // Waist Circumference (abdominal obesity indicator)
    if (data.waistCircumference) {
        const waist = parseFloat(data.waistCircumference);
        const gender = data.patientGender;
        if ((gender === 'male' && waist > 90) || (gender === 'female' && waist > 80)) {
            obesityScore += 25; // Abdominal obesity
        }
    } else if (data.waist_exceeded === 'yes' || data.waist_exceeded === 'unsure') {
        obesityScore += 20; // Use alternative field if waistCircumference not available
    }
    
    // Body Fat Percentage (if available)
    if (data.bodyFat) {
        const bodyFat = parseFloat(data.bodyFat);
        const gender = data.patientGender;
        if ((gender === 'male' && bodyFat > 25) || (gender === 'female' && bodyFat > 32)) {
            obesityScore += 20; // High body fat
        }
    }
    
    // Sedentary lifestyle
    if (data.exerciseFrequency === 'none') {
        obesityScore += 15;
    } else if (data.regular_exercise_150min === 'no') {
        obesityScore += 15; // Use alternative field
    }
    
    // Meals per day (eating patterns affect weight)
    if (data.mealsPerDay === '1-2') {
        obesityScore += 5; // Too few meals can lead to overeating later
    } else if (data.mealsPerDay === '6+') {
        obesityScore += 8; // Too many meals may indicate poor portion control
    }
    
    // Sugary foods consumption (increases obesity risk)
    if (data.sugary_foods === 'almost_daily') {
        obesityScore += 10; // Almost daily consumption
    } else if (data.sugary_foods === 'occasional') {
        obesityScore += 5; // Occasional consumption
    }
    
    // Sleep quality (poor sleep affects metabolism and weight)
    if (data.sleepQuality === 'poor') {
        obesityScore += 8; // Poor sleep affects hormones that control appetite
    } else if (data.sleepQuality === 'fair') {
        obesityScore += 4; // Fair sleep has moderate impact
    }
    
    // Alcohol consumption (alcohol has calories and affects metabolism)
    if (data.alcohol === 'frequent') {
        obesityScore += 8; // Frequent alcohol consumption adds calories
    } else if (data.alcohol === 'moderate') {
        obesityScore += 4; // Moderate consumption
    }
    
    risks.obesity = Math.min(obesityScore, 100);
    risks.bmiStatus = bmiStatus; // Store BMI status for chart display
    
    // Metabolic Syndrome Risk - based on actual form data
    // Metabolic syndrome requires 3+ of: high BP, high glucose, high waist, high cholesterol, low HDL
    let metabolicScore = 0;
    
    // Diabetes/Prediabetes (high glucose)
    if (risks.diabetes >= 30) metabolicScore += 25;
    
    // Hypertension (high blood pressure)
    if (risks.hypertension >= 30) metabolicScore += 20;
    
    // Obesity (high waist circumference or BMI)
    if (risks.obesity >= 30) metabolicScore += 25;
    
    // Waist Circumference (abdominal obesity - key component)
    if (data.waistCircumference) {
        const waist = parseFloat(data.waistCircumference);
        const gender = data.patientGender;
        if ((gender === 'male' && waist > 90) || (gender === 'female' && waist > 80)) {
            metabolicScore += 20;
        }
    } else if (data.waist_exceeded === 'yes' || data.waist_exceeded === 'unsure') {
        metabolicScore += 15; // Use alternative field
    }
    
    // High Cholesterol (dyslipidemia)
    if (data.cholesterol && parseFloat(data.cholesterol) >= 200) {
        metabolicScore += 10;
    }
    
    // Age (increases risk)
    if (ageNum >= 50) {
        metabolicScore += 5;
    }
    
    // Sleep quality (poor sleep affects metabolic health)
    if (data.sleepQuality === 'poor') {
        metabolicScore += 5; // Poor sleep affects metabolic hormones
    }
    
    // Sugary foods consumption (affects metabolic health)
    if (data.sugary_foods === 'almost_daily') {
        metabolicScore += 5; // Almost daily consumption
    }
    
    // Alcohol consumption (excessive alcohol affects metabolism)
    if (data.alcohol === 'frequent') {
        metabolicScore += 5; // Frequent alcohol consumption
    }
    
    risks.metabolic = Math.min(metabolicScore, 100);
    
    // Diabetic: metabolic by criteria count (腰围, BMI Overweight+1/Obese+2, 血压, 血糖) — 3+ → 严重
    if (data.patientType === 'diabetic') {
        let criteriaCount = 0;
        const gender = data.patientGender;
        const waist = data.waistCircumference ? parseFloat(data.waistCircumference) : null;
        const waistExceeded = (gender === 'male' && waist > 90) || (gender === 'female' && waist > 80) || data.waist_exceeded === 'yes' || data.waist_exceeded === 'unsure';
        if (waistExceeded) criteriaCount += 1;
        if (data.bmi) {
            const bmi = parseFloat(data.bmi);
            const ranges = getBMIRangesByAge(ageNum);
            if (bmi >= 30) criteriaCount += 2;  // Obese +2
            else if (bmi >= ranges.normal) criteriaCount += 1;  // Overweight +1
        }
        const bpHigh = (data.systolicBP && parseFloat(data.systolicBP) >= 130) || (data.diastolicBP && parseFloat(data.diastolicBP) >= 85);
        if (bpHigh) criteriaCount += 1;
        const glucose = data.fastingGlucose ? parseFloat(data.fastingGlucose) : null;
        const hba1cVal = data.hba1c ? parseFloat(data.hba1c) : null;
        const glucoseHigh = (glucose && glucose >= 100) || (hba1cVal && hba1cVal >= 5.7) || (data.diabetic_recent_hba1c && (data.diabetic_recent_hba1c === 'moderate' || data.diabetic_recent_hba1c === 'high'));
        if (glucoseHigh) criteriaCount += 1;
        risks.metabolicCriteriaCount = criteriaCount;
        risks.metabolicSeverity = criteriaCount >= 3 ? '严重' : criteriaCount >= 2 ? '中等' : criteriaCount >= 1 ? '轻微' : '正常';
        risks.metabolic = criteriaCount >= 3 ? 100 : criteriaCount >= 2 ? 66 : criteriaCount >= 1 ? 33 : 0;
    }
    
    // Low Values Risk Calculation - detects values below normal range
    let lowValuesScore = 0;
    
    // Low Blood Glucose (Hypoglycemia)
    if (data.fastingGlucose) {
        const glucose = parseFloat(data.fastingGlucose);
        if (glucose < 70) {
            lowValuesScore += 30; // Significant hypoglycemia risk
        } else if (glucose < 80) {
            lowValuesScore += 15; // Mildly low
        }
    }
    
    // Low Blood Pressure (Hypotension)
    if (data.systolicBP) {
        const systolic = parseFloat(data.systolicBP);
        if (systolic < 90) {
            lowValuesScore += 25; // Hypotension
        }
    }
    if (data.diastolicBP) {
        const diastolic = parseFloat(data.diastolicBP);
        if (diastolic < 60) {
            lowValuesScore += 20; // Low diastolic pressure
        }
    }
    
    // Underweight (Low BMI)
    if (data.bmi) {
        const bmi = parseFloat(data.bmi);
        const ranges = getBMIRangesByAge(ageNum);
        if (bmi < ranges.underweight) {
            lowValuesScore += 20; // Underweight
        }
    }
    
    // Very Low Cholesterol (rare, but may indicate nutritional issues)
    if (data.cholesterol) {
        const chol = parseFloat(data.cholesterol);
        if (chol < 120) {
            lowValuesScore += 5; // Very low cholesterol
        }
    }
    
    risks.lowValues = Math.min(lowValuesScore, 100);
    
    // Calculate healthy percentage (inverse of average risk)
    // Adjust obesity risk based on BMI status to ensure underweight/overweight affects health status
    let adjustedObesityRisk = risks.obesity;
    if (risks.bmiStatus === 'underweight') {
        // Underweight should affect health status (set to at least 20% risk)
        adjustedObesityRisk = Math.max(risks.obesity, 20);
    } else if (risks.bmiStatus === 'overweight' || risks.bmiStatus === 'obese') {
        // Overweight/obese already have risk scores, use them
        adjustedObesityRisk = risks.obesity;
    } else if (risks.bmiStatus === 'normal') {
        // Normal weight has no risk
        adjustedObesityRisk = 0;
    }
    
    const totalRisk = risks.diabetes + risks.hypertension + risks.cardiovascular + adjustedObesityRisk + risks.metabolic;
    const avgRisk = totalRisk / 5;
    risks.healthy = Math.max(0, 100 - avgRisk);
    
    return risks;
}

// Generate Risk Assessment Chart
function generateRiskChart(data) {
    const risks = calculateHealthRisks(data);
    const chartContainer = document.getElementById('chartContainer');
    const chartLegend = document.getElementById('chartLegend');
    
    if (!chartContainer || !chartLegend) return;
    
    // Show CTA page (next page after chart)
    const ctaPage = document.getElementById('ctaPage');
    if (ctaPage) ctaPage.style.display = 'block';
    
    // Prepare chart data (for diabetic: show 轻微/中等/严重 etc. instead of %)
    const chartData = [];
    const chartLabels = [];
    const chartColors = [];
    const chartDescriptions = [];
    const chartDisplayText = []; // When set, show this instead of value% (diabetic only)
    const isDiabetic = data.patientType === 'diabetic';
    
    // Diabetes Risk — diabetic: 轻微/中等/严重 (no %); prediabetic: 3年内会患上糖尿病% (no generic %)
    if (risks.diabetes > 0 || isDiabetic || data.patientType === 'prediabetic') {
        if (isDiabetic) {
            const dLevel = risks.diabetes >= 60 ? '严重' : risks.diabetes >= 30 ? '中等' : '轻微';
            chartData.push(risks.diabetes >= 60 ? 100 : risks.diabetes >= 30 ? 66 : 33); // for circle fill
            chartDisplayText.push(dLevel);
            chartLabels.push('糖尿病风险 / Diabetes Risk');
            chartColors.push(chartData[chartData.length - 1] >= 66 ? '#dc3545' : chartData[chartData.length - 1] >= 33 ? '#ffc107' : '#4CAF50');
            chartDescriptions.push(`糖尿病风险等级 / Diabetes risk level: ${dLevel}`);
        } else {
            // Prediabetic: show 3-year diabetes risk % (5–35% range from internal score)
            const threeYearRiskPct = Math.min(35, Math.round(5 + (risks.diabetes / 100) * 30));
            chartData.push((threeYearRiskPct / 35) * 100); // for circle fill 0–100
            chartDisplayText.push(`${threeYearRiskPct}%`);
            chartLabels.push('3年内会患上糖尿病 / 3-Year Diabetes Risk');
            chartColors.push(threeYearRiskPct >= 25 ? '#dc3545' : threeYearRiskPct >= 15 ? '#ffc107' : '#4CAF50');
            chartDescriptions.push(`3年内罹患糖尿病概率约 ${threeYearRiskPct}% / ~${threeYearRiskPct}% probability of developing diabetes within 3 years`);
        }
    }
    
    // Hypertension Risk — diabetic & prediabetic: 高/正常/严重/轻微 (no %)
    if (risks.hypertension > 0 || isDiabetic || data.patientType === 'prediabetic') {
        const s = data.systolicBP ? parseFloat(data.systolicBP) : 0;
        const d = data.diastolicBP ? parseFloat(data.diastolicBP) : 0;
        let hLevel = '正常 / Normal';
        if (s >= 140 || d >= 90) hLevel = '严重 / Stage 2';
        else if (s >= 130 || d >= 85) hLevel = '高 / Stage 1';
        else if (s >= 120 || d >= 80) hLevel = '轻微 / Elevated';
        const fillVal = hLevel.includes('严重') ? 100 : hLevel.includes('高') ? 70 : hLevel.includes('轻微') ? 40 : 0;
        chartData.push(fillVal);
        chartDisplayText.push(hLevel);
        chartLabels.push('高血压风险 / Hypertension Risk');
        chartColors.push(hLevel.includes('严重') ? '#dc3545' : hLevel.includes('高') ? '#ff9800' : hLevel.includes('轻微') ? '#ffc107' : '#4CAF50');
        chartDescriptions.push(`血压风险等级 / BP risk level: ${hLevel}`);
    }
    
    if (risks.cardiovascular > 0) {
        chartData.push(risks.cardiovascular);
        chartDisplayText.push(null);
        chartLabels.push('心血管疾病风险 / Cardiovascular Disease Risk');
        chartColors.push('#ff9800'); // Orange
        chartDescriptions.push(getRiskDescription(risks.cardiovascular, '心血管疾病 / Cardiovascular Disease'));
    }
    
    // Always show obesity/BMI risk card — diabetic: show Underweight/Normal weight/Overweight/Obese (no %)
    let obesityLabel = '肥胖风险 / Obesity Risk';
    let obesityDescription = '';
    let obesityColor = '#ffc107'; // Default yellow/orange
    let obesityDisplayValue = risks.obesity; // Value for circle
    let obesityDisplayText = null; // diabetic: "Underweight" / "Normal weight" / "Overweight" / "Obese"
    
    const isPrediabetic = data.patientType === 'prediabetic';
    const showObesityAsCategory = isDiabetic || isPrediabetic; // both: show Overweight/Normal/Obese (no %)
    if (risks.bmiStatus === 'underweight') {
        obesityLabel = (isDiabetic || isPrediabetic) ? '体重状态 / Weight Status' : '体重风险 / Weight Risk';
        obesityDescription = '体重过轻 - 需要关注！建议咨询医疗专业人员，增加健康体重，通过均衡营养和适当运动 / Underweight - Attention needed! Recommend consulting a medical professional to increase healthy weight through balanced nutrition and appropriate exercise';
        obesityColor = '#ff9800';
        obesityDisplayValue = showObesityAsCategory ? 20 : 20;
        if (showObesityAsCategory) obesityDisplayText = 'Underweight';
    } else if (risks.bmiStatus === 'normal') {
        obesityLabel = '体重状态 / Weight Status';
        obesityDescription = '正常体重 - 继续保持健康的生活习惯 / Normal Weight - Continue maintaining healthy lifestyle habits';
        obesityColor = '#4CAF50';
        obesityDisplayValue = 0;
        if (showObesityAsCategory) obesityDisplayText = 'Normal weight';
    } else if (risks.bmiStatus === 'overweight') {
        obesityLabel = (isDiabetic || isPrediabetic) ? '体重状态 / Weight Status' : '肥胖风险 / Obesity Risk';
        obesityDescription = '体重过重 - 建议通过饮食控制和规律运动来减重 / Overweight - Recommend losing weight through diet control and regular exercise';
        obesityColor = '#ffc107';
        obesityDisplayValue = showObesityAsCategory ? 50 : risks.obesity;
        if (showObesityAsCategory) obesityDisplayText = 'Overweight';
    } else if (risks.bmiStatus === 'obese') {
        obesityLabel = (isDiabetic || isPrediabetic) ? '体重状态 / Weight Status' : '肥胖风险 / Obesity Risk';
        obesityDescription = getRiskDescription(risks.obesity, '肥胖 / Obesity');
        obesityColor = '#ff9800';
        obesityDisplayValue = showObesityAsCategory ? 100 : risks.obesity;
        if (showObesityAsCategory) obesityDisplayText = 'Obese';
    } else {
        if (risks.obesity > 0) {
            obesityDescription = getRiskDescription(risks.obesity, '肥胖 / Obesity');
            obesityDisplayValue = risks.obesity;
        } else {
            obesityDescription = '请提供BMI数据以评估体重状态 / Please provide BMI data to assess weight status';
            obesityDisplayValue = 0;
        }
        if (showObesityAsCategory) obesityDisplayText = '—'; // no BMI data
    }
    
    chartData.push(obesityDisplayValue);
    chartDisplayText.push(obesityDisplayText);
    chartLabels.push(obesityLabel);
    chartColors.push(obesityColor);
    chartDescriptions.push(obesityDescription);
    
    // Metabolic — diabetic: new algorithm, display 严重/中等/轻微/正常 (no %)
    if (risks.metabolic > 0 || (isDiabetic && risks.metabolicSeverity)) {
        if (isDiabetic && risks.metabolicSeverity) {
            chartData.push(risks.metabolic); // already 0/33/66/100 from criteria count
            chartDisplayText.push(risks.metabolicSeverity);
            chartLabels.push('代谢症候群风险 / Metabolic Syndrome Risk');
            chartColors.push(risks.metabolicSeverity === '严重' ? '#f44336' : risks.metabolicSeverity === '中等' ? '#ff9800' : risks.metabolicSeverity === '轻微' ? '#ffc107' : '#4CAF50');
            chartDescriptions.push(`代谢症候群等级（腰围、BMI、血压、血糖） / Metabolic level (waist, BMI, BP, glucose): ${risks.metabolicSeverity}`);
        } else {
            chartData.push(risks.metabolic);
            chartDisplayText.push(null);
            chartLabels.push('代谢症候群风险 / Metabolic Syndrome Risk');
            chartColors.push('#f44336');
            chartDescriptions.push(getRiskDescription(risks.metabolic, '代谢症候群 / Metabolic Syndrome'));
        }
    }
    
    // Add low values risk if present
    if (risks.lowValues > 0) {
        chartData.push(risks.lowValues);
        chartDisplayText.push(null);
        chartLabels.push('低值风险 / Low Values Risk');
        chartColors.push('#2196F3'); // Blue (to distinguish from high value risks)
        chartDescriptions.push(getRiskDescription(risks.lowValues, '低值风险 / Low Values Risk'));
    }
    
    // Always add healthy status (even if 0, it should be displayed)
        chartData.push(risks.healthy);
        chartDisplayText.push(null);
        chartLabels.push('健康状态 / Healthy Status');
    // Color based on healthy percentage:
    // 80%以上: 青色 (Cyan/Teal)
    // 30%以上: 黄色 (Yellow)
    // 29%以下: 红色 (Red)
    let healthyColor;
    if (risks.healthy >= 80) {
        healthyColor = '#4CAF50'; // Green (青色)
    } else if (risks.healthy >= 30) {
        healthyColor = '#FFC107'; // Yellow (黄色)
    } else {
        healthyColor = '#F44336'; // Red (红色)
    }
    chartColors.push(healthyColor);
        chartDescriptions.push('您的健康指标良好 / Your health indicators are good');
    
    // Find healthy status data for top center box
    const healthyIndex = chartLabels.findIndex(label => label.includes('健康状态') || label.includes('Healthy Status'));
    let healthyStatusHTML = '';
    if (healthyIndex !== -1) {
        const healthyValue = chartData[healthyIndex];
        const healthyColor = chartColors[healthyIndex];
        const healthyDesc = chartDescriptions[healthyIndex];
        
        // Determine border color based on healthy percentage
        let borderColor = '#F44336'; // Red
        if (healthyValue >= 80) {
            borderColor = '#4CAF50'; // Green
        } else if (healthyValue >= 30) {
            borderColor = '#FFC107'; // Yellow
        }
        
        healthyStatusHTML = `
            <div class="healthy-status-wrapper">
                <div class="healthy-status-percent-outside" style="color: ${borderColor};">
                    ${healthyValue.toFixed(1)}%
                </div>
                <div class="healthy-status-box" style="border-color: ${borderColor}; background: ${borderColor};">
                    <div class="healthy-status-label">健康状态 / Healthy Status</div>
                    <div class="healthy-status-desc">${healthyDesc}</div>
                </div>
            </div>
        `;
    }
    
    // Generate risk cards - matching image design
    let legendHTML = healthyStatusHTML;
    
    // Map risk types to icons, SVG paths, and colors
    const riskIconMap = {
        '糖尿病风险': { 
            icon: '🩸', 
            class: 'card-diabetes',
            svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
        },
        'Diabetes Risk': { 
            icon: '🩸', 
            class: 'card-diabetes',
            svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
        },
        '3年内会患上糖尿病': { 
            icon: '🩸', 
            class: 'card-diabetes',
            svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
        },
        '高血压风险': { 
            icon: '🩺', 
            class: 'card-hypertension',
            svgPath: 'M19 8h-1V6c0-2.76-2.24-5-5-5S8 3.24 8 6v2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM10 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2h-6V6zm8 14H8V10h10v10z'
        },
        'Hypertension Risk': { 
            icon: '🩺', 
            class: 'card-hypertension',
            svgPath: 'M19 8h-1V6c0-2.76-2.24-5-5-5S8 3.24 8 6v2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM10 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2h-6V6zm8 14H8V10h10v10z'
        },
        '心血管疾病风险': { 
            icon: '❤️', 
            class: 'card-cardio',
            svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
        },
        'Cardiovascular Disease Risk': { 
            icon: '❤️', 
            class: 'card-cardio',
            svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
        },
        '肥胖风险': { 
            icon: '👤', 
            class: 'card-obesity',
            svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
        },
        'Obesity Risk': { 
            icon: '👤', 
            class: 'card-obesity',
            svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
        },
        '体重状态': { 
            icon: '👤', 
            class: 'card-obesity',
            svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
        },
        'Weight Status': { 
            icon: '👤', 
            class: 'card-obesity',
            svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
        },
        '代谢症候群风险': { 
            icon: '🫀', 
            class: 'card-metabolic',
            svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'
        },
        'Metabolic Syndrome Risk': { 
            icon: '🫀', 
            class: 'card-metabolic',
            svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'
        },
        '低值风险': { 
            icon: '⚠️', 
            class: 'card-low-values',
            svgPath: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
        },
        'Low Values Risk': { 
            icon: '⚠️', 
            class: 'card-low-values',
            svgPath: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
        }
    };
    
    // Function to generate circular progress chart SVG
    function generateProgressChart(value, color, iconPath) {
        const size = 68;
        const strokeWidth = 6;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (value / 100) * circumference;
        
        return `
            <div class="risk-chart-circle">
                <svg width="${size}" height="${size}" class="risk-chart-svg">
                    <!-- Background circle (white) -->
                    <circle
                        cx="${size/2}"
                        cy="${size/2}"
                        r="${radius}"
                        fill="none"
                        stroke="#e0e0e0"
                        stroke-width="${strokeWidth}"
                    />
                    <!-- Progress circle (red) -->
                    <circle
                        cx="${size/2}"
                        cy="${size/2}"
                        r="${radius}"
                        fill="none"
                        stroke="${color}"
                        stroke-width="${strokeWidth}"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${offset}"
                        stroke-linecap="round"
                        transform="rotate(-90 ${size/2} ${size/2})"
                    />
                    <!-- Center icon -->
                    <g transform="translate(${size/2}, ${size/2})">
                        <path
                            d="${iconPath}"
                            fill="#000"
                            transform="scale(0.8) translate(-12, -12)"
                        />
                    </g>
                </svg>
            </div>
        `;
    }
    
    chartLabels.forEach((label, index) => {
        const value = chartData[index];
        const color = chartColors[index];
        const description = chartDescriptions[index];
        const displayText = chartDisplayText[index]; // Diabetic: 轻微/中等/严重, Underweight, etc. (no %)
        
        // Skip healthy status - it's shown in the top center box
        if (label.includes('健康状态') || label.includes('Healthy Status')) {
            return;
        }
        
        // Find icon, SVG path, and class for this risk type
        let cardIcon = '📊';
        let cardClass = 'card-risk';
        let iconSvgPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
        for (const [key, info] of Object.entries(riskIconMap)) {
            if (label.includes(key)) {
                cardIcon = info.icon;
                cardClass = info.class;
                iconSvgPath = info.svgPath;
                break;
            }
        }
        
        // Get marker color class based on risk color
        let markerClass = 'marker-red';
        if (color === '#4CAF50' || color === '#00BCD4') {
            markerClass = 'marker-green';
        } else if (color === '#ff9800' || color === '#fd7e14') {
            markerClass = 'marker-orange';
        } else if (color === '#ffc107' || color === '#FFC107') {
            markerClass = 'marker-yellow';
        } else if (color === '#dc3545' || color === '#f44336' || color === '#ff6b6b') {
            markerClass = 'marker-red';
        }
        
        // Generate circular progress chart (value 0-100 for ring fill)
        const progressChart = generateProgressChart(value, color, iconSvgPath);
        const topLabel = displayText != null ? displayText : `${value.toFixed(1)}%`;
        
        // Create card HTML matching image design with progress chart
        legendHTML += `
            <div class="card ${cardClass}">
                <div class="card-percentage-top">
                    <span class="highlight-text">${topLabel}</span>
                </div>
                <div class="card-chart-container">
                    ${progressChart}
                </div>
                <div class="card-content">
                    <div class="card-title">
                        <span class="card-marker ${markerClass}"></span>
                        ${label}
                    </div>
                    <p>${description}</p>
                </div>
            </div>
        `;
    });
    
    // Update cards
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

