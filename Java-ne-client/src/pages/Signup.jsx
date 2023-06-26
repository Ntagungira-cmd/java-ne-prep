import { useState } from 'react';
import axios from 'axios';
import {API_URL} from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  //form inputs states
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    //handling form submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      //check if all fields are provided
      if (!name || !password || !email || !confirmPassword ) {
        toast("Provide all fields",{
          position: "top-right",
          hideProgressBar : false,
          // theme: "dark",
          type: "error",
          closeOnClick: true,
        })
        return;
      }
      //check if passwords match
      if (password !== confirmPassword) {
          toast("Passwords don't match",{
            position: "top-right",
            hideProgressBar : false,
            // theme: "dark",
            type: "error",
            closeOnClick: true,
          })
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(API_URL+'/auth/signup', {
          name,
          email,
          phone,
          password,
        });
        console.log(response?.data)
        if (response?.data?.message === 'User registered successfully!') {
          toast("Successfully created your account",{
            position: "top-right",
            hideProgressBar : false,
            // theme: "dark",
            type: "success",
            closeOnClick: true,
          })
          //clear form inputs
          setEmail('');
          setPassword('');
          setName('');
          setConfirmPassword('');
    
          setLoading(false);
          //redirect to login
          navigate('/login');
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
    <div className='pb-12'>
  <ToastContainer/>
  <div className="flex flex-col items-center mt-8 border rounded-md shadow-lg w-full md:w-[35vw] mx-auto py-6 px-4 md:px-16">
    <h1 className='font-black text-black mb-4 text-xl text-center'>Create account</h1>
  <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <input
          type="text"
          id="fullname"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          type="email"
          id="email"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <div className="mb-6">
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
      <div className="mb-8">
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full mb-6 flex justify-center mx-auto text-sm px-4 py-3 text-white bg-blue-800 rounded-xl hover:bg-blue-700"
        style={{ backgroundColor: '#10B981' }}
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Signup'}
      </button>
    </form>
    <p className="mt-4 text-sm text-center">
      Already have an account? <a className='text-[#10B981] font-bold' href="/login">Sign in</a>.
    </p>
  </div>
</div>

  );
};

export default Signup;
