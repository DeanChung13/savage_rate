# Savage Rate

一個基於深度學習的顏值評分系統，以毒舌風格給出評價。

## 功能特點

- 使用自定義 CNN 模型進行顏值評分
- 分數範圍從 1-5 分，精確到小數點後一位
- 根據分數提供毒舌風格的中文評論
- 支持多種圖片輸入格式（JPG、PNG、WebP）
- RESTful API 接口，方便整合
- 美觀的前端界面，即時顯示結果

## 在線演示

- 前端：https://savage-rate.vercel.app
- 後端 API：https://savage-rate-backend.onrender.com
- API 文檔：https://savage-rate-backend.onrender.com/docs

## 系統要求

### 後端
- Python 3.8+
- PyTorch 2.2.0
- CUDA（可選，用於 GPU 加速）
- FastAPI 0.109.2
- 其他依賴見 requirements.txt

### 前端
- Node.js 18+
- Next.js 14+
- React 18+
- TypeScript 5+

## 安裝步驟

1. 克隆專案
```bash
git clone https://github.com/yourusername/savage-rate.git
cd savage-rate
```

2. 安裝後端依賴
```bash
python -m venv venv
source venv/bin/activate  # Windows 使用: venv\Scripts\activate
pip install -r requirements.txt
```

3. 安裝前端依賴
```bash
cd frontend
npm install
```

## 專案結構
```
savage-rate/
├── backend/
│   ├── models/
│   │   ├── beauty_model.py    # 模型定義
│   │   └── best_model.pth     # 預訓練模型權重
│   ├── comment_template.py     # 評論模板
│   └── main.py                # FastAPI 後端服務
├── frontend/
│   ├── src/                   # 源代碼目錄
│   │   ├── components/        # React 組件
│   │   ├── app/              # Next.js 頁面
│   │   ├── styles/           # CSS 樣式文件
│   │   └── utils/            # 工具函數
│   ├── public/               # 靜態資源
│   ├── next.config.js        # Next.js 配置
│   ├── tsconfig.json         # TypeScript 配置
│   └── package.json          # 前端依賴配置
├── requirements.txt           # Python 依賴
└── README.md                 # 項目文檔
```

## 本地開發

### 後端開發
1. 啟動後端服務
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. 訪問 API 文檔：http://localhost:8000/docs

### 前端開發
1. 啟動開發服務器
```bash
cd frontend
npm run dev
```

2. 訪問：http://localhost:3000

## 部署說明

### Vercel 部署前端

1. 在 Vercel 中導入專案

2. 配置部署設置：
   - 框架預設：Next.js
   - 根目錄：`frontend`
   - 構建命令：`npm run build`
   - 輸出目錄：`.next`
   - Node.js 版本：18.x

3. 環境變量設置：
   ```
   # 開發環境
   NEXT_PUBLIC_API_URL=http://localhost:8000

   # 生產環境
   NEXT_PUBLIC_API_URL=https://savage-rate-backend.onrender.com
   ```

4. 部署後檢查：
   - 確認 `routes-manifest.json` 存在於 `.next` 目錄
   - 檢查構建日誌中的錯誤信息
   - 驗證 API 端點配置正確

### 後端部署

1. 準備部署環境：
   - 安裝所需的 Python 版本和依賴
   - 配置 CUDA 環境（如需 GPU）
   - 設置環境變量

2. 配置生產環境：
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

3. 使用 Nginx 反向代理（推薦）：
```nginx
server {
    listen 80;
    server_name savage-rate-backend.onrender.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # CORS 設置
        add_header 'Access-Control-Allow-Origin' 'https://savage-rate.vercel.app';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    }
}
```

## API 使用

### 圖片評分接口

- **端點**: `/predict`
- **方法**: POST
- **Content-Type**: multipart/form-data
- **參數**: file（圖片文件）
- **限制**: 
  - 最大文件大小：5MB
  - 支持格式：JPG、PNG、WebP

```bash
# 本地環境
curl -X POST -F "file=@/path/to/image.jpg" http://localhost:8000/predict

# 生產環境
curl -X POST -F "file=@/path/to/image.jpg" https://savage-rate-backend.onrender.com/predict
```

### 響應格式

```json
{
    "score": 4.5,        // 顏值評分（1.0-5.0）
    "comment": "string"  // 對應的評論
}
```

## 錯誤處理

系統會處理以下錯誤情況：
- 無效的圖片格式
- 圖片大小超過限制
- 圖片處理失敗
- 模型推理錯誤

所有錯誤都會返回適當的 HTTP 狀態碼和錯誤信息。

## 開發者注意事項

1. 模型文件
   - 預訓練模型需要手動添加到 `backend/models/` 目錄
   - 模型文件預設被 .gitignore 忽略

2. 環境變量
   - 後端：使用 `.env` 文件配置
   - 前端開發：使用 `.env.local` 文件
   - 前端生產：在 Vercel 中配置

3. 代碼風格
   - Python：遵循 PEP 8 規範
   - TypeScript：使用 ESLint 配置
   - 提交前運行代碼格式化

4. 常見問題排查
   - 確保 `src` 目錄結構正確
   - 檢查 `next.config.js` 配置
   - 確保環境變量正確設置
   - 檢查 API 端點配置
   - 確認 `.next` 目錄中的構建文件

## 貢獻指南

1. Fork 本專案
2. 創建特性分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 授權協議

本項目採用 MIT 授權協議 - 詳見 LICENSE 文件 