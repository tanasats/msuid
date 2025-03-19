"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { LuCopy, LuDownload, LuEye,  LuEyeOff, LuFileBadge, LuFileKey2,  } from 'react-icons/lu';
import { Input } from '@/components/ui/input';
import { getUserCertInfo,getUserCertFile } from '../actions/usercert-action';
import { Button } from '@/components/ui/button';

interface IUserCert {
  id: number;
  cn: string;
  mail: string;
  passphase:string;
  validfrom: string;
  validto: string;
}

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [userCert, setUserCert] = useState<IUserCert>();
  const [isCopied, setIsCopied] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      //router.replace("/signin");
    }
    getcerts();
  }, [isAuthenticated, router]);

  const getcerts = async () => {
    getUserCertInfo()
      .then(([cert]) => {
        //console.log("getUserCertInfo()= ", cert);
        setUserCert(cert);
      })
      .catch((reason) => {
        console.log("reason=", reason.statusText)
      });
  }

  const handleDownload = async () =>{
    console.log("handleDownload")
    try {
      
      const response = await getUserCertFile();
      //const blob = await response.blob();
      const filename = response.filename;

      // สร้าง URL จาก Blob
      const url = window.URL.createObjectURL(await response.data);
      
      // สร้าง element <a> เพื่อดาวน์โหลด
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename||"error.txt"); // ตั้งชื่อไฟล์ตาม Content-Disposition
      document.body.appendChild(link);
      
      // จำลองการคลิกลิงก์
      link.click();
      
      // ล้างหน่วยความจำ
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดาวน์โหลด:', error);
    }
  }

  const handleCopy = async () => {
    try {
    // Copy text to clipboard
      await navigator.clipboard.writeText(userCert?.passphase||""); 
      setIsCopied(true); // Show "Copied!" effect
      //setShowNotification(true); // Show notification
       // Remove "Copied!" text after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      // Hide notification after 3 seconds
      //setTimeout(() => setShowNotification(false), 3000); 
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className='w-full'>


      <div className='grid gap-6 md:grid-cols-2  '>

        {/* My Digital Signature */}
        <div className='border bg-white rounded-md border-slate-200 p-4'>
          <div className='flex items-center gap-2 text-xl mb-4 text-blue-900'>
            <LuFileKey2 className='h-8 w-8' />ลายมือชื่อดิจิทัล (Digital Signature)
          </div>
          <table className="border-separate border-spacing-x-3 mb-3">
            <tbody>
              <tr>
                <td className='text-right font-bold align-text-top'>Issue to:</td>
                <td className='align-text-top'>{userCert && `${userCert.cn} <${userCert?.mail}>`}</td>
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
                <td className='align-text-top'>{userCert?.mail}{userCert && ".p12"}</td>
              </tr>
            </tbody>
          </table>
          <div className='flex items-center gap-2 py-3'>
            <label className='font-bold'>Password: </label>
            {isShowPassword?
            <button className={`border p-2 rounded-sm bg-slate-200`} onClick={()=>setIsShowPassword(!isShowPassword)}><LuEye /></button>
            :<button className={`border p-2 rounded-sm bg-slate-200`} onClick={()=>setIsShowPassword(!isShowPassword)} ><LuEyeOff /></button>
          }
            <Input type={isShowPassword ? "text" : "password"} value={userCert?.passphase} />
            <button className={`border p-2 rounded-sm ${isCopied?"bg-green-600 text-white":"bg-slate-200"}`} onClick={()=>handleCopy()} ><LuCopy /></button>
          </div>
          <div className='flex justify-end'>
            {userCert && <Button onClick={()=>{handleDownload()}} className='flex w-fit items-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-sm'>
              <LuDownload className='w-6 h-6' />
              Download
            </Button>}
          </div>
        </div>

        {/* Trust CA */}
        <div className='bg-white rounded-md border-slate-200 p-4 h-fit'>
          <div className='flex items-center gap-2 text-xl mb-4 text-blue-900'>
            <LuFileBadge className='h-8 w-8' />ใบรับรองอิเล็กทรอนิกส์ (Trust Root CA)
          </div>

          <div className='mb-3 gap-y-3'>
            <div>สำหรับติดตั้งในโปรแกรม Acrobat Reader</div>
            <div className='flex items-center gap-3'><span className="font-bold">File:</span>
              <a href="https://cdp.msu.ac.th/TUCTrustedCert.fdf" className='hover:text-blue-700'>TUCTrustedCert.fdf</a>
              <a href="https://cdp.msu.ac.th/TUCTrustedCert.fdf" className='hover:text-blue-700'><LuDownload /></a>
            </div>
          </div>
          <div className='mb-3 gap-y-3'>
            <div>สำหรับติดตั้งในโปรแกรม Foxit Reader</div>
            <div className='flex items-center gap-3'><span className="font-bold">File:</span>
              <a href="https://cdp.msu.ac.th/TUCTrustedCert.cer" className='hover:text-blue-700'>TUCTrustedCert.cer</a>
              <a href="https://cdp.msu.ac.th/TUCTrustedCert.cer" className='hover:text-blue-700'><LuDownload /></a>
            </div>
          </div>
        </div>




      </div>




      {/* <div className='flex flex-col items-center justify-center pb-6 gap-3 m-3'>
        <p className='indent-6'>
          ไฟล์ . p12 หรือ . pkcs12 คือรูปแบบไฟล์ที่ใช้สำหรับการเก็บรวบรวมและจัดการกับคีย์ส่วนตัว (private keys) และใบรับรอง (certificates) ในรูปแบบที่ปลอดภัย.
        </p>
      </div> */}





      {/* <div className='flex flex-col items-center justify-center pb-6'>
        <Link href={"dashboard/causer"} className=' flex flex-grow-1 w-fit items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded'>
          <LuFingerprint className='w-6 h-6' />
          สร้างลายเซ็นดิจิทัล
        </Link>
        <p className='p-4'>ลายเซ็นดิจิทัล (Digital Signature) คือลายเซ็นอิเล็กทรอนิกส์ (Electronic Signature) ประเภทหนึ่งที่ได้รับการรับรองโดยใบรับรองดิจิทัล </p>
      </div>
      <CertItem /> */}


    </div>
  )
}

export default Dashboard