import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserBox from "./EditUserBox";
import DeleteUser from "./DeleteUser";
import { fetchUsers } from "../Store/userSlice";

const ViewUser = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.users); // Ensure this matches your state

  const [openEditBox, setOpenEditBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditBox(true);
  };

  const handleCloseEditBox = () => {
    setOpenEditBox(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div className="container mx-auto p-2">
      <div className="w-full bg-white rounded-lg shadow-lg h-[460px] overflow-y-scroll">
        <table className="min-w-full bg-white ">
          <thead>
            <tr className="bg-fuchsia-300 text-zinc-500 uppercase tracking-widest text-xl">
              <th className="py-3 px-3 text-center">S.No</th>
              <th className="py-3 px-3 text-center">Name</th>
              <th className="py-3 px-3 text-center">email</th>
              <th className="py-3 px-3 text-center">Role</th>
              <th className="py-3 px-3 text-center">Gender</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100 border-b">
                <td className="border-t border-r py-1 px-2 text-center">{index + 1}</td>
                <td className="border-t border-r py-1 px-2 text-center">{user.fullName}</td>
                <td className="border-t border-r py-1 px-2 text-center">{user.email}</td>
                <td className="border-t border-r py-1 px-2 text-center font-bold">{user.role}</td>
                <td className="border-t border-r py-1 px-2 text-center">{user.gender}</td>
                <td className="border-t flex items-center justify-center border-r py-3 px-2 text-center">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 text-white rounded-lg px-3 py-1 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <DeleteUser userId={user._id} fetchUsers={() => dispatch(fetchUsers())} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openEditBox && (
        <EditUserBox
          user={selectedUser}
          onClose={handleCloseEditBox}
          fetchUsers={() => dispatch(fetchUsers())}
        />
      )}
    </div>
  );
};

export default ViewUser;
