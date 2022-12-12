import Articles from "../components/Projects"
import AddArticle from "../components/AddProject"; 
import { ToastContainer } from "react-toastify";

export default function HomePage() {
    return (
        <div className="container">
         <div className="row">
          <div className="col-md-8">
            <Articles/>
          </div>
    
          <div className ="col-md-4">
            <AddArticle/>
            <ToastContainer />
          </div>
         </div>
        </div>
      );
}