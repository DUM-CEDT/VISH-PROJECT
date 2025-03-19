import GreaterSign from "../svg/GreaterSign";
import LessSign from "../svg/LessSign";
import Share from "../svg/Share";
import Buy from "../svg/Buy";
import Download from "../svg/Download";
import Google from "../svg/Google";
import Check from "../svg/Check";
import Edit from "../svg/Edit";
import Bin from "../svg/Bin";
import Home from "../svg/Home";

export default function Button1({
  size = 16,
  text = "ตัวหนังสือ",
  icon = "",
  front = false,
  onClick,
  minWidth
}: {
  size?: number;
  text?: string;
  icon?: string;
  front?: boolean;
  onClick?: () => void;
  minWidth?: string;
}) {
  return (
    <button
      className="
        bg-white hover:bg-secondary active:bg-primary
        text-black hover:text-white active:text-white
        font-regular 
        py-2 px-8 
        rounded-full
        border-2
        border-primary hover:border-white active:border-white
        shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)]
        transition-all duration-300 ease-in-out
        group
        flex
        flex-row
        items-center
        justify-center
        gap-2
      "
      style={{ fontSize: `${size}px`, minWidth: minWidth ? `${minWidth}` : undefined }} 
      onClick={onClick}>

      {front === false ? text : null}

      {icon === 'GreaterSign' ? <GreaterSign width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'LessSign' ? <LessSign width={size.toString()+"px"} height={size.toString()+"px"} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Share' ? <Share width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Download' ? <Download width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Buy' ? <Buy width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Google' ? <Google width={size} height={size} className="group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Check' ? <Check width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Edit' ? <Edit width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Bin' ? <Bin width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Home' ? <Home width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      

      {front === true ? text : null}
      
    </button>
  );
}
