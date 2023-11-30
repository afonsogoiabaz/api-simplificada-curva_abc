let express = require('express');
let bodyParser = require('body-parser');
let cors = require ('cors');

let app = express();
app.set('view engine', 'json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', function (req, res) {
   
  let sql = require("mssql");

  let config = {
    user: 'sa',
    password: 'free',
    server: "localhost\\SQL2014",
    database: 'ads',
    port: 1433, 
    synchronize: true,
    trustServerCertificate: true,
    options: {
      cryptoCredentialsDetails: {
        minVersion: 'TLSv1',
      }
    },
  };

  sql.connect(config, function (err) {
  
    if (err) console.log(err);

    let request = new sql.Request();
        
    request.query(`select fornec_id,nome,
                  sum(quantidade) as quantidade, sum(total) as total 
                    from (
                      SELECT fornecedores.fornec_id, fornecedores.nome,
                        case when operacoes.tipo='VND' then movto02.quantidade else  movto02.quantidade*(-1) end as quantidade,
                        case when operacoes.tipo='VND' then movto02.total else movto02.total * (-1) end as total
                      FROM 
                        movto INNER JOIN
                          movto02 ON movto.pedido_id = movto02.pedido_id INNER JOIN
                          produtos ON movto02.produto_id = produtos.produto_id INNER JOIN
                          fornecedores ON produtos.fornec_id = fornecedores.fornec_id INNER JOIN
                          operacoes ON movto.oper_id = operacoes.oper_id
                      where 
                        data between '2023-06-01' and '2023-11-29'
                      and 
                        faturado=1 and operacoes.tipo in ('VND','DVV') ) as tbl_grupo_tipo
                      group by fornec_id,nome
                      order by total desc`,
    function (err, results) {
      if (err) console.log(err)

      res.send(results.recordset);
    });
  });
});

module.exports = app;
