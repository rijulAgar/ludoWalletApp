import React, { useState ,useEffect} from 'react';
import InputField from '../InputComponent/InputComponent';
import Web3 from 'web3';
interface AddBalanceComponentProps {    
    userDetail:any,
    setErrorMessage: (msg:string) => void;
  }
  
  const AddBalance: React.FC<AddBalanceComponentProps> = ({userDetail,setErrorMessage}) => {
    const [balance, setBalance] = useState(0);
    const [disableBtn,setDisableBtn] = useState(false);
    const [textDisplay,setTextDisplay]=useState('')

    useEffect(()=>{
        if(balance>0){
            setTextDisplay(balance+" token will be deducted")
        }
    },[balance])


    const handleLogin = async () => {
      setErrorMessage("");
      if(balance< 0.0001){
          setErrorMessage("Enter Balance");
          return false
      }
      const web3 = new Web3(window.ethereum)
      const y=   web3.utils.toWei(balance.toString(), 'ether')
      console.log(y)
      console.log(balance)
      const gasLimit = web3.utils.toHex('10'); // Gas limit for a simple transfer
      const gasPrice = await web3.eth.getGasPrice(); 
      console.log("gl",gasLimit,"gp",gasPrice)
      const transaction_id=await window.ethereum.request({
        "method": "eth_sendTransaction",
        "params": [
          {
            "to": "0x9b9AAD3b6492fbeAd1BdA43f14bE85145CDd4cA1",
            "from": userDetail?.wallet_address,
            "value": y,
            "gas": gasLimit,
            "gasPrice": web3.utils.toHex(gasPrice)
          }
        ]
      });
      try {
        setDisableBtn(true)
        const response = await fetch('http://127.0.0.1:8000/api/addbalance', {
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
        <p className='text-white text-center'>{textDisplay}</p>
        <button className='mt-3 btn-sign-in cus_modal_button' onClick={handleLogin} disabled={disableBtn}>{!disableBtn?"Add":<div className="spinner-border text-primary mt-1" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          }</button>
      </div>
    );
  };
  
  export default AddBalance;