const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info", "profile"],
    author: "Amit Max ⚡",
    role: 0,
    shortDescription: "Show owner's profile with Imgur video link",
    longDescription: "Displays profile info and includes a video link hosted on Imgur.",
    category: "profile",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    const profile = `
『 Owner ⚡ Profile 』

╭───────────────────────────────⭓
│ ➤ Name           : Unknown ⚡
│ ➤ Class          : Unknown 
│ ➤ Group          : Science 
│ ➤ Gender         : Male
│ ➤ Birthday       : Unknown 
│ ➤ Religion       : Islam 
│ ➤ Blood Group    : Unknown 
│ ➤ Height         : 5.5 Feet
│ ➤ Location       : Unknown 
│ ➤ Hobby          : Flirting
│ ➤ Relationship   : Single
│ ➤ Facebook       : Unknown 
│ ➤ Instagram      : Unknown 
│ ➤ Email          : maxamit279@gmail.com
│ ➤ Video          : https://i.imgur.com/tLWu7FU.mp4
╰───────────────────────────────⭓

⏰ Time: ${time}`;

    api.sendMessage(profile, event.threadID, (err, info) => {
      if (!err) {
        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 20000); // Auto delete after 20 seconds
      }
    });
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: false });
