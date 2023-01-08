import { Client } from 'oceanic.js';
import { PrismaClient } from '@prisma/client';
import commands from './commands';
import client from './prisma/client';
import path from 'path';
import fs from 'fs';

const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(f => f.endsWith('.ts'));

class BotClient extends Client {
    spamCache: Map<String, Array<any>> = new Map();
    db: PrismaClient = client;

    async syncCommands(): Promise<void> {
        await this.application.bulkEditGlobalCommands(commands);
        console.log(`${this.getCommandsLength()} commands synced!`)
    }

    async initialize(): Promise<void> {
        console.log(`${this.user.tag} is up! Initializing...`);
        await this.syncCommands();
        await this.db.$connect();
        console.log("Setup complete!");
    }

    getCommandsLength(): number {
        let total = 0;
        for(const co of commands) {
            total += 1;
            if(co.options) {
                for(const op of co.options) {
                    if(op.type == 1) {
                        total += 1;
                    }
                }
            }
        }
        return total;
    }

    startEventHandler() {   
        try {
            for (const f of eventFiles) {
                const fp = path.join(eventPath, f);
                const event = require(fp);
                // triggers 'once' events
                if(event.once) {
                    this.once(event.name, (...args: any[]) => event.execute(this, ...args));
                // triggers 'on' events
                } else {
                    this.on(event.name, (...args: any[]) => event.execute(this, ...args));
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default BotClient;