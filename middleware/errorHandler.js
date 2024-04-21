exports.errorHandler=(err,req,res,next)=>
{
  const statuscode=err.statuscode||500;
  const message=err.message||'Internal server error';
  res.status(statuscode).json({
    success:false,
    statuscode,
    message,
    stack: err.stack
})
}