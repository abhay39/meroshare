"use client"
import { setUserDetailsActions } from "@/store/detailsSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const people = [
  {
    name: 'John Doe',
    title: 'Front-end Developer',
    department: 'Engineering',
    email: 'john@devui.com',
    role: 'Developer',
    image:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
  },
  {
    name: 'Jane Doe',
    title: 'Back-end Developer',
    department: 'Engineering',
    email: 'jane@devui.com',
    role: 'CTO',
    image:
      'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
  },
]


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
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllShare()
  }, [])

  // console.log(userDetails.myShares)

  return (
    <div>
      <h1 className=" font-bold">My Share</h1>
      <span>View My Share Details</span>

      {
        userDetails.myShares && (
          <div className="mt-6 flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Sr. No</span>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                      Share Short Name
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                      Current Balance
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                      <span>Remarks</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userDetails ? (
                    userDetails?.myShares?.meroShareMyPortfolio?.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.script}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 justify-center items-center font-bold">
                          {item.currentBalance}
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
            </div>
          </div>
        </div>
      </div>
        )
      }

    </div>
  )
}

export default page