import React, { useEffect, useState} from 'react'
import Headings from '../../../../Components/Headings/Headings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCircleMinus, faCirclePlus, faEye, faHandHoldingMedical, faHandshake, faHandshakeSlash, faHeartCircleMinus, faImage, faImages, faPersonBooth, faPersonCirclePlus, faPersonCircleQuestion, faPersonWalkingDashedLineArrowRight, faPhotoFilm, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { activateEmployee, add_Roles_Employee, AddEmployee, delete_Roles_Employee, deleteEmployee, getEmployees, getEmployees_info, getRoles, SearchEmployees, updateEmployee } from '../../../../Redux/ApiSlices/admin/adminSlice';
import image_emp from "/assets/images/user-avatar.png";
import Pagination from '../../../../Components/Pagination/Pagination';
import Loading1 from '../../../../Components/Loading/Loading1';
import Loading3 from '../../../../Components/Loading/Loading3';
import { toast } from 'react-toastify';
import { usePrevious } from '../../../../Hooks/usePrevious';
import LargeModal from '../../../../Components/Modal/LargeModal';
import Modal from '../../../../Components/Modal/Modal';
import "./Manage_emp.css"


const Manage_permissions = () => {
    const dispatch = useDispatch();
    const {employees,isLoading,isLoading_get,isLoading_search,searchEmp,Allroles,emp_info}=useSelector((state)=>state.admin);
    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const prev= usePrevious(search);

   


    // modal state
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [open3,setOpen3]=useState(false);
    const [open4,setOpen4]=useState(false);


    // state save convert
    const [save,setSave]=useState(false);



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
    const [perm,setPerm]=useState([]);
    const [attr,setAttr]=useState([]);


    
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


   console.log("prem,",perm)
   console.log("roles",roles)

 const convertTostring=()=>{
    const x=perm.join();
    setRoles(x);
    setSave(true)
 }
    
    
    const handelDeleteRole=(id)=>{

        const data={roles,id}
          
        dispatch(delete_Roles_Employee(data)).unwrap().then((res)=>{
            setRoles([]);
            setPerm([]);
            setSave(false)
            setSearch("")
            if(window.sessionStorage.getItem("page")){
                let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
                dispatch(getEmployees(pageSaved))
              }
            setOpen1(!open1)
            return toast.success(res?.success)
        }).catch((rej)=>{
        setRoles([]);
        setPerm([]);
        setSave(false)
            return toast.error(rej?.response?.data?.message)
        })
    }
    const handelAddRole=(id)=>{
        

      const data={roles,id}
    dispatch(add_Roles_Employee(data)).unwrap().then((res)=>{
      setRoles([]);
      setPerm([]);
      setSave(false)
        setSearch("")
        if(window.sessionStorage.getItem("page")){
            let pageSaved=JSON.parse(window.sessionStorage.getItem("page"))
            dispatch(getEmployees(pageSaved))
          }
        setOpen2(!open2)
        return toast.success(res?.success)
    }).catch((rej)=>{
        setRoles([]);
        setPerm([]);
        setSave(false)
        return toast.error(rej?.response?.data?.message)
    })
    }
    const getEmp_info=(id)=>{
        setRoles([]);
        setPerm([]);
        setSave(false)
        dispatch(getEmployees_info(id)).unwrap().then((res)=>{
            setAttr(res?.data.roles?.map((el)=>{
                return el
            }));
            
        })

    }
    

    console.log("emp info",emp_info)
    
    
  return (
    <div className='relative flex flex-col justify-start items-start mt-[78px] lg:mt-[85px] h-auto w-full  lg:w-[calc(100%-296px)] ml-0 sm:ml-auto'>
        
       
        <Modal open={open1} setOpen={setOpen1}>
        <div className='w-full mx-auto flex justify-center items-center gap-3 flex-col'><Headings element={"h2"} color='gray'>delete permissions</Headings>
         <div className="flex justify-center items-start gap-5 flex-col">
     
  
    {
        emp_info?.roles[0]?.role_id == 4 ?null
        :<div className='w-full relative mb-2 flex justify-start items-start flex-col gap-1'>
    <div className=' w-full text-center py-1 rounded-md border-b-4 border-solid border-primary_color text-gray_color font-bold'>Employee permissions</div>
       
       <div className=' bg-black/5  flex-wrap flex justify-evenly w-[80%] mx-auto items-center gap-3 rounded-xl p-2 shadow-md shadow-black_color/90'>
       {
        isLoading?<div className='flex justify-center items-center w-[100%]'><Loading1/></div> : attr?.map((role)=>{
            {/* if(role.role_id == 4 || role.role_id == 13 || role.role_id == 14){
                return;
            } */}
            {/* if(perm?.find((item)=>{return item == role.role_id})){

            }
            else{
              return;
            } */}
            return (
                <div key={role.role_id}  className='flex justify-start  border-solid border-b-2 border-black/20  items-center gap-2 w-[150px] sm:w-[200px]'>
                <input type='checkbox' disabled={save ? true:false}  className='disabled:cursor-not-allowed Checkboxes' value={role?.role_id} onChange={()=>setPerm((prev)=>{
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
        {
           save? <div className='w-full mx-auto flex gap-2 justify-center items-center mt-3'><div ><Button color={"#AE8A3B"} onClick={()=>handelDeleteRole(emp_info?.employee_id)} >delete</Button></div>
            <div ><Button color={"#cf2e2e"} onClick={()=>{setOpen1(false)}} >cancel</Button></div></div>
        :<div className='w-full mx-auto flex justify-center items-center mt-3'><Button color={"#584F3C"} onClick={convertTostring} >save</Button></div>}
    </div>
    }
  
    </div></div>
            
           </Modal>

           <Modal open={open2} setOpen={setOpen2}>
           <div className='w-full mx-auto flex justify-center items-center gap-3 flex-col'><Headings element={"h2"} color='gray'>add permissions</Headings>
         <div className="flex justify-center items-start gap-5 flex-col">
     
  
    {
        emp_info?.roles[0]?.role_id == 4 ?null
        :<div className='w-full relative mb-2 flex justify-start items-start flex-col gap-1'>
    <div className=' w-full text-center py-1 rounded-md border-b-4 border-solid border-primary_color text-gray_color font-bold'>Employee permissions</div>
       
       <div className=' bg-black/5  flex-wrap flex justify-evenly w-[80%] mx-auto items-center gap-3 rounded-xl p-2 shadow-md shadow-black_color/90'>
       {
        isLoading?<div className='flex justify-center items-center w-[100%]'><Loading1/></div> : Allroles?.data?.data?.map((role)=>{
            if(role.role_id == 4 || role.role_id == 13 || role.role_id == 14){
                return;
            }
            if(attr?.find((item)=>{return item?.role_id == role.role_id})){
              return
            }
            
            return (
                <div key={role.role_id}  className='flex justify-start  border-solid border-b-2 border-black/20  items-center gap-2 w-[150px] sm:w-[200px]'>
                <input type='checkbox' disabled={save ? true:false} className='disabled:cursor-not-allowed Checkboxes'  value={role?.role_id} onChange={()=>setPerm((prev)=>{
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
        {
           save? <div className='w-full mx-auto flex gap-2 justify-center items-center mt-3'><div ><Button color={"#00529B"} onClick={()=>{handelAddRole(emp_info?.employee_id)}} >add</Button></div>
            <div ><Button color={"#cf2e2e"} onClick={()=>{setOpen2(false)}} >cancel</Button></div></div>
        :<div className='w-full mx-auto flex justify-center items-center mt-3'><Button color={"#584F3C"} onClick={convertTostring} >save</Button></div>}
        
    </div>
    }
  
    </div></div>
           
           </Modal>
        
        <div className='h-auto bg-gradient-to-t  p-2 md:p-8 w-full '>
        <div className="flex items-center justify-between flex-column rounded-t-2xl p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-black/20">
        <div className='text-left'>
        <Headings element={"h3"}>manage permissions</Headings>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
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
                    Permissions
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        
        {search.trim() == ""  ?
            <tbody>
        
        {isLoading_get ?  <div className='absolute bottom-[10%] left-[50%] translate-x-[-50%]'><Loading1/></div>:
            employees?.data?.data.map((employee)=>{
                if(employee?.roles[0]?.role_id == 4){
                    return
                }
                if(employee?.deleted_at != null){
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
               <> <div className=""><FontAwesomeIcon icon={faPersonBooth} className='text-gray_color text-[22px] p-2' /></div><span className='flex justify-start items-center w-[350px] flex-wrap gap-3'>{employee?.roles?.map((role)=>{
                return <div  key={role?.role_id} className=""><span className='shadow-md shadow-black/20 p-1 bg-off_white rounded-xl text-secoundary_color/70'>{role?.name}</span></div>
               })}</span> </>
                   
                </div>
            </td>
            <td className=" py-9 flex justify-evenly items-center">
               
                <button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen1(true);handelGetRoles();getEmp_info(employee?.employee_id)}} className="relative font-bold text-[20px] text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
                <FontAwesomeIcon icon={faCircleMinus} className='absolute top-[100%] left-0 text-primary_color/60'/>
                <FontAwesomeIcon icon={faPersonCircleQuestion} />
                
                </button>
               
               
                <button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen2(true);handelGetRoles();;getEmp_info(employee?.employee_id);}} className="relative font-bold text-[20px] text-secoundary_color/80 disabled:text-gray_color   hover:underline">
                <FontAwesomeIcon icon={faCirclePlus} className='absolute top-[100%] left-0  text-primary_color/60'/>
                <FontAwesomeIcon icon={faPersonCircleQuestion} />

                </button>
               
            </td>
        </tr>
                )
            })
        }    
    </tbody>:null
        }
        {search.trim() != 0  ?
            <tbody>
        
        {isLoading_search ? <tr> <td className=' p-5   rounded-xl z-[99999]  '></td><td className='hidden sm:block p-5  rounded-xl z-[99999]  '></td><td className='  p-5  rounded-xl z-[99999]  '><Loading3/></td></tr>:
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
                <> <div className=""><FontAwesomeIcon icon={faPersonBooth} className='text-gray_color text-[22px] p-2' /></div><span className='flex justify-start items-center w-[350px] flex-wrap gap-3'>{employee?.roles?.map((role)=>{
                return <div  key={role?.role_id} className=""><span className='shadow-md shadow-black/20 p-1 bg-off_white rounded-xl text-secoundary_color/70'>{role?.name}</span></div>
               })}</span> </>
                   
                </div>
            </td>
            <td className=" py-9 flex justify-evenly items-center">
                <button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen1(true);handelGetRoles();getEmp_info(employee?.employee_id)}} className="relative font-bold text-[20px] text-red_color/80 disabled:text-gray_color disabled:cursor-not-allowed   hover:underline">
                <FontAwesomeIcon icon={faCircleMinus} className='absolute top-[100%] left-0 text-primary_color/60'/>
                <FontAwesomeIcon icon={faPersonCircleQuestion} />
                
                </button>
               
               
                <button disabled={employee?.roles[0]?.role_id == 4} onClick={()=>{setOpen2(true);handelGetRoles();;getEmp_info(employee?.employee_id);}} className="relative font-bold text-[20px] text-secoundary_color/80 disabled:text-gray_color   hover:underline">
                <FontAwesomeIcon icon={faCirclePlus} className='absolute top-[100%] left-0  text-primary_color/60'/>
                <FontAwesomeIcon icon={faPersonCircleQuestion} />

                </button>
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

export default Manage_permissions