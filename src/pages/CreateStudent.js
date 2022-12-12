
import { ToastContainer } from "react-toastify";
import Students from "../components/Students";
import AddStudent from "../components/AddStudent";

export default function HomePage() {
    return (
        <div className="container">
         <div className="row">
          <div className="col-md-8">
            <Students/>
          </div>
    
          <div className ="col-md-4">
            <AddStudent />
            <ToastContainer />
          </div>
         </div>
        </div>
      );
}