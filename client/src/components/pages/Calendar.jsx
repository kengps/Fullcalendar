import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { Typography, Row, Col, Button, Modal, Card, Input, Select ,Tag} from "antd";
import SideMenu from "../layouts/SideMenu";
import { useState, useEffect } from "react";
import { BsAirplane, BsAirplaneFill, BsThermometerHigh ,BsQuestion} from "react-icons/bs";
import { FaMountain, FaBusinessTime ,FaQuestion } from "react-icons/fa";


import moment from "moment";

import {
  createEvent,
  listEvent,
  handleCurrentMonth,
  handleFileUpdateImg,
} from "../../api/CalendarAPI";




const CalendarComponent = () => {
  // State ของ modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [id, setId] = useState("");
  const [files, setFiles] = useState("");

  // State ของ การดึงเดือนมา handleCurrentMonth
  const [currentEvent, setCurrentEvent] = useState([]);

  //State ของ value
  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
  });
  const { title, start, end, color } = values;

  useEffect(() => {
    loadData();
    DragGable();
  }, []);

  const [events, setEvent] = useState([]); //เก็บค่าที่ได้จากการ API จากหลังบ้าน เป็นค่าที่เราบันทึกกิจกรรมต่างๆ

  const loadData = () => {
    listEvent()
      .then((res) => {
        //  console.log('ได้อะไร', res.data);
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // เพิ่มประชุม และเปลี่ยนออกงานนอกสถานที่ เป็นสัมนา
  const activity = [
    { id: "1", name: "ลาป่วย", color: "#F1948A" },
    { id: "2", name: "ลากิจ", color: "#82E0AA" },
    { id: "3", name: "ลาพักร้อน", color: "#7FB3D5" },
    { id: "4", name: "เที่ยวพักผ่อน", color: "#F9E79F" },
    { id: "5", name: "ออกงานนอกสถานที่", color: "#D2B4DE" },
    { id: "6", name: "อื่นๆ", color: "#D5D8DC" },
  ];

  // function DragGable เป็นการดึงค่าจาก id external-event มาทั้งหมด เพื้่อให้สามารถดึงข้อมูลทีละตัวได้ เพราะตอนแรกจะไม่สามารถดึงข้อมูลได้มันจะเป็นการคลุมดำ
  const DragGable = () => {
    let DragGables = document.getElementById("external-event");
    console.log("DragGables", DragGables);

    new Draggable(DragGables, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.getAttribute("id");
        let title = eventEl.getAttribute("title");
        let color = eventEl.getAttribute("color");

        return {
          id: id,
          title: title,
          color: color,
        };
      },
    });
  };
  // handleDrop หากเราลากข้อมูลจาก li มาวางไว้ที่ปฏิทิน ก็จะได้ข้อมูลส่วนนั้นๆมา และให้ทำการยิง api จาก createEvent เพื่อทำการบันทึกข้อมูล
  const handleDrop = (event) => {
    console.log("handleDrop", event);
    let value = {
      id: event.draggedEl.getAttribute("id"),
      title: event.draggedEl.getAttribute("title"),
      color: event.draggedEl.getAttribute("color"),
      start: event.dateStr,
      end: moment(event.dateStr).add(+1, "days1").format("YYYY-MM-DD"),
    };

    createEvent(value)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const onChangeValue = (e) => {
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log( e.target.value);
    // console.log( e.target.name);
  };
  // function ของ modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    console.log(values);

    createEvent(values)
      .then((res) => {
        loadData();
        setValues("");
        //หรือ
        // setValues({ ...values, title: "" });
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setValues("");
    setIsModalOpen(false);
  };

  const handleSelect = (event) => {
    //หากกดที่วันที่ จะให้ขึ้น modal เข้ามา
    showModal();
    console.log(event);
    //ต้องการข้อมูลวันที่ start end เพื่อมา update ข้อมูล
    setValues({ ...values, start: event.startStr, end: event.endStr });
  };
  // เป็นการดึงข้อข้อมูลจาก calendar  หากเรามีการเปลี่ยนเดือนถัดไปหรือย้อนกลับ โดยเราจะนำแค่เดือนมาใช้
  const currentMonth = (info) => {
    let m = info.view.calendar.currentDataManager.data.currentDate;
    let mm = moment(m).format("M");
    // console.log(mm);
    handleCurrentMonth({ mm })
      .then((res) => {
        // console.log(res)
        setCurrentEvent(res.data);
      })

      .catch((err) => console.log(err));
  };

  // const date = moment(new Date()).format('DD/MM/YYYY')
  // const r = new Date();
  // const filterDate = currentEvent.filter((item) => {
  //       return date == moment(item.start).format("DD/MM/YYYY");
  // })
  // console.log("filterDate", filterDate);

  // // // ยังไม่ได้แบบที่ต้องการ
  // // const betweenDate1 = currentEvent.filter((item) => {
  // //     return r >= moment(item.start) && r < moment(item.end)
  // // })
  // // console.log("between", betweenDate);

  //    const betweenDate = currentEvent.filter((item) => {
  //      return r >= moment(item.start) && r < moment(item.end);
  //    });
  //    console.log("between", betweenDate);

  const d = moment().format("DD/MM/YYYY");
  const r = moment(); //เนื้องจากถ้าใช้ new Date()

  const filterDate = currentEvent.filter((item) => {
    // console.log('วันที่ที่กำหนด',d);
    // console.log("วันที่จากDB", item.start);
    // console.log("ตรงกันหรือไม่" ,d === moment(item.start).format("DD/MM/YYYY"));
    return d === moment(item.start).format("DD/MM/YYYY");
  });
  // console.log(filterDate);

  const betweenDate = currentEvent.filter((item) => {
    return r >= moment(item.start) && r < moment(item.end);
  });
  console.log("between", betweenDate);
  // window.location.reload();

  //*Modal ตัวที่สอง สำหรับการคลิกที่ Event ของวันนั้นๆ
  //หากมีการกดที่กิจกรรมของวันนั้นๆ จะให้เลือกรูปภาพมาใส่
  const handleClick = (eventInfo) => {
    const id = eventInfo.event._def.extendedProps._id;
    setId(id);
    showModal2();
  };

  const handleFile = (event) => {
    const input = event.target.files[0];
    setFiles(input);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = async () => {
    console.log(id, files); //หลังจากกดจะให้ส่งค่า id และ file ไป
    const formData = new FormData(); // ทำการสร้างตัวแปรมารับค่า เพื่อจะส่งไป update ที่หลังบ้าน
    formData.append("id", id);
    formData.append("files", files);
    handleFileUpdateImg(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div>
      <Row>
        <Col span={5}>
          {/* <SideMenu /> */}
          <Typography.Title level={3} className="text-center">
            ประเภทการหยุด
          </Typography.Title>
          <Card>
            <div id="external-event">
              <ul>
                {activity.map((item, index) => (
                  <li
                    className="fc-event mt-1 ps-1 "
                    id={item.id}
                    title={item.name}
                    color={item.color}
                    key={index}
                    style={{
                      backgroundColor: item.color,
                      cursor: "grab",
                      borderRadius: "10px 2px",
                      listStyle: "none",
                      marginRight: "20px",
                    }}
                  >
                    {/* {item.name} */}
                    {item.name === "ลาป่วย" ? (
                      <>
                        <BsThermometerHigh /> {item.name}
                      </>
                    ) : item.name === "ลากิจ" ? (
                      <>
                        <FaBusinessTime className="me-1" />
                        {item.name}
                      </>
                    ) : item.name === "ลาพักร้อน" ? (
                      <>
                        <FaMountain className="me-1" />
                        {item.name}
                      </>
                    ) : item.name === "อื่นๆ" ? (
                      <>
                        <FaQuestion className="me-1" />
                        {item.name}
                      </>
                    ) : (
                      <>{item.name}</>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card>
            <Typography.Title level={3} className="text-center">
              {" "}
              กิจกรรมทั้งหมด
            </Typography.Title>
            <ol>
              {currentEvent.map((item, index) => (
                <li key={index}>
                  {d === moment(item.start).format("DD/MM/YYYY") ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Tag color="green">วันนี้</Tag>
                    </>
                  ) : r >= moment(item.start) && r < moment(item.end) ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Tag color="yellow">อยู่ระหว่างดำเนินการ</Tag>
                    </>
                  ) : (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                    </>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        </Col>
        <Col span={18}>
          <Typography.Title level={1} className="text-center ">
            ปฏิทินคนสวย
          </Typography.Title>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today", //กำหนดให้ด้านซ้ายเป็นปุุ่มย้อนกลับและถัดไป
              center: "title", //กำหนดให้ตรงกลางเป็นชื่อเ
              right: "dayGridMonth,timeGridWeek,timeGridDay", //กำหหนดให้ด้านขวามีปุ่มเดือน วัค เดย์
            }}
            selectable={true} // เพื่อทำให้สามารถคลิกที่แผ่นที่ได้
            select={handleSelect} //function หากมีการคลิก
            events={events} //เก็บค่าที่ได้จากการ API จากหลังบ้าน เป็นค่าที่เราบันทึกกิจกรรมต่างๆ
            drop={handleDrop} // function หากมีการวางข้อมูลลงไปที่วันที่
            datesSet={currentMonth} // function หากมีการเปลี่ยนเดือน
            eventClick={handleClick} //หากกดที่ Event นั้นๆ
          />
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              name="title"
              onChange={onChangeValue}
              showCount
              max={200}
              value={values.title}
            />
            <select name="color" onChange={onChangeValue}>
              <option key={9999} value="">
                --กรุณาระบุประเภท--
              </option>
              {activity.map((item, index) => (
                <option
                  value={item.color}
                  key={index}
                  style={{ backgroundColor: item.color }}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </Modal>
          //modal สำหรับ EventClick
          <Modal
            title="Basic Modal"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel2}
          >
            <Typography.Title>Hello</Typography.Title>
            <Input name="file" onChange={handleFile} type="file" />
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarComponent;


  
//   if(d == moment(item.start).format("DD/MM/YYYY")) {
//      {moment(item.start).format("DD/MM/YYYY") + "-" + item.title}
//         <Tag color="green">วันนี้</Tag>
//   }
//   else if( r >= moment(item.start) && r < moment(item.end)) {
// {moment(item.start).format("DD/MM/YYYY") + "-" + item.title}
//         <Tag color="yellow">อยู่ระหว่างดำเนินการ</Tag>
//   }
//   else {
// <>{moment(item.start).format("DD/MM/YYYY") + "-" + item.title}</>
//   }