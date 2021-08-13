exports.Result = class {
  constructor(_status, _msg) {
    this.status = _status;
    this.msg = _msg;
  }

  response(res)
  {
    res.status(this.status).send(this.msg).end()
  }
}


