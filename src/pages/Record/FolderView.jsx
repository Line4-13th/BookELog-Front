import { useState, useEffect } from 'react';
import axios from 'axios';
import './folderview.scss';
import folderImage from '../../assets/Folder.png';
import newFolderImage from '../../assets/NewFolder.png';
import API_URL from '../../../API_URL';

function FolderView() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/reading_log/folders/`)
      .then(response => {
        const folderData = response.data.map(folder => ({
          ...folder,
          image: folder.name === '새 파일' ? newFolderImage : folderImage,
        }));
        setFolders(folderData);
        console.log('Fetched folder data:', folderData);
      })
      .catch(error => {
        console.error('Error fetching folders:', error);
      });
  }, []);

  const handleAddFolder = async () => {
    if (newFolderName.trim() === '') return;

    try {
      const response = await axios.post(`${API_URL}/reading_log/folders/create_folder`, {
        name: '새 파일', // 항상 "새 파일"로 이름을 초기화하여 요청
      });

      const newFolder = {
        ...response.data,
        name: newFolderName || response.data.name, // 새 폴더 이름 설정
        image: folderImage, // 기본 폴더 이미지로 설정
      };

      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsAddingFolder(false);
    } catch (error) {
      console.error('새 폴더 생성 오류: ', error);
    }
  };

  const handleAddFolderClick = () => {
    setIsAddingFolder(true);
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  return (
    <div className="folder-view">
      {folders.map((folder) => (
        <div key={folder.id} className="folder">
          <div
            className="folder-icon"
            style={{ backgroundImage: `url(${folder.image})` }}
          ></div>
          <p className="folder-name">{folder.name}</p>
        </div>
      ))}
      {isAddingFolder ? (
        <div className="folder new-folder">
          <div
            className="folder-icon"
            style={{ backgroundImage: `url(${newFolderImage})` }}
          ></div>
          <input
            type="text"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
            placeholder="새 파일"
            onBlur={handleAddFolder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddFolder();
              }
            }}
            autoFocus
            className="new-folder-input"
          />
        </div>
      ) : (
        <div className="folder new-folder" onClick={handleAddFolderClick}>
          <div
            className="folder-icon"
            style={{ backgroundImage: `url(${newFolderImage})` }}
          ></div>
          <p className="folder-name">새 파일</p>
        </div>
      )}
    </div>
  );
}

export default FolderView;
