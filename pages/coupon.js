import React, { forwardRef, useEffect, useState } from 'react'
import Header from '../src/components/Header'
import { userAuth } from '../src/firebase/client'
import { useUserData } from '../src/hooks/useStamp'
import { Button, Modal } from '@mui/material'
import RefModal from '../src/components/RefModal'
import CouponCard from '../src/components/CouponCard'



const Coupon = () => {
  const { userData, getUserData } = useUserData()
  const [open, setOpen] = useState(false)
  const [uid, setUid]= useState()
  
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user){
        setUid(user.uid)
        getUserData(user.uid)
      }
    })
  },[])


  const handleClick = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = (event) => {
    event.preventDefault()
    setOpen(false)
  }
  return (
    <div>
      <Header />
      <div >
        <h3>クーポン一覧</h3>
        <Button variant='text' onClick={handleClick}>クーポンを交換する</Button>
      </div>
      {userData.coupon ? userData.coupon.map((cpn) => (
        <div key={cpn}>
          <CouponCard data={cpn}/>
        </div>
      )): null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Get-Coupon"
        aria-describedby="Get-Coupon"
      >
        <RefModal stamp={userData.stamp} uid={uid}/>
      </Modal>
    </div>
  )
}

export default Coupon