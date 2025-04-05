// English + Українські коментарі
import { useState } from 'react';
import { uploadBlob } from '../services/blobService';

export default function UploadForm({ container, onUpload }) {
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!container || files.length === 0) return;

    for (const file of files) {
      await uploadBlob(container, file);
    }
    setFiles([]); // 🧹 Очищаємо вибрані файли
    onUpload();   // 🔁 Оновлюємо список
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...e.dataTransfer.files]);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <form onSubmit={handleUpload}>
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="icon">📤 Upload File</div>
        <div className="hint">Click or drag & drop files here</div>
      </div>

      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {files.length > 0 && (
        <div className="preview-list">
          {Array.from(files).map((file, idx) => {
            const ext = file.name.split('.').pop().toLowerCase();
            const previewURL = URL.createObjectURL(file);

            return (
              <div key={idx} style={{ textAlign: 'center', maxWidth: '150px' }}>
                {['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) && (
                  <img src={previewURL} alt={file.name} style={{ width: '100%', borderRadius: '8px' }} />
                )}
                {['mp3', 'wav'].includes(ext) && (
                  <audio controls src={previewURL} style={{ width: '100%' }} />
                )}
                {['mp4', 'webm'].includes(ext) && (
                  <video controls src={previewURL} style={{ width: '100%' }} />
                )}
                {!['jpg','jpeg','png','gif','webp','mp3','wav','mp4','webm'].includes(ext) && (
                  <span style={{ fontSize: '0.8rem' }}>📄 {file.name}</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button type="submit" disabled={!files.length}>
        Upload / Завантажити
      </button>
    </form>
  );
}
