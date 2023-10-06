const Category = require('./models/category');
const Product = require('./models/product');
const mongoose = require('mongoose');
//TO-DO google what these two lines mean
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];
const categories = [];

main();
async function main(){
  await mongoose.connect(mongoDB);
  await createSampleCategories();
  await createSamplePlushies();
  await createSampleGames();
  await createSampleKeychains();
  mongoose.connection.close();
}

async function createSampleCategories(){
  await createCategory(0, "Games", "Nintendo Switch Games"),
  await createCategory(1, "Plushies", "Nintendo Switch Games"),
  await createCategory(2, "Keychains", "Nintendo Switch Games")
}

async function createSamplePlushies(){
  await createProduct(1000, 
    "Club Mocchi- Mocchi- Kirby Plush - Warpstar Kirby Plushie - Squishy Kirby Plushies - 6 Inch", 
    "Officially Licensed Product: This collectible Warpstar Kirby plush is the perfect companion for all kinds of pop culture collectors.",
    categories[1],
    15.99,
    50,
    ["https://i.imgur.com/xlqXDzr.jpg","https://i.imgur.com/8H3ag5n.jpg","https://i.imgur.com/IvGPz1m.jpg"]);

  await createProduct(1001, 
    "Club Mocchi-Mocchi- Kirby Plush - Sleeping Squishy Collectible Kirby Plushies - 6 Inch",
    "Officially Licensed Product: This collectible Warpstar Kirby plush is the perfect companion for all kinds of pop culture collectors.",
    categories[1],
    15.99,
    50,
    ["https://i.imgur.com/TVM15Ai.jpg"]
  )

  await createProduct(1002, 
    "Little Buddy Kirby Adventure All Star Collection 5.5\" Stuffed Plush, Multicolored", 
    "Kirby is the main character of Nintendo's Kirby video game series created by Masahiro Sakurai and developed by HAL Laboratory. The Kirby series is one of Nintendo's many well-known game franchises, spanning nearly twenty games since 1992.", 
    categories[1], 
    13.99, 
    50, 
    ["https://i.imgur.com/Dor4xr1.jpg"]
);

  await createProduct(1003, 
      "Club Mocchi-Mocchi- Kirby Plush - Kirby and Friend Plushie - Squishy Kirby Plushies - 15 Inch", 
      "Officially Licensed Product: This collectible Warpstar Kirby plush is the perfect companion for all kinds of pop culture collectors", 
      categories[1], 
      32.99, 
      50, 
      ["https://i.imgur.com/RQI3gXv.jpg","https://i.imgur.com/RWG4ZT0.jpg"]
  );

  await createProduct(1004, 
      "Little Buddy 1678 Kirby Adventure All Star - Cutter Kirby 2 Plush, 6\", Multi-Colored", 
      "Kirby is the main character of Nintendo's Kirby video game series created by Masahiro Sakurai and developed by HAL Laboratory. The Kirby series is one of Nintendo's many well-known game franchises, spanning nearly twenty games since 1992.", 
      categories[1], 
      19.76, 
      50, 
      ["https://i.imgur.com/LwDbZGs.jpg"]
  );

    await createProduct(1005, 
      "Sanei Kirby Adventure All Star Collection KP02 Orange Waddle Dee 5\" Stuffed Plush", 
      "Kirby is a fictional character in the Kirby video game series by HAL Laboratory and Nintendo, created by Japanese video game designer Masahiro Sakurai. The Kirby series is one of Nintendo's many well-known game franchises, spanning nearly twenty games since 1992. His first appearance took place in the 1992 video game Kirby's Dream Land, where he was portrayed by a two-dimensional sprite; since Kirby 64: The Crystal Shards for the Nintendo 64, he has made several appearances in 3-D. He has been featured in other video games from Nintendo, on Nintendo's merchandising, on comic books and even on a television show. Kirby also appears in the Super Smash Bros. series.", 
      categories[1], 
      16.49, 
      10, 
      ["https://i.imgur.com/eW0awjM.jpg","https://i.imgur.com/yLXfwM2.jpg"]
  );

    await createProduct(1006, 
      "Little Buddy 1402 Kirby Adventure All Star Collection Meta Knight Plush, 5.5\"",
      "Meta Knight is a major character in the Kirby series appearing in most of the games, manga, as well as the anime. The intrigue and popularity surrounding Meta Knight within the Kirby fandom largely lies in his shrouded motives and his striking likeness to Kirby himself. Meta Knight is the leader of an army of soldiers known as the Meta-Knights, and captains a large airship called Battleship Halberd which may accompany him into the heat of battle. Although Meta Knight first appeared in Kirby's Adventure in 1993, his true name was not known in the U.S. until the game Kirby's Avalanche was released in 1995.",
      categories[1],
      22.38,
      50,
      ["https://i.imgur.com/XNVsY1q.jpg","https://i.imgur.com/5LAEEZw.jpg"]
  );
}

async function createSampleGames(){
  await createProduct(1010, 
    "Kirby’s Return to Dream Land™ Deluxe - Nintendo Switch",
    "The tough puff Kirby is back for a 1-4 player* platforming adventure across Planet Popstar. Copy enemies’ abilities and use their power to breathe fire, attack with a sword, wield a whip, and more! Shoot lasers and kick up a sandstorm with the brand-new Mecha and Sand Copy Abilities. Sometimes you’ll even need to unleash a powerful Super Ability to clear the way. In multiplayer, your friends can choose from Kirby, King Dedede, Meta Knight, and Bandana Waddle Dee as you float along and find Magolor’s missing ship pieces.",
    categories[0],
    50.94,
    50,
    ["https://i.imgur.com/rO8V7pi.jpg"]
  );

  await createProduct(1011, 
      "Kirby and the Forgotten Land (Nintendo Switch)",
      "Take control of the powerful pink puffball, Kirby, and move around in 3D stages as you discover a mysterious world. What journey awaits Kirby Take a deep breath and get ready for an unforgettable adventure!",
      categories[0],
      46.96,
      50,
      ["https://i.imgur.com/8wVPpgY.jpg"]
  );

  await createProduct(1012, 
      "Kirby Star Allies - Switch",
      "Kirby is back—and he's finally on the Nintendo Switch console in HD! But this time, he's not alone. Recruit enemies by hitting them with hearts and gather helpers for a party of up to four characters. On top of that, you can join with up to three friends for a different kind of team-up action!",
      categories[0],
      44.75,
      50,
      ["https://i.imgur.com/bc7WfvJ.jpg"]
  );
}

async function createSampleKeychains(){
  await createProduct(1007, 
    "Bioworld Kirby and the Warp Star Keychain and Split Key Ring",
    "Carry the cuteness of Kirby everywhere you go with this officially licensed Kirby keychain. The adorable keychain features a charming Kirby character with a warp star charm that captures the essence of this beloved gaming character. The charms are made from zinc alloy with a gold metal finish and enamel filling, adding a touch of elegance and durability to the design. The keychain includes a split key ring that ensures your keys stay securely attached. To keep it looking fresh and vibrant, simply wipe it clean with a damp cloth. Whether you're a fan of the game or just love cute accessories, this Kirby keychain is the perfect addition to your everyday carry.",
    categories[2],
    9,
    0,
    ["https://i.imgur.com/f2FYxmn.jpg"]
  );

  await createProduct(1008, 
      "Little Buddy 1710 Kirby Dangling Pose Dangler Plush, 3.5\"",
      "Kirby is a fictional character and the protagonist of the Kirby series of video games owned by Nintendo and hal laboratory. As one of Nintendo most famous and familiar icons, Kirby's round appearance and ability to copy his foes' Powers has made him a well known figure in video games, consistently ranked as one of the most iconic video game characters. He first appeared in 1992 In Kirby's dream land for the game Boy.",
      categories[2],
      12.99,
      50,
      ["https://i.imgur.com/gJkjcLO.jpg"]
  );

  await createProduct(1009, 
      "Little Buddy 1711 Kirby Hovering Pose Dangler Plush, 3.5\"",
      "Kirby is a fictional character and the protagonist of the Kirby series of video games owned by Nintendo and hal laboratory. As one of Nintendo most famous and familiar icons, Kirby's round appearance and ability to copy his foes' Powers has made him a well known figure in video games, consistently ranked as one of the most iconic video game characters. He first appeared in 1992 In Kirby's dream land for the game Boy.",
      categories[2],
      11.99,
      50,
      ["https://i.imgur.com/Dh59x7l.jpg"]
  );
}

async function createCategory(index, name, description){
  const newCategory = new Category({name, description})
  await newCategory.save();
  categories[index] = newCategory;
}

async function createProduct(_id, title, description, category, price, inventory, imageUrl){
  const newProduct = new Product({_id, title, description, category, price, inventory, imageUrl})
  await newProduct.save();
}
