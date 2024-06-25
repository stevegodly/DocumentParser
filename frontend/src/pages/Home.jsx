import { UserContextProvider } from '../components/UserContext';
import Form from '../components/Form'
import UploadModal from '../components/UploadModal';
import {Link} from 'react-router-dom'
import Logo from '../assets/logo-color.png'


const Home = () => {
  return(
    <UserContextProvider>
      <div className="flex-col bg-slate-900 min-h-screen w-screen">
        <div className='pt-4'>
          <img src={Logo} alt="Logo" className='w-20 h-20 mx-auto rounded-3xl'/>
          <h1 className="text-[42px] w-full mx-auto text-center p-[10px] pt-[15px] pb-[15px] text-slate-200 font-bold">
            Parses And Classifies Pan And Aadhar Documents
          </h1>
          <h2 className="text-center mx-auto mb-5 text-neutral-400 font-normal tracking-tighter text-2xl">You Can Add Aadhar And Pan Documents For Entity Recognition.</h2>
        </div>
        <div className='pt-20 flex justify-evenly '>
          <Form/>
          <UploadModal/>
        </div>
        <div className='flex flex-col'>
          <h2 className="fixed top-50 right-20 text-center mx-auto mb-5 text-neutral-400 font-normal tracking-tighter text-xl">
              To Access Aadhar Entity Table :
              <Link to='/aadhartable' className="mx-3 text-blue-500 hover:text-blue-700">
                Click here
            </Link>
            or to access Pan Entity Table :
            <Link to='/pantable' className="mx-3 text-blue-500 hover:text-blue-700">
                Click here
            </Link>
          </h2>
          
        </div>    
      </div>
      
    </UserContextProvider> 
  )
};

export default Home
