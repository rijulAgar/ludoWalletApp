import React from 'react';
import './ModelComponent.css';
import Register from '../RegisterComponent/RegisterComponent'
import Login from '../LoginComponent/LoginComponent'
import AddBalance from '../AddBalanceComponent/AddBalanceComponent'
import Withdrawal from '../WithdrawalComponent/WithdrawalComponent'

interface ModelComponentProps {
  title: string;
  modalActionType: string;
  userDetail:any,
  onClose: () => void;
  updateUser: (data:any) => void;
  setErrorMessage: (msg:string) => void;

}

const ModelComponent: React.FC<ModelComponentProps> = ({ title, modalActionType,userDetail,onClose,updateUser,setErrorMessage }) => {
  return (
    <div className="modal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
      {/* <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{onClose()}}></button>
    </div> */}
        <div className="modal-body cus_modal_body">
          <div className=''>
            <div className='d-flex justify-content-between modal_header'>
              <div className='col-10'>
                {title=='Sign Up' && <h1  style={{"color":"white"}}>Create Your Account</h1>}
                {title=='Sign In' && <h1  style={{"color":"white"}}>Log In to Your Account</h1>}
                {title=='Add Balance' && <h1  style={{"color":"white"}}>Add Balance to Your Account</h1>}
                {title=='Withdrawal' && <h1  style={{"color":"white"}}>Withdrawal Balance</h1>}
                {/* <h1  style={{"color":"white"}}>{title=='Sign Up'?"Create Your Account":"Log In to Your Account"}</h1>
                <h1  style={{"color":"white"}}>{title=='Sign Up'?"Create Your Account":"Log In to Your Account"}</h1> */}
              </div>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{onClose()}}></button>

            </div>
              <div className='row'>
                <div className='col-md-12 col-sm-12 px-3'>
                {modalActionType=='signup' && <Register updateUser={updateUser} setErrorMessage={setErrorMessage}/>}
                {modalActionType=='signin' && <Login updateUser={updateUser} setErrorMessage={setErrorMessage}/>}
                {modalActionType=='addbalance' && <AddBalance setErrorMessage={setErrorMessage} userDetail={userDetail}/>}
                {modalActionType=='withdrawal' && <Withdrawal setErrorMessage={setErrorMessage} userDetail={userDetail}/>}
                </div>
              </div>
          </div>
        </div>
        {/* <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setShowModal(false)}}>Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div> */}
      </div>
    </div>
  </div>
  );
};

export default ModelComponent;