import { ExtInteraction } from "../types/extinteraction";

export async function execute(interaction: ExtInteraction): Promise<void> {
    let embed = {
        title: `About ${interaction.client.user.username}`,
        description: 'Hello! I am a moderation bot with several useful utilities. Run /help for more info!',
        color: 0x00008b,
        timestamp: new Date().toISOString(),
        thumbnail: {url: interaction.client.user.avatarURL("png")},
        fields: [
            {
                name: 'Invite',
                value: "[Here](https://discord.com/api/oauth2/authorize?client_id=1020163915189067816&permissions=1376537078806&scope=bot%20applications.commands)"
            },
            {
                name: 'Support',
                value: "[Here](https://discord.gg/q3z4EyWBNe)"
            },
            {
                name : 'Top.gg (Vote Here!)',
                value: "[Here](https://top.gg/bot/1020163915189067816)"
            }
        ]
    }

    await interaction.createMessage({embeds: [embed]});
}