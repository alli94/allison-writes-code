'use strict';

var request = require("request");

// populate environment variables locally.
require('dotenv').config();

const URL = "https://awc-dev-mode.netlify.app";

/*
  Our serverless function handler
*/
export function handler(event, context, callback) {

  // get the arguments from the notification
  var body = JSON.parse(event.body);

  // prepare call to the Slack API
  var slackURL = process.env.SLACK_WEBHOOK_URL

  ;  // Ensure the environment variable is correctly named
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
      }
    ]
  };

  // post the notification to Slack
  request.post({ url: slackURL, json: slackPayload }, function(err, httpResponse, body) {
    let msg;
    if (err) {
      msg = 'Post to Slack failed: ' + err;
      console.error(msg);
    } else {
      msg = 'Post to Slack successful! Server responded with status code: ' + httpResponse.statusCode + ' and body: ' + JSON.stringify(body);
      console.log(msg);
    }

    callback(null, {
      statusCode: 200,
      body: msg
    });
  });
}

