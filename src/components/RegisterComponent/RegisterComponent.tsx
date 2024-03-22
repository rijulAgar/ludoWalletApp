import React, { useState } from 'react';
import InputField from '../InputComponent/InputComponent';
import './RegisterComponent.css'
interface RegisterComponentProps {
    updateUser: (data:any) => void;
     setErrorMessage: (msg:string) => void;

  }
  



const Register: React.FC<RegisterComponentProps> = ({ updateUser,setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disableBtn,setDisableBtn] = useState(false);

  const handleRegister = async () => {
    setErrorMessage("");
    if(!username){
        setErrorMessage("Enter email");
        return false
    }
    if(!name){
        setErrorMessage("Enter name");
        return false
    }
    if(!mobileNo){
        setErrorMessage("Enter mobile number");
        return false
    }
    if(!password || !confirmPassword){
        setErrorMessage("Enter Username");
        return false
    }
    if(password != confirmPassword){
        setErrorMessage("Confirm password and password not match");
        return false
    }
    try {
      setDisableBtn(true)
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: username,mobile:mobileNo,password:password,name:name}),
      });
      setDisableBtn(false)

      if(response.status ==500){
        return false
      }else if(response.status==403){
        throw new Error('Invalid credentials');
      }
      const responseData = await response.json();
      if(responseData.status){
        updateUser(responseData.data)
        console.log(response.ok,responseData)
      }else{
        if(responseData.errors){
          const errorObj = responseData.errors;
          for (const key in errorObj) {
            if (errorObj.hasOwnProperty(key)) {
              const value = errorObj[key];
              throw new Error(value[0]);
            }
          }
        }
      }

      // Login successful, perform further actions like redirecting to another page
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <InputField 
        type="text" 
        label="Email" 
        placeholder={"Enter email address"}
        value={username} 
        onChange={(value:any) => setUsername(value)} 
      />
      <InputField 
        type="text" 
        label="Name" 
        placeholder={"Enter full name"}
        value={name} 
        onChange={(value:any) => setName(value)} 
      />
      <InputField 
        type="text" 
        label="Mobile Number" 
        placeholder={"Enter mobile number"}
        value={mobileNo} 
        onChange={(value:any) => setMobileNo(value)} 
      />
      <InputField 
        type="password" 
        placeholder={"Enter password"}
        label="Password" 
        value={password} 
        onChange={(value:any) => setPassword(value)} 
      />
      <InputField 
        type="password" 
        label="Confirm Password" 
        placeholder={"Confirm password"}
        value={confirmPassword} 
        onChange={(value:any) => setConfirmPassword(value)} 
      />
      <button className='mt-3 btn-sign-in cus_modal_button' onClick={handleRegister} disabled={disableBtn}>{!disableBtn?"Register":<div className="spinner-border text-primary mt-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        }</button>
    </div>
  );
};

export default Register;