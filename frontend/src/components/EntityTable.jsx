import { useContext } from "react";
import {UserContext} from './UserContext'

const EntityTable=()=>{
  console.log("entered")
  const {entities}=useContext(UserContext)
  if(entities) console.log("entities:",entities)
    return (
  <div className="container mx-auto py-8">
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="flex px-4 py-2 bg-gray-900 text-gray-100">
        <div className="w-1/5 text-left">No.</div>
        <div className="w-1/5 text-center">NAME</div>
        <div className="w-2/5 text-center">GENDER</div>
        <div className="w-1/5 text-left">DATE OF BIRTH</div>
        <div className="w-1/5 text-left">AADHAR.NO</div>
      </div>
      <div className="bg-gray-800 text-gray-100">
      {entities.map((item,index)=>(
        <div key={index}>
        <div className="flex px-4 py-2 hover:bg-gray-700">
          <div className="w-1/5 text-left">{index+1}</div>
          <div className="w-1/5 text-center">{item.name}</div>
          <div className="w-2/5 text-center">{item.gender}</div>
          <div className="w-1/5 text-left">{item.dob}</div>
          <div className="w-1/5 text-left">{item.aadhar_no}</div>
        </div>
       </div> 
    ))}
      </div>
    </div>
  </div>  
    );
}

export default EntityTable;