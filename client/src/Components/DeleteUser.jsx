import React, { useState } from "react";
import useDeleteUser from "../hook/useDeleteUsers";

const DeleteUser = ({ userId, fetchUsers }) => {
  const { deleteUser, loading, error, success } = useDeleteUser();
  const [showConfirm, setShowConfirm] = useState(false);

console.log("userID",userId);


  const handleDelete = async () => {
    await deleteUser(userId);
    if (success) {
      fetchUsers(); // Refresh the user list after successful deletion
      setShowConfirm(false); // Close the confirmation dialog
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(); // Call the delete function
  };

  return (
    <div>
      <button
        onClick={() => setShowConfirm(true)} // Show confirmation dialog
        className="bg-red-500 text-white text-2xl py-1 px-3 rounded ml-2 hover:bg-red-600 transition duration-200"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4">
              <button
                onClick={handleConfirmDelete} // Confirm deletion
                disabled={loading}
                className="bg-red-500 text-white py-1 px-3 rounded mr-2 hover:bg-red-600 transition duration-200"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)} // Close confirmation dialog
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
