import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { toast } from "react-toastify";
import swal from "sweetalert2";

import { DeleteOutlined, ProfileOutlined } from "@ant-design/icons";

import thLocale from "@fullcalendar/core/locales/th";

import {
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Card,
  Input,
  Select,
  Tag,
  Image,
  Divider,
  Space,
  Table,
} from "antd";
import SideMenu from "../layouts/SideMenu";
import { useState, useEffect } from "react";
// import {
//   BsAirplane,
//   BsAirplaneFill,
//   BsThermometerHigh,
//   BsQuestion,
// } from "react-icons/bs";
// import { FaMountain, FaBusinessTime, FaQuestion } from "react-icons/fa";
// import { BiHappyAlt } from "react-icons/bi";
// import { MdCardTravel } from "react-icons/md";
// import { AiTwotoneCar } from "react-icons/ai";
import {
  BsAirplane,
  BsAirplaneFill,
  BsThermometerHigh,
  BsQuestion,
  FaMountain,
  FaBusinessTime,
  FaQuestion,
  BiHappyAlt,
  MdCardTravel,
  AiTwotoneCar,
  MdReorder,
} from "react-icons/all";

import moment from "moment";
const { Meta } = Card;

import {
  createEvent,
  listEvent,
  handleCurrentMonth,
  handleFileUpdateImg,
  UpdateEventChange,
  removeEvent,
} from "../../api/CalendarAPI";

const CalendarComponent = () => {
  // State ของ modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [id, setId] = useState("");
  const [files, setFiles] = useState("");

  //state ของการเก็บค่ารูปภาพ
  const [image, setImage] = useState("");

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

  // const leaveSickCount = events.filter((event) => event.title === "ลาป่วย").length;
  // const leavePersonalCount = events.filter((event) => event.title === "ลากิจ").length;
  // const travelPersonalCount = events.filter((event) => event.title === "ลาพักร้อน").length;
  // const othorlPersonalCount = events.filter((event) => event.title === "อื่นๆ").length;

  const currentYear = new Date().getFullYear();
  const currentMonths = new Date().getMonth();

  const eventsOfYearMonth = events.filter((item) => {
    const eventYear = new Date(item.start).getFullYear();
    const eventMonth = new Date(item.start).getMonth();
    return eventYear === currentYear && eventMonth === currentMonths;
  });

  // const eventsOfYear = events.filter((item) => {
  //   const eventYear = new Date(item.start).getFullYear();
  //   return eventYear === currentYear;
  // });

  const leaveSickCount = eventsOfYearMonth.filter(
    (event) => event.color === "#FF3366 "
  ).length;
  const leavePersonalCount = eventsOfYearMonth.filter(
    (event) => event.color === "#99CC33"
  ).length;
  const travelPersonalCount = eventsOfYearMonth.filter(
    (event) => event.color === "#00BFFF"
  ).length;
  const travelGoPersonalCount = eventsOfYearMonth.filter(
    (event) => event.color === "#FF66CC"
  ).length;
  const seminarPersonalCount = eventsOfYearMonth.filter(
    (event) => event.color === "#f7d342"
  ).length;
  const otherPersonalCount = eventsOfYearMonth.filter(
    (event) => event.color === "#BDB76B"
  ).length;

  const summary = [
    { type: "ลาป่วย", count: leaveSickCount },
    { type: "ลากิจ", count: leavePersonalCount },
    { type: "ลาพักร้อน", count: travelPersonalCount },
    { type: "ไปเที่ยว", count: travelGoPersonalCount },
    { type: "สัมมนาต่างจังหวัด", count: seminarPersonalCount },
    { type: "อื่นๆ", count: otherPersonalCount },
  ];

  // const summaryByYear = {
  //   [currentYear]: summary,
  // };
  const summaryByYearMonth = {
    [`${currentYear}-${currentMonths}`]: summary,
  };

  function getLeaveCount(year, leaveType) {
    const eventsOfYear = events.filter(
      (item) => new Date(item.start).getFullYear() === year
    );
    return eventsOfYear.filter((item) => item.title === leaveType).length;
  }
  const year = 2020;

  const leaveCount = getLeaveCount(year);

  const years = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push(i);
  }

  console.log("ได้อะไร", summaryByYearMonth); // แสดงผลลัพธ์ของการสรุปยอดลาปีปัจจุบัน
  //======================================================================================================================

  const loadData = () => {
    listEvent()
      .then((res) => {
        // console.log('ได้อะไร', res.data);
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // เพิ่มประชุม และเปลี่ยนออกงานนอกสถานที่ เป็นสัมนา
  const activity = [
    { id: "1", name: "ลาป่วย", color: "#FF3366" },
    { id: "2", name: "ลากิจ", color: "#99CC33" },
    { id: "3", name: "ลาพักร้อน", color: "#00BFFF" },
    { id: "4", name: "ไปเที่ยว", color: "#FF66CC" },
    { id: "5", name: "สัมมนาต่างจังหวัด", color: "#f7d342" },
    { id: "6", name: "อื่นๆ", color: "#BDB76B" },
  ];

  // function DragGable เป็นการดึงค่าจาก id external-event มาทั้งหมด เพื้่อให้สามารถดึงข้อมูลทีละตัวได้ เพราะตอนแรกจะไม่สามารถดึงข้อมูลได้มันจะเป็นการคลุมดำ
  const DragGable = () => {
    let DragGables = document.getElementById("external-event");
    // console.log("DragGables", DragGables);

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
    // console.log("handleDrop", event);
    let value = {
      id: event.draggedEl.getAttribute("id"),
      title: event.draggedEl.getAttribute("title"),
      color: event.draggedEl.getAttribute("color"),
      start: event.dateStr,
      end: moment(event.dateStr).add(1, "days").format("YYYY-MM-DD"),
    };
    console.log("มันเป็นยังไง", value);
    createEvent(value)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const onChangeValue = (e) => {
    // console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log( e.target.value);
    // console.log( e.target.name);
  };
  // function ของ modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    // console.log(values);

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

  //  moment(event.dateStr).add(+1, "days1").format("YYYY-MM-DD"),
  const handleSelect = (event) => {
    const newEnd = new Date(event.endStr); // สร้างวันที่ใหม่จาก event.endStr
    newEnd.setDate(newEnd.getDate()); // ลบ 1 วัน
    const endString = newEnd.toISOString().slice(0, 10); // แปลงเป็น string รูปแบบ 'yyyy-mm-dd'
    //หากกดที่วันที่ จะให้ขึ้น modal เข้ามา
    showModal();
    // console.log("คลิกแล้วได้อะไร", event);
    //ต้องการข้อมูลวันที่ start end เพื่อมา update ข้อมูล
    setValues({ ...values, start: event.startStr, end: endString });
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

  const d = moment().format("DD/MM/YYYY");
  const r = moment(); //เนื้องจากถ้าใช้ new Date()

  const filterDate = currentEvent.filter((item) => {
    // console.log('วันที่ที่กำหนด',d);
    // console.log("วันที่จากDB", item.start);
    // console.log("ตรงกันหรือไม่" ,d === moment(item.start).format("DD/MM/YYYY"));
    return d === moment(item.start).format("DD/MM/YYYY");
  });
  //console.log('ได้อะไร',filterDate);

  const betweenDate = currentEvent.filter((item) => {
    return r >= moment(item.start) && r < moment(item.end);
  });
  // console.log("between", betweenDate);
  // window.location.reload();

  //*Modal ตัวที่สอง สำหรับการคลิกที่ Event ของวันนั้นๆ
  //หากมีการกดที่กิจกรรมของวันนั้นๆ จะให้เลือกรูปภาพมาใส่
  const handleClick = (eventInfo) => {
    const id = eventInfo.event._def.extendedProps._id;
    setImage(eventInfo.event._def.extendedProps.filename);
    setId(id);
    showModal2();
  };

  const handleRemove = async () => {
    const result = await swal.fire({
      title: "คุณต้องการลบกิจกรรมหรือไม่",
      icon: "warning",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      removeEvent(id)
        .then(
          (res) => {
            swal.fire("แจ้งเตือน", res.data, "success");
            loadData();
          }
          // console.log(res)\
        )
        .catch((err) => {
          console.log("รอก่อนสิ", err);
        });
      setTimeout(() => {
        setIsModalOpen2(false);
      }, 1500);
    }
  };

  const handleFile = (event) => {
    const input = event.target.files[0];

    setFiles(input);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = async () => {
    // console.log(id, files); //หลังจากกดจะให้ส่งค่า id และ file ไป
    const formData = new FormData(); // ทำการสร้างตัวแปรมารับค่า เพื่อจะส่งไป update ที่หลังบ้าน
    formData.append("id", id);
    formData.append("files", files);
    handleFileUpdateImg(formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("เกิดอะไรขึ้น", err);
      });
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setImage("");
  };

  //function สำหรับการลากเลื่อน หรือย้ายตำแหน่งวันที่ จะต้องการค่า 3 ค่า คือ event ปัจจุบันและทำการ  update ข้อมูลใหม่โดยการ Axios UpdateEventChange
  const handleChanges = (e) => {
    // console.log(e.event.startStr, e.event.endStr);
    // console.log(e.event._def.extendedProps._id);

    const values = {
      id: e.event._def.extendedProps._id,
      start: e.event.startStr,
      end: e.event.endStr,
    };
    UpdateEventChange(values)
      .then((res) => {
        // toast.success('ทำการอัปเดตสำเร็จ')
        swal.fire("แจ้งเตือน", "ทำการอัปเดตข้อมูลสำเร็จ", "success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Modal สำหรับหน้าสรปรายงาน
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const showModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };

  const viewInfoEvent = () => {
    showModal3();
  };

  const showModal4 = () => {
    setIsModalOpen4(true);
  };
  const handleOk4 = () => {
    setIsModalOpen4(false);
  };
  const handleCancel4 = () => {
    setIsModalOpen4(false);
  };

  const viewInfoEvent2 = () => {
    showModal4();
  };

  const onChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div>
      <Row>
        <Col span={5}>
          {/* <SideMenu /> */}
          <Typography.Title
            
            className="text-center fontMitr"
            style={{ fontFamily: "mitr" ,fontSize: '18px' }}
          >
            ประเภทการหยุด
          </Typography.Title>
          <Card style={{ marginTop: "20px" }}>
            <div id="external-event">
              <ul style={{ fontFamily: "mitr" }}>
                {activity.map((item, index) => (
                  <li
                    className="fc-event mt-1 ps-1"
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
                        {" "}
                        <BsThermometerHigh /> {item.name}
                      </>
                    ) : item.name === "ลากิจ" ? (
                      <>
                        <FaBusinessTime className="me-1" /> {item.name}
                      </>
                    ) : item.name === "ลาพักร้อน" ? (
                      <>
                        <FaMountain className="me-1" />
                        {item.name}{" "}
                      </>
                    ) : item.name === "ไปเที่ยว" ? (
                      <>
                        <AiTwotoneCar className="me-1" />
                        {item.name}{" "}
                      </>
                    ) : item.name === "สัมมนาต่างจังหวัด" ? (
                      <>
                        <MdCardTravel className="me-1" />
                        {item.name}{" "}
                      </>
                    ) : item.name === "อื่นๆ" ? (
                      <>
                        {" "}
                        <FaQuestion className="me-1" /> {item.name}{" "}
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
            <Typography.Title className="fontMitr text-center" style={{fontSize: '18px'}}>
              กิจกรรมทั้งหมด
            </Typography.Title>
            <ol style={{ fontFamily: "mitr", fontWeight: "normal" }} className="ms-2">
              {currentEvent.map((item, index) => (
                <li key={index}>
                  {d === moment(item.start).format("DD/MM/YYYY") ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}{" "}
                      <Tag color="red" className="ms-2">วันนี้</Tag>{" "}
                    </>
                  ) : r >= moment(item.start) && r < moment(item.end) ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}{" "}
                      <Tag color="yellow"  className="ms-2">อยู่ระหว่างดำเนินการ</Tag>{" "}
                    </>
                  ) : r < moment(item.start) ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}{" "}
                      <Tag color="green"  className="ms-2">เร็วๆ นี้</Tag>{" "}
                    </>
                  ) : (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                    </>
                  )}
                </li>

                //                ถ้าวันที่ปัจจุบัน (d) เท่ากับวันที่เริ่มต้นของกิจกรรม (item.start) ให้แสดงข้อความว่า "วันนี้" (Tag สีเขียว) พร้อมกับแสดงรายละเอียดของกิจกรรม (item.title) และวันที่เริ่มต้น (moment(item.start).format("DD/MM/YYYY"))

                // ถ้าวันที่ปัจจุบัน (d) อยู่ระหว่างวันที่เริ่มต้น (item.start) และวันที่สิ้นสุด (item.end) ของกิจกรรม ให้แสดงข้อความว่า "อยู่ระหว่างดำเนินการ" (Tag สีเหลือง) พร้อมกับแสดงรายละเอียดของกิจกรรม (item.title) และวันที่เริ่มต้น (moment(item.start).format("DD/MM/YYYY"))

                // ถ้าวันที่ปัจจุบัน (d) น้อยกว่าวันที่เริ่มต้น (item.start) ให้แสดงข้อความว่า "กำลังมาถึง" (Tag สีแดง) พร้อมกับแสดงรายละเอียดของกิจกรรม (item.title) และวันที่เริ่มต้น (moment(item.start).format("DD/MM/YYYY"))

                // ถ้าไม่เข้าเงื่อนไขที่กล่าวมาข้างต้นเลย ให้แสดงรายละเอียดของกิจกรรม (item.title) พร้อมกับวันที่เริ่มต้น (moment(item.start).format("DD/MM/YYYY")) โดยไม่มี Tag สีเฉพาะอื่น ๆ ปรากฏอยู่
              ))}
            </ol>
          </Card>

          <Card>
            <Typography.Title
             
              className="text-center"
              style={{ fontFamily: "mitr",fontSize: '18px' }}
            >
              {" "}
              รายงานสรุป
            </Typography.Title>
            <Button
              onClick={viewInfoEvent}
              type="link"
              className="ms-2"
              style={{ fontFamily: "mitr" }}
            >
              <MdReorder className="mb-1" />
              คลิกดูข้อมูล
            </Button>
            <br />
            <Button
              onClick={viewInfoEvent2}
              type="link"
              className="ms-2"
              style={{ fontFamily: "mitr" }}
            >
              <MdReorder className="mb-1" />
              คลิกดูข้อมูลทั้งปี
            </Button>
          </Card>
        </Col>
        <Col span={18}>
          <Typography.Title
            level={1}
            className="text-center "
            style={{ fontFamily: "mitr" }}
          >
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
            editable={true} //สำหรับการลากเพิ่มวัน
            eventChange={handleChanges} // หากมีการแก้ไข
            locales={thLocale} //กำหนดให้ FullCalendar ใช้ภาษาไทย
            locale="th" //กำหนดให้ภาษาไทยเป็นภาษาหลัก
          />
          <Modal
            title="รายละเอียด"
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
          {/* //*modal สำหรับ EventClick */}
          <Modal
            title="image"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel2}
            footer={[
              //หากไม่มีการกำหนด key จะเกิด warning
              <Button
                key="remove"
                type="primary"
                danger
                ghost
                onClick={handleRemove}
              >
                <DeleteOutlined />
              </Button>,
              <Button
                key="cancel"
                type="primary"
                danger
                onClick={handleCancel2}
              >
                ยกเลิก
              </Button>,
              <Button key="ok" type="primary" onClick={handleOk2}>
                ตกลง
              </Button>,
            ]}
          >
            <Typography.Title level={2}>รายละเอียด</Typography.Title>
            <Card style={{ width: 360, objectFit: "contain" }} className="ms-5">
              <Image
                alt=""
                src={`${import.meta.env.VITE_REACT_APP_IMAGE}/${image}`}
              />{" "}
            </Card>
            <Input type="file" name="file" onChange={handleFile} />
          </Modal>

          <Modal
            title="รายงานสรุป"
            open={isModalOpen3}
            onOk={handleOk3}
            onCancel={handleCancel3}
          >
            <Typography.Title level={2}>รายละเอียด</Typography.Title>
            <table className="table" style={{ fontFamily: "mitr" }}>
              <thead>
                <tr>
                  <th scope="col">ปี</th>
                  <th scope="col">เดือน</th>
                  <th scope="col">ประเภท</th>
                  <th scope="col">จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {summaryByYearMonth[`${currentYear}-${currentMonths}`].map(
                  (item, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <th
                          rowSpan={
                            summaryByYearMonth[
                              `${currentYear}-${currentMonths}`
                            ].length
                          }
                          scope="row"
                        >
                          {currentYear}
                        </th>
                      )}
                      {index === 0 && (
                        <td
                          rowSpan={
                            summaryByYearMonth[
                              `${currentYear}-${currentMonths}`
                            ].length
                          }
                          scope="row"
                        >
                          {currentMonths + 1}
                        </td>
                      )}
                      <td>{item.type}</td>
                      <td>{item.count}</td>
                    </tr>
                  )
                )}
                <tr>
                  <th colSpan="3" scope="row" style={{ fontSize: 14 }}>
                    รวม
                  </th>
                  <td style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {summaryByYearMonth[
                      `${currentYear}-${currentMonths}`
                    ].reduce((acc, cur) => acc + cur.count, 0)}{" "}
                    ครั้ง
                  </td>
                </tr>
              </tbody>

              {/* <thead>
                <tr>
                  <th scope="row">ปี</th>
                  <th scope="row">ประเภทการหยุด</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan="6">{currentYear}</th>
                  <th scope="row">ลาป่วย</th>
                  <th>{getLeaveCount(currentYear, "ลาป่วย")}</th>
                </tr>
                <tr>
                  <th scope="row">ลากิจ</th>
                  <th>{getLeaveCount(currentYear, "ลากิจ")}</th>
                </tr>
                <tr>
                  <th scope="row">ลาพักร้อน</th>
                  <th>{getLeaveCount(currentYear, "ลาพักร้อน")}</th>
                </tr>
                <tr>
                  <th scope="row">ไปเที่ยว</th>
                  <th>{getLeaveCount(currentYear, "ไปเที่ยว")}</th>
                </tr>
                <tr>
                  <th scope="row">สัมมนาต่างจังหวัด</th>
                  <th>{getLeaveCount(currentYear, "สัมมนาต่างจังหวัด")}</th>
                </tr>
                <tr>
                  <th scope="row">อื่นๆ</th>
                  <th>{getLeaveCount(currentYear, "อื่นๆ")}</th>
                </tr>
              </tbody> */}
            </table>
          </Modal>

          <Modal
            title="รายงานสรุป"
            open={isModalOpen4}
            onOk={handleOk4}
            onCancel={handleCancel4}
          >
            <Typography.Title level={2}>รายละเอียด</Typography.Title>
            <table className="table" style={{ fontFamily: "mitr" }}>
              <thead>
                <tr>
                  <th scope="row">ปี</th>
                  <th scope="row">ประเภท</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {years.map((year, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th rowSpan="6">{year}</th>
                      <td scope="row">ลาป่วย</td>
                      <td>{getLeaveCount(year, "ลาป่วย")}</td>
                    </tr>
                    <tr>
                      <td scope="row">ลากิจ</td>
                      <td>{getLeaveCount(year, "ลากิจ")}</td>
                    </tr>
                    <tr>
                      <td scope="row">ลาพักร้อน</td>
                      <td>{getLeaveCount(year, "ลาพักร้อน")}</td>
                    </tr>
                    <tr>
                      <td scope="row">ไปเที่ยว</td>
                      <td>{getLeaveCount(year, "ไปเที่ยว")}</td>
                    </tr>
                    <tr>
                      <td scope="row">สัมมนาต่างจังหวัด</td>
                      <td>{getLeaveCount(year, "สัมมนาต่างจังหวัด")}</td>
                    </tr>
                    <tr>
                      <td scope="row">อื่นๆ</td>
                      <td>{getLeaveCount(year, "อื่นๆ")}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarComponent;

// { id: "1", name: "ลาป่วย", color: "#F1948A" },
//     { id: "2", name: "ลากิจ", color: "#82E0AA" },
//     { id: "3", name: "ลาพักร้อน", color: "#7FB3D5" },
//     { id: "4", name: "เที่ยวพักผ่อน", color: "#F9E79F" },
//     { id: "5", name: "ออกงานนอกสถานที่", color: "#D2B4DE" },
//     { id: "6", name: "อื่นๆ", color: "#D5D8DC" },

// {currentEvent.map((item, index) => (
//   <li key={index}>
//   {d === moment(item.start).format("DD/MM/YYYY")
//     ?  <>{moment(item.start).format("DD/MM/YYYY") + "-" + item.title} <Tag color="green">วันนี้</Tag> </>
//     : r >= moment(item.start) && r < moment(item.end)
//     ? <>{moment(item.start).format("DD/MM/YYYY") + "-" +item.title} <Tag color="yellow">อยู่ระหว่างดำเนินการ</Tag> </>
//     : r < moment(item.start)
//     ? <>{moment(item.start).format("DD/MM/YYYY") + "-" + item.title} <Tag color="blue">กำลังมาถึง</Tag> </>
//     : null
//   }
// </li>
// ))}
