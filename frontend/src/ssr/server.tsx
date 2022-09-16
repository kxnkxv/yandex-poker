import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
//import { isServer } from 'utils/is-server/isServer'
import App from '../App'

const app = express()

app.use(express.static('./dist'))

//const ssrPage = isServer && 'Sever rendered'

app.get('*', (req: Request, res: Response) => {
  fs.readFile(path.resolve('./dist/index.html'), 'utf-8', (err, data) => {
    if (err) console.log('index.html not found')

    if (data) {
      console.log('DATA')
      const jsx = (
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      )
      const reactHtml = renderToString(jsx)
      console.log('Req url:', req.url)
      console.log('JSX:', jsx)
      console.log('reactHtml:', reactHtml)
      res.send(data.replace('<div id="root"></div>', `<div id="root">${reactHtml}</div>`))
    }
  })
})

export { app }
