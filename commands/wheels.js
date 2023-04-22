var dir = "../"
const { Client, GatewayIntentBits, Partials, Discord, EmbedBuilder } = require('discord.js');
////////////////////////////////////////////////////

module.exports = {
  name: "wheels",
  title: "🛞 GTF Auto - Wheels",
  cooldown: 3,
  license: "B",
  level: 0,
  channels: ["testing", "gtf-mode"],

  delete: false,
  availinmaint: false,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [],
  execute(msg, query, userdata) {
    var [embed, results, query, pageargs] = gtf_TOOLS.setupcommands(embed, results, query, {
      text: "",
      list: "",
      query: query,
      selector: "",
      command: __filename.split("/").splice(-1)[0].split(".")[0],
      rows: 10,
      page: 0,
      numbers: false,
      buttons: true,
      carselectmessage: true,
      image: [],
      footer: "",
      special: "",
      other: "",
    }, msg, userdata)
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //
   
    var select = "";
    var gtfcar = gtf_STATS.currentcar(userdata);
    var ocar = gtf_CARS.get({ make: gtfcar["make"], fullname: gtfcar["name"] })

       if (ocar["type"] == "Redbull X" || ocar["type"] == "Kart" || ocar["type"].includes("Kart")) {
      gtf_EMBED.alert({ name: "❌ Unavailable", description: "This car cannot have custom wheels.", embed: "", seconds: 3 }, msg, userdata);
      return
    }
    if (typeof query["number"] !== 'undefined') {
      wheels("")
      return
    }
    gtf_STATS.loadcarimage(gtfcar, embed, userdata, wheels)
    function wheels(attachment) {
    pageargs["image"].push(attachment)
      
    if (query["options"] == "list") {
      delete query["number"]
      
      var list = gtf_WHEELS.list("makes").map(function(i) {
        return i + " `🛞" + gtf_WHEELS.find({ make: i }).length + "`";
      })
      embed.setTitle("🛞 __GTF Auto - Wheels (" + list.length + " Makes)__")
      pageargs["list"] = list;
      if (userdata["settings"]["TIPS"] == 0) {
      pageargs["footer"] = "❓ **Choose a wheel manufacturer from the list above with the buttons.**"
      }
      if (typeof query["extra"] !== "undefined") {
        pageargs["footer"] = "✅ " + query["extra"]
        query["extra"] = ""
      }
      pageargs["rows"] = 10;
      pageargs["selector"] = "options"
      pageargs["query"] = query
      pageargs["text"] = gtf_TOOLS.formpage(pageargs, userdata);
      gtf_TOOLS.formpages(pageargs, embed, msg, userdata);
      return;
    }
    
    var make = query["options"];
    select = gtf_WHEELS.find({ make: make });
    select.unshift( {
      "make": "", 
      "name": "Default",
      "colors": [],
      "cost": 0
    })
    if (select.length != 0 && query["number"] === undefined) {
       delete query["number"]

       var select = select.map(function (x) {
         var name = (x['name'] == "Default") ? x["name"] :  x["make"] + " " + x["name"]
      var cond = gtf_WHEELS.checkwheelsavail(x, gtfcar);
      if (cond[0] == "✅") {
        return cond[0] + " " + name + " "
      } else {
      return "**" + gtf_MATH.numFormat(x["cost"]) + "**" + gtf_EMOTE.credits + " " + name;
      }
    });
    embed.setTitle("🛞" + " __" + make + " (" + select.length + " Items)__");
    
    
    pageargs["list"] = select;
      if (userdata["settings"]["TIPS"] == 0) {
      pageargs["footer"] = "❓ **Select rims corresponding with the numbers above with the buttons.\nYou can apply custom wheels to your cars for visual purposes.**"
      }
    pageargs["selector"] = "number"
    pageargs["query"] = query
    pageargs["numbers"] = true
    pageargs["text"] = gtf_TOOLS.formpage(pageargs, userdata);
    gtf_TOOLS.formpages(pageargs, embed, msg, userdata);
    return;
    }

    var number = query["number"];
    
        if (!gtf_MATH.betweenInt(number, 1, select.length + 1)) {
            gtf_EMBED.alert({ name: "❌ Invalid ID", description: "This ID does not exist.", embed: "", seconds: 3 }, msg, userdata);
            return
      }
      var wheel = select[number - 1];
      var cond = gtf_WHEELS.checkwheelsavail(wheel, gtfcar);
        if (cond.includes("❌")) {
          gtf_EMBED.alert({ name: "❌ Wheels Unavailable", description: "**" + wheel["make"] + " " + wheel["name"] + "** is unavailable for **" + gtfcar["name"] + "**." + "\n\n" + "**❗ Choose another option when this message disappears.**", embed: "", seconds: 3 }, msg, userdata);
          return;
        }
        if (cond.includes("✅")) {
          gtf_EMBED.alert({ name: "❌ Same Rims", description: "**" + wheel["make"] + " " + wheel["name"] + "** is already applied for **" + gtfcar["name"] + "**." + "\n\n" + "**❗ Choose another option when this message disappears.**", embed: "", seconds: 3 }, msg, userdata);
          return;
        }
      gtf_MARKETPLACE.purchase(wheel, "WHEEL", "", embed, msg, userdata);
      return;
      }
}
}