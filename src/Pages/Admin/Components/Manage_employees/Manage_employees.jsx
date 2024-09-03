import React, { useEffect, useState} from 'react'
import Headings from '../../../../Components/Headings/Headings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faEye, faImage, faImages, faPersonCirclePlus, faPersonWalkingDashedLineArrowRight, faPhotoFilm, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { activateEmployee, AddEmployee, deleteEmployee, getEmployees, getEmployees_info, getRoles, SearchEmployees, updateEmployee } from '../../../../Redux/ApiSlices/admin/adminSlice';
import image_emp from "/assets/images/user-avatar.png";
import Pagination from '../../../../Components/Pagination/Pagination';
import Loading1 from '../../../../Components/Loading/Loading1';
import Loading3 from '../../../../Components/Loading/Loading3';
import { toast } from 'react-toastify';
import { usePrevious } from '../../../../Hooks/usePrevious';
import LargeModal from '../../../../Components/Modal/LargeModal';
import Modal from '../../../../Components/Modal/Modal';
import "./Manage_emp.css"
import Add_emp from './Components/Add_emp';
import VerifyEmail_epm from './Components/VerifyEmail_epm';
import Update_emp from './Components/Update_emp';


const Manage_employees = () => {
    const dispatch = useDispatch();
    const {employees,isLoading,isLoading_get,isLoading_search,searchEmp,Allroles,emp_info}=useSelector((state)=>state.admin);
    const [page,setPage]=useState(-1);
    const [search,setSearch]=useState("");
    const prev= usePrevious(search);

   


    // modal state
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [open3,setOpen3]=useState(false);
    const [open4,setOpen4]=useState(false);



    //  state adding emp
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [name,setName]=useState("");
    const [job_title,setJob_title]=useState("");
    const [department,setDepartment]=useState("");
    const [roles,setRoles]=useState([]);
    const [image,setImage]=useState(null);
    const [confirm_password,setConfirm_password]=useState("");

    // // helper state roles
    // const [perm,setPerm]=useState([]);


    
    // helper data
    const [data,setData]=useState(null);
    
    useEffect(()=>{
      if(window.sessionStorage.getItem("page")){
        let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
        setPage(pageSaved)
      }
      return ()=>{
        if(window.sessionStorage.getItem("page")){
            window.sessionStorage.removeItem("page")
        }
      }
    },[]);

    const handelGetRoles=()=>{
        dispatch(getRoles())
    }

    useEffect(()=>{
        const debounce=setTimeout(() => {
            if(prev != search)
            {
                dispatch(SearchEmployees(search))
            }
        }, 1500);
        return ()=>{
            clearTimeout(debounce)
        }
    },[search]);

// while refresh page
    useEffect(()=>{
        dispatch(getEmployees(page)).unwrap().then((res)=>{
            window.sessionStorage.setItem("page",JSON.stringify(page))
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message);
        })
    },[page]);


   

    
    
    const handelDeleteEmp=(id)=>{
        dispatch(deleteEmployee(id)).unwrap().then((res)=>{
            setSearch("")
            if(window.sessionStorage.getItem("page")){
                let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
                dispatch(getEmployees(pageSaved))
              }
            setOpen1(!open1)
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }
    const handelActiveEmp=(id)=>{
        dispatch(activateEmployee(id)).unwrap().then((res)=>{
            setSearch("")

            if(window.sessionStorage.getItem("page")){
                let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
                dispatch(getEmployees(pageSaved))
              }

            setOpen3(!open3)
            return toast.success(res?.success)
        }).catch((rej)=>{
            return toast.error(rej?.response?.data?.message)
        })
    }
    const getEmp_info=(id)=>{
        setImage(null)
        dispatch(getEmployees_info(id)).unwrap().then((res)=>{
            // setPerm(res?.data.roles?.map((el)=>{
            //     return el.role_id
            // }));
            setEmail(res?.data?.user?.email);
            setPhone(res?.data?.user?.phone);
            setDepartment(res?.data?.department);
            setName(res?.data?.name);
            setJob_title(res?.data?.job_title);
        })

    }
    

    
  return (
    <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        
        <Update_emp open={open} setOpen={setOpen} setSearch={setSearch} page={page} email={email} setEmail={setEmail} setOpen4={setOpen4} image={image} setImage={setImage}
            department={department} setDepartment={setDepartment} password={password} setPassword={setPassword} job_title={job_title} setJob_title={setJob_title}
            name={name} setName={setName} confirm_password={confirm_password} setConfirm_password={setConfirm_password} phone={phone} setPhone={setPhone} emp_info={emp_info}
        />
        <Modal open={open1} setOpen={setOpen1}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to delete <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelDeleteEmp(data?.id)} color={"#00529B"} padding='5px'>Delete</Button>
            <Button onClick={()=>setOpen1(!open1)} color={"#cf2e2e"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>

           <Modal open={open3} setOpen={setOpen3}>
            <div className=" flex items-center justify-center py-[40px] px-4 sm:px-3 lg:px-2 bg-white_color bg-no-repeat bg-cover">
            <div className='flex flex-col justify-center items-center gap-6'>

            <p className='font-bold text-gray_color'>do you want to activate <span className='font-extrabold text-secoundary_color/80'>{data?.name}</span></p>
            <div className='flex gap-3'>
            <Button onClick={()=>handelActiveEmp(data?.id)} color={"#00d084"} padding='5px'>Activation</Button>
            <Button onClick={()=>setOpen3(!open3)} color={"#cf2e2e"} padding='5px'>Cancel</Button>
            </div>
           
            </div>

            </div>
           </Modal>
            <Add_emp open2={open2} setOpen2={setOpen2} />
            <VerifyEmail_epm open4={open4} setOpen4={setOpen4} email={email} id={emp_info?.employee_id} page={page}/>
        
        <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
        <div className="flex items-center justify-between flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 rounded-t-2xl  bg-black/20">
        <div className='text-left'>
        <Headings element={"h3"}>manage employees</Headings>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="shadow-xl shadow-black_color/40 rounded-xl border-[1px] border-solid border-white/30">
            <Button onClick={()=>{setOpen2(true);handelGetRoles();setRoles([])}}> <FontAwesomeIcon icon={faUserPlus} className='text-[20px] font-bold text-primary_color/80 pr-2'/>Add employyee</Button>
            </div>
            
            
        </div>
        <div className="relative">
            <div className="absolute  inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-primary_color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" value={search} onChange={(e)=>setSearch(e.target.value)} className="block p-2 ps-10 text-lg shadow-xl shadow-black_color/40 text-white_color border border-gray-300 rounded-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500   placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for employees"/>
        </div>
    </div>
        <div className="relative overflow-x-auto   shadow-2xl shadow-black_color/50  lg:rounded-b-lg">
        

    <table className="w-full text-sm text-left rtl:text-right text-gray-900 relative">
        <thead className="text-xs text-primary_color uppercase  bg-secoundary_color_1 ">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Position
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        
        {search.trim() == ""  ?
            <tbody>
        
        {isLoading_get ?  <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className='  p-5  rounded-xl z-[99999]  '><Loading1/></td></tr>:
            employees?.data?.data.map((employee)=>{
                if(employee?.roles[0]?.role_id == 4){
                    return
                }
                return (
                    <tr key={employee?.employee_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
            <th scope="row" className="flex items-center px-6 py-4 text-secoundary_color whitespace-nowrap ">
                <img className="w-10 h-10 rounded-full" src={employee?.user?.image != null ? `http://127.0.0.1:8000/${employee?.user?.image}` : image_emp} />
                <div className="ps-3">
                    <div className="text-base font-semibold">{employee?.name}</div>
                    <div className="font-normal text-gray-500">{employee?.user?.email}</div>
                </div>  
            </th>
            <td className="px-6 py-2">
                {employee?.job_title}
            </td>
            <td className="px-6 py-2">
                <div className="flex items-center">
                {employee?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
                   
                </div>
            </td>
            <td className=" py-9 flex justify-evenly items-center">
               {
                employee?.deleted_at == null ?<button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen1(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[20px] text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
                <FontAwesomeIcon icon={faUserXmark} />
                </button>:
                <button onClick={()=>{setOpen3(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[28px] text-green_color/80    hover:underline">
                <FontAwesomeIcon icon={faPersonCirclePlus} />
                </button>
               } 
               {
                employee?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
                <FontAwesomeIcon icon={faUserPen} /></button>:
                <button onClick={()=>{setOpen(true);getEmp_info(employee?.employee_id);}} className="font-bold text-[20px] text-secoundary_color/80   hover:underline">
                <FontAwesomeIcon icon={faUserPen} />
                </button>
               } 
            </td>
        </tr>
                )
            })
        }    
    </tbody>:null
        }
        {search.trim() != 0  ?
            <tbody>
        
        {isLoading_search ?  <tr> <td className=' p-5  rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className='  p-5  rounded-xl z-[99999]  '><Loading3/></td></tr>:
            searchEmp?.data?.data.map((employee)=>{
                if(employee?.roles[0]?.role_id == 4){
                    return
                }
                return (
                    <tr key={employee?.employee_id} className="bg-white_color/80 border-b  border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">
            <th scope="row" className="flex items-center px-6 py-4 text-secoundary_color whitespace-nowrap  ">
                <img className="w-10 h-10 rounded-full" src={employee?.user?.image != null ? `http://127.0.0.1:8000/${employee?.user?.image}` : image_emp} />
                <div className="ps-3">
                    <div className="text-base font-semibold">{employee?.name}</div>
                    <div className="font-normal text-gray-500">{employee?.user?.email}</div>
                </div>  
            </th>
            <td className="px-6 py-2">
                {employee?.job_title}
            </td>
            <td className="px-6 py-2">
                <div className="flex items-center">
                {employee?.deleted_at == null ?<> <div className="h-2.5 w-2.5 rounded-full bg-green-400 me-2"></div> Active</>:<><div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div> Inactive</>}
                   
                </div>
            </td>
            <td className=" py-9 flex justify-evenly items-center">

            <>
               {
                employee?.deleted_at == null ?<button disabled={emp_info?.data?.roles[0]?.role_id == 4} onClick={()=>{setOpen1(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[20px] text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
                <FontAwesomeIcon icon={faUserXmark} />
                </button>:
                <button onClick={()=>{setOpen3(true);setData({"id": employee?.employee_id,"name":employee?.name})}} className="font-bold text-[28px] text-green_color/80    hover:underline">
                <FontAwesomeIcon icon={faPersonCirclePlus} />
                </button>
               } 
               {
                employee?.deleted_at != null ? <button disabled="true" className="font-bold text-[20px] text-secoundary_color/80 disabled:cursor-not-allowed disabled:text-gray_color   hover:underline">
                <FontAwesomeIcon icon={faUserPen} /></button>:
                <button onClick={()=>{setOpen(true);getEmp_info(employee?.employee_id);}} className="font-bold text-[20px] text-secoundary_color/80   hover:underline">
                <FontAwesomeIcon icon={faUserPen} />
                </button>
               }</> 
            </td>
        </tr>
                )
            })
        }    
    </tbody>:null
        }
       
    </table>
     <div>
        {
            search.trim() == "" ? <Pagination page={page} setPage={setPage} totalElement={employees?.data?.total} perPage={employees?.data?.per_page}/>:null
        }
           
        </div>
</div>
        </div>
    </div>
  )
}

export default Manage_employees