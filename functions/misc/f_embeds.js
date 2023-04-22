var dir = "../../"
const {  Client, GatewayIntentBits, Partials, Discord, EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");
////////////////////////////////////////////////////
module.exports.alert = function (object, msg, userdata) {
  var name = object["name"];
  var desc = object["description"];
  var embed = object["embed"];
  var seconds = object["seconds"];
  var help_desc = "";
  var color = "";
  if (name.includes("⚠")) {
    color = 0xffff00;
  }
  if (name.includes("❌")) {
    color = 0xff0000;
  }
  if (name.includes("✅") || name.includes("🎉") || name.includes(gtf_EMOTE.goldmedal)) {
    color = 0x216c2a;
  }
  var message = msg.content.split("***").join(" ");
  if (message.length == 0 || name.includes("✅") || name.includes("🎉") || name.includes(gtf_EMOTE.goldmedal)) {
    message = "";
  } else {
    message = ' "' + message + '"'
  }

  if (embed == "") {
    var embed = new EmbedBuilder();
    
    if (msg.channel.type != 1) {
    embed.setAuthor({name: msg.user.username, iconURL: msg.user.displayAvatarURL()});
    }

    embed.setColor(color);
    if (["✅", "🎉", gtf_EMOTE.goldmedal].indexOf(name) + 1) {
      embed.setFields([{name:name, value: desc + help_desc}]);
    } else {
      embed.setFields([{name:name + message, value: desc + help_desc}]);
    }

    return msg.channel.send({ embeds: [embed] }).then(msg => {
      if (seconds > 0) {
        setTimeout(() => {
          msg.delete()
          gtf_MAIN.embedcounts[userdata["id"]]--;
          }, seconds * 1000)
      }
    });
  } else {
    embed.setFields([{name: name + ' "' + message + '"', value: desc}]);
    embed.setColor(color);
  return msg.edit({ embeds: [embed] }).then(msg => {
      if (seconds > 0) {
        setTimeout(() => {
          msg.delete()
          gtf_MAIN.embedcounts[userdata["id"]]--;
          }, seconds * 1000)
      }
    });
  }
  return;
};
