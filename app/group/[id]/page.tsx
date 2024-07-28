import Link from 'next/link'
import GroupEventCard from '../../components/GroupEventCard'
import { GROUP_OBJ } from '../../lib/global'
import EventChoiceButton from '../../components/EventChoiceButton'


export default function Home() {
  return (
    <>
      <div className='flex flex-col gap-5 w-[92%] mx-auto'>
        <GroupEventCard group={GROUP_OBJ[0]} />
      </div>
      <div className='flex w-full justify-between'>
        <EventChoiceButton />
      </div>
    </>
  )
}