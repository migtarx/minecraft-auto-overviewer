const shell = require('shelljs');
const colors = require('colors');
const config = require('./config.json');

console.log(`Minecraft Auto Overviewer Ready!`);
console.log('New Render Schedule Started!'.green);

var render_shell_out = shell.exec(`python${config.python_ver} ${config.minecraft_overviewer_loc} --config=${config.minecraft_overviewer_configfile_loc}`);
var renderResult = (render_shell_out.substring(render_shell_out.length - 28, render_shell_out.length)).replace(/\s+/g, '');

if (renderResult != "openindex.htmltoviewit.") {
  console.log(`Error Minecraft Overviewer Render Failed`.red);
  ErrorExit()
} else {
  console.log('Render complete!'.green);
}

console.log('Copying new assets'.yellow);
for (var i = 0; i < config.assets.length; i++) {
  try {
    shell.cp(`./assets/${config.assets[i]}`,`${config.render_out_dir}`);
  } catch (error) {
    console.log('Error while copying assets to render folder'.red);
    ErrorExit()
  }
  console.log(` => ${config.assets[i]} copied to render folder.`.cyan);
}
console.log('New Assets Copied'.green);

console.log(`AUTO RENDER COMPLETE!`.green);

function ErrorExit(){
  console.log(`Failed to complete Minecraft Auto Overviewer schedule`.red)
  console.log(`Exiting Minecraft Auto Overviewer...`.yellow)
  process.exit();
}