import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

import { Typography, Row, Col } from "antd";
import SideMenu from '../layouts/SideMenu'
const CalendarComponent = () => {
const handleSelect = (event) => {

    console.log(event);
}

    return (
        <div>
            <Row>
                <Col span={5} >
                        <SideMenu/>
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
            
                </Col>
                
            </Row>

        </div>
    )
}

export default CalendarComponent