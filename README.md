# 台股證交所 API 代理伺服器

解決瀏覽器 CORS 安全限制，讓您的台股儀表板能直接呼叫證交所 API。

---

## 部署步驟（免費，約 5 分鐘）

### 第一步：建立 GitHub 帳號（已有可跳過）
前往 https://github.com 註冊免費帳號。

### 第二步：建立 Vercel 帳號（已有可跳過）
前往 https://vercel.com 用 GitHub 帳號登入。

### 第三步：上傳這個資料夾到 GitHub
1. 登入 GitHub，點右上角「+」→「New repository」
2. Repository name 填：twse-proxy
3. 選 Public，按「Create repository」
4. 按「uploading an existing file」
5. 把這個資料夾內的三個檔案全部拖進去：
   - api/proxy.js
   - vercel.json
   - package.json
6. 按「Commit changes」

### 第四步：部署到 Vercel
1. 前往 https://vercel.com/dashboard
2. 點「Add New Project」
3. 選剛建立的「twse-proxy」repository
4. 直接按「Deploy」（不需要修改任何設定）
5. 等待約 1 分鐘，部署完成

### 第五步：取得您的代理網址
部署完成後，Vercel 會給您一個網址，格式如下：
https://twse-proxy-你的帳號.vercel.app

---

## 使用方式

代理 API 的呼叫格式：
```
GET https://twse-proxy-你的帳號.vercel.app/api/proxy?url=<目標網址>
```

範例 - 查詢台積電即時股價：
```
https://twse-proxy-你的帳號.vercel.app/api/proxy?url=https%3A%2F%2Fmis.twse.com.tw%2Fstock%2Fapi%2FgetStockInfo.jsp%3Fex_ch%3Dtse_2330.tw%26json%3D1%26delay%3D0
```

---

## 支援的來源網域

- mis.twse.com.tw（盤中即時報價）
- openapi.twse.com.tw（上市公司歷史/除權息）
- www.twse.com.tw（證交所官網資料）
- www.tpex.org.tw（櫃買中心）
- openapi.taifex.com.tw（期交所）

---

## 將代理網址填入儀表板

取得 Vercel 網址後，在儀表板設定畫面填入即可，儀表板會自動透過代理取得真實資料。
