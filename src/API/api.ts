import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://thebetter.bsgroup.eu/',
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers!.Authorization = `Bearer ${token}`
  return config
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
    Id: number
    FullName: string
  }
}

export type GetMediaListType = {
  mediaListId: number
}

export type MediaItem = {
  Id: number
  Title: string
  Description: string
  Year: number
  Duration: number
  Images: {
    ImageTypeCode: 'FRAME' | 'HIGHLIGHTS' | 'COVER'
    Url: string
  }[]
}

export type MediaListResponseDataType = {
  Entities: Array<MediaItem>
}

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
