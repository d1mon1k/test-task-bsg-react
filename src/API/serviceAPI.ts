import {
  instance,
  AuthLoginType,
  AuthLoginResponseDataType,
  GetMediaListType,
  MediaListResponseDataType,
  GetMediaInfoType,
  MediaInfoResponseDataType,
} from './api'

let token = ''

export class ServiceAPI {
  static async authLogin({ userName, password }: AuthLoginType) {
    try {
      instance
        .post<AuthLoginResponseDataType>('Authorization/SignIn', {
          Username: userName,
          Password: password,
          Device: {
            PlatformCode: 'WEB',
            Name: 'GUID',
          },
        })
        .then((res) => {
          token = res.data.AuthorizationToken.Token
          return res.data
        })
    } catch (e) {
      console.log(e)
    }
  }

  static async getMediaList({ mediaListId }: GetMediaListType) {
    try {
      const response = await instance
        .post<MediaListResponseDataType>(
          'https://thebetter.bsgroup.eu/Media/GetMediaList',
          {
            PageSize: 15,
            PageNumber: 1,
            IncludeCount: true,
            MediaListId: mediaListId,
            IncludeCategories: true,
            IncludeMedia: true,
            IncludeImages: true,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => res.data)
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
          { headers: { Authorization: token } }
        )
        .then((res) => res.data)
    } catch (e) {
      console.log(e)
    }
  }
}
