var dir = "../../"
const { Client, GatewayIntentBits, Partials, Discord, EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");
////////////////////////////////////////////////////

module.exports.condition = function (gtfcar) {
  var conditions = [gtfcar["condition"]["oil"],
                    gtfcar["condition"]["engine"],
                    gtfcar["condition"]["transmission"],
                    gtfcar["condition"]["suspension"] ,gtfcar["condition"]["body"]].map(function(x) {
   if (x <= 0) {
     x = 0
   }
      return x
        })
  var weights = [0.06, 0.28, 0.13, 0.13, 0.2]
  var conditionavg = gtf_MATH.weightedaverage(conditions, weights)
  var icon = gtf_EMOTE.carexcellent
  var name = "Excellent"
  if (conditionavg < 70) {
    icon = gtf_EMOTE.carnormal
    name = "Normal"
  }
  if (conditionavg < 45) {
    icon = gtf_EMOTE.carworn
    name = "Worn"
  }
  if (conditionavg < 20) {
    icon = gtf_EMOTE.carbad
    name = "Bad"
  }
  if (conditionavg <= 5) {
    icon = gtf_EMOTE.cardead
    name = "Wreaked"
  }
  var health = gtf_MATH.round(conditionavg, 1)
  if (health <= 0) {
    health = 0
  }
  return {
  health: health,
  name: name,
  emote: icon
  }
}
module.exports.updatecondition = function(number, condition, userdata) {
  var conditionlist = userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["condition"];

  if (condition == "all") {
    var keys = Object.keys(conditionlist)
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "oil" || keys[i] == "clean") {
        continue;
      }
      conditionlist[keys[i]] = number
    }
  } else {
  conditionlist[condition] = Math.round(conditionlist[condition] + number)

  if (conditionlist[condition] >= 100) {
    conditionlist[condition] = 100
  }
  if (conditionlist[condition] <= 0) {
    conditionlist[condition] = 0
  }
  }
  userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["condition"] = conditionlist

  userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["fpp"] = gtf_PERF.perf(userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1], "GARAGE")["fpp"];
}
module.exports.updatecurrentcarclean = function (length, userdata) {
  var id = userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["id"];
  var rnumber = gtf_MATH.randomInt(1, 5);
  var clean = parseInt(userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["clean"]);
  clean = clean - rnumber;

  if (clean <= 0) {
    clean = 0;
  }

  userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["clean"] = clean;

  id = gtf_STATS.garage(userdata).findIndex(x => x["id"] == id) + 1;
  userdata["currentcar"] = id;
};
module.exports.updatedamage = function (racesettings, car, userdata) {
  
    var id = userdata["garage"][gtf_STATS.currentcarnum(userdata) - 1]["id"];
  var length = racesettings["distance"]["km"]
  var damage = car["damage"]
  damage = damage - (damage * (0.4 * (gtf_STATS.level(userdata)/50)))

 ///CLEAN
  var rclean = gtf_MATH.round(gtf_MATH.randomInt(1, 5) * (length/45), 2);
  gtf_CONDITION.updatecondition(-rclean, "clean", userdata)

  ////OIL
  var roil = gtf_MATH.round(length/6, 2);

  gtf_CONDITION.updatecondition(-roil, "oil", userdata)

  while (damage >= 0) {
    var d = gtf_MATH.randomInt(2,5)
    var select = ["engine", "transmission", "suspension", "body"][gtf_MATH.randomInt(0,3)]
    gtf_CONDITION.updatecondition(-d, select, userdata)
    damage = damage - d
  }
}
