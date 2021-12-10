
const folder_structure = require('./readme/folder_structure');
const install_process = require('./readme/install_process');
const how_to_use_it = require('./readme/how_to_use_it');

const main_readme_template = {
    file_name: "README.md",
    scroll_title: "🧾 V_Database - README.md",
    scroll_info: "Simple way to make data available in your website/application for a single database.",
    layout: [
        install_process,
        how_to_use_it,
        folder_structure
    ],
    output: "./"
};

module.exports = main_readme_template;