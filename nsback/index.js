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
app.get('/api/auth/member', (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Authorizationヘッダーがない、または形式が正しくない場合
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '認証トークンが必要です。' });
    }

    // 'Bearer 'の部分を取り除き、トークンのみを抽出
    const token = authHeader.split(' ')[1];

    // トークンを検証。無効な場合はエラーが投げられ、catchブロックで処理される
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 検証成功後、ペイロードを返す
    res.json({ member: payload });

  } catch (err) {
    // jwt.verifyが失敗した場合 (期限切れ、改ざんなど)
    res.status(403).json({ error: '認証トークンが無効です。' });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});

const stsecret = process.env.STSECRET
const stripe = require('stripe')(stsecret)
app.use(express.static('public'))
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


//多分ここまででよい

app.get('api/auth/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});