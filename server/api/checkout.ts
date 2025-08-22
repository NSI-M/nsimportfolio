// server/api/create-checkout-session.ts
import Stripe from 'stripe'
import { defineEventHandler, readBody} from 'h3'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  console.log('>>> /api/checkout POST にリクエスト到達')  // ← ここが出るか
  const { priceId, quantity } = await readBody(event)
  const stripe = new Stripe(config.stripeSecret, { apiVersion: '2025-07-30.basil' })
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [{ price: priceId, quantity }],
    mode: 'payment',
    return_url: `https://localhost:3000/success`,
    automatic_tax: {enabled: true},
  })
  
  return { sessionId: session.id }
})