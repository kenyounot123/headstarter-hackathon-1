import Image from "next/image";

interface GroupProps {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventMembers: string[];
  groupImgSrc: string;
}

// Interface for the object that includes GroupProps
interface Group {
  group: GroupProps;
}

export default function GroupEventCard({ group }: Group) {
  return (
    <div className="w-full relative">
      <h2 className="text-left text-primary-accent-color p-[0.5vh] text-[4vh] font-[900]">
        {`${group.eventDate} ${group.eventTime}`}
      </h2>
      <h2 className="text-left rounded-t-[0.5vh] bg-primary-accent-color text-primary-text-color py-[1vh] px-[2vh] text-[4vh] font-[900]">
        {group.eventName}
      </h2>
      <div className="h-[28vh]">
        <Image
          src={group.groupImgSrc}
          width={0}
          height={0}
          alt="Picture of the author"
          sizes="100vw"
          className="w-full h-full object-cover rounded-b-md"
        />
      </div>
      <div className="w-full flex items-center justify-between py-[2vh]">
        <h2 className="flex gap-[1vh] items-center text-left rounded-full bg-primary-accent-color w-fit text-primary-text-color text-[2.5vh] p-[2vh]">
          <div className="flex justify-center items-center m-auto w-[30px] h-[30px] bg-primary-text-color rounded-full">
            <span className="text-center m-auto">🦆</span>
          </div>
          {group.eventMembers[0]}
        </h2>

        <div className="flex gap-[1vh]">
          <h2 className="flex gap-[0.75vh] text-left rounded-full bg-primary-accent-color w-fit text-primary-text-color text-[2.5vh] p-[2vh]">
            {group.eventMembers.map((member, id) => (
              <div
                key={id}
                className="flex justify-center items-center m-auto w-[30px] h-[30px] bg-primary-text-color rounded-full"
              >
                <span className="text-center m-auto">🐤</span>
              </div>
            ))}
          </h2>

          <button className="bg-primary-text-color rounded-full p-[1vh]">
            <Image
              alt="eye"
              src={"/images/eye-solid.svg"}
              width={0}
              height={0}
              className="w-[4vh] h-[4vh]"
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
