const axios = require("axios")
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/sumesh-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/sumesh-help", async ({ command, ack, respond}) => {
    await ack
    await respond({
        text: `Available Commands Of Sumesh
        /sumesh-ping - wake up Sumesh (Just Like kicking him while sleeping)
        /sumesh-help - know every commands Sumesh have`
    });
});

app.command("/sumesh-catfact", async ({ command, ack, respond}) => {
    await ack();
    try{
        const response  = await axios.get("https://catfact.ninja/fact")
        await respond({ text:`Cat Fact:\n${response.data.fact}`});
        
    } catch(err) {
        await respond({ text: "sumesh failed to fetch a catfact"});
    }
});

app.command("/sumesh-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Sumesh Failed To Find a good joke" });
  }
});

(async () => {
  await app.start();
  console.log("Sumesh Is ONLINE. Let Him Cook!!");
})();
