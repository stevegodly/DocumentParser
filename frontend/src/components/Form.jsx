import { useState ,useContext} from 'react';
import {UserContext} from './UserContext'
import axios from 'axios'
import RecordModal from './RecordModal'

const DarkForm = () => {
  const [name, setName] = useState('');
  const [loading,setLoading]=useState(false)
  const [adhno, setAdhno] = useState('');
  const [panno, setPanno] = useState('');
  const [showModal,setShowModal]=useState(true)
  const [panEntities,setPanEntities]=useState([])
  const [aadharEntities,setAadharEntities]=useState([])

  const Search=async(ev)=>{
    ev.preventDefault()
    try{
        setLoading(true)
        const response = await axios.get(`http://127.0.0.1:5000/get_record/?name=${name}&aadhar_no=${adhno}&pan_no=${panno}`);
        const data = response.data;
        console.log("data fetched:",data)
          setAadharEntities(data[0][0]);
          setPanEntities(data[1][0])
        setLoading(false)
        setShowModal(true)
        console.log("Records fetched:",data)
    }
    catch(err){
        console.error("Error:", err);
    }
  }


  return (
    <div className="dark:bg-gray-900 h-full w-[500px] flex items-center justify-center">
        {showModal && <RecordModal aadharEntities={aadharEntities}  panEntities={panEntities} onCloseModal={() => setShowModal(false)}/>}
      <form className="bg-gray-800 p-6 rounded-lg space-y-9 h-[500px]">
        <label className="mt-5 text-xl text-gray-400 font-semi-bold">Check for records by entering any of the fields :</label>
        <div className="mt- space-y-1">
          <label className="text-gray-300">Name </label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-2 border-gray-700 bg-gray-900 text-white"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-300">Aadhar Number</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-700 bg-gray-900 text-white"
            placeholder="Enter Your Aadhar Number"
            value={adhno}
            onChange={(e) => setAdhno(e.target.value)}
          />
          {adhno.length > 16 && (
            <p className="text-red-500">Whoops, the number cannot be more than 16 digits</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-gray-300">Pan Number</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-700 bg-gray-900 text-white"
            placeholder="Enter Your Pan Number"
            value={panno}
            onChange={(e) => setPanno(e.target.value)}
          />
        </div>
        <button onClick={Search} className="w-full cursor-pointer bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Search</button>
      </form>
    </div>
  );
};

export default DarkForm;