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


https://s3.amazonaws.com/www.potomacdriving.com
// potomacdriving.com	A	Simple	- dpmkjj7pld4zw.cloudfront.net.
// 	potomacdriving.com	MX	Simple	- 10 inbound-smtp.us-east-1.amazonaws.com.
// 	potomacdriving.com	NS	Simple	- ns-236.awsdns-29.com.
// ns-1412.awsdns-48.org.
// ns-871.awsdns-44.net.
// ns-1966.awsdns-53.co.uk.
// 	potomacdriving.com	SOA	Simple	- ns-236.awsdns-29.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400
// 	potomacdriving.com	TXT	Simple	- "v=spf1 include:amazonses.com ~all"
// 	_amazonses.potomacdriving.com	TXT	Simple	- "WvB9AJxf4HQQ+gQ1s4x1u6kEkU3nYn9zrWqZO/awBNA="
// 	_dmarc.potomacdriving.com	TXT	Simple	- "v=DMARC1;p=quarantine;pct=100;fo=1"
// 	mxxbgd5rogttdhcttqowv52rnl2cipxu._domainkey.potomacdriving.com	CNAME	Simple	- mxxbgd5rogttdhcttqowv52rnl2cipxu.dkim.amazonses.com.
// 	ukpujacghyjkwew2ztdcg5ozcwrqff4o._domainkey.potomacdriving.com	CNAME	Simple	- ukpujacghyjkwew2ztdcg5ozcwrqff4o.dkim.amazonses.com.
// 	yybp6xlrvvb55cf7qdct6wtyl3vmfu3y._domainkey.potomacdriving.com	CNAME	Simple	- yybp6xlrvvb55cf7qdct6wtyl3vmfu3y.dkim.amazonses.com.
// 	_e76d9bf514fbcb0b9af501eb83d1bebf.potomacdriving.com	CNAME	Simple	- _77a1f11fb147a6572c198753e9c038f6.bbfvkzsszw.acm-validations.aws.
// 	autodiscover.potomacdriving.com	CNAME	Simple	- autodiscover.mail.us-east-1.awsapps.com.
// 	www.potomacdriving.com	CNAME	Simple	- dpmkjj7pld4zw.cloudfront.net