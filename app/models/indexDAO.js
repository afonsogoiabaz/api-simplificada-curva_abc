function IndexDAO (connection){
  this._connection = connection;
}

IndexDAO.prototype.get_curva_abc = callback =>{
  this._connection.query('select * from dbo.usuarios', callback);
}

module.exports = () =>{
  return IndexDAO;
}