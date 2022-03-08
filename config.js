/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
⚠️⚠️ ATENÇÃO ⚠️⚠️
Essa versão de software é paga. Peço que não divulgue ela
*
Caso divulgue algum comando deixe os créditos, fazer ele foi desgaste. 
*
Agradeço pela compreensão. 
*/

const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
	zenz: 'https://zenzapi.xyz',
}

// Apikey Website Api
global.APIKeys = {
	'https://zenzapi.xyz': 'Your Key',
}

// Other
global.owner = ['559491423691','559491423691','559491423691','559491423691','559491423691']
global.packname = '🔎 bot de consultas - Karma'
global.author = '🛠 www.irisbot.com.br'
global.sessionName = 'batSession'
global.prefa = ['/']
global.sp = '⭔'
global.mess = {
    success: '✓ Success',
    admin: 'n',
    botAdmin: 'n',
    owner: 'n',
    group: 'n',
    private: 'n',
    bot: 'n',
    wait: 'Aguarde...',
}
global.thumb = fs.readFileSync('./lib/bat.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
