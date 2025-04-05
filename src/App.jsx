import { useState } from 'react';
import UploadForm from './components/UploadForm';
import FileTable from './components/FileTable';
import ContainerSelector from './components/ContainerSelector';
import './App.css'; // 👈 Подключаем стили


export default function App() {
  const [container, setContainer] = useState('');

  return (
    <div>
      <h1>Azure Blob Manager</h1>
      <ContainerSelector onSelect={setContainer} />
      {container && (
        <>
          <UploadForm container={container} onUpload={() => {}} />
          <FileTable container={container} />
        </>
      )}
    </div>
  );
}
