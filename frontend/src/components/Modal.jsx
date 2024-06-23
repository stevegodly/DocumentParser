
const Modal = ({document,onCloseModal}) => {

  return (
    <div
      className='fixed bg-opacity-60 bg-gray-500 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onCloseModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] h-[400px] bg-gray-300 rounded-xl p-4 flex flex-col relative'
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
        
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-center font-bold text-sm">
            Uploaded document is: {JSON.stringify(document)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;