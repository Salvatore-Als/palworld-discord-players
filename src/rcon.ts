import { RconClient } from "rconify";

export class RconProvider {
    public async run(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const start = new Date().getTime();

            this.sendRconCommand("Info")
                .then(() => {
                    console.info(`[Discord Provider] Running in ${(new Date().getTime() - start) / 1000}ms`);

                    return resolve(true);
                }).catch((error: any) => {

                    console.info(`[Discord Provider] Running in ${(new Date().getTime() - start) / 1000}ms with error ${error}`);
                    return resolve(false);
                });
        });
    }

    public async sendRconCommand(command: string) {
        const client: RconClient = await this._rconConnect();
        const result: string = await client.sendCommand(command);

        client.disconnect();

        return result;
    }

    private async _rconConnect(): Promise<RconClient> {
        const client: RconClient = new RconClient({
            host: process.env.SERVER_IP,
            port: parseInt(process.env.RCON_PORT),
            password: process.env.RCON_PASSWORD,
            ignoreInvalidAuthResponse: false
        });

        await client.connect();
        return client;
    }
}