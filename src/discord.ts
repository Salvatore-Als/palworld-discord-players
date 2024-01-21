import * as Discord from 'discord.js';
import { Partials, Routes, REST, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default class DiscordProvider {
    private _rest: Discord.REST;

    private _client: Discord.Client = new Discord.Client({
        partials: [
            Partials.Message,
            Partials.Channel,
        ],
        intents: []
    });

    get client(): Discord.Client {
        return this._client;
    }

    constructor() {
        this._rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

        process.on('SIGINT', () => {
            process.exit()
        });

        process.on('exit', () => {
            this._client.destroy();
        });
    }

    public async run(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const start = new Date().getTime();

            this._client.login(process.env.DISCORD_TOKEN.toString());

            this._client.on('ready', async (client: Discord.Client<true>) => {

                await this._rest.put(
                    Routes.applicationCommands(client.user.id), {
                    body: [this.buildPlayersCommand().toJSON()]
                });

                console.info(`[Discord Provider] Running in ${(new Date().getTime() - start) / 1000}ms`);
                return resolve();
            });

            this._client.on('error', (error) => {
                return reject(`[Discord Provider] Connect error ${error}`);
            });
        });
    }

    private buildPlayersCommand(): SlashCommandBuilder {
        const command: Discord.SlashCommandBuilder = new SlashCommandBuilder()
            .setName(process.env.COMMAND_NAME)
            .setDescription("Display player from Palworld server");

        return command;
    }
}