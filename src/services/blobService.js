import axios from 'axios';

// 👇 Автоматический выбор адреса API в зависимости от среды
const api = import.meta.env.PROD
  ? 'https://blobsapp-dddrgbehh2fsdphw.canadacentral-01.azurewebsites.net/api/BlobStorage'
  : '/api/BlobStorage';

export const getContainers = () => axios.get(`${api}/GetContainers`);
export const getBlobFiles = (container) =>
  axios.get(`${api}/GetBlobFiles`, { params: { containerName: container } });

export const downloadBlob = (container, file) =>
  axios.get(`${api}/DownloadBlobFile`, {
    params: { containerName: container, fileName: file },
    responseType: 'blob',
  });

export const deleteBlob = (container, file) =>
  axios.delete(`${api}/DeleteBlobFile`, {
    params: { containerName: container, fileName: file },
  });

export const uploadBlob = (container, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${api}/UploadBlobFile?containerName=${container}`, formData);
};
