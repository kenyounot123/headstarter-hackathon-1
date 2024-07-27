import Link from 'next/link'
import GroupEventCard from '../../components/GroupEventCard'
import { GROUP_OBJ } from '../../lib/global'

export default function Home() {
  return (
    <div className='flex flex-col gap-5 w-[80%] mx-auto'>
     <GroupEventCard group={GROUP_OBJ[0]} />
    </div>
  )
}