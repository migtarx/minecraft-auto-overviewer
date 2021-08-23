const CronJob = require('cron').CronJob;
const shell = require('shelljs');
const colors = require('colors');
const config = require('./config.json')
const parser = require('cron-parser');

const cron_patern = `${config.min} ${config.hour} ${config.dayom} ${config.month} ${config.dayow}`
var interval = parser.parseExpression(cron_patern);
console.log(`Minecraft Auto Overviewer Ready! Next Render ${interval.next().toString()}`.green)
var job = new CronJob(cron_patern , function() {
  console.log('Cron Shedule Started!'.green)
    //LAUNCH MINECRAFT OVERVIEWER
    shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_config_loc}`)
    console.log('Render complete!'.green)
    //REMOVES INDEX.HTML AND compass_upper-left TO BE REPLACED BY CUSTOM ONES
    shell.rm('/home/epsilonrebornowo/map-web-server/map/index.html')
    shell.rm('/home/epsilonrebornowo/map-web-server/map/compass_upper-left.png')
    console.log('Copying new assets'.yellow)
    shell.exec('./cp_new_assets.sh')
    console.log('New Assets Copied'.green)
    console.log('AUTO RENDER COMPLETE!'.green)
}, null, true, 'Europe/Madrid');
job.start();
