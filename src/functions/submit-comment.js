const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  const data = JSON.parse(event.body);
  const { name, comment } = data;

  if (!name || !comment) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing name or comment" })
    };
  }

  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  const slackPayload = {
    text: `📝 *New comment submission*\n\n*Name:* ${name}\n*Comment:* ${comment}`,
  };

  await fetch(slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackPayload)
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Comment submitted! Awaiting approval." })
  };
};
