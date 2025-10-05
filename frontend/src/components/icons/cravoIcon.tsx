import cravoLogo from "../../assets/Untitled design.png"
import { cn } from "../../lib/utils"

const CravoIcon = ({
    className,
    isCollapsed = false
}: {
    className?: string,
    isCollapsed?: boolean
}) => {
  return (
    <div className={cn(
        "size-8 rounded-full overflow-hidden",
        isCollapsed ? "" : "ml-3",
        "transition-all duration-300",
        className
    )} >
        <img src={cravoLogo} className="w-full h-full object-cover" draggable="false"/>
    </div>
  )
}

export default CravoIcon