// Read from TODO.md and update the status.json
import fs from "fs";

const todoFile = fs.readFileSync("TODO.md", "utf8").split("\n");
console.log(`number of todoFile lines: ${todoFile.length}`);

const done = [];
const todo = [];

for (const line of todoFile) {
	const match = line.match(/- \[([ xX]?)\] (.+)/);
	if (!match) {
		continue;
	}

	const checked = match[1] === "x";
	const task = match[2];

	if (checked) {
		done.push(task);
	} else {
		todo.push(task);
	}
}

const status = JSON.parse(fs.readFileSync("status.json", "utf8"));

status.done = done;
status.current = todo.length === 0 ? status.current : todo.shift();
status.next = todo.length === 0 ? '' : todo.shift();

fs.writeFileSync("status.json", JSON.stringify(status, null, 2));

