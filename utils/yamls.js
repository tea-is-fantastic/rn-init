const fs = require('fs');
const path = require("path");
const YAML = require("yaml");
const {dataPath} = require("./paths");

const yamls = {
  app: YAML.parse(fs.readFileSync(path.join(dataPath, 'app.yaml'), 'utf8')),
  assets: YAML.parse(fs.readFileSync(path.join(dataPath, 'assets.yaml'), 'utf8')),
  theme: YAML.parse(fs.readFileSync(path.join(dataPath, 'theme.yaml'), 'utf8')),
};

module.exports = {yamls};
