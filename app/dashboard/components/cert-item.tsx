import { LucideDownload } from 'lucide-react'
import React from 'react'
import { LuFingerprint } from 'react-icons/lu'

const CertItem = () => {
  return (
    <div className='flex gap-4 hover:bg-slate-100 p-3 rounded'>
    <div className='flex flex-col justify-between'>
      <LuFingerprint className='w-16 h-16' />
      <div className='flex justify-center py-1'>
        <LucideDownload className='hover:text-yellow-500' />
      </div>
    </div>
    <div className='flex-grow ps-4'>
      <div><span className='font-bold'>Issue to:</span> ธนศาสตร์ สุดจริง &lt;tanasat.s@msu.ac.th &gt;</div>
      <div><span className='font-bold'>Issued by:</span> Mahasarakham University Certification Authority</div>
      <div><span className='font-bold'>Valid From:</span> Mar 10 23:43:56 2025 GMT</div>
      <div><span className='font-bold'>Valid To:</span> Mar 10 23:43:56 2026 GMT</div>
      {/* <div><span className='font-bold'>MD5 Fingerprint:</span> 24:C0:CA:A5:C1:DA:E5:BD:E6:7C:2B:08:58:6D:57:DA</div> */}
      <div><span className='font-bold'>SHA1 Fingerprint:</span> 08:91:5D:49:1E:27:38:5A:63:9A:EA:94:CA:6E:A7:16:85:52:91:8C</div>
      <div><span className='font-bold'>SHA256 Fingerprint:</span> 15:9E:64:56:FC:F0:05:BB:2D:E7:B3:43:22:7F:54:43:4E:A7:BB:77:26:CD:9E:A6:8F:39:C4:6E:7D:C5:EE:4C</div>
    </div>
    <div className='flex flex-col items-end gap-2 text-sm'>
      <button className='bg-green-700 px-4 py-1 rounded text-white hover:bg-green-600 flex gap-1'>Download</button>
      <button className='bg-red-700 px-4 py-1 rounded text-white hover:bg-red-600'>เพิกถอนใบรับรอง</button>
    </div>
  </div>
  )
}

export default CertItem