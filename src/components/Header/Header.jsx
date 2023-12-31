import React, { useContext, useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '../../api/auth.api'
import classNames from 'classnames'
import logo from '../../asset/img/babysister.png'
import UserAvatar from './UserAvatar'
import Moving from '../Moving/Moving'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, info, setInfo } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setInfo(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  //console.log(info)
  const navigate = useNavigate()

  const toggleOpenLogin = () => {
    navigate('/login')
  }
  const toggleOpenRegister = () => {
    navigate('/register')
  }

  let timerandom, colorX
  const hash = '#',
    zeroString = '000000'
  const refimg = useRef(null),
    refimg2 = useRef(null)

  setInterval(() => {
    timerandom = Math.floor(Math.random() * 100)
    if (timerandom > 75 && refimg.current) {
      colorX = Math.round(0xffffff * Math.random()).toString(16)
      refimg.current.style.backgroundColor = hash + zeroString.substring(0, 6 - colorX.length) + colorX
    }
  }, 1500)
  setInterval(() => {
    timerandom = Math.floor(Math.random() * 100)
    if (timerandom > 70 && refimg2.current) {
      colorX = Math.round(0xffffff * Math.random()).toString(16)
      refimg2.current.style.backgroundColor = hash + zeroString.substring(0, 6 - colorX.length) + colorX
    }
  }, 1000)

  const [isShrunk, setShrunk] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (!isShrunk && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
          return true
        }

        if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
          return false
        }

        return isShrunk
      })
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={classNames(
        'bg-white w-full flex items-center justify-between sticky transition duration-500 border border-b-black top-0 z-10 h-[100px]',
        {
          '-translate-y-[100px] pointer-events-none': isShrunk
        }
      )}
    >
      <Link to='/'>
        <div className='w-[70px] h-[90px] mx-20 flex justify-center items-center bg-[#42FCCF] border border-black'>
          <div className='relative w-[60%] h-[80%]'>
            <img ref={refimg} src={logo} alt='' />
            <img ref={refimg2} className='img2 absolute bg-red-700 top-0 left-0' src={logo} alt='' />
          </div>
        </div>
      </Link>
      <Moving />

      <div className='flex mx-14 w-[37vw] justify-end items-end'>
        {!isAuthenticated ? (
          <>
            <div>
              <button
                onClick={toggleOpenLogin}
                className='bg-[#D9D9D9] border hover:bg-gray-500 mx-5 text-black font-itim text-4xl py-6 px-7 hover:border-black rounded-3xl'
              >
                Đăng nhập
              </button>
            </div>
            <div>
              <button
                onClick={toggleOpenRegister}
                className='bg-[#D9D9D9] hover:bg-gray-500 mx-5 text-black font-itim text-4xl py-6 px-7 border hover:border-black rounded-3xl'
              >
                Đăng ký
              </button>
            </div>
          </>
        ) : (
          <UserAvatar handleLogout={handleLogout} info={info} />
        )}
      </div>
    </header>
  )
}
