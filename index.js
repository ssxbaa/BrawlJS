// Importing Modules and Constants
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv').config();
const bot = new Telegraf(process.env.token)
const BrawlStarsAPI = require("brawlstars-api-nodejs").API;

// Other Variables
// DO NOT TOUCH IF YOU DON'T KNOW WHAT YOU'RE DOING

const name = process.env.name
const api = new BrawlStarsAPI(process.env.key);
const version = "0\\.1 Alpha"

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

bot.command("stats", (ctx) => {
        data = ctx.message.text.split(" ");
        tag = data[1];
        async function searchPlayer() {
            try {
                const player = await api.player(tag);
                async function sendInfos() {
                    const totalwins = player['3vs3Victories'] + player.soloVictories + player.duoVictories;
                    if (player.club.name != null) {
                        ctx.replyWithMarkdownV2(`⚜️ • *Stats for ${player.name}*\n\n` + 
                                            `🏆 • *Trophies:* ${player.trophies}\n` +
                                            `🔝 • *Highest Trophies:* ${player.highestTrophies}\n` +
                                            `🛡 • *Club:* ${player.club.name}\n` +
                                            `\\#️⃣ • *Tag:* \\${player.tag}\n` +
                                            `💠 • *Experience Level:* ${player.expLevel}\n` +
                                            `👑 • *Battles Won:* ${totalwins}\n` +
                                            `⚔️ • *3v3 Victories:* ${player['3vs3Victories']}\n` +
                                            `👤 • *Solo Victories:* ${player.soloVictories}\n` +
                                            `👥 • *Duo Victories:* ${player.duoVictories}\n\n` +
                                            `🏃‍♂️ • *Powered by [ssxbaa](https://github\\.com/ssxbaa)*`,
                                            {disable_web_page_preview: true}
                        )
                    } else {
                        ctx.replyWithMarkdownV2(`⚜️ • *Stats for ${player.name}*\n\n` + 
                                            `🏆 • *Trophies:* ${player.trophies}\n` +
                                            `🔝 • *Highest Trophies:* ${player.highestTrophies}\n` +
                                            `🛡 • *Club:* No Club\n` +
                                            `\\#️⃣ • *Tag:* \\${player.tag}\n` +
                                            `💠 • *Experience Level:* ${player.expLevel}\n` +
                                            `👑 • *Battles Won:* ${totalwins}\n` +
                                            `⚔️ • *3v3 Victories:* ${player['3vs3Victories']}\n` +
                                            `👤 • *Solo Victories:* ${player.soloVictories}\n` +
                                            `👥 • *Duo Victories:* ${player.duoVictories}\n\n` +
                                            `🏃‍♂️ • *Powered by [ssxbaa](https://github\\.com/ssxbaa)*`,
                                            {disable_web_page_preview: true}
                        )
                    }
                }
                sendInfos()
            } catch(err) { 
                ctx.replyWithMarkdownV2(`⚠️ • *The tag might be invalid*\\. *Try again*\\.`)
            }
        }
        searchPlayer();
});

bot.command("club", (ctx) => {
    data = ctx.message.text.split(" ");
    tag = data[1]
    async function searchClub() {
        try {
            const club = await api.club(tag)
            async function sendInfos() {
                ctx.replyWithMarkdownV2(`⚜️ • *Stats for ${club.name}*\n\n` +
                                        `🏆 • *Club Trophies:* ${club.trophies}\n` +
                                        `❗️ • *Required Trophies:* ${club.requiredTrophies}` +
                                        `\\#️⃣ • *Tag:* \\${club.tag}\n\n` +
                                        `🏃‍♂️ • *Powered by [ssxbaa](https://github\\.com/ssxbaa)*`,
                                        {disable_web_page_preview: true}
                )
            }
            sendInfos()
        } catch(err) {
            ctx.replyWithMarkdownV2(`⚠️ • *The tag might be invalid*\\. *Try again*\\.`)
        }
    }
    searchClub()
});

bot.command("info", (ctx) => 
                ctx.replyWithMarkdownV2(`👋 • *Hi*\\!\n` +
                                        `I am running on the *${version}* version\\.\n` +
                                        `Click [*here*](https://github\\.com/ssxbaa) for the *original developer*\\.`
                                        )
);


// Starting Up

bot.launch();
console.log("The Bot is Online.");