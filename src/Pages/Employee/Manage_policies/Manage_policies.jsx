import {
  faEye,
  faPenToSquare,
  faPlus,
  faReply,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import Headings from "../../../Components/Headings/Headings";
import Loading1 from "../../../Components/Loading/Loading1";
import {
  AddPolicy,
  updatePolicy,
  deletePolicy,
  getPolicies,
  getPolicyInfo,
} from "../../../Redux/ApiSlices/employee/policySlice";
import Pagination from "../../../Components/Pagination/Pagination";
import Add_policy from "./Components/Add_policy";
import Modal from "../../../Components/Modal/Modal";
import { toast } from "react-toastify";
import CustomPagination from "../../../Components/Pagination/CustomPagination";
import select_image from "/assets/images/select_image.png";
import Loading4 from "../../../Components/Loading/Loading4";

const Manage_policies = () => {
  const dispatch = useDispatch();
  const { policies, isLoading } = useSelector((state) => state.policies); // Access the entire policies object
  // const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  // modal state
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  //  state adding policy
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [policy_name, setPolicy_name] = useState("");
  const [currentPolicyId, setCurrentPolicyId] = useState(null);

  // helper data
  const [data, setData] = useState(null);
  const [visa, setVisa] = useState(null);

  // while refresh page
  useEffect(() => {
    dispatch(getPolicies())
      .unwrap()
      .then((res) => {
        // If you need to store something in sessionStorage, adjust this part.
        window.sessionStorage.setItem("policies", JSON.stringify(res));
        console.log("policies", res);
      })
      .catch((rej) => {
        return toast.error(rej?.response?.data?.message);
      });
  }, []);

  const handelDeletePolicy = (id) => {
    dispatch(deletePolicy(id))
      .unwrap()
      .then((res) => {
        // Simply re-fetch policies without handling page
        dispatch(getPolicies());
        setOpen1(!open1);
        return toast.success(res?.success);
      })
      .catch((rej) => {
        return toast.error(rej?.response?.data?.message);
      });
  };

  const get_Policy_Info = (id) => {
    dispatch(getPolicyInfo(id))
      .unwrap()
      .then((res) => {
        setPolicy_name(res?.data?.data[0]?.policy);
        setValue(res?.data?.data[0]?.value);
        setDescription(res?.data?.data[0]?.description);
      });
    setData({ id: id });
  };

  const [visa_and_residence, setVisa_and_residence] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleUpdatePolicy = (id) => {
    
    if (policy_name.trim() === "") {
      return toast.error("Policy name is required");
    }
    if (value.trim() === "") {
      return toast.error("Value is required");
    }
    if (description.trim() === "") {
      return toast.error("Description is required");
    }

    // Construct the visa object
    const visa = { policy_name, value, description };

    // Create the data object to send
    const data = {
      visa,
      id,
    };

    // Dispatch the updatePolicy action with the data object
    dispatch(updatePolicy(data)) // Pass the entire data object
      .unwrap()
      .then((res) => {
        setOpen6(false);
        dispatch(getPolicies());
        return toast.success(res?.success);
      })
      .catch((rej) => {
        return toast.error(rej?.response?.data?.message);
      });

    console.log("visa", data); // Log the data being sent
  };

  return (
    <div className="relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto">
      <Add_policy open2={open2} setOpen2={setOpen2} />

      {/* delete policy */}
      <Modal open={open1} setOpen={setOpen1}>
        <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
          <div className="flex flex-col justify-center items-center gap-6">
            <p className="font-bold text-gray_color">
              do you want to delete{" "}
              <span className="font-extrabold text-secoundary_color/80">
                {data?.name}
              </span>
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => handelDeletePolicy(data?.id)}
                color={"#cf2e2e"}
                padding="5px"
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpen1(!open1)}
                color={"#777"}
                padding="5px"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* manage policy */}
      <Modal open={open6} setOpen={setOpen6}>
        <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="border-b-2 border-solid border-primary_color w-fit mx-auto mb-6">
              <Headings element={"h2"} color="#00529B">
                Edit Policy
              </Headings>
            </div>

            <div className="grid md:grid-cols-1 md:gap-6">
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                <input
                  type="text"
                  value={policy_name}
                  onChange={(e) => setPolicy_name(e.target.value)}
                  name="policy_name"
                  id="policy_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="policy_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Policy Name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-6">
              <div className="relative z-0 w-full mb-1 lg:mb-4 group">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  name="value"
                  id="value"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="value"
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
                  name="description"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="des"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  // const policyId = policies?.data?.data?.[0]?.policy_id;
                  const policyId = data?.id;
                  if (policyId) {
                    handleUpdatePolicy(policyId);
                  } else {
                    // Optionally, you can handle the case where policyId is not available
                    toast.error("Policy ID not found");
                  }
                }}
                color={"#00529B"}
                padding="5px"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-auto bg-gradient-to-t  p-2 md:p-8 w-full ">
        <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
          <div className="text-left">
            <Headings element={"h3"}>manage policies</Headings>
          </div>
          <div className="relative">
            <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
              <Button
                onClick={() => {
                  setOpen2(true);
                }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[20px] font-bold text-primary_color/80 pr-2"
                />
                Add policy
              </Button>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
            <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Policy name
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="p-5 rounded-xl z-[99999]">
                      <Loading1 />
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(policies?.data?.data) &&
                policies.data.data.length > 0 ? (
                policies.data.data.map((policy) => (
                  <tr
                    key={policy?.policy_id}
                    className="bg-white_color/80 border-b border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200"
                  >
                    <td className="px-6 py-2">
                      <div className="ps-3">
                        <div className="text-[13] text-primary_color_1">
                          {policy?.policy_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="ps-3">
                        <div className="text-[13] text-primary_color_1">
                          {policy?.value}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="ps-3">
                        <div className="text-[13] text-primary_color_1">
                          {policy?.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center">
                        {policy?.deleted_at == null ? (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div>
                            Active
                          </>
                        ) : (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div>
                            Inactive
                          </>
                        )}
                      </div>
                    </td>
                    <td className="text-center align-middle text-nowrap">
                      {policy?.deleted_at == null && (
                        <button
                          onClick={() => {
                            setOpen1(true);
                            setData({
                              id: policy?.policy_id,
                              name: policy?.policy_name,
                            });
                          }}
                          className="font-bold text-[22px] m-2 text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed hover:underline"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}
                      {policy?.deleted_at == null && (
                        <button
                          onClick={() => {
                            setOpen6(true);
                            setData({
                              id: policy?.policy_id,
                              name: policy?.policy_name,
                            });
                          }}
                          className="font-bold text-[20px] text-primary_color_1/80 m-2 hover:underline"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    No policies available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manage_policies;
