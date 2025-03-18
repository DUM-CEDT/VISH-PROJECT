import GreaterSign from "../svg/GreaterSign";
import LessSign from "../svg/LessSign";
import Share from "../svg/Share";
import Buy from "../svg/Buy";
import Download from "../svg/Download";
import Google from "../svg/Google";

export default function NavButton({
  size = 16,
  next = true,
  onClick,
  
}: {
  size?: number;
  next?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="
        bg-white hover:bg-secondary active:bg-primary
        text-secondary hover:text-white active:text-white
        font-regular 
        p-2
        rounded-full
        shadow-[-2px_-2px_4px_rgba(250,250,250,0.3),2px_2px_4px_rgba(21,33,63,0.3)]
        transition-all duration-300 ease-in-out
        group
        flex
        items-center
        justify-center
      "
      style={{ fontSize: `${size}px` }} 
      onClick={onClick}>

      {next ? <GreaterSign width={size} height={size} className="fill-secondary group-hover:fill-white transition-all duration-300 ease-in-out"/> : 
      <LessSign width={size.toString()+"px"} height={size.toString()+"px"} className="fill-secondary group-hover:fill-white transition-all duration-300 ease-in-out"/> }
    </button>
  );
}
