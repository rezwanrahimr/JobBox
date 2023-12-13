import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useLoadJobsQuery } from "../features/job/jobApi";
import Loading from "../components/reusable/Loading";

const Jobs = () => {
  const { data, isLoading } = useLoadJobsQuery();
  isLoading && <Loading />
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {
          data?.map(item => <JobCard jobData={item} key={item._id} />)
        }
      </div>
    </div>
  );
};

export default Jobs;
