# 🚀 EmailJS 快速設定指南

## 1️⃣ 註冊 EmailJS 並設定服務

### 步驟 1：註冊帳號
1. 前往 [EmailJS 官網](https://www.emailjs.com/)
2. 點擊「Sign Up」註冊免費帳號
3. 使用 Gmail 或其他電子郵件註冊

### 步驟 2：新增電子郵件服務
1. 登入後點擊「Add New Service」
2. 選擇「Gmail」服務
3. 點擊「Connect Account」並完成 Google OAuth 認證
4. 服務建立成功後，記錄您的 **Service ID**（例如：service_xxxxxxx）

## 2️⃣ 建立郵件模板

### 步驟 1：建立新模板
1. 點擊「Create New Template」
2. 在「Settings」頁籤中：
   - Template Name: `聯繫發布者請求`
   - Subject: `芝山圓夢媒合站 - 聯繫發布者請求`
   - From Name: `{{from_name}}`
   - To Email: `{{to_email}}`

### 步驟 2：設定模板內容
在「Template」頁籤中，貼上以下內容：

```
親愛的管理者，

有使用者想要聯繫提案發布者，詳細資訊如下：

=== 聯繫者資訊 ===
使用者帳號：{{user_email}}
使用者姓名：{{user_name}}
使用者類型：{{user_type}}

=== 提案資訊 ===
提案頁面連結：{{proposal_url}}
提案ID：{{proposal_id}}
提案標題：{{proposal_title}}
提案類型：{{proposal_type}}

=== 發布者資訊 ===
發布者信箱：{{author_email}}
發布者姓名：{{author_name}}

請協助媒合雙方聯繫，謝謝！

此郵件由芝山圓夢媒合站系統自動發送
發送時間：{{send_time}}
```

3. 點擊「Save」儲存模板
4. 記錄您的 **Template ID**（例如：template_xxxxxxx）

## 3️⃣ 獲取 Public Key

1. 在 EmailJS 控制台中，點擊左側選單的「Account」
2. 在「General」頁籤中找到「Public Key」
3. 記錄您的 **Public Key**（例如：xxxxxxxxxxxxxxx）

## 4️⃣ 更新程式碼

### 方法一：直接編輯程式碼
在 `proposal-detail.html` 中找到以下程式碼：

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

將其替換為您的實際參數：

```javascript
const EMAILJS_SERVICE_ID = 'service_7yl7dx7';
const EMAILJS_TEMPLATE_ID = 'template_k4gqytq';
const EMAILJS_PUBLIC_KEY = 'DeR21EWdHC6cyzXR0';
```

### 方法二：使用測試頁面
1. 開啟 `emailjs-test.html`
2. 填入您的 EmailJS 參數
3. 點擊「測試發送」
4. 如果測試成功，將參數複製到 `proposal-detail.html`

## 5️⃣ 測試功能

### 完整測試流程：
1. 確保已登入您的網站
2. 前往任一提案詳情頁面
3. 點擊「聯繫發布者」按鈕
4. 確認系統顯示「發送中...」
5. 檢查是否顯示「聯繫請求已成功發送給管理者！」
6. 檢查管理員信箱（su20050408@gmail.com）是否收到郵件

### 如果測試失敗：
- 檢查瀏覽器 Console 是否有錯誤訊息
- 確認 EmailJS 參數是否正確
- 確認網路連線正常
- 系統會自動回退到 mailto 連結

## 6️⃣ 安全性設定（建議）

### 設定網域白名單：
1. 在 EmailJS 控制台中，前往「Settings」
2. 在「Allowed Origins」中新增您的網域
3. 例如：`https://your-domain.com`

### 設定使用限制：
1. 在「Settings」中可以設定每月發送限制
2. 免費帳號每月有 200 封郵件額度

## 🎯 重要提醒

✅ **成功指標：**
- EmailJS 參數正確填入
- 測試頁面發送成功
- 實際功能運作正常
- 管理員收到郵件

❌ **常見錯誤：**
- Service ID、Template ID、Public Key 填寫錯誤
- Gmail OAuth 認證失敗
- 網域限制設定過嚴
- 超出每月發送限制

🔧 **故障排除：**
- 檢查瀏覽器 Console 錯誤訊息
- 使用測試頁面驗證參數
- 確認 EmailJS 服務狀態正常
- 系統有 mailto 備用方案

## 📞 支援

如有任何問題，請聯繫：
- 管理員：su20050408@gmail.com
- EmailJS 官方文檔：https://www.emailjs.com/docs/
