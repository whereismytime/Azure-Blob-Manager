import axios from 'axios';

const api = '/api/BlobStorage';

export const getContainers = () => axios.get(`${api}/GetContainers`);
export const getBlobFiles = (container) => axios.get(`${api}/GetBlobFiles`, { params: { containerName: container } });
export const downloadBlob = (container, file) => axios.get(`${api}/DownloadBlobFile`, { params: { containerName: container, fileName: file }, responseType: 'blob' });
export const deleteBlob = (container, file) => axios.delete(`${api}/DeleteBlobFile`, { params: { containerName: container, fileName: file } });
export const uploadBlob = (container, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${api}/UploadBlobFile?containerName=${container}`, formData);
};
