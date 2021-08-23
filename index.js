const chalk = require('chalk');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
const exec = require('child_process').execFile;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Set user details
const account = os.userInfo().username;

console.clear();

const f = fs.readdirSync('./');
if (!f.includes('osu!')) {
    log(3, 'No osu! folder found in directory.');
    process.exit();
}
log(1, `Setting up for user ${account}.`);
log(0, 'Reading configuration files...');
const files = fs.readdirSync('./osu!').filter((file) => file.endsWith('.cfg') && file != 'osu!.cfg');

let array = [];
for (let i = 0; i < files.length; i++) {
    const content = fs.readFileSync(`./osu!/${files[i]}`, { encoding: 'utf8' });
    const arr = content.split('\r');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace('\n', '');
    }
    const username = arr[0].replace('# osu! configuration for ', '');
    array.push({ account: username, fileName: files[i] });
}

if (array.length == 1) {
    log(1, `Using profile ${chalk.bold(chalk.magenta(array[0].account))}`);
    fs.renameSync(`./osu!/${array[0].fileName}`, `./osu!/osu!.${account}.cfg`);
    log(0, 'Renamed config file for user ' + account + '.');
    log(1, 'Done! Press enter to launch osu! or use CTRL + C to exit now.');
    const directory = process.execPath.split('\\');
    directory.pop();
    rl.question('', () => {
        console.clear();
        log(2, chalk.bgRed(chalk.white('DO NOT CLOSE THIS CONSOLE WINDOW!')));
        log(2, `Selected profile: ${chalk.bold(chalk.magenta(array[0].account))}`);
        log(2, 'Launching osu!...');
        const child = exec(`${directory}\\osu!\\osu!.exe`, async (err) => { // Not handled: stdout, stderr
            if (err) {
                log(3, 'Coult not start osu!.');
                log(3, err);
                return;
            }
        });
        child.on('exit', (code) => {
            if (code == 0) return process.exit();
            log(2, 'osu! exited with exit code ' + code + '. Press enter to exit.');
            rl.question('', () => {
                process.exit();
                return;
            });
        });
        return;
    });
    return;
}
log(1, 'Found the following configuration files:');
for (let i = 0; i < array.length; i++) {
    log(1, `${i+1}: ${chalk.bold(chalk.blue(array[i].account))}`);
}
let inp;
rl.question(chalk.magenta('[INPUT] ') + `Which profile would you like to use? (${1} to ${array.length}) `, (input) => {
    if (isNaN(input) == true) {
        log(3, 'Input requires a number, recieved ' + typeof(input) + '.');
        process.exit();
    }
    inp = input - 1;
    const selected = array.splice(inp, 1)[0];
    log(1, `Selected ${chalk.blue(chalk.bold(selected.account))} ${chalk.italic('(' + selected.fileName.replace('osu!.', '').replace('.cfg', '') + ` > ${account}` + ')')}`);
    for (let i = 0; i < array.length; i++) {
        fs.renameSync(`./osu!/${array[i].fileName}`, `./osu!/osu!.unused${Math.floor(Math.random() * 100)}.cfg`);
    }
    log(0, 'Renamed all other unused profiles.');
    fs.renameSync(`./osu!/${selected.fileName}`, `./osu!/osu!.${account}.cfg`);
    log(0, 'Renamed profile to use.');
    log(1, 'Done! Press enter to launch osu! or use CTRL + C to exit now.');
    let directory = process.execPath.split('\\');
    directory.pop();
    directory = directory.join('\\');
    rl.question('', () => {
        console.clear();
        log(2, chalk.bgRed(chalk.white('DO NOT CLOSE THIS CONSOLE WINDOW!')));
        log(2, `Selected profile: ${chalk.bold(chalk.magenta(selected.account))}`);
        log(2, 'Launching osu!...');
        const child = exec(`${directory}\\osu!\\osu!.exe`, async (err) => { // Not handled: stdout, stderr
            if (err) {
                log(3, 'Coult not start osu!.');
                log(3, err);
            }
        });
        child.on('exit', (code) => {
            if (code == 0) return process.exit();
            log(2, 'osu! exited with exit code ' + code + '. Press enter to exit.');
            rl.question('', () => {
                process.exit();
            });
        });
        return;
    });
});

async function log(type, text) {
    if (type == 0) {
        if (process.argv.includes('-d' || '--debug')) console.log(chalk.cyan(chalk.bold('[DEBUG] ')) + text);
    } else if (type == 1) {
        console.log(chalk.green(chalk.bold('[INFO] ')) + text);
    } else if (type == 2) {
        console.log(chalk.yellow(chalk.bold('[WARN] ')) + text);
    } else if (type == 3) {
        console.log(chalk.red(chalk.bold('[ERROR] ')) + text);
    }
}