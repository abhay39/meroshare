"use client"
import { setUserDetailsActions } from "@/store/detailsSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const page = () => {


    const userDetails = useSelector((item) => item.UserDetailsSlice)
  // console.log(userDetails);
  const dispatch = useDispatch();

  const getAllShare = async () => {
    try {
      let res = await fetch(`https://webbackend.cdsc.com.np/api/meroShareView/myPortfolio/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          "sortBy": "script",
          "demat": [userDetails?.userOwnDetails?.demat],
          "clientCode": userDetails?.userOwnDetails?.clientCode,
          "page": 1,
          "size": 200,
          "sortAsc": true
        })
      })
      res = await res.json();
      dispatch(setUserDetailsActions.setMyShares(res));
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllShare()
  }, [])

  return (
    <div>
      <h1 className=" font-bold">My Portfolio</h1>
      <span>View My Share Details</span>

      <div className="mt-6 flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className=" text-left">
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Sr. No</span>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                      Share Short Name
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Balance
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                    Previous Closing Price	
                    </th>
                    <th scope="col" className="px-12 hidden lg:flex py-3.5 text-left text-sm font-normal text-gray-700">
                    Value As Of Previous Closing Price	
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                    Last Transaction Price(LTP)
                    </th>
                    <th scope="col" className="px-4 hidden lg:flex py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Value As Of LTP</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userDetails ? (
                    userDetails?.myShares?.meroShareMyPortfolio?.map((item, index) => (
                      <tr key={index} className=" text-left">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.script}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.currentBalance}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.valueOfPrevClosingPrice}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.valueAsOfPreviousClosingPrice}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.valueOfLastTransPrice}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.valueAsOfLastTransactionPrice}
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <h1>No data</h1>
                      </td>
                    </tr>
                  )}
                  
                  
                </tbody>
              </table>
              <hr className=" border-b-2 border-slate-500"/>
              <div className=" flex w-full font-bold justify-between p-2">
                    <h1>Total:</h1>
                    {
                      userDetails?.myShares && (
                        <>
                          <h1>{userDetails?.myShares?.totalValueAsOfPreviousClosingPrice}</h1>
                          <h1>{userDetails?.myShares?.totalValueAsOfLastTransactionPrice}</h1>
                        </>
                      )
                    }
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page