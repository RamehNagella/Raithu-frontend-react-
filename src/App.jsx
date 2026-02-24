import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import UpdatePassword from "./components/UpdatePassword";
import NavBar from "./components/NavBar";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import Trackpage from "./pages/Trackpage";
import SingleGrainCard from "./pages/SingleGrainCard";
import OrganicPage from "./pages/OrganicPage";
import NonOrganicPage from "./pages/NonOrganicPage";
import AddGrains from "./components/AddGrains";
import MyGrainsPage from "./pages/MyGrainsPage";
import RicePage from "./pages/RicePage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* <Route path="/" element={<div>Body</div>} />

              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="/test" element={<div>Test Page</div>} /> */}
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} /> {/* Default route */}
              <Route path="grain" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/view" element={<Profile />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="profile/password" element={<UpdatePassword />} />
              <Route path="logout" element={<NavBar />} />
              {/* RIGHT SIDE ACTION ROUTES */}
              <Route path="add-grain" element={<AddGrains />} />
              {/* LEFT SIDE ACTION ROUTES */}
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="track" element={<Trackpage />} />
              <Route path="my-grains" element={<MyGrainsPage />} />
              <Route path="organic" element={<OrganicPage />} />
              <Route path="non-organic" element={<NonOrganicPage />} />
              <Route path="rice" element={<RicePage />} />
              <Route path="single-grain/:id" element={<SingleGrainCard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
