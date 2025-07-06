# EmailJS 設定說明

## 概述
聯繫發布者功能已整合 EmailJS 服務，可自動發送郵件給管理員。當 EmailJS 無法使用時，系統會自動回退到 mailto 連結方式。

## 設定步驟

### 1. 註冊 EmailJS 帳號
1. 前往 [EmailJS 官網](https://www.emailjs.com/)
2. 點擊「Sign Up」註冊帳號
3. 驗證電子郵件後登入

### 2. 建立電子郵件服務
1. 在 EmailJS 控制台中，點擊「Add New Service」
2. 選擇您的電子郵件服務商（建議使用 Gmail）
3. 按照指示完成 OAuth 認證
4. 記下您的 **Service ID**

### 3. 建立郵件模板
1. 在 EmailJS 控制台中，點擊「Create New Template」
2. 設定模板內容，可參考以下範例：

```
主旨：芝山圓夢媒合站 - 聯繫發布者請求

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

3. 記下您的 **Template ID**

### 4. 獲取 Public Key
1. 在 EmailJS 控制台中，前往「Integration」
2. 複製您的 **Public Key**

### 5. 更新程式碼參數
在 `proposal-detail.html` 中找到以下程式碼：

```javascript
// 請將以下參數替換為您的 EmailJS 實際參數
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

將 `YOUR_SERVICE_ID`、`YOUR_TEMPLATE_ID`、`YOUR_PUBLIC_KEY` 替換為您在前面步驟中獲取的實際值。

## 功能特色

### 1. 自動發送
- 使用者點擊「聯繫發布者」按鈕後，系統會自動發送郵件
- 無需開啟郵件客戶端或手動填寫內容

### 2. 詳細資訊
郵件會包含：
- 聯繫者資訊（帳號、姓名、類型）
- 提案詳細資訊（連結、標題、類型）
- 發布者資訊（信箱、姓名）
- 發送時間

### 3. 備用方案
- 當 EmailJS 無法使用時，自動回退到 mailto 連結
- 提供 Gmail 網頁版開啟選項
- 確保功能的可靠性

### 4. 使用者體驗
- 顯示「發送中...」載入狀態
- 發送成功後顯示確認訊息
- 發送失敗時提供備用選項

## 測試建議

1. **正常流程測試**：
   - 確認 EmailJS 參數設定正確
   - 測試郵件能否正常發送到管理員信箱

2. **備用方案測試**：
   - 故意使用錯誤的 EmailJS 參數
   - 確認 mailto 備用方案能正常啟動

3. **使用者體驗測試**：
   - 確認按鈕載入狀態正常顯示
   - 確認成功/失敗訊息正確顯示

## 安全性考量

1. **前端限制**：
   - Public Key 是公開的，任何人都可以看到
   - 建議在 EmailJS 控制台中設定網域白名單

2. **郵件驗證**：
   - 建議在 EmailJS 模板中加入驗證機制
   - 可考慮加入簡單的防濫用機制

3. **後端替代方案**：
   - 若需要更高的安全性，可考慮使用 serverless function
   - 將 EmailJS 金鑰隱藏在後端

## 常見問題

### Q: 為什麼郵件發送失敗？
A: 請檢查：
1. EmailJS 參數是否正確
2. 網路連線是否正常
3. EmailJS 服務是否正常運作

### Q: 如何防止垃圾郵件？
A: 建議：
1. 在 EmailJS 控制台設定網域白名單
2. 設定每日發送限制
3. 加入簡單的驗證機制

### Q: 可以自訂郵件內容嗎？
A: 可以，您可以：
1. 在 EmailJS 控制台修改模板
2. 在程式碼中調整 templateParams 物件
3. 加入更多動態內容

## 支援

如有任何問題，請聯繫管理員：su20050408@gmail.com
