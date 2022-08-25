import LandingPresenter from "./LandingPresenter"
import { useQuery } from 'react-query'
import { getRandomPhotos } from "@libs/unsplash"

export default function LandingContainer() {
  const { data:randomPhotos, isError, isLoading } = useQuery<any>('randomPhotos', getRandomPhotos)

  return (
    <LandingPresenter/>
  )
}
