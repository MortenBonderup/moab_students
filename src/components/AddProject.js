import React, {useState} from 'react'
import {Timestamp, collection, addDoc} from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { storage, db} from "../firebaseConfig"
import { toast } from 'react-toastify'

export default function AddArticle() {
  const [formData, setFormData] = useState({
    project_id: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  })

  const [progress, setProgress] = useState(0);

  const handleChange=(e)=> {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleImageChange=(e)=> {
    setFormData({...formData, image:e.target.files[0]});
  }

  const handlePublish = () => {
    if (!formData.project_id || !formData.description || !formData.image){
      alert("Please fill all the fields")
      return;
    }
    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    
    uploadImage.on("state_changed", (snapshot) => {
      const progressPercent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      
      setProgress(progressPercent);
    },
    (err)=>{
      console.log(err)
    },
    ()=>{
      setFormData({
        project_id: "",
        description: "",
        image: "",
      })
      getDownloadURL(uploadImage.snapshot.ref)
      .then((url)=> {
        const articleRef = collection(db, "projects")
        addDoc(articleRef, {
          project_id: formData.project_id,
          description: formData.description,
          imageUrl: url,
          createdAt: Timestamp.now().toDate(),
        })
        .then(()=>{
          toast("Project added successfully", {type: "success"});
          setProgress(0)
        })
        .catch(err=> {
          toast("Error adding project", {type: "error"});
        })
      })
    }
    );
  } 


  return (
    <div className="border p-3 mt-3 bg-light" style={{position: "fixed"}}>
      <h2>Create project</h2>
      <label htmlFor="">Project id</label>
      <input type="text" name="project_id" className="form-control" value={formData.project_id} onChange={(e)=>handleChange(e)}/>
      <label htmlFor="">Description</label>
      <textarea name="description" className="form-control" value={formData.description} onChange={(e)=>handleChange(e)}/>
      <label htmlFor="">Image</label>
      <input type="file" name="image" accept="image/*" className="form-control" onChange={(e)=>handleImageChange(e)}/>
      
      {progress === 0 ? null : (
      <div className="progress">
        <div className="progress-bar progress-bar-striped mt-2" style={{width: `${progress}%`}}>
            {`uploading image ${progress}%`}
        </div>
      </div>
      )}

      <button className="form-control btn-primary mt-2" onClick={handlePublish}>Publish</button>
    </div>
  )
}
