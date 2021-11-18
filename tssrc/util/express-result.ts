import express from 'express';

export class Result {
    private status : number;
    private msg : string;
    constructor(_status : number, _msg : string) {
      this.status = _status;
      this.msg = _msg;
    }
  
    response( res : express.Response)
    {
      res.status(this.status).send(this.msg).end()
    }
}
  
  
  

