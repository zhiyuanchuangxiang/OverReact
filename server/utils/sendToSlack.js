var request = require('request');
var hat = require('hat');
var fs = require('fs');

var slack = 'https://hooks.slack.com/services/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';

module.exports = function(req, res) {
  console.log(req.body.screenshot);
  var imageName = hat();
  fs.writeFileSync(`./screenshots/${imageName}.png`, new Buffer(req.body.screenshot, 'base64'));
  req.body.payload.attachments[0].image_url = `http://www.overreact.io/screenshots/${imageName}.png`;
  console.log(req.body.payload.attachments);
  request.post({
    url: 'https://hooks.slack.com/services/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',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(req.body.payload),
    },
    function(err, response, body) {
      if(err) console.log(err);
      res.send(body);
    }
  );
};
