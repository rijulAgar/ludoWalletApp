import './App.css'
import { useState, useEffect } from 'react'
import { formatBalance, formatChainAsNum } from './utils'  /* New */
import detectEthereumProvider from '@metamask/detect-provider'
import ModelComponent from './components/Model/ModelComponent'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [], balance: "", chainId: "" }  /* Updated */
  const initialUser={access_token:"",wallet_address:"",balance:0}
  const [wallet, setWallet] = useState(initialState)
  const [errorMsg,setErrorMsg]=useState('')
  const API_URL=import.meta.env.VITE_API_URL
  
  // modal
  const [showModal,setShowModal]=useState(false)
  const [modalTitle,setModalTitle]=useState("")
  const [modalActionType,setModalActionType]=useState("")
  
  // 
  const [userDetail,setUserDetail]=useState(initialUser)
  useEffect(() => {
    if(userDetail?.access_token){
        const refreshAccounts = (accounts: any) => {
        if (accounts.length > 0) {
          console.log('accountdt',accounts)
          updateWallet(accounts)
        } else {
          // if length 0, user is disconnected
          setWallet(initialState)
        }
      }

      const refreshChain = (chainId: any) => {               /* New */
        setWallet((wallet) => ({ ...wallet, chainId }))      /* New */
      }                                                      /* New */

      const getProvider = async () => {
        const provider = await detectEthereumProvider({ silent: true })
        setHasProvider(Boolean(provider))
        console.log("sdf",provider)
        if (provider) {                                           
          const accounts = await window.ethereum.request(
            { method: 'eth_accounts' }
          )
          refreshAccounts(accounts)
          window.ethereum.on('accountsChanged', refreshAccounts)
          window.ethereum.on("chainChanged", refreshChain)  /* New */
        }
      }

      getProvider()

      return () => {
        window.ethereum?.removeListener('accountsChanged', refreshAccounts)
        window.ethereum?.removeListener("chainChanged", refreshChain)  /* New */
      }
    }
  }, [userDetail])

  const updateWalletAddress=async(acount:any)=>{
    console.log(acount)
    // const response = await fetch(API_URL+'/api/updatewalletaddress', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization':"Bearer "+userDetail?.access_token
    //     },
    //     body: JSON.stringify({wallet_address: acount}),
    //   });
    // console.log(response)
  }

  const updateWallet = async (accounts:any) => {
    const balance = formatBalance(await window.ethereum!.request({   
      method: "eth_getBalance",                                      
      params: [accounts[0], "latest"],                                
    }))                                                              
    const chainId = await window.ethereum!.request({                  
      method: "eth_chainId",                                          
    })     
    updateWalletAddress(accounts[0])                                                           
    setWallet({ accounts, balance, chainId })                        
  }

  const handleConnect = async () => {
    if(window.ethereum){
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      let req = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{eth_accounts: {}}]
      })
      console.log(req)
      updateWallet(accounts)
    }else{
        setErrorMsg("Install Metamask")
    }
  }

  const handleDisconnectConnect = async () => {
    setWallet(initialState)
    // updateWallet(accounts)
  }


  const handleSignUp=async()=>{
    setModalTitle("Sign Up")
    setModalActionType("signup")
    setShowModal(true)
  }

  const handleSignIn=async()=>{
    setModalTitle("Sign In")
    setModalActionType("signin")
    setShowModal(true)
    
  }
  const handleAddBalance=async()=>{
    setModalTitle("Add Balance")
    setModalActionType("addbalance")
    setShowModal(true)
    
  }
  const handleWithdrawal=async()=>{
    setModalTitle("Withdrawal")
    setModalActionType("withdrawal")
    setShowModal(true)
    
  }

 const closeModel=async()=>{
  setShowModal(false)
 }

 const updateUserDt=async(data:any)=>{
  closeModel()
  setUserDetail(data)
 }

 const logoutHandler=async()=>{
  await window.ethereum.request({
    method: "wallet_revokePermissions",
    params: [{eth_accounts: {}}]
  })
  setUserDetail(initialUser)
 }
 
  return (
    <div>
      <div className="smartNew-main">
      <div className='wrapper'>
        <header className="header">

          <nav className="container nav__con">
              <a href="index.html" className="logo">
                  <div className="logo__img2"></div>
                  {/* <div className="logo__title">Cryptoland</div> */}
              </a>
              <ul className="menu">
                        <li className="menu__item">
                            <a href="#" className="menu__link">Home</a>
                        </li>
                        <li className="menu__item">
                            <a href="https://tenup.io/" target="_blank" className="menu__link">Tenup</a>
                        </li>
                        <li className="menu__item">
                            <a href="https://dapp.tenup.io/virtual-mining" target="_blank" className="menu__link">Staking</a>
                        </li>
                        <li className="menu__item">
                            <a href="https://topup.tenup.io/" target="_blank" className="menu__link">Top Up</a>
                        </li>
                        <li className="menu__item">
                            <a href="https://analyzer.tenup.io/" target="_blank" className="menu__link">Analyzer</a>
                        </li>
                        <li className="menu__item">
                            <a href="https://tenup.medium.com" target="_blank" className="menu__link">Blog</a>
                        </li>
              </ul>
              {!userDetail?.access_token && 
                <div className="header__right">
                  <button  className="btn-sign-in mx-2"  onClick={handleSignUp}>Sign Up</button>
                  <button  className="btn-sign-in mx-2"  onClick={handleSignIn}>Sign In</button>
                </div>
              }
             
              {userDetail?.access_token && 
              <div className="header__right">
                      { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
                        <button className="btn-sign-in mx-2"  onClick={handleConnect}>Connect MetaMask</button>
                      }
                      { !(window.ethereum?.isMetaMask && wallet.accounts.length < 1) &&
                        <button className="btn-sign-in mx-2"  onClick={handleDisconnectConnect}>Disconnect MetaMask</button>
                      }
                      <button className="btn-sign-in mx-2"  onClick={logoutHandler}>Logout</button>
              </div>}

            </nav>


        <div className="btn-menu">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
        </div>
        </header>
        <div className="fixed-menu">
                <div className="fixed-menu__header">
                    <a href="index.html" className="logo logo--color">
                        {/* <div className="logo__img"></div> */}
                        <div className="logo__title">Cryptoland</div>
                    </a>

                    <div className="btn-close">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 47.971 47.971" xml:space="preserve" width="512px" height="512px">
                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" fill="#006DF0"></path>
                        </svg> */}
                    </div>
                </div>

                <div className="fixed-menu__content">
                    <div className="btn-wrap">
                    <button  className="btn-sign-in"  onClick={handleSignUp}>Sign Up</button>
                    <button  className="btn-sign-in"  onClick={handleSignIn}>Sign In</button>
                    </div>


                </div>
         </div>
         <section className="first-screen" id="first-screen">
                <img className="effect1" src="./img/headerEffect1.png" alt="" />

                <div className="container my-3">
                    <img className="effect2" src="./img/headerEffect2.png" alt=""/>
                    <div className="row">
                        <div className="col-lg-7 " style={{"display":"flex","flexDirection":"column","justifyContent": "center"}}>
                            <h2 className="heading aos-init aos-animate my-2" data-aos="fade-up" data-aos-anchor="#first-screen" data-aos-delay="200" style={{"textAlign": "left","color": "white"}}>TENUP PRESENTING<br/> LUDO LOVE
                            </h2>

                            <h2 className="heading aos-init aos-animate" data-aos="fade-up" data-aos-anchor="#first-screen" style={{"color":" white","textAlign":"left"}}></h2>
                            <div className="headingBar"></div>
                            <h2 className="typing-demo  color-white my-3" id="text2" style={{"color": "rgb(255, 255, 255)"}}>An upgraded version from Ludo NFT!</h2>
                            <div className="socialMain head my-3">
                                <a href="https://www.facebook.com/TenUpNation/" target="_blank">
                                    <img src="/img/fbIcon.svg" alt="fbIcon"/>
                                </a>
                                <a href="https://twitter.com/TenupNation" target="_blank">
                                    <img src="/img/twitter.svg" alt="twitter"/>
                                </a>
                                <a href="https://www.instagram.com/tenupnation/" target="_blank">
                                    <img src="/img/instaWhite.svg" alt="insta"/>
                                </a>
                                <a href="https://www.youtube.com/channel/UC2FsNw9p7c8HDNdjRLknuiA?view_as=subscriber" target="_blank">
                                    <img src="/img/youtubeWhite.svg" alt="youtube"/>
                                </a>
                                <a href="https://t.me/tenupnation" target="_blank">
                                    <img src="/img/telegramWhite.svg" alt="telegram"/>
                                </a>

                                <a className="discord" href="https://discord.gg/HCvaarMAQq" target="_blank">
                                    <img src="/img/discord.png" alt="discord"/>
                                </a>
                            </div>
                            <div className='d-flex flex-row mt-3'>
                              <div className='p-3'>
                              <a href="https://play.google.com/store/apps/details?id=com.ludo.nft" target="_blank">
                                <img className='cus_download_btn' src='img/googlePlayNew.png'/>
                              </a>
                              </div>
                              <div className='p-3'>
                              <a href="https://apps.apple.com/de/app/ludo-up/id1666628549?l=en" target="_blank">
                                <img className='cus_download_btn' src='img/AppStoreNew.png'/>
                              </a>
                              </div>
                            </div>

                        </div>
                        <div className="col-lg-5">
                            <div className="imgDiv bannerSlide slick-initialized slick-slider slick-dotted">
                                <div className="slick-list draggable">
                                  <div className="slick-track" style={{"opacity": "1", "width": "4005px", "transform": "translate3d(-1335px, 0px, 0px)"}}>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1}/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide" data-slick-index="0" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1} role="tabpanel" id="slick-slide10" aria-describedby="slick-slide-control10"/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide" data-slick-index="1" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1} role="tabpanel" id="slick-slide11" aria-describedby="slick-slide-control11"/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-current slick-active" data-slick-index="2" aria-hidden="false" style={{"width": "445px"}} tabIndex={0} role="tabpanel" id="slick-slide12" aria-describedby="slick-slide-control12"/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide" data-slick-index="3" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1} role="tabpanel" id="slick-slide13" aria-describedby="slick-slide-control13"/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-cloned" data-slick-index="4" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1}/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-cloned" data-slick-index="5" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1}/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-cloned" data-slick-index="6" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1}/>
                                    <img src="./img/LudoLove.png" className="childImg img-fluid slick-slide slick-cloned" data-slick-index="7" aria-hidden="true" style={{"width": "445px"}} tabIndex={-1}/>
                                  </div>
                                </div>
                                
                                
                                
                                <ul className="slick-dots" role="tablist">
                                  <li className="" role="presentation">
                                    <button type="button" role="tab" id="slick-slide-control10" aria-controls="slick-slide10" aria-label="1 of 4" tabIndex={-1}>1</button>
                                    </li>
                                    <li role="presentation" className="">
                                      <button type="button" role="tab" id="slick-slide-control11" aria-controls="slick-slide11" aria-label="2 of 4" tabIndex={-1}>2</button>
                                    </li>
                                    <li role="presentation" className="slick-active">
                                      <button type="button" role="tab" id="slick-slide-control12" aria-controls="slick-slide12" aria-label="3 of 4" tabIndex={0} aria-selected="true">3</button>
                                    </li>
                                    <li role="presentation" className="">
                                      <button type="button" role="tab" id="slick-slide-control13" aria-controls="slick-slide13" aria-label="4 of 4" tabIndex={-1}>4</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                {userDetail?.access_token && <div className='cus_trans_div py-2'>
                  <div className='col-12 text-center text-white mt-3'><h3 style={{"color":"white"}}>Your current balance :{userDetail?.balance}</h3></div>
                  {!(window.ethereum?.isMetaMask && wallet.accounts.length < 1) ?<div className='d-flex justify-content-center'>
                    <div className='col-5 px-5'><button  className="btn-sign-in cus_modal_button" onClick={handleAddBalance}>Add Balance</button></div>
                    <div className='col-5 px-5'><button  className="btn-sign-in cus_modal_button" >Withdrawal</button></div>
                  </div>:<p className='text-white'>Please Connect Metamask to Proceed</p>}
                </div>}
                </div>
            </section> 


      </div>
      {/* <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div> */}

      {/* { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
        <button onClick={handleConnect}>Connect MetaMask</button>
      }
      { !(window.ethereum?.isMetaMask && wallet.accounts.length < 1) &&
        <button onClick={handleDisconnectConnect}>Disconnect MetaMask</button>
      }

      { wallet.accounts.length > 0 &&
        <>                                                               
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>                    
          <div>Hex ChainId: {wallet.chainId}</div>                       
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div> 
        </>
      } */}
    </div>
    {/* modal */}
    {showModal && <ModelComponent  userDetail={userDetail} title={modalTitle} modalActionType={modalActionType}  onClose={closeModel} updateUser={updateUserDt} setErrorMessage={setErrorMsg}></ModelComponent>}
    {errorMsg && <div className="toast align-items-center show bg-danger text-white cus_toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
        {errorMsg}
      </div>
        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={()=>{setErrorMsg('')}}></button>
      </div>
    </div>}
    </div>

  )
}

export default App