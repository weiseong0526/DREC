(function () {
    const API = '../api/';
    const loginScreen = document.getElementById('loginScreen');
    const adminScreen = document.getElementById('adminScreen');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const tableBody = document.getElementById('tableBody');
    const totalCount = document.getElementById('totalCount');
    const totalCountEn = document.getElementById('totalCountEn');
    const detailModal = document.getElementById('detailModal');
    const detailBody = document.getElementById('detailBody');
    const detailId = document.getElementById('detailId');
    const detailClose = document.getElementById('detailClose');

    function apiUrl(path) {
        return API + path;
    }

    function checkAuth() {
        fetch(apiUrl('auth.php?check=1'), { credentials: 'include' })
            .then(r => r.json())
            .then(data => {
                if (data.logged_in) {
                    loginScreen.classList.add('hidden');
                    adminScreen.classList.remove('hidden');
                    loadList();
                } else {
                    loginScreen.classList.remove('hidden');
                    adminScreen.classList.add('hidden');
                }
            })
            .catch(() => {
                loginScreen.classList.remove('hidden');
                adminScreen.classList.add('hidden');
            });
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginError.textContent = '';
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        fetch(apiUrl('auth.php'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
            .then(r => r.json())
            .then(data => {
                if (data.ok) {
                    loginScreen.classList.add('hidden');
                    adminScreen.classList.remove('hidden');
                    loadList();
                } else {
                    loginError.textContent = data.error || 'Login failed';
                }
            })
            .catch(() => { loginError.textContent = 'Network error'; });
    });

    function doLogout() {
        fetch(apiUrl('auth.php?logout=1'), { method: 'POST', credentials: 'include' })
            .then(() => { checkAuth(); });
    }
    logoutBtn.addEventListener('click', doLogout);
    const logoutBtnHeader = document.getElementById('logoutBtnHeader');
    if (logoutBtnHeader) logoutBtnHeader.addEventListener('click', doLogout);

    function buildQuery() {
        const params = new URLSearchParams();
        const ptEl = document.getElementById('filterPatientType');
        const nameEl = document.getElementById('filterName');
        const emailEl = document.getElementById('filterEmail');
        const fromEl = document.getElementById('filterDateFrom');
        const toEl = document.getElementById('filterDateTo');
        const pt = ptEl ? ptEl.value : '';
        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const from = fromEl ? fromEl.value : '';
        const to = toEl ? toEl.value : '';
        if (pt) params.set('patient_type', pt);
        if (name) params.set('patient_name', name);
        if (email) params.set('patient_email', email);
        if (from) params.set('date_from', from);
        if (to) params.set('date_to', to);
        params.set('limit', '200');
        params.set('_', Date.now()); // avoid cache
        return params.toString();
    }

    function loadList() {
        const q = buildQuery();
        fetch(apiUrl('list_submissions.php?' + q), { credentials: 'include', cache: 'no-store' })
            .then(r => {
                if (r.status === 401) { checkAuth(); throw new Error('Unauthorized'); }
                return r.json();
            })
            .then(data => {
                if (!data.ok) return;
                totalCount.textContent = data.total;
                totalCountEn.textContent = data.total;
                tableBody.innerHTML = '';
                data.list.forEach(function (row) {
                    const tr = document.createElement('tr');
                    const submitted = row.created_at ? new Date(row.created_at).toLocaleString('zh-CN') : '—';
                    const typeText = row.patient_type === 'diabetic' ? '糖尿病' : row.patient_type === 'prediabetic' ? '前期' : '—';
                    const hasScore = row.risk_score != null && row.risk_score !== '';
                    const hasLevel = row.risk_level != null && ('' + row.risk_level).trim() !== '';
                    const riskText = (hasScore || hasLevel)
                        ? [hasScore ? row.risk_score + ' 分' : '', hasLevel ? row.risk_level : ''].filter(Boolean).join(' / ')
                        : '—';
                    tr.innerHTML =
                        '<td>' + row.id + '</td>' +
                        '<td>' + submitted + '</td>' +
                        '<td>' + typeText + '</td>' +
                        '<td>' + (row.patient_name || '—') + '</td>' +
                        '<td>' + (row.patient_contact || '—') + '</td>' +
                        '<td>' + (row.patient_email || '—') + '</td>' +
                        '<td>' + (row.patient_age || '—') + '</td>' +
                        '<td>' + (row.bmi || '—') + '</td>' +
                        '<td>' + riskText + '</td>' +
                        '<td><button type="button" class="btn-link" data-id="' + row.id + '">查看详情</button></td>';
                    tr.querySelector('.btn-link').addEventListener('click', function () { openDetail(row.id); });
                    tableBody.appendChild(tr);
                });
            })
            .catch(() => {});
    }

    // Auto reload when any filter changes (no button needed)
    function attachFilterListeners() {
        const filterPatientType = document.getElementById('filterPatientType');
        const filterName = document.getElementById('filterName');
        const filterEmail = document.getElementById('filterEmail');
        const filterDateFrom = document.getElementById('filterDateFrom');
        const filterDateTo = document.getElementById('filterDateTo');
        if (filterPatientType) filterPatientType.addEventListener('change', loadList);
        if (filterDateFrom) filterDateFrom.addEventListener('change', loadList);
        if (filterDateTo) filterDateTo.addEventListener('change', loadList);
        var filterDebounce;
        if (filterName) {
            filterName.addEventListener('input', function () { clearTimeout(filterDebounce); filterDebounce = setTimeout(loadList, 400); });
            filterName.addEventListener('change', loadList);
        }
        if (filterEmail) {
            filterEmail.addEventListener('input', function () { clearTimeout(filterDebounce); filterDebounce = setTimeout(loadList, 400); });
            filterEmail.addEventListener('change', loadList);
        }
    }
    attachFilterListeners();

    const LABELS = {
        id: 'ID',
        created_at: '提交时间',
        patient_type: '患者类型',
        risk_score: '风险分数',
        risk_level: '风险等级',
        patient_name: '姓名',
        patient_contact: '联系方式',
        patient_email: '邮箱',
        patient_age: '年龄',
        patient_gender: '性别',
        height: '身高 (cm)',
        weight: '体重 (kg)',
        bmi: 'BMI',
        fasting_glucose_mmol: '空腹血糖 (mmol/L)',
        fasting_glucose: '空腹血糖 (mg/dL)',
        postprandial_glucose_mmol: '餐后血糖 (mmol/L)',
        postprandial_glucose: '餐后血糖 (mg/dL)',
        hba1c: 'HbA1c (%)',
        glucose_test_date: '血糖检测日期',
        systolic_bp: '收缩压',
        diastolic_bp: '舒张压',
        family_diabetes: '家族糖尿病',
        sugary_foods: '含糖食物',
        waist_exceeded: '腰围超标',
        regular_exercise_150min: '每周运动≥150分钟',
        recent_glucose_level: '最近血糖水平',
        prediabetic_fear_complications: '最怕的并发症',
        prediabetic_hypertension_cholesterol: '有没有高血压或胆固醇',
        diabetic_blurred_vision: '视力模糊',
        diabetic_night_vision: '夜视力差',
        diabetic_visual_spots: '黑点/阴影',
        diabetic_foamy_urine: '泡沫尿',
        diabetic_frequent_urination: '尿频',
        diabetic_edema: '水肿',
        diabetic_numbness: '手脚麻痹',
        diabetic_shortness_breath: '气喘/胸闷',
        diabetic_foot_pain: '脚酸痛无力',
        diabetic_cardiovascular_history: '心脏病/中风史',
        diabetic_duration: '糖尿病病程',
        diabetic_recent_hba1c: '最近HbA1c',
        diabetic_taking_medication: '用药',
        diabetic_insulin_injection: '胰岛素注射',
        meals_per_day: '每日餐次',
        sleep_quality: '睡眠质量',
        stress_level: '压力水平',
        smoking: '吸烟',
        alcohol: '饮酒',
        cholesterol: '胆固醇',
        waist_circumference: '腰围',
        body_fat: '体脂',
        exercise_frequency: '运动频率'
    };

    function formatValue(key, value) {
        if (value === null || value === undefined || value === '') return '—';
        if (key === 'patient_gender') return value === 'male' ? '男' : value === 'female' ? '女' : value;
        if (key === 'patient_type') return value === 'diabetic' ? '糖尿病' : value === 'prediabetic' ? '糖尿病前期' : value;
        if (key === 'prediabetic_hypertension_cholesterol') return value === 'yes' ? '有' : value === 'no' ? '没有' : value;
        if (Array.isArray(value)) return value.join(', ');
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }

    function openDetail(id) {
        detailId.textContent = id;
        detailBody.innerHTML = '<p>加载中...</p>';
        detailModal.classList.remove('hidden');
        fetch(apiUrl('get_submission.php?id=' + id), { credentials: 'include' })
            .then(r => {
                if (r.status === 401) { checkAuth(); return null; }
                return r.json();
            })
            .then(data => {
                if (!data || !data.ok) {
                    detailBody.innerHTML = '<p>加载失败</p>';
                    return;
                }
                const s = data.submission;
                let html = '';
                if (s.patient_type === 'prediabetic' && (s.risk_score != null || s.risk_level)) {
                    html += '<div class="detail-section"><h3>糖尿病前期风险评估 / Prediabetic Risk Assessment</h3><div class="detail-grid">';
                    html += '<div class="detail-item"><span class="label">风险分数 / Risk Score</span><span class="value">' + (s.risk_score != null ? s.risk_score + ' 分 / 12' : '—') + '</span></div>';
                    html += '<div class="detail-item"><span class="label">风险等级 / Risk Level</span><span class="value">' + (s.risk_level || '—') + '</span></div>';
                    html += '</div></div>';
                }
                if (s.patient_type === 'diabetic' && (s.risk_score != null || s.risk_level)) {
                    html += '<div class="detail-section"><h3>糖尿病患者风险评估 / Diabetic Risk Assessment</h3><div class="detail-grid">';
                    html += '<div class="detail-item"><span class="label">风险分数 / Risk Score</span><span class="value">' + (s.risk_score != null ? s.risk_score + ' 分 / 19' : '—') + '</span></div>';
                    html += '<div class="detail-item"><span class="label">风险等级 / Risk Level</span><span class="value">' + (s.risk_level || '—') + '</span></div>';
                    html += '</div></div>';
                }
                const sections = [
                    { title: '基本信息', keys: ['created_at', 'patient_type', 'patient_name', 'patient_contact', 'patient_email', 'patient_age', 'patient_gender'] },
                    { title: 'BMI / 身体', keys: ['height', 'weight', 'bmi', 'waist_circumference', 'body_fat'] },
                    { title: '血糖 / 血压', keys: ['fasting_glucose_mmol', 'fasting_glucose', 'postprandial_glucose_mmol', 'postprandial_glucose', 'hba1c', 'glucose_test_date', 'systolic_bp', 'diastolic_bp'] },
                    { title: '糖尿病前期', keys: ['family_diabetes', 'sugary_foods', 'waist_exceeded', 'regular_exercise_150min', 'recent_glucose_level', 'prediabetic_fear_complications', 'prediabetic_hypertension_cholesterol'] },
                    { title: '糖尿病患者问卷', keys: ['diabetic_blurred_vision', 'diabetic_night_vision', 'diabetic_visual_spots', 'diabetic_foamy_urine', 'diabetic_frequent_urination', 'diabetic_edema', 'diabetic_numbness', 'diabetic_shortness_breath', 'diabetic_foot_pain', 'diabetic_cardiovascular_history', 'diabetic_duration', 'diabetic_recent_hba1c', 'diabetic_taking_medication', 'diabetic_insulin_injection'] },
                    { title: '生活习惯', keys: ['meals_per_day', 'sleep_quality', 'stress_level', 'smoking', 'alcohol', 'exercise_frequency'] },
                    { title: '其他', keys: ['cholesterol'] }
                ];
                sections.forEach(function (sec) {
                    html += '<div class="detail-section"><h3>' + sec.title + '</h3><div class="detail-grid">';
                    sec.keys.forEach(function (k) {
                        const label = LABELS[k] || k;
                        const val = formatValue(k, s[k]);
                        html += '<div class="detail-item"><span class="label">' + label + '</span><span class="value">' + val + '</span></div>';
                    });
                    html += '</div></div>';
                });
                detailBody.innerHTML = html || '<p>无数据</p>';
            });
    }

    detailClose.addEventListener('click', function () { detailModal.classList.add('hidden'); });
    detailModal.addEventListener('click', function (e) {
        if (e.target === detailModal || e.target.classList.contains('modal-backdrop')) detailModal.classList.add('hidden');
    });

    // Change password
    const changePasswordModal = document.getElementById('changePasswordModal');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const changePasswordError = document.getElementById('changePasswordError');

    function openChangePasswordModal() {
        if (changePasswordModal) {
            changePasswordError.textContent = '';
            changePasswordForm.reset();
            changePasswordModal.classList.remove('hidden');
        }
    }
    function closeChangePasswordModal() {
        if (changePasswordModal) changePasswordModal.classList.add('hidden');
    }

    if (changePasswordBtn) changePasswordBtn.addEventListener('click', openChangePasswordModal);
    document.querySelectorAll('.change-pw-close').forEach(function (el) {
        el.addEventListener('click', closeChangePasswordModal);
    });
    if (changePasswordModal) {
        changePasswordModal.addEventListener('click', function (e) {
            if (e.target === changePasswordModal || e.target.classList.contains('modal-backdrop')) closeChangePasswordModal();
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function (e) {
            e.preventDefault();
            changePasswordError.textContent = '';
            var current = document.getElementById('currentPassword').value;
            var newPw = document.getElementById('newPassword').value;
            var confirmPw = document.getElementById('confirmPassword').value;
            if (newPw !== confirmPw) {
                changePasswordError.textContent = '新密码与确认密码不一致 / New password and confirm do not match';
                return;
            }
            fetch(apiUrl('change_password.php'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ current_password: current, new_password: newPw })
            })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    if (data.ok) {
                        closeChangePasswordModal();
                        alert(data.message || '密码已更新 / Password updated');
                    } else {
                        changePasswordError.textContent = data.error || 'Failed';
                    }
                })
                .catch(function () { changePasswordError.textContent = 'Network error'; });
        });
    }

    checkAuth();
})();
