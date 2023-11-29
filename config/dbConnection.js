let mssql = require('mssql');

let connection = {
  user: 'sa',
  password: 'free',
  server: 'AFONSO-BARB',
  database: 'ads'
}

let connMSSQL = ()=>{
  console.log('arquivo de conexão com o banco iniciado');
  return mssql.connect(connection)
}

module.exports = ()=>{
  console.log('o autoload carregou o módulo corretamente');
  return connMSSQL;
}