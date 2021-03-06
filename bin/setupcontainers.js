/*

Copyright 2018 Akshit Grover

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

const path = require('path');
const fs = require('fs');

const config = require('../config/.containers.json');

const setup = (args) => {
  let lang = null;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--') && args[i].slice(2) in config) {
      lang = args[i].slice(2);
    } else if (lang !== null) {
      let flag;
      try {
        flag = parseInt(args[i], 10);
        if (flag < 0 || Number.isNaN(flag)) {
          throw Error(`
            Number of containers should be a whole number, Given: ${flag}
          `.trim());
        }
      } catch (err) {
        process.stderr.write(`${err.message}\n`);
        break;
      }
      config[lang] = flag;
    }
  }
  fs.writeFileSync(
    path.join(__dirname, '../config/.containers.json'),
    `${JSON.stringify(config)}\n`,
  );
  process.stdout.write('Successfully configured\n');
};

module.exports = (args) => {
  setup(args);
};
