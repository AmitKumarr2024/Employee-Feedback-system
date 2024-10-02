import React from "react";
import formateDate from "../helper/formateDate";

const Employee = ({ data }) => {
  const formatedDate = formateDate(data.createdAt);

  return (
    <div className="m-4">
      <div className="w-full flex gap-9 items-center bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow duration-300">
        

        <img
          className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4 object-cover"
          src={data.profilePic}
          alt={`Avatar of ${data.fullName}`}
        />
        <div className="w-full flex text-justify justify-around text-sm space-y-1">
          
          <div>
            <p className="uppercase  text-lg font-bold text-gray-900">
              {data.fullName}
            </p>
            <p className="text-gray-700 font-semibold text-xl">{data.email}</p>
          </div>
          <div>
            <p className="text-blue-600 font-bold text-xl">{data.role}</p>
            <p className="text-gray-500 text-lg">{formatedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
