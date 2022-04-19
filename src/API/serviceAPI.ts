import {
  instance,
  AuthLoginType,
  AuthLoginResponseDataType,
  GetMediaListType,
  GetMediaInfoType,
  MediaInfoResponseDataType,
  MediaListResponseDataType,
} from './api'

export class ServiceAPI {
  static async authLogin({ userName, password }: AuthLoginType) {
    try {
      let response = await instance
        .post<AuthLoginResponseDataType>('Authorization/SignIn', {
          Username: userName,
          Password: password,
          Device: {
            PlatformCode: 'WEB',
            Name: 'GUID',
          },
        })
        localStorage.setItem('token', response.data.AuthorizationToken.Token)
        return response.data
      } catch (e) {
      throw new Error(`${e}`)
    }
  }

  static async getMediaList({ mediaListId }: GetMediaListType) {
    try {
      const response = await instance
        .post<MediaListResponseDataType>( 
          'https://thebetter.bsgroup.eu/Media/GetMediaList',
          {
            PageSize: 25,
            PageNumber: 1,
            IncludeCount: true,
            MediaListId: mediaListId,
            IncludeCategories: true,
            IncludeMedia: true,
            IncludeImages: true,
          },
        )
        return response.data.Entities
    } catch (e) {
      console.log(e)
    }
  }

  static async getMediaInfo({ mediaId, streamType }: GetMediaInfoType) {
    try {
      const response = await instance
        .post<MediaInfoResponseDataType>(
          'Media/GetMediaPlayInfo',
          {
            MediaId: mediaId,
            StreamType: streamType,
          },
        )
        return response.data
    } catch (e) {
      throw new Error()
    }
  }
}
