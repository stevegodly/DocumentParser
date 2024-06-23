import { UserContextProvider } from '../components/UserContext';
import Form from '../components/Form'
import UploadModal from '../components/UploadModal';


const Home = () => {
  return(
    <UserContextProvider>
      <div className="flex-col bg-slate-900 min-h-screen w-screen">
        <div className='pt-20'>
          <h1 className="text-[42px] w-full mx-auto text-center p-[10px] pt-[15px] pb-[15px] text-slate-200 font-bold">
            Parses And Classifies Pan And Aadhar Documents
          </h1>
          <h2 className="text-center mx-auto mb-5 text-neutral-400 font-normal tracking-tighter text-2xl">You Can Add Aadhar And Pan Documents For Entity Recognition.</h2>
        </div>
        <div className='p-20 flex justify-evenly '>
          <Form/>
          <UploadModal/>
        </div>
      </div>
      
    </UserContextProvider> 
  )
};

export default Home
