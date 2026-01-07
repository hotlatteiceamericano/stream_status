import fs from "fs";

const todoFile = fs.readFileSync("TODO.md", "utf8").split("\n");
console.log(`number of todoFile lines: ${todoFile.length}`);

const done = [];
const todo = [];

for (const line of todoFile) {
	const match = line.match(/- \[([ xX]?)\] (.+)/);
	if (!match) {
		console.log(`no match for line:  ${line}`);
		continue;
	}

	const checked = match[1] === "x";
	const task = match[2];

	if (checked) {
		console.log("found completed todo");
		done.push(task);
	} else {
		console.log("found  todo");
		todo.push(task);
	}
}

console.log(`number of todo: ${todo.length}`);
const status = JSON.parse(fs.readFileSync("status.json", "utf8"));

status.done = done;
status.current = todo.length === 0 ? status.current : todo.shift();
status.next = todo.length === 0 ? '' : todo.shift();

fs.writeFileSync("status.json", JSON.stringify(status, null, 2));

