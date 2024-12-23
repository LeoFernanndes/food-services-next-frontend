import './globals.css'
import React from "react";

import AuthHandler from './components/AuthHandler';
import GlobalContainer from './components/GlobalContainer';
import TopNavbar from './components/TopNavbar';

export default function RootLayout({children}: { children: React.ReactNode}) {
    return (
        <html lang="en">
        <body>
            <AuthHandler>
                <GlobalContainer>
                    <div className='h-10'>
                        <TopNavbar/>
                    </div>
                    <div className='flex-1'>
                        {children}
                    </div>
                </GlobalContainer>
            </AuthHandler>
        </body>
        </html>
    )
}