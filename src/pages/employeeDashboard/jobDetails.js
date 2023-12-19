import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteJobMutation, useSingleJobMutation } from "../../features/job/jobApi";
import { useSelector } from "react-redux";

const JobDetails = ({ jobData }) => {
    const [cancelJob] = useDeleteJobMutation();
    const [loadSingleJob, { data }] = useSingleJobMutation();
    const {role} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { _id, position, companyName, location, employmentType, apply } =
        jobData || {};

    // 
    const handleCancel = async (id) => {
        const check = window.confirm("Are You Sure ?")
        if (check) {
            const result = await cancelJob(id)

        }
    }


    // 
    const handleCandidateView = (id) => {
        loadSingleJob(id);
    }

    return (
        <>
            {/* Modal */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    {
                        data?.apply?.map(item => <div className='flex justify-between items-center'><h3 className="font-bold text-lg">{item.email}</h3><button className="btn">view details</button> </div>)
                    }

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Job Card */}
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
                    {role === "employee" && <p>{apply.length}</p>}
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <p>{employmentType}</p>
                    <div>
                        <button
                            className="btn"
                            onClick={() => {
                                document.getElementById('my_modal_1').showModal();
                                handleCandidateView(_id);
                            }}
                        >
                            View Candidate
                        </button>

                        <button className='btn mx-1' onClick={() => navigate(`/job-details/${_id}`)}>
                            Details
                        </button>
                        <button className='btn me-1' onClick={() => handleCancel(_id)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetails;
