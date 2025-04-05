export default function PreviewModal({ fileUrl, fileType, onClose }) {
    if (!fileUrl) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="preview-wrapper">
            <button className="close-btn-inside" onClick={onClose}>✖</button>
  
            {fileType === 'image' && (
              <img src={fileUrl} alt="preview" className="preview-media" />
            )}
  
            {fileType === 'audio' && (
              <audio controls autoPlay src={fileUrl} className="audio-player" />
            )}
  
            {fileType === 'video' && (
              <video
                controls
                autoPlay
                src={fileUrl}
                className="preview-media"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  