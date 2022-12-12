import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const articleRef = collection(db, "projects");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q,(snapshot)=> {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    })
  },[])

  function handleClick(id) {
    // Look at the app.js page to understand this
    navigate(`posts/${id}`); // -> like "posts/-NDxg_qx1eWfdkNlZ6oj" 
  }

  return (
    <div className="pointer">{
      articles.length === 0 ? (
      <p>No projects found</p> ):(
        articles.map(({id, project_id, description, imageUrl, createdAt})=> (
          <div className="border mt-3 p-3 bg-light" key={id} onClick={() => handleClick(project_id)} >
            <div className="row">
              <div className="col-3">
                <img src={imageUrl} alt="title" style={{height: 180, width:180}} />
              </div>
              <div className="col-9 ps-3">
                <h2>Project id: {project_id}</h2>
                <p>{createdAt.toDate().toDateString()}</p>
                <h4>{description}</h4>
              </div>
          </div>
          </div>
        ))
    )}
    </div> 
  );
}
