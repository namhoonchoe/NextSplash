import React from 'react'
import type { ReactElement } from "react";
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCollection, getCollectionPhotos } from "@libs/unsplash";
import CollectionPresenter from './CollectionPresenter';
import { GetServerSideProps } from 'next'

export const getServerSideProps:GetServerSideProps = async(context) => {
  const { collectionId } = context.query 
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["collectionPhotos"], () => getCollectionPhotos(collectionId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function CollectionContainer() {
  const router = useRouter()
  const { collectionId } = router.query
  const {
    data: collection,
    isError,
    isLoading,
    error
  } = useQuery<any>("collection", () => getCollection(collectionId as string)) ;
  const {
    data: collectionPhotos
  } = useQuery<any>("collectionPhotos", () => getCollectionPhotos(collectionId as string)) ;
  return (
    <CollectionPresenter  collection={collection} collectionPhotos={collectionPhotos} isLoading={isLoading} isError={isError} error={error}/>
  )
}


CollectionContainer.getLayout = function PageLayout(page: ReactElement) {
  return (
      {page}
  );
};