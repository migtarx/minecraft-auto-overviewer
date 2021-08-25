const CronJob = require('cron').CronJob;
const shell = require('shelljs');
const colors = require('colors');
const parser = require('cron-parser');
const config = require('./config.json');

const cron_patern = `${config.min} ${config.hour} ${config.dayom} ${config.month} ${config.dayow}`;
var interval = parser.parseExpression(cron_patern);

console.log(`Minecraft Auto Overviewer Ready!`.green + ` Next Render scheduled for ${interval.next().toString()}`.yellow);
var job = new CronJob(cron_patern, function() {

    console.log('New Render Schedule Started!'.green);
    var render_shell_out = shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_configfile_loc}`);
    var renderResult = (render_shell_out.substring(render_shell_out.length - 28, render_shell_out.length)).replace(/\s+/g, '');

    if (renderResult != "openindex.htmltoviewit.") {
        console.log(`Error Minecraft Overviewer Render Failed`.red);
        ErrorExit();
    } else {
        console.log('Render complete!'.green);
    };

    console.log('Copying new assets'.yellow);
    for (var i = 0; i < config.assets.length; i++) {
        try {
            shell.cp(`./assets/${config.assets[i]}`, `${config.render_out_dir}`);
        } catch (error) {
            console.log('Error while copying assets to render folder'.red);
            ErrorExit()
        }
        console.log(` => ${config.assets[i]} copied to render folder.`.cyan);
    }
    console.log('New Assets Copied'.green);
    console.log(`AUTO RENDER COMPLETE!`.green + ` Last Render: ${interval.prev().toString()}`.cyan);
    console.log(`Next Render scheduled for ${interval.next().toString()}`.yellow);
}, null, true, config.time_zone);
job.start();

function ErrorExit() {
    console.log(`Failed to complete Minecraft Auto Overviewer schedule`.red)
    console.log(`Exiting Minecraft Auto Overviewer...`.yellow)
    process.exit();
}