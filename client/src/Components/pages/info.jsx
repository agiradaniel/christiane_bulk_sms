import React from 'react';
import PersistentDrawerLeft from '../inc/SideBar';
import './styles/info.css'

const Info = () => {
  return (
    <div>
        <PersistentDrawerLeft/>

        <div className="mainSection">

        <div className='tabsInfo mx-auto mt-5 '>
        <h4 className='text-center text-bold'>The different tabs</h4>
  
        <div className="tab-content mt-3">
        <h5 className='text-bold'>Tab 1: Fee SMS</h5>
        <p>
           The Fee Reminders tab is exclusively designed to streamline the process of sending timely reminders regarding outstanding fees. With this feature, you can easily select specific groups of students to receive the SMS reminders. Filter options include class and outstanding balance. Moreover, you can personalize each message using dynamic variables like <span className='text-danger'>[name]</span>, <span className='text-danger'>[balance]</span>, <span className='text-danger'>[number]</span>, and <span className='text-danger'>[studentClass]</span>, ensuring effective and customized communication. These variables are accessible by hovering over the <span className="bi bi-info-circle-fill" style={{ fontSize: '1.1rem', color: '#4e54c8', cursor: 'pointer' }}></span> icon below the message input.
        </p>
        </div>

        <div className="tab-content">
        <h5 className='text-bold'>Tab 2: General SMS</h5>
        <p>
         The General SMS tab offers a versatile solution for sending messages to multiple recipients. You can send a single message to phone numbers based on class categories or even send a message to all classes. This tab simplifies communication, ensuring that important announcements, updates, or general information reaches the intended recipients promptly.
        </p>
        </div>

        <div className="tab-content">
        <h5 className='text-bold'>Tab 3: Direct Message</h5>
         <p>
         For personalized communication, the "Direct Messaging" tab provides a hands-on approach. You have the freedom to input phone numbers directly into the system, each on a separate line. This direct method allows you to communicate with precision, making it an ideal option for tailored messages that require a personal touch.
         </p>
        </div>

      </div>

      <div className='mx-auto mt-5 mb-5' style={{backgroundColor:"#F5F6F7", width:"75%", borderRadius:"10px", padding:"40px", border:"2px solid #411F6B"}}>
      <h4 className='text-center text-bold'>Credit recharge details</h4>
      <div className="tab-content text-center">
        <h5 className='text-bold'>Mpesa Paybill</h5>
          <ul style={{listStyle:"none"}}>
            <li>Paybill Number: 722252</li>
            <li>Account Number: RT7733</li>
          </ul>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Info