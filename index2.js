const shell = require('shelljs');
var colors = require('colors');
console.log('Minecraft Auto Overviewer Ready!'.green)
  console.log('Overviewer Running!'.green)
    //LAUNCH MINECRAFT OVERVIEWER
    shell.exec('./launch-render.sh')
    console.log('Render complete!'.green)
    //REMOVES INDEX.HTML AND compass_upper-left TO BE REPLACED BY CUSTOM ONES
    shell.rm('/home/epsilonrebornowo/map-web-server/map/index.html')
    shell.rm('/home/epsilonrebornowo/map-web-server/map/compass_upper-left.png')
    console.log('Copying new assets'.yellow)
    shell.exec('./cp_new_assets.sh')
    console.log('New Assets Copied'.green)
    console.log('AUTO RENDER COMPLETE!'.green)
