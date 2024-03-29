const { writeFile } = require('fs');// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';// Load node modules
const colors = require('colors');
require('dotenv').config();// `environment.ts` file structure
const envConfigFile = `export const environment = {
    pdsUserKey: '${process.env.PDS_USER_KEY}',
    pdsUserSecret: '${process.env.PDS_USER_SECRET}',
    apiKey: '${process.env.API_KEY}',
    apiGatewayURL: '${process.env.API_GATEWAY_URL}',
    production: ${process.env.PRODUCTION},
    recaptchaKey: '${process.env.RECAPTCHA_SITE_KEY}'
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});
