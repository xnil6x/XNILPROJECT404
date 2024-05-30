const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "『𝐗-𝐍𝐢𝐥 𝐗𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲』"; // don't change neme

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // modify by xnil
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔═════▓࿇࿇▓═════╗\n𝐗-𝐍𝐢𝐥-𝐁𝐎𝐓-𝐀𝐋𝐋-𝐂𝐌𝐃-𝐋𝐈𝐒𝐓\n╚═════▓࿇࿇▓═════╝\n\n`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 3 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n\n🍒 [${category.toUpperCase()}] 》🍒`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 60).map((item) => `\n►${item}`);
            msg += ` ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += ``;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝐓𝐎𝐓𝐀𝐋 𝐂𝐌𝐃 ${totalCommands}\n\n`;
      msg += `╔═══•|❤️🧡💛💚🩵❤️‍🩹|•═══╗\n\n❤️𝐎𝐖𝐍𝐄𝐑-𝐍𝐀𝐌𝐄 ~ 𝐗-𝐍𝐢𝐥 𝐗𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲💛\n\n𝐅𝐁-𝐈𝐃-𝐋𝐈𝐍𝐊 https://www.facebook.com/xnilxhowdhury143\n\n╚═══▓❤️🧡💛💚🩵❤️‍🩹▓═══╝`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.imgur.com/kgi0jVj.jpeg", // don't change imgur
        "https://i.imgur.com/FYCVBcw.jpeg"
        // don't change imgur
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭──𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑- (𝐗-𝐍𝐢𝐥 𝐗𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲) ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  ├── Robot is modified by 𝐗𝐧𝐢𝐥 for any
  ├── help you can contact admin Thanks
  ├── m.me/100000768468627
  │  𝐓𝐇𝐀𝐍𝐊𝐒- 𝐗-𝐍𝐢𝐥 𝐗𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲
  ╰═══❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
