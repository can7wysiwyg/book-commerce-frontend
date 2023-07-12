const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

    app.use(
        '/admin',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      ),
      app.use(
        '/book',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/genre',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/newbook',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      ),
      app.use(
        '/cartt',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
     

      
    
    
}