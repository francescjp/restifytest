function _respond(res, next, status, data, httpCode) {
  var response= {
    "status": status,
    "data": data
  };

  res.setHeader('content-type', 'application/json');
	res.writeHead(httpCode);
	res.end(JSON.stringify(response));
	return next();
}

module.exports.success= function (res, next, data){
  _respond(res, next, 'success', data, 200);
};

module.exports.failure= function (res,next, data, httpCode){
  _respond(res, next, 'failure', data, httpCode);
};
