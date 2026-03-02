import React from "react";

import { useSelector } from "react-redux";
const MilletsPage = () => {
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;

  return (
    <div>
      <div className="text-black"> MilletsPage</div>
    </div>
  );
};

export default MilletsPage;
