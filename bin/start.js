const util = require('util');
const {yamls} = require("@tisf/utils");
const exec = util.promisify(require('child_process').exec);

async function start() {
    const name = yamls.app.name;
    const {stdout, stderr} = await exec(
        `npx react-native init ${name}`,
    );
    try {
        await exec(
            `mv ./${name} ./mobile`,
        );
    } catch (e) {
        console.log(e);
    }
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

module.exports = start;
