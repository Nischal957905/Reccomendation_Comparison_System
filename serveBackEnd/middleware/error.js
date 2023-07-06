import { eventLogs } from "./logger.js";

const error = (err, req, res, next) => {
  eventLogs(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log');
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });
};

export default error;

