let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('view engine', 'json');

app.use(bodyParser.urlencoded({extended: true}));


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
           
        request.query('select * from dbo.usuarios', function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset);
            
        });
    });
});

module.exports = app;
