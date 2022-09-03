import React from 'react'
import type { ReactElement } from "react";
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import { getCollection, getCollectionPhotos } from "@libs/unsplash";
import CollectionPresenter from './CollectionPresenter';

export default function CollectionContainer() {
  const router = useRouter()
  const { collectionId } = router.query
  const {
    data: collection,
    isError,
    isLoading,
  } = useQuery<any>("collection", () => getCollection(collectionId as string)) ;
  const {
    data: collectionPhotos
  } = useQuery<any>("collectionPhotos", () => getCollectionPhotos(collectionId as string)) ;
  return (
    <CollectionPresenter  collection={collection} collectionPhotos={collectionPhotos} isLoading={isLoading} error={isError}/>
  )
}


CollectionContainer.getLayout = function PageLayout(page: ReactElement) {
  return (
      {page}
  );
};