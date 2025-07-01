// middleware/auth.global.ts
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('[auth.middleware] → navigating to:', to.path, ', requiresAuth:', to.meta.requiresAuth)

  if (to.meta.requiresAuth) {
    const auth = useAuth()
    console.log('[auth.middleware] → calling fetchMember()')
    const member = await auth.fetchMember()
    console.log('[auth.middleware] ← fetchMember returned:', member)

    if (!member) {
      console.log('[auth.middleware] → not authenticated, redirect to /login')
      return navigateTo('/login')
    }

    console.log('[auth.middleware] → authenticated, continue')
  }
})
