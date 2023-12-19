import React from "react";
import JobDetails from "./jobDetails";
import { useLoadJobsQuery } from "../../features/job/jobApi";

const EmployerDashboard = () => {
  const {data} = useLoadJobsQuery();
  return (
    <div className='grid grid-cols-2 gap-5 mt-5'>
      {
        data.map(item => <JobDetails jobData={item} key={item._id}></JobDetails>)
      }
    </div>
  );
};

export default EmployerDashboard;
