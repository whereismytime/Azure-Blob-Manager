# Azure Blob Manager – Frontend (React + Vite)

## 🧠 Architecture

- React 18 (Vite)
- Axios for API communication
- Component-based modular design
- Centralized `blobService.js` for API
- Responsive dark UI with animated gradients
- Drag-and-drop file input

---

## ✨ Features

- Upload files to Azure Blob (via backend)
- View image/audio/video previews
- Delete files with one click
- Download any blob
- Select container dynamically
- Modal preview player
- Full CI/CD with GitHub Actions

---

## ⚙️ Deployment Instructions (Azure Static Web App)

1. Push to GitHub
2. Static Web App picks up changes via GitHub Actions
3. Workflow builds project and deploys `dist/` folder

---

## 🌍 Environment Logic

```js
const api = import.meta.env.PROD
  ? 'https://your-backend.azurewebsites.net/api/BlobStorage'
  : '/api/BlobStorage'; // for local proxy
```

Make sure `vite.config.js` includes:

```js
server: {
  proxy: {
    '/api': 'https://localhost:5001'
  }
}
```

---

## 🔄 API Integration Flow

1. Select container → call `GET /api/GetContainers`
2. Fetch files via `GET /api/GetBlobFiles`
3. Preview/download/delete calls backend
4. Backend interacts with Azure Blob Storage

---

## 🚀 Extensibility Ideas

- Add multi-file upload
- Add preview slider for images
- Add login/auth with Azure AD or Firebase
- Add progress bars for upload/download