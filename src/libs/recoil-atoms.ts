import { atom } from "recoil";

interface ITopic {
  topicId:string
}


interface ISearchQuery {
  query:string
  orientation:string|undefined
  color:string|undefined
  orderBy:string|undefined
}

export const topicInfoState = atom<ITopic>({
  key:"topicInfo",
  default:{
    topicId:"",
  }
})


export const searchQueryState = atom<ISearchQuery>({
  key:"searchQuery",
  default:{
    query:"",
    orientation:undefined,
    color:undefined,
    orderBy:undefined
  }
})
