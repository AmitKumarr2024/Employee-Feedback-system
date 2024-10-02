import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Admin from "../Components/Admin";

const AdminPannel = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const handleClose = () => {
    console.log("Closing admin panel");
    setOpenUpdateUser(false);
  };

  return (
    <div>
      <div className="w-full">
        <div className="h-full mb-2">
          <ul className="flex justify-around items-center h-12 mt-2 gap-9">
            <Link
              to={"viewEmployee"}
              className="hover:scale-110 duration-300 bg-orange-600 font-bold text-lg px-4 py-2 rounded-2xl hover:bg-orange-700 hover:text-white"
            >
              Employee Panel
            </Link>
            <Link
              to={"addFeedback"}
              className="hover:scale-110 duration-300 bg-orange-600 font-bold text-lg px-4 py-2 rounded-2xl hover:bg-orange-700 hover:text-white"
            >
              Add Feedback
            </Link>
            <Link
              to={"addEmployee"}
              className="hover:scale-110 duration-300 bg-orange-600 font-bold text-lg px-4 py-2 rounded-2xl hover:bg-orange-700 hover:text-white"
            >
              Add Employee
            </Link>
          </ul>
        </div>
        <hr />
      </div>
      <div className="bg-slate-200">
        {openUpdateUser && <Admin onClose={handleClose} />}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPannel;
