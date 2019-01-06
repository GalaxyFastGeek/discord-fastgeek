const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame("A vous servir !");
});

client.on('message', message => {
  if (message.content === ".help"){
    var help_embed = new Discord.RichEmbed()
    .setColor("#40A497")
    .setTitle("Voici les commandes du bot !")
    .setDescription("Je suis le bot de FastGeek prêt à vous servir !")
    .addField(".help", "Affiche les commandes disponible !")
    .addField(".kick", "Cette commande permet de kick un joueur !")
    message.channel.sendMessage(help_embed);
    console.log("Un utilisateur vient d'effectué la commande .help !")
  }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('.kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

client.on('message', message => {
  if(message.content.startsWith('.clear')) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("Tu dois préciser un nombre de message à supprimer !")
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`${args[0]} messages ont été suprimé !`);
    })
  }
});

client.on('message', message => {
  if(message.content.startsWith(".mute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
        message.channel.send(`${mute.user.username} est mute !`);
    })
  }
});

client.on('message', message => {
  if(message.content.startsWith(".unmute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
        message.channel.send(`${mute.user.username} n'est plus mute !`);
    })
  }
});

client.on('message', message => {
  if (!message.guild) return;

if (message.content.startsWith('.ban')) {
  const user = message.mentions.users.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member.ban({
        reason: 'They were bad!',
      }).then(() => {
        message.reply(`Successfully banned ${user.tag}`);
      }).catch(err => {
        message.reply('I was unable to ban the member');
        console.error(err);
      });
    } else {
      message.reply('That user isn\'t in this guild!');
    }
  } else {
    message.reply('You didn\'t mention the user to ban!');
  }
}

});

client.login('NTEzMzY3MTQxMDc3MDkwMzA0.DtLSRg.07GTZoDtSYjJbEVd_yOc-A0xaFo');
