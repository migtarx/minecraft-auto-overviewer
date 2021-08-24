const shell = require('shelljs');
const colors = require('colors');
const config = require('./config.json');

console.log(`Minecraft Auto Overviewer Ready!`);
console.log('New Render Started!'.green);
console.log(config.render_out_dir)
try {
  shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_configfile_loc}`);
} catch (error) {
  console.log(`Error. Render Failed`.red);
  console.log(`Saving error into log file`);
  console.log(`Exiting Minecraft Auto Overviewer...`);
  return;
}
console.log('Render complete!'.green);
console.log('Copying new assets'.yellow);
//shell.exec('./cp_new_assets.sh');
shell.cp(`./assets/compass_upper-left.png`,`${config.render_out_dir}`)
shell.cp(`./assets/index.html`, `${config.render_out_dir}`)
shell.cp(`./assets/favicon.png`, `${config.render_out_dir}`)
console.log('New Assets Copied'.green);
console.log(`AUTO RENDER COMPLETE!`.green);