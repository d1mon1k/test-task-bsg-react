import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://thebetter.bsgroup.eu/',
})

export type AuthLoginType = {
  userName: string | null
  password: string | null
}

export type AuthLoginResponseDataType = {
  AuthorizationToken: {
    Token: string
  }
  User: {
    id: number
    UserName: string
  }
}

export type GetMediaListType = {
  mediaListId: number
}

export type MediaListResponseDataType = {
  id: number
  title: string
  description: string
  year: number
  duration: number
  images: {
    ImageTypeCode: 'FRAME' | 'HIGHLIGHTS' | 'COVER'
    Url: string
  }[]
}[]

export type GetMediaInfoType = {
  mediaId: number
  streamType: 'TRIAL' | 'MAIN'
}

export type MediaInfoResponseDataType = {
  ContentUrl: string
  Description: string
  MediaId: 11
  Title: string
}
