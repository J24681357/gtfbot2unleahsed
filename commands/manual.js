var dir = "../"
const {  Client, GatewayIntentBits, Partials, Discord, EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");
////////////////////////////////////////////////////

module.exports = {
  name: "manual",
  cooldown: 3,
  license: "N",
  level: 0,
  channels: ["testing", "gtf-mode","gtf-demo"],

  delete: false,
  availinmaint: false,
  requirecar: false,
  requireuserdata: true,
  usedduringrace: true,
  usedinlobby: true,
  execute(msg, query, userdata) {
    var [embed, results, query, pageargs] = gtf_TOOLS.setupcommands(embed, results, query, {
      text: "",
      list: "",
      query: query,
      selector: "",
      command: __filename.split("/").splice(-1)[0].split(".")[0],
      rows: 1,
      page: 0,
      numbers: false,
      buttons: true,
      carselectmessage: false,
      image: [],
      footer: "",
      special: "",
      other: "",
    }, msg, userdata)
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    /* Setup */
    var list = [

      

 

    "__**Arcade - /arcade**__" + "\n" + 
    "1. In this GTF game, you can participate in single races, drift trials, and speed tests." + "\n" +
    "__Single Race__: There are different difficulties (Beginner, Amateur, Professional, and Endurance) to race against other opponents in randomized tracks. Opponents are chosen based on the performance & type of your garage car." + "\n" +
    "__Single Race__: Different difficulties has different credit payouts, race lengths. There are EXP level requirements for each level except for the Beginner level."  + "\n" + 
    "__Single Race & Drift Trial__: You may select between a random Gran Turismo track, a randomized course maker track, or your own course maker tracks that you saved from **/course**." + "\n" +
    gtf_EMOTE.credits + gtf_EMOTE.exp + " Arcade races have lower credit payouts and less EXP points rewarded than career races.",

      "__**Arcade - /arcade**__" + "\n" +  
    "__Drift Trial__: You can select a difficulty between Beginner and Professional. While in session, you will accumulate a certain amount of drift points until the timer is up." + "\n" +
    "__Drift Trial__: In the race results, the total points accumulated and the rating (COMPLETE, BRONZE, SILVER, GOLD) will be shown. You can earn credits based on your rating." + "\n" +
    gtf_EMOTE.tire + " Using comfort tires in your garage car would be the most optimal. Racing tires would make it harder to earn points." + "\n" +
    "⚠ FF drivetrains are probibited in drift trials." + "\n" +
    "__Speed Test__: You can test the top speed of your garage cars with 400m, 1000m, & 10000m speed tests at Special Stage Route X"  + "\n" + 
    "__Speed Test__: Finishing a 10000m top speed run will give you the highest top speed of your current car while a 400m top speed run will give you the top speed in 1/4 mile." + "\n" + 
    "⚠ Concept cars and other special cars are prohibited in top speed test.",

     "__**Lobby Matchmaking - /lobby**__" + "\n" + 
      "1. In this GTF game, you can compete against other players via lobby matchmaking in Discord threads." + "\n" +
      "__How To Create A Lobby__: You can create a lobby by using the command **/lobby - Host Lobby**. A new lobby will be created as a Discord thread and lobby messages will be sent inside that thread." + "\n" + 
      "You can view the lobby infomation (players, cars, etc) by using the command **/lobby - Lobby Info**." + "\n" +
      "In the lobby information screen, you are able to start the race (host only), change the lobby settings, and view the grid of players." + "\n"+
    "⚠ Once you create a thread, most GTF commands will be limited (Ex. /career, /arcade, etc)." + "\n"+
    "⚠ Certain lobby settings require you to input a number or name **in the slash command menu**, not in the lobby setting menus itself (Ex. Room Name & FPP Limit)." + "\n" +
      "__How To Join A Lobby__: You can search & select for any available lobbies by using **/lobby - Open Lobby Menu**." + "\n" +
 "When the success prompt appears after you select a lobby, the GTF bot will ping you inside the thread (this is where the joined lobby is located." + "\n" +
      "⚠ Do not just join the thread, the GTF bot will not recognize you unless you do the above." + "\n" +
      "__How To Change Cars__: " + "You can change cars in a lobby via **/garage**." + "\n" +
      "Your garage will be filtered based on the current lobby settings. You can also change your tires here.",
      
      "__**Seasonal Events - /seasonal**__" + "\n" + 
    "1. Seasonal events work similarly to career events, but in a more randomized fashion and change daily." + "\n" +
    "2. In the menu, seasonal events are randomized every 3 days with different regulations and tracks, making the combinations practically fun." + "\n" +
    "3. Like career events, you are able to earn credits and prize cars in seasonal events." + "\n" + 
    "4. After 3 days, your progress in these events will reset and will not be saved.",

   
      "__**Tuning Cars (GTF Auto) - /tune**__" + "\n" + 
     "1. In the menu, you can view the type of performance parts that are available in the tuning shop for your current. The amount of parts available (🔧) are based on the specs and type of your garage car." + "\n" + 
     "2. Each type of performanace parts has upgrades and stages that you can purchase for your current car. Your current custom part is labeled as ✅." + "\n" + 
     "3. When you purchase a custom part, it will be applied to your current car and will be added to the car's inventory 📦. When you apply a different custom part from the same type, the previous part will be put in the car's inventory. You can apply parts in the inventory for free." + "\n" +
     "💧 You can also wash your car here after many days of racing." + "\n" +
     "__**Car Setups - /setup**__" + "\n" + 
     "1. Transmission and Suspension custom parts in GTF have advanced tuning options that you can modify by using **/setup**." + "\n" + 
     "2. Default parts cannot be modified." + "\n" + 
     "3. Some parts may affect performance of cars in some sessions such as **/ssrx**.",

      "__**Replays - /replay**__" + "\n" + 
     "1. In this GTF game, you can save replays from any session after a session has finished. " + "\n" + 
     "2. In the replay menu, it opens the list of all of the replays you've saved. Selecting a replay will load the replay and it displays its session results and grid results." + "\n" +
     "3. Replays can be deleted by using **/replay - Delete Replay [number]**, where [number] represents the replay associated with the list in the menu.",

      "__**Course Maker Courses - /course**__" + "\n" + "" + "\n" +
     "1. Custom courses can be created via **/course**. The menu opens the list of all of the course maker tracks you've saved." + "\n" + 
     "2. You can create your own courses by using **/course - Generate Course** and using the parameters used in the slash command (except for the number argument)." + "\n" + 
     "3. Circuit & Sprint courses can be generated." + "\n" + 
     "4. The type of course generated can be either asphalt or gravel (Dirt)." + "\n" + 
     "5. You can use your own courses in Arcade mode to race with other opponents." + "\n" +
     "6. Courses can be deleted by using **/course - Delete Course [number]**, where [number] represents the course associated with the list in the menu.",
      
       "__**Custom Races - /customrace**__" + "\n" + 
      "1. In this GTF game, you can create your own custom races." + "\n" +
      "__How To Create A Race__: You can create a race by using the command **/customrace - Create Event**. A new menu will appear with a new randomized event. If you want to create an event with no regulations, you can use the command **/customrace - Create Event (No Regulations).**" + "\n" + 
      "In the first Custom Race menu, you can adjust the following:" + "\n" +
      "- Track location/layout & laps: Longer duration = more credits" + "\n" +
      "- Time & Weather" + "\n" +
      "- AI Difficulty: Harder difficulty = more credits" + "\n" + "__Loading & Saving Event Settings__" + "\n" + 
      "The GTF bot will remember your current event settings, but not when you create a new event. Therefore, you need to manually save if you want to keep them for another time." + "\n" + 
      "In the second page of the Custom Race Menu, select **Save Event** to save your current event settings." + "\n" + 
      "To load your saved events use the command **/customrace - Load Saved Events** to load one of the event settings you have saved." + "\n" + "__Grid Settings__" + "\n" +
      "In the grid menu, you are able to customize the grid:" + "\n" +
      "- Selecting a car: The car will be in bold and you are able to change the position via selecting a different place." + "\n" + 
      "- Add AI Driver: Adds a random AI driver to the grid based on the current regulations." + "\n" + 
      "- Remove AI Driver: Removes an AI driver from the grid", 
      "__**Custom Races (Regulations)**__" + "\n" + 
      "1. In Custom Races, you can change the regulations in the event to your preferences." + "\n" +
      "⚠ Making any changes to the regulations will replace your current grid." + "\n" +
      "2. FPP Limit / Power Limit / Weight Limit / AI Minimum FPP: You can change the limit via the slash commands, not in the menu." + "\n" + 
      "- Example: To change the FPP Limit to 500. You use the command **/customrace Edit Event Settings**. Then select the **regulation** argument, select **FPP Limit**, and type 500 in the **number** argument." + "\n" + 
      "3. Maximum Tire Grade: Choose the tire requirements for the event. Note that this only affects your garage car." + "\n" +
      "4. Makes / Countries / Types / Drivetrains / Aspirations: Filter the car requirements for the grid. Multiple options can be selected from each of these categories.", 
      "__**Daily Workouts - /daily**__" + "\n" + 
     "1. Using **/daily**, you are able to earn credits & random cars every day by driving at least 26.2mi/42.1 km." + "\n" + 
     "2. Your daily mileage will be reset every 24 hours. You can set the time zone for daily workouts in **/settings - Time Zone**, to match with your time zone." + "\n" + 
     "__**Gifts - /gifts**__" + "\n" +  
     "1. In this GTF game, you can earn rewards that can be redeemable in **/gifts**." + "\n" +
     "2. This command will open the list of gifts that you have earned. Selecting one of them will redeem the item to your save data accordingly." + "\n" +
     "3. You can quickly redeem your latest item by using **/gifts - Redeem Latest Reward**"
    ]



    if (!isNaN(query["options"])) {
      embed.setTitle("📝 __GTF Game Manual__");
      results = list[parseInt(query["options"]) - 1]
          if (userdata["settings"]["TIPS"] == 0) {
      pageargs["footer"] = "\n\n" + "**❓ Welcome to the GTF game manual! You can find some helpful guides about the game.**"
    }
    embed.setDescription(results + pageargs["footer"])
    gtf_STATS.addcount(userdata);
    gtf_DISCORD.send(msg, {embeds:[embed]})
    return
    }

    embed.setTitle("📝 GTF Game Manual");
    pageargs["list"] = list;
    if (userdata["settings"]["TIPS"] == 0) {
      pageargs["footer"] = "**❓ Welcome to the GTF game manual! You can find some helpful guides about the game.**"
    }
    pageargs["selector"] = "number"
    pageargs["query"] = query
    pageargs["text"] = gtf_TOOLS.formpage(pageargs, userdata);
    gtf_TOOLS.formpages(pageargs, embed, msg, userdata);
    }
};
