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

// Outros
global.owner = ['559491423691','559491423691','559491423691','559491423691','559491423691']
global.sessionName = 'batSession'

// Edite apenas o nescessário:

// Edições na desc da fig:
global.packname = 'nome da fig'
global.author = 'autor na desc da fig'

// Api que eu te mandei (coloque com o https:// mas sem o / no final)
// Forma correta: https://suApi.herokuapp.com
// Forma incorreta: suApi.herokuapp.com/
global.apidados = 'https://apitestekarma.herokuapp.com'; // Compre sua api com o markos: wa.me/559491423691
global.apiToken = 'coloque sua api aqui'; // Compre seu token com o markos: wa.me/559491423691

// Não é importante
global.prefa = ['/']
global.sp = '⭔'
// Fim


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
