'use client'
import React, { useEffect, useState } from 'react'
import { getStaffAll } from '../actions/staff-action';
import { IStaff } from '../interfaces/staff';
import StaffItem from './components/staff-item';
import { fetchADUser } from '../actions/ad-action';
import { Input } from '@/components/ui/input';

// interface Staff {
//   "staffid": string;
//   "prefixid": string;
//   "prefixfullname": string;
//   "namefully":string,
//   "staffname": string;
//   "staffsurname": string;
//   "prefixinitialseng": " ",
//   "staffnameeng": string;
//   "staffsurnameeng": string;
//   "posnameth": string;
//   "facultyid": string;
//   "facultyname": string;
//   "departmentid": string;
//   "departmentname": string;
//   "programid": string;
//   "programname": string;
//   "staffphone1": string;
//   "staffphone2": string;
//   "staffemail1": string;
//   "staffemail2": string;
// }

//const staffs: IStaff[] = []; // กำหนดให้เป็นอาร์เรย์ของ Staff


const Dashboard = () => {
  const [staffs, setStaffs] = useState<IStaff[]>([]);
  const [uniqueFacultyname, setUniqueFacultyname] = useState<string[]>([]);
  const [filterStaffs,setFilterStaffs] = useState<IStaff[]>([]);
  const [selectedOU,setSelectedOU] = useState("");
  const [selectedFaculty,setSelectedFaculty] = useState("");

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = () => {
    getStaffAll().then((response: IStaff[]) => {
      setStaffs(response);
      const uniquename = [...new Set(response.map(item => item.facultyname))];
      setUniqueFacultyname(uniquename);
      console.log(uniquename);
    });
  };

  const filterERPStaff = () => {
    const facultyname = selectedFaculty;
    const tmp = staffs.filter((item)=>{ if(item.facultyname==facultyname) return item})      
      setFilterStaffs(tmp)
    console.log("filterERPStaff() = ",tmp);
  }  


  const getAdUser = () => {
    const ou = selectedOU;
    fetchADUser(ou)
    .then((response) => {
      console.log(response)
    })
  }

  // const insertdb = async () => {
  //   let count=0;
  //   for(let i=0;i<staffs.length;i++){
  //     await insertStaff(staffs[i]).then((result)=>{
  //       count = count+result.affectedRows;
  //     })
  //   }
  //   console.log("insert success = ",count);
  // }

  return (
    <div>Dashboard
      <div>จำนวนบุคลากรทั้งหมด {staffs.length} คน</div>
      <div>จำนวนคณะ/หน่วยงาน {uniqueFacultyname.length} รายการ</div>

      <Input 
      onChange={(e) => setSelectedFaculty(e.target.value)}
      ></Input>

      <Input 
      onChange={(e) => setSelectedOU(e.target.value)}
      ></Input>

      <button className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500' onClick={()=>filterERPStaff()}>Get ERP Staff</button>
      {/* <button className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500' onClick={()=>insertdb()}>insert</button> */}
      <button className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500' onClick={()=>getAdUser()}>Get AD Staff</button>







      <StaffItem
        staffs={filterStaffs}
      />
      
 

    </div>
  )

} // Dashboard

export default Dashboard