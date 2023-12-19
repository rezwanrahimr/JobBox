import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteJobMutation } from "../../features/job/jobApi";

const JobDetails = ({ jobData }) => {
    const [cancelJob] = useDeleteJobMutation();
    const navigate = useNavigate();
    const { _id, position, companyName, location, employmentType, apply } =
        jobData || {};

    // 
    const handleCancel = async(id) => {
        const check = window.confirm("Are You Sure ?")
        if (check) {
          const result = await  cancelJob(id)
          console.log(result)
        }
    }

    return (
        <div
            key={_id}
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
        >
            <div className='flex justify-between  text-primary'>
                <div>
                    <p className='text-xl'>{position}</p>
                    <small className='text-primary/70 '>
                        by{" "}
                        <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                            {companyName}
                        </span>
                    </small>
                </div>
                <p>{location}</p>
                <p>{apply.length}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
                <p>{employmentType}</p>
                <div>
                    <button className='btn me-1' onClick={() => handleCancel(_id)}>
                        Close
                    </button>
                    <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
