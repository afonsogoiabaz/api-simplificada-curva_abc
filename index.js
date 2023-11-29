let app = require('./config/server');
let port = 3000;

app.listen(port, ()=>{
  console.log('servidor online');
})