import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LargeModal from "../../../../Components/Modal/LargeModal";
import Headings from "../../../../Components/Headings/Headings";
import Button from "../../../../Components/Button/Button";
import Modal from "../../../../Components/Modal/Modal";
import { AddPolicy } from "../../../../Redux/ApiSlices/employee/policySlice";

const Add_policy = ({ setOpen2, open2 }) => {
  const dispatch = useDispatch();

  //  state adding airport

  const [policy_name, setPolicy_name] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handelAdd = (e) => {
    e.preventDefault();

    if (policy_name.trim() == "") {
      return toast.error("Policy name is required");
    }

    if (value.trim() == "") {
      return toast.error("Value is required");
    }
    if (description.trim() == "") {
      return toast.error("Description is required");
    }

    const formdata = new FormData();
    formdata.append("policy_name", policy_name);
    formdata.append("value", value);
    formdata.append("description", description);

    dispatch(AddPolicy(formdata))
      .unwrap()
      .then((res) => {
        setOpen2(!open2);

        setPolicy_name("");
        setValue("");
        setDescription("");
        return toast.success(res?.success);
      })
      .catch((rej) => {
        return toast.error(rej?.response?.data?.message);
      });
  };
  return (
    <Modal open={open2} setOpen={setOpen2}>
      <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <div className="border-b-2 border-solid border-primary_color w-fit mx-auto mb-6">
          <Headings element={"h3"} color="#00529B">
            add policy
          </Headings>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input
              type="text"
              value={policy_name}
              onChange={(e) => setPolicy_name(e.target.value)}
              name="floating_name"
              id="floating_miles"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Policy name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="floating_name"
              id="floating_code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Value
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-1 lg:mb-4 group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="floating_name"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
        </div>

        <div className="flex justify-center items-center my-5">
          <Button color={"#836E42"} padding="5px">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Add_policy;
