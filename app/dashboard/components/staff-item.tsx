'use client'
import { IStaff } from '@/app/interfaces/staff'
import React, { useEffect } from 'react'

type Props = {
    staffs: IStaff[]
}

const StaffItem = ({ staffs }: Props) => {
    useEffect(()=>{
        // console.log("staff-item")
        // const xx = staffs.filter(item=>item.staffemail1==null);
        // console.log("no msu-mail : ",xx)
    },[staffs]);
    return (
        <div>
            <div>count: {staffs.length}</div>
            <div></div>
                {staffs.map((item) => (
                    <div key={item.staffid} className='flex gap-4'>
                        <span>{item.staffid}</span>
                        <span>{item.staffname} {item.staffsurname}</span>
                        <span>{item.facultyname}</span>
                        <span>{item.staffemail1}</span>
                        <span>{item.staffemail2}</span>
                    </div>
                ))}
            
        </div>
    )
}

export default StaffItem