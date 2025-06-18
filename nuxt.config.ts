// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css:[
    '@/assets/css/restyle.css',
    '@/assets/css/ress.css',
    '@/assets/css/Kiel Top.css'
  ],
  modules: [
    '@nuxt/image',
    '@nuxt/content'
  ],
  image: {
    domains: [""]
  },
  devtools: { enabled: true } ,
  app: {
    head: {
      title: "Japan Runway Show | 日本のファッションウィーク",
      meta: [
        {charset: "utf-8"},
        {name:"viewport", content:"width=device-width, initial-scale=1"},
        {name:"referrer", content:"no-referrer-when-downgrade"},
        {name:"author", content:"MIYU ISHITSUBO"},
        {name:"copyright", content:"MIYU ISHITSUBO"},
        {name:"description", content:"Japan Runway Show(ジャパンランウェイショー)公式サイトです。日本に新設のファッションウィークを設立し、芸術とファッションの振興を目指します。"},
        {name:"robots", content:"index, follow, max-image-preview:large"},
        {property:"og:title", content:"Japan Runway Show"},
        {property:"og:description", content:"Japan Runway Show(ジャパンランウェイショー)公式サイトです。日本に新設のファッションウィークを設立し、芸術とファッションの振興を目指します。"},
        {property:"og:url", content:"https://www.jrs.kiel-mj.com/"},
        {property:"og:image", content:"@/asetts/img/thumbdef.png"},
        {property:"og:type", content:"website"},
        {property:"twitter:author", content:"MIYU ISHITSUBO"},
        {property:"twitter:card", content:"summary_large_image"},
        {property:"twitter:creator", content:"@ffever_m"},
        {property:"twitter:description", content:"@ffever_m"},
        {property:"twitter:domain", content:"jrs.kiel-mj.com"},
        {property:"twitter:image", content:"@/asetts/img/thumbdef.png"},
        {property:"twitter:title", content:"Japan Runway Show"},
        {property:"fb:app_id", content:"350213290965729"},
      ],
      link: [
        {rel: "icon", type:"image/x-icon", href:"/public/favicon.ico"},
        {rel:"stylesheet", href:"https://www.kiel-mj.com/css/Kiel Top.css"},
        {rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"},
        {rel:"stylesheet", href:"https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"},
        {rel:"canonical", href:"https://www.jrs.kiel-mj.com/"},
        {rel:"shortcut icon", href:"/public/faviconl.ico"}
      ],
      script: [
        {src:'https://code.jquery.com/jquery-3.5.1.slim.min.js'},
        {src:'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js'},
        {src:'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'},
        {src:'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'},
        {src:'/js/script.js'},
        {src:'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js'}
      ]
    }
  }
})
