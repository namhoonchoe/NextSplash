import React from 'react'
import PhotoDetail from '@components/PhotoDetail'
import { useRouter } from "next/router";

export default function Photo() {
  const router = useRouter();
  const { id } = router.query 
  return (
    <PhotoDetail id={id}/>
  )
}
