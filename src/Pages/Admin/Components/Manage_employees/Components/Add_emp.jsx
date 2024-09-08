import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LargeModal from '../../../../../Components/Modal/LargeModal';
import { toast } from 'react-toastify';
import { AddEmployee } from '../../../../../Redux/ApiSlices/admin/adminSlice';
import Loading1 from '../../../../../Components/Loading/Loading1';
import Button from '../../../../../Components/Button/Button';
import Headings from '../../../../../Components/Headings/Headings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import "./../Manage_emp.css"


const Add_emp = ({setOpen2,open2}) => {
    const dispatch = useDispatch();
    const {employees,isLoading,searchEmp,Allroles,emp_info}=useSelector((state)=>state.admin);
    //  state adding emp
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [name,setName]=useState("");
    const [job_title,setJob_title]=useState("");
    const [department,setDepartment]=useState("");
    const [roles,setRoles]=useState([]);
    const [image,setImage]=useState(null);


    const handelAdd=(e)=>{
        e.preventDefault();
       
        if(roles.length == []){
            return toast.error("Permissions is required")
        }
        if(name.trim() == ""){
            return toast.error("Name is required")
        }
        if(!image){
            return toast.error("Image is required")
        }
        
        const x= roles.join();
        setRoles(x);
        
        
        const formdata=new FormData();
        formdata.append("email",email);
        formdata.append("password",password);
        formdata.append("department",department);
        formdata.append("phone",phone);
        formdata.append("image",image);
        formdata.append("name",name);
        formdata.append("job_title",job_title);
        formdata.append("roles",roles);

        dispatch(AddEmployee(formdata)).unwrap().then((res)=>{
            setOpen2(!open2);
            setEmail("");
            setPassword("");
            setRoles([]);
            setPhone();
            setJob_title("");
            setDepartment("");
            setName("");
            setImage(null);

            return toast.success(res?.success)
        }).catch((rej)=>{
            setRoles([]);
            return toast.error(rej?.response?.data?.message)
        })
    }
  return (
    <LargeModal open={open2} setOpen={setOpen2}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelAdd}>
        <Headings element={"h1"}>Add employee</Headings>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}  name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
  </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    </div>
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={job_title} onChange={(e)=>setJob_title(e.target.value)}  name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job title</label>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}   name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
    </div>
    <div className="relative  z-0 w-full mb-1 lg:mb-4 group">
  
  <input  onChange={(e)=>setImage(e.target.files[0])}  class="hidden w-full text-sm text-black  rounded-lg cursor-pointer bg-transparent outline-none" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
  <div class=" font-bold text-primary_color   py-2  my-1 rounded-lg cursor-pointer bg-transparent outline-none border-b-4 border-dashed border-secoundary_color/50 shadow-sm shadow-primary_color  focus:outline-none" ><label htmlFor="user_avatar" className="flex justify-center gap-5 items-center"> {image ? image?.name :<Headings element={"p"}>upload your image</Headings>}<Headings element={"p"}></Headings> <FontAwesomeIcon icon={faImages}className='text-[25px] text-secoundary_color bg-white rounded-[50%]  ' /></label></div>
  </div>
    </div>
  

  {/* drop down permissions */}
    <div className='w-full relative mb-2 flex justify-start items-start flex-col gap-1'>
    <div className=' w-full text-center py-1 rounded-md border-b-4 border-solid border-primary_color text-gray_color font-bold'>Employee permissions</div>
       
       <div className=' bg-black/5  flex-wrap flex justify-evenly w-[100%] items-center gap-3 rounded-xl p-2 shadow-md shadow-black_color/90'>
       {
        isLoading?<div className='flex justify-center items-center w-[100%]'><Loading1/></div> : Allroles?.data?.data?.map((role)=>{
            if(role.role_id == 4 || role.role_id == 13 || role.role_id == 14){
                return;
            }
            return (
                <div key={role.role_id} className='flex justify-start  border-solid border-b-2 border-black/20  items-center gap-2 w-[150px] sm:w-[200px]'><input type='checkbox' className='Checkboxes' value={role?.role_id} onChange={()=>setRoles((prev)=>{
               if(roles?.includes(role?.role_id)){
             
             let x= roles?.filter((item)=>{
            return item != role.role_id;
           })
           setRoles(x)
           
          }        
          else{
            return [...roles,role?.role_id]
          }
             
              
                
                })} id={"chack"+role?.role_id}/><label htmlFor={"chack"+role?.role_id} className='font-bold  text-secoundary_color_1/70'>{role?.name}</label></div>
            )
         }

         )

        
       }
        
        
        </div>
        
    </div>
  

        <div className='flex justify-center items-center my-5'><Button color={"#836E42"}>Submit</Button></div> 
</form>
            </LargeModal>
  )
}

export default Add_emp