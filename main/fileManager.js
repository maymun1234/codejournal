// main/fileManager.js

const fs = require('fs');
const path = require('path');

const saveJournal = (data) => {
  const filePath = path.join(__dirname, 'journal.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const loadJournal = () => {
  const filePath = path.join(__dirname, 'journal.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

module.exports = { saveJournal, loadJournal };
