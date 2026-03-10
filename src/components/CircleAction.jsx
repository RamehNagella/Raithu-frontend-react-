import { Link } from "react-router-dom";

const CircleAction = ({ icon, label, to, bgColor, size = "w-14 h-14" }) => {
  // <Link to={to} className="flex flex-col items-center gap-2">
  //   <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
  //     {icon}
  //   </div>
  //   <span className="text-sm font-medium">{label}</span>
  // </Link>;
  // return (
  //   <Link to={to} className="group flex flex-col items-center">
  //     <div
  //       className={`
  //       w-12 h-12
  //       ${bgColor || "bg-white/30"}
  //       rounded-full
  //       shadow-lg
  //       flex items-center justify-center
  //       transition-transform duration-300
  //       group-hover:scale-125
  //       group-hover:shadow-2xl
  //       group-hover:shadow-yellow-900/40
  //       group-hover:ring-1
  //       group-hover:ring-orange-600/90
  //     `}
  //     >
  //       {icon}
  //     </div>
  //     <span
  //       className="
  //       text-xs mt-2 font-medium
  //       opacity-0 group-hover:opacity-100
  //       transition
  //       "
  //     >
  //       {label}
  //     </span>
  //   </Link>
  // );
  return (
    <Link to={to} className="group flex flex-col items-center">
      <div
        className={`
        relative
        ${size}
        ${bgColor || "bg-white/30"}
        rounded-full
        shadow-lg
        flex items-center justify-center
        transition-all duration-300
        group-hover:scale-125
        group-hover:shadow-3xl
        overflow-hidden
      `}
      >
        {/* Right half yellow gradient overlay */}
        <div
          className="
        absolute top-0 right-0
        w-1/2 h-full
        bg-gradient-to-l from-yellow-400/60 via-yellow-300/40 to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-300
        rounded-r-full
      "
        ></div>
        {/* Icon and name */}
        <div className="relative z-10 flex flex-col items-center gap-0.5">
          <div className="text-sm">{icon}</div>
          <span className="text-[9px] font-bold">{label}</span>
        </div>{" "}
      </div>

      {/* <span
        className="
        text-xs mt-2 font-medium
        opacity-0 group-hover:opacity-100
        transition
      "
      >
        {label}
      </span> */}
    </Link>
  );
};

export default CircleAction;
