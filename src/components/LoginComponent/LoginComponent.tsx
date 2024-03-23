import React, { useState } from 'react';
import InputField from '../InputComponent/InputComponent';
interface LoginComponentProps {
  updateUser: (data:any) => void;
  setErrorMessage: (msg:string) => void;
}

const Login: React.FC<LoginComponentProps> = ({updateUser,setErrorMessage}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn,setDisableBtn] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");
    if(!username){
        setErrorMessage("Enter email");
        return false
    }
    if(!password){
        setErrorMessage("Enter password");
        return false
    }
    try {
      setDisableBtn(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: username,password:password}),
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
        placeholder='Enter email address'
        value={username} 
        onChange={(value:any) => setUsername(value)} 
      />
      <InputField 
        type="password" 
        label="Password" 
        placeholder='Enter Password'
        value={password} 
        onChange={(value:any) => setPassword(value)} 
      />
      <button className='mt-3 btn-sign-in cus_modal_button' onClick={handleLogin} disabled={disableBtn}>{!disableBtn?"Login":<div className="spinner-border text-primary mt-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        }</button>
    </div>
  );
};

export default Login;