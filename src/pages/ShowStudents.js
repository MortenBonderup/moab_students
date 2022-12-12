import { useParams } from "react-router-dom";
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export default function ShowStudents() {
  const [articles, setArticles] = useState([]);
  const params = useParams();
  useEffect(()=> {
    const articleRef = collection(db, "students");
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

  return (
    <div>{
      articles.length === 0 ? (
      <p>No projects found</p> ):(
        articles.map(({id, project_id, name, imageUrl, createdAt})=> (
          project_id === params.postId ? ( // This is where I match students with projects
          <div className="border mt-3 p-3 bg-light" key={id}>
            <div className="row">
              <div className="col-3">
                <img src={imageUrl} alt="title" style={{height: 180, width:180}} />
              </div>
              <div className="col-9 ps-3">
                <h2>{name}</h2>
                <p>{createdAt.toDate().toDateString()}</p>
                <h4>Project: {project_id}</h4>
              </div>
          </div>
          </div>
          ) : ""
        ))
    )}
    </div> 
  );
}

