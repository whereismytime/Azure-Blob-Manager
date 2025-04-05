// src/components/ContainerSelector.jsx

import { useEffect, useState } from 'react';
import { getContainers } from '../services/blobService';

const ContainerSelector = ({ selectedContainer, onSelect }) => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await getContainers();
        setContainers(response.data);
      } catch (error) {
        console.error('Failed to load containers', error);
      }
    };

    fetchContainers();
  }, []);

  return (
    <div className="container-selector">
      <label htmlFor="containerSelect">Choose a container:</label>
      <select
        id="containerSelect"
        value={selectedContainer}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Select --</option>
        {containers.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContainerSelector;
