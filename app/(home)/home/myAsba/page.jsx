'use client'
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const [allSharesApplied,setAllSharesApplied]=useState([]);
  const [openModel,setOpenModel]=useState(false);
  const [results,setResults]=useState({
    company:'',
    shareDetais:''
  })

  const handleOpenModel=(item)=>{
    setOpenModel(!openModel);
    getcompany(item);
  }

  const getAllAppplications=async()=>{
    let res= await fetch(`https://webbackend.cdsc.com.np/api/meroShare/applicantForm/active/search/`,{
      method:"POST",
      headers:{
        "Authorization":sessionStorage.getItem('token'),
        "Content-Type": "application/json" 
      },
      body:JSON.stringify(
        {
          "filterDateParams": [
              {"key": "appliedDate", "condition": "", "alias": "", "value": ""},
              {"key": "appliedDate", "condition": "", "alias": "", "value": ""}
          ],
          "filterFieldParams":[
              {
                  "key": "companyShare.companyIssue.companyISIN.script", 
                  "alias": "Scrip"
              },
              {
                  "key": "companyShare.companyIssue.companyISIN.company.name", 
                  "alias": "Company Name"
              }
          ],
          "page": 1,
          "searchRoleViewConstants": "VIEW_APPLICANT_FORM_COMPLETE",
          "size": 200
      })
    })
    res= await res.json();
    setAllSharesApplied(res.object);
  }

  const getcompany=async(item)=>{
    let res= await fetch(`https://webbackend.cdsc.com.np/api/meroShare/active/${item.companyShareId}`,{
      method:"GET",
      headers:{
        "Authorization":sessionStorage.getItem('token'),
        "Content-Type": "application/json" 
      },
    });
    res= await res.json();

    let res2= await fetch(`https://webbackend.cdsc.com.np/api/meroShare/applicantForm/report/detail/${item.applicantFormId}`,{
      method:"GET",
      headers:{
        "Authorization":sessionStorage.getItem('token'),
        "Content-Type": "application/json" 
      },
    });
    res2= await res2.json();
    setResults({
      company:res,
      shareDetais:res2
    })
    
    
  }
  

  console.log(results)

  useEffect(()=>{
    getAllAppplications();
  },[])

  return (
    <section>
      <h1 className=" font-bold text-2xl">My Applied Shares</h1>
      <hr className=" border-b-[1px] border-gray-400 mt-2"/>
      <div className=" mt-4">
        {
          allSharesApplied.length>0 && (
            allSharesApplied.map((item,index)=>{
              return(
                <div>
                  <div className=" flex items-center gap-3 justify-between">
                    <div className=" flex items-center gap-3">
                      <p>{index+1}.</p>
                      <h1 className=" font-bold text-sm ">{item.companyName}</h1>
                      <p className=" hidden lg:flex">-{item.subGroup}</p>
                      <button className=" bg-blue-500 p-1 rounded-md text-sm text-white">{item.shareTypeName}</button>
                      <button className=" bg-blue-500 p-1 rounded-md text-sm text-white hidden md:flex"> {item.shareGroupName}</button>
                    </div>
                    <button onClick={()=>{
                      
                      handleOpenModel(item)
                      
                    }} className=" bg-[#333A56] p-2 rounded-md text-white">Details</button>
                  </div>
                  <hr className=" border-b-[1px] border-gray-400 mt-2 mb-3"/>
                </div>
              )
            })
          )
        }
      </div>
      {
        openModel && (
          <div className=" min-h-screen fixed top-0 left-0 w-full flex items-center flex-col justify-center backdrop-blur-md">
            
            <div className=" bg-slate-200 w-full lg:w-4/5 p-4 rounded-md">
              <div className=" flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <h1 className=" font-bold">{results.company.companyName}</h1>
                  <p className=" hidden md:flex">-{results.company.subGroup} ({results.company.scrip})</p>
                  <button className=" bg-blue-500  lg:flex p-1 rounded-md text-sm text-white">{results.company.shareGroupName}</button>
                  
                </div>
                <button onClick={()=>{
                  setOpenModel(false)
                }} className=" bg-slate-800 text-red-600 w-8 p-2 rounded-full text-sm">X</button>
              </div>
              <hr className=" border-b-[1px] mt-2 border-gray-400 w-full" />

              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-3">
                <div className=" w-full">
                  <span className=" text-sm font-light">Issue Manager</span>
                  <h1 className=" font-bold">{results.company.clientName}</h1>
                </div>

                <div className=" w-full">
                  <span className=" text-sm font-light">Issue Open Date</span>
                  <h1 className=" font-bold">{new Date(results.company.minIssueOpenDate).toLocaleDateString('en-US', { month: 'long',
                  day:'numeric',
                  year:'numeric' }
                  )}</h1>
                </div>

                <div className=" w-full">
                  <span className=" text-sm font-light">Issue Close Date</span>
                  <h1 className=" font-bold">{new Date(results.company.maxIssueCloseDate).toLocaleDateString('en-US', { month: 'long',
                  day:'numeric',
                  year:'numeric'
                 })}</h1>
                </div>
              </div>

              <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-3">
                <div className=" w-full">
                  <span className=" text-sm font-light">No. of share issued</span>
                  <h1 className=" font-bold">{results.company.shareValue}</h1>
                </div>

                <div className=" w-full">
                  <span className=" text-sm font-light">Price Per share</span>
                  <h1 className=" font-bold">{results.company.sharePerUnit}</h1>
                </div>

                
              </div>

              <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-3">
                <div className=" w-full">
                  <span className=" text-sm font-light">Minimum Quantity</span>
                  <h1 className=" font-bold">{results.company.minUnit}</h1>
                </div>
                <div className=" w-full">
                  <span className=" text-sm font-light">Maximum Quantity</span>
                  <h1 className=" font-bold">{results.company.maxUnit}</h1>
                </div>
              </div>
            <hr className=" border-b-[1px] mt-2 border-gray-400 w-full" />
              <div className="mt-2">
                <div className=" text-sm flex flex-row gap-2 mt-2">
                  <span className="font-light">Applied Quantity:</span>
                  <span className=" font-bold">{results.shareDetais.appliedKitta}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Amount:</span>
                  <span className=" font-bold">&#8377;. {results.shareDetais.amount}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Bank:</span>
                  <span className=" font-bold">{results.shareDetais.clientName}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Branch:</span>
                  <span className=" font-bold">{results.shareDetais.registeredBranchName}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Account Number:</span>
                  <span className=" font-bold">{results.shareDetais.accountNumber}-{results.shareDetais.accountType}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Application submitted date:</span>
                  <span className=" font-bold">
                  {new Date(results.shareDetais.appliedDate).toLocaleDateString('en-US', { month: 'long',
                  day:'numeric',
                  year:'numeric'
                 })}
                  </span>
                </div>
                <div className=" text-sm flex flex-row items-center gap-2 mt-4">
                  <span className="font-light">Status:</span>
                  <span className={`font-bold ${results.shareDetais.statusName==='Alloted'?"bg-green-500":"bg-red-500"} rounded-xl p-1 text-white  text-center`}>{results.shareDetais.statusName}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Allocated Quantity:</span>
                  <span className=" font-bold">{results.shareDetais.receivedKitta}</span>
                </div>
                <div className=" text-sm flex flex-row gap-2 mt-4">
                  <span className="font-light">Remarks:</span>
                  <span className=" font-bold">{results.shareDetais.meroshareRemark}</span>
                </div>
              </div>

            </div>

          </div>
        )
      }
    </section>
  )
}

export default page