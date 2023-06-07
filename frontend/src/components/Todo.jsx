/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ButtonDelete, ButtonEdit, ButtonCheck } from "./Button";

const Todo = (props) => {
  // destructure object props.
  const { id, name, handleCheck, handleEdit, handleDelete } = props;

  return (
    <div className="bg-[#3e5264] rounded-md py-2.5 px-3 mt-2 flex items-center justify-between">
      <div className="flex items-center">
        <ButtonCheck id={id} name={name} handleCheck={handleCheck} />
        <p>{name}</p>
      </div>

      <div className="flex items-center">
        <ButtonEdit id={id} handleEdit={handleEdit} />
        <ButtonDelete id={id} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Todo;
