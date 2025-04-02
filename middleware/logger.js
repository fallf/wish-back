export const requestLogger = (req, res, next) => {
  console.log("middleware: I run for all routes");
  next();
};

export const detailedLogger = (req, res, next) => {
  const time = new Date().toLocaleDateString();
  console.log(`${time}: Received a ${req.method} request to ${req.url}. `);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
};
