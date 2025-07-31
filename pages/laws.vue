<template>
    <headertop/>
    <div class="flexbox">
        <h2>特定商取引法に基づく表記</h2>
        
            <h3>販売業者</h3>
            <dl>
            <dt>事業者名</dt>
            <dd>株式会社ジュア・プロ</dd>

            <dt>代表責任者</dt>
            <dd>田中圭</dd>

            <dt>所在地</dt>
            <dd>〒351-0113 埼玉県和光市中央 1-6-23</dd>

            <dt>電話番号</dt>
            <dd>+8180-8180-1478</dd>

            <dt>メールアドレス</dt>
            <dd><a href="mailto:info.kiel.jp@gmail.com">info.kiel.jp@gmail.com</a></dd>

            <dt>ウェブサイト</dt>
            <dd><a href="https://www.kiel-mj.com/" target="_blank">https://www.kiel-mj.com/</a></dd>
            </dl>
     

  
            <h3>販売価格</h3>
            <p>各商品ページに税込価格を表示しています。</p>
  

     
            <h3>代金以外の必要料金</h3>
            <dl>
            <dt>消費税</dt>
            <dd>商品価格に含む</dd>

            <dt>送料</dt>
            <dd>全国一律 600円<br>
                合計5,000円以上のご注文で送料無料</dd>

            <dt>振込手数料</dt>
            <dd>金融機関所定の手数料はお客様負担</dd>
            </dl>


   
            <h3>申し込みの有効期限</h3>
            <p>ご注文後7日以内にご入金がない場合は、注文をキャンセルさせていただくことがあります。</p>
     


            <h3>支払方法・支払期限</h3>
            <dl>
            <dt>支払方法</dt>
            <dd>クレジットカード／銀行振込／代金引換</dd>

            <dt>支払期限</dt>
            <dd>
                クレジットカード：購入時に決済完了<br>
                銀行振込：ご注文後7日以内
            </dd>
            </dl>
  

    
            <h3>引き渡し時期</h3>
            <p>ご注文確定（決済完了）後、3～5営業日以内に発送いたします。</p>
  

            <h3>返品・キャンセル</h3>
            <dl>
            <dt>返品期限</dt>
            <dd>商品到着後7日以内にご連絡ください。</dd>

            <dt>返品送料</dt>
            <dd>お客様都合の場合はお客様負担。不良品・誤品発送の場合は当社負担。</dd>

            <dt>返金方法</dt>
            <dd>銀行振込にてご返金いたします。振込先口座情報は別途ご案内。</dd>
            </dl>
 

            <h3>販売条件など</h3>
            <ul class="normallist">
            <li>掲載している写真はサンプルです。実物と色味・質感が若干異なる場合があります。</li>
            <li>予約商品は表示の発送予定日に発送します。</li>
            <li>数量限定商品は在庫がなくなり次第終了します。</li>
            </ul>
 
    </div>
    <footern/>
</template>
<script>
import { NuxtLink } from '#components';
import { ref, onMounted } from 'vue';

// 1. useHeadでSwiperのCDNリソースを読み込む
useHead({
  title: "特定商取引法に基づく表記",
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: '特定商取引法に基づく表記 | Japan Runway Show'},
    {property: 'og:title', content: '特定商取引法に基づく表記 | Japan Runway Show'},
    {property:"twitter:description", content:"特定商取引法に基づく表記 | Japan Runway Show"},
    {name:"robots", content:"noindex, nofollow, max-image-preview:large"}
 ]
})
</script>