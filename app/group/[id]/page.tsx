import Link from 'next/link'
import GroupEventCard from '../../components/GroupEventCard'
import { GROUP_OBJ } from '../../lib/global'
import EventDecisionButton from '../../components/EventChoiceButton'


export default function Home() {
  return (
    <div className='flex flex-col gap-5 w-[80%] mx-auto'>
     <GroupEventCard group={GROUP_OBJ[0]} />
     <div className='flex w-full justify-between'>
     <EventDecisionButton />
     </div>
    </div>
  )
}