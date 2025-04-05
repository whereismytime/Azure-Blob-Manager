// English + Українські коментарі
import { useEffect, useState } from 'react';
import { getBlobFiles, deleteBlob, downloadBlob } from '../services/blobService';
import PreviewModal from './PreviewModal';

export default function FileTable({ container }) {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState({ url: '', type: '' }); // 🌌 Модалка

  // 📦 Загружаем файлы
  const fetchFiles = async () => {
    const res = await getBlobFiles(container);
    setFiles(res.data || []);
  };

  // 🗑 Удаление файла
  const handleDelete = async (file) => {
    await deleteBlob(container, file);
    fetchFiles();
  };

  // 💾 Скачивание
  const handleDownload = async (file) => {
    const res = await downloadBlob(container, file);
    const blob = new Blob([res.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // 🧠 Превью по типу
  const renderPreview = (file) => {
    const ext = file.split('.').pop().toLowerCase();
    const url = `https://studentst.blob.core.windows.net/${container}/${file}`;
    const openPreview = (type) => setPreview({ url, type });
  
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return (
        <img
          src={url}
          alt={file}
          title={file}
          width="90" // увеличено с 60
          style={{ cursor: 'pointer', borderRadius: '6px' }}
          onClick={() => openPreview('image')}
        />
      );
    }
    if (['mp3', 'wav'].includes(ext)) {
      return <button onClick={() => openPreview('audio')}>🎧 Play</button>;
    }
    if (['mp4', 'webm'].includes(ext)) {
      return (
        <video
          src={url}
          width="100"
          style={{ cursor: 'pointer', borderRadius: '6px' }}
          onClick={() => openPreview('video')}
        />
      );
    }
    return <span style={{ opacity: 0.6 }}>📄 No preview</span>;
  };
  

  useEffect(() => {
    if (container) fetchFiles();
  }, [container]);

  return (
    <div>
      <h3>🗂 Files in "{container}"</h3>

      {/* 🪟 Модалка предпросмотра */}
      {preview.url && (
        <PreviewModal
          fileUrl={preview.url}
          fileType={preview.type}
          onClose={() => setPreview({ url: '', type: '' })}
        />
      )}

      {files.length === 0 ? (
        <p style={{ opacity: 0.5 }}>⚠️ No files in this container / Файли відсутні</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Preview / Превʼю</th>
              <th>File Name / Назва файлу</th>
              <th>Actions / Дії</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file}>
                <td>{renderPreview(file)}</td>
                <td>{file}</td>
                <td>
                  <button onClick={() => handleDownload(file)}>⬇ Download</button>
                  <button onClick={() => handleDelete(file)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
