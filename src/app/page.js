'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  let userType = [
    {
      name: "Member Portal",
      slug:"member",
      imgUrl: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-end-user-privacy-flaticons-flat-flat-icons-2.png"
    },
    {
      name: "Driver Portal",
      slug:'driver',
      imgUrl: "https://img.icons8.com/color/48/driver.png"
    },
    {
      name: "Admin Portal",
      slug:"admin",
      imgUrl: "https://img.icons8.com/office/30/administrator-male--v1.png"
    }
  ]
  const handleClick =(e)=>{
    console.log("object");
   router.push(e +"_signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className=' md:flex p-10  item-center'>
        <img className='w-36 h-20 flex m-auto'  src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png" alt="logo" />
        <div className='text-center'>
          <h1 className='text-2xl md:text-4xl px-4 pt-4  border-b border-black'>MUHAMMADI TRANSPORT SERVICE</h1>
          <p className='p-2'>Connecting You, Anywhere and Everywhere!</p>
        </div>
      </div>
      <div className='flex bg-white shadow-2xl '>
        <div className='hidden sm:flex sm:justify-center sm:items-center sm:py-18  sm:flex-col sm:border-2 sm:border-black'>
          <img style={{ borderRadius: "50%" }} className="border-2 p-10 border-black " width={240} height={240} src="https://muhammaditransport.com/wp-content/uploads/2023/03/cropped-logo-1.png" alt="logo" />
          <h2 className='mx-4 border-black border-t mt-6 font-extrabold' >MUHAMMADI TRANSPORT PORTAL</h2>
        </div>
        <div className='border-2 sm:border-y-2 sm:border-r-2 border-black'>
          {
            userType.map((val, index) => {
              return (
                <div onClick={(e)=> handleClick(val.slug)}  key={index} className='flex items-center py-4 px-10 hover:text-green-500 cursor-pointer'>
                  <img style={{ borderRadius: "50%" }} className='border-2 p-2 border-black' width="84" height="84" src={val.imgUrl} alt={val.name} />
                  <h3 className='p-4 font-bold'>{val.name}</h3>
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}
