module.exports = {
	config: {
		name: "out",
		version: "1.0",
		author: "Amit max ⚡",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "",
			en: "kick 🦶 bot from gc by owner bot"
		},
		longDescription: {
			vi: "",
			en: "remove bot from group "
		},
		category: "owner",
		guide: {
			vi: "",
			en: "just write غادر"
		}
},
	onStart: async function ({ api, args, message, event }) {
		const permission = ["100088513497761"];// set your uid
  if (!permission.includes(event.senderID)) {
    api.sendMessage("Khanakiar chele Amare bahir korar tui ke bol ? 😤.", event.threadID, event.messageID);
    return;
  }

			if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
				if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
	}
}
