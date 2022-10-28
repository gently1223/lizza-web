declare namespace Express {
  interface Request {
    facebookAccessToken: string;
    token: string
    user_id: string
    store_id?: string

    test: boolean
  }
}
