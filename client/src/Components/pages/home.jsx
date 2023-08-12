import React, { useEffect, useState } from 'react';
import PersistentDrawerLeft from '../inc/SideBar';
import './styles/home.css'
import { Button, Dropdown, Table, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS;



const Home = () => {

    const [dropValue, setDropValue] = useState("All Classes");
    const [balance, setBalance] = useState(2000);
    const [days, setDays] = useState(7);
    const [message, setMessage] = useState("Christiane School, ");
    const [stuList, setStuList] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [smsBalance, setSmsBalance] = useState(null);
    const [cost, setCost] = useState(null);
    let number = 1;

    const characterCount = message.length;
    const studentCount = stuList.length


    const retrieveData = async () => {
      try {
          const response = await axios.post('http://localhost:3001/data/studentdata', { studentClass: dropValue, amount: balance });
          setStuList(response.data);
      } catch (error) {
          console.error("An error occurred:", error);
          toast.error("An error occurred while retrieving data.");
      }
  };
  

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

    useEffect(()=>{
      retrieveData()
    },[dropValue, balance])

    useEffect(()=>{
      const getUnits = async() => {
        const response = await axios.get('http://localhost:3001/sendsms/getsmsunits');
        setSmsBalance(response.data.credit_balance)
      }
      getUnits()
    },[])

    const sendSms = async () => {
      try {
          // Putting all phone numbers in one array to send to the backend
          const studentDetailsArray = stuList.map((stu) => ({
              name: stu.name,
              contact: stu.parentContact,
              balance: stu.balance,
              stuClass: stu.studentClass
          }));
  
          const responses = await axios.post('http://localhost:3001/sendsms/sendcustom', { studentDetails: studentDetailsArray, message });
          console.log(responses.data);
          toast.success("Messages sent successfully");
          closeModal();
  
          const smsLogs = await axios.post('http://localhost:3001/logs', { classGroup: dropValue, totalStudents: studentCount, message });
          console.log(smsLogs.data);
      } catch (error) {
          console.error("An error occurred:", error);
          toast.error("An error occurred while sending messages.");
          // Handle the error, e.g., show an error message to the user
      }
  };

    const openModal = () => {setShowModal(true); calculateCost()};
    const closeModal = () => {setShowModal(false)};

    const tooltip = (
      <Tooltip id="tooltip">
        <span style={{fontWeight:"bold", textDecoration:"underline"}}>Variables</span><br/>
        To include: 
        <ol>
          <li>Student name write [name]</li>
          <li>Fee balance: [balance]</li>
          <li>Class: [studentClass]</li>
          <li>Parents Contact: [number]</li>
        </ol>
      </Tooltip>
    );

   // Christiane school Kitengela&#10;&#10;Dear parent your child [name] has a fee balance of KSH [fee], please pay this amount before [date] to avoid any inconveniences &#10;&#10;Payment Methods: &#10;KCB PAYBILL: 522123 ACCOUNT NUMBER: 10009K+PUPILS NAME

  return (
    <div>
       <div className="top-banner purple-background" style={{backgroundColor:"#411F6B", textAlign:"center"}}>
            
            <p style={{paddingTop:"38px", color:"white", fontSize:"24px"}}>Christiane School Bulk SMS System</p>

            <div style={{margin:"auto"}}><p>My Credit Balance: {smsBalance}</p></div>
            
       </div>
       <PersistentDrawerLeft/>

       <ToastContainer position="top-right" autoClose={4000} />
       
        <div className='criteriasection mt-3'>
            <div>

                <div style={{color:"black", marginBottom:"5px"}}>Class</div>
                <div>
                <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='criteriabutton btn-purple-moon'>
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

            <div>
                <div style={{color:"black", marginBottom:"5px"}}>Balance</div>
                <div className='inputDiv'>
                    <input placeholder='> 2000' onChange={(e)=>{setBalance(e.target.value)}}/>
                </div>
           
            </div>
            
            <div className='inputDiv'>
              <Button onClick={() => retrieveData()} className='criteriabutton btn-purple-moon mt-4'>Reload data</Button>
            </div>
        </div>

        <div className='messagesection '>
            <div className='mx-auto text-center mb-3'>Message Content</div>
            <textarea rows={6} style={{width:"100%", borderRadius:"10px"}} spellCheck="false" onChange={(e)=>setMessage(e.target.value)}>
                 Christiane School&#10;&#10;
            </textarea>
            <div className='d-flex justify-content-between'>
              <span className='blockquote-foote'>Characters: {characterCount}</span>
              <div>
                <OverlayTrigger placement="top" overlay={tooltip}>
                  <span className="bi bi-info-circle-fill" style={{ fontSize: '1.1rem', color: '#4e54c8', cursor: 'pointer' }}></span>
                </OverlayTrigger>
              </div>
            </div>
            
            <Button className='btn-purple-moon mt-3' onClick={openModal}>Send</Button>
        </div>

      

        <div className='studentlist'>

            <div className='mx-auto text-center text-bold text-decoration-underline'>List of Students Affected</div>

            <div className="studenttablediv" style={{}}>
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

        <div className='summary summarysection text-white'>
            <h3 className='text-center mt-3'>Summary</h3>
            <div style={{marginLeft:"10px"}}>
            <p>Sending sms to: </p>
            <ul>
            <li>Students from <span style={{border:"1px dashed red", padding:"3px"}}>{dropValue}</span></li><br/>
            <li>With balance more than  <span style={{border:"1px dashed red", padding:"3px"}}>{balance}</span> Ksh</li><br/>
            <li>With sms sent more than  <span style={{border:"1px dashed red", padding:"3px"}}>{days}</span> days ago</li><br/>
            </ul>
            <h5>Total Students: {studentCount}</h5>
            </div>
        </div>   
        

        <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
                    <Modal.Title>Confirm Fee SMS Sending</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to send the SMS with the following details?</p>
                    <ul>
                        <li>Class: {dropValue}</li>
                        <li>Balance: More than {balance}</li>
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

export default Home