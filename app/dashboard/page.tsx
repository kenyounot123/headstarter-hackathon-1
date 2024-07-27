import Link from 'next/link'
import GroupCard from '../components/GroupCard'
export default function Home() {
  return (
    <div className='flex flex-col gap-5 w-[80%] mx-auto'>
      <p className='self-end py-5'>Email@123.gmail.com</p>
      <button className='mt-5 rounded-xl flex justify-center py-5 bg-primary-accent-color text-primary-text-color relative'>
        <p className='text-5xl font-[900]'>create <span className="block">group</span></p>
        <div className='text-6xl absolute bottom-3 right-7'>🦆</div>
      </button>
      <button className='rounded-xl flex justify-center py-5 bg-secondary-accent-color text-primary-accent-color relative'>
        <div className='flex flex-col gap-1 items-center w-[70%]'>
          <p className='text-5xl font-[900]'>join group</p>
          <input className="outline-none w-full py-2 px-4" type="text" placeholder='group password'/>
        </div>
        <div className='text-4xl absolute bottom-2 right-7'>🐤</div>
      </button>
      <GroupCard groupName={"Mountain meetups"} groupImgSrc={"/images/card-img.png"}/>
    </div>
  )
}