module.exports = app=>{
  app.get('/', (req, res)=>{
    app.app.controllers.index.relatorio_curva_abc(app, req, res);
  })
}