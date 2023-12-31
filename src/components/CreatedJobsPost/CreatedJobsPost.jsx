import React from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import { convertDate, displayNum } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
export default function CreatedJobsPost({ postUser, pathName }) {
  const navigate = useNavigate()
  console.log('post: ', postUser)
  const check = () => {
    return postUser.status === 1 ? 'bg-red-400' : 'bg-[#C226F9]'
  }
  return (
    <div className='flex items-center justify-center border-2 h-96 w-full rounded-[20px] border-black hover:shadow-2xl cursor-pointer hover:bg-[#ACFFFC]'>
      <div className='-ml-10 flex items-center justify-center font-Itim font-medium'>
        <div className='flex-col items-center justify-center gap-6 p-8 max-w-[60rem]'>
          <div className='text-[28px] font-semibold'>{postUser.title}</div>
          <div className='flex text-[24px] items-center  mt-4'>
            <GiPositionMarker size={24} className='mr-4' />
            <div className='-mt-1'> {postUser.address} </div>
          </div>
          <div className='mt-5 text-[16px]'>
            Tuổi : {postUser.age} &emsp; Kinh nghiệm: {postUser.experience} năm &emsp; Lương : {displayNum(postUser.salary)}
          </div>
          <div className='mt-5'>Ngày bắt đầu : {convertDate(postUser.dateStart)}</div>

          <div className='w-[30vw] mt-5 line-clamp-2'>{postUser.description}</div>
        </div>
        <div className='ml-[3rem]'>
          <button
            onClick={() => navigate(pathName)}
            className={`${check()}  text-white text-4xl rounded-[20px] self-end px-[2vw] py-2 hover:bg-green-600 h-[48px]`}
          >
            Thông tin chi tiết
          </button>
        </div>
      </div>
    </div>
  )
}
