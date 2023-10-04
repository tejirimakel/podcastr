import React from "react";
import Discover from "../components/Sections/Discover";
import Accordion from "../components/Elements/Accordion";
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Hero from "../components/Sections/Hero";
import Featured from "../components/Sections/Featured";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'


export default function Home() {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/home')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Hero />
      <Featured />
      <Discover />
      <Accordion />
    </>
  );
}
