import { useState,useEffect } from "react";
import axios from 'axios'

const PanTable=()=>{
  const [entities,setEntities]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:5000/retrieve?type=pan");
            const data = response.data;
            console.log("data fetched:", data);
            setEntities(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
},[]);
  console.log("entered")
  if(entities) console.log("entities:",entities)
    return (
  <div className="container mx-auto py-8">
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="flex px-4 py-2 bg-gray-900 text-gray-100">
        <div className="w-1/5 text-left">No.</div>
        <div className="w-1/5 text-center">NAME</div>
        <div className="w-2/5 text-center">FATHER'S NAME</div>
        <div className="w-1/5 text-left">DATE OF BIRTH</div>
        <div className="w-1/5 text-left">PAN</div>
      </div>
      <div className="bg-gray-800 text-gray-100">
      {entities.map((item,index)=>(
        <div key={index}>
        <div className="flex px-4 py-2 hover:bg-gray-700">
          <div className="w-1/5 text-left">{index+1}</div>
          <div className="w-1/5 text-center">{item.name}</div>
          <div className="w-2/5 text-center">{item.father_name}</div>
          <div className="w-1/5 text-left">{item.dob}</div>
          <div className="w-1/5 text-left">{item.pan}</div>
        </div>
       </div> 
    ))}
      </div>
    </div>
  </div>  
    );
}

export default PanTable;