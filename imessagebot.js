const imessage = require("osa-imessage")
const fs = require("fs")

if (process.argv.length != 4) {
    console.log("Usage: node imessagebot.js file_name phone_number")
    process.exit(1)
} else if (!(process.argv[2].endsWith(".txt"))) {
    console.log("Error: file must have the .txt extension")
    process.exit(1)
} else if (process.argv[3].length != 10) {
    console.log("Error: phone number must be 10 digits, e.g. 1234567890")
    process.exit(1)
}

var file_name = process.argv[2]
var phone_number = process.argv[3]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function send(lines) {
    for (let i = 0; i < lines.length; i++) {
        imessage.send(phone_number, lines[i])
        console.log("Sent: " + lines[i])
        await sleep(1000)
    }
}

fs.readFile(file_name, "utf8", function(err, data) {
    if (err) throw err
    console.log("OK: " + file_name)
    console.log("Sending...")
    lines = data.split(/\n/)
    send(lines)
})
