import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'



import { Typography, Row, Col, Button, Modal, Card ,Input } from "antd";
import SideMenu from '../layouts/SideMenu'
import { useState } from 'react'
import { useEffect } from 'react'



const CalendarComponent = () => {
   
   // State ของ modal 
    const [isModalOpen, setIsModalOpen] = useState(false);

    //State ของ value
    const [value , setValue] = useState({
            title:'',
            start: '',
            end: ''
    })

const onChangeValue = (e) => {
            setValue({...value , [e.target.name]: e.target.value})
            // console.log( e.target.value);
            // console.log( e.target.name);

}
 // function ของ modal
    const showModal = () => {
        setIsModalOpen(true);
       
    };
    const handleOk = () => {
        console.log(value);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSelect = (event) => {
        //หากกดที่วันที่ จะให้ขึ้น modal เข้ามา
        showModal();
        console.log(event);
        //ต้องการข้อมูลวันที่ start end เพื่อมา update ข้อมูล
        setValue({...value , 
            start: event.startStr,
            end: event.endStr,
        })
       
    }

    return (
        <div>
            <Row>
                <Col span={5} >
                    <SideMenu />
                </Col>
                <Col span={18}>
                    <Typography.Title level={1}>Calendar</Typography.Title>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today', //กำหนดให้ด้านซ้ายเป็นปุุ่มย้อนกลับและถัดไป
                            center: 'title', //กำหนดให้ตรงกลางเป็นชื่อเ
                            right: 'dayGridMonth,timeGridWeek,timeGridDay' //กำหหนดให้ด้านขวามีปุ่มเดือน วัค เดย์
                        }}
                        selectable={true}  // เพื่อทำให้สามารถคลิกที่แผ่นที่ได้
                        select={handleSelect} //function หากมีการคลิก
                    />
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                       <Input  
                       showCount maxLength={200} 
                       name='title'
                       onChange={onChangeValue}/>
                        
                        <p>Some contents...</p>
                    </Modal>
                </Col>

            </Row>

        </div>
    )
}

export default CalendarComponent