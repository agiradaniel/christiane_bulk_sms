import React, {useEffect, useState} from 'react';
import PersistentDrawerLeft from '../inc/SideBar';
import axios from 'axios';
import './styles/directMessage.css';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const DirectMessages = () => {

  const [smsBalance, setSmsBalance] = useState("");
  const [message, setMessage] = useState("Christiane School, ");
  const [showModal, setShowModal] = useState(false);
  const [numbers, setNumbers] = useState([]);

  

  const characterCount = message.length;


  useEffect(()=>{
    const getUnits = async() => {
      const response = await axios.get('http://localhost:3001/sendsms/getsmsunits');
      setSmsBalance(response.data.credit_balance)
    }
    getUnits()
  },[])

  

  const sendSms = async () => {
    try {
        const numbersArray = numbers.split('\n').filter(number => number.trim() !== '');
        const response = await axios.post('http://localhost:3001/sendsms', { numbers: numbersArray, message });
        console.log(response.data);
        toast.success("Messages sent successfully");
        closeModal();

        const smsLogs = await axios.post('http://localhost:3001/logs/directmessagelogs', { message });
        console.log(smsLogs.data);
    } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while sending messages.");
       
    }
};
  
  const openModal = () => {
    setShowModal(true); 

    
  };
  const closeModal = () => {setShowModal(false)};

  return (
    <div>
      <div className="purple-background" style={{backgroundColor:"#411F6B", height:"150px", margin:0, padding:0, textAlign:"center"}}>
            
            <p style={{paddingTop:"38px", color:"white", fontSize:"24px"}}>Christiane School Bulk SMS System</p>

            <div style={{margin:"auto"}}><p>My Credit Balance: {smsBalance}</p></div>
            
       </div>
        <PersistentDrawerLeft/>
        <ToastContainer position="top-right" autoClose={4000} />

        <div className='messagesection3 text-center summarysection'>
            <div className='mx-auto text-center mb-4'><h5>Message Content</h5></div>
            <div>
            <textarea rows={6} className="messageInput3" spellCheck="false" onChange={(e)=>setMessage(e.target.value)}>
                 Christiane School&#10;&#10;
            </textarea>
            <p className='blockquote-foote'>Characters: {characterCount}</p>
              </div>
            <Button className='mt-3' onClick={openModal} style={{backgroundColor:"#6E3FC4"}}>Send</Button>
        </div>

        <div className='summary3 summarysection text-center'>
            <h5 className='text-center mt-3'>Phone Numbers</h5>
            <div style={{margin: "auto"}}>
              <textarea placeholder='Input phone numbers separated by a new line' rows={13} style={{width:"90%", borderRadius:"5px"}}
                onChange={(e)=>setNumbers(e.target.value)}
              />
            </div>
        </div>  

       
      
        <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
                    <Modal.Title>Confirm Fee SMS Sending</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to send the SMS</p>
                    <ul>
                       <li>Message: {message}</li>
                       
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button  className='btn-purple-moon' onClick={sendSms}>
                        Send SMS
                    </Button>
                </Modal.Footer>
        </Modal>
    </div>
  )
}

export default DirectMessages