import React from 'react'
import Milestone from '@/components/project/milestonecard/page'
import NavBar from "@/components/profilenav/page";
const page = () => {
  return (
    <div className='mt-32' >
      <NavBar/>
      <Milestone/>
    </div>
  )
}
export default page
