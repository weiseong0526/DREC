# CGM 后台与数据库说明 / Admin & Database Setup

## 1. 数据库 (XAMPP MySQL)

1. 启动 XAMPP，打开 **MySQL**。
2. 在 **phpMyAdmin** 中导入 SQL，或命令行执行：
   ```bash
   mysql -u root -p < database/cgm_database.sql
   ```
   或在 phpMyAdmin 中选择「导入」→ 选择 `database/cgm_database.sql`。

3. 将建立：
   - 数据库 `cgm_db`
   - 表 `cgm_submissions`：存放所有患者表单提交
   - 表 `admin_users`：后台登录账号（首次登录时自动创建 admin / admin123）

## 2. 患者表单 → 存库

患者在前台填写并提交表单后，数据会**自动 POST 到** `api/save_submission.php` 并写入 `cgm_submissions`。

**重要：必须用浏览器通过 HTTP 打开表单，数据库才会记录。**

- **会记录**：用浏览器访问 `http://localhost/DREC portfolio/CGM/index.html`（或你的 XAMPP 对应地址）再填写并提交。
- **不会记录**：直接双击打开 `index.html`（`file:///...`）再提交。此时请求不会发到 XAMPP，所以数据库不会有新记录。

若未配置 XAMPP 或 API 不可用，报告仍会正常生成，只是不会写入数据库。若保存失败，可在浏览器开发者工具 (F12) → Network 查看 `save_submission.php` 的响应，或 Console 中的警告。

## 3. 后台管理页

- 地址：`http://localhost/DREC portfolio/CGM/admin/` 或 `http://localhost/CGM/admin/`（依你的 XAMPP 路径而定）
- 默认登录：**用户名** `admin`，**密码** `admin123`（首次登录时若表中无用户会自动创建，请上线后修改密码）

### 功能

- **筛选**：按患者类型（糖尿病 / 糖尿病前期）、姓名/联系方式、邮箱、日期范围筛选。
- **列表**：显示 ID、提交时间、类型、姓名、联系方式、邮箱、年龄、BMI，以及「查看详情」。
- **详情**：点击「查看详情」可查看该条提交的**全部答案**（基本信息、BMI、血糖/血压、糖尿病前期问卷、糖尿病患者问卷、生活习惯等）。

## 4. API 说明（供后台使用）

- `POST api/save_submission.php` — 保存一条患者提交（JSON body），**无需登录**。
- `GET api/list_submissions.php` — 列表（需登录），参数：`patient_type`, `patient_name`, `patient_email`, `date_from`, `date_to`, `limit`, `offset`。
- `GET api/get_submission.php?id=1` — 单条详情（需登录）。
- `POST api/auth.php` — 登录（body: `{ "username", "password" }`）。
- `GET api/auth.php?check=1` — 检查是否已登录。
- `POST api/auth.php?logout=1` — 登出。

## 5. 目录结构

```
CGM/
├── index.html              # 患者表单
├── script.js               # 表单逻辑 + 提交时 POST 到 api/save_submission.php
├── api/
│   ├── config.php          # 数据库连接 + 字段映射
│   ├── save_submission.php # 保存提交（无需登录）
│   ├── list_submissions.php# 列表（需登录）
│   ├── get_submission.php  # 详情（需登录）
│   └── auth.php            # 登录/登出/检查
├── admin/
│   ├── index.html          # 后台页面
│   ├── admin.js            # 筛选、列表、详情
│   └── admin.css           # 样式
└── database/
    └── cgm_database.sql    # 建库建表 + admin_users 表
```
