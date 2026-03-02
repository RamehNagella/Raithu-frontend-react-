import {
  Layers,
  Leaf,
  Package,
  ShoppingCart,
  Truck,
  RiceBowl,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;
  console.log("User in MainLayout:", user);

  return (
    <div className="relative min-h-screen">
      <div className="fixed left-4 top-24 z-50 flex flex-col gap-6 items-center">
        {/* LEFT FIXED SIDEBAR */}
        {isLoggedIn && (
          <>
            <CircleAction
              icon={<ShoppingCart size={20} />}
              label="Cart"
              to="/cart"
            />
            <CircleAction
              icon={<Package size={20} />}
              label="Orders"
              to="/orders"
            />
            <CircleAction
              icon={<Wheat size={20} />}
              label="Your Grains"
              to="/my-grains"
            />
            <CircleAction
              icon={<Truck size={20} />}
              label="Track"
              to="/track"
            />
          </>
        )}

        <CircleAction icon={<Leaf size={20} />} label="Organic" to="/organic" />

        <CircleAction icon={<RiceBowl size={20} />} label="Rice" to="/rice" />
      </div>
      {/* PAGE CONTENT */}
      <div className="ml-24">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
