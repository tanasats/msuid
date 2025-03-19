import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { LuClipboardCopy, LuDownload, LuEyeClosed, LuFileKey2 } from 'react-icons/lu'
type Props = {
    userCert:{
        id:number;
        cn:string;
        mail:string;
        validfrom:string;
        validto:string;
    };
  }

const UserCertItem = ({userCert}:Props) => {
  return (
    <div className='border bg-white rounded-md border-slate-200 p-4'>
    <div className='flex items-center gap-2 text-xl mb-4 text-blue-900'>
      <LuFileKey2 className='h-8 w-8' />ลายมือชื่อดิจิทัล (Digital Signature)
    </div>
    <table className="border-separate border-spacing-x-3 mb-3">
      <tbody>
        <tr>
          <td className='text-right font-bold align-text-top'>Issue to:</td>
          <td className='align-text-top'>{userCert && `${userCert.cn} <${ userCert?.mail}>`}</td>
        </tr>
        <tr>
          <td className='text-right font-bold align-text-top'>ออกให้โดย:</td>
          <td className='align-text-top'>{userCert && "Mahasarakham University Certification Authority"}</td>
        </tr>
        <tr>
          <td className='text-right font-bold align-text-top'>วันที่ออกให้:</td>
          <td className='align-text-top'>{userCert?.validfrom}</td>
        </tr>
        <tr>
          <td className='text-right font-bold'>วันที่หมดอายุ:</td>
          <td className='align-text-top'>{userCert?.validto}</td>
        </tr>
        <tr>
          <td className='text-right font-bold align-text-top text-nowrap'>Digital ID file:</td>
          <td className='align-text-top'>{userCert?.mail}{userCert&&".p12"}</td>
        </tr>
      </tbody>
    </table>
    <div className='flex items-center gap-2 py-3'>
      <label className='font-bold'>Password: </label>
      <button className='border p-2 rounded-sm bg-slate-200'><LuEyeClosed /></button>
      <Input type='password' value={"*********"} />
      <button className='border p-2 rounded-sm bg-slate-200'><LuClipboardCopy /></button>
    </div>
    <div className='flex justify-end'>
      <Button className=' flex w-fit items-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-sm'>
        <LuDownload className='w-6 h-6' />
        Download
      </Button>
    </div>
  </div>
  )
}

export default UserCertItem