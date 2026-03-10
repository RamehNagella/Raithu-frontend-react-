import React from "react";
import { useNavigate } from "react-router-dom";
/*
// {
  address: {
    houseNumber: '234 4',
    colony: 'patanchery',
    village: '',
    mandal: 'patachanu',
    district: 'hyderbad',
    state: 'hyderbad',
    pincode: '502300'
  },
  _id: new ObjectId('69935c395a7ae76fe2b5389a'),
  firstName: 'Suresh',
  lastName: 'suri',
  emailId: 'sureshsusri@gmail.com',
  password: '$2b$10$DoCZXs83vm.Eo/yabuY2DO3wi6nQNvqQBD/x1JoD3uWgr7V.4iTPm',
  role: 'user',
  photoUrl: 'https://i.pinimg.com/736x/d9/6d/75/d96d75ab2c2cf3479e26099696f09207.jpg',
  __v: 0,
  age: 27,
  mobile: '9701840206'
}
*/
const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div>
      {user && (
        <div className="card bg-base-100 image-full w-full max-w-sm sm:max-w-md mx-auto shadow-sm">
          <figure>
            <img src={user.photoUrl} alt="backgroundImage" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.firstName} {user.lastName}{" "}
              <span className="gap-4"> {user.age}</span>
            </h2>
            <p>{user.emailId}</p>
            <p>
              From: {user.address?.houseNumber || ""}{" "}
              {user.address?.colony || ""}
            </p>
            <p>{user.address?.village || ""}</p>
            <p>{user.address?.mandal || ""}</p>
            <p>{user.address?.district || ""}</p>
            <p>
              {user.address?.state || ""}
              <span>
                {"-"} {user.address?.pincode || ""}{" "}
              </span>
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary p-2 bg-violet-600 text-lg text-pink-100"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
