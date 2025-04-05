
## 💡 Features (Client Side)

- 📂 Upload files with drag & drop or manual selection
- 🖼 Live previews of images, videos and audio
- ⏬ File download with one click
- ❌ Delete files from Azure Blob Storage
- 📦 Container selection with live update
- 🌘 Responsive dark UI with animated gradient
- 🔍 Modal preview with media player support
- ⚙️ Axios + modular API layer

## 📚 Overview

This frontend is a user-friendly interface built with **React + Vite** to interact with Azure Blob Storage.
It supports full upload → preview → download → delete cycle. Clean, modern UI with a light cyberpunk touch.
Connected to a production-level ASP.NET Core backend. Deployed on Azure Static Web App with GitHub Actions.


# 🌐 Azure Blob Manager — Frontend (React + Vite)

This is the **frontend** part of the Azure Blob Manager project — a modern, responsive interface for managing files in Azure Blob Storage.  
Built with **React** (via **Vite**) and deployed via **Azure Static Web Apps** + **GitHub Actions**.

---

## ⚙️ Features

- 🔄 Upload, download, preview, and delete files in Azure Blob containers
- 📂 Drag-and-drop upload with previews for images, video, and audio
- 🎨 Smooth animated dark theme with gradient background
- 🧠 Smart file-type handling for preview modals
- 📁 Container selection dropdown synced to backend
- 🚀 Deployed to Azure Static Web App with CI/CD

---

## 📁 Project Structure

```
azure-blob-manager/
├── public/
├── src/
│   ├── components/
│   │   └── UploadForm.jsx, FileTable.jsx, ContainerSelector.jsx, PreviewModal.jsx
│   ├── services/
│   │   └── blobService.js
│   ├── App.jsx
│   ├── main.jsx
├── dist/ ← production build (via Vite)
```

---

## 🐛 Common Issues & Fixes

### 🔗 CORS issue
Make sure backend has:
```csharp
builder.Services.AddCors(...);
app.UseCors("AllowAll");
```

### 🌍 Absolute URL bug in production
Change `blobService.js` to use **relative** paths like:
```js
const api = '/api/BlobStorage';
```

### 🧪 Azure Static Web App didn’t auto-refresh after push
➡️ Run a **manual workflow dispatch** in GitHub Actions  
➡️ Or force rebuild: change something like a comment, commit, push.

---

## ☁️ Deployment to Azure Static Web App

### 1. GitHub Action setup
Check `.github/workflows/azure-static-web-apps.yml`:

```yaml
app_location: "/" 
output_location: "dist"
```

### 2. Build
```bash
npm install
npm run build
```

### 3. Push to master (or trigger manually)
Deployment will upload the content from `dist/`.

---

## 📸 Screenshots

> See real-time preview in `PreviewModal` + animated drag & drop zone.

---

## 📦 Tech Stack

- React + Vite
- Azure Static Web Apps
- GitHub Actions
- HTML/CSS/JS (fully custom)