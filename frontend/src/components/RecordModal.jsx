
const Modal = ({aadharEntities,panEntities,onCloseModal}) => {
    console.log("aadharEntities:",aadharEntities)
    console.log("panEntities:",panEntities)
    return (
      <div
        className='fixed bg-opacity-70 bg-gray-800 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
        onClick={onCloseModal}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className='w-[700px] h-[600px] bg-gray-300 rounded-xl p-4 flex flex-col relative'
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onCloseModal}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {(typeof myVariable === 'undefined' && Object.keys(aadharEntities).length>0) && <div className="flex flex-col justify-center items-center">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-bold">Aadhar</h3>
            </div>
            <img src={aadharEntities.image_path} alt="hello" height="200px" width="300px" />
            <div className="relative p-6 flex-auto">
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{aadharEntities.name}</p>
                </div>
              </div>
              <div className=" flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                    <label className="block text-sm font-medium text-gray-300">Aadhar No.</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                    <p className="text-sm font-medium text-gray-900">{aadharEntities.aadhar_no}</p>
                </div>
                </div>
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Gender</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{aadharEntities.gender}</p>
                </div>
              </div>
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Date Of Birth</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{aadharEntities.dob}</p>
                </div>
              </div>
            </div>
          </div>
        }
        {(Object.keys(panEntities).length>0) && <div className="flex flex-col justify-center items-center">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-bold">Pan</h3>
            </div>
            <img src={panEntities.image_path} alt="hello" height="200px" width="300px" />
            <div className="relative p-6 flex-auto">
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{panEntities.name}</p>
                </div>
              </div>
              <div className=" flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                    <label className="block text-sm font-medium text-gray-300">Father's Name</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                    <p className="text-sm font-medium text-gray-900">{panEntities.father_name}</p>
                </div>
                </div>
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Pan</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{panEntities.pan}</p>
                </div>
              </div>
              <div className="flex justify-evenly mb-4">
                <div className="flex justify-center bg-gray-800 rounded-md overflow-hidden shadow-lg w-[160px] p-2">
                  <label className="block text-sm font-medium text-gray-300">Date Of Birth</label>
                </div>
                <div className="flex justify-center bg-gray-400 rounded-md overflow-hidden shadow-lg w-[280px] p-2">
                  <p className="text-sm font-medium text-gray-900">{panEntities.dob}</p>
                </div>
              </div>
            </div>
          </div>} 
        </div>
      </div>
    );
  };
  
  export default Modal;