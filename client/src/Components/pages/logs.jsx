import React, { useEffect, useState } from 'react';
import PersistentDrawerLeft from '../inc/SideBar';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './styles/logs.css'
 
const Logs = () => {
  
    const [logs, setLogs] = useState([]);
    let number = 1;

    const getLogs = async() => {
        const smsLogs = await axios.get("http://localhost:3001/logs/getlogs");
        setLogs(smsLogs.data);
    }

    useEffect(()=>{
        getLogs()
    },[])
  
    return (
    <div>
        <PersistentDrawerLeft/>
     
        <div className="purple-background" style={{backgroundColor:"#411F6B", height:"70px", margin:0, padding:0, textAlign:"center"}}> 
            <p style={{paddingTop:"18px", color:"white", fontSize:"24px"}}>Message Logs</p>          
       </div>
        <Table responsive="sm" className='logsTable' style={{width:"83%"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Class Group</th>
            <th>Total Students</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
            {logs.map((log)=>{
                return(
                    <>
                    <tr>
                        <td>{number ++}</td>
                        <td>{log.classGroup}</td>
                        <td>{log.totalStudents}</td>
                        <td style={{maxWidth:"400px"}}>{log.message}</td>
                        <td>{log.date}</td>
                     </tr>
                    </>
                )
            })}
          
        </tbody>
      </Table>
    </div>
  )
}

export default Logs