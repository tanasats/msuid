//import React, { Suspense } from 'react'
import Header from './components/header'


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-slate-100 h-screen'>
            <Header />
            <div className="flex p-6 md:p-12">
                {children}
            </div>
        </div>
    );
}