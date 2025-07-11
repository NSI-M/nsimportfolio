// composables/useAuth.ts
export const useAuth = () => {
  const config = useRuntimeConfig()
  const tokenCookie = useCookie('jwt_token', { path: '/', sameSite: 'lax' })

  // サインアップ
  const signup = async (email: string, password: string) => {
    try {
      const data = await $fetch('/api/auth/signup', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { email, password }
      })
      return data
    } catch (e: any) {
      throw createError({
        statusCode: e.response?.status || 500,
        statusMessage: e.response?._data?.message || 'サインアップに失敗しました。メールアドレスを確認してください。'
      })
    }
  }
  // サインイン
  const signin = async (email: string, password: string) => {
    try {
      const data: any = await $fetch('/api/auth/signin', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { email,password }
      })
      tokenCookie.value = data.token
      console.log('tokenCookie updated:', tokenCookie.value); // 
      return data
    } catch (error: any) { 
        throw createError({
          statusCode: error.response?.status || 500,
          statusMessage: error.response?._data?.message || 'サインインに失敗しました。メールアドレスとパスワードを確認してください。'
        })
      }
  }

  // 会員情報取得
  const fetchMember = async () => {
    const token = tokenCookie.value
    console.log('[useAuth] fetchMember → tokenCookie:', token)
    if (!token) return null
      console.log('[useAuth] fetchMember → no token, abort')
    try {
      console.log('[useAuth] fetchMember → calling $fetch /api/auth/member')
      const data: { member: any } = await $fetch('/api/auth/member', {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('[useAuth] fetchMember → success, member:', data.member)
      return data.member
    } catch (err: any) {
      console.log('[useAuth] fetchMember → error:', err)
      // トークン切れや認証エラー時は null
      return null
    }
  }
  // ログアウト
  const signout = () => {
    tokenCookie.value = null
  }

  return { signup, signin, fetchMember, signout, tokenCookie }
}
