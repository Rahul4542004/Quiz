import usePagination from '@mui/material/usePagination/usePagination'
import React from 'react'
import { useParams } from 'react-router-dom'

export const Finish = () => {
  const {score,totalScore} = useParams();
  return (
    <div>Your score is {score} / {totalScore}</div>
  )
}
