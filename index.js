// Importing Modules and Constants
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv').config();
const bot = new Telegraf(process.env.token)
const BrawlStarsAPI = require('brawlstars-api-nodejs').API;
const { sanitizeMarkdown } = require('telegram-markdown-sanitizer');

// Other Variables
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

const name = process.env.name
const api = new BrawlStarsAPI(process.env.key);
const version = "0\\.3 Alpha"

// Defining Commands
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

bot.telegram.setMyCommands([
    {
        command: "start",
        description: "Starts the bot."
    },
    {
        command: "stats",
        description: "Shows a Player's stats."
    },
    {
        command: "club",
        description: "Shows a club's info."
    },
    {
        command: "info",
        description: "Shows Bot's informations and credits."
    }
]);

// Actual Responses
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

bot.command("start", (ctx) => 
                ctx.replyWithMarkdownV2(`👋 • *Hi*\\! I'm *${name}*\\!\n\n` + 
                                        `I'm a multifunction *Brawl Stars Helper*\\.\n` + 
                                        `*Try me out*\\!\n\n` +
                                        `🤖 • *By [ssxbaa](https://github\\.com/ssxbaa)*\\!`,
                                        {disable_web_page_preview: true}
));

bot.command("stats", async (ctx) => {
        data = ctx.message.text.split(" ");
        tag = data[1];
            try {
                const player = await api.player(tag);
                const totalwins = player['3vs3Victories'] + player.soloVictories + player.duoVictories;
                const clubname = player.club.name || "No Club";
                ctx.replyWithMarkdownV2(`⚜️ • *Stats for ${player.name}*\n\n` + 
                                        `🏆 • *Trophies:* ${player.trophies}\n` +
                                        `🔝 • *Highest Trophies:* ${player.highestTrophies}\n` +
                                        `🛡 • *Club:* ${clubname}\n` +
                                        `\\#️⃣ • *Tag:* \\${player.tag}\n` +
                                        `💠 • *Experience Level:* ${player.expLevel}\n` +
                                        `👑 • *Battles Won:* ${totalwins}\n` +
                                        `⚔️ • *3v3 Victories:* ${player['3vs3Victories']}\n` +
                                        `👤 • *Solo Victories:* ${player.soloVictories}\n` +
                                        `👥 • *Duo Victories:* ${player.duoVictories}\n\n` +
                                        `🏃‍♂️ • *Powered by [ssxbaa](https://github\\.com/ssxbaa)*`,
                                        {disable_web_page_preview: true}
                )
            } catch(err) { 
                ctx.replyWithMarkdownV2(`⚠️ • *The tag might be invalid*\\. *Try again*\\.`)
                console.log(err)
            }
        }
);

bot.command("club", async (ctx) => {
        data = ctx.message.text.split(" ");
        tag = data[1]
            try {
                const club = await api.club(tag)
                const desc = sanitizeMarkdown(club.description)
                ctx.replyWithMarkdownV2(`⚜️ • *Stats for ${club.name}*\n\n` +
                                        `🏆 • *Club Trophies:* ${club.trophies}\n` +
                                        `❗️ • *Required Trophies:* ${club.requiredTrophies}\n` +
                                        `\\#️⃣ • *Tag:* \\${club.tag}\n` +
                                        `📜 • *Description:* ${desc}\n\n` +
                                        `🏃‍♂️ • *Powered by [ssxbaa](https://github\\.com/ssxbaa)*`,
                                        {disable_web_page_preview: true}
                )
            } catch(err) {
                ctx.replyWithMarkdownV2(`⚠️ • *The tag might be invalid*\\. *Try again*\\.`)
                console.log(err)
            }
    }
);

bot.command("info", (ctx) => 
                ctx.replyWithMarkdownV2(`👋 • *Hi*\\!\n` +
                                        `I am running on the *${version}* version\\.\n` +
                                        `Click [*here*](https://github\\.com/ssxbaa) for the *original developer*\\.`
                                        )
);


// Starting Up

bot.launch();
console.log("The Bot is Online.");