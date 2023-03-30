import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {HomeOutlined , DashboardOutlined , FormOutlined ,UnorderedListOutlined ,LoadingOutlined ,UserOutlined ,EditOutlined ,TeamOutlined} from '@ant-design/icons'
const SideMenu = () => {
  // const navigate = useNavigate()
  return (
    <div >
      <Menu
      mode='inline'
        // onClick={(item) => {
        //   //item.key
        //   navigate(item.key);
        // }}
        items={[
          {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />
          },
          {
            label: "หน้าการทำงาน",
            key: "homework", 
            icon: <HomeOutlined /> ,
            children:[{
              label: "ฟอร์มบันทึกเคส",
              key: "/formcontrol",
              icon: <FormOutlined />
            },
            {
              label: "รายการเคสทั้งหมด",
              key: "/listcase",
              icon: <UnorderedListOutlined />
            },
            {
              label: "รายการเคสที่รอการแก้ไข",
              key: "/listunresolve",
              icon:<LoadingOutlined />
            },
            ]
          },
         
          {
            label: "Customers",
            key: "user",
            icon:<UserOutlined />,
              children:[
                {
                  label: "แก้ไขรหัสผ่าน",
                  key: "/reset-password",
                  icon:<EditOutlined />
                },
                {
                  label: "สมาชิกทั้งหมด",
                  key: "/listuser",
                  icon:<TeamOutlined />
                }
              ]
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu 