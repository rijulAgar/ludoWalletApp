import React, { useState ,useEffect} from 'react';
import InputField from '../InputComponent/InputComponent';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
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
      const gasLimit = web3.utils.toHex('100000'); // Gas limit for a simple transfer
      const gasPrice = await web3.eth.getGasPrice(); 
      console.log("gl",gasLimit,"gp",gasPrice)

      const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_liquidityPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_previousOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_stakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_teamAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"excludedA","type":"address"}],"name":"addExcludedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"LPaddress","type":"address"}],"name":"changeLPAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxtx","type":"uint256"}],"name":"changeMaxtx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sellLimit","type":"uint256"}],"name":"changeSellLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"stakeAddress","type":"address"}],"name":"changeStakingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"Taddress","type":"address"}],"name":"changeTeamAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeExcludedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"geUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"receivers","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"multiTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"excludedA","type":"address"}],"name":"removeExcludedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLimiter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"LPfee","type":"uint256"}],"name":"setLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"liquidityPairAddress","type":"address"}],"name":"setLiquidityPairAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"STfee","type":"uint256"}],"name":"setStakeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"Tfee","type":"uint256"}],"name":"setTeamFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleSellLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      //var Contract = web3.eth.contract(ABI);
      var contractInstance = new Contract(ABI,'0xc4e55b95ce43236D57B6dd2400fa9c4042db8ed6')

      const data  = contractInstance.methods.transfer("toAddress","toAMount").encodeABI();

      const transaction_id= await window.ethereum.request({
        "method": "eth_sendTransaction",
        "params": [
          {
            "to": "0xc4e55b95ce43236D57B6dd2400fa9c4042db8ed6",
            "from": userDetail?.wallet_address,
            "value": 0,
            "gas": gasLimit,
            "gasPrice": web3.utils.toHex(gasPrice),
            "data":data
          }
        ]
      });
      try {
        setDisableBtn(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addbalance`, {
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