import { useState } from 'react';
import axios from 'axios';
import {API_URL} from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //form inputs states
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check if all fields are provided
    if (!username || !password) {
      toast("Provide all fields",{
        position: "top-right",
        hideProgressBar : false,
        // theme: "dark",
        type: "error",
        closeOnClick: true,
      })
      return
    }
    setLoading(true)
    try {
      const response = await axios.post(API_URL+'/auth/signin', {
        username,
        password,
      });
      const token = response?.data?.token;
      //console.log(response?.data)
      localStorage.setItem('token', token);   //store token in local storage
      if (token) {
        //clear form inputs
        setUsername('');
        setPassword('');
  
        setLoading(false);
        //redirect to dashboard
        navigate('/dashboard');
      }
      else{
        toast(response?.data?.message,{
          position: "top-right",
          hideProgressBar : false,
          // theme: "dark",
          type: "error",
          closeOnClick: true,
        })
      }
    } catch (error) {
      console.log('catch error', error);
      setLoading(false);
      toast(error?.response?.data?.message || "An error occured",{
        position: "top-right",
        hideProgressBar : false,
        // theme: "dark",
        type: "error",
        closeOnClick: true,
      })
    }
  };

  return (
  <div>
  <ToastContainer />
<div className="flex flex-col items-center mt-28 border rounded-md shadow-lg w-full md:w-[35vw] mx-auto pt-8 pb-12 px-4 md:px-16">
    <h1 className='font-black text-black mb-4 text-xl text-center'>Log into your account</h1>
  <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <input
          type="text"
          id="text"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full mb-6 flex justify-center mx-auto text-sm px-4 py-3 text-white bg-emerald-500 rounded-xl hover:bg-emerald-700"
        style={{ backgroundColor: '#10B981' }}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    <p className="mt-4 text-sm text-center">
      Don't have an account? <a className='text-[#10B981] font-bold' href="/signup">Signup</a>.
    </p>
  </div>
</div>

  );
};

export default Login;
