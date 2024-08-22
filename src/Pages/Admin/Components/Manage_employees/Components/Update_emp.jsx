import React from 'react'
import LargeModal from '../../../../../Components/Modal/LargeModal'
import { toast } from 'react-toastify';
import { getEmployees, updateEmployee } from '../../../../../Redux/ApiSlices/adminSlice';
import Headings from '../../../../../Components/Headings/Headings';
import Loading1 from '../../../../../Components/Loading/Loading1';
import Button from '../../../../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import image_emp from "/assets/images/user-avatar.png";


const Update_emp = ({isLoading,open,setOpen,setOpen4,setSearch,page,image,setPassword,password,job_title,setJob_title,setEmail,email,setImage,setConfirm_password,confirm_password,department,setDepartment,name,setName,phone,setPhone,emp_info}) => {
    const dispatch = useDispatch();


    const handelUpdate=(e)=>{

     

        e.preventDefault();
        const formdata=new FormData();

        // if(perm.length == []){
        //     return toast.error("Permissions is required")
        // }
        if(name.trim() == ""){
            return toast.error("Name is required")
        }
        // if(!image){
        //     return toast.error("Image is required")
        // }
        if(image){
            formdata.append("image",image);
        }
        if(password.trim() != ""){
        formdata.append("password",password);
            
        }
        if(confirm_password.trim() != ""){
            formdata.append("confirm_password",confirm_password);
                
            }
        

        formdata.append("email",email);
        formdata.append("department",department);
        formdata.append("phone",phone);
        formdata.append("name",name);
        formdata.append("job_title",job_title);


        const data = {id:emp_info?.employee_id,formdata}

        dispatch(updateEmployee(data)).unwrap().then((res)=>{
            setSearch("")

            if(res?.success == "your profile updated and we sent verification code to your new email"){
                setOpen4(true);
            }
        if(page){
            
        dispatch(getEmployees(page || 1));
    }

            setOpen(!open);
            return toast.success(res?.success)
        }).catch((rej)=>{
            // setRoles([]);
            return toast.error(rej?.response?.data?.message)
        })
    }
  return (
    <LargeModal open={open} setOpen={setOpen}>
        <form className="max-w-[90%] mx-auto" onSubmit={handelUpdate}>
        <Headings element={"h1"}>Update employee</Headings>
        <div className="w-full relative mb-2 flex justify-start items-start flex-col gap-1">
  <div className='flex justify-evenly  p-2 items-center w-fit m-auto flex-col gap-2  rounded-xl'>
  <div className='relative'><img className=' h-20 w-20 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-[50%]'  src={image ?URL.createObjectURL(image):emp_info?.user?.image?`http://127.0.0.1:8000/`+emp_info?.user?.image: image_emp}/></div>
    <input   onChange={(e)=>setImage(e.target.files[0])} id={"user_avatar_help"}  className=" w-full text-sm text-black py-1 hidden  my-3 rounded-lg cursor-pointer bg-transparent outline-none border-b-4 border-dashed border-secoundary_color shadow-sm  focus:outline-none" aria-describedby="user_avatar_help"  type="file"/>
    <label className=" absolute top-[60%] left-[50%] text-sm sm:text-md font-bold text-secoundary_color p-3 rounded-[50%]" htmlFor="user_avatar_help"><FontAwesomeIcon icon={faImages}className='text-[20px] sm:text-[40px] text-secoundary_color bg-white rounded-[50%] p-2  ' /></label>
    
      </div>
      </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)} }  id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="password" value={confirm_password} onChange={(e)=>setConfirm_password(e.target.value)}  name="floating_password" id="floating_Cpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
      <label htmlFor="floating_Cpassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
      <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}  name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
  </div>
  <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="text" value={job_title} onChange={(e)=>setJob_title(e.target.value)}  name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job title</label>
    </div>
    <div className="relative z-0 w-full mb-1 lg:mb-4 group">
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}   name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
    </div>
  </div>
  
    
   
    {/* <div className="flex justify-center items-start gap-5 flex-col">
  
  
    {
        emp_info?.roles[0]?.role_id == 4 ?null
        :<div className='w-full relative mb-2 flex justify-start items-start flex-col gap-1'>
    <div className=' w-full text-center py-1 rounded-md border-b-4 border-solid border-primary_color text-gray_color font-bold'>Employee permissions</div>
       
       <div className=' bg-black/5  flex-wrap flex justify-evenly w-[100%] items-center gap-3 rounded-xl p-2 shadow-md shadow-black_color/90'>
       {
        isLoading?<div className='flex justify-center items-center w-[100%]'><Loading1/></div> : Allroles?.data?.data?.map((role)=>{
            if(role.role_id == 4 || role.role_id == 13 || role.role_id == 14){
                return;
            }
            
            return (
                <div key={role.role_id} className='flex justify-start  border-solid border-b-2 border-black/20  items-center gap-2 w-[150px] sm:w-[200px]'>
                <input type='checkbox' checked={ perm?.find((item)=>{return item == role.role_id})? true : false} value={role?.role_id} onChange={()=>setPerm((prev)=>{
               if(perm?.includes(role?.role_id)){
             
             let x= perm?.filter((item)=>{
            return item != role.role_id;
           })
           setPerm(x)
           
          }        
          else{
            return [...perm,role?.role_id]
          }
             
              
                
                })} id={"chack"+role?.role_id}/><label htmlFor={"chack"+role?.role_id} className='font-bold  text-secoundary_color_1/70'>{role?.name}</label></div>
            )
         }

         )

        
       }
        
        
        </div>
        
    </div>
    }
  
    </div> */}
  

       {isLoading ? <div className='flex justify-center items-center my-5'><Loading1/></div> :<div className='flex justify-center items-center my-5'><Button color={"#134571"}>Update</Button></div> } 
</form>
        </LargeModal>
  )
}

export default Update_emp