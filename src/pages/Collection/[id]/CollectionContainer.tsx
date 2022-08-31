import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import { getCollection, getCollectionPhotos } from "@libs/unsplash";


export default function CollectionContainer() {
  const router = useRouter()
  const { id } = router.query
  const {
    data: collection,
    isError,
    isLoading,
  } = useQuery<any>("collection", () => getCollection(id as string)) ;
  const {
    data: collectionPhotos
  } = useQuery<any>("collectionPhotos", () => getCollectionPhotos(id as string)) ;
  return (
    <div>CollectionContainer</div>
  )
}

