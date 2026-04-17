import { ref, watch, onMounted } from 'vue'

export const useCart = () => {
  // カートの中身を保持するリアクティブな変数
  const cart = ref<{ priceId: string; quantity: number }[]>([])

  // 1. 初期ロード時: localStorageからカートデータを復元
  onMounted(() => {
    const savedCart = localStorage.getItem('shopping_cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
    }
  })

  // 2. カートの中身が変わるたびに自動でlocalStorageに保存
  watch(cart, (newCart) => {
    localStorage.setItem('shopping_cart', JSON.stringify(newCart))
  }, { deep: true })

  // 3. カートに商品を追加する関数
  const addToCart = (priceId: string, quantity: number = 1) => {
    const existingItem = cart.value.find(item => item.priceId === priceId)
    if (existingItem) {
      // すでにカートにある場合は数量を増やす
      existingItem.quantity += quantity
    } else {
      // ない場合は新しく追加する
      cart.value.push({ priceId, quantity })
    }
  }
  // 4. 【追加】カートの商品の数量を減らす関数
  const decreaseQuantity = (priceId: string, quantity: number = 1) => {
    // 該当商品のインデックス（配列内の位置）を探す
    const existingItemIndex = cart.value.findIndex(item => item.priceId === priceId)
    
    if (existingItemIndex !== -1) {
      // 数量を減らす
      cart.value[existingItemIndex].quantity -= quantity
      
      // 数量が0以下になった場合、カートからその商品を完全に削除する
      if (cart.value[existingItemIndex].quantity <= 0) {
        cart.value.splice(existingItemIndex, 1)
      }
    }
  }

  // 5. 【追加】カートから特定の商品を完全に削除する関数（×ボタン用など）
  const removeItem = (priceId: string) => {
    cart.value = cart.value.filter(item => item.priceId !== priceId)
  }

  // 4. カートを空にする関数（決済完了後などに使用）
  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    addToCart,
    decreaseQuantity,
    removeItem,
    clearCart,
  }
}