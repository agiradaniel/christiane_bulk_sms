import React, { useState, useEffect } from 'react';
import PersistentDrawerLeft from '../inc/SideBar';
import './styles/generalSms.css'
import { Button, Dropdown, Table, Modal} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS


const GeneralSms = () => {

    const [dropValue, setDropValue] = useState("All Classes");
    const [stuList, setStuList] = useState([]);
    const [message, setMessage] = useState("Christiane School, ");
    const [showModal, setShowModal] = useState(false);
    const [smsBalance, setSmsBalance] = useState(null);
    const [cost, setCost] = useState(null);
    let number = 1;

    const characterCount = message.length;
    const studentCount = stuList.length;

    const retrieveData = async () => {
      try {
          const response = await axios.post('http://localhost:3001/data/studentdatageneral', { studentClass: dropValue });
          setStuList(response.data);
      } catch (error) {
          console.error("An error occurred:", error);
          toast.error("An error occurred while retrieving data.");
          // Handle the error, e.g., show an error message to the user
      }
  };

    useEffect(()=>{
      retrieveData()
    },[dropValue])

    useEffect(()=>{
      const getUnits = async() => {
        const response = await axios.get('http://localhost:3001/sendsms/getsmsunits');
        setSmsBalance(response.data.credit_balance)
      }
      getUnits()
    },[])

    const calculateCost = () =>{
      if(characterCount < 144){
        setCost((studentCount*0.35).toFixed(2))
      }else if(characterCount >= 144 && characterCount < 288){
        setCost((studentCount*0.7).toFixed(2))
      }else if(characterCount >= 288 && characterCount < 432){
        setCost((studentCount*1.05).toFixed(2))
      }else if(characterCount >= 432 && characterCount < 576){
        setCost((studentCount*1.4).toFixed(2))
      }
  }

  const sendSms = async () => {
    try {
        const phoneNumbersArray = stuList.map(stu => stu.parentContact);

        const response = await axios.post('http://localhost:3001/sendsms', { numbers: phoneNumbersArray, message });
        console.log(response.data);
        toast.success("Messages sent successfully");
        closeModal();

        const smsLogs = await axios.post('http://localhost:3001/logs', { classGroup: dropValue, totalStudents: studentCount, message });
        console.log(smsLogs.data);
    } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while sending messages.");
       
    }
};

    const openModal = () => {setShowModal(true); calculateCost()};
    const closeModal = () => {setShowModal(false)};

//Christiane school Kitengela&#10;&#10;Dear Parent, we have an exciting trip planned to the Giraffe Center Nairobi on 20th August 2023, costing KSH 1500 per child. If you'd like your child to join us, please make the payment by Monday, 10th August 2023. You can use the KCB PAYBILL: 522123, ACCOUNT NUMBER: 10009K+PUPILS NAME. Feel free to contact us at 0710565646 for any further information.&#10;&#10;Best regards School Director
  return (
    <div>
       <div className="purple-background" style={{backgroundColor:"#411F6B", height:"150px", margin:0, padding:0, textAlign:"center"}}>
            
            <p style={{paddingTop:"38px", color:"white", fontSize:"24px"}}>Christiane School Bulk SMS System</p>

            <div style={{margin:"auto"}}><p>My Credit Balance: {smsBalance}</p></div>
            
       </div>
       <PersistentDrawerLeft/>
       <ToastContainer position="top-right" autoClose={4000} />
       
        <div className='criteriasection container d-flex flex-row justify-content-around mt-3' style={{width:"50%"}}>
            <div>
                <div style={{color:"black", marginBottom:"5px"}}>Class</div>
                <div>
                <Dropdown style={{textAlign: "center"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {dropValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("All Classes")}}>All</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("class8")}}>Class 8</Dropdown.Item>   
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("class7")}}>Class 7</Dropdown.Item> 
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("class6")}}>Class 6</Dropdown.Item> 
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("class5")}}>Class 5</Dropdown.Item>  
                        </Dropdown.Menu>
                </Dropdown>
                </div>
            </div> 
        </div>

        <div className='messagesection2'>
            <div className='mx-auto text-center mb-3'>Message Content</div>
            <textarea rows={6} style={{width:"100%", borderRadius:"10px"}} spellCheck="false"  onChange={(e)=>setMessage(e.target.value)}>
                 Christiane School&#10;&#10;
            </textarea>
            <p className='text-muted'>Characters: {characterCount}</p>
            <Button className='btn-purple-moon mt-3' onClick={openModal}>Send</Button>
        </div>

        <div className='studentlist2'>
            <div className='mx-auto text-center text-bold text-decoration-underline'>List of Students Affected</div>

            <div className="studenttablediv2">
            <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Parents contacts</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                    {stuList.map((stu) => {
                return(  
                  
                  <tbody>
                    <tr>
                      <td>{number ++}</td>
                      <td style={{textAlign:"left"}}>{stu.name}</td>
                      <td style={{textAlign:"left"}}>{stu.studentClass}</td>
                      <td><a href={"tel:" + stu.parentContact}>{stu.parentContact}</a></td>
                      <td>{stu.balance}</td>
                    </tr>
                  </tbody>
                
                ) 
            })
        }
        </Table>
            </div>
        </div> 

        <div className='summary2 summarysection text-white'>
            <h3 className='text-center mt-3'>Summary</h3>
            <div style={{marginLeft:"10px"}}>
            <p>Sending sms to: </p>
            <ul>
                <li>Students from <span style={{border:"1px dashed red", padding:"3px"}}>{dropValue}</span></li><br/>
            </ul>
            <h5>Total Students: {studentCount}</h5>
            </div>
        </div>   

        <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
                    <Modal.Title>Confirm General SMS Sending</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to send the SMS with the following details?</p>
                    <ul>
                        <li>Class: {dropValue}</li>
                        <li>Message: {message}</li>
                        <li>Total Students: {studentCount}</li>
                        <li>Total cost: KSH {cost}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    {parseInt(cost) > parseInt(smsBalance) ?
                      <Button className='btn-danger disabled' disabled>
                          Please Recharge
                      </Button>
                      :
                      <Button onClick={sendSms} className='btn-purple-moon'>
                          Send SMS
                      </Button>
                    }
                </Modal.Footer>
        </Modal>

        
    </div>
  )
}

export default GeneralSms