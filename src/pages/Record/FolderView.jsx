import { useState, useEffect } from 'react';
// import axios from 'axios';
import './folderview.scss';
import folderImage from '../../assets/Folder.png';
import newFolderImage from '../../assets/NewFolder.png';

function FolderView() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const initialFolders = [
    { id: 1, name: '인생책 모음', created_at: '2024-11-06T18:58:18Z', image: folderImage },
    { id: 2, name: '2024 여름', created_at: '2024-11-06T19:07:05Z', image: folderImage },
    { id: 3, name: '2024 가을', created_at: '2024-11-06T19:07:15Z', image: folderImage },
    { id: 4, name: '2024 겨을', created_at: '2024-11-06T19:07:15Z', image: folderImage },
    { id: 5, name: '2025 봄', created_at: '2024-11-06T19:07:15Z', image: folderImage },
    { id: 6, name: '2025 여름', created_at: '2024-11-06T19:07:15Z', image: folderImage },
  ];

  useEffect(() => {
    // axios.get('/your-api-endpoint')
    //   .then(response => {
    //     const folderData = response.data.map(folder => ({
    //       ...folder,
    //       image: folder.name === '새 파일' ? '../../assets/NewFolder.png' : '../../assets/Folder.png'
    //     }));
    //     setFolders(folderData);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching folders:', error);
    //   });
    setFolders(initialFolders);
  }, []);

  // const handleAddFolder = async () => {
  //   try {
  //     const response = await axios.post('/your-api-endpoint', { name: '새 파일' });
      
  //     const newFolder = {
  //       ...response.data,
  //       image: '../../assets/NewFolder.png',
  //     };

  //     setFolders([...folders, newFolder]);
  //   } catch (error) {
  //     console.error('Error adding new folder:', error);
  //   }
  // };

  const handleAddFolderClick = () => {
    setIsAddingFolder(true);
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: folders.length + 1,
        name: newFolderName,
        created_at: new Date().toISOString(),
        image: folderImage,
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsAddingFolder(false);
    }
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
