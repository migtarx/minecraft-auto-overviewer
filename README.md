# Minecraft Auto Overviewer

Minecraft Auto Overviewer is a server side app that automates [Overviewer](https://github.com/overviewer/Minecraft-Overviewer/) renders using cron and shelljs npm dependencies. Minecraft Auto Overviewer will allow you to execute a Overviewer render when ever you want. Can be multiple times in a day, onces everyday, onces a week, onces a month...

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/migtarx/minecraft-auto-overviewer.git
   ```
2. Install npm dependencies
    ```sh
   npm install
   ```

## Usage
First of all you will need to set up the config file.

This is a `config.json` file example.

This render will be using python3.9 for the rendering process and it will be executed everyday at 5:55 am `Europe/Madrid` time. It will execute the render picking up the `overviewer.py` from `/home/migtarx/minecraft-overviewer/` and rendered out to `/home/migtarx/web-server/map/` where also `assets` will be copied out too.

This render will be also picking the config file required for custom render paramethers from `/home/migtarx/minecraft-overviewer/render_config.txt`. A config file is required for at least tell overviewer where to pick the world and where to render it.
```json
{
    "python_ver": "3.9",
    "time_zone": "Europe/Madrid",
    "min": "55",
    "hour": "5",
    "dayom": "*",
    "month": "*",
    "dayow": "*",
    "minecraft_overviewer_loc": "/home/migtarx/minecraft-overviewer/",
    "minecraft_overviewer_configfile_loc": "/home/migtarx/minecraft-overviewer/render_config.txt",
    "render_out_dir": "/home/migtarx/web-server/map/",
    "assets": ["compass_upper-left.png", "index.html", "favicon.png"]
}
```


* `python_ver` stands for selecting your system python version. As minimum you will requiere python 3 for running  [Overviewer](https://overviewer.org/).
* `time_zone` is required to lend cron check in what time zone locate the schedules. Check in this [json file ](https://gist.github.com/migtarx/8823cc03b3d76d0577f2e5c59f4fdd8e) all available time zones.
* `min` `hour` `dayom` `month` `dayow` are one of the key parts of the program it self. With this variables you will be able to set up your rendering schedules (Check more about [cron tab schedules](https://github.com/lathonez/dotfiles/blob/master/crontab/example.crontab) for a better understanding of how cron works). You can also check [Cron Guru](https://crontab.guru/) for testing when your next schedule is gonna be executed by entering the cron pattern (in the example case `5 55 * * *`) In case that you are not going to use all the variables, do not leave them empty, just right as the example up bellow a `*` symbol in each one you do not want to use.
* `minecraft_overviewer_loc` path to where the overviewer program is located. You can get it on [overviewer.org](https://overviewer.org) as well as related documentation to setup it up.
* `minecraft_overviewer_configfile_loc` path to where is the overviewer config file located. This is an [example](https://gist.github.com/migtarx/00c3693ec2c73f70da572ae14760dd98) of how a config file should be for full world render with all dimensions. Learn more about in [Overviewer Official Documentation](http://docs.overviewer.org/en/latest/).
* `render_out_dir` path to where the render its gonna be rendered (same as the one you selected in the [Minecraft Overviewer config file](https://gist.github.com/migtarx/00c3693ec2c73f70da572ae14760dd98) to render out your world. 
* `assets` field it's where you just need to place the name with extention of all the files you want Auto Overviewer copy to the render dir (as its shown in the example up bellow). In the example case `compass_upper-left.png` it's a modified asset from overviewer which was a simple compass but in my case I replaced it with [Epsilon SMP](https://epsilonsmp.world) logo. `index.html` it's a modified index which already has the top title already changed and with favicon added aswell, and thats why the next asset in the list it's called `favicon.png` which will be the icon place next to the title in your browser tabs.

With the `config.json` already configured now it's time to launch the program. There are two ways of executing MInecraft Auto Overviewer. One with the `index.js` (will execute the schedules selected in the config file) or with the `exec_render.js` (will execute an instant render as it will with a schedule).

For launching the Minecraft Auto Overviewer with your pre configured schedules
```sh
node index.js
```
For a extraordinary render executing (instant render)
```sh
node exec_render.js
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
