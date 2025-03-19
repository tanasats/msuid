"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import { LuFingerprint } from 'react-icons/lu'



const CAUser = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const router = useRouter()
    return (
        <div>
            <div className='flex items-center gap-3 pb-6 text-xl'>
                <LuFingerprint className='h-8 w-8' />
                สร้างลายเซนดิจิทัล
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>
                    <div>
                        <Label>รหัสผ่าน</Label>
                        <Input name="password"></Input>
                    </div>
                    <div>
                        <Label>รหัสผ่านอีกครั้ง</Label>
                        <Input name="confirmpassword"></Input>
                    </div>
                    <div>
                        ระดับความปลอดภัย :
                    </div>
                    <div className='flex gap-3'>
                        <Button variant={"default"}>ยืนยัน</Button>
                        <Button variant={"secondary"} onClick={() => router.push('/dashboard')}>ยกเลิก</Button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CAUser