import React, { useEffect, useState } from "react";
import { useGetApplyJobsQuery } from "../../features/job/jobApi";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";

const AppliedJobs = () => {
  const { data } = useGetApplyJobsQuery();
  const [getApplyJobs, setGetApplyJobs] = useState(null);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    let applyJobs = [];
    data?.forEach(element => {
    

      if (element.apply && element.apply.length >= 1) {
        const applyedJobs = element.apply.find(job => job.email === email);

        if (applyedJobs) {
          applyJobs.push(element);
        }
      }
    })

    setGetApplyJobs(applyJobs)

  }, [data])

  console.log(getApplyJobs)

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {getApplyJobs?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
