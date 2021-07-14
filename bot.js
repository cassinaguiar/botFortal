require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefixo = '!';
const ytdl = require('ytdl-core');

//const filademusicas = new Map();

let contadorDeWhitelist = 0;
let contadorDeTicket = 0;

const servidores = {
  'server': {
    connection: null,
    dispatcher: null
  }
}
//console & ligar bot// #######################################################################################################################

client.on('ready', () => {
    console.log('Bot foi iniciado'); 

    //client.user.setActivity('discord.gg/fortal-city'),
    client.user.setActivity('Fortal City 🔞')
  });

  //############################################################################################################################################

client.on('message', async (msg) => {

  if (msg.content.startsWith(prefixo + 'ticketsystem')) {

    //msg.react('📩').then();
    const filter = (reaction, bot) => {
      return ['📩'].includes(reaction.emoji.name) === msg.author.bot;
    };

      const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#00FFFF')
      .setTitle('Fortal Ticket')
      .setURL('https://www.youtube.com/watch?v=EdUyO9pCm8o')
      //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('\nAbra um ticket se você deseja:\n\n✦ Realizar uma DENÚNCIA;\n✦ Adquirir um PLANO VIP;\n✦ Solicitar ATENDIMENTO para dúvidas ou suporte.\n\nPara abrir seu ticket, clique na reação :envelope_with_arrow:')
      .setThumbnail('https://i.ibb.co/9yJxx04/fortalbot-1.png')
      .setFooter('Bot desenvolvido por cassiN#1398', 'https://i.ibb.co/9yJxx04/fortalbot-1.png"');

      if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
        msg.channel.bulkDelete(1, true);
      }
      const message = await msg.channel.send(exampleEmbed);

      await message.react('📩')
  }
  
  //filtros

  if (!msg.guild) return;

  if (!msg.content.startsWith(prefixo)) return;

  if (msg.author.bot) return;

  const args = msg.content.slice(config.prefix.lenght).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  //comandos

  //whitelist

  if(msg.content.startsWith(prefixo + 'whitelist')){

    contadorDeWhitelist += 1
    
    await msg.guild.channels.create(`whitelist-${contadorDeWhitelist}`, {
        type: 'text',
        permissionOverwrites: [
            {
                id: msg.author.id,
                //To make it be seen by a certain role, user an ID instead
                //allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
            },
            {
                id: msg.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
        ],
    })

    if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
        msg.channel.bulkDelete(1, true);
    }
  }

 // if(msg.content === prefixo + 'join'){
    //servidores.server.connection = await msg.member.voice.channel.join();
  //}

  //embed whitelist #############################################################################################################################

    if (msg.content.startsWith(prefixo + 'wlfortalsistem')) {
      // send back "Pong." to the channel the message was sent in
      const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#BA55D3')
	.setTitle('Fortal Whitelist')
	.setURL('https://www.youtube.com/watch?v=EdUyO9pCm8o')
	//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Digite `!whitelist` para começar sua WHITELIST!')
	.setThumbnail('https://im5.ezgif.com/tmp/ezgif-5-6970956114c0.gif')
	.setFooter('Bot desenvolvido por cassiN#1398', 'https://i.ibb.co/9yJxx04/fortalbot-1.png"');

      await msg.channel.send(exampleEmbed);
    }

  //############################################################################################################################################

    //comandos musicas #########################################################################################################################

 if(msg.content.startsWith(prefixo + 'play')){
    servidores.server.connection = await msg.member.voice.channel.join();
    let oQueTocar = msg.content.slice(6);
    if(ytdl.validateURL(oQueTocar)){
      servidores.server.dispatcher = servidores.server.connection.play(ytdl(oQueTocar));
    }
    else{
      await msg.channel.send('Link inválido!');
    }
  }
});

//Valida reação do usuario na mensagem para criar canal de ticket

client.on('messageReactionAdd', async (reaction, user) => {
  const message = reaction.message;

  if (message.author.id === "864930370926542868" && message.author.id !== user.id && reaction.emoji.name === "📩") {

    contadorDeTicket += 1

    await message.guild.channels.create(`ticket-${contadorDeTicket}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: user.id,
          //To make it be seen by a certain role, user an ID instead
          //allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
        },
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
      ],
    })
  }

})

 //############################################################################################################################################
client.login(process.env.APP_TOKEN);