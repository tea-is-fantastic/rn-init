const path = require("path");

const src = path.join(process.env.INIT_CWD, 'mobile');
const dataPath = path.join(process.env.INIT_CWD, 'data');

module.exports = {src, dataPath};
