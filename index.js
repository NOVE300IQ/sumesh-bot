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
        /sumesh-help - know every commands Sumesh have
        /sumesh-catfact - Get catfacted by Sumesh.
        /sumesh-joke - get joked by Sumesh.`
    });
});

app.command("/sumesh-aboutyou", async ({command, ack, respond}) => {
  await ack;
  await respond({
    text: `Heyy Ladies And Gentleman, 
    Its me sumesh, not just a normal bot but the bot who really cares about you.
    My owner's name is NoveOP :)
    Also i love everyone.
    And the supernatural power is i get improved everytime.`
  })
})


app.command("/sumesh-roast", async ({ ack, command, respond}) => {
  await ack
  const user = command.text.trim();
   if(!user) {
    await.respond('Are you trying to roast me ? Mention somebody to roast bro :( ');
    return;
   }
   const roasts = [
        `🔥 ${user}, your code has more bugs than a Minecraft server running on a potato. 💀`,
        `🔥 ${user}, I've seen better variable names in a ransom note.`,
        `🔥 ${user}, your Git history is just \`fix\`, \`fix2\`, \`final\`, \`final-final\`. 💀`,
        `🔥 ${user}, even Stack Overflow doesn't know what you were trying to do.`,
        `🔥 ${user}, your code works perfectly... as long as nobody runs it. 💀`
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    await respond(roast);

})

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
