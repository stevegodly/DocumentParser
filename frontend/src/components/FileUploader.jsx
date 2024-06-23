import { useContext, useState } from 'react';
import axios from 'axios'
import {UserContext} from './UserContext'
import Modal from './Modal';
import Loader from './loader'
import UploadModal from './UploadModal';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [document,setDocument]=useState(" ")

  const {setEntities}=useContext(UserContext)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  

  const fetchEntities = async () => {
    setLoading(true)
    const response = await axios.get("http://127.0.0.1:5000/retrieve");
    const data = response.data;
    console.log("data fetched:",data)
    setEntities(data);
    setLoading(false)
    console.log("entities fetched:",data)
  }

  const sendDataToServer = async (ev) => {
    setLoading(true)
    ev.preventDefault();
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false)
  }

  const classifyFile = async (ev) => {
    ev.preventDefault();
    setLoading(true)
    if (!selectedFile) {
        console.error("No file selected");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const response = await fetch("http://127.0.0.1:5000/classify", {
            method: "POST",
            body: formData
        });
        const result=await response.json();
        setDocument(result)
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
    setLoading(false)
    setShowModal(true)
  }

  return (
    
    <div className="max-w-md mx-auto">
      {showModal && <Modal document={document} onCloseModal={() => setShowModal(false)} />}
      {loading && (<Loader/>)}
      <UploadModal/>
    </div>
  );
};

export default FileUploader;