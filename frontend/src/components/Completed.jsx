/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ButtonUncheck, ButtonDelete, ButtonEdit } from "./Button";

const Completed = (props) => {
  const { id, name, handleEdit, handleDelete } = props;
  return (
    <div className="bg-[#3e5264] rounded-md py-2.5 px-3 mt-2 flex justify-between bg-opacity-40">
      <div className="flex items-center">
        <ButtonUncheck />
        <p className="line-through decoration-1 opacity-50">{name}</p>
      </div>
      <div className="flex items-center opacity-50">
        <ButtonEdit id={id} handleEdit={handleEdit} />
        <ButtonDelete id={id} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Completed;
