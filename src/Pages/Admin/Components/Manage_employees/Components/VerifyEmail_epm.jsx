import React, { useEffect, useRef, useState } from "react";
import Headings from "../../../../../Components/Headings/Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../../Components/Modal/Modal";
import LargeModal from "../../../../../Components/Modal/LargeModal";
import {
  getEmployees,
  verifyEmail_Employee,
} from "../../../../../Redux/ApiSlices/admin/adminSlice";
import { toast } from "react-toastify";

const VerifyEmail_epm = ({ open4, setOpen4, email, id, page }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verify_code, setVerify_code] = useState("");
  const ref = useRef();

  useEffect(() => {
    setVerify_code("");
  }, []);
  const handelVerify = () => {
    if (ref.current.value.length > 4) {
      setVerify_code("");
      return toast.error("It must contain four digits");
    }
    const code = ref.current.value;
    const data = { code: { code }, email, id };
    dispatch(verifyEmail_Employee(data))
      .unwrap()
      .then((res) => {
        // Check the current pathname and navigate accordingly
        const currentPath = location.pathname;
        if (currentPath === "/dashboard/employee/profile") {
          navigate(currentPath, { replace: true });
        } else {
          navigate("/admin_dashboard/manage-employees", { replace: true });
        }

        setOpen4(false);
        setVerify_code("");
        dispatch(getEmployees(page || 1));
        toast.success(res.data);
      })
      .catch((rej) => {
        toast.error(rej?.response?.data?.errors);
      });
  };
  return (
    <LargeModal open={open4} setOpen={setOpen4}>
      <div className="flex flex-col lg:flex-row  overflow-hidden">
        <div className="w-full bg-white text-center max-h-[80vh]  py-2 px-6 md:px-40 flex gap-5  flex-col justify-center">
          <Headings element={"h2"} color="#000">
            Verify Email
          </Headings>
          <Headings element={"p"}>please check your email</Headings>

          <FontAwesomeIcon
            icon={faEnvelopeOpenText}
            className="text-[120px] text-secoundary_color_1 p-5 rounded-[50%] bg-gray_color  mx-auto my-[20px]"
          />

          <div className="my-5 flex justify-center items-center flex-col gap-3 bg-secoundary_color p-4  m-auto w-fit   rounded-lg">
            <label className="text-white">enter your code here</label>
            <input
              ref={ref}
              className="text-primary_color w-[75px] text-[30px]  p-1 bg-transparent  border-b-4 border-dashed border-white_color outline-none"
              type="text"
              value={verify_code}
              onChange={(e) => {
                setVerify_code(e.target.value);
                e.target.value.length >= 4 && handelVerify();
              }}
            />
          </div>
        </div>
      </div>
    </LargeModal>
  );
};

export default VerifyEmail_epm;
