const CronJob = require('cron').CronJob;
const shell = require('shelljs');
const colors = require('colors');
const parser = require('cron-parser');
const config = require('./config.json');

const cron_patern = `${config.min} ${config.hour} ${config.dayom} ${config.month} ${config.dayow}`;
var interval = parser.parseExpression(cron_patern);

console.log(`Minecraft Auto Overviewer Ready!`.green + ` Next Render scheduled for ${interval.next().toString()}`.yellow);
var job = new CronJob(cron_patern , function() {
    console.log('New Render Started!'.green);
    shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_config_loc}`);
    console.log('Render complete!'.green);
    console.log('Copying new assets'.yellow);
    shell.exec('./cp_new_assets.sh');
    console.log('New Assets Copied'.green);
    console.log(`AUTO RENDER COMPLETE!`.green + ` Last Render: ${interval.prev().toString()}`.cyan);
    console.log(`Next Render scheduled for ${interval.next().toString()}`.yellow)
}, null, true, config.time_zone);
job.start();
