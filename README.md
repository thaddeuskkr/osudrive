# osu!drive
**A simple application, in Node.js, to help to manage multiple osu! profiles when running on one drive.**  
This can also be used for other osu! servers, as osu! only uses one file for their game configuration. This allows you to easily switch between Bancho and other servers, without having to re-enter your username and password every time.  

### Features
- New profile creation (based on osu!'s default settings)
- Profile deletion
- Multiple server support (passes arguments to osu!, therefore `-devserver` is passed)
- Beautiful command line interface
- Open source and secure (exe not digitally signed however)
- Relatively small file size (only one executable, ~32.5MB)
- No extra dependencies or installation required
- Runs fast

### Download
To download osu!drive, check the [Releases](https://github.com/thaddeuskkr/osudrive/releases) page.  
This application currently only supports Windows, and binaries are already pre built.  
Once downloaded, just move the exe to the directory outside of your osu! install directory (usually `%localappdata%`) and either create a shortcut to it on your desktop or just run it from there.  

### Directory structure
```
.
├── osu!drive.exe             # The exe file that you downloaded
└── osu!                      # Your osu! directory, with the osu! executable inside and a profile already set up.
    ├── osu!.exe              # osu! executable
    └── osu!.thaddeuskkr.cfg  # osu! configuration that is already set up,
                              # can be duplicated to manage multiple profiles
```

### DISCLAIMER
**I am not promoting multi accounting.**  
The entire reason why I set up this project is because I wanted to run osu! off a thumbdrive, and needed a way to manage my friends' accounts and allow switching between computers quickly as osu! names their configuration files after the computer user's name. This program does all of that with a beautiful command line interface.  

### Security  
- osu! stores your hashed passwords in plaintext in configuration files. This program does not save any of these files, but only reads them to make it easier for management.  
- This error pops up on the first time you launch the app.  
![image](https://user-images.githubusercontent.com/49682825/130479012-2841567c-6f52-48c5-b691-dae463c71ef3.png)  
Take note that the file is perfectly safe, and you can check the source code to verify it yourself.  
**To bypass this error, just click `More info` and click `Run anyway`.**  

### Open source  
- You are free to use this program however you want, as long as you abide by the license stated in the LICENSE file (GPL-3.0).  

### Contributing  
- We welcome any code improvements or suggestions. Just make an issue or a PR!  
