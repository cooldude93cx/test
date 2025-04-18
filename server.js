const axios = require('axios');
const { Client, Intents, InteractionCollector, MessageEmbed, AttachmentBuilder, ChannelType, GatewayIntentBits, Routes, ApplicationCommand, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const dotenv = require('dotenv');
const fs1 = require('fs');
const Jimp = require('jimp');
//const getColors = require('get-image-colors');
const path = require('path');
const FormData = require('form-data');
const { createCanvas, loadImage } = require('canvas');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');



function getRandomCookie() {
    const cookies = [process.env.ROBLOSECURITY3, process.env.roblosecurity2];
    return cookies[Math.floor(Math.random() * cookies.length)];
}

const cookie = getRandomCookie();

const config = {
    headers: {
        'Cookie': `.ROBLOSECURITY=${cookie}`
    }
};

const client = new Client({
    partials: ["CHANNEL"], // Add partials
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ] // Combine intents from both cases
});

const client2 = new Client({
    partials: ["CHANNEL"], // Add partials
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ] // Combine intents from both cases
});

const ROBLOSECURITY = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.ROBLOSECURITY}`;
const ROBLOSECURITY3 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.ROBLOSECURITY3}`;
const ROBLOSECURITY5 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.roblosecurity5}`;
const ROBLOSECURITY7 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.roblosecurity7}`;
const ROBLOSECURITY8 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.roblosecurity8}`;

const getUserData3 = async (url) => {
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts

    while (attempts < maxAttempts) {
        try {
            return await axios.get(url,config);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) {
                    // Retry with roproxy.com if rate limited
                    const roproxyResponse = await axios.get(url.replace('roblox.com', 'roproxy.com'),config);

                    // Check if roproxy.com returns a 429 error
                    if (roproxyResponse.status === 429) {
                        console.log(`${url} ${roproxyResponse.status}`);
                        // Make a request to the specified proxy endpoint
                        return await axios.get(`${process.env.PROXY}?apikey=${process.env.PROXYKEY}&url=${encodeURIComponent(url)}`,config);
                    }
                    return roproxyResponse; // Return the response from roproxy if no error
                } else if ([500, 502, 503, 504].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else if (error.code === 'ECONNRESET' || error.message.includes('socket hang up')) {
                // Handle socket hang up error and retry
                attempts++;
                if (attempts >= maxAttempts) {
                    console.log(`Max retry attempts reached due to socket hang up. Aborting...`);
                    throw error;
                }
                console.log(`Retrying due to socket hang up error... Attempt ${attempts + 1}`);
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
            } else {
                throw error; // Throw the error if not a response or socket error
            }
        }
    }
};

const getUserData = async (url) => {
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts

    while (attempts < maxAttempts) {
        try {
            return await axios.get(url);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) {
                    // Retry with roproxy.com if rate limited
                    const roproxyResponse = await axios.get(url.replace('roblox.com', 'roproxy.com'));

                    // Check if roproxy.com returns a 429 error
                    if (roproxyResponse.status === 429) {
                        console.log(`${url} ${roproxyResponse.status}`);
                        // Make a request to the specified proxy endpoint
                        return await axios.get(`${process.env.PROXY}?apikey=${process.env.PROXYKEY}&url=${encodeURIComponent(url)}`);
                    }
                    return roproxyResponse; // Return the response from roproxy if no error
                } else if ([500, 502, 503, 504].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else if (error.code === 'ECONNRESET' || error.message.includes('socket hang up')) {
                // Handle socket hang up error and retry
                attempts++;
                if (attempts >= maxAttempts) {
                    console.log(`Max retry attempts reached due to socket hang up. Aborting...`);
                    throw error;
                }
                console.log(`Retrying due to socket hang up error... Attempt ${attempts + 1}`);
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
            } else {
                throw error; // Throw the error if not a response or socket error
            }
        }
    }
};

const postUserData = async (url, data, config) => {
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts

    while (attempts < maxAttempts) {
        try {
            return await axios.post(url, data, config);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) {
                    // Retry with roproxy.com if rate limited
                    const roproxyResponse = await axios.post(url.replace('roblox.com', 'roproxy.com'), data, config);
                    
                    // Check if roproxy.com returns a 429 error
                    if (roproxyResponse.status === 429) {
                        // Make a request to the specified proxy endpoint
                        return await axios.post(`${process.env.PROXY}?apikey=${process.env.PROXYKEY}&url=${encodeURIComponent(url)}`, data, config);
                    }
                    return roproxyResponse; // Return the response from roproxy if no error
                } else if ([500, 502, 503, 504].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else {
                throw error; // Throw the error if no response
            }
        }
    }
};



async function getUserIdFromProfile(username, retries = 3) {
    try {
        const response = await axios.get(`https://www.roblox.com/users/profile?username=${username}`, { maxRedirects: 0 });
        const locationHeader = response.headers['location'];
        const userIdMatch = locationHeader.match(/\/users\/(\d+)\/profile/);
        if (userIdMatch) {
            return userIdMatch[1];
        }
    } catch (error) {
        if (error.response && [500, 501, 502, 503, 504].includes(error.response.status)) {
            if (retries > 0) {
                console.log(`Retrying... Attempts left: ${retries}`);
                return getUserIdFromProfile(username, retries - 1);
            }
        } else if (
            error.code === 'ECONNRESET' || 
            error.code === 'ECONNREFUSED' || 
            error.code === 'EPIPE' || 
            error.code === 'ETIMEDOUT' || 
            error.message.includes('socket hang up')
        ) {
            if (retries > 0) {
                console.log(`Retrying... Attempts left: ${retries}`);
                return getUserIdFromProfile(username, retries - 1);
            }
        } else if (error.response && error.response.status === 302) {
            const locationHeader = error.response.headers['location'];
            const userIdMatch = locationHeader.match(/\/users\/(\d+)\/profile/);
            if (userIdMatch) {
                return userIdMatch[1];
            }
        } else {
            throw new Error(`Error fetching user profile: ${error.message}`);
        }
    }
    return null;
}


const roblosecurity2 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.roblosecurity2}`
const ROBLOSECURITY10 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.ROBLOSECURITY10}`;


const getUserData2 = async (url) => {
    const cookies = [
        `.ROBLOSECURITY=${ROBLOSECURITY3}`,
        `.ROBLOSECURITY=${ROBLOSECURITY9}`,
        `.ROBLOSECURITY=${roblosecurity2}`,
        `.ROBLOSECURITY=${ROBLOSECURITY10}`
    ];
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts
    let currentCookieIndex = 0;

    while (attempts < maxAttempts) {
        try {
            // Set the cookie in the headers for the request
            const config = {
                headers: {
                    'Cookie': cookies[currentCookieIndex] // Use the current cookie
                }
            };
            
            // Make the GET request with the current cookie
            return await axios.get(url, config);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429 && currentCookieIndex < cookies.length - 1) {
                    // Retry with the next cookie if rate-limited
                    currentCookieIndex++;
                    console.log(`Retrying with next .ROBLOSECURITY cookie... Attempt ${attempts + 1}`);
                    attempts++;
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else if ([500, 502, 503].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else {
                throw error; // Throw the error if no response
            }
        }
    }
};


client.on('ready', () => {
    console.log('Bot is online!');
});









async function getCorrectUsername(userId) {
    const url = `https://users.roblox.com/v1/users/${userId}`;

    try {
        // Make the GET request to the API
        const response = await getUserData2(url);

        // Parse and return the username
        if (response.data && response.data.name) {
            return response.data.name;
        } else {
            throw new Error("Username not found for the provided user ID.");
        }
    } catch (error) {
        console.error("Error fetching username:", error.message);
        throw new Error("Failed to retrieve username. Please try again.");
    }
}

async function getCorrectUsername2(userId) {
    const url = "https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles";

    // Define the payload
    const payload = {
        userIds: [userId],
        fields: ["names.username"]
    };

    try {
        // Make the POST request to the API
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Parse and return the username
        const profileDetails = response.data.profileDetails;
        if (profileDetails && profileDetails.length > 0) {
            return profileDetails[0].names.username;
        } else {
            throw new Error("Username not found for the provided user ID.");
        }
    } catch (error) {
        console.error("Error fetching username:", error.message);
        throw new Error("Failed to retrieve username. Please try again.");
    }
}


const commands = ['game', 'experience', 'place'];










const CLIENT_ID = 'PCyuxX6-4K_uwEje6ks-KA';
const CLIENT_SECRET = `${process.env.reddit}`;
const REDIRECT_URI = 'https://supers.lol/Avis';
const STATE = 'randomString';
const DURATION = 'permanent';
const SCOPE = 'identity read';



const querystring = require('querystring');




client.on('messageCreate', async (message) => {
  if (!message.content.toLowerCase().startsWith('-redditget ')) return;

  const args = message.content.split(' ').slice(1);
  if (args.length < 1) {
    message.reply('Please provide a username.');
    return;
  }

  const username = args[0].toLowerCase();

  try {
    // Step 1: Get an access token
    const tokenResponse = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      querystring.stringify({
        grant_type: 'client_credentials',
      }),
      {
        auth: { username: CLIENT_ID, password: CLIENT_SECRET },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const { access_token } = tokenResponse.data;

    // Step 2: Make a request to the /user/{username}/about endpoint
    const userResponse = await axios.get(`https://oauth.reddit.com/user/${username}/about`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'User-Agent': 'discord-bot (by /u/Admirable_Air2997)',
      },
    });

    // Log the response to the console
    console.log(userResponse.data);

    // Notify in Discord
    message.reply(`${username} logged`);
  } catch (error) {
    console.error('Error fetching user data:', error.response?.data || error.message);
    message.reply('An error occurred while fetching user information.');
  }
});

const ASSET_MAPPINGS = {
  "1": "Image",
  "2": "ClassicTShirt",
  "3": "Audio",
  "4": "Mesh",
  "5": "Lua",
  "8": "Hat",
  "9": "Place",
  "10": "Model",
  "11": "ClassicShirt",
  "12": "ClassicPants",
  "13": "Decal",
  "17": "Head",
  "18": "Face",
  "19": "Gear",
  "21": "Badge",
  "24": "Animation",
  "27": "Torso",
  "28": "RightArm",
  "29": "LeftArm",
  "30": "LeftLeg",
  "31": "RightLeg",
  "32": "Package",
  "34": "GamePass",
  "38": "Plugin",
  "40": "MeshPart",
  "41": "Hair",
  "42": "FaceAccessory",
  "43": "Neck",
  "44": "Shoulder",
  "45": "Front",
  "46": "Back",
  "47": "WaistAccessory",
  "48": "ClimbAnimation",
  "49": "DeathAnimation",
  "50": "FallAnimation",
  "51": "IdleAnimation",
  "52": "JumpAnimation",
  "53": "RunAnimation",
  "54": "SwimAnimation",
  "55": "WalkAnimation",
  "56": "PoseAnimation",
  "57": "EarAccessory",
  "58": "EyeAccessory",
  "61": "EmoteAnimation",
  "62": "Video",
  "64": "TShirt",
  "65": "Shirt",
  "66": "Pants",
  "67": "Jacket",
  "68": "Sweater",
  "69": "Shorts",
  "70": "LeftShoe",
  "71": "RightShoe",
  "72": "DressSkirt",
  "73": "FontFamily",
  "76": "EyebrowAccessory",
  "77": "EyelashAccessory",
  "78": "MoodAnimation",
  "79": "DynamicHead"
};

const PREFIXES = ["-item3", "-i3", "-asset3", "-hat3", "-limited3", "-lim3"];
const ROLIMONS_API = 'https://www.rolimons.com/itemapi/itemdetails';
const DEMAND_MAP = ['None', 'Terrible', 'Low', 'Normal', 'High', 'Amazing'];
const TREND_MAP = ['None', 'Lowering', 'Unstable', 'Stable', 'Raising', 'Fluctuating'];

async function fetchThumbnail(itemId) {
  const response = await getUserData(`https://thumbnails.roblox.com/v1/assets?assetIds=${itemId}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`);
  return response.data.data[0]?.imageUrl || null;
}

// Fetch Available and Premium Copies
async function fetchCopies(itemId) {
  const itemPage = await axios.get(`https://www.rolimons.com/item/${itemId}`);
  
  // Primary method to fetch copies
  let availableMatch = itemPage.data.match(/Available Copies<\/h6>\s*<h5 class="card-title mb-1 text-light text-truncate stat-data">(\d+)<\/h5>/);
  let premiumMatch = itemPage.data.match(/Premium Copies<\/h6>\s*<h5 class="card-title mb-1 text-light text-truncate stat-data">(\d+)<\/h5>/);

  // Fallback method if the primary matches are not found
  if (!availableMatch || !premiumMatch) {
    availableMatch = itemPage.data.match(/<div class="ownership-stat-box bg-primary"[^>]*>\s*<div class="value-stat-header">Available Copies<\/div>\s*<div class="value-stat-data">([\d,]+)<\/div>/);
    premiumMatch = itemPage.data.match(/<div class="ownership-stat-box bg-primary"[^>]*>\s*<div class="value-stat-header">Premium Copies<\/div>\s*<div class="value-stat-data">([\d,]+)<\/div>/);
  }

  return {
    available: availableMatch ? availableMatch[1].replace(/,/g, '') : 'A',
    premium: premiumMatch ? premiumMatch[1].replace(/,/g, '') : 'N',
  };
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();
  const itemName = args.join(' ').trim();

  if (!PREFIXES.includes(command) || !itemName) return;

  try {
    // Fetch Rolimons Data
    const rolimonsResponse = await axios.get(ROLIMONS_API);
    const { items } = rolimonsResponse.data;

    // Search in Rolimons
    let foundItem = null;
    for (const [itemId, itemData] of Object.entries(items)) {
      if (
        itemData[0].toLowerCase() === itemName.toLowerCase() || 
        itemData[1]?.toLowerCase() === itemName.toLowerCase()
      ) {
        foundItem = { itemId, itemData };
        break;
      }
    }

    if (foundItem) {
      const [name, abbreviation, rap, value, defaultValue, demand, trend, projected, hyped, rare] = foundItem.itemData;
      const { available, premium } = await fetchCopies(foundItem.itemId);
      const thumbnailUrl = await fetchThumbnail(foundItem.itemId);
      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${foundItem.itemId}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${foundItem.itemId}/count`)
      // Create Embed
      const embed = new MessageEmbed()
        .setTitle(`${name} ${abbreviation ? `(${abbreviation})` : ''} ${rare === 1 ? '<:Rolimons_Rare:1314017441516355615>' : ''} ${projected === 1 ? '<:Rolimons_Projected:1314017571238051901>' : ''}`)
        .setURL(`https://www.rolimons.com/item/${foundItem.itemId}`)
        .setColor(2894900)
        .addFields(
          { name: 'Asset ID', value: foundItem.itemId, inline: true },
          { name: 'Rap', value: rap.toLocaleString(), inline: true },
          { name: 'Value', value: defaultValue === -1 ? 'N/A' : defaultValue.toLocaleString(), inline: true },
          { name: 'Demand', value: DEMAND_MAP[demand + 1], inline: true },
          { name: 'Trend', value: TREND_MAP[trend + 1], inline: true },
          { name: 'Premium/Available', value: `${premium}/${available}`, inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);

      message.channel.send({ embeds: [embed] });
      return;
    }

    // Search in Roblox Catalog
    const catalogResponse = await getUserData3(`https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(itemName)}&category=All&salesTypeFilter=1&includeNotForSale=true&limit=120`);
    const catalogItems = catalogResponse.data.data;

for (const item of catalogItems) {
  if (item.itemType === 'Bundle') {
    // Emit a `-bundle` event for the bundle
    return client.emit('messageCreate', { content: `-bundleid ${item.id}`, author: message.author, channel: message.channel });
  }

  if (item.itemType !== 'Asset') continue;

      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${item.id}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${item.id}/count`)

      // Handle Limited Items
      if (details.IsLimited || details.IsLimitedUnique) {
        const rolimonsItemId = Object.keys(items).find((id) => id === item.id.toString());
        if (rolimonsItemId) {
          const foundLimitedItem = { itemId: rolimonsItemId, itemData: items[rolimonsItemId] };
          return client.emit('messageCreate', { content: `-item ${foundLimitedItem.itemData[0]}`, author: message.author, channel: message.channel });
        }
      }

      const thumbnailUrl = await fetchThumbnail(details.AssetId);
  
  
let creatorUrl;
if (details.Creator.CreatorType === "Group") {
  creatorUrl = `[${details.Creator.Name}](https://www.roblox.com/communities/${details.Creator.CreatorTargetId}/Avis)`;
} else if (details.Creator.CreatorType === "User") {
  creatorUrl = `[${details.Creator.Name}](https://www.roblox.com/users/${details.Creator.Id}/profile)`;
}
      

      // Create Embed
      const embed = new MessageEmbed()
        .setTitle(details.Name)
        .setURL(`https://www.roblox.com/catalog/${details.AssetId}`)
        .setColor(2894900)
        .addFields(
          { name: 'Asset ID', value: details.AssetId.toString(), inline: true },
          { name: 'Creator', value: creatorUrl, inline: true },
          { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setImage(thumbnailUrl);
      if (details.Description) embed.addField('Description', details.Description);

      message.channel.send({ embeds: [embed] });
      return;
    }

    message.channel.send('Item Not Found');
  } catch (error) {
    console.error(error);
    message.channel.send('Item Not Found or server error');
  }
});





const restrictedFiles = [
  ".env",
  ".js",
  ".md",
  ".png",
  "package.json"
];

client.on("messageCreate", async (msg) => {
    const content33 = msg.content.toLowerCase();

    // Check if the message starts with the command -txtfetchdev and is from the allowed user
    if (content33.startsWith("-devtxtfetch") && msg.author.id === "193193380010917888") {
        try {
            // Extract the file path from the message content
            const filePath = content33.substring(12).trim();  // Starts after "-txtfetchdev " (12 characters)

            // Ensure the file path is not empty
            if (!filePath) {
                await msg.channel.send("Please provide a valid file path.");
                return;
            }

            const resolvedPath = path.resolve(filePath); // Resolve to absolute path

            // Get the file extension and file name
            const fileExtension = path.extname(resolvedPath).toLowerCase(); // Convert extension to lowercase for uniformity
            const fileName = path.basename(resolvedPath);

            // List of restricted file types (for example, you could add more file types here)
 // Modify this list based on your restrictions

            // Check if the file is restricted
            if (restrictedFiles.includes(fileExtension) || restrictedFiles.includes(fileName)) {
                await msg.channel.send("This file type is not allowed.");
                return;
            }

            // Check if the file exists
            if (!fs1.existsSync(resolvedPath)) {
                await msg.channel.send("The specified file does not exist.");
                return;
            }

            // Read the file to ensure it exists and is not empty
            const fileContents = fs1.readFileSync(resolvedPath, "utf-8");
            if (fileContents.length === 0) {
                await msg.channel.send("The file is empty.");
            } else {
                // Send the file
                await msg.channel.send({
                    files: [{
                        attachment: resolvedPath,
                        name: fileName
                    }]
                });
            }
        } catch (error) {
            console.error("Error reading file:", error);
            await msg.channel.send("There was an error reading the file.");
        }
    } else if (content33.startsWith("-txtfetchdev")) {
        await msg.channel.send("You do not have permission to use this command.");
    }
});



const MAX_USERS_PER_REQUEST = 50;
const PRESENCE_URL = 'https://presence.roblox.com/v1/presence/users';
const cooldowns943gjb34r = new Map();









const ROBLOSECURITY9 = `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${process.env.ROBLOSECURITY9}`;; 
const ACCOUNT_PASSWORD = process.env.ACCOUNT_PASSWORD;




const validCommands = [
    '-shorts', '-skirts', '-pants', '-jackets', '-sweaters', '-shirts', '-tshirts', '-t-shirts', '-shoes', '-heads', '-hairs', '-emotes', '-classicheads', '-bundles', '-packages', '-gears', '-faces', '-faceaccessorys', '-necks', '-shoulders', '-faceaccessories', '-fronts', '-waists', '-backs', '-animations', '-classictshirts', '-classic-shirts', '-classicpants', '-classic-pants', '-classict-shirts', '-classictshirts', '-classic-tshirts', '-classict-shirts', '-classic-t-shirts', '-decals', '-models', '-plugins', '-audios', '-videos', '-gamepasses', '-eyebrows', '-hats'
];







client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name;
    const options = interaction.data.options || [];
  


    if (command === 'goodtest3') {
        const username = options.find(option => option.name === 'username').value;
        const username2 = username;
        const formattedUsername2 = username.replace(/\\n|\/n/g, '%0A');
        const formattedUsername = formattedUsername2.replace("#", '%23');


      

      
      

        try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
            const userId = await getUserIdFromProfile(formattedUsername);
            const encodedUsername2 = encodeURIComponent(username2);

            if (!userId) {
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                                description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                                color: 2894900
                            }]
                        
                    }
                });
                return;
            }

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
if (error.response && error.response.status === 404) {
    // Fetch the thumbnail URL using the new endpoint
                    const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
                    let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
                  
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/Error.png";
}
  
    // Fetch the username and display name using the new API
const usernameResponse = await axios.post(
    `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
    {
        userIds: [userId],
        fields: ["names.username", "names.displayName"]
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

const userProfile = usernameResponse.data.profileDetails[0];

const username = userProfile?.names?.username;  // Use fallback if username is not available
const displayName = userProfile?.names?.displayName;  // Use fallback if displayName is not available


// Determine whether to display username only or display name with username
const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

    let accountCreatedDate;
    let currentUserId = userId; // Start with the initial userId

    // Attempt to find a valid user by incrementing the userId
    while (true) {
        try {
            const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
            accountCreatedDate = new Date(creationDateResponse.data.created);
            break;
        } catch (error) {
            currentUserId++; // Increment the userId if not found
        }
    }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    // Build the embed for the deleted account
    const deletedEmbed = {
        embeds: [
            {
                title: displayNameText, // Use the determined display name
                url: `https://rblx.trade/u/${encodeURIComponent(username)}`,
                color: 2894900,
                fields: [
                    { name: "ID", value: userId.toString(), inline: true },
                    { name: "Deleted", value: "True", inline: true },
                    { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                    { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
                    { name: "Last Online", value: `Unknown`, inline: true },
                    { name: "Current Status", value: "Offline", inline: true }
                ],
                thumbnail: { url: thumbnailUrl }
            }
        ],
        attachments: []
    };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: deletedEmbed
                    
                });
                return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    } else {
                        lastLocation = 'In Game';
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                } else {
                    lastLocation = 'Online';
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       

const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
              
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
} 
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
              
              
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response12 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response12.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
              
        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        } 
            
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;

                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            url: `https://rblx.trade/u/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: userId.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Current Status", value: lastLocation, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                            thumbnail: { url: thumbnailUrl }
                        }
                    ],
                    attachments: []
                };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                 
                        data: bannedEmbed
                    
                });
                return;
            }

const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
          
          

        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response15 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response15.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocation;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    lastLocation = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                } else {
                    lastLocation = 'In Game';
                }
            } else if (presence.userPresenceType === 0) {
                lastLocation = 'Offline';
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
            } else {
                lastLocation = 'Online';
            }



let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       
          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);



            const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
            const hasSign = signResponse.data;
            const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
            const hasHat = hatResponse.data;

let premiumStatus = "False";

const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        // Try fetching premium status from the primary API
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);

        if (error.response && error.response.status === 500) {
            // Retry if a 500 error occurred
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            // Try fetching premium status from roproxy.com if the primary API fails
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);

            if (roproxyError.response && roproxyError.response.status === 500) {
                // Retry if a 500 error occurred
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }

            // Fallback to rolimonsData.premium if available
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


            let badgeStatus = 'False';
            if (hasSign && hasHat) {
                badgeStatus = "Hat/Sign";
            } else if (hasSign) {
                badgeStatus = "Sign";
            } else if (hasHat) {
                badgeStatus = "Hat";
            }



const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
          
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
          
if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
          
          
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
const description = bigDescription ? `### ${userBody}` : "";
          

            const accountCreatedDate = new Date(user.created);
            const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
            if (rolimonsData.rap === null) {
                rolimonsData.rap = 'Private';
                rolimonsData.value = '—';
            }
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
          
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
                    
            const embed = {
                embeds: [
                    {
                        title: title,
                        description: description,
                        url: `https://roblox.com/users/${userId}/profile`,
                        color: 2894900,
                        fields: [
                            { name: "ID", value: userId.toString(), inline: true },
                            { name: "Verified", value: badgeStatus, inline: true },
                            { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                            { name: "Rap", value: `${rapValue}`, inline: true },
                            { name: "Value", value: `${valueValue}`, inline: true },
                            { name: "Premium", value: premiumStatus, inline: true },
                            { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                            { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                            { name: "Current Status", value: lastLocation, inline: true },
                            ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                        ],
                        thumbnail: { url: thumbnailUrl }
                    }
                ],
                attachments: []
            };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                   
                    data: embed
                
            });
        } catch (error) {
            console.error(error);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
        }
    }

});


client.once('ready', async () => {

await client.api.applications(client.user.id).commands.post({
  data: {
    name: "scrape2",
    description: "Scrape Roblox users based on specified filters and criteria",
    integration_types: [0, 1], // Specifies integration types (0 for all, 1 for bots)
    contexts: [0, 1, 2], // Available command contexts (0 = Slash Command, 1 = User Command, 2 = Message Command)
    options: [
      {
        name: "start_id",
        description: "The user ID to start from",
        type: 4, // INTEGER type
        required: true
      },
      {
        name: "amount",
        description: "The amount of users to scrape",
        type: 4, // INTEGER type
        required: true
      },
      {
        name: "keywords",
        description: "Keywords in the usernames to include",
        type: 3, // STRING type
        required: false
      },
      {
        name: "blacklist",
        description: "Keywords in the usernames to exclude",
        type: 3, // STRING type
        required: false
      },
      {
        name: "length",
        description: "Length of usernames to check",
        type: 4, // INTEGER type
        required: false
      },
      {
        name: "prefix",
        description: "Phrase at the beginning of the username",
        type: 3, // STRING type
        required: false
      },
      {
        name: "suffix",
        description: "Phrase at the end of the username",
        type: 3, // STRING type
        required: false
      },
      {
        name: "users_only",
        description: "Include usernames only without user IDs",
        type: 5, // BOOLEAN type
        required: false
      },
      {
        name: "is_verified",
        description: "Include only verified checkmark users",
        type: 5, // BOOLEAN type
        required: false
      },
      {
        name: "display_name",
        description: "Include Display Names",
        type: 5, // BOOLEAN type
        required: false
      },
      {
        name: "include_non_existent",
        description: "Include non-existent users as 'None'",
        type: 5, // BOOLEAN type
        required: false
      }
    ]
  }
});
  
      await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest6",
            description: "Fetch info about the server the command was executed in", 
            //integration_types: [0,1],
            //contexts: [0,1,2],
        }
    });
  
      await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest7",
            description: "thecokmmadn", 
            integration_types: [0,1],
            contexts: [0,1,2],
        }
    });
  
  await client.api.applications(client.user.id).commands.post({
  data: {
    name: "goodtest",
    description: "Discord-related commands",
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "forty",
        description: "F",
        type: 1, // Subcommand
        options: [
          {
            name: "forty",
            description: "the forty",
            type: 3, // STRING type
            required: true
          }
        ]
      },
            {
        name: "fifty",
        description: "F",
        type: 1, // Subcommand
        options: [
          {
            name: "fifty",
            description: "the fifty",
            type: 3, // STRING type
            required: true
          }
        ]
      }
      ]
  }
});
  
        await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtestm9",
            description: "thecokmmadn", 
            integration_types: [0,1],
            contexts: [0,1,2],
        }
    });
  
await client.api.applications(client.user.id).commands.post({
  data: {
    name: "good",
    description: "yp",
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "test",
        description: "Ttes",
        type: 1 // 1 means subcommand
      }
    ]
  }
});
  await client.api.applications(client.user.id).commands.post({
  data: {
    name: "good23",
    description: "yp",
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "test",
        description: "Ttes",
        type: 3 // 1 means subcommand
      }
    ]
  }
});
  
  
  await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest888",
            description: "bbbbb",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "option",
                    description: "jajajajaja",
                    type: 3, // STRING type
                    required: true,
                    choices: [
                        { name: "5character", value: "5character" },
                        { name: "5_letter", value: "5_letter" },
                        { name: "5_character", value: "5_character" },
                        { name: "5letter_", value: "5letter_" },
                        { name: "5character_", value: "5character_" },
                        { name: "6letter", value: "6letter" },
                        { name: "word", value: "word" },
                        { name: "leetspeak5character", value: "leetspeak5character" },
                        { name: "barcode", value: "barcode" }
                    ]
                },
                {
                    name: "show",
                    description: "Show the result to everyone (true/false)",
                    type: 5, // BOOLEAN type
                    required: false
                }
            ]
        }
    });
  
  
  await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest666x",
            description: "bbbbb",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "xcv",
                    description: "jajajajaja",
                    type: 3, // STRING type
                    required: true,
                },
                {
                    name: "xcv1",
                    description: "Shbvc",
                    type: 4, // BOOLEAN type
                    required: false
                }
            ]
        }
    });
  
  await client.api.applications(client.user.id).commands.post({
    data: {
        name: "goodtest000",
    //    description: "Fetch how many items a user has",
        description: "Fts",
        integration_types: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: "g00d",
      //          description: "The username of the user you are fetching",
                      description: "Fts",
                type: 3, // STRING type
                required: true
            },
            {
                name: "g00d2",
         //       description: "The Roblox item type",
                      description: "Fts",
                type: 3, // STRING type
                required: false,
                choices: [
                    { name: "Total", value: "Total" },
                    { name: "Hat", value: "Hat (8)" },
                    { name: "FaceAccessory", value: "FaceAccessory (42)" },
                    { name: "Neck", value: "NeckAccessory (43)" },
                    { name: "Shoulder", value: "ShoulderAccessory (44)" },
                    { name: "Front", value: "FrontAccessory (45)" },
                    { name: "Back", value: "BackAccessory (46)" },
                    { name: "Waist", value: "WaistAccessory (47)" },
                    { name: "Gear", value: "Gear (19)" },
                    { name: "Hair", value: "HairAccessory (41)" },
                    { name: "Face", value: "Face (18)" },
                    { name: "ClassicHead", value: "Head (17)" },
                    { name: "Bundle", value: "Package (32)" },
                  //  { name: "AvatarAnimation", value: "None" },
                    { name: "DynamicHead", value: "DynamicHead (79)" },
                  //  { name: "Emote", value: "EmoteAnimation (61)" },
                    { name: "ClassicT-Shirt", value: "TShirt (2)" },
                    { name: "ClassicShirt", value: "Shirt (11)" },
                    { name: "ClassicPants", value: "Pants (12)" },
                    { name: "Shoes", value: "LeftShoeAccessory (70)/RightShoeAccessory (71)" },
                    { name: "T-Shirt", value: "TShirtAccessory (64)" },
                    { name: "Shirt", value: "ShirtAccessory (65)" },
                    { name: "Sweater", value: "SweaterAccessory (68)" },
                    { name: "Jacket", value: "JacketAccessory (67)" },
                    { name: "Pants", value: "PantsAccessory (66)" },
                    { name: "Shorts", value: "ShortsAccessory (69)" },
                    { name: "Skirt", value: "DressSkirtAccessory (72)" },
                //    { name: "Eyebrow", value: "EyebrowAccessory (76)" },
               //     { name: "Eyelash", value: "EyelashAccessory (77)" },
                 //   { name: "MoodAnimation", value: "MoodAnimation (77)" },
                 //   { name: "Decal", value: "Decal (13)" },
                  //  { name: "Model", value: "Model (10)" },
                   // { name: "Mesh", value: "Mesh (4)" },
                  //  { name: "GamePass", value: "GamePass (34)" },
                    //{ name: "Audio", value: "Audio (3)" },
                   // { name: "Plugin", value: "Plugin (38)" },
                   // { name: "Video", value: "Video (62)" },
                    //{ name: "Animation", value: "Animation (24)" },
                   // { name: "MeshPart", value: "MeshPart (40)" }
                ]
            }
        ]
    }
});
  
      await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest99999",
            description: "goodtest99999e", 
            integration_types: [0,1],
            contexts: [0,1,2],
        }
    });
  
        await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest12345",
            description: "goodboy",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "option",
                    description: "cooler",
                    type: 3, // STRING type
                    required: true,
                    choices: [
                        { name: "5character", value: "5character" },
                        { name: "5_letter", value: "5_letter" },
                        { name: "5_character", value: "5_character" },
                        { name: "5letter_", value: "5letter_" },
                        { name: "5character_", value: "5character_" },
                        { name: "6letter", value: "6letter" },
                        { name: "word", value: "word" },
                        { name: "leetspeak5character", value: "leetspeak5character" }
                    ]
                },
                {
                    name: "show",
                    description: "Show the result to everyone (true/false)",
                    type: 5, // BOOLEAN type
                    required: false
                }
            ]
        }
    });
  
    // Register /id command
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest3",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "5mkfg",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest0_01",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "username",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest2351",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtestpe3",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest5151",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "51",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest0523",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "51",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest952",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest019",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest62354",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "cbvxbvc",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest001",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest002",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest003",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtestkke",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest01232",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtesty123",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "123",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtestbig",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "evrfbvb",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest9123",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "tester123",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest666",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "66",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest12",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "testte",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtestv2",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "testte",
                    description: "test",
                    type: 6, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest284",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "testte",
                    description: "test",
                    type: 3, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
    await client.api.applications(client.user.id).commands.post({
        data: {
            name: "goodtest9182",
            description: "test",
            integration_types: [0,1],
            contexts: [0,1,2],
            options: [
                {
                    name: "testte",
                    description: "test",
                    type: 4, // INTEGER type
                    required: true
                }
            ]
        }
    });
  
});



const client_id = '5532eceac80445cf96644befb58947cd';
const client_secret = '8cad6a82333e43eea4850e6db0c33efb';  // Replace with your client secret
const redirect_uri = 'https://supers.lol/Avis';

// Initialize Discord client


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-playlistcreate')) {
    const args = message.content.slice(15).trim().split(' '); // Extract artist name from the command
    if (args.length < 1) return message.reply('Please provide the artist name.');

    const artistName = args.join(' '); // Join all parts of the artist name if it has multiple words
    let access_token;

    try {
      // Step 1: Check if the authorization token exists in auth.txt
      if (fs1.existsSync('auth.txt')) {
        const tokenData = fs1.readFileSync('auth.txt', 'utf8');
        access_token = tokenData.split(':')[1]?.trim(); // Extract token from auth.txt
      }

      // If no token found or the token is invalid, prompt for a new one
      if (!access_token) {
        return message.reply('No authorization token found. Please authorize the bot by visiting the authorization URL and providing a new token.');
      }

      // Step 2: Validate the token
      const validateTokenResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (validateTokenResponse.status !== 200) {
        throw new Error('Invalid token');
      }

      // Step 3: Search for the artist by name
      const searchArtistResponse = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: artistName,
          type: 'artist',
          limit: 1,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const artist = searchArtistResponse.data.artists.items[0];
      if (!artist) {
        return message.reply(`No artist found with the name "${artistName}".`);
      }

      const artistId = artist.id;

      // Step 4: Retrieve all albums and singles by the artist
      let allTracks = [];
      let allAlbums = [];
      let offset = 0;
      let hasNext = true;

      while (hasNext) {
        const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          params: {
            include_groups: 'album,single',
            limit: 50,
            offset: offset,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const albums = albumsResponse.data.items;
        albums.forEach((album) => {
          if (album.uri) {
            allAlbums.push(`spotify:album:${album.id}`); // Format the album URI
          }
        });

        hasNext = albumsResponse.data.next !== null;
        offset += 50;
      }

      // Step 5: Get all tracks from albums
      for (let albumUri of allAlbums) {
        const albumId = albumUri.split(':')[2]; // Extract album ID
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        tracksResponse.data.items.forEach((track) => {
          allTracks.push(`spotify:track:${track.id}`); // Format the track URI
        });
      }

      // Step 6: Create a new playlist
      const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userId = userProfileResponse.data.id;

      const createPlaylistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        name: `${artistName} Playlist`,
        description: `All albums and singles by ${artistName}`,
        public: false, // Set to true for a public playlist
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const playlistId = createPlaylistResponse.data.id;

      // Step 7: Add tracks and albums in batches of 5
      async function addTracksToPlaylist(tracks) {
        // Add tracks in batches of 5
        for (let i = 0; i < tracks.length; i += 5) {
          const batch = tracks.slice(i, i + 5); // Take a slice of 5 items
          await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: batch,
          }, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
        }
      }

      // Add both tracks and albums in batches of 5
      const allItems = [...allTracks, ...allAlbums];
      if (allItems.length > 0) {
        await addTracksToPlaylist(allItems);
        message.reply(`Playlist created successfully for ${artistName}! You can listen to it here: https://open.spotify.com/playlist/${playlistId}`);
      } else {
        message.reply(`No tracks or albums found for ${artistName}.`);
      }
    } catch (error) {
      console.error(error.response.data);

      // Handle invalid token (e.g., expired token)
      if (error.message === 'Invalid token' || (error.response && error.response.status === 401)) {
        message.reply('The authorization token is invalid or expired. Please authorize the bot again.');
        fs1.unlinkSync('auth.txt'); // Delete the invalid token from auth.txt
      } else {
        message.reply('An error occurred while creating the playlist.');
      }
    }
  }
});


let commands3 = [];
try {
    const data = fs1.readFileSync('cryptoc.txt', 'utf8');
    commands3 = data.split('\n').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
   // console.log(commands3)
} catch (err) {
    console.error('Error reading cryptoc.txt:', err);
}

//client.on('messageCreate', (message) => {
   // if (message.author.bot) return; // Ignore bot messages

  //  const trimmedMessage = message.content.trim(); // Remove leading/trailing spaces
  //  console.log(`Received message: "${trimmedMessage}"`); // Log the message for debugging

    // Check for exact match or match followed by a space
  //  const matchedCommand = commands3.find(command => 
  //      trimmedMessage.toLowerCase() === command.toLowerCase() || 
  //      trimmedMessage.toLowerCase().startsWith(`${command.toLowerCase()} `)
 //   );

  //  if (matchedCommand) {
      //  console.log(`Matched command: ${matchedCommand}`); // Log matched command for debugging
        
        // Emit the custom event `-crypto3` with the matched command as the argument
   //     return client.emit('messageCreate', { content: `-crypto3 ${matchedCommand.slice(1)}`, author: message.author, channel: message.channel });
 //   } else {
     //   console.log("No command matched.");
  //  }
//});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
  if (interaction.data.name === 'bitcoin') {
    const coinSymbol = 'BTC';  // Always use 'BTC' for Bitcoin

    try {
      // Fetch the cryptocurrency list (optional, since we're using BTC directly)
      const coinListResponse = await axios.get('https://supers.lol/crypto.txt');
      const coinList = coinListResponse.data;

      // Find Bitcoin in the list (optional)
      let matchingCoin = Object.values(coinList).find(
        (coin) => coin.Symbol === coinSymbol
      );

      // If no match, use default 'Bitcoin'
      const coinName = matchingCoin ? matchingCoin.CoinName : 'Bitcoin';

      // Request Bitcoin data from CryptoCompare API
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=${coinSymbol}`
      );
      const data = response.data.RAW?.[coinSymbol]?.USD;
      if (!data) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            content: 'Failed to fetch Bitcoin data.',
          },
        });
      }

      const price = formatPrice(data.PRICE);
      const priceChange1h = formatChange(data.CHANGEHOUR);
      const priceChangePercent1h = formatPercent(data.CHANGEPCTHOUR);
      const priceChange24h = formatChange(data.CHANGE24HOUR);
      const priceChangePercent24h = formatPercent(data.CHANGEPCT24HOUR);
      const thumbnailUrl = `https://www.cryptocompare.com${data.IMAGEURL}`;
      const title = `${coinName}`;

      // Default color for the embed
      let dominantColor = '#050000';

      const embed = {
        data: {
          type: 4, // Channel Message with Source
          data: {
            embeds: [
              {
                title: title,
                url: `https://www.cryptocompare.com/coins/${coinSymbol}/overview`,
                color: parseInt(dominantColor.replace('#', ''), 16),
                fields: [
                  {
                    name: 'Price',
                    value: `$${price} USD`,
                  },
                  {
                    name: '24H Change',
                    value: `${priceChange24h} (${priceChangePercent24h})`,
                  },
                  {
                    name: 'This Hour',
                    value: `${priceChange1h} (${priceChangePercent1h})`,
                  },
                ],
                footer: {
                  text: coinSymbol,
                },
                timestamp: new Date().toISOString(),
                thumbnail: {
                  url: thumbnailUrl,
                },
              },
            ],
          },
        },
      };

      return client.api.interactions(interaction.id, interaction.token).callback.post(embed);
    } catch (error) {
      console.error(error);
      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4, // Channel Message with Source
          data: {
            content: 'Invalid cryptocurrency name or symbol.',
          },
        },
      });
    }
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name === 'goodtest7') {
        const userId = interaction.member.user.id;

        // Read descriptions from help.txt
        let descriptions = [];
        try {
            const data = fs1.readFileSync('help.txt', 'utf-8');
            descriptions = data.split('\n').map((line) => line.replace(/\\n/g, '\n').trim());
        } catch (error) {
            console.error('Error reading help.txt:', error);
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: { content: 'Error loading descriptions. Please try again later.' },
                },
            });
        }

        // Create the main embed and components
        const mainEmbed = {
            title: 'Avis Bot',
            description: '**Hi its Avis Bot**\nAvis is a Social Media/Roblox lookup bot.\n\nAvis Prefix is "-"\n\nTo suggest new commands join the **[Discord Server](https://discord.gg/mrg2qkHeHR)**.\n[Invite the Bot to your Server](https://discord.com/oauth2/authorize?client_id=1068375792398119012&permissions=1&scope=bot).\n[Use Avis Slash Commands anywhere](https://discord.com/api/oauth2/authorize?client_id=1068375792398119012&scope=applications.commands&integration_type=1).',
            thumbnail: { url: 'https://supers.lol/8avatar.png' },
        };

        const categoriesMenu = {
            type: 1,
            components: [
                {
                    type: 3,
                    custom_id: 'category-select',
                    placeholder: 'Select a Category',
                    options: [
                        { label: 'Main Page', value: 'main' },
                        { label: 'Roblox', value: 'roblox' },
                        { label: 'Social Media', value: 'social' },
                        { label: 'Misc', value: 'misc' },
                    ],
                },
            ],
        };

        const robloxButtons = {
            type: 1,
            components: [
                {
                    type: 2,
                    custom_id: 'roblox-prev',
                    label: '⬅️',
                    style: 2,
                    disabled: true,
                },
                {
                    type: 2,
                    custom_id: 'roblox-next',
                    label: '➡️',
                    style: 2,
                },
            ],
        };

        const robloxEmbedPages = [
            {
                title: 'Avis - Roblox Commands',
                description: descriptions[0] || 'No description available.',
                footer: { text: 'Avis | Page 1/3' },
            },
            {
                title: 'Avis - Roblox Commands',
                description: descriptions[1] || 'No description available.',
                footer: { text: 'Avis | Page 2/3' },
            },
            {
                title: 'Avis - Roblox Commands',
                description: descriptions[2] || 'No description available.',
                footer: { text: 'Avis | Page 3/3' },
            },
        ];

        // Send the initial message
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [mainEmbed],
                    components: [categoriesMenu],
                },
            },
        });

        // Create collector for interaction updates
        const collector = new InteractionCollector(client, {
            filter: (i) => i.user.id === userId,
            time: 120000,
        });

        let robloxPage = 0;

        // Timeout function to disable the buttons after the given time


        collector.on('collect', async (i) => {
            if (i.isSelectMenu()) {
                if (i.values[0] === 'main') {
                    await i.update({ embeds: [mainEmbed], components: [categoriesMenu] });
                } else if (i.values[0] === 'roblox') {
                    robloxPage = 0; // Reset to page 1
                    const robloxButtonsUpdated = {
                        type: 1,
                        components: [
                            { ...robloxButtons.components[0], disabled: true },
                            { ...robloxButtons.components[1], disabled: false },
                        ],
                    };
                    await i.update({ embeds: [robloxEmbedPages[robloxPage]], components: [categoriesMenu, robloxButtonsUpdated] });
                } else if (i.values[0] === 'social') {
                    const socialEmbed = {
                        title: 'Avis - Social Media Commands',
                        description: descriptions[3] || 'No description available.',
                    };
                    await i.update({ embeds: [socialEmbed], components: [categoriesMenu] });
                } else if (i.values[0] === 'misc') {
                    const miscEmbed = {
                        title: 'Avis - Misc Commands',
                        description: descriptions[4] || 'No description available.',
                    };
                    await i.update({ embeds: [miscEmbed], components: [categoriesMenu] });
                }
            } else if (i.isButton()) {
                if (i.customId === 'roblox-next') robloxPage++;
                if (i.customId === 'roblox-prev') robloxPage--;

                const disablePrev = robloxPage === 0;
                const disableNext = robloxPage === robloxEmbedPages.length - 1;

                const robloxButtonsUpdated = {
                    type: 1,
                    components: [
                        { ...robloxButtons.components[0], disabled: disablePrev },
                        { ...robloxButtons.components[1], disabled: disableNext },
                    ],
                };

                await i.update({ embeds: [robloxEmbedPages[robloxPage]], components: [categoriesMenu, robloxButtonsUpdated] });
            }
        });
    }
});




client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore bot messages

    const content33 = message.content.toLowerCase();
    if (content33.startsWith('-1commands52') || content33.startsWith('-1help') || content33.startsWith('-1cmds')) {
        // Read descriptions from help.txt
        let descriptions = [];
try {
    const data = fs1.readFileSync('help.txt', 'utf-8');
    // Replace literal \n with actual newlines
    descriptions = data.split('\n').map((line) => line.replace(/\\n/g, '\n').trim());
} catch (error) {
    console.error('Error reading help.txt:', error);
    return message.channel.send('error');
}

        const mainEmbed = new MessageEmbed()
            .setTitle('Avis Bot')
            .setDescription('**Hi its Avis Bot**\nAvis is a Social Media/Roblox lookup bot.\n\nAvis Prefix is "-"\n\nTo suggest new commands join the **[Discord Server](https://discord.gg/mrg2qkHeHR)**.\n[Invite the Bot to your Server](https://discord.com/oauth2/authorize?client_id=1068375792398119012&permissions=1&scope=bot).\n[Use Avis Slash Commands anywhere](https://discord.com/api/oauth2/authorize?client_id=1068375792398119012&scope=applications.commands&integration_type=1).')
            .setThumbnail('https://supers.lol/8avatar.png');

        const categoriesMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('category-select')
                .setPlaceholder('Select a Category')
                .setOptions([
                    { label: 'Main Page', value: 'main' },
                    { label: 'Roblox', value: 'roblox' },
                    { label: 'Social Media', value: 'social' },
                    { label: 'Misc', value: 'misc' },
                ])
        );

        const robloxButtons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('roblox-prev')
                .setLabel('⬅️')
                .setStyle('SECONDARY')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('roblox-next')
                .setLabel('➡️')
                .setStyle('SECONDARY')
        );

        const robloxEmbedPages = [
            new MessageEmbed()
                .setTitle('Avis - Roblox Commands')
                .setDescription(descriptions[0] || 'No description available.') 
                .setFooter('Avis | Page 1/3'),
            new MessageEmbed()
                .setTitle('Avis - Roblox Commands')
                .setDescription(descriptions[1] || 'No description available.') 
                .setFooter('Avis | Page 2/3'),
            new MessageEmbed()
                .setTitle('Avis - Roblox Commands')
                .setDescription(descriptions[2] || 'No description available.') 
                .setFooter('Avis | Page 3/3'),
        ];

        const initialMessage = await message.channel.send({ embeds: [mainEmbed], components: [categoriesMenu] });

        const filter = (i) => i.user.id === message.author.id;
        const collector = initialMessage.createMessageComponentCollector({ filter, time: 60000 });

        let robloxPage = 0;

        collector.on('collect', async (interaction) => {
            if (interaction.isSelectMenu()) {
                if (interaction.values[0] === 'main') {
                    await interaction.update({ embeds: [mainEmbed], components: [categoriesMenu] });
                } else if (interaction.values[0] === 'roblox') {
                    robloxPage = 0; // Reset to page 1
                    const robloxButtonsUpdated = new MessageActionRow().addComponents(
                        robloxButtons.components[0].setDisabled(true),
                        robloxButtons.components[1].setDisabled(false)
                    );
                    await interaction.update({ embeds: [robloxEmbedPages[robloxPage]], components: [categoriesMenu, robloxButtonsUpdated] });
                } else if (interaction.values[0] === 'social') {
                    const socialEmbed = new MessageEmbed()
                        .setTitle('Avis - Social Media Commands')
                        .setDescription(descriptions[3] || 'No description available.'); 
                    await interaction.update({ embeds: [socialEmbed], components: [categoriesMenu] });
                } else if (interaction.values[0] === 'misc') {
                    const miscEmbed = new MessageEmbed()
                        .setTitle('Avis - Misc Commands')
                        .setDescription(descriptions[4] || 'No description available.'); 
                    await interaction.update({ embeds: [miscEmbed], components: [categoriesMenu] });
                }
            } else if (interaction.isButton()) {
                if (interaction.customId === 'roblox-next') {
                    robloxPage++;
                } else if (interaction.customId === 'roblox-prev') {
                    robloxPage--;
                }

                const disablePrev = robloxPage === 0;
                const disableNext = robloxPage === robloxEmbedPages.length - 1;

                const robloxButtonsUpdated = new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('roblox-prev').setLabel('⬅️').setStyle('SECONDARY').setDisabled(disablePrev),
                    new MessageButton().setCustomId('roblox-next').setLabel('➡️').setStyle('SECONDARY').setDisabled(disableNext)
                );

                await interaction.update({ embeds: [robloxEmbedPages[robloxPage]], components: [categoriesMenu, robloxButtonsUpdated] });
            }
        });

        collector.on('end', async () => {
            const disabledMenu = new MessageActionRow().addComponents(
                categoriesMenu.components[0].setDisabled(true)
            );
            const disabledButtons = new MessageActionRow().addComponents(
                robloxButtons.components.map((button) => button.setDisabled(true))
            );
            await initialMessage.edit({ components: [disabledMenu, disabledButtons] });
        });
    }
});


const PREFIXES3 = ["-item123", "-i123", "-asset123", "-hat123", "-limited123", "-lim123"];
const PREFIXES4 = ["-ugc"];
//const ROLIMONS_API = 'https://www.rolimons.com/itemapi/itemdetails';
//const DEMAND_MAP = ['None', 'Terrible', 'Low', 'Normal', 'High', 'Amazing'];
//const TREND_MAP = ['None', 'Lowering', 'Unstable', 'Stable', 'Raising', 'Fluctuating'];

//async function fetchThumbnail(itemId) {
 // const response = await getUserData(`https://thumbnails.roblox.com/v1/assets?assetIds=${itemId}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`);
//  return response.data.data[0]?.imageUrl || null;
//}

// Fetch Available and Premium Copies


client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();
  const itemName = args.join(' ').trim();

  if (!PREFIXES3.includes(command) || !itemName) return;

  try {
    if (itemName.toLowerCase() === "epic face") {
      const epicFaceId = 42070576;

      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${epicFaceId}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${epicFaceId}/count`);
      const thumbnailUrl = await fetchThumbnail(epicFaceId);

      const embed = new MessageEmbed()
        .setTitle(details.Name)
        .setURL(`https://www.roblox.com/catalog/${epicFaceId}`)
        .setColor(2894900)
        .addFields(
          { name: 'Asset ID', value: epicFaceId.toString(), inline: true },
          { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
          { name: 'Item Type', value: ASSET_MAPPINGS[details.AssetTypeId] || 'Unknown', inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);
      if (details.Description) embed.addField('Description', details.Description);

      message.channel.send({ embeds: [embed] });
      return;
    }
    // Fetch Rolimons Data
    const rolimonsResponse = await axios.get(ROLIMONS_API);
    const { items } = rolimonsResponse.data;

    // Search in Rolimons
    let foundItem = null;
    for (const [itemId, itemData] of Object.entries(items)) {
      if (
        itemData[0].toLowerCase() === itemName.toLowerCase() || 
        itemData[1]?.toLowerCase() === itemName.toLowerCase()
      ) {
        foundItem = { itemId, itemData };
        break;
      }
    }

    if (foundItem) {
      const [name, abbreviation, rap, value, defaultValue, demand, trend, projected, hyped, rare] = foundItem.itemData;
      const { available, premium } = await fetchCopies(foundItem.itemId);
      const thumbnailUrl = await fetchThumbnail(foundItem.itemId);
      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${foundItem.itemId}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${foundItem.itemId}/count`)
      let csrfToken = ""
      try {
            await axios.post('https://catalog.roblox.com/v1/catalog/items/details', {}, {
                headers: {
                    Cookie: `.ROBLOSECURITY=${ROBLOSECURITY3}`
                }
            });
        } catch (error) {
              csrfToken = error.response.headers['x-csrf-token'];
            //} else {
            //    throw new Error('Failed to retrieve CSRF token');
           // }
        }

        if (!csrfToken) {
            throw new Error('CSRF token not found');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                Cookie: `.ROBLOSECURITY=${ROBLOSECURITY3}`
            }
        };

        const response = await axios.post(
            'https://catalog.roblox.com/v1/catalog/items/details',
            {
                items: [
                    {
                        id: foundItem.itemId,
                        itemType: "Asset"
                    }
                ]
            },
            config
        );

        const data = response.data;

            const item = data?.data?.[0];

            // Set lowestPrice to lowestResalePrice or "N/A" if null
            const lois = item.lowestResalePrice !== null ? item.lowestResalePrice : "N/A";

            console.log(lois);


      // Create Embed
      const embed = new MessageEmbed()
        .setTitle(`${name} ${abbreviation ? `(${abbreviation})` : ''} ${rare === 1 ? '<:Rolimons_Rare:1314017441516355615>' : ''} ${projected === 1 ? '<:Rolimons_Projected:1314017571238051901>' : ''}`)
        .setURL(`https://www.rolimons.com/item/${foundItem.itemId}`)
        .setColor(2894900)
        .setFooter(`Asset ID: ${foundItem.itemId}`)
        .addFields(
          { name: 'Lowest Price', value: lois.toLocaleString(), inline: true },
          { name: 'Rap', value: rap.toLocaleString(), inline: true },
          { name: 'Value', value: defaultValue === -1 ? 'N/A' : defaultValue.toLocaleString(), inline: true },
          { name: 'Demand', value: DEMAND_MAP[demand + 1], inline: true },
          { name: 'Trend', value: TREND_MAP[trend + 1], inline: true },
          { name: 'Premium/Available', value: `${premium}/${available}`, inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);

      message.channel.send({ embeds: [embed] });
      return;
    }

    // Search in Roblox Catalog
    const catalogResponse = await getUserData3(`https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(itemName)}&category=All&creatorName=roblox&salesTypeFilter=1&includeNotForSale=true&limit=120`);
    const catalogItems = catalogResponse.data.data;

    for (const item of catalogItems) {
      if (item.itemType === 'Bundle') {
        // Emit a `-bundle` event for the bundle
        return client.emit('messageCreate', { content: `-bundleid ${item.id}`, author: message.author, channel: message.channel });
      }

      if (item.itemType !== 'Asset') continue;

      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${item.id}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${item.id}/count`)

      // Handle Limited Items
      if (details.IsLimited || details.IsLimitedUnique) {
        const rolimonsItemId = Object.keys(items).find((id) => id === item.id.toString());
        if (rolimonsItemId) {
          const foundLimitedItem = { itemId: rolimonsItemId, itemData: items[rolimonsItemId] };
          return client.emit('messageCreate', { content: `-item ${foundLimitedItem.itemData[0]}`, author: message.author, channel: message.channel });
        }
      }

      const thumbnailUrl = await fetchThumbnail(details.AssetId);

      // Create Embed
      const embed = new MessageEmbed()
        .setTitle(details.Name)
        .setURL(`https://www.roblox.com/catalog/${details.AssetId}`)
        .setColor(2894900)
        .addFields(
          { name: 'Asset ID', value: details.AssetId.toString(), inline: true },
          { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
          { name: 'Item Type', value: ASSET_MAPPINGS[details.AssetTypeId] || 'Unknown', inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);
      if (details.Description) embed.addField('Description', details.Description);

      message.channel.send({ embeds: [embed] });
      return;
    }

    // If not found and item name is numeric
    if (/^\d+$/.test(itemName)) {
      return client.emit('messageCreate', { content: `-assetid ${itemName}`, author: message.author, channel: message.channel });
    }

    message.channel.send('Item Not Found');
  } catch (error) {
    console.error(error);
        if (/^\d+$/.test(itemName)) {
      return client.emit('messageCreate', { content: `-assetid ${itemName}`, author: message.author, channel: message.channel });
    }
    message.channel.send('Item Not Found or server error');
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.type !== 2 || interaction.data.name !== 'goodtest12') return;

    const targetUsername = interaction.data.options?.[0]?.value;

    if (!targetUsername) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'Please provide a display name to validate.',
                    flags: 64,
                },
            },
        });
    }

    try {
        // Validate the display name with the primary API
        const validationResponse = await getUserData5(
            `https://users.roblox.com/v1/users/633987780/display-names/validate?displayName=${encodeURIComponent(targetUsername)}`,
            {
                headers: {
                    'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                }
            }
        );

        // Check if the validationResponse has no data (indicating a valid display name)
        if (Object.keys(validationResponse.data).length === 0) {
            const embed = {
                description: `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display Name is valid`,
                color: 2894900,
            };
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        embeds: [embed],
                    },
                },
            });
        }
    } catch (validationError) {
        // Handle rate limit error (status 429)
        if (validationError.response && validationError.response.status === 429) {
            const fallbackUrl = `https://users.roblox.com/v1/display-names/validate?displayName=${encodeURIComponent(targetUsername)}&birthdate=09-26-2000`;
            try {
                const fallbackResponse = await getUserData5(fallbackUrl, {
                    headers: {
                        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                    }
                });

                if (Object.keys(fallbackResponse.data).length === 0) {
                    const embed = {
                        description: `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display Name is valid`,
                        color: 2894900,
                    };
                    return client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [embed],
                            },
                        },
                    });
                }
            } catch (fallbackError) {
                return client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: 'error',
                           // flags: 64,
                        },
                    },
                });
            }
        }

        // General error handling
        if (validationError.response && validationError.response.data && validationError.response.data.errors) {
            const errorCode = validationError.response.data.errors[0].code;
            let description = '';

            switch (errorCode) {
                case 1:
                case 2:
                    description = `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display names must be 3 to 20 characters long.`;
                    break;
                case 3:
                    description = `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display name contains invalid characters.`;
                    break;
                case 4:
                    description = `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display name has been moderated.`;
                    break;
                case 8:
                    description = `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${encodeURIComponent(targetUsername)}): Display name has too many combinations of character sets.`;
                    break;
                default:
                    description = `[\`${targetUsername}\`](https://www.roblox.com/search/users?keyword=${targetUsername}): Unknown error.`;
            }

            const embed = {
                description,
                color: 2894900,
            };

            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        embeds: [embed],
                    },
                },
            });
        } else {
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'error',
                      //  flags: 64,
                    },
                },
            });
        }
    }
});


const getUserData5 = async (url) => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            return await axios.get(url, {
                headers: {
                    'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                }
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) {
                    const roproxyResponse = await axios.get(url.replace('roblox.com', 'roproxy.com'), {
                        headers: {
                            'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                        }
                    });

                    if (roproxyResponse.status === 429) {
                        return await axios.get(`${process.env.PROXY}?apikey=${process.env.PROXYKEY}&url=${encodeURIComponent(url)}`, {
                            headers: {
                                'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                            }
                        });
                    }
                    return roproxyResponse;
                } else if ([500, 502, 503, 504].includes(error.response.status)) {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                } else {
                    throw error;
                }
            } else if (error.code === 'ECONNRESET' || error.message.includes('socket hang up')) {
                attempts++;
                if (attempts >= maxAttempts) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } else {
                throw error;
            }
        }
    }
};



client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name;
    const args = interaction.data.options;

    if (command === 'sigma93') { // Assume the command name is 'id'
        const userId = args[0].value;



        // Validate userId

      

        






        try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
          
        if (userId.length >= 11 || !/^\d+$/.test(userId)) {
            const embed235 = {
                description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
                color: 2894900
            };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
             //   data: {
               //     type: 4, // Channel Message with Source
                    data: {
                        content: '',
                        embeds: [embed235]
                //    }
                }
            });
            return;
        }
            // Check if the user has been deleted
const usernameResponse = await axios.post( 
    `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
    {
        userIds: [userId],
        fields: ["names.username", "names.displayName"]
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

const userProfile = usernameResponse.data.profileDetails[0];

const username = userProfile?.names?.username;  // Fallback if username is not available
const displayName = userProfile?.names?.displayName;  // Fallback if displayName is not available
        const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;
          
          
if (!username) {

    const embed33 = {
        embeds: [
            {
        description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
        color: 2894900
            }
        ],
        attachments: []
    };
  
    // Send the embed (replace `sendEmbedFunction` with your actual embed sending method)
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed33
                    
                });
            return;
}
          

if (username.startsWith("[Account Deleted (")) {
    const deletedId = userId;
    let nextId = parseInt(deletedId) + 1;

                while (true) {
                    try {
                        const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${nextId}`);
                        if (creationDateResponse.status === 200) {
                            const creationDateTimestamp = Math.floor(new Date(creationDateResponse.data.created).getTime() / 1000);
                            const creationDate = `<t:${creationDateTimestamp}:D>`;
                            const accountAgeDays = Math.floor((Date.now() - new Date(creationDateResponse.data.created).getTime()) / (1000 * 60 * 60 * 24));

                            const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${deletedId}&size=420x420&format=Png&isCircular=false`);
                            let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;
                          

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
                          
    let lastOnlineTimestamp34 = "Unknown"
    const url12346 = `https://www.rolimons.com/player/${deletedId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const deletedEmbed = {
        embeds: [
            {
                title: displayNameText, // Use the determined display name
                url: `https://rblx.trade/u/${encodeURIComponent(username)}`,
                color: 2894900,
                fields: [
                                    { name: 'ID', value: deletedId, inline: true },
                                    { name: 'Deleted', value: 'True', inline: true },
                                    { name: 'Account Age', value: accountAgeDays.toLocaleString() + " days", inline: true },
                                    { name: 'Created', value: creationDate, inline: true },
                                    { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
                                    { name: 'Current Status', value: 'Offline', inline: true }
                ],
                thumbnail: { url: thumbnailUrl }
            }
        ],
        attachments: []
    };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: deletedEmbed
                    
                });
                           
                            return;
                        } else {
                            nextId += 10;
                        }
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            nextId += 10;
                        } else {
                            console.error('Error:', error.message);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
                            return;
                        }
                    }
                }
            }

            const userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }
let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
    //    const response = await axios.get(url12345);
     //   const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

      //  if (match) {
     //       lastOnlineTimestamp = parseInt(match[1], 10);
     //  }
   // } catch (error) {
        // Ignore any errors
   // }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
     

const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
              
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
              
              
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

// Append the verified badge emoji if the user has it
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response14 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response14.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
     const encodedUsername = encodeURIComponent(user.name);
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
              
              
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
                          const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
                    
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await axios.get(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

    let badge9 = '';
    badges.forEach(badge => {
      if (badgeMappings[badge.name]) {
        const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
        badge9 += emoji;
      }
    });
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `-# ${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                   
                    data: bannedEmbed
                
            });
                return;
            }

const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}

let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
          
          
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response13 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response13.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
          
   // const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url1234);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
       //     lastOnlineTimestamp = parseInt(match[1], 10);
       // }
    //} catch (error) {
        // Ignore any errors
    //}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);


            const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
            const hasSign = signResponse.data;
            const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
            const hasHat = hatResponse.data;




            let badgeStatus = 'False';
            if (hasSign && hasHat) {
                badgeStatus = "Hat/Sign";
            } else if (hasSign) {
                badgeStatus = "Sign";
            } else if (hasHat) {
                badgeStatus = "Hat";
            }



const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
          
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
          
if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
          
          
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";
          
            const accountCreatedDate = new Date(user.created);
            const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
            if (rolimonsData.rap === null) {
                rolimonsData.rap = 'Private';
                rolimonsData.value = '—';
            }

const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
          
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
          
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
    const response34 = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/can-view-inventory`);
    
    // Set inventorystatus based on the response
    const inventorystatus = response34.data.canView === "false" ? "Private" : "Public";
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;

for (let i = 0; i < badgeEmojis.length; i++) {
  badge9 += badgeEmojis[i];

  if ((i + 1) % maxBadgesPerLine === 0) {
    badge9 += '\n-# '; // Add a new line after max badges per line
  } else {
    badge9 += ' '; // Add a space between badges
  }
}

 //   return badge9;  // Returns the emoji string of badges




          
            const embed = {
                embeds: [
                    {
                        title: title,
                        description: description,
                        url: `https://roblox.com/users/${userId}/profile`,
                        color: 2894900,
                        fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `-# ${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
                        ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                        thumbnail: { url: thumbnailUrl }
                    }
                ],
                attachments: []
            };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                   
                    data: embed
                
            });
        } catch (error) {
            console.error(`Error fetching user data: ${error.message}`);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
        }
    }
});

const itemTypeMappings = {
    1: 'Image',
    2: 'TShirt',
    3: 'Audio',
    4: 'Mesh',
    5: 'Lua',
    6: 'HTML',
    7: 'Text',
    8: 'Hat',
    9: 'Place',
    10: 'Model',
    11: 'Shirt',
    12: 'Pants',
    13: 'Decal',
    17: 'Head',
    18: 'Face',
    19: 'Gear',
    21: 'Badge',
    22: 'GroupEmblem',
    24: 'Animation',
    27: 'Torso',
    28: 'Right Arm',
    29: 'Left Arm',
    30: 'Left Leg',
    31: 'Right Leg',
    32: 'Package',
    34: 'GamePass',
    38: 'Plugin',
    39: 'SolidModel',
    40: 'MeshPart',
    41: 'Hair Accessory',
    42: 'Face Accessory',
    43: 'Neck Accessory',
    44: 'Shoulder Accessory',
    45: 'Front Accessory',
    46: 'Back Accessory',
    47: 'Waist Accessory',
    48: 'Climb Animation',
    49: 'Death Animation',
    50: 'Fall Animation',
    51: 'Idle Animation',
    52: 'Jump Animation',
    53: 'Run Animation',
    54: 'Swim Animation',
    55: 'Walk Animation',
    56: 'Pose Animation',
    57: 'Ear Accessory',
    58: 'Eye Accessory',
    59: 'LocalizationTableManifest',
    60: 'LocalizationTableTranslation',
    61: 'Emote Animation',
    62: 'Video',
    63: 'TexturePack',
    64: 'TShirt Accessory',
    65: 'Shirt Accessory',
    66: 'Pants Accessory',
    67: 'Jacket Accessory',
    68: 'Sweater Accessory',
    69: 'Shorts Accessory',
    70: 'Left Shoe Accessory',
    71: 'Right Shoe Accessory',
    72: 'Dress/Skirt Accessory',
    73: 'Font Family',
    74: 'FontFace',
    75: 'MeshHiddenSurfaceRemoval',
    76: 'Eyebrow Accessory',
    77: 'Eyelash Accessory',
    78: 'Mood Animation',
    79: 'Dynamic Head',
    80: 'CodeSnippet',
};

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name !== 'goodtest9182') return;

    const assetIdOption = interaction.data.options.find((option) => option.name === 'testte');
    if (!assetIdOption || !assetIdOption.value) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'Invalid asset ID provided.',
                },
            },
        });
    }
    const assetId = assetIdOption.value;

    try {
        let response;
        let assetDetails;
        let useFallbackApi = false;

        try {
            response = await getUserData3(`https://economy.roblox.com/v2/assets/${assetId}/details`, config);
            assetDetails = response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                useFallbackApi = true;
                response = await getUserData3(`https://develop.roblox.com/v1/assets?assetIds=${assetId}`);
                const fallbackData = response.data.data[0];
                assetDetails = {
                    Name: fallbackData.name,
                    Description: fallbackData.description,
                    Creator: {
                        Name: fallbackData.creator.typeId === 1 ? `User (${fallbackData.creator.targetId})` : `Group (${fallbackData.creator.targetId})`,
                        CreatorType: fallbackData.creator.typeId === 1 ? 'User' : 'Group',
                        CreatorTargetId: fallbackData.creator.targetId,
                    },
                    AssetTypeId: fallbackData.typeId,
                    Created: fallbackData.created,
                    Updated: fallbackData.updated,
                    IsForSale: false,
                };
            } else {
                throw error;
            }
        }

        if (assetDetails.Creator.CreatorType === 'User') {
            try {
                assetDetails.Creator.Name = await getCorrectUsername(assetDetails.Creator.CreatorTargetId);
            } catch (userError) {
                assetDetails.Creator.Name = `User (${assetDetails.Creator.CreatorTargetId})`;
            }
        } else {
            try {
                const groupResponse = await getUserData3(`https://groups.roblox.com/v0/groups/${assetDetails.Creator.CreatorTargetId}`);
                assetDetails.Creator.Name = groupResponse.data.Name;
            } catch (groupError) {
                assetDetails.Creator.Name = `Group (${assetDetails.Creator.CreatorTargetId})`;
            }
        }

        let favoriteCount = 'N/A';
        try {
            let favoritesResponse = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${assetId}/count`);
            favoriteCount = favoritesResponse.data || '0';
        } catch (favError) {
            if (favError.response?.status !== 400) {
                throw favError;
            }
        }

        let thumbnailResponse = await getUserData(
            `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`
        );
        let thumbnailUrl = thumbnailResponse.data.data[0]?.imageUrl;

        const creatorType = assetDetails.Creator.CreatorType === 'User' ? 'users' : 'groups';
        const creatorUrl = `https://www.roblox.com/${creatorType}/${assetDetails.Creator.CreatorTargetId}`;

        const itemType = itemTypeMappings[assetDetails.AssetTypeId] || 'Unknown';

        const price = useFallbackApi
            ? 'Offsale'
            : assetDetails.IsForSale
            ? assetDetails.PriceInRobux
                ? assetDetails.PriceInRobux.toString()
                : 'Unknown'
            : 'Offsale';

        const embed = new MessageEmbed()
            .setTitle(assetDetails.Name)
            .setURL(`https://www.roblox.com/catalog/${assetId}`)
            .setColor(2894900)
            .setFooter(`Asset ID: ${assetId}`)
            .addFields(
                { name: 'Item Type', value: itemType, inline: true },
                {
                    name: 'Creator',
                    value:
                        `[${assetDetails.Creator.Name}](${creatorUrl})` +
                        (assetDetails.Creator.HasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : ''),
                    inline: true,
                },
                { name: 'Price', value: price, inline: true },
                { name: 'Created', value: `<t:${Math.floor(new Date(assetDetails.Created).getTime() / 1000)}:D>`, inline: true },
                { name: 'Updated', value: `<t:${Math.floor(new Date(assetDetails.Updated).getTime() / 1000)}:D>`, inline: true },
                { name: 'Favorites', value: favoriteCount.toString(), inline: true }
            );

        if (assetDetails.Description && assetDetails.Description.trim()) {
            embed.addFields({ name: 'Description', value: assetDetails.Description });
        }

        if (thumbnailUrl) {
            embed.setThumbnail(thumbnailUrl);
        }

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [embed],
                },
            },
        });

    } catch (error) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Error code: ${error.response?.status || 'Unknown'}`,
                },
            },
        });
    }
});

const cooldowns = {};


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const commandName = interaction.data.name;
    const user = interaction.member?.user || interaction.user; // Fallback to handle different interaction structures
    const userId = user.id;
    const currentTime = Date.now();

    if (commandName === 'goodtest12345') {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
        if (cooldowns[userId] && currentTime - cooldowns[userId] < 5000) {
            const timeLeft = Math.ceil((5000 - (currentTime - cooldowns[userId])) / 1000);
            await respond2(interaction, `Please wait ${timeLeft} seconds before using this command again.`, true);
            return;
        }

        cooldowns[userId] = currentTime;

        const type = interaction.data.options?.find(option => option.name === 'option')?.value?.toLowerCase();
        const show = interaction.data.options?.find(option => option.name === 'show')?.value || false; // Default to false

        let gened;

        switch (type) {
            case '5char':
            case '5character':
            case '5c':
                gened = await gener7(5);
                break;
            case '5_letter':
            case '5_l':
                gened = await underscore32(5);
                break;
            case '5_char':
            case '5_c':
            case '5_character':
                gened = await underscore323(5);
                break;
            case '5letter_':
            case '5l_':
                gened = await undere2(5);
                break;
            case '5char_':
            case '5c_':
            case '5character_':
                gened = await undere23(5);
                break;
            case '6l':
            case '6letter':
                gened = await genpee8(6);
                break;
            case 'word':
            case 'realword':
            case 'actualword':
                gened = await word();
                break;
            case 'leetspeak':
            case 'leet':
            case '1337':
                gened = await genleet(8);
                break;
            case 'leetspeak5c':
            case 'leet5c':
            case '13375c':
            case 'leetspeak5char':
            case 'leet5char':
            case '13375char':
            case 'leetspeak5character':
            case 'leet5character':
            case '13375character':
                gened = await genleet(6);
                break;
            default:
                await respond2(interaction, 'Valid types: `word`, `6letter`, `5_letter`, `5letter_`, `5_character`, `5character_`, `5character`, `leetspeak`, `leetspeak5char`', true);
                return;
        }

        if (!gened) {
            await respond2(interaction, 'Failed to generate.', true);
            return;
        }

        // Respond based on the value of 'show'. If true, it's a public response; if false, it's ephemeral (flags = 64).
        await respond2(interaction, `Generated username: ${gened}`, !show);
    }
});




async function genleet(int = 8) {
    const url = 'https://raw.githubusercontent.com/lorenbrichter/Words/master/Words/en.txt';
    const response = await axios.get(url);
    const integr = int;
    const words = response.data.split('\n').filter(word => word.length < integr);

    const mappings = {
        'o': '0',
        'a': '4',
        'e': '3',
        'l': 'I',
        'i': '1'
    };

    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }

    for (let word of words) {
        const chars = Array.from(word);
        let leetword = word;

        const leeter = chars.filter(char => Object.keys(mappings).includes(char.toLowerCase()));

        if (leeter.length === 0) continue;

        const numreplace = Math.min(leeter.length, Math.floor(Math.random() * 3) + 1);

        for (let i = 0; i < numreplace; i++) {
            const replacer = leeter[Math.floor(Math.random() * leeter.length)];
            const regex = new RegExp(replacer, 'i');
            leetword = leetword.replace(regex, mappings[replacer.toLowerCase()]);
        }

        const valod = await check(leetword);

        if (valod.available) {
            return leetword;
        }
    }
    return null;
}


async function gener7(length) { // 5 char
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        for (let i = 0; i < length; i++) {
            if (i === 0 || i === length - 1) {
                robloxslayer4 += characters.charAt(Math.floor(Math.random() * (characters.length - 1)));
            } else {
                robloxslayer4 += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function genpee8(length) { // 6 letr
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        for (let i = 0; i < length; i++) {
            if (i === 0 || i === length - 1) {
                robloxslayer4 += characters.charAt(Math.floor(Math.random() * (characters.length - 1)));
            } else {
                robloxslayer4 += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function underscore32(length) { // 5_l
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        const firstchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const thirdchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fourthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fifthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        robloxslayer4 = `${firstchar}_${thirdchar}${fourthchar}${fifthchar}`;
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function underscore323(length) { // 5_c
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        const firstchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const thirdchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fourthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fifthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        robloxslayer4 = `${firstchar}_${thirdchar}${fourthchar}${fifthchar}`;
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function undere2(length) { // 5l_
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        const firstchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const thirdchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fourthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fifthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        robloxslayer4 = `${firstchar}${thirdchar}${fourthchar}_${fifthchar}`;
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function undere23(length) { // 5c_
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let robloxslayer4;

    do {
        robloxslayer4 = '';
        const firstchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const thirdchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fourthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        const fifthchar = characters.charAt(Math.floor(Math.random() * characters.length));
        robloxslayer4 = `${firstchar}${thirdchar}${fourthchar}_${fifthchar}`;
        const response = await check(robloxslayer4);
        if (response && response.available) {
            return robloxslayer4;
        }
    } while (true);
}

async function word() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/suwupers/word/main/word.txt');
        if (response && response.data) {
            const words = response.data.split('\n').filter(word => word.length > 0);
            const niefdef = words[Math.floor(Math.random() * words.length)];
            const response2 = await check(niefdef);
            if (response2 && response2.available) {
              return niefdef;
            } else {
                return word();
            }
        }
    } catch (error) {
        console.error('Error retrieving real word:', error.message);
        return null;
    }
}


async function check(username) {
    try {
        const response = await axios.get(`https://auth.roblox.com/v1/usernames/validate?request.username=${encodeURIComponent(username)}&request.birthday=1981-08-08`);
        if (response && response.data && response.data.code === 0 && response.data.message === 'Username is valid') {
            return { available: true };
        } else {
            return { available: false };
        }
    } catch (error) {
        console.error('Error checking username availability:', error.message);
        return { available: false };
    }
}



client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
  if (msg.content.startsWith('-crypto1243 ') || msg.content.startsWith('-coin1234 ') || msg.content.startsWith('-cryptocurrency1234 ')) {
    const args = msg.content.split(' ').slice(1);
    if (args.length < 1) return;

    const coinInput = args.join(' ').toLowerCase(); // Convert input to lowercase for case-insensitive matching

    try {
      let coinName = coinInput;
      let coinSymbol = coinInput;

      const coinListResponse = await axios.get(`https://supers.lol/crypto.txt`);
      const coinList = coinListResponse.data;

      // Find the coin using a case-insensitive comparison for the coin name
      let matchingCoin = Object.values(coinList).find(
        (coin) => coin.CoinName.toLowerCase() === coinInput // Compare with lowercase coin name
      );

      // If no match by name, try matching by symbol
      if (!matchingCoin) {
        matchingCoin = Object.values(coinList).find(
          (coin) => coin.Symbol.toLowerCase() === coinInput // Compare with lowercase symbol
        );
      }

      if (matchingCoin) {
        coinName = matchingCoin.CoinName;
        coinSymbol = matchingCoin.Symbol; // Use the symbol for the API request
      } else {
  const embed = new MessageEmbed()
    .setDescription('Invalid cryptocurrency name or symbol.')
    .setColor('#050000');

  return msg.channel.send({ embeds: [embed] });
      }

      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=${coinSymbol}`
      );
      console.log(coinSymbol)
      console.log(response.data)
      const data = response.data.RAW?.[coinSymbol]?.USD;
if (!data) {
  const embed = new MessageEmbed()
    .setDescription('Invalid cryptocurrency name or symbol.')
    .setColor('#050000');

  return msg.channel.send({ embeds: [embed] });
}

      const price = formatPrice(data.PRICE);
      const priceChange1h = formatChange(data.CHANGEHOUR);
      const priceChangePercent1h = formatPercent(data.CHANGEPCTHOUR);
      const priceChange24h = formatChange(data.CHANGE24HOUR);
      const priceChangePercent24h = formatPercent(data.CHANGEPCT24HOUR);
      const thumbnailUrl = `https://www.cryptocompare.com${data.IMAGEURL}`;
      const title = `${coinName}`;

      // Default color for the embed
      let dominantColor = '#050000'; 

      const embed = new MessageEmbed()
        .setTitle(title)
        .setURL(`https://www.cryptocompare.com/coins/${coinSymbol}/overview`)
        .setColor(dominantColor)
        .addFields(
          { name: 'Price', value: `$${price} USD` },
          {
            name: '24H Change',
            value: `${priceChange24h} (${priceChangePercent24h})`,
          },
          {
            name: 'This Hour',
            value: `${priceChange1h} (${priceChangePercent1h})`,
          }
        )
        .setFooter({ text: coinSymbol })
        .setTimestamp()
        .setThumbnail(thumbnailUrl);

      msg.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
        const embed = new MessageEmbed()
    .setDescription('Invalid cryptocurrency name or symbol.')
    .setColor('#050000');

  return msg.channel.send({ embeds: [embed] });
    }
  }
  
function formatPrice(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return '0.0000';

  // For numbers >= 1, format with 2 decimals
  if (num >= 1) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    // For numbers < 1, limit to 4 significant digits
    const significantDigits = num.toPrecision(4); // Limit to 4 significant digits
    return significantDigits;
  }
}
  
  function formatChange(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return '$0.00';

    // Determine sign
    const sign = num >= 0 ? '+' : '-';
    const absValue = Math.abs(num);

    // Format based on size
    let formattedValue;
    if (absValue >= 1) {
      // Large numbers: Format with 2 decimals
      formattedValue = absValue.toFixed(2);
    } else if (absValue >= 0.0001) {
      // Small decimals: Show up to 5 decimals, no trailing zeros
      formattedValue = absValue.toFixed(5).replace(/\.?0+$/, ''); // Ensure no trailing zeros
    } else {
      // Very small values: Use scientific notation, rounded with no extra zeros
      formattedValue = absValue.toExponential(3); // Display scientific notation with 3 decimal places
    }

    return `${sign}$${formattedValue}`;
  }

  function formatPercent(value) {
    const num = parseFloat(value);
    const absNum = Math.abs(num);

    if (absNum < 0.01 && absNum > 0) {
      return `${num < 0 ? '-' : '+'}0.01%`;
    }

    return `${num < 0 ? '-' : '+'}${absNum.toFixed(2)}%`;
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
  if (interaction.data.name === 'goodtest99999') {
    const coinSymbol = 'TRUMP';
    const coinName = 'Official Trump';
    const url = 'https://api.coingecko.com/api/v3/coins/official-trump';
    const thumbnailUrl = 'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/aff80b5ab4f1ea785dd0f97ae96b6b545ed3f3b41cb4662949b24e0c230cff90.png';

    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
          'x-cg-demo-api-key': 'CG-bVNiUw3GapnGx6tQdE2dKcxD'
        }
      });
      const data = response.data.market_data;
      const price = data.current_price.usd;
      const priceChange24h = data.price_change_24h;
      const priceChangePercent24h = data.price_change_percentage_24h;
      const priceChangePercent1h = data.price_change_percentage_1h_in_currency.usd;
      const priceChange1h = (price * (priceChangePercent1h / 100)).toFixed(2);

      const formatChange = (change, percent) => {
        const sign = change >= 0 ? '+' : '-';
        return `${sign}$${Math.abs(change).toFixed(2)} (${sign}${Math.abs(percent).toFixed(2)}%)`;
      };

      const embed = {
        data: {
          type: 4, // Channel Message with Source
          data: {
            embeds: [
              {
                title: coinName,
                url: url,
                color: parseInt('050000', 16),
                thumbnail: { url: thumbnailUrl },
                fields: [
                  { name: 'Price', value: `$${price.toFixed(2)} USD` },
                  { name: '24H Change', value: formatChange(priceChange24h, priceChangePercent24h) },
                  { name: 'This Hour', value: formatChange(Number(priceChange1h), priceChangePercent1h) },
                ],
                footer: { text: coinSymbol },
                timestamp: new Date().toISOString(),
              },
            ],
          },
        },
      };

      return client.api.interactions(interaction.id, interaction.token).callback.post(embed);
    } catch (error) {
      console.error(error);
      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: { content: 'Failed to fetch Official Trump data.' },
        },
      });
    }
  }
});


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-coolinfo')) {
    const args = message.content.split(' ');
    const userId = args[1];

    if (!userId) {
      return message.channel.send('Please provide a user ID.');
    }

    try {
      const user = message.mentions.users.first() || await client.users.fetch(userId).catch(() => null);
      console.log(user)
      if (!user) {
        return message.channel.send('Could not find the user.');
      }

      // Use /users/{user.id} format with axios
      const userResponse = await axios.get(`https://discord.com/api/v9/users/${user.id}`, {
        headers: {
          'Authorization': `Bot ${client.token}`,
        },
      });

      message.channel.send(`User Info: \n${JSON.stringify(userResponse.data, null, 2)}`);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching user data:', error);

      // Send a user-friendly error message
      message.channel.send('Could not fetch user data. Please check the user ID or try again later.');
    }
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name === 'userinfo') {
        const userId = interaction.data.options?.[0]?.value;
        const user = await client.users.fetch(userId).catch(() => null);

        if (!user) {
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'Please mention a Valid User or provide a [Valid User ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).',
                    },
                },
            });
        }

        let bannerUrl = null;
        try {
            const userResponse = await axios.get(`https://discord.com/api/v9/users/${user.id}`, {
                headers: {
                    'Authorization': `Bot ${client.token}`,
                },
            });

            const bannerHash = userResponse.data.banner;
            if (bannerHash) {
                bannerUrl = bannerHash.startsWith('a_')
                    ? `https://cdn.discordapp.com/banners/${user.id}/${bannerHash}.gif?size=512`
                    : `https://cdn.discordapp.com/banners/${user.id}/${bannerHash}.webp?size=512`;
            }
        } catch (error) {
            console.error('Error fetching banner:', error);
        }

        const userInfo = {
            id: user.id,
            bot: user.bot,
            flags: user.flags?.bitfield || 0,
            username: user.username,
            globalName: user.globalName || null,
            discriminator: user.discriminator,
            avatar: user.avatar || user.defaultAvatarURL,
            createdTimestamp: user.createdTimestamp,
            avatarURL: user.displayAvatarURL({ format: 'webp', size: 1024 }),
        };

        const avatarUrl = userInfo.avatar && userInfo.avatar.startsWith('a_')
            ? `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.gif?size=1024`
            : userInfo.avatarURL;

        const displayName = userInfo.globalName && userInfo.globalName !== userInfo.username
            ? `${userInfo.globalName} (@${userInfo.username})`
            : userInfo.username;

        const badges = [];
        const badgeEmojis = {
            STAFF: '<:STAFF:1330822207626281021>',
            PARTNER: '<:PARTNER:1330822105482399776>',
            HYPESQUAD: '<:HYPESQUAD:1330822487591882812>',
            HYPESQUAD_ONLINE_HOUSE_1: '<:HYPESQUAD_ONLINE_HOUSE_1:1330822397263351838>',
            HYPESQUAD_ONLINE_HOUSE_2: '<:HYPESQUAD_ONLINE_HOUSE_2:1330822453341196309>',
            HYPESQUAD_ONLINE_HOUSE_3: '<:HYPESQUAD_ONLINE_HOUSE_3:1330822359271342133>',
            PREMIUM_EARLY_SUPPORTER: '<:PREMIUM_EARLY_SUPPORTER:1330822299175223326>',
            BUG_HUNTER_LEVEL_1: '<:BUG_HUNTER_LEVEL_1:1330822013924806717>',
            BUG_HUNTER_LEVEL_2: '<:BUG_HUNTER_LEVEL_2:1330821835125821460>',
            ACTIVE_DEVELOPER: '<:ACTIVE_DEVELOPER:1330821774299893802>',
            VERIFIED_DEVELOPER: '<:VERIFIED_DEVELOPER:1330821713977413675>',
        };

        // Binary flag check logic
        const flags = userInfo.flags;
        if (flags & (1 << 0)) badges.push(badgeEmojis['STAFF']);
        if (flags & (1 << 1)) badges.push(badgeEmojis['PARTNER']);
        if (flags & (1 << 2)) badges.push(badgeEmojis['HYPESQUAD']);
        if (flags & (1 << 3)) badges.push(badgeEmojis['BUG_HUNTER_LEVEL_1']);
        if (flags & (1 << 6)) badges.push(badgeEmojis['HYPESQUAD_ONLINE_HOUSE_1']);
        if (flags & (1 << 7)) badges.push(badgeEmojis['HYPESQUAD_ONLINE_HOUSE_2']);
        if (flags & (1 << 8)) badges.push(badgeEmojis['HYPESQUAD_ONLINE_HOUSE_3']);
        if (flags & (1 << 9)) badges.push(badgeEmojis['PREMIUM_EARLY_SUPPORTER']);
        if (flags & (1 << 10)) badges.push(badgeEmojis['TEAM_PSEUDO_USER']);
        if (flags & (1 << 14)) badges.push(badgeEmojis['BUG_HUNTER_LEVEL_2']);
        if (flags & (1 << 16)) badges.push(badgeEmojis['VERIFIED_BOT']);
        if (flags & (1 << 17)) badges.push(badgeEmojis['VERIFIED_DEVELOPER']);
        if (flags & (1 << 18)) badges.push(badgeEmojis['CERTIFIED_MODERATOR']);
        if (flags & (1 << 19)) badges.push(badgeEmojis['BOT_HTTP_INTERACTIONS']);
        if (flags & (1 << 22)) badges.push(badgeEmojis['ACTIVE_DEVELOPER']);

        if (badges.length === 0) badges.push('None');
      
        let verificationBadge = userInfo.bot && flags & (1 << 16) ? 'None' : '';

        // Join badges into a string
        let badgesString = badges.join(' ') + (verificationBadge ? ` ${verificationBadge}` : '');
      
       let verificationBadge34 = userInfo.bot ? (flags & (1 << 16) ? ' <:VERIFIED_APP_1:1330839756048699442><:VERIFIED_APP_2:1330839791528448000><:VERIFIED_APP_3:1330839828941639720>' : ' <:APP_1:1330840119812292629><:APP_2:1330840139420799017>') : '';

        const embed = {
            title: `${displayName}${verificationBadge34}`,
            url: `https://discordlookup.com/user/${userInfo.id}`,
            description: `-# <@${userInfo.id}>`,
            color: 0x7289DA,
            fields: [
                {
                    name: 'Created',
                    value: `<t:${Math.floor(userInfo.createdTimestamp / 1000)}:D> (<t:${Math.floor(userInfo.createdTimestamp / 1000)}:R>)`,
                    inline: true,
                },
                {
                    name: 'Badges',
                    value: badgesString,
                    inline: true,
                },
            ],
            footer: {
                text: `ID: ${userInfo.id}`,
            },
            image: bannerUrl ? { url: bannerUrl } : undefined,
            thumbnail: { url: avatarUrl },
        };

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [embed],
                },
            },
        });
    }
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    // Split the message content to get the command and group ID
    const args = msg.content.split(' ');
    const command = args[0];
    const groupId = args[1]; // Now expect the group ID as the argument

    // Define the aliases for the command
    const commandAliases = ['-gid1', '-groupid1', '-idgroup1', '-cid', '-communityid', '-communitiesid', '-idcommunity'];

    if (!commandAliases.includes(command.toLowerCase()) || !groupId) return;

    try {
        // Validate that the groupId is a number
        if (isNaN(groupId)) {
            await msg.channel.send("Please provide a valid group ID.");
            return;
        }

        // Fetch group details
        let groupDetails, groupMetadata, thumbnailResult;
        try {
            groupDetails = await getUserData3(`https://groups.roblox.com/v1/groups/${groupId}`);
            groupMetadata = await getUserData3(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`);
            thumbnailResult = await getUserData(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                groupDetails = await getUserData3(`https://groups.roproxy.com/v1/groups/${groupId}`);
                groupMetadata = await getUserData3(`https://groups.roproxy.com/v2/groups?groupIds=${groupId}`);
            } else {
                throw error;
            }
        }

        const groupInfo = groupDetails.data;
        const metadata = groupMetadata.data.data[0];
        const thumbnailUrl = thumbnailResult.data.data[0].imageUrl;
        const verifiedBadge = metadata.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        let verifiedBadge2 = groupInfo.owner?.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        const statusName = groupInfo.isLocked ? "Locked" : "Public";
        const statusValue = groupInfo.isLocked ? "True" : (groupInfo.publicEntryAllowed ? "True" : "False");
        const createdDate = Math.floor(new Date(metadata.created).getTime() / 1000);
        const owner = groupInfo.owner ? `[${groupInfo.owner.username}](https://roblox.com/users/${groupInfo.owner.userId})` : '—';
        let funds = "";
        try {
            const fundsResponse = await axios.get(`https://economy.roblox.com/v1/groups/${groupId}/currency`, config);
            funds = fundsResponse.data.robux ? `**Funds:** ${fundsResponse.data.robux}` : '';
        } catch (error) {}

        let nameHistory = "";
        try {
            const nameHistoryResponse = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/name-history?limit=100&sortOrder=Desc`);
            if (nameHistoryResponse.data.data.length > 0) {
                nameHistory = nameHistoryResponse.data.data.map(name => `-# ${name.name} - <t:${Math.floor(new Date(name.created).getTime() / 1000)}:D>`).join('\n');
            }
        } catch (error) {}

        const cloudResponse = await axios.get(`https://apis.roblox.com/cloud/v2/groups/${groupId}`, {
            headers: { 'x-api-key': process.env.apikeygroup }
        });
        const updateTime = Math.floor(new Date(cloudResponse.data.updateTime).getTime() / 1000);

        const embed = new MessageEmbed()
            .setTitle(`${metadata.name}${verifiedBadge}`)
            .setURL(`https://www.roblox.com/communities/${groupId}/Avis`)
            .setColor(2894900)
            .setThumbnail(thumbnailUrl)
            .addFields(
                { name: "ID", value: `${groupId}`, inline: true },
                { name: "Owner", value: `${owner}${verifiedBadge2}`, inline: true },
                { name: "Members", value: `${groupInfo.memberCount.toLocaleString()}`, inline: true },
                { name: "Created", value: `<t:${createdDate}:D>`, inline: true },
                { name: "Updated", value: `<t:${updateTime}:D>`, inline: true },
                { name: statusName, value: statusValue, inline: true }
            );

        let descriptionText = "";
        if (funds) descriptionText += `-# ${funds}\n`;

        if (descriptionText) embed.setDescription(descriptionText);
        if (metadata.description) embed.addFields({ name: "Description", value: metadata.description });
        if (groupInfo.shout?.body) {
            const shoutDate = Math.floor(new Date(groupInfo.shout.updated).getTime() / 1000);
            const shoutPoster = `[${groupInfo.shout.poster.username}](https://roblox.com/users/${groupInfo.shout.poster.userId})`;
            const verifiedBadge3 = groupInfo.shout.poster.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
            embed.addFields(
                { name: "Shout", value: groupInfo.shout.body, inline: true },
                { name: "Shout Info", value: `**Poster:** ${shoutPoster}${verifiedBadge3}\n**Posted:** <t:${shoutDate}:D>`, inline: true }
            );
        }
        if (nameHistory) {
         embed.addFields(
                { name: "Previous Names", value: nameHistory, inline: false },
              
             );
           }

        await msg.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Error fetching group data:', error);
        await msg.channel.send("error");
    }
});


client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.split(' ');
    const command = args[0];
    const groupName = args.slice(1).join(' ');

    const commandAliases = ['-g1', '-group1', '-community1', '-communities1'];
    if (!commandAliases.includes(command.toLowerCase()) || !groupName) return;

    try {
        const encodedGroupName = encodeURIComponent(groupName);
        let searchResult;
        try {
            searchResult = await getUserData(`https://groups.roblox.com/v1/groups/search/lookup?groupName=${encodedGroupName}`);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                searchResult = await getUserData(`https://groups.roproxy.com/v1/groups/search/lookup?groupName=${encodedGroupName}`);
            } else {
                throw error;
            }
        }

        if (!searchResult.data.data || searchResult.data.data.length === 0) {
            const embed = new MessageEmbed()
                .setDescription(`[${groupName}](https://www.roblox.com/communities/${encodedGroupName}/Avis) does not exist`)
                .setURL(`https://www.roblox.com/communities/${encodedGroupName}`)
                .setColor(2894900);
            await msg.channel.send({ embeds: [embed] });
            return;
        }

        const groupId = searchResult.data.data[0].id;
        let groupDetails, groupMetadata, thumbnailResult;
        try {
            groupDetails = await getUserData3(`https://groups.roblox.com/v1/groups/${groupId}`);
            groupMetadata = await getUserData3(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`);
            thumbnailResult = await getUserData(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                groupDetails = await getUserData3(`https://groups.roproxy.com/v1/groups/${groupId}`);
                groupMetadata = await getUserData3(`https://groups.roproxy.com/v2/groups?groupIds=${groupId}`);
            } else {
                throw error;
            }
        }

        const groupInfo = groupDetails.data;
        const metadata = groupMetadata.data.data[0];
        const thumbnailUrl = thumbnailResult.data.data[0].imageUrl;
        const verifiedBadge = metadata.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        let verifiedBadge2 = groupInfo.owner?.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        const statusName = groupInfo.isLocked ? "Locked" : "Public";
        const statusValue = groupInfo.isLocked ? "True" : (groupInfo.publicEntryAllowed ? "True" : "False");
        const createdDate = Math.floor(new Date(metadata.created).getTime() / 1000);
        const owner = groupInfo.owner ? `[${groupInfo.owner.username}](https://roblox.com/users/${groupInfo.owner.userId})` : '—';
        let funds = "";
        try {
            const fundsResponse = await axios.get(`https://economy.roblox.com/v1/groups/${groupId}/currency`, config);
            funds = fundsResponse.data.robux ? `**Funds:** ${fundsResponse.data.robux}` : '';
        } catch (error) {}

        let nameHistory = "";
        try {
            const nameHistoryResponse = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/name-history?limit=100&sortOrder=Desc`);
            if (nameHistoryResponse.data.data.length > 0) {
                nameHistory = nameHistoryResponse.data.data.map(name => `-# ${name.name} - <t:${Math.floor(new Date(name.created).getTime() / 1000)}:D>`).join('\n');
            }
        } catch (error) {}

        const cloudResponse = await axios.get(`https://apis.roblox.com/cloud/v2/groups/${groupId}`, {
            headers: { 'x-api-key': process.env.apikeygroup }
        });
        const updateTime = Math.floor(new Date(cloudResponse.data.updateTime).getTime() / 1000);

        const embed = new MessageEmbed()
            .setTitle(`${metadata.name}${verifiedBadge}`)
            .setURL(`https://www.roblox.com/communities/${groupId}/Avis`)
            .setColor(2894900)
            .setThumbnail(thumbnailUrl)
            .addFields(
                { name: "ID", value: `${groupId}`, inline: true },
                { name: "Owner", value: `${owner}${verifiedBadge2}`, inline: true },
                { name: "Members", value: `${groupInfo.memberCount.toLocaleString()}`, inline: true },
                { name: "Created", value: `<t:${createdDate}:D>`, inline: true },
                { name: "Updated", value: `<t:${updateTime}:D>`, inline: true },
                { name: statusName, value: statusValue, inline: true }
            );

        let descriptionText = "";
        if (funds) descriptionText += `-# ${funds}\n`;

        if (descriptionText) embed.setDescription(descriptionText);
        if (metadata.description) embed.addFields({ name: "Description", value: metadata.description });
        if (groupInfo.shout?.body) {
            const shoutDate = Math.floor(new Date(groupInfo.shout.updated).getTime() / 1000);
            const shoutPoster = `[${groupInfo.shout.poster.username}](https://roblox.com/users/${groupInfo.shout.poster.userId})`;
            const verifiedBadge3 = groupInfo.shout.poster.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
            embed.addFields(
                { name: "Shout", value: groupInfo.shout.body, inline: true },
                { name: "Shout Info", value: `**Poster:** ${shoutPoster}${verifiedBadge3}\n**Posted:** <t:${shoutDate}:D>`, inline: true }
            );
        }
        if (nameHistory) {
         embed.addFields(
                { name: "Previous Names", value: nameHistory, inline: false },
              
             );
           }

        await msg.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Error fetching group data:', error);
        await msg.channel.send("error");
    }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name;
    const options = interaction.data.options || [];

    if (command === 'goodtest666') {
        const groupName = options.find(option => option.name === '66').value;
        const encodedGroupName = encodeURIComponent(groupName);

        try {
            // Make the first request to search for the group
            let searchResult;
            try {
                searchResult = await axios.get(`https://groups.roblox.com/v1/groups/search/lookup?groupName=${encodedGroupName}`);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    // Switch to roproxy if rate limited
                    searchResult = await axios.get(`https://groups.roproxy.com/v1/groups/search/lookup?groupName=${encodedGroupName}`);
                } else {
                    throw error;
                }
            }

            if (!searchResult.data.data || searchResult.data.data.length === 0) {
                const embed = new MessageEmbed()
                    .setDescription(`[\`${groupName}\`](https://www.roblox.com/communities/${encodedGroupName}/Avis) does not exist`)
                    .setURL(`https://www.roblox.com/communities/${encodedGroupName}`)
                    .setColor(2894900);

                await sendInteractionResponse(interaction, { embeds: [embed] });
                return;
            }

            const groupId = searchResult.data.data[0].id;

            // Fetch group details
            let groupDetails, groupMetadata, thumbnailResult;
        try {
            groupDetails = await getUserData3(`https://groups.roblox.com/v1/groups/${groupId}`);
            groupMetadata = await getUserData3(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`);
            thumbnailResult = await getUserData(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                groupDetails = await getUserData3(`https://groups.roproxy.com/v1/groups/${groupId}`);
                groupMetadata = await getUserData3(`https://groups.roproxy.com/v2/groups?groupIds=${groupId}`);
            } else {
                throw error;
            }
        }

        const groupInfo = groupDetails.data;
        const metadata = groupMetadata.data.data[0];
        const thumbnailUrl = thumbnailResult.data.data[0].imageUrl;
        const verifiedBadge = metadata.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        let verifiedBadge2 = groupInfo.owner?.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
        const statusName = groupInfo.isLocked ? "Locked" : "Public";
        const statusValue = groupInfo.isLocked ? "True" : (groupInfo.publicEntryAllowed ? "True" : "False");
        const createdDate = Math.floor(new Date(metadata.created).getTime() / 1000);
        const owner = groupInfo.owner ? `[${groupInfo.owner.username}](https://roblox.com/users/${groupInfo.owner.userId})` : '—';
        let funds = "";
        try {
            const fundsResponse = await axios.get(`https://economy.roblox.com/v1/groups/${groupId}/currency`, config);
            funds = fundsResponse.data.robux ? `**Funds:** ${fundsResponse.data.robux}` : '';
        } catch (error) {}

        let nameHistory = "";
        try {
            const nameHistoryResponse = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/name-history?limit=100&sortOrder=Desc`);
            if (nameHistoryResponse.data.data.length > 0) {
                nameHistory = nameHistoryResponse.data.data.map(name => `-# ${name.name} - <t:${Math.floor(new Date(name.created).getTime() / 1000)}:D>`).join('\n');
            }
        } catch (error) {}

        const cloudResponse = await axios.get(`https://apis.roblox.com/cloud/v2/groups/${groupId}`, {
            headers: { 'x-api-key': process.env.apikeygroup }
        });
        const updateTime = Math.floor(new Date(cloudResponse.data.updateTime).getTime() / 1000);

        const embed = new MessageEmbed()
            .setTitle(`${metadata.name}${verifiedBadge}`)
            .setURL(`https://www.roblox.com/communities/${groupId}/Avis`)
            .setColor(2894900)
            .setThumbnail(thumbnailUrl)
            .addFields(
                { name: "ID", value: `${groupId}`, inline: true },
                { name: "Owner", value: `${owner}${verifiedBadge2}`, inline: true },
                { name: "Members", value: `${groupInfo.memberCount.toLocaleString()}`, inline: true },
                { name: "Created", value: `<t:${createdDate}:D>`, inline: true },
                { name: "Updated", value: `<t:${updateTime}:D>`, inline: true },
                { name: statusName, value: statusValue, inline: true }
            );

        let descriptionText = "";
        if (funds) descriptionText += `-# ${funds}\n`;

        if (descriptionText) embed.setDescription(descriptionText);
        if (metadata.description) embed.addFields({ name: "Description", value: metadata.description });
        if (groupInfo.shout?.body) {
            const shoutDate = Math.floor(new Date(groupInfo.shout.updated).getTime() / 1000);
            const shoutPoster = `[${groupInfo.shout.poster.username}](https://roblox.com/users/${groupInfo.shout.poster.userId})`;
            const verifiedBadge3 = groupInfo.shout.poster.hasVerifiedBadge ? ' <:RobloxVerifiedBadge:1265450420638322698>' : '';
            embed.addFields(
                { name: "Shout", value: groupInfo.shout.body, inline: true },
                { name: "Shout Info", value: `**Poster:** ${shoutPoster}${verifiedBadge3}\n**Posted:** <t:${shoutDate}:D>`, inline: true }
            );
        }
        if (nameHistory) {
         embed.addFields(
                { name: "Previous Names", value: nameHistory, inline: false },
              
             );
           }

            await sendInteractionResponse(interaction, { embeds: [embed] });

        } catch (error) {
            console.error('Error fetching group data:', error);
            await sendInteractionResponse(interaction, "error");
        }
    }
});


async function sendInteractionResponse(interaction, content) {
    const response = typeof content === 'string' ? { content } : content;

    await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4, // Channel message with source
            data: response,
        },
    });
}




client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const content33 = msg.content.toLowerCase();

    if (
        content33.startsWith('-u343 ') || 
        content33.startsWith('-user343 ') || 
        content33.startsWith('-lookup343 ') || 
        content33.startsWith('-robloxuser343 ') || 
        content33.startsWith('-roblox343 ') || 
        content33.startsWith('-robloxu343 ') || 
        content33.startsWith('-blox343 ') ||
        content33.startsWith('-rblox343 ') ||
        content33.startsWith('-r0blox343 ') ||
        content33.startsWith('-us3r343 ') ||
        content33.startsWith('-r0bl0x343 ') ||
        content33.startsWith('-robl0x343 ') ||
        content33.startsWith('-usr343 ') ||
        content33.startsWith('-rbx343 ')
    ) {
        const args = msg.content.split(' ');
        args.shift(); // Remove the command part
        let username = args.join(' '); // Join the rest as the username
        const username2 = args.join(' ');
        username = username.replace(/\\n|\/n/g, '%0A'); 
        username = username.replace("#", '%23');





      
async function postUserData2(url, data) {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
}
      
        try {
            const userId = await getUserIdFromProfile(username);
            const encodedUsername2 = encodeURIComponent(username2);
if (!userId) {
    let validationMsg = '';

    try {
        const { data } = await axios.get('https://auth.roblox.com/v1/usernames/validate', {
            params: {
                Username: username2,
                Birthday: '01-01-2000',
                Context: 0
            }
        });

        const statusMap = {
            0: 'valid',
            1: 'taken',
            2: 'censored',
            3: 'invalid',
            4: 'invalid',
            5: 'invalid',
            6: 'invalid',
            7: 'invalid'
        };

        if (data.code in statusMap) {
            validationMsg = ` (${statusMap[data.code]})`;
        }
    } catch (error) {
        console.error('Failed to validate username:', error.response?.data || error.message);
    }

    await msg.channel.send({
        embeds: [
            {
                description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist${validationMsg}`,
                color: 2894900
            }
        ]
    });
    return;
}
          
          
if (!userId) {
    let validationMsg = '';

    try {
        const { data } = await axios.get('https://auth.roblox.com/v1/usernames/validate', {
            params: {
                Username: username2,
                Birthday: '01-01-2000',
                Context: 0
            }
        });

        const statusMap = {
            0: 'valid',
            1: 'taken',
            2: 'censored',
            3: 'invalid',
            4: 'invalid',
            5: 'invalid',
            6: 'invalid',
            7: 'invalid'
        };

        if (data.code in statusMap) {
            validationMsg = ` (${statusMap[data.code]})`;
        }
    } catch (error) {
        console.error('Failed to validate username:', error.response?.data || error.message);
    }

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                                description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                                color: 2894900
                            }]
                        
                    }
                });
                return;
}

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
    if (error.response && error.response.status === 404) {
        const usernameResponse = await axios.post(
            `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
            {
                userIds: [userId],
                fields: ["names.username", "names.displayName"]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const userProfile = usernameResponse.data.profileDetails[0];

        const username = userProfile?.names?.username || 'defaultUsername';  // Fallback if username is not available
        const displayName = userProfile?.names?.displayName || 'defaultDisplayName';  // Fallback if displayName is not available
        const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

        // Change const to let to allow reassignment
                            const thumbnailUrl = await getAvatar(userId)
                          
                          

// Check if the thumbnail state is "Blocked" and imageUrl is empty



    let accountCreatedDate;
    let currentUserId = userId;
    let lastOnlineTimestamp34 = "Unknown"

    while (true) {
      try {
        const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
        accountCreatedDate = new Date(creationDateResponse.data.created);
        break;
      } catch (error) {
        currentUserId++;
      }
    }
      
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

try {
    const response = await axios.get(url12346);
    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

    if (match) {
        lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
    } else {
        lastOnlineTimestamp34 = "Unknown";
    }
} catch (error) {
    lastOnlineTimestamp34 = "Unknown";
}

let lastOnline834 = "Last Online";

try {
    const gameResponse = await axios.get(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc`);
    const games = gameResponse.data.data;

    if (games.length > 0) {
        const latestGame = games.reduce((latest, game) => {
            return new Date(game.updated) > new Date(latest.updated) ? game : latest;
        });

        if (new Date(latestGame.updated).getTime() !== new Date(latestGame.created).getTime()) {
            const lastKnownTimestamp = Math.floor(new Date(latestGame.updated).getTime() / 1000);
            lastOnlineTimestamp34 = `<t:${lastKnownTimestamp}:D>`;
            lastOnline834 = "Last Known Online";
        } else if (lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        }
    }
    else if (games.length === 0) {
      if (lastOnlineTimestamp34 !== "Unknown") {
                  lastOnline834 = "Last Cached Online";
      }
    }
} catch (error) {
    console.error("Error fetching last known online time:", error);
}

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    const deletedEmbed = {
      embeds: [
        {
          title: `${displayNameText}`,
          url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
          color: 2894900,
          fields: [
            { name: "ID", value: userId.toString(), inline: true },
            { name: "Deleted", value: "True", inline: true },
            { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
            { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
            { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
            { name: "Current Status", value: "Offline", inline: true }
          ],
      //    footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
          thumbnail: { url: thumbnailUrl }
        }
      ]
    };

    await msg.channel.send(deletedEmbed);
    return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    } else {
                        lastLocation = 'In Game';
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                } else {
                    lastLocation = 'Online';
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
   //     const response = await axios.get(url12345);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
      //      lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}

                            const thumbnailUrl = await getAvatar(userId)
              
                let displayName = user.displayname;
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

    const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
    const groupsData = response1.data || []; // Ensure the data is accessed properly

    // Initialize userBody variable


    // Check if the user is in the "Official Group of Roblox"
        const response12 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response12.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response123 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response123.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
              
              
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}

                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Current Status", value: lastLocation, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
                            thumbnail: { url: thumbnailUrl }
                        }
                    ]
                };

                await msg.channel.send(bannedEmbed);
                return;
            }
          
          
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}

// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}

// Initialize userBody variable
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response18 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response18.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
          


        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

// Check for specific IDs and names in the response string


// Add badges to userBody based on the group presence

        
            // Add the admin badge emoji if the badge is present

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocation;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    lastLocation = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                } else {
                    lastLocation = 'In Game';
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
            } else {
                lastLocation = 'Online';
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
    //    const response = await axios.get(url1234);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

    //    if (match) {
     //       lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
   // }

 //   return lastOnlineTimestamp;
//}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData2(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // Skip presence.lastOnline if it matches user.created
        // console.log("Skipping presence.lastOnline as it matches user.created...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // Skip the specific timestamp
        // console.log("Skipping timestamp 1731646800...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp) {
        mostRecentTimestamp = latestBadgeTimestamp;
        onlineType = "badge";
    }
}

// Add logic to check against cache.txt
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || cacheTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
          

          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
const hasSign = signResponse.data;
const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
const hasHat = hatResponse.data;



let badgeStatus = 'False';
if (hasSign && hasHat) {
    badgeStatus = "Hat/Sign";
} else if (hasSign) {
    badgeStatus = "Sign";
} else if (hasHat) {
    badgeStatus = "Hat";
}

                            const thumbnailUrl = await getAvatar(userId)

const accountCreatedDate = new Date(user.created);
const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
          


// Initialize the bigDescription flag
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;





const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;

            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friend** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friend** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
          
    const response34 = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/can-view-inventory`);
    
    // Set inventorystatus based on the response
    const inventorystatus = response34.data.canView === "false" ? "Private" : "Public";

            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await axios.get(`https://games.roproxy.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;
          
const embed = {
    title: title,
    description: description,
    url: `https://roblox.com/users/${userId}/profile`,
    color: 2894900,
    fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Current Status", value: lastLocation, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
    ],
  //  footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
    thumbnail: { url: thumbnailUrl }
};

            await msg.channel.send({ embeds: [embed] });
        } catch (error) {
            await msg.channel.send(`Error: ${error.message}`);
        }
    }
});


client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const content33 = msg.content.toLowerCase();

    if (
        content33.startsWith('-u551 ') || 
        content33.startsWith('-user551 ') || 
        content33.startsWith('-lookup551 ') || 
        content33.startsWith('-robloxuser551 ') || 
        content33.startsWith('-roblox551 ') || 
        content33.startsWith('-robloxu551 ') || 
        content33.startsWith('-blox551 ') ||
        content33.startsWith('-rblox551 ') ||
        content33.startsWith('-r0blox551 ') ||
        content33.startsWith('-us3r551 ') ||
        content33.startsWith('-r0bl0x551 ') ||
        content33.startsWith('-robl0x551 ') ||
        content33.startsWith('-usr551 ') ||
        content33.startsWith('-rbx551 ')
    ) {
        const args = msg.content.split(' ');
        args.shift(); // Remove the command part
        let username = args.join(' '); // Join the rest as the username
        const username2 = args.join(' ');
        username = username.replace(/\\n|\/n/g, '%0A'); 
        username = username.replace("#", '%23');





      
async function postUserData2(url, data) {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
}
      
        try {
            const userId = await getUserIdFromProfile(username);
            const encodedUsername2 = encodeURIComponent(username2);
            if (!userId) {
                await msg.channel.send({
                    embeds: [
                        {
                            description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                            color: 2894900
                        }
                    ]
                });
                return;
            }

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
    if (error.response && error.response.status === 404) {
        const usernameResponse = await axios.post(
            `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
            {
                userIds: [userId],
                fields: ["names.username", "names.displayName"]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const userProfile = usernameResponse.data.profileDetails[0];

        const username = userProfile?.names?.username || 'defaultUsername';  // Fallback if username is not available
        const displayName = userProfile?.names?.displayName || 'defaultDisplayName';  // Fallback if displayName is not available
        const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

        // Change const to let to allow reassignment
                            const thumbnailUrl = await getAvatar(userId)
                          
                          

// Check if the thumbnail state is "Blocked" and imageUrl is empty



    let accountCreatedDate;
    let currentUserId = userId;
    let lastOnlineTimestamp34 = "Unknown"

    while (true) {
      try {
        const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
        accountCreatedDate = new Date(creationDateResponse.data.created);
        break;
      } catch (error) {
        currentUserId++;
      }
    }
      
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    const deletedEmbed = {
      embeds: [
        {
          title: `${displayNameText}`,
          url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
          color: 2894900,
          fields: [
            { name: "ID", value: userId.toString(), inline: true },
            { name: "Deleted", value: "True", inline: true },
            { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
            { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
            { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
            { name: "Current Status", value: "Offline", inline: true }
          ],
      //    footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
          thumbnail: { url: thumbnailUrl }
        }
      ]
    };

    await msg.channel.send(deletedEmbed);
    return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
   //     const response = await axios.get(url12345);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
      //      lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}

                            const thumbnailUrl = await getAvatar(userId)
              
                let displayName = user.displayname;
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

    const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
    const groupsData = response1.data || []; // Ensure the data is accessed properly

    // Initialize userBody variable
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}

    // Check if the user is in the "Official Group of Roblox"
        const response12 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response12.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response123 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response123.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
// Append the verified badge emoji if the user has it

              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
              
              
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description =  `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await axios.get(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

    let badge9 = '';
    badges.forEach(badge => {
      if (badgeMappings[badge.name]) {
        const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
        badge9 += emoji;
      }
    });
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `-# ${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await msg.channel.send(bannedEmbed);
                return;
            }
          
          
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
   

// Initialize userBody variable
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response18 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response18.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
          


        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

// Check for specific IDs and names in the response string


// Add badges to userBody based on the group presence

        
            // Add the admin badge emoji if the badge is present

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            
            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
    //    const response = await axios.get(url1234);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

    //    if (match) {
     //       lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
   // }

 //   return lastOnlineTimestamp;
//}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // Skip presence.lastOnline if it matches user.created
        // console.log("Skipping presence.lastOnline as it matches user.created...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // Skip the specific timestamp
        // console.log("Skipping timestamp 1731646800...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp) {
        mostRecentTimestamp = latestBadgeTimestamp;
        onlineType = "badge";
    }
}

// Add logic to check against cache.txt
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || cacheTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
          

          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
const hasSign = signResponse.data;
const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
const hasHat = hatResponse.data;


let badgeStatus = 'False';
if (hasSign && hasHat) {
    badgeStatus = "Hat/Sign";
} else if (hasSign) {
    badgeStatus = "Sign";
} else if (hasHat) {
    badgeStatus = "Hat";
}

                            const thumbnailUrl = await getAvatar(userId)

const accountCreatedDate = new Date(user.created);
const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}

// Initialize the bigDescription flag
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";




const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;

            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
    let inventorystatus = "Private"
    try {
        const response = await getUserData2(`https://inventory.roblox.com/v2/users/${userId}/inventory/8`);
        
        // If the request is successful, set inventory status to Public
        inventorystatus = response.status === 200 ? "Public" : "Private";
      //  console.log(`Inventory status: ${inventorystatus}`);
        //inventorystatus;
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
         //   console.log("Inventory status: Private");
            inventorystatus = "Private";
        } else {
           // console.error("An error occurred:", error.message);
           // return "Error";
        }
    }
          
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}

 //   return badge9;  // Returns the emoji string of badges




          
const embed = {
    title: title,
    description: description,
    url: `https://roblox.com/users/${userId}/profile`,
    color: 2894900,
    fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
    ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
    thumbnail: { url: thumbnailUrl }
};

            await msg.channel.send({ embeds: [embed] });
        } catch (error) {
            await msg.channel.send(`Error: ${error.message}`);
        }
    }
});


const badgeMappings = {
  'Homestead': { name: 'RobloxHomesteadBadge', id: '1332911545570824222' },
  'Bricksmith': { name: 'RobloxBricksmithBadge', id: '1332911002014056498' },
  'Combat Initiation': { name: 'RobloxCombatInitiationBadge', id: '1332911345980674099' },
  'Veteran': { name: 'RobloxVeteranBadge', id: '1332911171350695997' },
  'Warrior': { name: 'RobloxWarriorBadge', id: '1332909327886979234' },
  'Friendship': { name: 'RobloxFriendshipBadge', id: '1332911215361523794' },
  'Bloxxer': { name: 'RobloxBloxxerBadge', id: '1332911372131897344' },
  'Inviter': { name: 'RobloxInviterBadge', id: '1332911630677442590' },
  'Ambassador': { name: 'RobloxAmbassadorBadge', id: '1332911737170563172' },
  'Administrator': { name: 'RobloxAdministratorBadge', id: '1270956380542603317' },
  'Welcome To The Club': { name: 'RobloxWelcomeToTheClubBadge', id: '1332911094888403030' },
  'Official Model Maker': { name: 'RobloxOfficialModelMakerBadge', id: '1332911274392293498' }
};

// Function to fetch badges for a user and return them in the required format

    // Fetch the user's badges from the Roblox API

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const content33 = msg.content.toLowerCase();

    if (
        content33.startsWith('-id551 ') || 
        content33.startsWith('-robloxid551 ') || 
        content33.startsWith('-idroblox551 ') || 
        content33.startsWith('-identification551 ') || 
        content33.startsWith('-userid551 ') || 
        content33.startsWith('-uid551 ') || 
        content33.startsWith('-rid551 ') || 
        content33.startsWith('-roid551 ') || 
        content33.startsWith('-roblox_user_id551 ') || 
        content33.startsWith('-robloxuid551 ') || 
        content33.startsWith('-uidroblox551 ') || 
        content33.startsWith('-robloxuserid551 ') || 
        content33.startsWith('-rbxid551 ') || 
        content33.startsWith('-useridroblox551 ')
    ) {
        const args = msg.content.split(' ');
        const userId = args[1];
      
        if (userId.length >= 11 || !/^\d+$/.test(userId)) {
            const embed = {
                description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
                color: 2894900
            };
            return msg.channel.send({ embeds: [embed] });
        }






try {
    const usernameResponse = await axios.post(
        `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
        {
            userIds: [userId],
            fields: ["names.username", "names.displayName"]
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
  

    const userProfile = usernameResponse.data.profileDetails[0];

    const username = userProfile?.names?.username;  // Fallback if username is not available
    const displayName = userProfile?.names?.displayName;  // Fallback if displayName is not available
  
if (!username) {
    const embed33 = {
        description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
        color: 2894900
    };
    // Send the embed (replace `sendEmbedFunction` with your actual embed sending method)
    return msg.channel.send({ embeds: [embed33] });
}

    // Check if the username includes '[Account Deleted (' to determine if the account is deleted
    if (username.startsWith("[Account Deleted (")) {
        const deletedId = userId;
        let nextId = parseInt(deletedId) + 1; // Start with an increment of 10

        while (true) {
            try {
                const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${nextId}`);
                if (creationDateResponse.status === 200) {
                    const creationDateTimestamp = Math.floor(new Date(creationDateResponse.data.created).getTime() / 1000);
                    const creationDate = `<t:${creationDateTimestamp}:D>`;
                    const accountAgeDays = Math.floor((Date.now() - new Date(creationDateResponse.data.created).getTime()) / (1000 * 60 * 60 * 24));

                    // Fetch thumbnail for deleted account

const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;


// Check if the thumbnail state is "Blocked" and imageUrl is empty
const thumbnailUrl = await getAvatar(deletedId)
    let lastOnlineTimestamp34 = "Unknown"
    const url12346 = `https://www.rolimons.com/player/${deletedId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

                    const embed = {
                        title: `${displayNameText}`,
                        url: `https://www.roblox.com/users/${deletedId}`,
                        color: 2894900,
                        fields: [
                            { name: 'ID', value: deletedId, inline: true },
                            { name: 'Deleted', value: 'True', inline: true },
                            { name: 'Account Age', value: accountAgeDays.toLocaleString() + " days", inline: true },
                            { name: 'Created', value: creationDate, inline: true },
                            { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
                            { name: 'Current Status', value: 'Offline', inline: true }
                        ],
                        thumbnail: {
                            url: thumbnailUrl
                        }
                    };

                    await msg.channel.send({ embeds: [embed] });
                    return;
                } else {
                    nextId += 10; // Increment by 10 for the next attempt
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    nextId += 10; // Increment by 10 if ID not found
                } else {
                    console.error('Error:', error.message);
                    await msg.channel.send('An error occurred while fetching user information.');
                    return;
                }
            }
        }
    }

            const userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            const user = userResponse.data;
  


            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
      //  const response = await axios.get(url12345);
      //  const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
      //      lastOnlineTimestamp = parseInt(match[1], 10);
      //  }
   // } catch (error) {
        // Ignore any errors
   // }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}

const thumbnailUrl = await getAvatar(userId)
              
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}
              

let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}


              
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response18 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response18.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
                            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await axios.get(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

    let badge9 = '';
    badges.forEach(badge => {
      if (badgeMappings[badge.name]) {
        const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
        badge9 += emoji;
      }
    });
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `-# ${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await msg.channel.send(bannedEmbed);
                return;
            }

const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
  
  
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}

// Append the verified badge emoji if the user has it

  
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
  
const response19 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response19.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

  
  
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
  
    //const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url1234);
     //   const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

      //  if (match) {
        //    lastOnlineTimestamp = parseInt(match[1], 10);
      //  }
   // } catch (error) {
        // Ignore any errors
   // }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
    
          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);


            const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
            const hasSign = signResponse.data;
            const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
            const hasHat = hatResponse.data;




            let badgeStatus = 'False';
            if (hasSign && hasHat) {
                badgeStatus = "Hat/Sign";
            } else if (hasSign) {
                badgeStatus = "Sign";
            } else if (hasHat) {
                badgeStatus = "Hat";
            }



const thumbnailUrl = await getAvatar(userId)
  
if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
  
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";
  
  
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}

            const accountCreatedDate = new Date(user.created);
            const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
            if (rolimonsData.rap === null) {
                rolimonsData.rap = 'Private';
                rolimonsData.value = '—';
            }
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
  
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
      const response34 = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/can-view-inventory`);
    
    // Set inventorystatus based on the response
    const inventorystatus = response34.data.canView === "false" ? "Private" : "Public";          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;

for (let i = 0; i < badgeEmojis.length; i++) {
  badge9 += badgeEmojis[i];

  if ((i + 1) % maxBadgesPerLine === 0) {
    badge9 += '\n-# '; // Add a new line after max badges per line
  } else {
    badge9 += ' '; // Add a space between badges
  }
}

 //   return badge9;  // Returns the emoji string of badges




          
const embed = {
    title: title,
    description: description,
    url: `https://roblox.com/users/${userId}/profile`,
    color: 2894900,
    fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `-# ${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
    ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
    thumbnail: { url: thumbnailUrl }
};

            await msg.channel.send({ embeds: [embed] });

        } catch (error) {
          if (error.message === "Cannot read properties of null (reading 'name')") {
        // If a 404 error is caught here, it's an unexpected scenario, but handle it
            const embed = {
                description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
                color: 2894900
            };

            await msg.channel.send({ embeds: [embed] });
    } else {
        // Handle other errors
        console.error(`Error fetching user data: ${error.message}`);
        await msg.channel.send(`error: ${error.message.status}`);
}
        }
        
    }
});


client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name;
    const options = interaction.data.options || [];
  


    if (command === 'goodtest284') {
        const username = options.find(option => option.name === 'testte').value;
        const username2 = username;
        const formattedUsername2 = username.replace(/\\n|\/n/g, '%0A');
        const formattedUsername = formattedUsername2.replace("#", '%23');


      

      
      

        try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
            const userId = await getUserIdFromProfile(formattedUsername);
            const encodedUsername2 = encodeURIComponent(username2);

            if (!userId) {
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                                description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                                color: 2894900
                            }]
                        
                    }
                });
                return;
            }

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
if (error.response && error.response.status === 404) {
    // Fetch the thumbnail URL using the new endpoint
                    const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
                    let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
                  
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/Error.png";
}
  
    // Fetch the username and display name using the new API
const usernameResponse = await axios.post(
    `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
    {
        userIds: [userId],
        fields: ["names.username", "names.displayName"]
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

const userProfile = usernameResponse.data.profileDetails[0];

const username = userProfile?.names?.username;  // Use fallback if username is not available
const displayName = userProfile?.names?.displayName;  // Use fallback if displayName is not available


// Determine whether to display username only or display name with username
const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

    let accountCreatedDate;
    let currentUserId = userId; // Start with the initial userId
      let lastOnlineTimestamp34 = "Unknown"

    // Attempt to find a valid user by incrementing the userId
    while (true) {
        try {
            const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
            accountCreatedDate = new Date(creationDateResponse.data.created);
            break;
        } catch (error) {
            currentUserId++; // Increment the userId if not found
        }
    }
  
  
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
          //  console.log(lastOnlineTimestamp34)
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
           // console.log(lastOnlineTimestamp34)
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
       // console.log(error)
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    // Build the embed for the deleted account
    const deletedEmbed = {
        embeds: [
            {
                title: displayNameText, // Use the determined display name
                url: `https://rblx.trade/u/${encodeURIComponent(username)}`,
                color: 2894900,
                fields: [
                    { name: "ID", value: userId.toString(), inline: true },
                    { name: "Deleted", value: "True", inline: true },
                    { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                    { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
                    { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
                    { name: "Current Status", value: "Offline", inline: true }
                ],
                thumbnail: { url: thumbnailUrl }
            }
        ],
        attachments: []
    };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: deletedEmbed
                    
                });
                return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
  //  const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url12345);
      //  const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

       // if (match) {
       //     lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       

const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
              
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
} 
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
              
              
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response12 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response12.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
              
        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        } 
            
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;

for (let i = 0; i < badgeEmojis.length; i++) {
  badge9 += badgeEmojis[i];

  if ((i + 1) % maxBadgesPerLine === 0) {
    badge9 += '\n-# '; // Add a new line after max badges per line
  } else {
    badge9 += ' '; // Add a space between badges
  }
}     
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `-# ${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                 
                        data: bannedEmbed
                    
                });
                return;
            }

const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
       
          
          
          

        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response15 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response15.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

const presenceResponse = await axios.post('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }



let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url1234);
      //  const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

      //  if (match) {
       //     lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
  //  } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       
          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);



            const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
            const hasSign = signResponse.data;
            const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
            const hasHat = hatResponse.data;



            let badgeStatus = 'False';
            if (hasSign && hasHat) {
                badgeStatus = "Hat/Sign";
            } else if (hasSign) {
                badgeStatus = "Sign";
            } else if (hasHat) {
                badgeStatus = "Hat";
            }



const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
          
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
          
if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
          
          
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";
          

            const accountCreatedDate = new Date(user.created);
            const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
            if (rolimonsData.rap === null) {
                rolimonsData.rap = 'Private';
                rolimonsData.value = '—';
            }
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
          
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
                      const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
    const response34 = await getUserData2(`https://inventory.roblox.com/v1/users/${userId}/can-view-inventory`);
    
    // Set inventorystatus based on the response
    const inventorystatus = response34.data.canView === "false" ? "Private" : "Public";
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;

for (let i = 0; i < badgeEmojis.length; i++) {
  badge9 += badgeEmojis[i];

  if ((i + 1) % maxBadgesPerLine === 0) {
    badge9 += '\n-# '; // Add a new line after max badges per line
  } else {
    badge9 += ' '; // Add a space between badges
  }
}

 //   return badge9;  // Returns the emoji string of badges




          
            const embed = {
                embeds: [
                    {
                        title: title,
                        description: description,
                        url: `https://roblox.com/users/${userId}/profile`,
                        color: 2894900,
                        fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `-# ${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
                        ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                        thumbnail: { url: thumbnailUrl }
                    }
                ],
                attachments: []
            };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                   
                    data: embed
                
            });
        } catch (error) {
            console.error(error);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
        }
    }

});


async function getItemOwnership(userId, itemId) {
  try {
    const response = await getUserData2(`https://inventory.roblox.com/v1/users/${userId}/items/0/${itemId}/is-owned`);
    return response.data ? response.data : false;
  } catch (error) {
    console.log(error.response.data)
    return false;
  }
}

async function getItemNames(itemIds) {
  const chunkSize = 70;
  let result = [];

  for (let i = 0; i < itemIds.length; i += chunkSize) {
    const chunk = itemIds.slice(i, i + chunkSize);
    const params = chunk.map(id => `%7BassetId:${id}%7D`).join(',');
    const response = await getUserData(`https://www.roblox.com/item-thumbnails?params=[${params}]`);
    result = result.concat(response.data.map(item => ({ id: item.id, name: item.name })));
  }
  return result;
}

async function checkBanStatus(userId) {
    try {
        const response = await axios.get(`https://www.roblox.com/users/${userId}/profile`);
        if (response.request.res.responseUrl.startsWith('https://www.roblox.com/request-error?code=404')) {
            return true; // User is banned
        } else {
            return false; // User is not banned
        }
    } catch (error) {
        throw new Error(`Error checking ban status: ${error.message}`);
    }
}

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();

  if ([
    '-offsales', '-offsale', '-offsalecheck', '-ofs', '-checkoffsale', '-offsalescheck', '-checkoffsales'
  ].includes(command)) {
    const username = args[0];

    if (!username) {
      return msg.channel.send('Please provide a username.');
    }


    const userId = await getUserIdFromProfile(username);

    if (!userId) {
      return msg.channel.send({
        embeds: [{
          description: `[\`${username}\`](https://www.roblox.com/users/profile?username=${username}) does not exist`,
          color: 2894900
        }]
      });
    }

  const isBanned = await checkBanStatus(userId);

  if (isBanned) {
    return msg.channel.send({
      embeds: [
        {
          description: `[\`${username}\`](https://www.roblox.com/users/${userId}/profile) is terminated.`,
          color: 2894900
        }
      ]
    });
  }
    const statusMessage = await msg.channel.send('Scanning offsales...');
    
    const items = fs1.readFileSync('offsales.txt', 'utf8').split('\n');
    let ownedItems = [];

const ownershipChecks = items.map(async (item) => {
  const itemId = item.trim();
  if (!itemId) return null;

  try {
    // Make the request to the new API endpoint
    const response = await getUserData3(`https://inventory.roblox.com/v1/users/${userId}/items/0/${itemId}`);
    
    // Check if the item is owned based on the response structure
    const isOwned = response.data && response.data.length > 0;
    if (isOwned) {
      return { itemId }; // The item is owned, return the itemId
    } else {
      return null; // Item not owned, return null
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    return null; // Handle any errors gracefully
  }
});

const results = await Promise.all(ownershipChecks);

for (const result of results) {
  if (result === null) continue;
  if (result.terminated) {
    await statusMessage.edit({
      embeds: [{
        description: `[\`${username}\`](https://www.roblox.com/users/${userId}/profile) is terminated.`,
        color: 2894900
      }]
    });
    return;
  }
  if (result.itemId) {
    ownedItems.push(result.itemId);
  }
}
    if (ownedItems.length === 0) {
      ownedItems.push('This user does not own any of the preset offsales.');
    } else {
      const itemData = await getItemNames(ownedItems);
      ownedItems = itemData.map(item => `[${item.name}](https://www.roblox.com/catalog/${item.id}/Avis)`);
    }

    const thumbUrl = await getAvatar(userId);
    const embed = new MessageEmbed()
      .setTitle(`${username}'s Owned Offsales`)
      .setDescription(ownedItems.join('\n'))
      .setURL(`https://www.roblox.com/users/${userId}/profile`)
      .setColor(null)
      .setThumbnail(thumbUrl)
      .setFooter({ text: 'Avis | To suggest Offsales to be added to the list join our discord with -invite!' });

    statusMessage.edit({ embeds: [embed] });
  }
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name === 'goodtest9123') {
        const username2 = interaction.data.options[0].value;

        try {
            // Get the user ID from the username
            const userId = await getUserIdFromProfile(username2);

            // If userId is not found, send the error embed
            if (!userId) {

                    return client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [{
                                    description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${username2}) does not exist`,
                                    color: 2894900
                                }]
                            }
                        }
                    });
            }
            // Get the user data from Roblox API
            const userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            const { created, isBanned, name } = userResponse.data;

            // Calculate account age in terms of years, months, weeks, days, hours, minutes, and seconds
            const createdDate = new Date(created);
            const currentDate = new Date();
            const ageInMillis = currentDate - createdDate;

            // Calculate years, months, weeks, days, hours, minutes, and seconds
            const years = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 30));
            const weeks = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 7));
            const days = Math.floor(ageInMillis / (1000 * 60 * 60 * 24));
            const hours = Math.floor(ageInMillis / (1000 * 60 * 60));
            const minutes = Math.floor(ageInMillis / (1000 * 60));
            const seconds = Math.floor(ageInMillis / 1000);

            // Format the results for the account age
            const accountAge = `${years} years old, ${months % 12} months old, ${Math.floor(weeks % 4)} weeks old, ${days % 7} days old, ${hours % 24} hours old, ${minutes % 60} minutes old, ${seconds % 60} seconds old`;

            // Format the categories for years, months, weeks, etc.
            const categories = `**Years:** ${years.toLocaleString()} years old
            **Months:** ${months.toLocaleString()} months old
            **Weeks:** ${weeks.toLocaleString()} weeks old
            **Days:** ${days.toLocaleString()} days old
            **Hours:** ${hours.toLocaleString()} hours old
            **Minutes:** ${minutes.toLocaleString()} minutes old
            **Seconds:** ${seconds.toLocaleString()} seconds old`;

            // Get the avatar URL
            const avatarUrl = await getAvatar(userId);
            const creationDateTimestamp = Math.floor(new Date(created).getTime() / 1000);

            // Create the embed
            const embed = {
                title: name,
                description: `**Account age:** ${accountAge}\n\n## Categories:\n${categories}\n\n-# Original Timestamp: ${created}\n-# Relative Timestamp: <t:${creationDateTimestamp}:R>\n-# Created Date Timestamp: <t:${creationDateTimestamp}:F>\n-# Discord Timestamp: ${creationDateTimestamp}`,
                url: `https://www.roblox.com/users/${userId}/profile`,
                thumbnail: { url: avatarUrl },
                color: 2894900 // You can change the color as needed
            };

            // Send the response
            await client.api.interactions(interaction.id, interaction.token).callback.post({
           data: {
                type: 4,
                data: {
                    embeds: [embed],
                },
           }
            });

        } catch (error) {
            console.error(error);
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "error",
                },
            },
        });
        }
    }
});


const minRobux = 2;
const maxRobux = 20000000000;

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name !== 'goodtestbig') return;

    const robuxInput = interaction.data.options[0].value;

    if (!robuxInput) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'Please provide a valid number of Robux (e.g., 30,000, 1.6M).',
                },
            },
        });
    }
 //   console.log(robuxInput)
  //  const robuxAmount = parseRobux(robuxInput);
    if (robuxInput === null || robuxInput < minRobux || robuxInput > maxRobux) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Robux amount must be between ${minRobux.toLocaleString()} and ${maxRobux.toLocaleString()}.`,
                },
            },
        });
    }

    // Conversion logic: 30,000 Robux = $105, so every extra Robux adds about 0.0035 USD.
    const usdAmount = 105 + ((robuxInput - 30000) * 0.0035);

    return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: `${robuxInput.toLocaleString()} Robux is $${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD. (0.0035 Rate)`,
            },
        },
    });
});





const PREFIXES39 = ["-item9", "-i9", "-asset9", "-hat9", "-limited9", "-lim9"];

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();
  const itemName = args.join(' ').trim();

  if (!PREFIXES39.includes(command) || !itemName) return;

  try {
    if (itemName.toLowerCase() === "epic face") {
      const epicFaceId = 42070576;

      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${epicFaceId}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${epicFaceId}/count`);
      const thumbnailUrl = await fetchThumbnail(epicFaceId);
const response = await axios.get('https://raw.githubusercontent.com/super-sfr/avistest/refs/heads/main/test.json');
const data = response.data;

// Convert the data into a proper key-value object
const assetCopies = {};
const lines = data.split('\n'); // Split the data by newlines

// Parse each line into the object
lines.forEach(line => {
    const [assetId, copies] = line.split(':'); // Split by the colon
    if (assetId && copies) {
        assetCopies[assetId.trim()] = copies.trim(); // Add to the object
    }
});

// Find the copies count for the given assetId
const assetIdString = details.AssetId.toString();
let copies
// Check if the assetId exists in the parsed object
if (assetCopies.hasOwnProperty(assetIdString)) {
     copies = assetCopies[assetIdString];  // Retrieve the copies count
   // console.log(`Asset ID: ${assetIdString}, Copies: ${copies.toLocaleString()}`);
} else {
   // console.log(`Asset ID ${assetIdString} not found.`);
}
const copiesNumber = Number(copies);
          const copiesDescription = copies ? `-# **Estimated Copies: ${copiesNumber.toLocaleString()}**` : null;

      const embed = new MessageEmbed()
        .setTitle(details.Name)
        .setURL(`https://www.roblox.com/catalog/${epicFaceId}`)
        .setColor(2894900)
        .addFields(
          { name: 'Asset ID', value: epicFaceId.toString(), inline: true },
          { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
          { name: 'Item Type', value: ASSET_MAPPINGS[details.AssetTypeId] || 'Unknown', inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );
          if (copiesDescription) {
      embed.setDescription(copiesDescription);
    }


      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);
      if (details.Description) embed.addField('Description', details.Description);

      message.channel.send({ embeds: [embed] });
      return;
    }
    // Fetch Rolimons Data
    const rolimonsResponse = await axios.get(ROLIMONS_API);
    const { items } = rolimonsResponse.data;

    // Search in Rolimons
    let foundItem = null;
    for (const [itemId, itemData] of Object.entries(items)) {
      if (
        itemData[0].toLowerCase() === itemName.toLowerCase() || 
        itemData[1]?.toLowerCase() === itemName.toLowerCase()
      ) {
        foundItem = { itemId, itemData };
        break;
      }
    }

    if (foundItem) {
      const [name, abbreviation, rap, value, defaultValue, demand, trend, projected, hyped, rare] = foundItem.itemData;
      const { available, premium } = await fetchCopies(foundItem.itemId);
      const thumbnailUrl = await fetchThumbnail(foundItem.itemId);
      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${foundItem.itemId}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${foundItem.itemId}/count`)
      let csrfToken = ""
      try {
            await axios.post('https://catalog.roblox.com/v1/catalog/items/details', {}, {
                headers: {
                    Cookie: `.ROBLOSECURITY=${ROBLOSECURITY3}`
                }
            });
        } catch (error) {
              csrfToken = error.response.headers['x-csrf-token'];
            //} else {
            //    throw new Error('Failed to retrieve CSRF token');
           // }
        }

        if (!csrfToken) {
            throw new Error('CSRF token not found');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                Cookie: `.ROBLOSECURITY=${ROBLOSECURITY3}`
            }
        };

        const response = await axios.post(
            'https://catalog.roblox.com/v1/catalog/items/details',
            {
                items: [
                    {
                        id: foundItem.itemId,
                        itemType: "Asset"
                    }
                ]
            },
            config
        );

        const data = response.data;

            const item = data?.data?.[0];

            // Set lowestPrice to lowestResalePrice or "N/A" if null
            const lois = item.lowestResalePrice !== null ? item.lowestResalePrice : "N/A";

       //     console.log(lois);


      // Create Embed
      const embed = new MessageEmbed()
        .setTitle(`${name} ${abbreviation ? `(${abbreviation})` : ''} ${rare === 1 ? '<:Rolimons_Rare:1314017441516355615>' : ''} ${projected === 1 ? '<:Rolimons_Projected:1314017571238051901>' : ''}`)
        .setURL(`https://www.rolimons.com/item/${foundItem.itemId}`)
        .setColor(2894900)
        .setFooter(`Asset ID: ${foundItem.itemId}`)
        .addFields(
          { name: 'Lowest Price', value: lois.toLocaleString(), inline: true },
          { name: 'Rap', value: rap.toLocaleString(), inline: true },
          { name: 'Value', value: defaultValue === -1 ? 'N/A' : defaultValue.toLocaleString(), inline: true },
          { name: 'Demand', value: DEMAND_MAP[demand + 1], inline: true },
          { name: 'Trend', value: TREND_MAP[trend + 1], inline: true },
          { name: 'Premium/Available', value: `${premium}/${available}`, inline: true },
          { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
          { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
          { name: 'Favorites', value: `${favorites.data}`, inline: true }
        );

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);

      message.channel.send({ embeds: [embed] });
      return;
    }

    // Search in Roblox Catalog
    const catalogResponse = await getUserData3(`https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(itemName)}&category=All&creatorName=roblox&salesTypeFilter=1&includeNotForSale=true&limit=120`);
 //   console.log(catalogResponse)
    const catalogItems = catalogResponse.data.data;

    for (const item of catalogItems) {
      if (item.itemType === 'Bundle') {
        // Emit a `-bundle` event for the bundle
        return client.emit('messageCreate', { content: `-bundleid ${item.id}`, author: message.author, channel: message.channel });
      }

      if (item.itemType !== 'Asset') continue;

      const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${item.id}/details`);
      const details = detailsResponse.data;
      const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${item.id}/count`)

      // Handle Limited Items
if (
    details.IsLimited || 
    details.IsLimitedUnique || 
    (details.CollectiblesItemDetails && details.CollectiblesItemDetails.IsLimited)
) {
    const rolimonsItemId = Object.keys(items).find((id) => id === item.id.toString());
    if (rolimonsItemId) {
        const foundLimitedItem = { itemId: rolimonsItemId, itemData: items[rolimonsItemId] };
       // console.log(foundLimitedItem.itemData[0])
        return client.emit('messageCreate', { content: `-item ${foundLimitedItem.itemData[0]}`, author: message.author, channel: message.channel });
    }
}

      const thumbnailUrl = await fetchThumbnail(details.AssetId);

      // Create Embed
const response = await axios.get('https://raw.githubusercontent.com/super-sfr/avistest/refs/heads/main/test.json');
const data = response.data;

// Convert the data into a proper key-value object
const assetCopies = {};
const lines = data.split('\n'); // Split the data by newlines

// Parse each line into the object
lines.forEach(line => {
    const [assetId, copies] = line.split(':'); // Split by the colon
    if (assetId && copies) {
        assetCopies[assetId.trim()] = copies.trim(); // Add to the object
    }
});

// Find the copies count for the given assetId
const assetIdString = details.AssetId.toString();
let copies
// Check if the assetId exists in the parsed object
if (assetCopies.hasOwnProperty(assetIdString)) {
     copies = assetCopies[assetIdString];  // Retrieve the copies count
   // console.log(`Asset ID: ${assetIdString}, Copies: ${copies.toLocaleString()}`);
} else {
   // console.log(`Asset ID ${assetIdString} not found.`);
}
const copiesNumber = Number(copies);
          const copiesDescription = copies ? `-# **Estimated Copies: ${copiesNumber.toLocaleString()}**` : null;

    // Create the embed
    const embed = new MessageEmbed()
      .setTitle(details.Name)
      .setURL(`https://www.roblox.com/catalog/${details.AssetId}`)
      .setColor(2894900)
      .addFields(
        { name: 'Asset ID', value: details.AssetId.toString(), inline: true },
        { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
        { name: 'Item Type', value: ASSET_MAPPINGS[details.AssetTypeId] || 'Unknown', inline: true },
        { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
        { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
        { name: 'Favorites', value: `${favorites.data}`, inline: true }
      );

    // If copies data is found, set the description
    if (copiesDescription) {
      embed.setDescription(copiesDescription);
    }

//    return embed;

      if (thumbnailUrl) embed.setThumbnail(thumbnailUrl);
      if (details.Description) embed.addField('Description', details.Description);

      message.channel.send({ embeds: [embed] });
      return;
    }

    // If not found and item name is numeric
    if (/^\d+$/.test(itemName)) {
      return client.emit('messageCreate', { content: `-assetid ${itemName}`, author: message.author, channel: message.channel });
    }

if (catalogResponse.data && catalogResponse.data.data.length === 0) {
  const encodedItemUri = encodeURIComponent(itemName);  // Ensure the itemName is URL encoded
  const embed = {
    description: `[${'``'}${itemName}${'``'}](https://www.roblox.com/catalog?Keyword=${encodedItemUri}&Category=1&CreatorName=Roblox&salesTypeFilter=1&IncludeNotForSale) was not found`,
    color: 2894900,  // Red color for the embed
  };
  return message.channel.send({ embeds: [embed] });
} else if (catalogResponse.data.keyword === "###") {
  const encodedItemUri = encodeURIComponent(itemName);  // Ensure the itemName is URL encoded
  const embed = {
    description: `[${'``'}${itemName}${'``'}](https://www.roblox.com/catalog?Keyword=${encodedItemUri}&Category=1&CreatorName=Roblox&salesTypeFilter=1&IncludeNotForSale) was censored`,
    color: 2894900,  // Red color for the embed
  };
  return message.channel.send({ embeds: [embed] });
}
    
    
} catch (error) {
  console.error(error);
  if (/^\d+$/.test(itemName)) {
    return client.emit('messageCreate', { content: `-assetid ${itemName}`, author: message.author, channel: message.channel });
  }

  // Check if the response indicates the item was censored
  if (error && error.message && error.message.includes('{"keyword":"###","previousPageCursor":null,"nextPageCursor":null,"data":null}')) {
    const encodedItemUri = encodeURIComponent(itemName);  // Ensure the itemName is URL encoded
    const embed = {
      description: `[${'``'}${itemName}${'``'}](https://www.roblox.com/catalog?Keyword=${encodedItemUri}&Category=1&CreatorName=Roblox&salesTypeFilter=1&IncludeNotForSale) was censored`,
      color: 2894900,  // Red color for the embed
    };
    return message.channel.send({ embeds: [embed] });
  }

  // Check if the response has no items in the data array (empty array)


  message.channel.send('Item Not Found or server error');
}
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const command = interaction.data.name;
  const options = interaction.data.options || [];
  
  if (command === 'item') {
    const itemNameOption = options.find(option => option.name === 'itemname');
    const itemName = itemNameOption?.value?.trim();

    if (!itemName) {
      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4, // Respond with a message
          data: { content: 'Please provide an item name to search for.' },
        },
      });
    }

    try {
      // Fetch Rolimons Data
      const rolimonsResponse = await axios.get(ROLIMONS_API);
      const { items } = rolimonsResponse.data;

      // Search in Rolimons
      let foundItem = null;
      for (const [itemId, itemData] of Object.entries(items)) {
        if (
          itemData[0].toLowerCase() === itemName.toLowerCase() || 
          itemData[1]?.toLowerCase() === itemName.toLowerCase()
        ) {
          foundItem = { itemId, itemData };
          break;
        }
      }

      if (foundItem) {
        const [name, abbreviation, rap, value, defaultValue, demand, trend, projected, hyped, rare] = foundItem.itemData;
        const { available, premium } = await fetchCopies(foundItem.itemId);
        const thumbnailUrl = await fetchThumbnail(foundItem.itemId);
        const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${foundItem.itemId}/details`);
        const details = detailsResponse.data;
        const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${foundItem.itemId}/count`);

        const embed = {
          title: `${name} ${abbreviation ? `(${abbreviation})` : ''} ${rare === 1 ? '<:Rolimons_Rare:1314017441516355615>' : ''} ${projected === 1 ? '<:Rolimons_Projected:1314017571238051901>' : ''}`,
          url: `https://www.rolimons.com/item/${foundItem.itemId}`,
          color: 2894900,
          fields: [
            { name: 'Asset ID', value: foundItem.itemId, inline: true },
            { name: 'Rap', value: rap.toLocaleString(), inline: true },
            { name: 'Value', value: defaultValue === -1 ? 'N/A' : defaultValue.toLocaleString(), inline: true },
            { name: 'Demand', value: DEMAND_MAP[demand + 1], inline: true },
            { name: 'Trend', value: TREND_MAP[trend + 1], inline: true },
            { name: 'Premium/Available', value: `${premium}/${available}`, inline: true },
            { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
            { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
            { name: 'Favorites', value: `${favorites.data}`, inline: true },
          ],
          thumbnail: {
            url: thumbnailUrl,
          },
        };

        // Add description as a field if it's not null, empty, or blank


        return client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: { embeds: [embed] },
          },
        });
      }

      // Search in Roblox Catalog
      const catalogResponse = await getUserData3(`https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(itemName)}&category=All&creatorName=roblox&salesTypeFilter=1&includeNotForSale=true&limit=120`);
      const catalogItems = catalogResponse.data.data;

      for (const item of catalogItems) {
        if (item.itemType !== 'Asset') continue;
        


        const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${item.id}/details`);
        const details = detailsResponse.data;
        
      if (
    details.IsLimited || 
    details.IsLimitedUnique || 
    (details.CollectiblesItemDetails && details.CollectiblesItemDetails.IsLimited)
) {    
        

        const rolimonsResponse = await axios.get(ROLIMONS_API);
      const { items } = rolimonsResponse.data;
            const rolimonsItemId = Object.keys(items).find((id) => id === item.id.toString());
        let foundLimitedItem
    if (rolimonsItemId) {
         foundLimitedItem = { itemId: rolimonsItemId, itemData: items[rolimonsItemId] };
    }

      // Search in Rolimons
      let foundItem = null;
      for (const [itemId, itemData] of Object.entries(items)) {
        if (
          itemData[0].toLowerCase() === foundLimitedItem.itemData[0].toLowerCase() || 
          itemData[1]?.toLowerCase() === foundLimitedItem.itemData[0].toLowerCase()
        ) {
          foundItem = { itemId, itemData };
          break;
        }
      }

      if (foundItem) {
        const [name, abbreviation, rap, value, defaultValue, demand, trend, projected, hyped, rare] = foundItem.itemData;
        const { available, premium } = await fetchCopies(foundItem.itemId);
        const thumbnailUrl = await fetchThumbnail(foundItem.itemId);
        const detailsResponse = await getUserData3(`https://economy.roblox.com/v2/assets/${foundItem.itemId}/details`);
        const details = detailsResponse.data;
        const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${foundItem.itemId}/count`);

        const embed = {
          title: `${name} ${abbreviation ? `(${abbreviation})` : ''} ${rare === 1 ? '<:Rolimons_Rare:1314017441516355615>' : ''} ${projected === 1 ? '<:Rolimons_Projected:1314017571238051901>' : ''}`,
          url: `https://www.rolimons.com/item/${foundItem.itemId}`,
          color: 2894900,
          fields: [
            { name: 'Asset ID', value: foundItem.itemId, inline: true },
            { name: 'Rap', value: rap.toLocaleString(), inline: true },
            { name: 'Value', value: defaultValue === -1 ? 'N/A' : defaultValue.toLocaleString(), inline: true },
            { name: 'Demand', value: DEMAND_MAP[demand + 1], inline: true },
            { name: 'Trend', value: TREND_MAP[trend + 1], inline: true },
            { name: 'Premium/Available', value: `${premium}/${available}`, inline: true },
            { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
            { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:D>`, inline: true },
            { name: 'Favorites', value: `${favorites.data}`, inline: true },
          ],
          thumbnail: {
            url: thumbnailUrl,
          },
        };

        // Add description as a field if it's not null, empty, or blank


        return client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: { embeds: [embed] },
          },
        });
      }
  }
        const response = await axios.get('https://raw.githubusercontent.com/super-sfr/avistest/refs/heads/main/test.json');
const data = response.data;

// Convert the data into a proper key-value object
const assetCopies = {};
const lines = data.split('\n'); // Split the data by newlines

// Parse each line into the object
lines.forEach(line => {
    const [assetId, copies] = line.split(':'); // Split by the colon
    if (assetId && copies) {
        assetCopies[assetId.trim()] = copies.trim(); // Add to the object
    }
});

// Find the copies count for the given assetId
const assetIdString = details.AssetId.toString();
let copies
// Check if the assetId exists in the parsed object
if (assetCopies.hasOwnProperty(assetIdString)) {
     copies = assetCopies[assetIdString];  // Retrieve the copies count
   // console.log(`Asset ID: ${assetIdString}, Copies: ${copies.toLocaleString()}`);
} else {
   // console.log(`Asset ID ${assetIdString} not found.`);
}
const copiesNumber = Number(copies);
          const copiesDescription = copies ? `-# **Estimated Copies: ${copiesNumber.toLocaleString()}**` : null;
        
        const favorites = await getUserData3(`https://catalog.roblox.com/v1/favorites/assets/${item.id}/count`);
        const thumbnailUrl = await fetchThumbnail(details.AssetId);

        const embed = {
          title: details.Name,
          description: copiesDescription,
          url: `https://www.roblox.com/catalog/${details.AssetId}`,
          color: 2894900,
          fields: [
            { name: 'Asset ID', value: details.AssetId.toString(), inline: true },
            { name: 'Price', value: details.IsForSale ? `${details.PriceInRobux.toLocaleString()}` : 'Off Sale', inline: true },
            { name: 'Item Type', value: ASSET_MAPPINGS[details.AssetTypeId] || 'Unknown', inline: true },
            { name: 'Created', value: `<t:${Math.floor(new Date(details.Created).getTime() / 1000)}:D>`, inline: true },
            { name: 'Updated', value: `<t:${Math.floor(new Date(details.Updated).getTime() / 1000)}:d>`, inline: true },
            { name: 'Favorites', value: `${favorites.data}`, inline: true },
          ],
          thumbnail: {
            url: thumbnailUrl,
          },
        };

        // Add description as a field if it's not null, empty, or blank
        if (details.Description && details.Description.trim()) {
          embed.fields.push({
            name: 'Description',
            value: details.Description,
            inline: false,
          });
        }


        return client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: '',
              embeds: [embed],
            },
          },
        });
      }

      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: { content: 'Item not found' },
        },
      });
    } catch (error) {
      console.error(error);
      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: { content: 'error' },
        },
      });
    }
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name === 'avatar') {
        const username = interaction.data.options.find(opt => opt.name === 'username')?.value;
        const size = interaction.data.options.find(opt => opt.name === 'size')?.value || '420x420';

        try {
            // Function to get user ID from username
            const userId = await getUserIdFromProfile(username);
          
        if (!userId) {
            const embed = new MessageEmbed()
                .setDescription(`[${'``'}${username}${'``'}](https://www.roblox.com/users/profile?username=${username}) does not exist.`)
                .setColor(2894900);
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4, // Response type: Channel Message with Embed
                    data: {
                        embeds: [embed]
                    }
                }
            });
        }
          
            const avatarUrl = await getAvatar(userId, size);

            // Respond to the interaction
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                type: 4,
                data: {
                    content: avatarUrl || 'Avatar not found.',
                },
            });
        } catch (error) {
            console.error('Error fetching avatar:', error.message);
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                type: 4,
                data: {
                    content: 'error try again',
                },
            });
        }
    }
});


client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name;
    const args = interaction.data.options;

    if (command === 'goodtest000') {
        const username = args.find(arg => arg.name === 'g00d').value;
        const itemType = args.find(arg => arg.name === 'g00d2')?.value || 'Hat'; // Default to 'Hat' if not provided
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
        await handlePagesCommand(interaction, username, itemType);
    }
});


function getUrlForItemType(itemType, userId) {
    const itemTypeMapping = {
        'shorts': 'ShortsAccessory',
        'short': 'ShortsAccessory',
        'skirts': 'DressSkirtAccessory',
        'skirt': 'DressSkirtAccessory',
        'hat': 'Hat',
        'hats': 'Hat',
        'pants': 'PantsAccessory',
        'pant': 'PantsAccessory',
        'jacket': 'JacketAccessory',
        'jackets': 'JacketAccessory',
        'sweater': 'SweaterAccessory',
        'sweaters': 'SweaterAccessory',
        'shirts': 'ShirtAccessory',
        'shirt': 'ShirtAccessory',
        'tshirt': 'TShirtAccessory',
        'tshirts': 'TShirtAccessory',
        't-shirt': 'TShirtAccessory',
        't-shirts': 'TShirtAccessory',
        'shoes': 'LeftShoeAccessory',
        'shoe': 'LeftShoeAccessory',
        'head': 'DynamicHead',
        'heads': 'DynamicHead',
        'dynamichead': 'DynamicHead',
        'dynamicheads': 'DynamicHead',
        'hair': 'HairAccessory',
        'hairs': 'HairAccessory',
        'emote': 'EmoteAnimation',
        'emotes': 'EmoteAnimation',
        'classichead': 'Head',
        'classicheads': 'Head',
        'classic-heads': 'Head',
        'classic-head': 'Head',
        'bundle': 'Torso',
        'bundles': 'Torso',
        'package': 'Torso',
        'packages': 'Torso',
        'gear': 'Gear',
        'gears': 'Gear',
        'face': 'Face',
        'faces': 'Face',
        'faceaccessory': 'FaceAccessory',
        'faceaccessorys': 'FaceAccessory',
        'neck': 'NeckAccessory',
        'necks': 'NeckAccessory',
        'shoulder': 'ShoulderAccessory',
        'shoulders': 'ShoulderAccessory',
        'front': 'FrontAccessory',
        'fronts': 'FrontAccessory',
        'waist': 'WaistAccessory',
        'back': 'BackAccessory',
        'animation': 'Animation',
        'animations': 'Animation',
        'avatar-animation': 'idleanimation',
        'avataranimation': 'idleanimation',
        'avataranimations': 'idleanimation',
        'avatar-animations': 'idleanimation',
        'idle': 'idleanimation',
        'walk': 'walkanimation',
        'run': 'runanimation',
        'fall': 'fallanimation',
        'climb': 'climbanimation',
        'swim': 'swimanimation',
        'idleanimation': 'idleanimation',
        'walkanimation': 'walkanimation',
        'runanimation': 'runanimation',
        'fallanimation': 'fallanimation',
        'climbanimation': 'climbanimation',
        'swimanimation': 'swimanimation',
        'idle-animation': 'idleanimation',
        'walk-animation': 'walkanimation',
        'run-animation': 'runanimation',
        'fall-animation': 'fallanimation',
        'climb-animation': 'climbanimation',
        'swim-animation': 'swimanimation',
        'classictshirt': 'tshirt',
        'classic-tshirt': 'tshirt',
        'classictshirts': 'tshirt',
        'classic-tshirts': 'tshirt',
        'classicshirt': 'shirt',
        'classic-shirt': 'shirt',
        'classicshirts': 'shirt',
        'classic-shirts': 'shirt',
        'classic-pants': 'pants',
        'classicpants': 'pants',
        'classic-pant': 'pants',
        'classicpant': 'pants',
        'classict-shirt': 'tshirt',
        'classic-t-shirt': 'tshirt',
        'classict-shirts': 'tshirt',
        'classic-t-shirts': 'tshirt',
        'decals': 'decal',
        'decal': 'decal',
        'models': 'model',
        'model': 'model',
        'plugins': 'plugin',
        'plugin': 'plugin',
        'music': 'audio',
        'audio': 'audio',
        'sound': 'audio',
        'audios': 'audio',
        'video': 'video',
        'videos': 'video',
        'meshpart': 'MeshPart',
        'gamepass': 'GamePass',
        'gamepasses': 'GamePass',
        'eyebrow': 'eyebrowaccessory', 
        'eyebrows': 'eyebrowaccessory',
        'eyebrowaccessory': 'eyebrowaccessory',    
        'mood': 'moodanimation', 
        'moods': 'moodanimation', 
        'moodanimation': 'moodanimation', 
        'eyelashaccessory': 'eyelashaccessory', 
        'eyelash': 'eyelashaccessory', 
        'eyelashs': 'eyelashaccessory', 
    };
  


    const mappedType = itemTypeMapping[itemType.toLowerCase()];

    if (mappedType) {
        return `${apiUrl}${userId}/inventory/${mappedType}`;
    }

    return null;
}

const apiUrl = 'https://inventory.roblox.com/v1/users/';
const userIdApiUrl = 'https://users.roblox.com/v1/usernames/users';


async function getItemDetails(apiUrl) {
    try {
        const response = await getUserData3(apiUrl, {
            params: {
                limit: 1,
                sortOrder: 'Desc'
            }
        });

        const total = response.data.total;
        return { total };
    } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

async function handlePagesCommand(interaction, username, itemType) {
    // Get userId from username
    try {
        const userId = await getUserIdFromProfile(username)

        const name = await getCorrectUsername(userId);
       // console.log(name)
        const userInventoryUrl = getUrlForItemType(itemType, userId);

        // Handle total case
        if (itemType.toLowerCase() === 'total') {
            let totalItems = 0;
            let totalPageCount = 0;
            const itemTypes = [
                'Hat', 'Face', 'FaceAccessory', 'Neck', 'Shoulder', 'Front', 'Back', 'Waist',
                'Gear', 'Bundle', 'classichead', 'emote', 'hair', 'head', 'shoes', 'shirt', 'tshirt',
                'pants', 'jacket', 'sweater', 'skirts', 'shorts'
            ];

            // Iterate through all item types and count total items
            for (const type of itemTypes) {
                const url = getUrlForItemType(type, userId);
                if (url) {
                    const { total } = await getItemDetails(url);
                    totalItems += total;
                }
            }

            totalPageCount = Math.ceil(totalItems / 30);
            const avatarUrl = await getAvatar(userId);


              
            const embed = {
                embeds: [
                    {
                title: name,
                url: `https://www.roblox.com/users/${userId}`,
                color: 2894900,
                thumbnail: {
                    url: avatarUrl
                },
                fields: [
                    { name: 'Total Items', value: totalItems.toString(), inline: true },
                    { name: 'Pages', value: totalPageCount.toString(), inline: false }
                        ],


                    }
                ],
                attachments: []
            };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed
                    
                });
        }

        // Handle other item types
        if (userInventoryUrl) {
            const { total } = await getItemDetails(userInventoryUrl);
            const thumbnailUrl = await getAvatar(userId);

            const pageCount = Math.ceil(total / 30);


            const embed = {
                embeds: [
                    {
                 title: name,
                url: `https://www.roblox.com/users/${userId}`,
                color: 2894900,
                thumbnail: {
                    url: thumbnailUrl
                },
                fields: [
                    { name: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Owned`, value: total.toString(), inline: true },
                    { name: 'Pages', value: pageCount.toString(), inline: false }
                        ],

                    }
                ],
                attachments: []
            };

                            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed
                    
                });
        } else {
          //  await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

           //         data: {
            //            content: 'Invalid Item Type'
             //       }
                
          //  });
        }
    } catch (error) {
     //   console.error('Error:', error.response ? error.response.data : error.message);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
    }
}

async function respondToInteraction(interaction, responseData) {
    await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
        data: responseData
    });
}

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name !== 'goodtest01232') return;

    const args = interaction.data.options;
    const targetUsername = args[0]?.value; // First argument: username



    try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
        const userId = await getUserIdFromProfile(targetUsername);

        if (!userId) {
const embed = {
    embeds: [
        {
            description: `[${'``'}${targetUsername}${'``'}](https://www.roblox.com/users/profile?username=${targetUsername}) does not exist.`,
            color: 2894900
        }
    ],
    attachments: []
};
                            return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed
                    
                });
        }

        const correctUsername = await getCorrectUsername(userId);
        const assetIds = [1567446, 102611803, 93078560, 18824203];
        const assetsData = [];
        const assetNames = {};

        // Fetch asset names and thumbnails using the correct GET request
        try {
            const url = `https://www.roblox.com/item-thumbnails?params=[${assetIds.map(id => `{assetId:${id}}`).join(',')}]`;
            const response = await getUserData(url);
            const items = response.data;

            // Store asset names in the assetNames object
            items.forEach(item => {
                if (item.name) {
                    assetNames[item.id] = item.name; // Map asset ID to its name
                }
            });
        } catch (error) {
        //    console.error('Failed to fetch asset names:', error);
        }

        for (const assetId of assetIds) {
            let ownsAsset2 = "";
            let obtainedDate = null;
            try {
                const isOwnedResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/${assetId}/is-owned`);
                ownsAsset2 = isOwnedResponse.data;
            } catch (err) {
                // Handle termination or error
                if (err.response?.data?.errors?.[0]?.code === 1) {
const embed = {
    embeds: [
        {
            description: `[${'``'}${correctUsername}${'``'}](https://www.roblox.com/users/profile?username=${correctUsername}) is terminated.`,
            color: 2894900
        }
    ],
    attachments: []
};
                            return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed
                    
                });
                }

         //       console.error('Unexpected error during ownership check:', err);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error try again'
                    }
                
            });
            }

            const ownsAsset = ownsAsset2;

            // Fetch inventory data to get acquisition timestamp if the item is owned
            try {
                if (ownsAsset) {
                    let nextPageCursor = null;
                    do {
                        const url = `https://inventory.roblox.com/v2/users/${userId}/inventory?assetTypes=Hat&filterDisapprovedAssets=false&limit=100&sortOrder=Desc${nextPageCursor ? `&cursor=${nextPageCursor}` : ''}`;
                        const inventoryResponse = await getUserData(url);
                        const inventoryData = inventoryResponse.data;

                        const foundItem = inventoryData.data.find(item => item.assetId === parseInt(assetId));
                        if (foundItem) {
                            obtainedDate = foundItem.created;
                            break;
                        }

                        nextPageCursor = inventoryData.nextPageCursor;
                    } while (nextPageCursor);
                }
            } catch (error) {
           //     console.error(`An error occurred while fetching inventory for asset ID ${assetId}:`, error);
            }

            if (ownsAsset) {
                assetsData.push({ assetId, obtainedDate });
            }
        }

        const thumbnailData = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
        const userThumbnail = thumbnailData.data.data[0].imageUrl || '';

const embed = {
    embeds: [
        {
            title: correctUsername,
            url: `https://www.roblox.com/users/${userId}`,
            thumbnail: {
                url: userThumbnail
            },
            color: 2894900,
            description: assetsData.length === 0 ? 'No verified items found.' : ''
        }
    ],
    attachments: []
};

if (assetsData.length > 0) {
    for (const asset of assetsData) {
        const { assetId, obtainedDate } = asset;
        const assetName = assetNames[assetId] || `Asset ID: ${assetId}`;
        embed.embeds[0].fields = embed.embeds[0].fields || [];
        embed.embeds[0].fields.push({
            name: assetName,
            value: `Owned: [True](https://www.roblox.com/catalog/${assetId})${obtainedDate ? `\nObtained: <t:${Math.floor(new Date(obtainedDate).getTime() / 1000)}:D>` : ''}`,
            inline: false
        });
    }
}


                            return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed
                    
                });

    } catch (err) {
      //  console.error('Error:', err);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
    }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const commandName = interaction.data.name;
    const user = interaction.member?.user || interaction.user; // Fallback to handle different interaction structures
    const userId = user.id;
    const currentTime = Date.now();

    if (commandName === 'generate') {
       const type = interaction.data.options?.find(option => option.name === 'option')?.value?.toLowerCase();
        const show = interaction.data.options?.find(option => option.name === 'show')?.value || false; // Default to false
       await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                data: show ? {} : { flags: 64 } // If show is false, make it ephemeral
            },
        });
        if (cooldowns[userId] && currentTime - cooldowns[userId] < 3000) {
            const timeLeft = Math.ceil((3000 - (currentTime - cooldowns[userId])) / 1000);
            await respond2(interaction, `Please wait ${timeLeft} seconds before using this command again.`, true);
            return;
        }

        cooldowns[userId] = currentTime;

       
        let gened;

        switch (type) {
            case '5char':
            case '5character':
            case '5c':
                gened = await gener7(5);
                break;
            case '5_letter':
            case '5_l':
                gened = await underscore32(5);
                break;
            case '5_char':
            case '5_c':
            case '5_character':
                gened = await underscore323(5);
                break;
            case '5letter_':
            case '5l_':
                gened = await undere2(5);
                break;
            case '5char_':
            case '5c_':
            case '5character_':
                gened = await undere23(5);
                break;
            case '6l':
            case '6letter':
                gened = await genpee8(6);
                break;
            case 'word':
            case 'realword':
            case 'actualword':
                gened = await word();
                break;
            case 'leetspeak':
            case 'leet':
            case '1337':
                gened = await genleet(8);
                break;
            case 'barcode':
                gened = await generateBarcodeUsername();
                break;
            case 'leetspeak5c':
            case 'leet5c':
            case '13375c':
            case 'leetspeak5char':
            case 'leet5char':
            case '13375char':
            case 'leetspeak5character':
            case 'leet5character':
            case '13375character':
                gened = await genleet(6);
                break;
            default:
                await respond2(interaction, 'Valid types: `word`, `6letter`, `5_letter`, `5letter_`, `5_character`, `5character_`, `5character`, `leetspeak`, `leetspeak5char`', true);
                return;
        }

        if (!gened) {
            await respond2(interaction, 'Failed to generate.', true);
            return;
        }

        // Respond based on the value of 'show'. If true, it's a public response; if false, it's ephemeral (flags = 64).
        await respond2(interaction, `Generated username: ${gened}`, show);
    }
});

function generateBarcodeUsername() {
    const length = Math.floor(Math.random() * (20 - 15 + 1)) + 15; // Random length between 15 and 20
    let username = '';
    const chars = ['I', 'l'];
    
    for (let i = 0; i < length; i++) {
        username += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return username;
}

async function respond2(interaction, message, ephemeral = false) {
    const flags = ephemeral ? 64 : 0;
    await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
            data: {
                content: message,
                flags: flags
            }
        
    });
}






client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if (interaction.data.name === 'asseticon') {
        const userId = interaction.data.options.find(opt => opt.name === 'assetid')?.value;
        const size = interaction.data.options.find(opt => opt.name === 'size')?.value || '420x420';

        try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });

          

          
            const avatarUrl = await getItemAvatar(userId, size);

            // Respond to the interaction
return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
    data: avatarUrl 
        ? { content: avatarUrl } 
        : {
            embeds: [
                {
                    description: `[${'``'}IID: ${userId}${'``'}](https://www.roblox.com/catalog/${userId}) does not exist`,
                    color: 2894900
                }
            ]
        }
});
        } catch (error) {
            console.error('Error fetching avatar:', error.message);
            return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
        }
    }
});



async function getItemAvatar(userId, size = "420x420") {
    try {
        let requestSize = size;

        // Request 420x420 initially if the size is one of the larger ones
if ([
    '1x1'
].includes(size)) {
    requestSize = '420x420';
}
        const response = await axios.get(`https://thumbnails.roblox.com/v1/assets?assetIds=${userId}&returnPolicy=PlaceHolder&size=${requestSize}&format=Png&isCircular=false`);

        if (response.data && response.data.data && response.data.data.length > 0) {
            const thumbnailData = response.data.data[0];
            let avatarUrl = thumbnailData.imageUrl;

            if (thumbnailData.state === "Blocked" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/ContentDeleted.jpg";
            } else if (thumbnailData.state === "InReview" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/InReview.png";
            } else if (thumbnailData.state === "Error" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/Error.png";
            } else if (thumbnailData.state === "Pending" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/Pending.png";
            }

            // If the requested size was a larger one, adjust the final URL
            if ([
    '1x1'].includes(size) && avatarUrl) {
                avatarUrl = avatarUrl.replace('420/420', size.replace('x', '/'));
            }

            return avatarUrl;
        }
    } catch (error) {
        console.error("Error fetching avatar:", error.message);
    }
    return null;
}

const GITHUB_TOKEN = process.env.GITHUB;
const USERNAME = 'roblox'; // Replace with the desired GitHub username

if (!GITHUB_TOKEN) {
    console.error('Error: GitHub token is not set in environment variables.');
    process.exit(1);
}

const fetchGitHubUser = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching GitHub user:', error.response ? error.response.data : error.message);
    }
};

//fetchGitHubUser(USERNAME);





async function getCsrfToken() {
    try {
        await axios.post('https://www.pekora.zip/apisite/economy/v1/purchases/products/1', {}, {
            headers: { 'Cookie': `.ROBLOSECURITY=${process.env.PAKORA}` },
'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/116.0.0.0"
        });
    } catch (error) {
        return error.response.headers['x-csrf-token'];
    }
}

async function fetchAndBuyItems() {
    const csrfToken = await getCsrfToken();
    const concurrency = 1; // Number of parallel requests
    const totalItems = 39000;
    
    for (let i = 30000; i <= totalItems; i += concurrency) {
        const promises = [];
        
        for (let itemId = i; itemId < i + concurrency && itemId <= totalItems; itemId++) {
            promises.push((async () => {
                try {
                    const productResponse = await axios.get(`https://www.pekora.zip/marketplace/productinfo?assetId=${itemId}`, {
                        headers: {
                            'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                            'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
                        }
                    });
                    console.log(`Fetching ${itemId}`);

                    const productData = productResponse.data;
                    if (productData.PriceInRobux === 0) {
                        console.log(`Attempting to purchase item: ${productData.Name} (ID: ${itemId})`);
                        
                        const payload = {
                            assetId: productData.AssetId,
                            expectedPrice: productData.PriceInRobux,
                            expectedSellerId: productData.Creator.Id,
                            userAssetId: null,
                            expectedCurrency: 1
                        };
                        
                        let headers = {
                            "Content-Type": "application/json",
                            "Cookie": `.ROBLOSECURITY=${process.env.PAKORA}`,
                            'x-csrf-token': csrfToken,
                            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/116.0.0.0"
                        };
                        
                        await axios.post(`https://www.pekora.zip/apisite/economy/v1/purchases/products/${itemId}`, payload, { headers });
                        console.log(`Successfully purchased: ${productData.Name} (ID: ${itemId})`);
                    }
                } catch (error) {
                    console.error(`Error processing item ${itemId}:`, error.response?.data || error.message);
                }
            })());
        }
        
        await Promise.all(promises); // Wait for all 100 requests to finish
    }
}

//fetchAndBuyItems();


function formatNumber2(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

const postUserData3 = async (url, data) => {
    const cookies = [
        `.ROBLOSECURITY=${ROBLOSECURITY3}`,
        `.ROBLOSECURITY=${ROBLOSECURITY9}`,
        `.ROBLOSECURITY=${roblosecurity2}`,
        `.ROBLOSECURITY=${ROBLOSECURITY10}`
    ];
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts
    let currentCookieIndex = 0;

    while (attempts < maxAttempts) {
        try {
            // Set the cookie in the headers for the request
            const config = {
                headers: {
                    'Cookie': cookies[currentCookieIndex], // Use the current cookie
                    'Content-Type': 'application/json'
                }
            };
            
            // Make the POST request with the current cookie
            return await axios.post(url, data, config);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429 && currentCookieIndex < cookies.length - 1) {
                    // Retry with the next cookie if rate-limited
                    currentCookieIndex++;
                    console.log(`Retrying with next .ROBLOSECURITY cookie... Attempt ${attempts + 1}`);
                    attempts++;
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else if ([500, 502, 503].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else {
                throw error; // Throw the error if no response
            }
        }
    }
};


const getUserData6 = async (url) => {
    const cookies = [
     //   `.ROBLOSECURITY=${ROBLOSECURITY3}`,
        `.ROBLOSECURITY=${ROBLOSECURITY9}`,
        `.ROBLOSECURITY=${roblosecurity2}`,
        `.ROBLOSECURITY=${ROBLOSECURITY10}`
    ];
    let attempts = 0;
    const maxAttempts = 3; // Set the maximum number of retry attempts
    let currentCookieIndex = 0;

    while (attempts < maxAttempts) {
        try {
            // Set the cookie in the headers for the request
            const config = {
                headers: {
                    'Cookie': cookies[currentCookieIndex] // Use the current cookie
                }
            };
            
            // Make the GET request with the current cookie
            return await axios.get(url, config);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 429 && currentCookieIndex < cookies.length - 1) {
                    // Retry with the next cookie if rate-limited
                    currentCookieIndex++;
                    console.log(`Retrying with next .ROBLOSECURITY cookie... Attempt ${attempts + 1}`);
                    attempts++;
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else if ([500, 502, 503].includes(error.response.status)) {
                    // Retry in case of server errors (500, 502, 503)
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw error; // Throw the error if max attempts reached
                    }
                    console.log(`Retrying due to server error (${error.response.status})... Attempt ${attempts + 1}`);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
                } else {
                    throw error; // Throw the error for other response statuses
                }
            } else {
                throw error; // Throw the error if no response
            }
        }
    }
};

client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name;
    const options = interaction.data.options || [];
  


    if (command === 'goodtest5151') {
        const userId = options.find(option => option.name === '51').value;
        const username2 = userId;
       // const formattedUsername2 = username.replace(/\\n|\/n/g, '%0A');
        //const formattedUsername = formattedUsername2.replace("#", '%23');


      

      
      

        try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
        if (userId.length >= 11 || !/^\d+$/.test(userId)) {
            const embed235 = {
                description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
                color: 2894900
            };
                      await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
             //   data: {
               //     type: 4, // Channel Message with Source
                    data: {
                        content: '',
                        embeds: [embed235]
                //    }
                }
            });
            return;
        }
          
         //   const userId = await getUserIdFromProfile(formattedUsername);

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
if (error.response && error.response.status === 404) {
  
const usernameResponse = await axios.post(
    `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
    {
        userIds: [userId],
        fields: ["names.username", "names.displayName"]
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

const userProfile = usernameResponse.data.profileDetails[0];

const username = userProfile?.names?.username;  // Use fallback if username is not available
const displayName = userProfile?.names?.displayName;  // Use fallback if displayName is not available


if (!username) {

    const embed33 = {
        embeds: [
            {
        description: `[${'``'}UID: ${userId}${'``'}](https://www.roblox.com/users/${userId}) does not exist`,
        color: 2894900
            }
        ],
        attachments: []
    };
  
    // Send the embed (replace `sendEmbedFunction` with your actual embed sending method)
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: embed33
                    
                });
            return;
}
      
    // Fetch the thumbnail URL using the new endpoint
                    const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
                    let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
                  
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
   thumbnailUrl = "https://supers.lol/avis/Error.png";
}
  
    // Fetch the username and display name using the new API
  
  
// Determine whether to display username only or display name with username
const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

    let accountCreatedDate;
    let currentUserId = userId; // Start with the initial userId
      let lastOnlineTimestamp34 = "Unknown"

    // Attempt to find a valid user by incrementing the userId
    while (true) {
        try {
            const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
            accountCreatedDate = new Date(creationDateResponse.data.created);
            break;
        } catch (error) {
            currentUserId++; // Increment the userId if not found
        }
    }
  
  
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
          //  console.log(lastOnlineTimestamp34)
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
           // console.log(lastOnlineTimestamp34)
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
       // console.log(error)
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    // Build the embed for the deleted account
    const deletedEmbed = {
        embeds: [
            {
                title: displayNameText, // Use the determined display name
                url: `https://rblx.trade/u/${encodeURIComponent(username)}`,
                color: 2894900,
                fields: [
                    { name: "ID", value: userId.toString(), inline: true },
                    { name: "Deleted", value: "True", inline: true },
                    { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
                    { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
                    { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
                    { name: "Current Status", value: "Offline", inline: true }
                ],
                thumbnail: { url: thumbnailUrl }
            }
        ],
        attachments: []
    };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
               
                        data: deletedEmbed
                    
                });
                return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
  //  const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url12345);
      //  const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

       // if (match) {
       //     lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    console.log(lines)
    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       

const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
              
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
} 
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
              
              
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}
              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response12 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response12.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
              
        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        } 
            
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}
                console.log(lastOnlineValue)
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(user.name)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                 
                        data: bannedEmbed
                    
                });
                return;
            }

const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
       
          
          
          

        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response15 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response15.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

const presenceResponse = await postUserData3('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});
            const presence = presenceResponse.data.userPresences[0];
            

            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }



let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
     //   const response = await axios.get(url1234);
      //  const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

      //  if (match) {
       //     lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
  //  } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

            const placeResponse = await getUserData(`https://www.roblox.com/item-thumbnails?params=[{%22assetId%22:${placeId}}]`);
            if (placeResponse.status === 200 && placeResponse.data.length > 0) {
                 placeName = placeResponse.data[0].name; // Place name
                 placeNameId = placeResponse.data[0].id; // Place ID

                // Now you have the place name and ID
              //  console.log(`Place Name: ${placeName}, Place ID: ${placeNameId}`);
            }

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
       
          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);



            const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
            const hasSign = signResponse.data;
            const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
            const hasHat = hatResponse.data;



            let badgeStatus = 'False';
            if (hasSign && hasHat) {
                badgeStatus = "Hat/Sign";
            } else if (hasSign) {
                badgeStatus = "Sign";
            } else if (hasHat) {
                badgeStatus = "Hat";
            }



const thumbnailResponse = await getUserData(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
let thumbnailUrl = thumbnailResponse.data.data[0].imageUrl;

// Check if the thumbnail state is "Blocked" and imageUrl is empty
if (thumbnailResponse.data.data[0].state === "Blocked" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/ContentDeleted.jpg";
}
          
if (thumbnailResponse.data.data[0].state === "InReview" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/InReview.png";
}
if (thumbnailResponse.data.data[0].state === "Error" && !thumbnailUrl) {
  thumbnailUrl = "https://supers.lol/avis/Error.png";
}
          
if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}
          
          
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";
          

            const accountCreatedDate = new Date(user.created);
            const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
            if (rolimonsData.rap === null) {
                rolimonsData.rap = 'Private';
                rolimonsData.value = '—';
            }
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
          
          
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
                      const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;
    let inventorystatus = "Private"
    try {
        const response = await getUserData6(`https://inventory.roblox.com/v2/users/${userId}/inventory/8`);
        
        // If the request is successful, set inventory status to Public
        inventorystatus = response.status === 200 ? "Public" : "Private";
      //  console.log(`Inventory status: ${inventorystatus}`);
        //inventorystatus;
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
         //   console.log("Inventory status: Private");
            inventorystatus = "Private";
        } else {
           // console.error("An error occurred:", error.message);
           // return "Error";
        }
    }
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}

 //   return badge9;  // Returns the emoji string of badges




          
            const embed = {
                embeds: [
                    {
                        title: title,
                        description: description,
                        url: `https://roblox.com/users/${userId}/profile`,
                        color: 2894900,
                        fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
                        ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                        thumbnail: { url: thumbnailUrl }
                    }
                ],
                attachments: []
            };

            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                   
                    data: embed
                
            });
        } catch (error) {
            console.error(error);
            await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
        }
    }

});


client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith('-messageid')) {
    const sentMessage = await message.channel.send('Avis');
    sentMessage.edit(sentMessage.id);
  }
});




const apiKey = 'fdb100a4-6985-4ec5-8838-5a8205640be9';


async function getFortniteStats(username, type) {
  try {
    const response = await axios.get('https://fortnite-api.com/v2/stats/br/v2', {
      headers: { Authorization: apiKey },
      params: {
        name: username,
        accountType: type,
        timeWindow: 'lifetime',
        image: 'all'
      }
    });
    return { success: true, data: response.data.data, type };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { success: false };
    } else {
      throw error;
    }
  }
}

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  if (interaction.type !== 2 || interaction.data.name !== 'fortnite' || interaction.data.options?.[0]?.name !== 'user') return;

 // const userId = interaction.member.user.id;
  const username = interaction.data.options?.[0]?.options?.find(opt => opt.name === 'username')?.value;

  if (!username) {
    return client.api.interactions(interaction.id, interaction.token).callback.post({
      data: { type: 4, data: { content: 'Please provide a Fortnite username.' } }
    });
  }

  try {
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                },
            });
    const platforms = ['epic', 'psn', 'xbl'];
    let result;

    for (const platform of platforms) {
      result = await getFortniteStats(username, platform);
      if (result.success) break;
    }

    if (!result || !result.success) {
      return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
          data: {
            embeds: [{
              description: `[${'`'}${username}${'`'}](https://fortnitetracker.com/profile/all/${encodeURIComponent(username)}) does not exist`,
              color: 2894900
            }]
          }
        
      });
    }

    const { account, battlePass, image } = result.data;
    const platformText = result.type === 'psn' ? 'PlayStation Network' : result.type === 'xbl' ? 'Xbox' : '';
    const progressPercent = battlePass.progress ? `${battlePass.progress}%` : '0%';

    return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
        data: {
          embeds: [{
            title: `${account.name}`,
            description: `${platformText ? `-# Type: ${platformText} (${username})\n` : ''}-# Level: ${battlePass.level} (${progressPercent})`,
            url: `https://fortnitetracker.com/profile/all/${encodeURIComponent(username)}`,
            image: { url: image },
            footer: { text: `ID: ${account.id}` },
            color: 2894900
          }]
        }
      
    });

  } catch (error) {
            return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: 'error'
                    }
                
            });
  }
});


async function getInviteInfo(inviteCode) {
  try {
    const response = await axios.get(`https://discord.com/api/v10/invites/${inviteCode}`);
    const data = response.data;
    console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error.response?.data?.message || error.message}`);
  }
}

//getInviteInfo('roblox');
const PREFix9 = "-"


client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(`-pitem12344312 `) && !message.content.toLowerCase().startsWith(`-pi12342134 `)) return;

    const args = message.content.slice(PREFix9.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const itemName = encodeURIComponent(args.join(' '));

    if (!itemName) {
        return;
    }

    try {
        // Fetch item search
        const searchResponse = await axios.get(`https://www.pekora.zip/apisite/catalog/v1/search/items?category=null&limit=28&sortType=0&keyword=${itemName}&subcategory=Accessories`, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
            }
        });
if (!searchResponse.data.data.length) {
    const notFoundEmbed = {
        description: `[${'``'}${itemName}${'``'}](https://www.pekora.zip/catalog?keyword=${encodeURIComponent(itemName)}) was not found`,
        color: 2894900
    };
    return message.channel.send({ embeds: [notFoundEmbed] });
}


        const itemId = searchResponse.data.data[0].id;

        // Fetch product info
        const productResponse = await axios.get(`https://www.pekora.zip/marketplace/productinfo?assetId=${itemId}`, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
            }
        });

        const product = productResponse.data;

        let resaleData = null;
        let copies = 0;

        if (product.IsLimited || product.IsLimitedUnique) {
            // Fetch resale data
            const resaleResponse = await axios.get(`https://www.pekora.zip/apisite/economy/v1/assets/${itemId}/resale-data`, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
            }
        });
            resaleData = resaleResponse.data;

            // Fetch owners
            let cursor = "";
            do {
                const ownersResponse = await axios.get(`https://www.pekora.zip/apisite/inventory/v2/assets/${itemId}/owners?cursor=${cursor}&limit=50&sortOrder=Asc`, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
            }
        });
                copies += ownersResponse.data.data.filter(owner => owner.owner && owner.owner.name !== "ROBLOX").length;
                cursor = ownersResponse.data.nextPageCursor;
            } while (cursor);
        }

        // Fetch thumbnail
        const thumbnailResponse = await axios.get(`https://www.pekora.zip/apisite/thumbnails/v1/assets?assetIds=${itemId}&format=png&size=420x420`, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
                'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
            }
        });
        const thumbnailUrl = `https://www.pekora.zip/${thumbnailResponse.data.data?.[0]?.imageUrl}` || null;

        // Fetch additional details
const catalogResponse = await axios.post(
    `https://www.pekora.zip/apisite/catalog/v1/catalog/items/details`,
    { 
        items: [{ itemType: "Asset", id: itemId }] 
    },
    {
        headers: {
            'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`,
            'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc="
        }
    }
);

        const catalogData = catalogResponse.data.data[0];

        // Determine embed details
        let embed;
        if (product.IsLimited || product.IsLimitedUnique) {
            embed = new MessageEmbed()
                .setTitle(product.Name)
                .setColor(2894900)
                .setURL(`https://www.pekora.zip/catalog/${itemId}/Avis`)
                .setThumbnail(thumbnailUrl)
                .addFields(
                    { name: "ID", value: itemId.toString(), inline: true },
                    { name: "RAP", value: resaleData?.recentAveragePrice?.toLocaleString() || "N/A", inline: true },
                    { name: "Creator", value: `[${product.Creator.Name}](https://www.pekora.zip/users/${product.Creator.Id}/profile)`, inline: true },
                    { name: "Lowest Price", value: catalogData?.lowestPrice?.toLocaleString() || "N/A", inline: true },
                    {
  name: product.PriceInRobux ? "Original Price (Robux)" :
        product.PriceInTickets ? "Original Price (Tix)" :
        "Original Price",
  value: product.PriceInRobux ? product.PriceInRobux.toLocaleString() :
         product.PriceInTickets ? product.PriceInTickets.toLocaleString() :
         "N/A",
  inline: true
},
                    { name: "Copies", value: copies.toString(), inline: true },
                    { name: "Created", value: `<t:${Math.floor(new Date(product.Created).getTime() / 1000)}:D>`, inline: true },
                    { name: "Updated", value: `<t:${Math.floor(new Date(product.Updated).getTime() / 1000)}:D>`, inline: true },
                    { name: "Favorites", value: catalogData.favoriteCount.toLocaleString(), inline: true }
                )
                .setFooter({ text: "Avis | pekora.zip" });

            if (product.Description) embed.addFields({ name: "Description", value: product.Description });
        } else {
            embed = new MessageEmbed()
                .setTitle(product.Name)
                .setColor(2894900)
                .setDescription(`-# **Sales:** ${catalogData.saleCount.toLocaleString()}`)
                .setURL(`https://www.pekora.zip/catalog/${itemId}/Avis`)
                .setThumbnail(thumbnailUrl)
                .addFields(
                    { name: "ID", value: itemId.toString(), inline: true },
{
    name: catalogData.priceInRobux && catalogData.priceInTickets
        ? "Price"
        : catalogData.priceInRobux
        ? "Price (Robux)"
        : catalogData.priceInTickets
        ? "Price (Tix)"
        : "Price",
    value: catalogData.priceInRobux && catalogData.priceInTickets
        ? `- # **Robux:** ${catalogData.priceInRobux.toLocaleString()}\n- # **Tix:** ${catalogData.priceInTickets.toLocaleString()}`
        : catalogData.priceInRobux
        ? catalogData.priceInRobux.toLocaleString()
        : catalogData.priceInTickets
        ? catalogData.priceInTickets.toLocaleString()
        : "Off Sale",
    inline: true
},
                    { name: "Item Type", value: getItemType(product.AssetTypeId), inline: true },
                    { name: "Created", value: `<t:${Math.floor(new Date(product.Created).getTime() / 1000)}:D>`, inline: true },
                    { name: "Updated", value: `<t:${Math.floor(new Date(product.Updated).getTime() / 1000)}:D>`, inline: true },
                    { name: "Favorites", value: catalogData.favoriteCount.toLocaleString(), inline: true }
                )
                .setFooter({ text: "Avis | pekora.zip" });

            if (product.Description) embed.addFields({ name: "Description", value: product.Description });
        }

        message.channel.send({ embeds: [embed] });

    } catch (error) {
        console.error(error);
        message.channel.send("error");
    }
});



const url = 'https://fnbr.co/api/images?search=backlash';
const apizey = '8009c5f6-3f89-472c-b290-9ff3de848c91';


async function fetchShop() {
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': apizey
            }
        });
        const data = JSON.stringify(response.data, null, 2);
        fs1.writeFileSync('done.txt', data);
        console.log('Shop data saved to done.txt');
    } catch (error) {
        const errorMsg = error.response ? JSON.stringify(error.response.data, null, 2) : error.message;
        fs1.writeFileSync('done.txt', errorMsg);
        console.error('Error fetching Fortnite shop:', errorMsg);
    }
}

//fetchShop();


const rarityColors = {
  "handmade": "#FFFFFF",
  "common": "#808080",
  "uncommon": "#008000",
  "rare": "#0000FF",
  "epic": "#800080",
  "legendary": "#FFA500",
  "mythic": "#FFD700",
  "exotic": "#00FFFF",
  "transcendent": "#FF6666",
  "marvel": "#8B0000",
  "dark": "#FF00FF",
  "dc": "#708090",
  "icon": "#00FFFF",
  "frozen": "#ADD8E6",
  "lava": "#FF4500",
  "starwars": "#00008B",
  "shadow": "#000000",
  "slurp": "#008B8B",
  "gaminglegends": "#4B0082"
};

client.on('messageCreate', async message => {
  if (message.content.toLowerCase() === '-fntest1') {
    try {
      // Fetch Fortnite shop data
      const shopData = await axios.get('https://fortnite-api.com/v2/shop')
        .then(res => res.data.data)
        .catch(err => {
          console.error('Error fetching Fortnite shop:', err);
          return message.reply('An error occurred while fetching the Fortnite shop.');
        });

      const currentDate = shopData.date.replace("T", "-").split(`-`);
      const shopItems = shopData.entries.filter(item => item.offerTag?.id !== "sparksjamloop");

      // Define rarity order based on displayValue
      const rarityOrder = {
        'Handmade': 0,
        'Common': 1,
        'Uncommon': 2,
        'Rare': 3,
        'Epic': 4,
        'Legendary': 5,
        'Mythic': 6,
        'Exotic': 7,
        'Transcendent': 8,
        'Marvel Series': 9,
        'Dark Series': 10,
        'DC Series': 11,
        'Icon Series': 12,
        'Frozen Series': 13,
        'Lava Series': 14,
        'Star Wars Series': 15,
        'Shadow Series': 16,
        'Slurp Series': 17,
        'Gaming Legends Series': 18,
      };

      // Sort items by rarity displayValue
      shopItems.sort((a, b) => {
        const getRarityValue = (item) => {
          const rarityDisplayValue = item?.brItems?.[0]?.rarity?.displayValue || "Common";
          return rarityOrder[rarityDisplayValue] ?? 1; // Default to 'Common' if not found
        };

        return getRarityValue(a) - getRarityValue(b); // Sort in ascending order
      });

      // Load images from GitHub
      const missingItemImage = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/QuestionMark.png');
      const largeItemOverlay = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/LargeOverlay.png');
      const smallItemOverlay = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/SmallOverlay.png');
      const shopBackground = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/Background.png');
      const vbucksIcon = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/VBucks.png');

      // Create a canvas for the shop image
      const columnsCount = shopItems.length > 48 ? (shopItems.length > 90 ? 16 : 12) : 8;
      const tileWidth = 300; // Increased tile width
      const tileHeight = 350; // Increased tile height
      const canvasWidth = tileWidth * columnsCount + 15 * (columnsCount - 1) + 100;
      const canvasHeight = tileHeight * Math.ceil(shopItems.length / columnsCount) + 15 * (Math.ceil(shopItems.length / columnsCount) - 1) + 350;
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d');

      // Draw the shop background
      ctx.drawImage(shopBackground, 0, 0, canvasWidth, canvasHeight);

      // Draw title and date
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.fillText('LOJA DE ITENS', canvasWidth / 2 - ctx.measureText('LOJA DE ITENS').width / 2, 50);
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`DIA ${currentDate[2]}/${currentDate[1]}/${currentDate[0]}`, canvasWidth / 2 - ctx.measureText(`DIA ${currentDate[2]}/${currentDate[1]}/${currentDate[0]}`).width / 2, 100);

      let currentRow = 0;
      let currentColumn = 0;

      for (const shopItem of shopItems) {
        const firstItem = shopItem.brItems?.[0] || shopItem.tracks?.[0] || shopItem.instruments?.[0] || shopItem.cars?.[0] || shopItem.legoKits?.[0];
        const itemRarity = firstItem.rarity?.displayValue || 'Common';
        const itemSeries = firstItem.series?.backendValue;

        // Load item background (rarity or series)
        let itemBackground;
        try {
          if (itemSeries) {
            itemBackground = await loadImage(`https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/series/${itemSeries}.png`);
          } else {
            itemBackground = await loadImage(`https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/rarities/${itemRarity}.png`);
          }
        } catch {
          itemBackground = await loadImage('https://raw.githubusercontent.com/sprintermax/FNItemShopGenerator/main/src/images/rarities/Common.png');
        }

        // Load item image
        let itemImage;
        try {
          itemImage = await loadImage(shopItem.bundle?.image || firstItem.images.icon || firstItem.images.featured || firstItem.images.smallIcon || firstItem.images.large);
        } catch {
          itemImage = missingItemImage;
        }

        // Draw item background
        const x = 50 + currentColumn * (tileWidth + 15); // Increased spacing
        const y = 150 + currentRow * (tileHeight + 15); // Increased spacing
        ctx.drawImage(itemBackground, x, y, tileWidth, tileHeight);

        // Draw item image
        ctx.drawImage(itemImage, x, y, tileWidth, tileHeight);

        // Draw overlay (large or small)
        const itemText = (shopItem.bundle?.name || firstItem.name || firstItem.title)?.toUpperCase() || "?????";
        const textHeight = ctx.measureText(itemText).actualBoundingBoxAscent + ctx.measureText(itemText).actualBoundingBoxDescent;
        if (textHeight <= 22) {
          ctx.drawImage(smallItemOverlay, x, y, tileWidth, tileHeight);
        } else {
          ctx.drawImage(largeItemOverlay, x, y, tileWidth, tileHeight);
        }

        // Draw item name (centered, white text)
        ctx.fillStyle = '#ffffff'; // White text
        ctx.font = '20px Arial';
        const textWidth = ctx.measureText(itemText).width;
        ctx.fillText(itemText, x + (tileWidth - textWidth) / 2, y + tileHeight - 60); // Name above V-Bucks

        // Draw price and V-Bucks icon (centered, white text)
        const priceText = shopItem.finalPrice.toString();
        const priceTextWidth = ctx.measureText(priceText).width;
        ctx.drawImage(vbucksIcon, x + (tileWidth - (priceTextWidth + 30)) / 2, y + tileHeight - 40, 20, 20); // Centered V-Bucks icon
        ctx.fillText(priceText, x + (tileWidth - priceTextWidth) / 2 + 25, y + tileHeight - 25); // Centered price text

        // Move to next position
        currentColumn++;
        if (currentColumn >= columnsCount) {
          currentColumn = 0;
          currentRow++;
        }
      }

      // Save the image
      const imagePath = './fortnite_shop.png';
      const buffer = canvas.toBuffer('image/png');
      fs1.writeFileSync(imagePath, buffer);

      // Send the image to Discord
      await message.reply({ files: [imagePath] });

      // Clean up the image file
      fs1.unlinkSync(imagePath);
    } catch (error) {
      console.error('Error:', error);
      message.reply('An error occurred while processing your request.');
    }
  }
});



const API_BASE = "https://www.pekora.zip/apisite";


client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "skin") {
                const username = interaction.data.options[0].value;
              
 //   const args = message.content.split(' ');
  //  if (args.length < 2) return message.reply('Please provide a Minecraft username.');

    let uuid;
    try {
                  await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: { type: 5 }, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            });
        let response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);  
    } catch (error) {
     //   console.error(error);
      //  message.channel.send('error');
        try {

        if (error.status === 404) {
          let response2 = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${username}`);
          const username2 = error.data.name(/-/g, '');
        const username3 = error.data.name;
              
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `[**Download Skin**](<https://mineskin.eu/skin/${username3}>) ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| ||||||||||||  https://mc-heads.net/body/${error.data.id}`
                    }
                
            });
        
        
        }
        
      } catch (error) {
        if (error.status === 400) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                        description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                        color: 2894900
                            }]
                        
                    }
                });
        }
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
      }
        
    }
            
        

        
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `[**Download Skin**](<https://mineskin.eu/skin/${username}>) ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| ||||||||||||  https://mc-heads.net/body/${uuid}`
                    }
                
            });
            
        }
    }
      
});

client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "bust") {
                const username = interaction.data.options[0].value;
              
 //   const args = message.content.split(' ');
  //  if (args.length < 2) return message.reply('Please provide a Minecraft username.');

    let uuid;
    try {
                  await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: { type: 5 }, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            });
        let response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);  
    } catch (error) {
     //   console.error(error);
      //  message.channel.send('error');
        try {

        if (error.status === 404) {
          let response2 = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${username}`);
          const username2 = error.data.name(/-/g, '');
        const username3 = error.data.name;
              
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/armor/bust/${username3}/100.png`
                    }
                
            });
        
        
        }
        
      } catch (error) {
        if (error.status === 400) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                        description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                        color: 2894900
                            }]
                        
                    }
                });
        }
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
      }
        
    }
            
        

        
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/armor/bust/${username}/100.png`
                    }
                
            });
            
        }
    }
      
});


client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "body") {
                const username = interaction.data.options[0].value;
              
 //   const args = message.content.split(' ');
  //  if (args.length < 2) return message.reply('Please provide a Minecraft username.');

    let uuid;
    try {
                  await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: { type: 5 }, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            });
        let response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);  
    } catch (error) {
     //   console.error(error);
      //  message.channel.send('error');
        try {

        if (error.status === 404) {
          let response2 = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${username}`);
          const username2 = error.data.name(/-/g, '');
        const username3 = error.data.name;
              
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/armor/body/${username3}/100.png`
                    }
                
            });
        
        
        }
        
      } catch (error) {
        if (error.status === 400) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                        description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                        color: 2894900
                            }]
                        
                    }
                });
        }
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
      }
        
    }
            
        

        
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/armor/body/${username}/100.png`
                    }
                
            });
            
        }
    }
      
});

client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "head") {
            if (interaction.data.options[0].options && interaction.data.options[0].options[0].name === "3d") {
                const username = interaction.data.options[0].options[0].value;
              
 //   const args = message.content.split(' ');
  //  if (args.length < 2) return message.reply('Please provide a Minecraft username.');

    let uuid;
    try {
                  await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: { type: 5 }, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            });
        let response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);  
    } catch (error) {
     //   console.error(error);
      //  message.channel.send('error');
        try {

        if (error.status === 404) {
          let response2 = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${username}`);
          const username2 = error.data.name(/-/g, '');
        const username3 = error.data.name;
              
                await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/headhelm/${username3}/100.png`
                    }
                
            });
        
        
        }
        
      } catch (error) {
        if (error.status === 400) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                        description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                        color: 2894900
                            }]
                        
                    }
                });
        }
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
      }
        
    }
            
        

        
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `https://mineskin.eu/headhelm/${username}/100.png`
                    }
                
            });
            }
        }
    }
      
});




client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "user") {
                let username = interaction.data.options[0].value;
    let uuid = username.includes('-') ? username.replace(/-/g, '') : null;
    let data = { uuid: uuid, name: username };

    if (username.length > 27) {
        try {
            const sessionUserRes = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${username}`);
            data = { id: sessionUserRes.data.id, name: sessionUserRes.data.name };
        } catch (error) {

                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                            description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                            color: 2894900
                            }]
                        
                    }
                });
                return;
        }
    }

    if (!uuid && username.length <= 27) {
        try {
            const mojangRes = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            data = mojangRes.data;
        } catch (error) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                            description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                            color: 2894900
                            }]
                        
                    }
                });
                return;
        }
    }

    try {
        const sessionRes = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${data.id}`);
        const labyRes = await axios.get(`https://laby.net/api/v3/search/profiles/${data.name}`);
        
        const history = labyRes.data.users.find(user => user.uuid.replace(/-/g, '') === data.id)?.history || [];
        history.sort((a, b) => new Date(b.changed_at || 0) - new Date(a.changed_at || 0));

        let formattedHistory = '';
        if (history.length >= 50) {
            formattedHistory = `-# **Message Limit exceeded.**\n-# [**View all name changes**](https://laby.net/@${data.id})`;
        } else {
            formattedHistory = history.map(h => `-# **${h.name}** - **${h.changed_at ? `<t:${Math.floor(new Date(h.changed_at).getTime() / 1000)}:D>` : 'N/A'}**`).join('\n');
        }


            const embed = {
                embeds: [{
                    title: data.name.replace(/__/g, '_\\_'),
                    description: `-# **[Download Skin](https://mineskin.eu/skin/${data.name})**\n\n${formattedHistory ? `**Previous Names (${history.length}):**\n${formattedHistory}` : ''}`,
                    url: `https://namemc.com/profile/${data.id}`,
                    color: 2894900,
                    footer: { text: `UUID: ${data.id}`},
                    thumbnail: { url: `https://mc-heads.net/body/${data.id}` }
                }]
            };
        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({ data: embed });
    } catch (error) {
                                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
    }
    }
    }
});





client.ws.on("INTERACTION_CREATE", async (interaction) => {
    if (interaction.data.name === "minecraft") {
        if (interaction.data.options && interaction.data.options[0].name === "skin") {
            const args = interaction.data.options[0].options; // Extracting subcommand options safely
            if (args && args[0]) {
                let username = args[0].value;
              
 //   const args = message.content.split(' ');
  //  if (args.length < 2) return message.reply('Please provide a Minecraft username.');

    let uuid;
    try {
                  await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: { type: 5 }, // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            });
        let response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);  
              uuid = response.data.id
    } catch (error) {
     //   console.error(error);
      //  message.channel.send('error');

        if (error.status === 404) {
                return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({
                        data: {
                            embeds: [{
                        description: `[${'``'}${username}${'``'}](https://namemc.com/search?q=${encodeURIComponent(username)}) was not found`,
                        color: 2894900
                            }]
                        
                    }
                });
        }
        


                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `error`
                    }
                
            });
      
        
    }
            
        

        
                        return await client.api.webhooks(client.user.id, interaction.token).messages['@original'].patch({

                    data: {
                        content: `[**Download Skin**](<https://mineskin.eu/skin/${username}>) ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| ||||||||||||  https://mc-heads.net/body/${username}`
                    }
                
            });
            
        }
        }
    }
      
});




client2.on('messageCreate', async (message) => {
    if (!message.content.startsWith('-dwc124 ') || message.author.bot) return;

    console.log(`Received -dwc command from ${message.author.tag}`);
    
    const query = message.content.slice(5).trim();
    if (!query) {
        console.log('No search query provided.');
        return message.reply('Please provide text to search for.');
    }

    console.log(`Searching for messages containing: "${query}"`);
    
    const channel = await client2.channels.fetch('1285442380732043301');


    let lastMessageId = null;
    let foundMessage = null;
    let searchedMessages = 0;

    const fetchBatch = async () => {
        console.log(`Fetching messages before ${lastMessageId || 'latest'}`);
        const messages = await channel.messages.fetch({ limit: 100, before: lastMessageId });
        searchedMessages += messages.size;
        console.log(`Fetched ${messages.size} messages, total searched: ${searchedMessages}`);
        
        return messages;
    };

    while (!foundMessage) {
        const batchPromises = [fetchBatch(), fetchBatch(), fetchBatch()]; // Fetch 3 batches in parallel
        const results = await Promise.all(batchPromises);
        
        for (const messages of results) {
            if (messages.size === 0) {
                console.log('No more messages to fetch.');
                break;
            }
            
            foundMessage = messages.find(m => m.content.toLowerCase().includes(query.toLowerCase()));
            if (foundMessage) {
                console.log(`Found matching message: ${foundMessage.id}`);
                break;
            }
            
            lastMessageId = messages.last().id;
        }
    }

    if (!foundMessage) {
        console.log('No matching message found.');
        return message.reply('No matching message found.');
    }

    console.log(`Fetching avatar for ${foundMessage.author.tag}`);
    const user = await client.users.fetch(foundMessage.author.id);
    const avatarUrl = user.displayAvatarURL({ dynamic: true });

    console.log(`Sending embed for found message from ${foundMessage.author.tag}`);
    
    const embed = {
        content: 'Hey, welcome to <:discohook:736648398081622016> Discohook! The easiest way to build and send Discord messages with embeds using webhooks.\n\nThe embeds below explain a bit more, but you\'re not required to read them. If you\'re ready, click on the "Clear All" button in the editor to start making your own messages.\n\nDiscohook has [a support server](https://discohook.app/discord)! Feel free to join and ask any questions you may have, or suggest things you\'d like to see.\n\nThere\'s also [a complementary bot](https://discohook.app/bot), it\'s completely optional but you may want it.\n_ _',
        embeds: [
            {
                description: foundMessage.content,
                url: 'https://supers.lol/avis',
                color: null,
                author: {
                    name: `${foundMessage.author.username} (${foundMessage.author.id})`,
                    url: avatarUrl
                },
                image: foundMessage.attachments.size > 0 ? { url: foundMessage.attachments.first().url } : null
            }
        ],
        attachments: []
    };

    message.channel.send(embed);
});





async function getOutfits(userId) {
    let attempts = 0;

    do {
        if (attempts > 0) await new Promise(resolve => setTimeout(resolve, 10));
        try {
            const outfitsRes = await getUserData2(`https://avatar.roblox.com/v2/avatar/users/${userId}/outfits?page=1&itemsPerPage=10000&isEditable=true`);

            // If the response has errors indicating the user doesn't exist, return "TERMINATED"
            if (outfitsRes.errors && outfitsRes.errors.some(e => e.message === "The specified user does not exist.")) {
                return "TERMINATED";
            }

            return outfitsRes?.data?.data || [];
        } catch (error) {
            // Check if the error is a 400 response (user terminated)
            if (error.response && error.response.status === 400) {
                return "TERMINATED";
            }
            // Log other errors and return an empty array
            console.error("Error fetching outfits:", error);
            return [];
        }

        attempts++;
    } while (attempts < 5);

    return [];
}


client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const content33 = msg.content.toLowerCase();

    if (
        content33.startsWith('-ucxv ') || 
        content33.startsWith('-usercx ') || 
        content33.startsWith('-lookupxcv ') || 
        content33.startsWith('-robloxuserxcv ') || 
        content33.startsWith('-robloxxcv ') || 
        content33.startsWith('-robloxuxcv ') || 
        content33.startsWith('-bloxxcv ') ||
        content33.startsWith('-rbloxxcv ') ||
        content33.startsWith('-r0bloxxcv ') ||
        content33.startsWith('-us3rxcv ') ||
        content33.startsWith('-r0bl0xxcv ') ||
        content33.startsWith('-robl0xxcv ') ||
        content33.startsWith('-usrxcv ') ||
        content33.startsWith('-rblxxcv ') ||
        content33.startsWith('-roblxxcv ') ||
        content33.startsWith('-rbxxcv ')
    ) {
        const args = msg.content.split(' ');
        args.shift(); // Remove the command part
        let username = args.join(' '); // Join the rest as the username
        const username2 = args.join(' ');
        username = username.replace(/\\n|\/n/g, '%0A'); 
        username = username.replace("#", '%23');





      
async function postUserData2(url, data) {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
}
      
        try {
            const userId = await getUserIdFromProfile(username);
            const encodedUsername2 = encodeURIComponent(username2);
            if (!userId) {
                await msg.channel.send({
                    embeds: [
                        {
                            description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                            color: 2894900
                        }
                    ]
                });
                return;
            }

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
    if (error.response && error.response.status === 404) {
        const usernameResponse = await axios.post(
            `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
            {
                userIds: [userId],
                fields: ["names.username", "names.displayName"]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const userProfile = usernameResponse.data.profileDetails[0];

        const username = userProfile?.names?.username || 'defaultUsername';  // Fallback if username is not available
        const displayName = userProfile?.names?.displayName || 'defaultDisplayName';  // Fallback if displayName is not available
        const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

        // Change const to let to allow reassignment
                            const thumbnailUrl = await getAvatar(userId)
                          
                          

// Check if the thumbnail state is "Blocked" and imageUrl is empty



    let accountCreatedDate;
    let currentUserId = userId;
    let lastOnlineTimestamp34 = "Unknown"

    while (true) {
      try {
        const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
        accountCreatedDate = new Date(creationDateResponse.data.created);
        break;
      } catch (error) {
        currentUserId++;
      }
    }
      
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    const deletedEmbed = {
      embeds: [
        {
          title: `${displayNameText}`,
          url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
          color: 2894900,
          fields: [
            { name: "ID", value: userId.toString(), inline: true },
            { name: "Deleted", value: "True", inline: true },
            { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
            { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
            { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
            { name: "Current Status", value: "Offline", inline: true }
          ],
      //    footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
          thumbnail: { url: thumbnailUrl }
        }
      ]
    };

    await msg.channel.send(deletedEmbed);
    return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
   //     const response = await axios.get(url12345);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
      //      lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673, 26665182
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData2(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.awardingUniverse.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline) {
    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presence.lastOnline !== user.created) {
        // Convert presence.lastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presence.lastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (
            (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp)
        ) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // If presence.lastOnline is the same as user.created, skip it and look for the next most recent timestamp
      // console.log("Skipping presence.lastOnline as it matches user.created and looking for the next one...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}

                            const thumbnailUrl = await getAvatar(userId)
              
                let displayName = user.displayname;
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

    const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
    const groupsData = response1.data || []; // Ensure the data is accessed properly

    // Initialize userBody variable
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}

    // Check if the user is in the "Official Group of Roblox"
        const response12 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response12.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response123 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response123.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
// Append the verified badge emoji if the user has it

              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
              
              
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description =  `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await msg.channel.send(bannedEmbed);
                return;
            }
          
          
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
   

// Initialize userBody variable
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response18 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response18.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
          


        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

// Check for specific IDs and names in the response string


// Add badges to userBody based on the group presence

        
            // Add the admin badge emoji if the badge is present

const presenceResponse = await postUserData3('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
    }
});  
          console.log(presenceResponse.data)
            const presence = presenceResponse.data.userPresences[0];
            
            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
    //    const response = await axios.get(url1234);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

    //    if (match) {
     //       lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
   // }

 //   return lastOnlineTimestamp;
//}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673, 26665182
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData2(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.awardingUniverse.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline || (presence.userPresenceType >= 1 && presence.userPresenceType <= 3)) {
    // Set presence.lastOnline to the current time if missing and presenceType is 1, 2, or 3
    const presenceLastOnline = presence.lastOnline || new Date().toISOString();

    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presenceLastOnline !== user.created) {
        // Convert presenceLastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presenceLastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // Skip presence.lastOnline if it matches user.created
        // console.log("Skipping presence.lastOnline as it matches user.created...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // Skip the specific timestamp
        // console.log("Skipping timestamp 1731646800...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp) {
        mostRecentTimestamp = latestBadgeTimestamp;
        onlineType = "badge";
    }
}

// Add logic to check against cache.txt
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || cacheTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
          

          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
const hasSign = signResponse.data;
const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
const hasHat = hatResponse.data;


let badgeStatus = 'False';
if (hasSign && hasHat) {
    badgeStatus = "Hat/Sign";
} else if (hasSign) {
    badgeStatus = "Sign";
} else if (hasHat) {
    badgeStatus = "Hat";
}

                            const thumbnailUrl = await getAvatar(userId)

const accountCreatedDate = new Date(user.created);
const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}

// Initialize the bigDescription flag
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";




const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;

            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

    let inventorystatus = "Private"
    try {
        const response = await getUserData6(`https://inventory.roblox.com/v2/users/${userId}/inventory/8`);
        
        // If the request is successful, set inventory status to Public
        inventorystatus = response.status === 200 ? "Public" : "Private";
      //  console.log(`Inventory status: ${inventorystatus}`);
        //inventorystatus;
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
         //   console.log("Inventory status: Private");
            inventorystatus = "Private";
        } else {
           // console.error("An error occurred:", error.message);
           // return "Error";
        }
    }
          
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}

 //   return badge9;  // Returns the emoji string of badges




          
const embed = {
    title: title,
    description: description,
    url: `https://roblox.com/users/${userId}/profile`,
    color: 2894900,
    fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
    ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
    thumbnail: { url: thumbnailUrl }
};

            await msg.channel.send({ embeds: [embed] });
        } catch (error) {
            await msg.channel.send(`Error: ${error.message}`);
        }
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
  const content33 = message.content;
  const cooldownDuration = 90 * 1000; // 1.5 minutes in milliseconds

  const cooldownKey = message.guild ? message.guild.id : message.author.id;

  if (content33.toLowerCase() === '-ingame34') {
    if (cooldowns943gjb34r.has(cooldownKey)) {
      const expirationTime = cooldowns943gjb34r.get(cooldownKey);
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        const timeLeft = (expirationTime - currentTime) / 1000;
        return message.channel.send(`This command is on cooldown for ${timeLeft.toFixed(1)} more seconds.`);
      }
    }

    cooldowns943gjb34r.set(cooldownKey, Date.now() + cooldownDuration);

    // Send placeholder message
    const placeholderMessage = await message.channel.send('Scanning...');

    try {
      const admins = fs1.readFileSync('admins.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
      const stars = fs1.readFileSync('stars.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
      const developers = fs1.readFileSync('developers.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');

      const adminInGame = [];
      const starInGame = [];
      const developerInGame = [];

      const getUserPresence = async (userIds) => {
        try {
          const response = await axios.post(PRESENCE_URL, {
            userIds: userIds.map(id => parseInt(id, 10))
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
            }
          });
          return response.data;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            const proxyUrl = PRESENCE_URL.replace('roblox.com', 'roproxy.com');
            const response = await axios.post(proxyUrl, {
              userIds: userIds.map(id => parseInt(id, 10))
            }, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
              }
            });
            return response.data;
          }
          throw error;
        }
      };
      
      const getQueueInfo = async (userId, rootPlaceId, placeId, gameId) => {
    try {
        // If rootPlaceId and placeId do not match, assume private server
    //    if (rootPlaceId !== placeId) {
     //       return '(PRIVATE SERVER)';
      //  }

        const response = await axios.post(
            'https://gamejoin.roblox.com/v1/play-with-user',
            { userIdToFollow: userId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`,
                    'User-Agent':
                        'Roblox/WinInet RobloxApp/0.653.0.6530693 (GlobalDist; RobloxDirectDownload) (RoSeal/chrome/2.0.2/prod)',
                },
            }
        );

     //   console.log(response.data);

        // Other private server checks
        if (
            response.data.joinScript && gameId && placeId && response.data.joinScript?.GameId !== gameId ||
            response.data.message === 'User lacks permissions to join private server' ||
            response.data.message === 'User lacks access to join private server' ||
            response.data.PrivateServerID ||
            response.data.PrivateServerOwnerID
        ) {
            return '(PRIVATE SERVER)';
        }

        // Queue position handling
        const queuePosition = response.data.queuePosition;
        return queuePosition !== null ? `(Queue: ${queuePosition})` : '';
    } catch (error) {
        console.error(`Failed to fetch queue info for user ID: ${userId}`);
        return '';
    }
};

      const processUserIds = async (userIds, resultArray) => {
        for (let i = 0; i < userIds.length; i += MAX_USERS_PER_REQUEST) {
          const chunk = userIds.slice(i, i + MAX_USERS_PER_REQUEST);
          const presenceData = await getUserPresence(chunk);

          for (const userPresence of presenceData.userPresences) {
            if (userPresence.userPresenceType === 2 && userPresence.placeId && userPresence.lastLocation) {
              const username = await getUsernameFromUserId(userPresence.userId);
              const queueInfo = await getQueueInfo(userPresence.userId, userPresence.rootPlaceId, userPresence.placeId, userPresence.gameId);

              resultArray.push({
                username,
                userId: userPresence.userId,
                lastLocation: userPresence.lastLocation,
                placeId: userPresence.placeId,
                queueInfo
              });
            }
          }
        }
      };

      const getUsernameFromUserId = async (userId) => {
        try {
          const response = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
          return response.data.name;
        } catch (error) {
          console.error(`Failed to fetch username for user ID: ${userId}`);
          return 'Unknown';
        }
      };

      await processUserIds(admins, adminInGame);
      await processUserIds(stars, starInGame);
      await processUserIds(developers, developerInGame);

      const embed = new MessageEmbed()
        .setTitle('Ingame Tracker')
        .setColor(155135)
        .setFooter({ text: 'Avis' });

      const formatUserList = (users) => {
        if (users.length === 0) return 'No users in game';
        return users.map(user => `[${user.username}](https://roblox.com/users/${user.userId}) - [${user.lastLocation}](https://roblox.com/games/${user.placeId}) ${user.queueInfo}`).join('\n');
      };

      embed.setDescription(
        `**Stars**\n${formatUserList(starInGame)}\n\n` +
        `**Admins**\n${formatUserList(adminInGame)}\n\n` +
        `**Developers**\n${formatUserList(developerInGame)}`
      );

      // Edit the placeholder message with the embed
      await placeholderMessage.edit({ content: null, embeds: [embed] });

    } catch (error) {
      console.error('Error processing ingame command:', error);
      placeholderMessage.edit('An error occurred while processing the ingame command.');
    }
  }
});


client.ws.on('INTERACTION_CREATE', async interaction => {
    const { data, token, id } = interaction;

    if (data.name === 'goodtestm9') {
        // Defer the response
        await client.api.interactions(id, token).callback.post({
            data: {
                type: 5 // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
            }
        });

        try {
            const placeholderMessage = await client.api.webhooks(client.user.id, token).messages['@original'].patch({
                data: { content: 'Scanning...' }
            });

            const admins = fs1.readFileSync('admins.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
            const stars = fs1.readFileSync('stars.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
            const developers = fs1.readFileSync('developers.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');

            const adminInGame = [];
            const starInGame = [];
            const developerInGame = [];

            const getUserPresence = async (userIds) => {
                try {
                    const response = await axios.post(PRESENCE_URL, {
                        userIds: userIds.map(id => parseInt(id, 10))
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`
                        }
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error fetching user presence:', error);
                    return { userPresences: [] };
                }
            };

            const getQueueInfo = async (userId, rootPlaceId, placeId, gameId) => {
                try {
                    const response = await axios.post(
                        'https://gamejoin.roblox.com/v1/play-with-user',
                        { userIdToFollow: userId },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`,
                                'User-Agent':
                                    'Roblox/WinInet RobloxApp/0.653.0.6530693 (GlobalDist; RobloxDirectDownload) (RoSeal/chrome/2.0.2/prod)',
                            },
                        }
                    );

                    if (
                        response.data.joinScript && gameId && placeId && response.data.joinScript?.GameId !== gameId ||
                        response.data.message === 'User lacks permissions to join private server' ||
                        response.data.message === 'User lacks access to join private server' ||
                        response.data.PrivateServerID ||
                        response.data.PrivateServerOwnerID
                    ) {
                        return '(PRIVATE SERVER)';
                    }

                    const queuePosition = response.data.queuePosition;
                    return queuePosition !== null ? `(Queue: ${queuePosition})` : '';
                } catch (error) {
                    console.error(`Failed to fetch queue info for user ID: ${userId}`);
                    return '';
                }
            };

            const getUsernameFromUserId = async (userId) => {
                try {
                    const response = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
                    return response.data.name;
                } catch (error) {
                    console.error(`Failed to fetch username for user ID: ${userId}`);
                    return 'Unknown';
                }
            };

            const processUserIds = async (userIds, resultArray) => {
                for (let i = 0; i < userIds.length; i += MAX_USERS_PER_REQUEST) {
                    const chunk = userIds.slice(i, i + MAX_USERS_PER_REQUEST);
                    const presenceData = await getUserPresence(chunk);

                    for (const userPresence of presenceData.userPresences) {
                        if (userPresence.userPresenceType === 2 && userPresence.placeId && userPresence.lastLocation) {
                            const username = await getUsernameFromUserId(userPresence.userId);
                            const queueInfo = await getQueueInfo(userPresence.userId, userPresence.rootPlaceId, userPresence.placeId, userPresence.gameId);

                            resultArray.push({
                                username,
                                userId: userPresence.userId,
                                lastLocation: userPresence.lastLocation,
                                placeId: userPresence.placeId,
                                queueInfo
                            });
                        }
                    }
                }
            };

            await processUserIds(admins, adminInGame);
            await processUserIds(stars, starInGame);
            await processUserIds(developers, developerInGame);

            const embed = new MessageEmbed()
                .setTitle('Ingame Tracker')
                .setColor(155135)
                .setFooter({ text: 'Avis' });

            const formatUserList = (users) => {
                if (users.length === 0) return 'No users in game';
                return users.map(user => `[${user.username}](https://roblox.com/users/${user.userId}) - [${user.lastLocation}](https://roblox.com/games/${user.placeId}) ${user.queueInfo}`).join('\n');
            };

            embed.setDescription(
                `**Stars**\n${formatUserList(starInGame)}\n\n` +
                `**Admins**\n${formatUserList(adminInGame)}\n\n` +
                `**Developers**\n${formatUserList(developerInGame)}`
            );

            await client.api.webhooks(client.user.id, token).messages['@original'].patch({
                data: { content: null, embeds: [embed] }
            });
        } catch (error) {
            console.error('Error processing ingame command:', error);
            await client.api.webhooks(client.user.id, token).messages['@original'].patch({
                data: { content: 'error' }
            });
        }
    }
});



client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const content33 = msg.content.toLowerCase();

    if (
        content33.startsWith('-u234 ') || 
        content33.startsWith('-user234 ')  
      //  content33.startsWith('-lookup ') || 
    //    content33.startsWith('-robloxuser ') || 
     //   content33.startsWith('-roblox ') || 
     //   content33.startsWith('-robloxu ') || 
     //   content33.startsWith('-blox ') ||
     //   content33.startsWith('-rblox ') ||
     //   content33.startsWith('-r0blox ') ||
      //  content33.startsWith('-us3r ') ||
      //  content33.startsWith('-r0bl0x ') ||
      //  content33.startsWith('-robl0x ') ||
      //  content33.startsWith('-usr ') ||
       // content33.startsWith('-rblx ') ||
       // content33.startsWith('-roblx ') ||
       // content33.startsWith('-rbx ')
    ) {
        const args = msg.content.split(' ');
        args.shift(); // Remove the command part
        let username = args.join(' '); // Join the rest as the username
        const username2 = args.join(' ');
        username = username.replace(/\\n|\/n/g, '%0A'); 
        username = username.replace("#", '%23');





      
async function postUserData2(url, data) {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
}
      
        try {
            const userId = await getUserIdFromProfile(username);
            const encodedUsername2 = encodeURIComponent(username2);
            if (!userId) {
                await msg.channel.send({
                    embeds: [
                        {
                            description: `[${'``'}${username2}${'``'}](https://www.roblox.com/users/profile?username=${encodedUsername2}) does not exist`,
                            color: 2894900
                        }
                    ]
                });
                return;
            }

            let userResponse;
            try {
                userResponse = await getUserData(`https://users.roblox.com/v1/users/${userId}`);
            } catch (error) {
    if (error.response && error.response.status === 404) {
        const usernameResponse = await axios.post(
            `https://apis.roblox.com/user-profile-api/v1/user/profiles/get-profiles`,
            {
                userIds: [userId],
                fields: ["names.username", "names.displayName"]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const userProfile = usernameResponse.data.profileDetails[0];

        const username = userProfile?.names?.username || 'defaultUsername';  // Fallback if username is not available
        const displayName = userProfile?.names?.displayName || 'defaultDisplayName';  // Fallback if displayName is not available
        const displayNameText = displayName !== username ? `${displayName} (@${username})` : username;

        // Change const to let to allow reassignment
                            const thumbnailUrl = await getAvatar(userId)
                          
                          

// Check if the thumbnail state is "Blocked" and imageUrl is empty



    let accountCreatedDate;
    let currentUserId = userId;
    let lastOnlineTimestamp34 = "Unknown"

    while (true) {
      try {
        const creationDateResponse = await getUserData(`https://users.roblox.com/v1/users/${currentUserId}`);
        accountCreatedDate = new Date(creationDateResponse.data.created);
        break;
      } catch (error) {
        currentUserId++;
      }
    }
      
    const url12346 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

    try {
        const response = await axios.get(url12346);
        const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

        if (match) {
            lastOnlineTimestamp34 = `<t:${parseInt(match[1], 10)}:D>`;
        }
        else {
            lastOnlineTimestamp34 = "Unknown"
        }
    } catch (error) {
        lastOnlineTimestamp34 = "Unknown"
    }
        let lastOnline834 = "Last Online"
        if (lastOnlineTimestamp34 && lastOnlineTimestamp34 !== "Unknown") {
            lastOnline834 = "Last Cached Online";
        } else {
            lastOnline834 = "Last Online";
        }

    const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));
    const creationTimestamp = Math.floor(accountCreatedDate / 1000);

    const deletedEmbed = {
      embeds: [
        {
          title: `${displayNameText}`,
          url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
          color: 2894900,
          fields: [
            { name: "ID", value: userId.toString(), inline: true },
            { name: "Deleted", value: "True", inline: true },
            { name: "Account Age", value: `${accountAge.toLocaleString()} days`, inline: true },
            { name: "Creation Date", value: `<t:${creationTimestamp}:D>`, inline: true },
            { name: lastOnline834, value: lastOnlineTimestamp34, inline: true },
            { name: "Current Status", value: "Offline", inline: true }
          ],
      //    footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
          thumbnail: { url: thumbnailUrl }
        }
      ]
    };

    await msg.channel.send(deletedEmbed);
    return;
            }
            }

            const user = userResponse.data;

            if (user.isBanned) {
                const accountCreatedDate = new Date(user.created);
                const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

                const presenceResponse = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence = presenceResponse.data.userPresences[0];

                const presenceResponse2 = await postUserData('https://presence.roblox.com/v1/presence/users', {
                    userIds: [userId]
                });
                const presence2 = presenceResponse2.data.userPresences[0];

                let lastLocation;
                let lastLocation2;
                let lastLocationurl;
                if (presence2.userPresenceType === 2) {
                    if (presence2.rootPlaceId) {
                        lastLocation2 = `[In Game](https://www.roblox.com/games/${presence.rootPlaceId})`;
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    } else {
                        lastLocation = 'In Game';
                        lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                    }
                } else if (presence2.userPresenceType === 0) {
                    lastLocation = 'Offline';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else if (presence2.userPresenceType === 3) {
                    lastLocation = 'Studio';
                    lastLocationurl = 'https://supers.lol/avis/InStudio.png'
                } else if (presence2.userPresenceType === 1) {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                } else if (presence2.userPresenceType === 4) {
                    lastLocation = 'Invisible';
                    lastLocationurl = 'https://supers.lol/avis/Offline2.png'
                } else {
                    lastLocation = 'Online';
                    lastLocationurl = 'https://supers.lol/avis/Online.png'
                }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
              
   // const url12345 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

   // try {
   //     const response = await axios.get(url12345);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

     //   if (match) {
      //      lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
  //  }

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673, 26665182
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData2(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.awardingUniverse.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline || (presence.userPresenceType >= 1 && presence.userPresenceType <= 3)) {
    // Set presence.lastOnline to the current time if missing and presenceType is 1, 2, or 3
    const presenceLastOnline = presence.lastOnline || new Date().toISOString();

    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presenceLastOnline !== user.created) {
        // Convert presenceLastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presenceLastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // Skip presence.lastOnline if it matches user.created
        // console.log("Skipping presence.lastOnline as it matches user.created...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // If the timestamp is 1731646800, skip it and use the next most recent
      //  console.log("Skipping timestamp 1731646800 and looking for the next one...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (
        (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp)
    ) {
        mostRecentTimestamp = latestBadgeTimestamp;
       // console.log(mostRecentTimestamp)
        onlineType = "badge";
    }
}
              
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!Math.floor(mostRecentTimestamp) || cacheTimestamp > Math.floor(mostRecentTimestamp)) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}

                            const thumbnailUrl = await getAvatar(userId)
              
                let displayName = user.displayname;
let userBody;
if (user.displayName !== user.name) {
    userBody = `${user.displayName} (@${user.name})`;
} else {
    userBody = user.name;
}

    const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
    const groupsData = response1.data || []; // Ensure the data is accessed properly

    // Initialize userBody variable
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}

    // Check if the user is in the "Official Group of Roblox"
        const response12 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response12.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
              
const response123 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response123.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

              
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }
              
// Append the verified badge emoji if the user has it

              
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
}
              
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;
              
              
const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description =  `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}
              
                const bannedEmbed = {
                    embeds: [
                        {
                            title: `${userBody}`,
                            description: description,
                            url: `https://rblx.trade/p/${encodeURIComponent(username)}`,
                            color: 2894900,
                            fields: [
                                { name: "ID", value: user.id.toString(), inline: true },
                                { name: "Terminated", value: "True", inline: true },
                                { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
                                { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
                                { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
                                { name: "Badges", value: `${badge9}`, inline: true },
                                ...(userDescription ? [{ name: 'Description', value: userDescription }] : [])
                            ],
                         //   footer: { text: "Avis | Cmd inspired by kalr.pw/kag" },
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
                            thumbnail: { url: thumbnailUrl }
                          
                        }
                    ]
                };

                await msg.channel.send(bannedEmbed);
                return;
            }
          
          
const premiumData = fs1.readFileSync('custom.txt', 'utf8');
const premiumEntries = premiumData.split('\n').reduce((acc, line) => {
    const [id, emoji] = line.split('-');
    if (id && emoji) acc[id.trim()] = emoji.trim();
    return acc;
}, {});


let userBody;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    // Format userBody with link for premium users
    userBody = `[${user.displayName !== user.name ? `${user.displayName} (@${user.name})` : user.name}](https://www.roblox.com/users/${userId})`;
} else {
    // Regular user formatting
    if (user.displayName !== user.name) {
        userBody = `${user.displayName} (@${user.name})`;
    } else {
        userBody = user.name;
    }
}
          
let premiumStatus = "False";
const maxRetries = 3; // Maximum number of retries for 500 errors
let retries = 0;
let success = false;

while (retries < maxRetries && !success) {
    try {
        const premiumResponse = await getUserData2(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, config);
        premiumStatus = premiumResponse.data ? "True" : "False";
        success = true;
    } catch (error) {
        console.error(`Error fetching premium status from primary API: ${error.message}`);
        if (error.response && error.response.status === 500) {
            retries++;
            console.log(`Retrying (${retries}/${maxRetries})...`);
            continue;
        }

        try {
            const roproxyResponse = await getUserData2(`https://premiumfeatures.roproxy.com/v1/users/${userId}/validate-membership`, config);
            premiumStatus = roproxyResponse.data ? "True" : "False";
            success = true;
        } catch (roproxyError) {
            console.error(`Error fetching premium status from roproxy.com: ${roproxyError.message}`);
            if (roproxyError.response && roproxyError.response.status === 500) {
                retries++;
                console.log(`Retrying (${retries}/${maxRetries})...`);
                continue;
            }
            premiumStatus = rolimonsData && rolimonsData.premium ? "True" : "False";
        }
    }
}

if (!success) {
    console.log("Failed to fetch premium status after maximum retries.");
}


// Append the verified badge emoji if the user has it
if (user.hasVerifiedBadge) {
    userBody += ' <:RobloxVerifiedBadge:1265450420638322698>';
}
          
if (premiumStatus === "True") {
    userBody += ' <:RobloxPremiumBadge:1332903908753805362>';
}
   

// Initialize userBody variable
        const response1 = await getUserData(`https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=true&includeNotificationPreferences=false`);
        const userData = response1.data;


        // Check if the user is in the Admin group
        const isInOfficialGroup = userData.data.some(group => group.group.id === 1200769);
          
const response18 = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
const badgesData = response18.data || []; // Ensure the data is accessed properly
const adminBadge = badgesData.find(badge => badge.name === "Administrator");
if ((adminBadge && adminBadge.imageUrl === "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png") && !isInOfficialGroup) {
    // Add the admin badge emoji to userBody
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}

          
          
if (isInOfficialGroup) {
    userBody += ' <:RobloxAdminBadge:1270953005860126772>';
}
          


        // Check if the user is in the Star group
        const isInOfficialGroup2 = userData.data.some(group => group.group.id === 4199740);
        if (isInOfficialGroup2) {
            userBody += ' <:RobloxStarBadge:1278515517790883911>';
        }

// Check for specific IDs and names in the response string


// Add badges to userBody based on the group presence

        
            // Add the admin badge emoji if the badge is present

const presenceResponse = await postUserData3('https://presence.roblox.com/v1/presence/users', {
    userIds: [userId]
}, {
    headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOSECURITY3}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }
});
    
            const presence = presenceResponse.data.userPresences[0];
            
            let lastLocationurl;
            let lastLocation;
            let ingame;
            if (presence.userPresenceType === 2) {
                if (presence.rootPlaceId) {
                    ingame = `[${presence.lastLocation}](https://www.roblox.com/games/${presence.rootPlaceId})`;
                    lastLocation = `In Game`;
                    lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                } else {
                    lastLocation = 'In Game';
                  lastLocationurl = 'https://supers.lol/avis/InGame2.png'
                }
            } else if (presence.userPresenceType === 0 ) {
                lastLocation = 'Offline';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else if (presence.userPresenceType === 3) {
                lastLocation = 'Studio';
                lastLocationurl = 'https://supers.lol/avis/InStudio.png'
            } else if (presence.userPresenceType === 1) {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            } else if (presence.userPresenceType === 4) {
                lastLocation = 'Invisible';
                lastLocationurl = 'https://supers.lol/avis/Offline2.png'
            } else {
                lastLocation = 'Online';
                lastLocationurl = 'https://supers.lol/avis/Online.png'
            }

let rolimonsData = { value: "0", rap: "0", privacy_enabled: false, stats_updated: null };
let lastOnlineTimestamp = null;

try {
    // Fetch Rolimons data
    const rolimonsResponse = await getUserData(`https://api.rolimons.com/players/v1/playerinfo/${userId}`);
    if (rolimonsResponse.status === 200 && rolimonsResponse.data.success) {
        rolimonsData = rolimonsResponse.data;
        lastOnlineTimestamp = rolimonsData.last_online || 0;
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        rolimonsData = { value: 0, rap: 0, privacy_enabled: false, stats_updated: null };
    } else {
        throw error;
    }
}
          
  //  const url1234 = `https://www.rolimons.com/player/${userId}`;
//    let lastOnlineTimestamp;

  //  try {
    //    const response = await axios.get(url1234);
    //    const match = response.data.match(/"last_roblox_activity_ts":(\d+)/);

    //    if (match) {
     //       lastOnlineTimestamp = parseInt(match[1], 10);
     //   }
   // } catch (error) {
        // Ignore any errors
   // }

 //   return lastOnlineTimestamp;
//}

let latestBadgeTimestamp = null;
let placeName = "";
let placeNameId = "";

try {
    // Fetch the latest badges
    const badgesResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Desc`);
    
    if (badgesResponse.status === 200 && badgesResponse.data.data.length > 0) {
        const excludedBadgeIds = [
            94278219, 76286530, 76286206, 82012770, 76285879, 83516904, 76680134, 358441686, 89175852, 76285821, 52331725, 19012922, 88693822, 324868673, 26665182
        ];

        // Loop through each badge and skip if it's in the excludedBadgeIds list
        for (const badge of badgesResponse.data.data) {
            if (excludedBadgeIds.includes(badge.id)) {
                // Skip this badge and move to the next one
                continue;
            }

            const latestBadgeId = badge.id;

            // Fetch the awarded date for the latest badge
            const awardedDateResponse = await getUserData(`https://badges.roblox.com/v1/users/${userId}/badges/${latestBadgeId}/awarded-date`);
            if (awardedDateResponse.status === 200) {
                latestBadgeTimestamp = new Date(awardedDateResponse.data.awardedDate).getTime() / 1000;
            }

            // Fetch place details using item-thumbnails endpoint
            const placeId = badge.awarder.id; // This is the place ID

const badgeResponse = await getUserData2(`https://badges.roblox.com/v1/badges/${latestBadgeId}`);

if (badgeResponse.status === 200) {
    placeName = badgeResponse.data.awardingUniverse.name; // Set place name to badge name
    placeNameId = badgeResponse.data.awardingUniverse.rootPlaceId; // Set place ID to root place ID
}

            // Break or continue depending on your use case
            break;  // Remove this line if you want to continue checking all badges
        }
    }
} catch (error) {
    console.error("Error fetching badge data:", error);
}


let presenceOnline;

// Determine the most recent timestamp and convert it to Discord timestamp format
let mostRecentTimestamp = null;
let onlineType = null;

if (presence.lastOnline || (presence.userPresenceType >= 1 && presence.userPresenceType <= 3)) {
    // Set presence.lastOnline to the current time if missing and presenceType is 1, 2, or 3
    const presenceLastOnline = presence.lastOnline || new Date().toISOString();

    // Check if presence.lastOnline is the same as user.created and skip if so
    if (presenceLastOnline !== user.created) {
        // Convert presenceLastOnline to a UNIX timestamp if it's not already
        const presenceLastOnlineTimestamp = new Date(presenceLastOnline).getTime() / 1000;

        // Compare and find the most recent timestamp
        if (!mostRecentTimestamp || presenceLastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = presenceLastOnlineTimestamp;
            onlineType = "presence";
        }
    } else {
        // Skip presence.lastOnline if it matches user.created
        // console.log("Skipping presence.lastOnline as it matches user.created...");
    }
}

if (lastOnlineTimestamp) {
    // Check if the timestamp is 1731646800 and skip it if so
    if (lastOnlineTimestamp !== 1731646800) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || lastOnlineTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = lastOnlineTimestamp;
            onlineType = "online";
        }
    } else {
        // Skip the specific timestamp
        // console.log("Skipping timestamp 1731646800...");
    }
}

if (latestBadgeTimestamp) {
    // Compare with the existing most recent timestamp
    if (!mostRecentTimestamp || latestBadgeTimestamp > mostRecentTimestamp) {
        mostRecentTimestamp = latestBadgeTimestamp;
        onlineType = "badge";
    }
}

// Add logic to check against cache.txt
try {
    const cacheContent = fs1.readFileSync("cache.txt", "utf8");
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines

    // Find the user's cached timestamp
    let cacheTimestamp = null;
    for (const line of lines) {
        const [cachedUserId, cachedTimestamp] = line.split("+");
        if (cachedUserId === userId) {
            // Extract the timestamp value
            cacheTimestamp = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);
            break;
        }
    }

    if (cacheTimestamp) {
        // Compare with the existing most recent timestamp
        if (!mostRecentTimestamp || cacheTimestamp > mostRecentTimestamp) {
            mostRecentTimestamp = cacheTimestamp;
            onlineType = "cache";
        }
    }
} catch (error) {
    console.error("Error reading cache file:", error);
}
          

          
const statsUpdatedDate = rolimonsData.stats_updated ? `<t:${rolimonsData.stats_updated}:d>` : "Unknown";
const rapValue = rolimonsData.rap === null 
    ? `[Private](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.rap.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const valueValue = rolimonsData.value === null 
    ? `[—](https://www.rolimons.com/player/${userId})`
    : (rolimonsData.privacy_enabled 
        ? `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})\n-# ${statsUpdatedDate}` 
        : `[${rolimonsData.value.toLocaleString()}](https://www.rolimons.com/player/${userId})`);

const signResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/1567446/is-owned`);
const hasSign = signResponse.data;
const hatResponse = await getUserData(`https://inventory.roblox.com/v1/users/${userId}/items/0/102611803/is-owned`);
const hasHat = hatResponse.data;


let badgeStatus = 'False';
if (hasSign && hasHat) {
    badgeStatus = "Hat/Sign";
} else if (hasSign) {
    badgeStatus = "Sign";
} else if (hasHat) {
    badgeStatus = "Hat";
}

                            const thumbnailUrl = await getAvatar(userId)

const accountCreatedDate = new Date(user.created);
const accountAge = Math.floor((Date.now() - accountCreatedDate) / (1000 * 60 * 60 * 24));

if (user.name === "Shedletsky") {
    userBody += ' <:RobloxLOLBadge:1306130056975880212>';
}

// Initialize the bigDescription flag
let bigDescription = false;

// Check if the user's ID exists in the premium entries
if (premiumEntries[userId]) {
    const userEmoji = premiumEntries[userId];
    userBody += ` ${userEmoji}`;
    bigDescription = true; // Set bigDescription to true if the user is in premium entries
}

// Define title and description based on bigDescription
const title = bigDescription ? "" : userBody;
//const description = bigDescription ? `### ${userBody}` : "";




const formattedTimestamp = mostRecentTimestamp 
    ? `<t:${Math.floor(mostRecentTimestamp)}:D>`  // Removes decimals by using Math.floor()
    : 'Unknown';

          
let lastOnlineValue = "Unknown";

if (onlineType === "presence") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "badge") {
    lastOnlineValue = `${formattedTimestamp}\n-#  [${placeName}](https://www.roblox.com/games/${placeNameId})`;
} else if (onlineType === "online") {
    lastOnlineValue = `${formattedTimestamp}`;
} else if (onlineType === "cache") {
    lastOnlineValue = `${formattedTimestamp}`;
}

let lastOnlineValue2 = "Last Online";

// Set `lastOnlineValue2` based on `onlineType`
if (onlineType === "presence") {

    // Read the cache file
    let cacheContent = "";
    try {
        cacheContent = fs1.readFileSync("cache.txt", "utf8");
    } catch (error) {
        console.error("Error reading cache file:", error);
        return;
    }

    // Split cache into lines
    const lines = cacheContent.split("\n").filter(Boolean); // Filter out empty lines
    let userFound = false;

    for (let i = 0; i < lines.length; i++) {
        const [cachedUserId, cachedTimestamp] = lines[i].split("+");
        if (cachedUserId === userId) {
            userFound = true;

            // Extract timestamp value from cachedTimestamp
            const cachedTimestampValue = parseInt(cachedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Extract timestamp value from formattedTimestamp
            const newTimestampValue = parseInt(formattedTimestamp.match(/<t:(\d+):D>/)?.[1], 10);

            // Update if the new timestamp is greater
            if (newTimestampValue > cachedTimestampValue) {
                lines[i] = `${userId}+${formattedTimestamp}`;
            }
            break;
        }
    }

    // If user is not found, add them to the cache
    if (!userFound) {
        lines.push(`${userId}+${formattedTimestamp}`);
    }

    // Write the updated content back to the file
    try {
        fs1.writeFileSync("cache.txt", lines.join("\n"), "utf8");
    } catch (error) {
        console.error("Error writing to cache file:", error);
    }
} else if (onlineType === "badge") {
    lastOnlineValue2 = "Last Known Game";
} else if (onlineType === "online") {
    lastOnlineValue2 = "Last Cached Online";
} else if (onlineType === "cache") {
    lastOnlineValue2 = "Last Cached Online";
}
const userDescription = user.description ? user.description.replace(/\n\s*\n/g, '\n') : null;

            const [friendsResponse, followersResponse, followingsResponse] = await Promise.all([
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
                getUserData2(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
            ]);

            const friendsCount = friendsResponse.data.count;
            const followersCount = followersResponse.data.count;
            const followingsCount = followingsResponse.data.count;
          const description = bigDescription ? `### ${userBody}\n-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**` : `-# **${friendsCount.toLocaleString()} Friends** | **${followersCount.toLocaleString()} Followers** | **${followingsCount.toLocaleString()} Following**`;

    let inventorystatus = "Private"
    try {
        const response = await getUserData6(`https://inventory.roblox.com/v2/users/${userId}/inventory/8`);
        
        // If the request is successful, set inventory status to Public
        inventorystatus = response.status === 200 ? "Public" : "Private";
      //  console.log(`Inventory status: ${inventorystatus}`);
        //inventorystatus;
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
         //   console.log("Inventory status: Private");
            inventorystatus = "Private";
        } else {
           // console.error("An error occurred:", error.message);
           // return "Error";
        }
    }
          
            let totalVisits = 0;
            let cursor = null;

                const gamesResponse = await getUserData2(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ''}`);
                const gamesData = gamesResponse.data.data;
                totalVisits += gamesData.reduce((sum, game) => sum + game.placeVisits, 0);
                cursor = gamesResponse.data.nextPageCursor;

    const response = await getUserData(`https://accountinformation.roblox.com/v1/users/${userId}/roblox-badges`);
    const badges = response.data;

let badge9 = '';
let badge10 = '';
const badgeEmojis = [];

badges.forEach(badge => {
  if (badgeMappings[badge.name]) {
    badge10 = '-#';
    const emoji = `<:${badgeMappings[badge.name].name}:${badgeMappings[badge.name].id}>`;
    badgeEmojis.push(emoji);
  }
});

if (badgeEmojis.length > 0) {
  badge9 = '-# ' + badgeEmojis.join(' ');

  if (badgeEmojis.length > 3) {
    const maxBadgesPerLine = badgeEmojis.length > 6 ? 6 : 3;
    badge9 = '-# ';

    for (let i = 0; i < badgeEmojis.length; i++) {
      badge9 += badgeEmojis[i];

      if ((i + 1) % maxBadgesPerLine === 0 && i + 1 !== badgeEmojis.length) {
        badge9 += '\n-# ​'; // Add a new line after max badges per line
      } else if (i + 1 !== badgeEmojis.length) {
        badge9 += ' '; // Add a space between badges
      }
    }
  }
} else {
  badge9 = 'None';
}

 //   return badge9;  // Returns the emoji string of badges

let userColor = "2894900"

const colorsData = fs1.readFileSync('colors.txt', 'utf8').split('\n');
    const colorEntry = colorsData.find(line => line.startsWith(`${userId}-`));

    if (colorEntry) {
         userColor = colorEntry.split('-')[1].trim();
      //  return userColor;
  //  } else {
   //     const userColor =  '2894900'; // Default color
    }
          
const embed = {
    title: title,
    description: description,
    url: `https://roblox.com/users/${userId}/profile`,
    color: userColor,
    fields: [
        { name: "ID", value: userId.toString(), inline: true },
        { name: "Verified", value: badgeStatus, inline: true },
        { name: "Inventory", value: inventorystatus, inline: true },
        { name: "Rap", value: `${rapValue}`, inline: true },
        { name: "Value", value: `${valueValue}`, inline: true },
        { name: "Visits", value: totalVisits.toLocaleString(), inline: true },
        { name: "Created", value: `<t:${Math.floor(accountCreatedDate / 1000)}:D>`, inline: true },
        { name: lastOnlineValue2, value: lastOnlineValue, inline: true },
        { name: "Badges", value: `${badge9}`, inline: true },
        ...(userDescription ? [{ name: 'Description', value: userDescription }] : []),
        ...(ingame ? [{ name: 'Current Game', value: ingame }] : [])
    ],
footer: {
  text: `${lastLocation}`,
  icon_url: lastLocationurl
},
    timestamp: new Date().toISOString(),
    thumbnail: { url: thumbnailUrl }
};

            await msg.channel.send({ embeds: [embed] });
        } catch (error) {
            await msg.channel.send(`Error: ${error.message}`);
        }
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    if (args[0].toLowerCase() !== '-embedcolor123') return;

    const username = args[1];
    const color = args[2];

    if (!username || !color) {
        return message.reply('Usage: -embedcolor <username> <color>');
    }

    const robloxId = await getUserIdFromProfile(username);
    if (!robloxId) return message.reply('User not found');

    const linksData = fs1.readFileSync('links.txt', 'utf8').split('\n');
    const userLink = linksData.find(line => 
        line.startsWith(message.author.id + ',') && 
        line.split(',').slice(1).includes(robloxId)
    );

    if (!userLink) return message.reply('Account not linked');

    const customData = fs1.readFileSync('custom.txt', 'utf8').split('\n');
    const premiumUser = customData.find(line => line.split('-')[0] === robloxId);

    if (!premiumUser) return message.reply('User is not a premium user.');

    const colorsData = fs1.readFileSync('colors.txt', 'utf8').split('\n');
    const newEntry = `${robloxId}-${color}`;
    const existingIndex = colorsData.findIndex(line => line.startsWith(`${robloxId}-`));

    if (existingIndex !== -1) {
        colorsData[existingIndex] = newEntry;
    } else {
        colorsData.push(newEntry);
    }

    fs1.writeFileSync('colors.txt', colorsData.join('\n'));
    message.reply(`Color successfully set to ${color}.`);
});

const cooldowns23 = new Map();

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    const username = args[1];

    if (command === '-discordname23' || command === '-discordusername23') {
        if (!username) {
            return;
        }

        // Cooldown handling
        const userId = message.author.id;
        if (cooldowns23.has(userId)) {
            const expirationTime = cooldowns23.get(userId) + 3000;
            if (Date.now() < expirationTime) {
                return message.channel.send('Please wait 3 seconds before using this command again.');
            }
        }
        cooldowns23.set(userId, Date.now());

        try {
            const response = await axios.post('https://discord.com/api/v9/auth/register', {
                email: "rvfedbvrfd@gmail.com",
                username: username,
                global_name: "sdvfg",
                password: "verrevrevfgverfgdervfgd",
                invite: null,
                consent: true,
                date_of_birth: "2006-05-05",
                gift_code_sku_id: null
            });

        } catch (error) {
            if (error.response) {
                const data = error.response.data;

                if (error.response.status === 400 && data.errors?.username?._errors) {
                    const embed = new MessageEmbed()
                        .setDescription(`[\`${username}\`](https://discord.com/register): ${data.errors.username._errors[0].message}`)
                        .setColor(2894900);
                    return message.channel.send({ embeds: [embed] });
                }

                if (data.captcha_key?.includes("captcha-required")) {
                    const embed = new MessageEmbed()
                        .setDescription(`[\`${username}\`](https://discord.com/register): Username is available.`)
                        .setColor(2894900);
                    return message.channel.send({ embeds: [embed] });
                }
            }

            console.error('Unexpected error:', error);
            message.reply('error');
        }
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.toLowerCase().match(/^-(kick124e|kickcom1234e|kic2341ek2314e\.com) (.+)$/);
    if (!args) return;

    const username = args[2];
    const headers = {
 
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'dnt': '1',
        'priority': 'u=0, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    };

    try {
        // Fetch user details
        const aboutResponse = await axios.get(`https://kick.com/${username}/about`, { headers });
        const aboutData = JSON.parse(aboutResponse.data.match(/{\"data\":.*}/)[0]).data;
        
        if (!aboutData) {
            return message.channel.send(`User **${username}** not found.`);
        }

        const correctUsername = aboutResponse.data.match(/<meta name="twitter:title" content="About (.*?) -/)[1];
        const userId = aboutData.id;
        const followers = aboutData.followers_count.toLocaleString();
        const bio = aboutData.user.bio || null;

        // Socials
        const socials = [];
        if (aboutData.user.instagram) socials.push(`Instagram: [${aboutData.user.instagram}](https://instagram.com/${aboutData.user.instagram}/)`);
        if (aboutData.user.youtube) socials.push(`YouTube: [${aboutData.user.youtube}](https://www.youtube.com/${aboutData.user.youtube})`);
        if (aboutData.user.discord) socials.push(`Discord: [${aboutData.user.discord}](https://discord.gg/${aboutData.user.discord})`);
        if (aboutData.user.twitter) socials.push(`Twitter: [${aboutData.user.twitter}](https://twitter.com/${aboutData.user.twitter})`);
        if (aboutData.user.tiktok) socials.push(`TikTok: [${aboutData.user.tiktok}](https://tiktok.com/@${aboutData.user.tiktok})`);
        if (aboutData.user.facebook) socials.push(`Facebook: [${aboutData.user.facebook}](https://facebook.com/${aboutData.user.facebook})`);
        const socialText = socials.length ? socials.join('\n') : null;

        // Fetch videos/live status
        const videosResponse = await axios.get(`https://kick.com/api/v2/channels/${username}/videos`);
        const videosData = videosResponse.data;

        let isLive = '';
        if (videosData.length > 0) {
            const latestStream = videosData[0];
            if (latestStream.is_live) {
                isLive = `-# **${correctUsername} is currently Live**`;
            } else if (latestStream.start_time) {
                const timestamp = `<t:${Math.floor(new Date(latestStream.start_time).getTime() / 1000)}:f>`;
                isLive = `-# Was last live ${timestamp}`;
            }
        }

        // Embed construction
        const embed = {
            title: correctUsername,
            description: isLive,
            url: `https://kick.com/${username}`,
            color: 5502493,
            fields: [
                { name: "Followers", value: followers }
            ]
        };

        if (videosData.length > 0 && videosData[0].is_live) {
            embed.fields.push({ name: "Viewer Count", value: videosData[0].viewer_count.toString() });
        }
        if (socialText) {
            embed.fields.push({ name: "Socials", value: socialText });
        }
        if (bio) {
            embed.fields.push({ name: "Bio", value: bio });
        }

        message.channel.send({ embeds: [embed] });

    } catch (error) {
        console.error(error);
        message.channel.send(`Error fetching data for **${username}**.`);
    }
});


const TARGET_SERVER_ID = '889677144496680990'; // Your target server ID
const recentDeletedMessages = new Map(); // Map to keep track of deleted messages

function parseCustomDate(joinDate) {
    const months = {
        "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
        "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };

    const dateParts = joinDate.match(/(\d{1,2})(?:st|nd|rd|th)? of (\w+) (\d{4}) (\d{2}:\d{2}:\d{2} (AM|PM)) (\w+)/);

    if (!dateParts) return null;

    let [_, day, month, year, time, meridian, timezone] = dateParts;

    // Convert to standard format
    let formattedDate = `${month} ${day}, ${year} ${time} ${meridian} ${timezone}`;
    
    // Convert to UTC timestamp
    let parsedDate = new Date(formattedDate);
    
    if (isNaN(parsedDate)) return null;

    return Math.floor(parsedDate.getTime() / 1000);
}



const API_URL34 = 'https://www.pekora.zip/apisite/catalog/v1/catalog/items/details';
const PURCHASE_URL = 'https://www.pekora.zip/apisite/economy/v1/purchases/products/';

//let xCsrfToken = '';

const getLimitedItems = () => {
    const ids = fs1.readFileSync('limited.txt', 'utf8').split('\n').map(id => ({ itemType: "Asset", id: Number(id.trim()) }));
    return ids.filter(item => !isNaN(item.id));
};


const BATCH_SIZE = 100; // Process 100 items per request

// Function to read CSRF token from the file


const fetchItems = async () => {
   // console.log("Fetching items...");
    const allItems = getLimitedItems();
    
    for (let i = 0; i < allItems.length; i += BATCH_SIZE) {
        const batch = allItems.slice(i, i + BATCH_SIZE); // Get next 100 items

        try {
            const response = await axios.post(API_URL34, { items: batch }, {
                headers: { 
                    'Cookie': `.ROBLOSECURITY=${process.env.PEKORA}`, 
                  //  'x-csrf-token': xCsrfToken, 
                    'User-Agent': "ht/PuiFgi+qBgN3Eo7kUCODyWRO6bDWL2BzJBSikSuue2siQiX8sq9/HCSc=" 
                }
            });

         //   console.log(`Batch ${i / BATCH_SIZE + 1} response received:`, response.data);
            for (const item of response.data.data) {
              //  console.log(`Checking item: ${item.name} - Price: ${item.lowestPrice}`);
                if (item.lowestPrice !== null && item.lowestPrice < 100 && item.lowestSellerData) {
                    await purchaseItem(item);
                }
            }
        } catch (error) {
         //   console.error("Error fetching items:", error.message);
            if (error.response) console.log("Response received:", error.response.data);
            
            if (error.response && error.response.status === 403) {
                const newToken = error.response.headers['x-csrf-token'];
                if (newToken) {
               //     xCsrfToken = newToken;
               //     saveCsrfToken(newToken); // Save new token to file
                  //  console.log("Updated x-csrf-token globally:", xCsrfToken);
                }
            }
        }
    }
};

const purchaseItem = async (item) => {
    console.log(`Attempting to purchase: ${item.name}`);

    try {
        const payload = {
            assetId: item.id,
            expectedPrice: item.lowestPrice,
            expectedSellerId: item.lowestSellerData.userId,
            userAssetId: item.lowestSellerData.userAssetId,
            expectedCurrency: 1
        };
        console.log(payload)

        let csrfToken = "";
        let headers = {
            "Content-Type": "application/json",
             "Cookie": `.ROBLOSECURITY=${process.env.PAKORA}`,
            'x-csrf-token': csrfToken,
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/116.0.0.0",
        };

        const makeRequest = async () => {
            try {
                await axios.post(`${PURCHASE_URL}${item.id}`, payload, { headers });
                console.log(`Purchased item ${item.name} for ${item.lowestPrice}`);
            } catch (error) {
                console.log(error.response.data)
                if (error.response && error.response.status === 403) {
                          console.log(error.response.data)
                    const newCsrfToken = error.response.headers['x-csrf-token'];
                    csrfToken = newCsrfToken
                    if (newCsrfToken) {
                        console.log("Retrying with new x-csrf-token...");
                        headers['x-csrf-token'] = newCsrfToken;
                        
                        await makeRequest(); // Retry the request with the new token
                    } else if (error.response && error.response.status === 401) {
                
                          console.log(error.response.data)
                    const newCsrfToken = error.response.headers['x-csrf-token'];
                    csrfToken = newCsrfToken
                    if (newCsrfToken) {
                        console.log("Retrying with new x-csrf-token...");
                        headers['x-csrf-token'] = newCsrfToken;
                  //      csrfToken = newCsrfToken
                        await makeRequest(); // Retry the request with the new token
                    }
                    }
                } else {
                    console.error(`Failed to purchase ${item.name}:`, error.message);
                }
            }
        };

        await makeRequest();
    } catch (error) {
        console.log(error.response.data)
        console.error(`Unexpected error purchasing ${item.name}:`, error.message);
    }
};

//setInterval(fetchItems, 1000);


const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    ' ': '/'
};

const reverseMorseCode = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

function textToMorse(text) {
    return String(text).toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function morseToText(morse) {
    return morse.split(' ').map(code => reverseMorseCode[code] || code).join('');
}

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith('-morse234 ')) {
        const args = msg.content.split(' ').slice(1);
        const input = args.join(' ');
        let embed;

        // Check if input is Morse by ensuring it only contains Morse characters and spaces
        if (/^[-.\/\s]+$/.test(input) && input.includes('.') || input.includes('-')) {
            // Morse code input
            const text = morseToText(input);
            embed = {
                "title": "Morse Code to Text",
                "description": `**Morse**\n${'``'}${input}${'``'}\n\n<:arrowdown:1290478945107709962>\n\n**Text**\n${text}`,
                "color": 16316150
            };
        } else {
            // Text input
            const morse = textToMorse(input);
            embed = {
                "title": "Text to Morse Code",
                "description": `**Text**\n${input}\n\n<:arrowdown:1290478945107709962>\n\n**Morse**\n${'``'}${morse}${'``'}`,
                "color": 16316150
            };
        }

        msg.channel.send({ embeds: [embed] });
    }
});


const cooldowns23572 = new Set();

client.on('ready', async () => {
    try {
        // Fetch readiness of all shards

            joinVC();
        
    } catch (err) {
        console.error('Error checking shard readiness:', err);
    }
});


async function joinVC() {
    try {
        const channelId = '1343166755303985235'; // Voice channel ID
        const channel = await client.channels.fetch(channelId);



        // Join the voice channel
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: true
        });

     //   console.log(Joined voice channel: ${channel.name});
    } catch (err) {
        console.error('Error joining voice channel:', err);
    }
}

client.on('messageCreate', async (message) => {
    if (message.content === '-download2365') {
        try {
            const fileUrl = 'https://files.catbox.moe/drbsw3.mp3'; // URL of the MP3 file
            const filePath = path.join(__dirname, 'avis.mp3'); // Path to save the file locally

            // Send a reply to the user indicating the download is starting
            message.reply('Downloading the MP3 file...');

            // Fetch the file from the URL using axios
            const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

            // Save the file to the local file system
            fs1.writeFileSync(filePath, response.data);

            // Notify the user once the file has been downloaded
            message.reply('MP3 file downloaded successfully!');
        } catch (error) {
            console.error('Error downloading the MP3 file:', error);
            message.reply('Failed to download the MP3 file.');
        }
    }
});


client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith('-scratch3645 ')) return;

  const arg = message.content.slice(9).trim(); // "-scratch ".length = 9
  if (!arg) return message.reply('Please provide a Scratch username.');

  const username = arg;
  const encoded = encodeURIComponent(username);

  try {
    // First attempt to get data from the API
    const res = await axios.get(`https://api.scratch.mit.edu/users/${encoded}`);
    const user = res.data;

    let projects = 0;
    let banned = false;

    const [followersPage, followingPage, studiosPage] = await Promise.all([
      axios.get(`https://scratch.mit.edu/users/${encoded}/followers/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/following/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/studios/`),
    ]);

    let projectsPage;
    try {
      projectsPage = await axios.get(`https://scratch.mit.edu/users/${encoded}/projects/`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        banned = true;
      } else {
        throw err;
      }
    }

    // Extract Followers count using match
    const followersMatch = followersPage.data.match(/Followers\s*\(([\d,]+)\)/);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Following count using match
    const followingMatch = followingPage.data.match(/Following\s*\(([\d,]+)\)/);
    const following = followingMatch ? parseInt(followingMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Shared Projects count using match
    projects = banned ? 0 : (() => {
      const projectsMatch = projectsPage.data.match(/Shared Projects\s*\(([\d,]+)\)/);
      return projectsMatch ? parseInt(projectsMatch[1].replace(/,/g, ''), 10) : 0;
    })();

    // Extract Studios count using match
    const studiosMatch = studiosPage.data.match(/Studios I Curate\s*\(([\d,]+)\)/);
    const studios = studiosMatch ? parseInt(studiosMatch[1].replace(/,/g, ''), 10) : 0;

    const joined = Math.floor(new Date(user.history.joined).getTime() / 1000);
    const image = user.profile.images['90x90'];

    const descriptionParts = [];
    if (user.profile.status) descriptionParts.push(`"${user.profile.status}"`);
    if (user.profile.country) descriptionParts.push(`-# **Country:** ${user.profile.country}`);
    if (user.scratchteam) descriptionParts.push(`-# **Scratch Team:** True`);
    if (banned) descriptionParts.push(`-# **Banned:** True`);

    const fields = [
      { name: 'ID', value: user.id.toString(), inline: true },
      { name: 'Followers', value: followers.toLocaleString(), inline: true },
      { name: 'Following', value: following.toLocaleString(), inline: true },
      { name: 'Joined', value: `<t:${joined}:D>`, inline: true },
      { name: 'Projects', value: projects.toLocaleString(), inline: true },
      { name: 'Studios', value: studios.toLocaleString(), inline: true }
    ];

    if (user.profile.bio) {
      fields.push({ name: 'Bio', value: user.profile.bio });
    }

    const embed = {
      title: user.username,
      url: `https://scratch.mit.edu/users/${user.username}/`,
      description: descriptionParts.length > 0 ? descriptionParts.join('\n') : undefined,
      color: 2894900,
      fields,
      thumbnail: { url: image }
    };

    message.channel.send({ embeds: [embed] });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      // If user not found, try the alternative API
      try {
        const altRes = await axios.get(`https://scratch.mit.edu/users/${encoded}/`);
                      const html = (await axios.get(`https://scratch.mit.edu/users/${encoded}/`)).data;
        const altData = altRes.data;


//  const altUserData = eval(match[1]); // Extract user data
const idMatch = html.match(/userId:\s*(\d+),/);
        const usamatch = html.match(/username:\s*(.+?),/);
const imageMatch = html.match(/thumbnail_url:\s*(.+?),/);

const userId = idMatch ? idMatch[1] : null;
const usa = usamatch ? usamatch[1].replace(/^['"]|['"]$/g, '') : null;
//const imageUrl = imageMatch ? `https://${imageMatch[1]}` : null;
const imageUrl2 = imageMatch ? imageMatch[1].replace(/^['"]|['"]$/g, '') : null;
        const imageUrl = `https:${imageUrl2}`
     //   const userImage = `https:${altUserData.model.thumbnail_url.replace('//', '/')}`;
        const countryMatch = altData.match(/<span class="location">(.+?)<\/span>/);
        const country = countryMatch ? countryMatch[1] : '';
        const statusMatch = altData.match(/<span title="([0-9]+)">(.+?)<\/span>/);
        const status = statusMatch ? statusMatch[2] : '';
        const joinedMatch = altData.match(/<span title="(.+?)">(.+?)<\/span>/);
        const joined = Math.floor(new Date(joinedMatch[1]).getTime() / 1000);
            const [followersPage, followingPage, studiosPage, project] = await Promise.all([
      axios.get(`https://scratch.mit.edu/users/${encoded}/followers/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/following/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/studios/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/projects/`),
    ]);



    // Extract Followers count using match
    const followersMatch = followersPage.data.match(/Followers\s*\(([\d,]+)\)/);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Following count using match
    const followingMatch = followingPage.data.match(/Following\s*\(([\d,]+)\)/);
    const following = followingMatch ? parseInt(followingMatch[1].replace(/,/g, ''), 10) : 0;
        
     const projectm = project.data.match(/Shared Projects\s*\(([\d,]+)\)/);
    const projects = projectm ? parseInt(projectm[1].replace(/,/g, ''), 10) : 0;
//let 
    // Extract Shared Projects count using match
 //   projects = banned ? 0 : (() => {
 ///     const projectsMatch = projectsPage.data.match(/Shared Projects\s*\(([\d,]+)\)/);
//      return projectsMatch ? parseInt(projectsMatch[1].replace(/,/g, ''), 10) : 0;
 //   })();

    // Extract Studios count using match
    const studiosMatch = studiosPage.data.match(/Studios I Curate\s*\(([\d,]+)\)/);
    const studios = studiosMatch ? parseInt(studiosMatch[1].replace(/,/g, ''), 10) : 0;

        const descriptionParts = [];
    if (status) descriptionParts.push(`"${status}"`);
    if (country) descriptionParts.push(`-# **Country:** ${country}`);

        const fields = [
          { name: 'ID', value: userId.toString(), inline: true },
      { name: 'Followers', value: followers.toLocaleString(), inline: true },
      { name: 'Following', value: following.toLocaleString(), inline: true },
      { name: 'Joined', value: `<t:${joined}:D>`, inline: true },
      { name: 'Projects', value: projects.toLocaleString(), inline: true },
      { name: 'Studios', value: studios.toLocaleString(), inline: true }
        ];

        const embed = {
          title: usa,
          url: `https://scratch.mit.edu/users/${usa}/`,
          description: descriptionParts.join('\n'),
          color: 2894900,
          fields,
          thumbnail: { url: imageUrl }
        };

        message.channel.send({ embeds: [embed] });
      } catch (err) {
        //console.error(err);
      return message.channel.send({
        embeds: [
          {
            description: `[${'``'}${username}${'``'}](https://scratch.mit.edu/users/${encodeURIComponent(username)}/) was not found`,
            color: 2894900
          }
        ]
      });
    
      }
    } else {
     // console.error(err);
      message.channel.send('error');
    }
  }
});


function deleteGitFolder() {
    const gitPath = path.resolve('.git');
    if (fs1.existsSync(gitPath)) {
        fs1.rmSync(gitPath, { recursive: true, force: true });
//console.log(`[${new Date().toLocaleString()}] .git directory deleted.`);
    } else {
     //   console.log(`[${new Date().toLocaleString()}] .git directory does not exist.`);
    }
}

// Run immediately
deleteGitFolder();

// Schedule to run every 10 minutes (600,000 milliseconds)
setInterval(deleteGitFolder, 10 * 60 * 1000);



let trackedUsers = [];

setInterval(async () => {
  for (const user of [...trackedUsers]) { // Clone the array to safely remove during iteration
    try {
      const { discordId, secUid } = user;

      if (!user.recentReposts) {
        user.recentReposts = user.mostRecentRepost ? [user.mostRecentRepost] : [];
        delete user.mostRecentRepost;
      }

      // Fetch username from profile
      const profileRes = await axios.get(`https://www.tiktok.com/@${secUid}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const uniqueIdMatch = profileRes.data.match(/"uniqueId":"(.*?)"/);
      const username = uniqueIdMatch ? uniqueIdMatch[1] : 'unknown';

      // Get most recent repost
      const repostUrl = `https://www.tiktok.com/api/repost/item_list/?count=1&cursor=0&secUid=${secUid}&aid=1988`;
      const repostRes = await axios.get(repostUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': `https://www.tiktok.com/@${username}`
        }
      });

      // Handle TikTok errors
      const statusCode = repostRes.data.statusCode;
      if (statusCode === 10222) {
        // Account is private
        const userObj = await client.users.fetch(discordId);
        await userObj.send(`🔒 @${username}'s account is now private. You've been unsubscribed from their reposts.`);
        trackedUsers = trackedUsers.filter(u => u !== user);
        saveTrackedUsers();
        continue;
      }
      if (statusCode === 10221) {
        // Account no longer exists
        console.log(`❌ Account for secUid ${secUid} no longer exists.`);
        continue;
      }

      const latestItem = repostRes.data.itemList?.[0];
      if (!latestItem) continue;

      const newRepostId = latestItem.id;

      if (!user.recentReposts.includes(newRepostId)) {
        const videoUrl = `https://www.tiktok.com/@${username}/video/${newRepostId}`;
        const desc = latestItem.desc;

        const userObj = await client.users.fetch(discordId);
        await userObj.send(`🆕 [@​${username}](<https://tiktok.com/@${secUid}>) just reposted:\n**${desc}**\n${videoUrl}`);

        user.recentReposts.unshift(newRepostId);
        user.recentReposts = user.recentReposts.slice(0, 5);
        saveTrackedUsers();
      }

    } catch (err) {
      console.error('Error checking reposts:', err.message);
    }
  }
}, 10000);

function saveTrackedUsers() {
  fs1.writeFileSync('tiktok.txt', JSON.stringify(trackedUsers, null, 2));
}

function loadTrackedUsers() {
  if (fs1.existsSync('tiktok.txt')) {
    try {
      const data = fs1.readFileSync('tiktok.txt', 'utf8');
      trackedUsers = data.trim() ? JSON.parse(data) : [];
    } catch (err) {
      console.error('❌ Failed to load tiktok.txt:', err.message);
      trackedUsers = [];
    }
  }
}
loadTrackedUsers();

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('-ttrepostadd') || message.author.bot) return;

  const args = message.content.split(' ');
  const username = args[1];
  if (!username) return message.reply('Please provide a TikTok username.');

  try {
    const profileHtml = await axios.get(`https://www.tiktok.com/@${username}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const secUidMatch = profileHtml.data.match(/"secUid":"(.*?)"/);
    if (!secUidMatch) return message.reply('Could not find secUid.');
    const secUid = secUidMatch[1];

    const alreadyTracking = trackedUsers.find(
      u => u.discordId === message.author.id && u.secUid === secUid
    );
    if (alreadyTracking) {
      return message.reply(`❌ You’re already tracking this TikTok user.`);
    }

    const repostRes = await axios.get(
      `https://www.tiktok.com/api/repost/item_list/?count=5&cursor=0&secUid=${secUid}&aid=1988`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );

    const statusCode = repostRes.data.statusCode;
    if (statusCode === 10222) {
      return message.reply('🔒 This TikTok account is private. You can’t track it.');
    }
    if (statusCode === 10221) {
      return message.reply('❌ This TikTok user no longer exists.');
    }

    const items = repostRes.data.itemList;
    if (!items || items.length === 0) return message.reply('No reposts found.');

    const recentReposts = items.map(item => item.id).slice(0, 5);
    const mostRecent = items[0];
    const videoUrl = `https://www.tiktok.com/@${username}/video/${mostRecent.id}`;
    const desc = mostRecent.desc;

    trackedUsers.push({
      discordId: message.author.id,
      secUid,
      recentReposts
    });
    saveTrackedUsers();

    message.reply(`📌 Now stalking reposts by [@​${username}](<https://tiktok.com/@${secUid}>)\nMost recent:\n**${desc}**\n${videoUrl}`);

  } catch (err) {
    console.error(err);
    message.reply('❌ error');
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(' ');
  const command = args[0].toLowerCase();

  // REMOVE command
if (command === '-ttrepostremove') {
  const targetName = args[1];
  if (!targetName) return message.reply('Please specify the TikTok username to remove.');

  let found = false;
let user
  for (let i = trackedUsers.length - 1; i >= 0; i--) {
     user = trackedUsers[i];
    if (user.discordId !== message.author.id) continue;

    const resolvedUsername = await fetchUsernameFromSecUid(user.secUid);
    if (!resolvedUsername) continue;

    if (resolvedUsername.toLowerCase() === targetName.toLowerCase()) {
      trackedUsers.splice(i, 1);
      found = true;
    }
  }

  if (found) {
    saveTrackedUsers();
    return message.reply(`✅ Successfully removed [@​${targetName}](<https://tiktok.com/@${user.secUid}>) from your tracking list.`);
  } else {
    return message.reply(`❌ You’re not tracking [@​${targetName}](<https://tiktok.com/@${user.secUid}>).`);
  }
}

// LIST Command
if (command === '-ttrepostlist') {
  const yourTracked = trackedUsers.filter(u => u.discordId === message.author.id);
  if (yourTracked.length === 0) return message.reply('📭 You’re not tracking any TikTok users.');

  let response = `📋 You're currently tracking:\n`;
  for (const u of yourTracked) {
    const resolvedUsername = await fetchUsernameFromSecUid(u.secUid);
    response += resolvedUsername ? `[@​${resolvedUsername}](<https://tiktok.com/@${u.secUid}>)\n` : `⚠️ Unknown (might be private/deleted)\n`;
  }

  return message.reply(response);
}

  // Existing -ttrepostadd code comes after this...
});

const fetchUsernameFromSecUid = async (secUid) => {
  try {
    const res = await axios.get(`https://www.tiktok.com/@${secUid}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const match = res.data.match(/"uniqueId":"(.*?)"/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

async function getAvatar(userId, size = "420x420") {
    try {
        let requestSize = size;

        // Request 420x420 initially if the size is one of the larger ones
        if (['840x840', '1260x1260', '1680x1680'].includes(size)) {
            requestSize = '420x420';
        }

        const response = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=${requestSize}&format=Png&isCircular=false`);

        if (response.data && response.data.data && response.data.data.length > 0) {
            const thumbnailData = response.data.data[0];
            let avatarUrl = thumbnailData.imageUrl;

            if (thumbnailData.state === "Blocked" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/ContentDeleted.jpg";
            } else if (thumbnailData.state === "InReview" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/InReview.png";
            } else if (thumbnailData.state === "Error" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/Error.png";
            } else if (thumbnailData.state === "Pending" && !avatarUrl) {
                avatarUrl = "https://supers.lol/avis/Pending.png";
            }

            // If the requested size was a larger one, adjust the final URL
            if (['840x840', '1260x1260', '1680x1680'].includes(size) && avatarUrl) {
                avatarUrl = avatarUrl.replace('420/420', size.replace('x', '/'));
            }

            return avatarUrl;
        }
    } catch (error) {
        console.error("Error fetching avatar:", error.message);
    }
    return null;
}

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith('-scratch ')) return;

  const arg = message.content.slice(9).trim(); // "-scratch ".length = 9
  if (!arg) return message.reply('Please provide a Scratch username.');

  const username = arg;
  const encoded = encodeURIComponent(username);

  try {
    // First attempt to get data from the API
    const res = await axios.get(`https://api.scratch.mit.edu/users/${encoded}`);
    const user = res.data;

    let projects = 0;
    let banned = false;

    const [followersPage, followingPage, studiosPage] = await Promise.all([
      axios.get(`https://scratch.mit.edu/users/${encoded}/followers/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/following/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/studios/`),
    ]);

    let projectsPage;
    try {
      projectsPage = await axios.get(`https://scratch.mit.edu/users/${encoded}/projects/`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        banned = true;
      } else {
        throw err;
      }
    }

    // Extract Followers count using match
    const followersMatch = followersPage.data.match(/Followers\s*\(([\d,]+)\)/);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Following count using match
    const followingMatch = followingPage.data.match(/Following\s*\(([\d,]+)\)/);
    const following = followingMatch ? parseInt(followingMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Shared Projects count using match
    projects = banned ? 0 : (() => {
      const projectsMatch = projectsPage.data.match(/Shared Projects\s*\(([\d,]+)\)/);
      return projectsMatch ? parseInt(projectsMatch[1].replace(/,/g, ''), 10) : 0;
    })();

    // Extract Studios count using match
    const studiosMatch = studiosPage.data.match(/Studios I Curate\s*\(([\d,]+)\)/);
    const studios = studiosMatch ? parseInt(studiosMatch[1].replace(/,/g, ''), 10) : 0;

    const joined = Math.floor(new Date(user.history.joined).getTime() / 1000);
    const image = user.profile.images['90x90'];

    const descriptionParts = [];
    if (user.profile.status) descriptionParts.push(`"${user.profile.status}"`);
    if (user.profile.country) descriptionParts.push(`-# **Country:** ${user.profile.country}`);
    if (user.scratchteam) descriptionParts.push(`-# **Scratch Team:** True`);
    if (banned) descriptionParts.push(`-# **Banned:** True`);

    const fields = [
      { name: 'ID', value: user.id.toString(), inline: true },
      { name: 'Followers', value: followers.toLocaleString(), inline: true },
      { name: 'Following', value: following.toLocaleString(), inline: true },
      { name: 'Joined', value: `<t:${joined}:D>`, inline: true },
      { name: 'Projects', value: projects.toLocaleString(), inline: true },
      { name: 'Studios', value: studios.toLocaleString(), inline: true }
    ];

    if (user.profile.bio) {
      fields.push({ name: 'Bio', value: user.profile.bio });
    }

    const embed = {
      title: user.username,
      url: `https://scratch.mit.edu/users/${user.username}/`,
      description: descriptionParts.length > 0 ? descriptionParts.join('\n') : undefined,
      color: 2894900,
      fields,
      thumbnail: { url: image }
    };

    message.channel.send({ embeds: [embed] });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      // If user not found, try the alternative API
      try {
        const altRes = await axios.get(`https://scratch.mit.edu/users/${encoded}/`);
                      const html = (await axios.get(`https://scratch.mit.edu/users/${encoded}/`)).data;
        const altData = altRes.data;


//  const altUserData = eval(match[1]); // Extract user data
const idMatch = html.match(/userId:\s*(\d+),/);
        const usamatch = html.match(/username:\s*(.+?),/);
const imageMatch = html.match(/thumbnail_url:\s*(.+?),/);

const userId = idMatch ? idMatch[1] : null;
const usa = usamatch ? usamatch[1].replace(/^['"]|['"]$/g, '') : null;
//const imageUrl = imageMatch ? `https://${imageMatch[1]}` : null;
const imageUrl2 = imageMatch ? imageMatch[1].replace(/^['"]|['"]$/g, '') : null;
        const imageUrl = `https:${imageUrl2}`
     //   const userImage = `https:${altUserData.model.thumbnail_url.replace('//', '/')}`;
        const countryMatch = altData.match(/<span class="location">(.+?)<\/span>/);
        const country = countryMatch ? countryMatch[1] : '';
        const statusMatch = altData.match(/<span title="([0-9]+)">(.+?)<\/span>/);
        const status = statusMatch ? statusMatch[2] : '';
        const joinedMatch = altData.match(/<span title="(.+?)">(.+?)<\/span>/);
        const joined = Math.floor(new Date(joinedMatch[1]).getTime() / 1000);
            const [followersPage, followingPage, studiosPage, project] = await Promise.all([
      axios.get(`https://scratch.mit.edu/users/${encoded}/followers/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/following/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/studios/`),
      axios.get(`https://scratch.mit.edu/users/${encoded}/projects/`),
    ]);



    // Extract Followers count using match
    const followersMatch = followersPage.data.match(/Followers\s*\(([\d,]+)\)/);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/,/g, ''), 10) : 0;

    // Extract Following count using match
    const followingMatch = followingPage.data.match(/Following\s*\(([\d,]+)\)/);
    const following = followingMatch ? parseInt(followingMatch[1].replace(/,/g, ''), 10) : 0;
        
     const projectm = project.data.match(/Shared Projects\s*\(([\d,]+)\)/);
    const projects = projectm ? parseInt(projectm[1].replace(/,/g, ''), 10) : 0;
//let 
    // Extract Shared Projects count using match
 //   projects = banned ? 0 : (() => {
 ///     const projectsMatch = projectsPage.data.match(/Shared Projects\s*\(([\d,]+)\)/);
//      return projectsMatch ? parseInt(projectsMatch[1].replace(/,/g, ''), 10) : 0;
 //   })();

    // Extract Studios count using match
    const studiosMatch = studiosPage.data.match(/Studios I Curate\s*\(([\d,]+)\)/);
    const studios = studiosMatch ? parseInt(studiosMatch[1].replace(/,/g, ''), 10) : 0;

        const descriptionParts = [];
    if (status) descriptionParts.push(`"${status}"`);
    if (country) descriptionParts.push(`-# **Country:** ${country}`);

        const fields = [
          { name: 'ID', value: userId.toString(), inline: true },
      { name: 'Followers', value: followers.toLocaleString(), inline: true },
      { name: 'Following', value: following.toLocaleString(), inline: true },
      { name: 'Joined', value: `<t:${joined}:D>`, inline: true },
      { name: 'Projects', value: projects.toLocaleString(), inline: true },
      { name: 'Studios', value: studios.toLocaleString(), inline: true }
        ];

        const embed = {
          title: usa,
          url: `https://scratch.mit.edu/users/${usa}/`,
          description: descriptionParts.join('\n'),
          color: 2894900,
          fields,
          thumbnail: { url: imageUrl }
        };

        message.channel.send({ embeds: [embed] });
      } catch (err) {
        //console.error(err);
      return message.channel.send({
        embeds: [
          {
            description: `[${'``'}${username}${'``'}](https://scratch.mit.edu/users/${encodeURIComponent(username)}/) was not found`,
            color: 2894900
          }
        ]
      });
    
      }
    } else {
      console.error(err);
      message.channel.send('error');
    }
  }
});

//ewf
client.login(process.env.TOKEN);
client2.login(process.env.TOKEN2);