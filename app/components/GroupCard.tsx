import Image from "next/image"

interface GroupCardProps {
  groupName: string;
  groupImgSrc: string;
}
export default function GroupCard({groupName, groupImgSrc}: GroupCardProps) {
  return (
    <button className="w-full relative">
      <h2 className="text-left rounded-t-md bg-primary-accent-color text-primary-text-color p-1 text-xl">{groupName}</h2>
      <div className="h-32">
        <Image 
         src={groupImgSrc}
         width={0}
         height={0}
         alt="Picture of the author"
         sizes="100vw"
         className="w-full h-full object-cover rounded-b-md" />
      </div>

      <div>

      </div>
    </button>
  )
}