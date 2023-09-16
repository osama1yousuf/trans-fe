'use client'
import { useEffect, useState } from 'react'
import Dashboard from './Components/Dashboard'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
   const [sideBarValue , setSideBarValue] = useState([])
  let adminTab =  [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      active: false,

    },
    {
      name: "Driver",
      url: "driver",
      active: false,
      Content: [
        {
          name: "Create Driver",
          endpoints: 'admin/createdriver'
        }, {
          name: "Active Driver",
          endpoints: 'admin/activedriver'
        },
        {
          name: "InActive Driver",
          endpoints: 'admin/inactivedriver'
        }
      ]
    }, {
      name: "Member",
      url: "member",
      active: false,
      Content: [
        {
          name: "Create Member",
          endpoints: 'admin/createmember'
        }, {
          name: "Active Member",
          endpoints: 'admin/activemember'
        },
        {
          name: "InActive Member",
          endpoints: 'admin/inactivemember'
        }
      ]
    }
    ,
    {
      name: "Location",
      url: "admin/location",
      active: false,
    },
  ]
  let memberTab =  [
    {
      name: "Dashboard",
      url: "/member/dashboard",
      active: false,

    }
  ]
  let driverTab =  [
    {
      name: "Dashboard",
      url: "/driver/dashboard",
      active: false,

    }
  ]
  
  useEffect(() => {
    if (pathname !== '/' && pathname !== '/signUp' && pathname !== '/member_signin' && pathname !== '/driver_signin' && pathname !== '/admin_signin') {
      let token = localStorage.getItem('token')
      console.log("token", token);
      if (!token) {
        router.push('/')
      }
    }
    if (pathname.includes('/driver')) {
      setSideBarValue(driverTab)
     }else if (pathname.includes('/member')) {
      setSideBarValue(memberTab)
     }else if(pathname.includes('/admin')){
      setSideBarValue(adminTab)
     }

  }, [])
  return (
    <html lang="en">

      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          // autoClose={200}
          // rtl={false}
          // pauseOnFocusLoss={false}
          // draggable={false}
          theme="colored"
        />
        <Dashboard sideBarValue={sideBarValue}>
          {children}
        </Dashboard>
      </body>
    </html>
  )
}
