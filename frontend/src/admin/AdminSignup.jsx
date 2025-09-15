import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminSignup() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response= await axios.post('http://localhost:3001/api/v1/admin/signup', {
        firstName, lastName, email, password,
      },{
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('Signup successful',response.data);
      toast(response.data.message);
      navigate('/admin/login');
    
    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.errors || "Signup Error!!!");
        
      }
    }
  };
  return (
    <div>
      <div className="box1">
           <div className="SignLogo"> <span className='bhead'>Welcome to</span>&nbsp;&nbsp;&nbsp;<span className='Head'>BrainLitix(Admin)</span></div>
          <form className='frm' onSubmit={handleSubmit}>
            <div className="fn">
               <label htmlFor="firsename">Firstname: </label><br />
            <input type="text" value={firstName} 
               onChange={(e) => setFirstName(e.target.value)}
            id="firstname" name="firstname" required placeholder='Type your first name'/>
            </div>

            <div className="ln">
               <label htmlFor="lastname">Lastname: </label><br />
            <input type="text" id="lastname" 
              onChange={(e) => setLastName(e.target.value)}
            value={lastName} name="lastname" required placeholder='Type your last name'/>
            </div>

            <div className="email">
               <label htmlFor="email">Email: </label><br />
            <input type="email" id="email" 
           onChange={(e) => setEmail(e.target.value)}
            value={email} name="email" required placeholder='Type your email'/>
            </div>
           
            <div className="pass">
               <label htmlFor="password">Password: </label><br />
            <input type="password" id="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password} name="password" required placeholder='Type your password'/>
            </div>

            {errorMessage && <div className=" text-red-600 text-center">{errorMessage}</div>}

            <br /> <br />
            <div className="submit">
              <button type='submit'>Submit</button>
            </div>
            <div className="message">
              <p>Already have an Admin Account.. <a href="/admin/login">Login here</a></p>
            </div>
          </form>
      </div>
    </div>
  )
}

export default AdminSignup
