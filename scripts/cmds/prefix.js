const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
 config: {
   name: "prefix",
   version: "1.0",
   author: "Ahmed Sojib",
   countDown: 5,
   role: 0,
   shortDescription: "no prefix",
   longDescription: "no prefix",
   category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `✨𝗛𝗶 𝗙𝗿𝗶𝗲𝗻𝗱!✨\n\n✨𝗧𝗵𝗶𝘀 𝗶𝘀 𝗺𝘆 𝗣𝗿𝗲𝗳𝗶𝘅 [ / ]\n
𝗧𝗢 𝗩𝗜𝗘𝗪 𝗔𝗟𝗟 𝗢𝗙 𝗧𝗛𝗘\n𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘  𝗖𝗢𝗠𝗠𝗔𝗡𝗗, 𝗧𝗬𝗣𝗘 [/𝗛𝗘𝗟𝗣]`,
  attachment: await global.utils.getStreamFromURL("")
 });
 }
 }
} 
