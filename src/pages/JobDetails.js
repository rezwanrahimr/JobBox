import React, { useEffect, useRef, useState } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useApplyJobMutation, useSingleJobMutation } from "../features/job/jobApi";
import { useParams } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion, question, sendReplay } from "../features/job/jobSlice";
const JobDetails = () => {
  const [questions, setQuestions] = useState([]);
  const [getSingleJob, { data, isLoading }] = useSingleJobMutation();
  const [applyJob] = useApplyJobMutation();
  const { email, role } = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    _id,
  } = data || {}

  useEffect(() => {
    getSingleJob(id)
  }, [id])

  const handleApply = () => {
    const data = {
      email: email,
      id: _id
    }
    applyJob(data);
  }

  // handle candidate comment
  const handleChat = async (e) => {
    e.preventDefault()
    const chatData = {
      email: email,
      id: _id,
      question: e.target.question.value,
      ans: []
    }
    const result = await dispatch(question(chatData));
    if (result.payload.acknowledged) {
      setCount(prevState => prevState + 1)
      formRef.current.reset();
    }

  }

  useEffect(() => {

    const getData = async () => {

      const response = await dispatch(getQuestion());
      if (response.payload) {
        setQuestions(response.payload)
      }
    }
    getData()
  }, [count])

  // handle candidate comment replay
  const handleReplaySubmit = async (event) => {
    event.preventDefault();

    const replayText = {
      text: event.target.replayMessage.value,
      email: email,
      id: event.target.id.value,
    }

    const result = await dispatch(sendReplay(replayText));
    if (result.payload) {
      setCount(prevState => prevState + 1)
      formRef.current.reset();
    }
    
  }

  isLoading && <Loading />
  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            <button className='btn' onClick={handleApply}>Apply</button>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {questions?.map(({ question, email, ans, _id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {ans?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {role === "employee" && <form ref={formRef} onSubmit={handleReplaySubmit}>
                    <div className='flex gap-3 my-5'>
                      <input placeholder='Reply' type='text' name="replayMessage" className='w-full' />
                      <button
                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                        type='submit'
                        name="id"
                        value={_id}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  </form>}
                </div>
              ))}
            </div>

            {role === "candidate" && <form ref={formRef} onSubmit={handleChat}>
              <div className='flex gap-3 my-5'>
                <input
                  placeholder='Ask a question...'
                  type='text'
                  className='w-full'
                  name="question"
                />
                <button
                  className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                  type='submit'
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            </form>}
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
