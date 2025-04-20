'use strict';

var request = require("request");

// populate environment variables locally.
require('dotenv').config()

const URL = "https://allison-writes-code.netlify.app";

/*
  Our serverless function handler
*/
export function handler(event, context, callback) {

  // get the arguments from the notification
  var body = JSON.parse(event.body);

  // prepare call to the Slack API
  var slackURL = process.env.hooks.slack.com/services/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
  var slackPayload = {
    "text": "New comment on " + URL,
	  "attachments": [
      {
        "fallback": "New comment on the site",
        "color": "#444",
        "author_name": body.data.email,
        "title": body.data.path,
        "title_link": URL + body.data.path,
        "text": body.data.comment
      },
      {
        "fallback": "Manage comments on " + URL,
        "callback_id": "comment-action",
        "actions": [
          {
            "type": "button",
            "text": "Approve comment",
            "name": "approve",
            "value": body.id
          },
          {
            "type": "button",
            "style": "danger",
            "text": "Delete comment",
            "name": "delete",
            "value": body.id
          }
        ]
      }]
    };

    // post the notification to Slack
    request.post({url:slackURL, json: slackPayload}, function(err, httpResponse, body) {
      var msg;
      if (err) {
        msg = 'Post to Slack failed:' + err;
      } else {
        msg = 'Post to Slack successful!  Server responded with:' + body;
      }
      callback(null, {
        statusCode: 200,
        body: msg
      })
      return console.log(msg);
    });

}