import * as Discord from 'discord.js';
import DiscordProvider from './discord';
import { RconProvider } from './rcon';

const AVATAR: string = "data:image/png;base64,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";

enum IColor {
    Danger = "#FF0008",
    Info = "#3e78dc",
}

export class App {
    private _discordProvider: DiscordProvider = new DiscordProvider();
    private _rconProvider: RconProvider = new RconProvider();
    private _client: Discord.Client = null;
    private _isServerOnline: boolean = false;

    constructor() {

    }

    public async run(): Promise<void> {
        try {
            await this._discordProvider.run();
            this._isServerOnline = await this._rconProvider.run();

            this._client = this._discordProvider.client;

            await this._tick();

            this._subscribe();
        } catch (error: any) {
            console.error(error);
            process.exit(0);
        }
    }

    private _subscribe(): void {
        setInterval(async () => {
            this._tick();
        }, 2 * 60 * 1000);

        this._client.on('interactionCreate', async (interaction: Discord.Interaction<Discord.CacheType>) => {
            if (!interaction.isChatInputCommand()) {
                return;
            }

            if (interaction.commandName != process.env.COMMAND_NAME) {
                return;
            }

            this._showPlayers(interaction);
        });
    }

    private async _tick(): Promise<void> {
        try {
            const info: string = await this._rconProvider.sendRconCommand('Info');
            const { name, version } = this._serverInformation(info);

            this._isServerOnline = true;

            await this._updateClientInformations(name, version);
        } catch (error) {
            await this._updateClientInformations(this._client.user.username, "Offline");
            this._isServerOnline = false;
        }
    }

    private async _showPlayers(interaction: Discord.ChatInputCommandInteraction<Discord.CacheType>): Promise<void> {
        try {
            if (!this._isServerOnline) {
                this._sendError(interaction, "The server is currently offline");
                return;
            }

            const showPlayers: string = await this._rconProvider.sendRconCommand('ShowPlayers');

            const realPlayers: string = showPlayers.replace('name,playeruid,steamid', '');
            const players: string[] = realPlayers
                .split('\n')
                .filter((player: string) => player.trim()?.length > 0);

            const description: string = players?.length ? players.map((player: string) => this._displayedPlayer(player)).join('\n') : "There is no online players"

            const embeded: Discord.EmbedBuilder = new Discord.EmbedBuilder();
            embeded
                .setTitle(`Connected players : ${players.length}`)
                .setThumbnail("https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg?t=1705662211")
                .setColor(IColor.Info)
                .setDescription(description);
            await interaction.reply({ embeds: [embeded], ephemeral: true });

        } catch (error: any) {
            this._sendError(interaction, "Unable to find players");
            throw error;
        }
    }

    private async _updateClientInformations(name: string, version: string): Promise<void> {
        const promises: Promise<any>[] = [
            this._client.user.setActivity(version) as any
        ];

        if (this._client.user.username != name) {
            promises.push(this._client.user.setUsername(`${process.env.BOT_PREFIX}${name}`));
        }

        if (this._client.user.avatar != AVATAR) {
            promises.push(this._client.user.setAvatar(AVATAR));
        }

        try {
            await Promise.all(promises);
        } catch (error: any) {
            console.log(`Update client informations error ${error}`);
        }
    }

    private _displayedPlayer(player: string): string {
        const informations: string[] = player.split(',');
        return `[${informations[0]}](https://steamcommunity.com/profiles/${informations[2]})`;
    }

    private _serverInformation(info: string): { version: string, name: string } {
        const [, restOfInfo] = info.split('[');
        const [version, nameWithBracket] = restOfInfo.split('] ');
        const name: string = nameWithBracket.replace('\n', '');

        return {
            version: version.trim(),
            name: name
        };
    }

    private async _sendError(interaction: Discord.ChatInputCommandInteraction<Discord.CacheType>, error: string): Promise<void> {
        const embeded: Discord.EmbedBuilder = new Discord.EmbedBuilder();
        embeded
            .setTitle("Ohh snap !")
            .setColor(IColor.Danger)
            .setDescription(error);
        await interaction.reply({ embeds: [embeded], ephemeral: true });
    }
}