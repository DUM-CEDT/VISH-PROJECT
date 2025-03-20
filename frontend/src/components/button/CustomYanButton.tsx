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
import ThickLeftArrow from "../svg/ThickLeftArrow";
import ThickRightArrow from "../svg/ThickRightArrow";

export default function CustomYanButton({
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
        py-2
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

      {icon === 'GreaterSign' ? <GreaterSign width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'LessSign' ? <LessSign width={size.toString()+"px"} height={size.toString()+"px"} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Share' ? <Share width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Download' ? <Download width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Buy' ? <Buy width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Google' ? <Google width={size} height={size} className="group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Check' ? <Check width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Edit' ? <Edit width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Bin' ? <Bin width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Home' ? <Home width={size} height={size} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'ThickLeft' ? <ThickLeftArrow width={size.toString()+"px"} height={size.toString()+"px"} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'ThickRight' ? <ThickRightArrow width={size.toString()+"px"} height={size.toString()+"px"} className="fill-[#F9DFA1] group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}


      {front === true ? text : null}
      
    </button>
  );
}
