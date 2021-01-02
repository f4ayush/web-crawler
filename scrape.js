const request = require("request");

exports.scrape = (path) => {
  return new Promise((resolve, reject) => {
    request(path, (error, response, html) => {
      if (error || response.statusCode !== 200) {
        reject(error);
      } else {
        resolve(html);
      }
    });
  });
};
