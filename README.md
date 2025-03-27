# Savage Rate

一個基於深度學習的顏值評分系統，以毒舌風格給出評價。

## 功能特點

- 使用自定義 CNN 模型進行顏值評分
- 分數範圍從 1-5 分，精確到小數點後一位
- 根據分數提供毒舌風格的中文評論
- 支持多種圖片輸入格式（JPG、PNG、WebP）
- RESTful API 接口，方便整合
- 美觀的前端界面，即時顯示結果

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
│   ├── components/            # React 組件
│   ├── pages/                 # Next.js 頁面
│   └── styles/               # CSS 樣式文件
├── requirements.txt           # Python 依賴
└── README.md                 # 項目文檔
```

## 使用說明

1. 啟動後端服務
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. 啟動前端開發服務器
```bash
cd frontend
npm run dev
```

3. 訪問應用
- 前端界面：http://localhost:3000
- API 文檔：http://localhost:8000/docs

## API 使用

### 圖片評分接口

- **端點**: `/predict`
- **方法**: POST
- **Content-Type**: multipart/form-data
- **參數**: file（圖片文件）

```bash
# 使用 curl 測試
curl -X POST -F "file=@/path/to/image.jpg" http://localhost:8000/predict
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
- 圖片大小超過限制（最大 5MB）
- 圖片處理失敗
- 模型推理錯誤

所有錯誤都會返回適當的 HTTP 狀態碼和錯誤信息。

## 日誌記錄

- 所有操作日誌保存在 `model.log`
- 包含模型初始化、預測請求等信息
- 錯誤日誌包含詳細的堆棧跟踪

## 開發者注意事項

1. 模型文件
   - 預訓練模型需要手動添加到 `backend/models/` 目錄
   - 模型文件預設被 .gitignore 忽略

2. 環境變量
   - 後端：使用 `.env` 文件配置（需自行創建）
   - 前端：使用 `.env.local` 文件配置

3. 代碼風格
   - Python：遵循 PEP 8 規範
   - TypeScript：使用 ESLint 配置
   - 提交前運行代碼格式化

## 貢獻指南

1. Fork 本專案
2. 創建特性分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 授權協議

本項目採用 MIT 授權協議 - 詳見 LICENSE 文件 