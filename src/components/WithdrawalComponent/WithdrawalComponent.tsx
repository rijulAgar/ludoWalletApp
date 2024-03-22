import React, { useState } from 'react';
import InputField from '../InputComponent/InputComponent';
interface WithdrawalComponentProps {    
    userDetail:any,
    setErrorMessage: (msg:string) => void;
  }
  
  const Withdrawal: React.FC<WithdrawalComponentProps> = ({userDetail,setErrorMessage}) => {
    const [balance, setBalance] = useState(0);
    const [disableBtn,setDisableBtn] = useState(false);


    const handleLogin = async () => {
      setErrorMessage("");
      if(balance< 0.1){
          setErrorMessage("Enter Balance");
          return false
      }
      if(balance>userDetail?.balance){
          setErrorMessage("Enter valid Balance");
          return false
      }
      const transaction_id=await window.ethereum.request({
        "method": "eth_sendTransaction",
        "params": [
          {
            "from": "0x7714f320Adca62B149df2579361AfEC729c5FE6A",
            "to": userDetail?.wallet_address,
            "value": balance.toString(16)
          }
        ]
      });
      try {
        setDisableBtn(true)
        const response = await fetch('http://127.0.0.1:8000/api/withdrawalamount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount: balance,transaction_id:transaction_id}),
        });
        setDisableBtn(false)
  
        if(response.status ==500){
          return false
        }else if(response.status==403){
          throw new Error('Invalid credentials');
        }
        const responseData = await response.json();
        if(responseData.status){
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
          type="number" 
          label="Balance" 
          placeholder='Enter balance'
          value={balance} 
          onChange={(value:any) => setBalance(value)} 
        />
        <button className='mt-3 btn-sign-in cus_modal_button' onClick={handleLogin} disabled={disableBtn}>{!disableBtn?"WithDrawal":<div className="spinner-border text-primary mt-1" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          }</button>
      </div>
    );
  };
  
  export default Withdrawal;