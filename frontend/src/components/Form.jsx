/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Form = (props) => {
  const { input, setInput, submitTodo, handleFormChange, editTodo } = props;

  return (
    <form onSubmit={submitTodo} className="flex justify-between w-full mt-7">
      <input
        className="rounded-full px-5 py-2 mr-2.5 w-full bg-[#1c2c39]"
        type="text"
        placeholder="Enter item todo..."
        required
        value={input}
        onChange={handleFormChange}
      />
      <input
        className="text-white font-semibold bg-sky-600 rounded-full px-5 py-2 cursor-pointer hover:bg-sky-500 active:bg-sky-600"
        type="submit"
        value={editTodo ? "OK" : "Add"}
      />
    </form>
  );
};

export default Form;
