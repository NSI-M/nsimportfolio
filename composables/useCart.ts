import { ref, watch, onMounted } from 'vue'

// カートアイテムの型定義
interface CartItem {
  priceId: string
  quantity: number
  name: string
  imageUrl: string
}

export const useCart = () => {
  const cart = ref<CartItem[]>([])
  
  // 定数設定
  const STORAGE_KEY = 'shopping_cart'
  const TIMESTAMP_KEY = 'shopping_cart_timestamp'
  const EXPIRE_TIME = 3 * 24 * 60 * 60 * 1000 // 3日間をミリ秒で設定

  // 1. 初期ロード時: 期限チェックと復元
  onMounted(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY)
    const savedTimestamp = localStorage.getItem(TIMESTAMP_KEY)

    if (savedCart && savedTimestamp) {
      const now = Date.now()
      const timestamp = parseInt(savedTimestamp)

      // 3日以上経過しているかチェック
      if (now - timestamp > EXPIRE_TIME) {
        // 期限切れの場合
        clearCart()
        console.log('カートの有効期限（3日）が切れたためリセットされました')
      } else {
        // 期限内の場合のみ復元
        cart.value = JSON.parse(savedCart)
      }
    }
  })

  // 2. カートの中身が変わるたびに保存（タイムスタンプも更新）
  watch(cart, (newCart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart))
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString())
  }, { deep: true })

  // 3. 商品を追加（引数にnameとimageUrlを追加）
  const addToCart = (priceId: string, name: string, imageUrl: string, quantity: number = 1) => {
    const existingItem = cart.value.find(item => item.priceId === priceId)
    if (existingItem) {
      existingItem.quantity += quantity
      // 名前や画像が変わっている可能性を考慮して更新しても良い
      existingItem.name = name
      existingItem.imageUrl = imageUrl
    } else {
      cart.value.push({ priceId, quantity, name, imageUrl })
    }
  }

  // 4. 数量を減らす
  const decreaseQuantity = (priceId: string, quantity: number = 1) => {
    const index = cart.value.findIndex(item => item.priceId === priceId)
    if (index !== -1) {
      cart.value[index].quantity -= quantity
      if (cart.value[index].quantity <= 0) {
        cart.value.splice(index, 1)
      }
    }
  }

  // 5. 特定のアイテムを削除
  const removeItem = (priceId: string) => {
    cart.value = cart.value.filter(item => item.priceId !== priceId)
  }

  // 6. カートを完全に空にする
  const clearCart = () => {
    cart.value = []
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TIMESTAMP_KEY)
  }

  return {
    cart,
    addToCart,
    decreaseQuantity,
    removeItem,
    clearCart,
  }
}