import React from 'react'
import { GiPositionMarker } from 'react-icons/gi'
import { count, displayNum, getAges, isAxiosUnprocessableEntityError } from '../../utils/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryClient } from '../..'
import { acceptRequest, deleteRequestEmployee } from '../../api/request.api'
import { createPayment } from '../../api/payment.api'
import { useNavigate } from 'react-router-dom'

const Post = ({ request }) => {
  const navigate = useNavigate()
  const deleteRequestEmployees = useMutation({
    mutationFn: (body) => deleteRequestEmployee(body)
  })

  const acceptRequests = useMutation({
    mutationFn: (body) => acceptRequest(body)
  })

  const createPayments = useMutation({
    mutationFn: (body) => createPayment(body)
  })

  console.log(request)
  const objectCount = {
    count: count(request.postID),
    totalPrice: count(request.postID) * 4 * request.postID.salary,
    requestID: request._id
  }

  console.log(objectCount)

  const onClickDelete = () => {
    const body = {
      postID: request.postID,
      employeeID: request.employeeID
    }
    deleteRequestEmployees.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast('Từ chối yêu cầu!') //。(1) data.data?.message
        queryClient.invalidateQueries({ queryKey: ['employeeRequest'] })
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError(error)) {
          // const formError = error.response?.data
          toast('Yêu cầu bị từ chối !') // 。(2)formError.message
        }
      }
    })
  }

  const onClickAccept = () => {
    const body = {
      postID: request.postID,
      employeeID: request.employeeID
    }
    acceptRequests.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast('Đã chấp nhận yêu cầu của bạn !') // 。(3)data.data?.message
        queryClient.invalidateQueries({ queryKey: ['employeeRequest'] })
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError(error)) {
          // const formError = error.response?.data
          toast('Yêu cầu không được chấp nhận !') // 。(4)formError.message
        }
      }
    })

    createPayments.mutate(objectCount, {
      onSuccess: (data) => {
        console.log(data)
        // toast(data.data?.message)
        // queryClient.invalidateQueries({ queryKey: ['employeeRequest'] })
      },
      onError: (error) => {
        console.log(error)
        // if (isAxiosUnprocessableEntityError(error)) {
        //   const formError = error.response?.data
        //   toast(formError.message)
        // }
      }
    })
  }
  return (
    <div
      className='w-full border border-black rounded-2xl p-6 flex  gap-8 post  hover:bg-[#ACFFFC]'
      style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
    >
      <div className='rounded-[50%] border-2 cursor-pointer overflow-hidden w-[10vw] h-[10vw] flex justify-center items-center '>
        <img src={request.employeeID.userID.image} alt='imageuser' />
      </div>
      <div className='flex justify-center flex-col cursor-pointer '>
        <div
          className='text-5xl font-semibold'
          onClick={() => {
            navigate(`/employeelist/${request.employeeID._id}`)
          }}
        >
          {request.employeeID.userID.name}
        </div>
        <div className='flex text-[20px] items-center'>
          <GiPositionMarker size={24} />
          <div className='ml-1'>{request.employeeID.userID.address}</div>
        </div>
        <div className='flex gap-8 text-[16px] mt-4'>
          <div>Tuổi : {getAges(request.employeeID.dateOB)}</div>
          <div>Kinh nghiệm : {request.employeeID.experience} Năm</div>
          <div>Lương : {displayNum(request.employeeID.salary)}</div>
        </div>

        <div className='text-[16px] mt-4'>{request.employeeID.description}</div>
      </div>
      <div className='buttons flex !ml-72'>
        <button
          onClick={onClickAccept}
          className='bg-[#41E309] mx-10 text-white text-[20px] p-1 rounded-[20px] w-[14rem] border-2 border-black shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_1px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all'
        >
          Duyệt
        </button>
        <button
          onClick={onClickDelete}
          className='bg-[#E72253] mx-10 text-white text-[20px] p-1 rounded-[20px] w-[14rem] border-2 border-black shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_1px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all'
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  )
}

export default Post
