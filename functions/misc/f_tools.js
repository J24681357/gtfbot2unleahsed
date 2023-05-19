const {  Client, GatewayIntentBits, Partials, Discord, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, AttachmentBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");
////////////////////////////////////////////////////

module.exports.shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

module.exports.unique = function (names) {
  let unique = {};
  names.forEach(function (i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
};

module.exports.interval = function interval(func, wait, times) {
  var interv = (function (w, t) {
    return function () {
      if (typeof t === "undefined" || t-- > 0) {
        setTimeout(interv, w);
        try {
          func.call(null);
        } catch (e) {
          t = 0;
          throw e
        }
      }
    };
  })(wait, times);

  setTimeout(interv, wait);
};

module.exports.toEmoji = function (text) {
  var list = {
    nlicense: "⬛",
    blicense: gtf_EMOTE.blicense,
    alicense: gtf_EMOTE.alicense,
    iclicense: gtf_EMOTE.iclicense,
    iblicense: gtf_EMOTE.iblicense,
    ialicense: gtf_EMOTE.ialicense,
    slicense: gtf_EMOTE.slicense,
    blank: gtf_EMOTE.transparent,
    playercar: gtf_EMOTE.carright,
    playercarup: gtf_EMOTE.carup,
    playercardown: gtf_EMOTE.cardown,
    curbhorizontal: gtf_EMOTE.curbh,
    curbvertical: gtf_EMOTE.curbv,
    curbturnleftdown: gtf_EMOTE.curbturnleftdown,
    curbturnleftup: gtf_EMOTE.curbturnleftup,
    curbturnupright: gtf_EMOTE.curbturnupright,
    curbturndownright: gtf_EMOTE.curbturndownright,
    "N/A": "N/A",
    austria: "🇦🇹",
    "czech republic": "🇨🇿",
    "French Polynesia": "🇵🇫",
    china: "🇨🇳",
    croatia: "🇭🇷",
    france: "🇫🇷",
    brazil: "🇧🇷",
    monaco: "🇲🇨",
    netherlands: "🇳🇱",
    uk: "🇬🇧",
    spain: "🇪🇸",
    switzerland: "🇨🇭",
    germany: "🇩🇪",
    italy: "🇮🇹",
    japan: "🇯🇵",
    "south korea": "🇰🇷",
    sweden: "🇸🇪",
    usa: "🇺🇸",
  };
  return list[text.toLowerCase()];
};

module.exports.emojilist = function (list) {
  var nlist = "";
  for (var index = 0; index < list.length; index++) {
    var emoji = list[index].split(" ")[0];
    nlist = nlist + "**" + emoji + " " + list[index].split(" ").slice(1).join(" ") + "**" + "\n";
  }
  return nlist;
};
module.exports.formpage = function (args, userdata) {
  if (userdata["settings"]["MENUSELECT"] == 1) {
    args["numbers"] = true;
  }
  var list = [];
  var listnumber = "";
  var pagetotal = Math.ceil(args["list"].length / args["rows"]);
  var x = 0;
  var page = args["page"];
  page = page * args["rows"];
  while (x < args["rows"] && args["list"][x + page] !== undefined) {
    if (args["numbers"]) {
      listnumber = "`" + (x + 1 + page).toString() + ".` ";
    }
    if (!args["numbers"]) {
      listnumber = "";
    }

    list.push(listnumber + args["list"][x + page]);
    x++;
  }

  if (list == "") {
    if (args["page"] < 0) {
      args["page"]++;
      return;
    }
    if (args["page"] > pagetotal) {
      args["page"]--;
      return;
    }
  }
  return list;
};
module.exports.formpages = async function (args, embed, msg, userdata) {
  var list = args["list"];
  var currentpagelength = args["text"].length;
  var oldquery = {};
  args["oldquery"] = Object.assign(oldquery, args["query"]);

  var select = 0;
  var reset = true;
  var index = 0;
  var files = [];
  gtf_STATS.addcount(userdata);
  args["text"] = args["text"]
    .map(function (x) {
      if (reset) {
        if (userdata["settings"]["MENUSELECT"] == 0) {
          x = userdata["settings"]["ICONS"]["select"] + " " + x;
        }
        reset = false;
      }
      return x;
    })
    .join("\n")
    .replace(/\/n/gi, "\n");
  embed.setDescription(args["text"] + "\n\n" + args["footer"]);

  embed.setFields([{ name: gtf_STATS.main(userdata), value: gtf_STATS.currentcarmain(userdata) }]);
  if (args["image"].length != 0) {
    if (typeof args["image"][0] === "object") {
      files = [args["image"][0]];
      embed.setThumbnail("attachment://image.png");
    } else {
      embed.setThumbnail(args["image"][0]);
    }
  }

  //
  if (userdata["settings"]["MENUSELECT"] == 1) {
    var numberlist = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    var emojilist = numberlist
      .map(function (x, i) {
        return {
          emoji: "",
          emoji_name: "",
          name: (i + 1).toString(),
          extra: "Number",
          button_id: i + 2,
        };
      })
      .slice(0, currentpagelength);
    emojilist.unshift({
      emoji: gtf_EMOTE.rightarrow,
      emoji_name: "rightarrow",
      name: "",
      extra: "",
      button_id: 1,
    });
    emojilist.unshift({
      emoji: gtf_EMOTE.leftarrow,
      emoji_name: "leftarrow",
      name: args["page"] + 1 + "/" + Math.ceil(args["list"].length / args["rows"]),
      extra: "",
      button_id: 0,
    });
  } else {
    var emojilist = [
      { emoji: gtf_EMOTE.yes, emoji_name: "Yes", name: args["page"] + 1 + "/" + Math.ceil(args["list"].length / args["rows"]), extra: "", button_id: 0 },
      {
        emoji: gtf_EMOTE.leftarrow,
        emoji_name: "leftarrow",
        name: "",
        extra: "",
        button_id: 1,
      },
      {
        emoji: gtf_EMOTE.rightarrow,
        emoji_name: "rightarrow",
        name: "",
        extra: "",
        button_id: 2,
      },
      {
        emoji: gtf_EMOTE.uparrow,
        emoji_name: "uparrow",
        name: "",
        extra: "",
        button_id: 3,
      },
      {
        emoji: gtf_EMOTE.downarrow,
        emoji_name: "downarrow",
        name: "",
        extra: "",
        button_id: 4,
      },
    ];
  }

  if (args["buttons"]) {
    var buttons = gtf_TOOLS.preparebuttons(emojilist, msg, userdata);
  } else {
    var buttons = [];
  }

  var garagepage = 0;
  var hundredpage = 0;
  var totallength = userdata["garage"].length;
  var gmenulist = [];
  var gmenulistselect = [];
  var gemojilist = [];
  var namex = "";
  var menu = [];
  var functionlist2 = [];
  var garagemenuvars = [garagepage, gmenulist, gmenulistselect, gemojilist, namex, menu, functionlist2, buttons, hundredpage, totallength];

  //////
  garagemenuvars = gtf_GTF.garagemenu("", "", args, garagemenuvars, msg, embed, userdata);
  //////

  gtf_DISCORD.send(msg, { embeds: [embed], components: buttons, files: files }, createfunctions);

  function createfunctions(msg) {
    
    garagemenuvars = gtf_GTF.garagemenufunctions("", "", args, garagemenuvars, msg, embed, userdata);

    function selectoption() {
      var pick = select + 1 + args["page"] * args["rows"];
      if (args["command"] == "car") {
        if (args["query"]["options"] == "select") {
          if (typeof args["query"]["name"] !== "undefined") {
            if (args["query"]["name"].length >= 1) {
            args["query"]["options"] = "search";
            delete args["query"]["manufacturer"];
            delete args["query"]["type"];
            }
          }
          var pick = select + 1 + args["page"] * args["rows"];
        } else if (args["query"]["options"] == "list") {
          var pick = [args["list"][select + args["page"] * args["rows"]].split(" `")[0].split(" ").slice(1).join(" ")];
          args["query"]["options"] = "select";
        }
      }

      if (args["command"] == "sponsors") {
        if (args["query"]["options"] == "select") {
          var pick = select + 1 + args["page"] * args["rows"];
        } else if (args["query"]["options"] == "type") {
          var pick = args["list"][select + args["page"] * args["rows"]].split(" <:")[0];
          args["query"]["options"] = "view";
          args["selector"] = "name";
        } else if (args["query"]["options"] == "list") {
          var pick = args["list"][select + args["page"] * args["rows"]];
          args["query"]["options"] = "type";
        }
      }
      if (args["command"] == "levels") {
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "info";
        }
      }
      if (args["command"] == "gifts") {
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "accept";
        }
      }
      if (args["command"] == "setup") {
        var pick = args["list"][select + args["page"] * args["rows"]].split("__**")[1].split("**__")[0];
      }
      if (args["command"] == "course") {
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "view";
        }
      }
      if (args["command"] == "career") {
        if (args["query"]["options"] == "list") {
          delete args["query"]["options"];
        }
      }
      if (args["command"] == "seasonal" || args["command"] == "timetrial") {
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "select";
        }
      }
      if (args["command"] == "garage") {
        if (args["special"] == "Regulation") {
          var pick = parseInt(args["list"][select + args["page"] * args["rows"]].split(":")[1].split("`")[0]);
          args["query"] = [];
        }
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "view";
        }
      }
      if (args["command"] == "replay") {
        if (args["query"]["options"] == "list") {
          args["query"]["options"] = "load";
        }
      }

      if (args["command"] == "wheels") {
        if (args["query"]["options"] == "list") {
          var pick = args["list"][select + args["page"] * args["rows"]].split(" `").slice(0, -1).join(" ");
        }
      }
      if (args["command"] == "lobby") {
        if (args["query"]["options"] == "set") {
          if (typeof args["query"]["settings"] === "undefined" && typeof args["query"]["regulations"] === "undefined") {
            var pick = args["list"][select + args["page"] * args["rows"]].split(": ")[0].toLowerCase();
          }
        } else {
          var pick = parseInt(args["list"][select + args["page"] * args["rows"]].split(":")[1].split("`")[0]);
          args["command"] = "lobby";
          delete args["query"]["list"];
          args["query"]["options"] = "join";
        }
      }
      if (args["command"] == "customrace") {
        if (args["query"]["options"] == "set") {
          args["selector"] = "number";
        } else if (args["query"]["options"] == "list") {
          args["query"]["options"] = "set";
        } else {
          var pick = parseInt(args["list"][select + args["page"] * args["rows"]].split(":")[1].split("`")[0]);
          args["command"] = "customrace";
          delete args["query"]["list"];
        }
      }

      args["query"][args["selector"]] = pick;

      try {
        require("../../commands/" + args["command"]).execute(msg, args["query"], userdata);
        return gtf_STATS.save(userdata);
      } catch (error) {
        gtf_EMBED.alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, userdata);
        console.error(error);
      }
    }

    function selectnumber(number) {
      if (typeof number == "string") {
        return;
      }
      select = number - 2;
      if (currentpagelength < select) {
        return;
      }

      selectoption();
    }

    function back() {
      reset = true;
      if (args["page"] != 0) {
        args["page"]--;
      } else {
        args["page"] = Math.ceil(args["list"].length / args["rows"]) - 1;
      }
      select = 0;
      args["text"] = gtf_TOOLS.formpage(args, userdata);
      currentpagelength = args["text"].length;
      args["text"] = args["text"]
        .map(function (x) {
          if (reset) {
            if (userdata["settings"]["MENUSELECT"] == 0) {
              x = userdata["settings"]["ICONS"]["select"] + " " + x;
            }
            reset = false;
          }
          return x;
        })
        .join("\n")
        .replace(/\/n/gi, "\n");
      embed.setDescription(args["text"] + "\n\n" + args["footer"]);
      if (args["image"].length >= 2) {
        if (typeof args["image"][select + args["page"] * args["rows"]] === "object") {
          files = [args["image"][select + args["page"] * args["rows"]]];
          embed.setThumbnail("attachment://image.png");
        } else {
          embed.setThumbnail(args["image"][select + args["page"] * args["rows"]]);
        }
      }
      args["text"] = "";
      var value = gtf_STATS.currentcarmain(userdata)
      var b = (value == "No car.") ? 0 : 1
      embed.setFields([{ name: gtf_STATS.main(userdata), value: value }]);

      buttons[b].components[0].setLabel(args["page"] + 1 + "/" + Math.ceil(args["list"].length / args["rows"]).toString());
      if (userdata["settings"]["MENUSELECT"] == 1) {
        buttons.map(function (button, i) {
          if (i == 0) {
            return button;
          }
          button.components.map(function (x, j) {
            if (j >= 2 && i == 1) {
              x.setLabel((args["rows"] * args["page"] + (j - 1)).toString());
            }
            if (i == 2) {
              x.setLabel((args["rows"] * args["page"] + (j + 5 - 1)).toString());
            }
            if (i == 3) {
              x.setLabel((args["rows"] * args["page"] + (j + 10 - 1)).toString());
            }
          });
          return button;
        });
      }
      msg.edit({ embeds: [embed], components: buttons, files: files });
    }

    function next() {
      reset = true;
      if (args["page"] != Math.ceil(args["list"].length / args["rows"]) - 1) {
        args["page"]++;
      } else {
        args["page"] = 0;
      }
      select = 0;

      args["text"] = gtf_TOOLS.formpage(args, userdata);
      currentpagelength = args["text"].length;
      args["text"] = args["text"]
        .map(function (x) {
          if (reset) {
            if (userdata["settings"]["MENUSELECT"] == 0) {
              x = userdata["settings"]["ICONS"]["select"] + " " + x;
            }
            reset = false;
          }
          return x;
        })
        .join("\n")
        .replace(/\/n/gi, "\n");
      embed.setDescription(args["text"] + "\n\n" + args["footer"]);
      if (args["image"].length >= 2) {
        //if (embed.thumbnail.url != args["image"][select]) {
        if (typeof args["image"][select + args["page"] * args["rows"]] === "object") {
          files = [args["image"][select + args["page"] * args["rows"]]];
          embed.setThumbnail("attachment://image.png");
        } else {
          embed.setThumbnail(args["image"][select + args["page"] * args["rows"]]);
        }
        // }
      }
      args["text"] = "";
      var value = gtf_STATS.currentcarmain(userdata)
      var b = (value == "No car.") ? 0 : 1
      embed.setFields([{ name: gtf_STATS.main(userdata), value: value }]);

      buttons[b].components[0].setLabel(args["page"] + 1 + "/" + Math.ceil(args["list"].length / args["rows"]).toString());
      if (userdata["settings"]["MENUSELECT"] == 1) {
        buttons.map(function (button, i) {
          if (i == 0) {
            return button;
          }
          button.components.map(function (x, j) {
            if (j >= 2 && i == 1) {
              x.setLabel((args["rows"] * args["page"] + (j - 1)).toString());
            }
            if (i == 2) {
              x.setLabel((args["rows"] * args["page"] + (j + 5 - 1)).toString());
            }
            if (i == 3) {
              x.setLabel((args["rows"] * args["page"] + (j + 10 - 1)).toString());
            }
          });
          return button;
        });
      }
      msg.edit({ embeds: [embed], components: buttons, files: files });
    }

    function up() {
      var index = 0;

      args["text"] = gtf_TOOLS.formpage(args, userdata);

      select--;
      if (select <= -1) {
        select = args["text"].length - 1;
      }
      args["text"] = args["text"]
        .map(function (x) {
          if (select == index) {
            x = userdata["settings"]["ICONS"]["select"] + " " + x;
          }
          index++;
          return x;
        })
        .join("\n")
        .replace(/\/n/gi, "\n");
      embed.setDescription(args["text"] + "\n\n" + args["footer"]);

      if (args["image"].length >= 2) {
        //if (embed.thumbnail.url != args["image"][select]) {
        if (typeof args["image"][select + args["page"] * args["rows"]] === "object") {
          files = [args["image"][select + args["page"] * args["rows"]]];
          embed.setThumbnail("attachment://image.png");
        } else {
          embed.setThumbnail(args["image"][select + args["page"] * args["rows"]]);
        }
        // }
      }

      embed.setFields([{ name: gtf_STATS.main(userdata), value: gtf_STATS.currentcarmain(userdata) }]);
      msg.edit({ embeds: [embed] });
    }

    function down() {
      var index = 0;

      args["text"] = gtf_TOOLS.formpage(args, userdata);
      select++;

      if (select >= args["text"].length) {
        select = 0;
      }

      args["text"] = args["text"]
        .map(function (x) {
          if (select == index) {
            x = userdata["settings"]["ICONS"]["select"] + " " + x;
          }
          index++;
          return x;
        })
        .join("\n")
        .replace(/\/n/gi, "\n");
      embed.setDescription(args["text"] + "\n\n" + args["footer"]);
      if (args["image"].length >= 2) {
        //if (embed.thumbnail.url != args["image"][select]) {
        if (typeof args["image"][select + args["page"] * args["rows"]] === "object") {
          files = [args["image"][select + args["page"] * args["rows"]]];
          embed.setThumbnail("attachment://image.png");
        } else {
          embed.setThumbnail(args["image"][select + args["page"] * args["rows"]]);
        }
        // }
      }

      embed.setFields([{ name: gtf_STATS.main(userdata), value: gtf_STATS.currentcarmain(userdata) }]);
      msg.edit({ embeds: [embed] });
    }

    if (userdata["settings"]["MENUSELECT"] == 1) {
      var functionlist = [back, next];
      for (var x = 2; x < args["list"].length + 2; x++) {
        functionlist.push(selectnumber);
      }
    } else {
      var functionlist = [selectoption, back, next, up, down];
    }
    emojilist = emojilist.concat(gemojilist);
    functionlist = functionlist.concat(functionlist2);
    gtf_TOOLS.createbuttons(buttons, emojilist, functionlist, msg, userdata);
  }
};
module.exports.index = function (list, item) {
  item = JSON.stringify(item);
  var index = 0;
  for (; index < list.length; index++) {
    if (item == JSON.stringify(list[index])) {
      return index + 1;
    }
  }
  return -1;
};

module.exports.setupcommands = function (embed, results, query, pageargs, msg, userdata) {
  var embed = new EmbedBuilder();
  embed.setColor(userdata["settings"]["COLOR"]);
  if (typeof msg.user === 'undefined') {
embed.setAuthor({name: msg.guild.members.cache.get(userdata["id"]).user.username, iconURL: msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL()});
  } else {
    embed.setAuthor({ name: msg.user.username, iconURL: msg.user.displayAvatarURL() });
  }
  var results = "";
  if (Object.keys(pageargs["query"]).length == 0) {
    if (pageargs["command"] == "arcade") {
      pageargs["query"] = { league: "list" };
    } else if (pageargs["command"] == "debug" || pageargs["command"] == "home" || pageargs["command"] == "gtf" || pageargs["command"] == "rcar" || pageargs["command"] == "rcourse" || pageargs["command"] == "rtrack") {
      pageargs["query"] = {};
    } else {
      pageargs["query"] = { options: "list" };
    }
  }
  query = pageargs["query"];
  return [embed, results, query, pageargs];
};

module.exports.preparemenu = function (name, menulist, emojilist, msg, userdata) {
  let menu = new ActionRowBuilder();
  var menuoptions = [];
  for (var j = 0; j < menulist.length; j++) {
    if (menulist[j]["description"].length == 0) {
      menulist[j]["description"] = "\u200B";
    }
    menuoptions.push({
      label: menulist[j]["emoji"] + " " + menulist[j]["name"],
      description: menulist[j]["description"],
      value: menulist[j]["menu_id"].toString(),
    });
    emojilist.push({
      emoji: menulist[j]["emoji"],
      emoji_name: menulist[j]["emoji"],
      name: menulist[j]["name"],
      menu_id: menulist[j]["menu_id"],
      extra: "",
    });
  }
  if (name.length == 0) {
    var options = new StringSelectMenuBuilder().setCustomId("MENU").setPlaceholder(" ").addOptions(menuoptions);
  } else {
    var options = new StringSelectMenuBuilder().setCustomId("MENU").setPlaceholder(name).addOptions(menuoptions);
  }
  menu.addComponents(options);
  return menu;
};

module.exports.preparebuttons = function (emojilist, msg, userdata) {
  var i = 0;
  var list = [];
  var finalindex = 0;
  var newlist = new ActionRowBuilder();
  var color = "SECONDARY";
  for (var i = 0; i < emojilist.length; i++) {
    if (i % 5 === 0 && i > 0) {
      list.push(newlist);
      finalindex++;
      newlist = new ActionRowBuilder();
    }
    if (emojilist[i]["emoji"] == gtf_EMOTE.yes) {
      color = 1;
    } else if (emojilist[i]["emoji"] == gtf_EMOTE.flag) {
      color = 3;
    } else if (emojilist[i]["emoji"] == gtf_EMOTE.exit) {
      color = 4;
    } else {
      color = 2;
    }
    if (emojilist[i]["extra"].includes("https://")) {
      var button = new ButtonBuilder().setStyle(5).setLabel(emojilist[i]["name"]).setURL(emojilist[i]["extra"]);
    } else {
      if (emojilist[i]["name"].length == 0) {
        var button = new ButtonBuilder().setStyle(color).setLabel(" ").setCustomId(emojilist[i]["button_id"].toString());
      } else {
        var button = new ButtonBuilder().setStyle(color).setLabel(emojilist[i]["name"]).setCustomId(emojilist[i]["button_id"].toString());
      }
    }

    if (typeof emojilist[i]["emoji"] !== "string") {
      button.setEmoji(emojilist[i]["emoji"].slice(2).slice(0, -1).split(":")[1], false);
    } else {
      if (emojilist[i]["emoji"].length != 0) {
        button.setEmoji(emojilist[i]["emoji"], false);
      }
    }

    newlist.addComponents(button);
  }
  list[finalindex] = newlist;
  return list;
};

module.exports.createbuttons = function (buttons, emojilist, functionlist, msg, userdata) {
  var i = 0;
  var id = userdata["id"];
  var reactid = gtf_STATS.count(userdata);
  var l = require("discord.js-rate-limiter").RateLimiter;
  var rateLimiter = new l(1, 1000);
  var loop = functionlist.length;
  var menuindex = 0;

  for (i; i < functionlist.length; i++) {
    filter(i);
  }
  for (var j = 0; j < emojilist.length; j++) {
    if (typeof emojilist[j]["menu_id"] !== "undefined") {
      menuindex = j;
      break;
    }
  }

  function filter(i) {
    const filter1 = button => {
      return button.customId === i.toString() && button.user.id === userdata["id"];
    };

    var filter11 = msg.createMessageComponentCollector({ filter1, timer: 10 * 1000, dispose: true });

    filter11.on("collect", r => {
      if (loop == 1) {
        let limited = rateLimiter.take(userdata["id"]);
        if (limited) {
          loop = functionlist.length;
          return;
        } else {
          go(r);
        }
        loop = functionlist.length;
      } else {
        loop--;
        return;
      }
    });

    function go(r) {
      try {
        /*
        if (!r.deferred) {
    
        }
        */
        if (reactid != gtf_STATS.count(userdata)) {
          return;
        }
        if (r.user.id != userdata["id"]) {
          return;
        }
        if (r.customId == "MENU") {
          value = r.values[0];
        } else {
          value = parseInt(r.customId);
        }
        if (typeof value !== "undefined") {
          if (r.customId != "MENU") {
            if (emojilist[parseInt(value)]["extra"] == "Once") {
              if (reactid != gtf_STATS.count(userdata)) {
                return;
              }
              gtf_STATS.addcount(userdata);
              //filter11.stop()
              //r.setDisabled(true)
              //msg.edit({buttons: buttons})
            }
          }
          if (r.customId == "MENU") {
            if (value == "NEXTPAGE" || value == "PREVPAGE" || value == "FAVORITES") {
            r.deferUpdate();
              return functionlist[functionlist.length - 1](value);
            } else {
              if (userdata["settings"]["MENUSELECT"] == 1) {
                    r.deferUpdate();
                return functionlist[functionlist.length - 1](parseInt(value));
              }
                  r.deferUpdate();
              return functionlist[menuindex + parseInt(value)](parseInt(value));
            }
          } else {
            
               setTimeout(function(){
               r.deferUpdate().then(function(){})
  .catch(console.error)}, 1000)
            
            return functionlist[parseInt(value)](parseInt(value));
          }
        }
        r.deferUpdate();
        return functionlist[value]();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

module.exports.querymap = function (args) {
  if (typeof obj === "object") {
    return;
  }
  var query = {};
  for (var i = 0; i < args.length; i++) {
    query[args[i].trim().split(/=(.+)/)[0]] = args[i].trim().split(/=(.+)/)[1];
  }
  return query;
};

module.exports.updateallsaves = function (name, json) {
  var i = 0;
  var { MongoClient, ServerApiVersion } = require('mongodb');

MongoClient = new MongoClient(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  if (name == "EVENTSETTINGS") {
    MongoClient.connect(function (err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo
        .collection(name)
        .find({})
        .forEach(row => {
          if (typeof row["id"] === undefined) {
            return;
          } else {
            var userdata = row;
            row = {
              id: userdata["id"],
              events: [],
            };
            console.log("Saved for " + userdata["id"]);
            dbo.collection(name).replaceOne({ id: userdata["id"] }, row);
            return;
          }
        })
        .then(x => {
          console.log("All saves updated", JSON.stringify(json));
        });
    });
  }
  if (name == "GTF2SAVES") {
    MongoClient.connect(function (err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo
        .collection(name)
        .find({})
        .forEach(row => {
          if (typeof row["id"] === undefined) {
            return;
          } else {
            var userdata = row;
            if (typeof userdata["garage"] === "undefined") {
              return;
            }
            if (typeof json["addobject"] !== "undefined") {
              userdata[json["addobject"][0]] = json["addobject"][1];
            }
            for (var i = 0; i < userdata["garage"].length; i++) {
              if (typeof json["fppupdate"] !== "undefined") {
                if (json["fppupdate"]) {
                  userdata["garage"][i]["fpp"] = gtf_PERF.perf(userdata["garage"][i], "GARAGE")["fpp"];
                }
              }
              if (typeof json["oldcarname"] !== "undefined" && typeof json["newcarname"] !== "undefined") {
                if (userdata["garage"][i]["name"] == json["oldcarname"]) {
                  userdata["garage"][i]["name"] = json["newcarname"];
                }
              }
              userdata["garage"][i]["perf"]["carengine"] = { current: "Default", list: [], tuning: [-999, -999, -999] }
            }

            console.log("Saved for " + userdata["id"]);
            dbo.collection(name).replaceOne({ id: userdata["id"] }, userdata);
            return;
          }
        })
        .then(x => {
          console.log("All saves updated", JSON.stringify(json));
        });
    });
  }
};

module.exports.getsite = function (url, type, callback) {
  if (type == "https") {
    var https = require("https");
  } else {
    var https = require("http");
  }

  https.get(url, resp => {
    let data = "";
    resp.on("data", chunk => {
      data += chunk;
    });

    resp.on("end", () => {
      return callback(data);
    });
  });
};

module.exports.fetchsite = async function (url, callback) {
  const res = await fetch(url);
if (res.ok) {
  const data = await res.json();
  return callback(data)
}
}
