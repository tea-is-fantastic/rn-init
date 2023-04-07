#!/usr/bin/env node
require("./env");
const {argv} = require("@tisf/utils");

const f = {
    start: require("./bin/start"),
    setup: require('./bin/setup'),
    structure: require('./bin/structure'),
    assets: require('./bin/assets'),
    icon: require('./bin/icon'),
    nav: require('./bin/navigation'),
    theme: require("./bin/theme"),
    bottom: require("./bin/bottom"),
    splash: require('./bin/splash'),
    firebase: require('./bin/firebase'),
}

async function setup() {
    if(argv.s) {
        f[argv.s]();
        return
    }
    console.log("start");
    await f.start();
    console.log("setup");
    await f.setup();
    console.log("structure");
    await f.structure();
    console.log("assets");
    await f.assets();
    console.log("icon");
    await f.icon();
    console.log("nav");
    await f.nav();
    console.log("theme");
    await f.theme();
    console.log("bottom");
    await f.bottom();
    console.log("splash");
    await f.splash();
    console.log("firebase");
    await f.firebase();
}

setup();
