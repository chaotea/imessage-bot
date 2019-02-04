const fs = require("fs");
const imessage = require("osa-imessage");

if (process.argv.length != 5) {
    console.log("Usage: node imessagebot.js phone_number file_name time_between_messages_(milliseconds)");
    process.exit(1);
} else if (process.argv[2].length != 10) {
    console.log("Error: phone number must be 10 digits, e.g. 1234567890");
    process.exit(1);
} else if (!(process.argv[3].endsWith(".txt"))) {
    console.log("Error: file must have the .txt extension");
    process.exit(1);
} else if (parseInt(process.argv[4]) < 1000) {
    console.log("Error: time between messages must be at least 1000 milliseconds");
    process.exit(1);
}

var phone_number = process.argv[2];
var file_name = process.argv[3];
var time_between_messages = process.argv[4];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function send(lines) {
    for (var i = 0; i < lines.length; i++) {
        console.log(lines[i]);
        imessage.send(phone_number, lines[i]);
        await sleep(time_between_messages);
    }
}

fs.readFile(file_name, "utf8", function(err, data) {
    if (err) throw err;
    console.log("OK: " + file_name);
    console.log("Sending...")
    lines = data.split(/\n/);
    send(lines);
});
