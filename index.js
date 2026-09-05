const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'idiotgg.falix.gg', // Zmień na adres IP swojego serwera
    port: 25565,               // Zmień na swój port (jeśli jest inny)
    auth: 'microsoft',
    profilesFolder: './ms-auth-cache', // Zapamiętuje logowanie Microsoft
    username: 'wojmat14.osoba@outlook.com'  // Twój e-mail lub nick z konta Microsoft
  });

  bot.on('login', () => {
    console.log('✅ Bot pomyślnie zalogował się przez Microsoft!');
  });

  bot.on('spawn', () => {
    console.log('🎮 Bot wszedł do gry i utrzymuje aktywność serwera.');
    
    // Podskakuje co 30 sekund, aby gra nie wyrzuciła go za AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', (reason) => {
    console.log(`⚠️ Rozłączono (${reason}). Ponowne łączenie za 15 sekund...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('❌ Błąd połączenia:', err);
  });
}

createBot();
