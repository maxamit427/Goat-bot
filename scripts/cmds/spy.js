const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "spy",
    aliases: ["whoishe", "whoisshe", "whoami", "atake"],
    version: "1.0",
    role: 0,
    author: "Dipto | styled by Amit Max ⚡",
    Description: "Get user information and profile photo",
    category: "information",
    countDown: 10,
  },

  onStart: async function ({
    event,
    message,
    usersData,
    api,
    args,
  }) {
    const uid1 = event.senderID;

    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      uid =
        event.type === "message_reply"
          ? event.messageReply.senderID
          : uid2 || uid1;
    }
    const response = await require("axios").get(
      `${await baseApiUrl()}/baby?list=all`
    );
    const dataa = response.data || { teacher: { teacherList: [] } };
    let babyTeach = 0;

    if (dataa?.teacher?.teacherList?.length) {
      babyTeach = dataa.teacher.teacherList.find((t) => t[uid])?.[uid] || 0;
    }

    const userInfo = await api.getUserInfo(uid);
    const avatarUrl = await usersData.getAvatarUrl(uid);

    let genderText;
    switch (userInfo[uid].gender) {
      case 1:
        genderText = "𝙶𝚒𝚛𝚕🙋🏻‍♀️";
        break;
      case 2:
        genderText = "Boy🙋🏻‍♂️";
        break;
      default:
        genderText = "𝙶𝚊𝚢🤷🏻‍♂️";
    }

    const money = (await usersData.get(uid)).money;
    const allUser = await usersData.getAll(), rank = allUser.slice().sort((a, b) => b.exp - a.exp).findIndex(user => user.userID === uid) + 1, moneyRank = allUser.slice().sort((a, b) => b.money - a.money).findIndex(user => user.userID === uid) + 1;

    const position = userInfo[uid].type;

    const userInformation = `
╭────[ ᴜsᴇʀ ɪɴғᴏ ]
├‣ ✨ ɴᴀᴍᴇ: ${userInfo[uid].name.toUpperCase()}
├‣ ${genderText === "𝙶𝚒𝚛𝚕🙋🏻‍♀️" ? "🙋🏻‍♀️" : genderText === "Boy🙋🏻‍♂️" ? "🙋🏻‍♂️" : "🤷🏻‍♂️"} ɢᴇɴᴅᴇʀ: ${genderText}
├‣ 🆔 ᴜɪᴅ: ${uid}
├‣ 🏷️ ᴄʟᴀss: ${position ? position.toUpperCase() : "𝙽𝚘𝚛𝚖𝚊𝚕 𝚄𝚜𝚎𝚛🥺"}
├‣ 🔤 ᴜsᴇʀɴᴀᴍᴇ: ${userInfo[uid].vanity ? userInfo[uid].vanity.toUpperCase() : "𝙽𝚘𝚗𝚎"}
├‣ 🔗 ᴘʀᴏғɪʟᴇ ᴜʀʟ: ${userInfo[uid].profileUrl}
├‣ 🎂 ʙɪʀᴛʜᴅᴀʏ: ${userInfo[uid].isBirthday !== false ? userInfo[uid].isBirthday : "𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}
├‣ ✍️ ɴɪᴄᴋɴᴀᴍᴇ: ${userInfo[uid].alternateName ? userInfo[uid].alternateName.toUpperCase() : "𝙽𝚘𝚗𝚎"}
╰‣ 🤖 ғʀɪᴇɴᴅ ᴡɪᴛʜ ʙᴏᴛ: ${userInfo[uid].isFriend ? "𝚈𝚎𝚜✅" : "𝙽𝚘❎"}

╭─────[ ᴜsᴇʀ sᴛᴀᴛs ]
├‣ 💰 ᴍᴏɴᴇʏ: $${formatMoney(money)}
├‣ 🏅 ʀᴀɴᴋ: #${rank}/${allUser.length}
├‣ 💵 ᴍᴏɴᴇʏ ʀᴀɴᴋ: #${moneyRank}/${allUser.length}
╰‣ 👶 ʙᴀʙʏ ᴛᴇᴀᴄʜ: ${babyTeach || 0}`;

    message.reply({
      body: userInformation,
      attachment: await global.utils.getStreamFromURL(avatarUrl),
    });
  },
};

function formatMoney(num) {
  const units = ["", "K", "M", "B", "T", "Q", "Qi", "Sx", "Sp", "Oc", "N", "D"];
  let unit = 0;
  while (num >= 1000 && ++unit < units.length) num /= 1000;
  return num.toFixed(1).replace(/\.0$/, "") + units[unit];
                                                                          }
