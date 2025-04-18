const { ShardingManager } = require('discord.js');
require('dotenv').config();

const manager = new ShardingManager('./index.js', {
    token: process.env.TOKEN,
    totalShards: 'auto',
    mode: 'process',
});

manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`);
});

manager.spawn().catch(error => {
    console.error('Error spawning shards:', error);
});