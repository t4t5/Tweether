const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ 
  dev, 
  dir: './client',
})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/@:username', (req, res) => {
    const actualPage = '/profile'
    const queryParams = { 
      u: req.params.username 
    } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
