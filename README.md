# Palworld Discord Players

Welcome to the Palworld Discord Players project ! 

This TypeScript Discord bot is using RCON to display in-game players using the `/pal_players` command (*editable*), with server version and offline state if needed.

## Collaboration with VeryGames

This project is developed in collaboration with [VeryGames](https://verygames.net), a game server provider.

## Configuration

Before launching the bot, make sure to configure the `.env` file with the necessary information:

```env
DISCORD_TOKEN = "YOUR_DISCORD_TOKEN"
BOT_PREFIX = "YOUR_BOT_PREFIX"
SERVER_IP = "YOUR_SERVER_IP"
RCON_PORT = "YOUR_RCON_PORT"
RCON_PASSWORD = "YOUR_RCON_PASSWORD"
COMMAND_NAME = "YOUR_COMMAND_NAME"
```

`BOT_PREFIX` is important because it is possible that the server name, reflected in the bot name, is a real player name.
I therefore advise you to put a prefix in it, in the characters authorized by Discord

## Start the Bot

run the following commands

`npm install`

`npm start`

## How to use the bot ?
Use `/pal_players` on Discord : *Related to your `.env` configuration*

<img width="484" alt="image" src="https://github.com/Salvatore-Als/palworld-discord-players/assets/58212852/61d5d2df-5c16-4c54-8427-f48a974479cd">

