import PhotoPresenter from "./PhotoPresenter"
import { useRouter } from 'next/router'
import { useQuery } from "react-query";
import { getPhoto } from "@libs/unsplash";

export default function PhotoContainer() {
  const router = useRouter()
  const { id } = router.query
  const {
    data: photo,
    isError,
    isLoading,
  } = useQuery<any>("photo", () => getPhoto(id as string));

  return (
    <PhotoPresenter  />
  )
}