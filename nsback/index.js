// back/index.js
//require('dotenv').config({ path: '.env.dev' })      // ← .env を読み込む
//const express = require('express')
//const cors    = require('cors')
//const sqlite3 = require('sqlite3').verbose()
//const bcrypt  = require('bcrypt')

//const jwt     = require('jsonwebtoken')
//const cookieParser = require('cookie-parser')
//const app = express()
//const port = process.env.PORT || 5000
//app.use(cookieParser())
//app.set('trust proxy', 1) // HTTPS behind proxy

// CORS 設定
//app.use(cors({
//  origin: process.env.FRONTEND_ORIGIN,
//  credentials: true
//}))
//app.use(express.json())

// DB 接続
//const dbPath = process.env.DB_PATH
//const db = new sqlite3.Database(dbPath, err => {
//  if (err) console.error(err.message)
//  else    console.log(`Connected to SQLite at ${dbPath}`)
//})

require('dotenv').config({ path: '.env.dev' }) // ← .env を読み込む
const express = require('express')
const cors = require('cors')
// const sqlite3 = require('sqlite3').verbose() // ← 不要になるため削除またはコメントアウト
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Neon DB接続用のライブラリを追加
const { neon } = require('@neondatabase/serverless')

const app = express()
const port = process.env.PORT || 5000

// Neon DBに接続
// 接続情報は環境変数 DATABASE_URL から取得
const sql = neon(process.env.DATABASE_URL)

app.use(cookieParser())
app.set('trust proxy', 1) // HTTPS behind proxy

// CORS 設定
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}))
app.use(express.json())

/*

*/

app.listen(port, () => {
  console.log(`Server running on port ${port}`)

})


async function startServer() {
  // 1) データベース接続確認
  try {
    const { rows } = await sql`SELECT email FROM users`;
    console.log('Database connected successfully:', rows)
    const result = await sql`SELECT email FROM users`;
    console.log('raw result:', result);
  } catch (err) {
    console.error('Failed to connect to database:', err)
    process.exit(1)  // 接続失敗ならプロセス停止
  }

  // 2) サーバ起動
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()
// サインアップ
const saltRounds = 10;

app.get('/api/stock/:priceId', async (req, res) => {
  try {
    const { priceId } = req.params;
    
    // デバッグ用：どんな値で検索しようとしているか確認
    console.log('検索キー(priceId):', priceId);

    // カラム名を 'priceid' から 'price' に修正
    const item = await sql`SELECT stock FROM items WHERE priceid = ${priceId}`;

    if (!item) {
      console.log('DBに該当商品がありませんでした。priceId:', priceId);
      return res.status(404).json({ error: '商品が見つかりません' });
    }

    console.log('取得成功！在庫数:', item);
    const result = Array.isArray(item) ? item[0] : item;

    console.log('送信するデータ:', { stock: result.stock }); 
    res.json({ stock: result.stock }); // これでフロントには { "stock": 0 } が届く
  } catch (error) {
    // 実際のSQLエラーの内容をログに出すと原因がすぐわかります
    console.error('SQL実行エラー:', error);
    res.status(500).json({ error: '在庫の取得に失敗しました' });
  }
});

// サインアップ (ユーザー登録)
app.post('/api/auth/signup', async (req, res) => {
  console.log('--- POST /api/auth/signup ---');
  try {
    const { email, password } = req.body;
    console.log('リクエストボディ:', { email }); // パスワードはログに出力しない

    const hash = await bcrypt.hash(password, saltRounds);

    // Neon DBにユーザーを挿入
    // sqlテンプレートリテラルがSQLインジェクションを防止します
    await sql`INSERT INTO USERS (email, password) VALUES (${email}, ${hash})`;

    // 成功時のレスポンス (作成成功なのでステータスコード201を返すのが一般的)
    res.status(201).json({ message: 'ご登録ありがとうございます' });

  } catch (err) {
    // emailカラムにUNIQUE制約がある場合、重複エラーをハンドリング
    if (err.message.includes('duplicate key value violates unique constraint')) {
      return res.status(400).json({ error: 'このメールアドレスは既に使用されています。' });
    }
    // その他のサーバーエラー
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
});

// サインイン
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Neon DBからemailでユーザーを検索 (結果は配列で返る)
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    // ユーザーが存在しない場合
    if (users.length === 0) {
      // どちらが違うか特定させないために、メッセージは統一するのが安全です
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが違います。' });
    }

    const user = users[0]; // 配列の最初の要素がユーザー情報

    // ハッシュ化されたパスワードを比較
    const isMatch = await bcrypt.compare(password, user.password);

    // パスワードが一致しない場合
    if (!isMatch) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが違います。' });
    }

    // JWTペイロードを作成
    const payload = { id: user.id, email: user.email };

    // JWTを生成
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN) }
    );

    // トークンをレスポンスとして返す
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
});

// 認証済みユーザー情報取得
//app.get('/api/auth/member', (req, res) => {
//  try {
//    const authHeader = req.headers.authorization;
//
//    // Authorizationヘッダーがない、または形式が正しくない場合
//    if (!authHeader || !authHeader.startsWith('Bearer ')) {
//      return res.status(401).json({ message: '認証トークンが必要です。' });
//    }
//
//    // 'Bearer 'の部分を取り除き、トークンのみを抽出
//    const token = authHeader.split(' ')[1];
//
//    // トークンを検証。無効な場合はエラーが投げられ、catchブロックで処理される
//    const payload = jwt.verify(token, process.env.JWT_SECRET);
//
//    // 検証成功後、ペイロードを返す
//    res.json({ member: payload });
//
//  } catch (err) {
//    // jwt.verifyが失敗した場合 (期限切れ、改ざんなど)
//    res.status(403).json({ error: '認証トークンが無効です。' });
//  }
//});

// 認証済みユーザー情報取得20260502
app.get('/api/auth/member', async (req, res) => { // ★ async を追加
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '認証トークンが必要です。' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ★ JWTに保存されているユーザーIDを使って、DBから最新の情報を取得
    // ※ usersテーブルに fname, lname カラムが存在している前提です
    const users = await sql`SELECT id, email, fname, lname, status FROM users WHERE id = ${payload.id}`;

    if (users.length === 0) {
      return res.status(404).json({ message: 'ユーザーが見つかりません。' });
    }

    const user = users[0];

    // 検証成功後、DBから取得した情報を返す
    res.json({ member: user });

  } catch (err) {
    res.status(403).json({ error: '認証トークンが無効です。' });
  }
});

// 名前の変更 (新規追加)
app.put('/api/auth/customer', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '認証トークンが必要です。' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // フロントエンドから送られてきた新しい名前を取得
    const { fname, lname } = req.body;

    if (!fname || !lname) {
      return res.status(400).json({ error: '姓と名は両方入力してください。' });
    }

    // JWTのIDを使ってデータベースを更新
    await sql`UPDATE users SET fname = ${fname}, lname = ${lname} WHERE id = ${payload.id}`;

    res.json({ message: '名前を更新しました。' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});

const stsecret = process.env.STSECRET
const stripe = require('stripe')(stsecret)
app.use(express.static('public'))


// ExpressでJSONを受け取るためのミドルウェア（設定していない場合）
// app.use(express.json()); 

app.post('/api/auth/create-checkout', async (req, res) => {
  try {
    // 1. Nuxtから送信された line_items を受け取る
    const { line_items } = req.body;

    // 空のカートが送られてきた場合のバリデーション
    if (!line_items || line_items.length === 0) {
      return res.status(400).send({ error: 'カートが空です' });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      // 2. 受け取った配列をそのままセットする
      line_items: line_items, 
      billing_address_collection: 'required', // 請求先住所（名前を含む）を必須に
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 
  'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 
  'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 
  'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 
  'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 
  'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 
  'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 
  'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 
  'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 
  'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 
  'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 
  'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 
  'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 
  'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 
  'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ'], 
        // ※「全世界」を指定する場合、Stripeがサポートする全ISO国コードを列挙する必要があります
      },
      tax_id_collection: {
        enabled: true,
        required: 'if_supported',
      },
      phone_number_collection: {
        enabled: true, // 電話番号入力を有効化
      },
      custom_fields: [
        {
          key: 'customfield',
          label: {
            custom: 'ご希望の納期をお知らせください',
            type: 'custom'
          },
          type: 'text'
        }
      ],
      consent_collection: {
          terms_of_service: 'required',
      },
      mode: 'payment',
      return_url: `${process.env.FRONTEND_ORIGIN}/success`,
      automatic_tax: { enabled: true },
    });
    
    console.log(`OK`);
    res.send({ clientSecret: session.client_secret });

  } catch (error) {
    console.error('Stripeエラー:', error);
    res.status(500).send({ error: error.message });
  }
});

//test
app.post('/api/auth/create-checkout-session0', async (req, res) => {
  const { quantity } = req.body;  // ← フロントから受け取る
  const safeQuantity = Math.min(Math.max(parseInt(quantity) || 1, 1), 10);
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1TBHfD09dtrC0gbUvzv2Wh7i',
        quantity: safeQuantity,
      },
    ],
    custom_fields: [
      {
        key: 'customfield',
        label: {
          custom: 'ご希望の納期などをお伝えください',
          type: 'custom'
        },
        type: 'text'
      }
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
    console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//athlete no after
app.post('/api/auth/create-checkout-session1', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1RvrgY09dtrC0gbUd3ovpJw9',
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'customfield',
        label: {
          custom: '競技名と実績(代表的なものをご記載ください)',
          type: 'custom'
        },
        type: 'text'
      }
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});
//商品ごとにapiを構築
app.post('/api/auth/create-checkout-session2', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1Rxj3i09dtrC0gbUOKVESm5H',
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'customfield',
        label: {
          custom: '競技名と実績(代表的なものをご記載ください)',
          type: 'custom'
        },
        type: 'text'
      }
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});
//vip no after
app.post('/api/auth/create-checkout-session3', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1RvjPk09dtrC0gbUPBqStez0',
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'customfield',
        label: {
          custom: 'ご招待者名をご記載ください',
          type: 'custom'
        },
        type: 'text'
      }
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//vip after
app.post('/api/auth/create-checkout-session4', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1Rxj5l09dtrC0gbU1tQckFTP',
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'customfield',
        label: {
          custom: 'ご招待者名をご記載ください',
          type: 'custom'
        },
        type: 'text'
      }
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじや`)
  res.send({clientSecret: session.client_secret});
});

//no after
app.post('/api/auth/create-checkout-session5', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1Rvhjz09dtrC0gbUsWSQG33S',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//after
app.post('/api/auth/create-checkout-session6', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1Rvj0I09dtrC0gbUikNONw4w',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//企業モデル用のアフターパーティチケット
app.post('/api/auth/create-checkout-session7', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SSrvl09dtrC0gbU5WypJhkF',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});


//申し込みモデル用のチケット
app.post('/api/auth/create-checkout-session8', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SSrtF09dtrC0gbUKvACFfeN',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});


//ブランドモデル用のチケット
app.post('/api/auth/create-checkout-session9', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SSsyN09dtrC0gbULJ5etyeB',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//パートナー・コ
app.post('/api/auth/create-checkout-session10', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SUekr09dtrC0gbUGTuiF4yF',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//pa after
app.post('/api/auth/create-checkout-session11', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SUem809dtrC0gbU3xHzEJcC',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});

//Caiya
app.post('/api/auth/create-checkout-session12', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SVEGU09dtrC0gbU9xugD7kc',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});


//Caiya after
app.post('/api/auth/create-checkout-session13', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1SVEHt09dtrC0gbURvTO8Wgv',
        quantity: 1,
      },
    ],
    consent_collection: {
        terms_of_service: 'required',
    },
    //metadata: {
    //  agreed_to_terms: agreed.toString()
    //},
    mode: 'payment',
    return_url: `${process.env.FRONTEND_ORIGIN}/success`,
    automatic_tax: {enabled: true},
  });
  console.log(`ええかんじやね`)
  res.send({clientSecret: session.client_secret});
});


//多分ここまででよい

app.get('api/auth/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});