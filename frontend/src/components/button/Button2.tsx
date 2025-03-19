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

export default function Button2({
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
    minWidth?: number;
  }) {
    return (
      <button
        className="
          bg-primary hover:bg-[#90ACE5] active:bg-white
          text-white hover:text-black active:text-black
          font-regular 
          py-2 px-[44px] 
          rounded-full
          border-2
          border-white hover:border-primary active:border-primary
          shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)]
          transition-all duration-300 ease-in-out
          group
            flex
            flex-row
            items-center
            justify-center
            gap-2
        "
        style={{ fontSize: `${size}px`, minWidth: minWidth ? `${minWidth}px` : undefined }} 
        onClick={onClick}>

        {front === false ? text : null}

        {icon === 'GreaterSign' ? <GreaterSign width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'LessSign' ? <LessSign width={size.toString()+"px"} height={size.toString()+"px"} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Share' ? <Share width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Download' ? <Download width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Buy' ? <Buy width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Google' ? <Google width={size} height={size} className="group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Check' ? <Check width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Edit' ? <Edit width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Bin' ? <Bin width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        {icon === 'Home' ? <Home width={size} height={size} className="fill-white group-hover:fill-black transition-all duration-300 ease-in-out"/> : null}
        

        {front === true ? text : null}
      </button>
    );
  }
  