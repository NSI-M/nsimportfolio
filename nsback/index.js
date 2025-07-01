// back/index.js
require('dotenv').config({ path: '.env.dev' })      // ← .env を読み込む
const express = require('express')
const cors    = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bcrypt  = require('bcrypt')

const jwt     = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 5000
app.use(cookieParser())
app.set('trust proxy', 1) // HTTPS behind proxy

// CORS 設定
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}))
app.use(express.json())

// DB 接続
const dbPath = process.env.DB_PATH
const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error(err.message)
  else    console.log(`Connected to SQLite at ${dbPath}`)
})

// サインアップ
const saltRounds = 10
app.post('/api/auth/signup', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: err.message })
    const sql = 'INSERT INTO users (email,password) VALUES (?,?)'
    db.run(sql, [req.body.email, hash], err => {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ message: 'ご登録ありがとうございます' })
    })
  })
})

// サインイン
app.post('/api/auth/signin', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  db.get(sql, [req.body.email], (err, user) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!user) return res.status(401).json({ message: 'Email not found' })
    bcrypt.compare(req.body.password, user.password, (err, ok) => {
      if (err) return res.status(500).json({ error: err.message })
      if (!ok) return res.status(401).json({ message: 'Password incorrect' })

      const payload = { id: user.id, email: user.email }
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.JWT_EXPIRES_IN) }
      )
      res.json({ token })
    })
  })
})

// 認証済みユーザー情報取得
app.get('/api/auth/member', (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.replace(/^Bearer\s+/, '')
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403)
    res.json({ member: payload })
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
