interface EventDecisionButtonProps {
  decision: boolean 
}

export default function EventDecisionButton({decision}: EventDecisionButtonProps) {
  return (
    <button className="bg-primary-accent-color w-min rounded-xl p-5">
      <div className={`${decision ? "bg-[#D2E823]" : "bg-[#E9C0E9]"} rounded-full w-min p-5 text-6xl`}>
        {decision ? "👋": "👎"}
      </div>
      <p className="text-primary-text-color text-3xl font-[800] pt-5 text-nowrap">{decision ? "Join In": "Hold On"}</p>
    </button> 
  )
}