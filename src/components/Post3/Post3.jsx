import React from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import { convertDate, displayNum, isAxiosUnprocessableEntityError } from '../../utils/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { cancelRequest } from '../../api/request.api'
import { queryClient } from '../..'

const Post3 = ({ request }) => {
  const cancelRequests = useMutation({
    mutationFn: (body) => cancelRequest(body)
  })

  const onClickCancel = () => {
    const body = {
      postID: request._id
    }
    cancelRequests.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast('Từ chối yêu cầu !') // 。(9)data.data?.message
        queryClient.invalidateQueries({ queryKey: ['requestAccept'] })
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError(error)) {
          // const formError = error.response?.data
          toast('Yêu cầu bị từ chối !') // 。(10)formError.message
        }
      }
    })
  }

  return (
    <div
      className='flex flex-row items-center w-full border border-black rounded-2xl p-8 gap-8'
      style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
    >
      <div className='rounded-[50%] border-2 cursor-pointer overflow-hidden w-[10vw] h-[10vw] flex justify-center items-center mb-20 ml-3'>
        <img src={request.userID.image} alt='imageuser' />
      </div>
      <div className='max-w-[60rem] ml-5'>
        <div className='text-[28px]'>{request.title}</div>
        <div className='flex text-[20px] items-center'>
          <GiPositionMarker size={24} />
          <div className='ml-1'>{request.address}</div>
        </div>
        <div className='flex gap-8 text-[20px] mt-4'>
          <div>Tuổi : {request.age}</div>
          <div>Kinh nghiệm : {request.experience} năm</div>
          <div>Lương : {displayNum(request.salary)}</div>
        </div>

        <div className='text-[20px] mt-4'>Ngày bắt đầu : {convertDate(request.dateStart)}</div>
        <div className='text-[20px] mt-4'>{request.description}</div>
      </div>
      <div className='flex ml-30 flex-col gap-20 ml-auto'>
        {request.status === 1 ? (
          <button
            onClick={onClickCancel}
            className='bg-[#FA1313] mx-10 text-white text-[20px] p-1 rounded-[20px] w-[14rem] border-2 border-black shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_1px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all'
          >
            Hủy bỏ
          </button>
        ) : (
          <button
            disabled
            className=' bg-[#252dbd] mx-10 text-white text-[20px] p-1 rounded-[20px] w-[14rem] border-2 border-black shadow-[0_1px_0_rgb(0,0,0)]'
          >
            Chờ duyệt
          </button>
        )}
      </div>
    </div>
  )
}

export default Post3
