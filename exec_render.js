//const CronJob = require('cron').CronJob;
const shell = require('shelljs');
var colors = require('colors');

  console.log('Cron Shedule Started!'.green)
    //LAUNCH MINECRAFT OVERVIEWER
    shell.exec('python3.9 minecraft-overviewer/overviewer.py --config=./minecraft-overviewer/configfile_epsilon.txt')
    console.log('Render complete!'.green)
    //REMOVES INDEX.HTML AND compass_upper-left TO BE REPLACED BY CUSTOM ONES
    shell.rm('/home/epsilonworld/map-web-server/map/index.html')
    shell.rm('/home/epsilonworld/map-web-server/map/compass_upper-left.png')
    console.log('Copying new assets'.yellow)
    shell.exec('./cp_new_assets.sh')
    console.log('New Assets Copied'.green)
    console.log('AUTO RENDER COMPLETE!'.green)
