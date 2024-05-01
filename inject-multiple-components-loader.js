const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const components = this.getOptions().components || [];

  components.forEach(component => {
    const componentPath = path.resolve(__dirname, component.path);
    const componentHtml = fs.readFileSync(componentPath, 'utf8');
    source = source.replace(component.placeholder, `<div>${componentHtml}</div>`);
  });

  return source;
};
