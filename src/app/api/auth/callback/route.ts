import axios from 'axios'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  console.log({ code, state })

  try {
    if (code === null) {
      throw new Error('Te code param is undefined')
    }

    const body = new URLSearchParams({
      client_id: process.env.CLIENT_ID ?? '',
      client_secret: process.env.CLIENT_SECRET ?? '',
      grant_type: 'authorization_code',
      code,
      redirect_uri: req.nextUrl.origin + req.nextUrl.pathname
    })

    // const authRes = await fetch('https://discord.com/api/v10/oauth2/token', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body
    // })

    // if (authRes.status !== 200) {
    //   throw new Error('Failed response | status code != 200')
    // }

    // const authData = await authRes.json()
    // console.log(authData)

    const authRes = await axios.post('https://discord.com/api/v10/oauth2/token', body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    console.log(authRes.data)
    // const authData: Oauth2Data = await authRes.data
    // const cookieStore = cookies()
    // const session = await getSession()

    // if (session) {
    //   session.accessToken = authData.access_token
    //   session.refreshToken = authData.refresh_token

    //   await session.save()
    //   cookieStore.set('sessionId', session.id)
    // } else {
    //   const newSession = await SessionModel.create({
    //     accessToken: authData.access_token,
    //     refreshToken: authData.refresh_token
    //   })

    //   cookieStore.set('sessionId', newSession.id)
    // }
  } catch (error) {
    console.log('Error in callback: ', error)
  }

  redirect('/')
}
