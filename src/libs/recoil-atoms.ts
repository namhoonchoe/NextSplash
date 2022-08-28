import { atom } from "recoil";

interface ITopic {
  topicId:string
}

export const topicInfoState = atom<ITopic>({
  key:"topicInfo",
  default:{
    topicId:"",
  }
})
