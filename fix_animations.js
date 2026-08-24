import fs from 'fs';
import path from 'path';

const srcDir = 'E:\\Zappkode-Solution\\zappcode-AI-19-08\\zappcode-AI\\src';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // Replace animate={inView ? { ... } : {}} with whileInView={ ... } viewport={{ once: true, amount: 0.2 }}
    content = content.replace(/animate=\{inView \? (\{[^}]+\}) : \{\}\}/g, 'whileInView=$1 viewport={{ once: true, amount: 0.2 }}');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated animations in: ${file}`);
        changedFiles++;
    }
});

console.log(`Fixed animations in ${changedFiles} files.`);
