import { Link } from "react-router-dom";

const CircleAction = ({ icon, label, to }) => {
  // <Link to={to} className="flex flex-col items-center gap-2">
  //   <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
  //     {icon}
  //   </div>
  //   <span className="text-sm font-medium">{label}</span>
  // </Link>;
  return (
    <Link to={to} className="group flex flex-col items-center">
      <div
        className="
        w-14 h-14
        bg-white
        rounded-full
        shadow-lg
        flex items-center justify-center
        transition-transform duration-300
        group-hover:scale-125
        group-hover:shadow-2xl
      "
      >
        {icon}
      </div>

      <span
        className="
        text-xs mt-2 font-medium
        opacity-0 group-hover:opacity-100
        transition
      "
      >
        {label}
      </span>
    </Link>
  );
};

export default CircleAction;
