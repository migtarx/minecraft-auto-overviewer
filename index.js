const CronJob = require('cron').CronJob;
const shell = require('shelljs');
const colors = require('colors');
const config = require('./config.json');
const parser = require('cron-parser');

const cron_patern = `${config.min} ${config.hour} ${config.dayom} ${config.month} ${config.dayow}`;
var interval = parser.parseExpression(cron_patern);

console.log(`Minecraft Auto Overviewer Ready! Next Render ${interval.next().toString()}`.green);

var job = new CronJob(cron_patern , function() {
    console.log('Cron Shedule Started!'.green);
    shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_config_loc}`);
    console.log('Render complete!'.green);
    console.log('Copying new assets'.yellow);
    shell.exec('./cp_new_assets.sh');
    console.log('New Assets Copied'.green);
    console.log(`AUTO RENDER COMPLETE! Last Render: ${interval.prev().toString()}`.green);
}, null, true, config.time_zone);
job.start();
