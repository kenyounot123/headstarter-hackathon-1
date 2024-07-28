"use client";

import GroupEventCard from "../../components/GroupEventCard";
import { GROUP_OBJ } from "../../lib/global";
import EventDecisionButton from "../../components/EventChoiceButton";
import UpcomingDwadlesButton from "../../components/UpcomingDwadlesButton"
import { usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // this works for search params:
  // http://localhost:3004/group/id?123

  return (
    <div className="flex flex-col gap-5 w-[92%] mx-auto">
      <div className="flex w-full m-auto justify-center items-center">
        <Link href="/dashboard">
          <Image
            alt="eye"
            src={"/images/arrow-right-solid.svg"}
            width={0}
            height={0}
            className="w-[3.5vh] h-[3.5vh] rotate-180"
          />
        </Link>
        <div className="relative flex w-full justify-around  items-center text-center text-[3vh] p-[0.5vh] rounded-[1vh] my-[2vh]">
          <h1 className="text-primary-text-color">{searchParams}</h1>
          <div className="flex gap-[1vh] justify-center items-center absolute right-0">
            <div className="bg-primary-text-color rounded-full flex justify-center items-center w-[4vh] h-[4vh[">
              <Image alt="new members" width={0} height={0} className="w-[4vh] h-[4vh[" src={"/images/add-new.png"}></Image>
            </div>
          </div>
        </div>
      </div>

      <GroupEventCard group={GROUP_OBJ[1]} />
      <div className="flex w-full justify-between">
        <EventDecisionButton />
      </div>
      <UpcomingDwadlesButton groups={GROUP_OBJ}/>
      <button className="font-[900] bg-primar">
        event +
      </button>
    </div>
  );
}
