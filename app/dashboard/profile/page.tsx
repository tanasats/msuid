"use client"
import { getByUsername } from '@/app/actions/user-action';
import { useSession } from '@/app/context/sessioncontext';
import { IUser } from '@/app/interfaces/user';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { LuMail, LuShieldCheck } from 'react-icons/lu';

const Profile = () => {
    const { user } = useSession();
    const [userdata, setUserdata] = useState<IUser>();
    const [profilepic, setProfilepic] = useState('/blank_avatar.jpg');
    

    useEffect(() => {
        if (user) {
            console.log("profile useEffect() user.id=", user?.id);
            getByUsername(user.id).then((res) => {
                console.log("res:", res)
                setUserdata(res);
                //setProfilepic("https://pd.msu.ac.th/staff/picture/"+res[0].msuid+".jpg")
                setProfilepic("/blank_avatar.jpg")
            }).catch((reason) => {
                console.log("reject reason:", reason);
            }).finally(() => {
                console.log("final")
            })
        }
    }, [user])

    return (
        <div className='content-wrapper'>
            {userdata && <div className="p-4">
                <Image
                    src={profilepic}
                    height={200}
                    width={200}
                    alt=""
                    className="rounded-full aspect-square object-cover border border-slate-200"
                />
                {/* {userdata.map((item,idx) => (
                    <div  className='flex flex-col gap-1 mt-4'>
                        <div className='text-xl text-header-color'>{item.fullname}</div>
                        <div className='flex items-center gap-2'><LuMail />{item.username}</div>
                        <div className='flex items-center gap-2'><LuMail />{item.faculty}</div>
                        <div className='flex items-center gap-2'><LuMail />{item.mail}</div>
                        <div className='flex items-center gap-2'><LuShieldCheck />{item.usertype}</div>
                    </div>
                ))} */}

                <div className='flex flex-col gap-1 mt-4'>
                    <div className='text-xl text-header-color'>{userdata.fullname}</div>
                    <div className='flex items-center gap-2'><LuMail />{userdata.username}</div>
                    <div className='flex items-center gap-2'><LuMail />{userdata.faculty}</div>
                    <div className='flex items-center gap-2'><LuMail />{userdata.mail}</div>
                    <div className='flex items-center gap-2'><LuShieldCheck />{userdata.usertype}</div>
                </div>


            </div>}
        </div>
    )
}

export default Profile