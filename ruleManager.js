const fs = require('fs');
const Rules = require('./rules.json');

class RuleManager {
    static Add(server, command, content) {
        let rule = {
            "command": command,
            "content": content
        };

        if (Rules[server]) {
            Rules[server].forEach(rule => {
                if (rule.command == command) throw new Error('Rule already exists!');
            });

            Rules[server].push(rule);
        } else {
            Rules[server] = [rule];
        }

        this.Save(Rules);
    }

    static Remove(server, command) {
        let destroy
        if (Rules[server] && Rules[server].length >= 0) {

            for (let i = 0; i < Rules[server].length; i++) {
                const rule = Rules[server][i];

                if (rule.command == command) {
                    destroy = rule;
                    break;
                }
            }

            if (!destroy) {
                throw new Error("This rule doesn't exist!");
            }

        } else {
            throw new Error("This server has no rules! IT'S ANARCHY!!!!!");
        }

        Rules[server].splice(Rules[server].indexOf(destroy), 1)

        this.Save(Rules);
    }

    static Get(server, channel_id) {
        if (Rules[server]) {
            return this.BuildMessage(Rules[server], channel_id)
        } else {
            throw new Error("This server has no rules! POST MEMES IN GENERAL!!!!")
        }
    }

    static Save(rules) {
        fs.writeFile("./rules.json", JSON.stringify(rules), function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }

    static BuildMessage(rules, channel_id) {
        let fields = []

        rules.forEach(rule => {
            fields.push({
                "name": `${rule.command}`,
                "value": `${rule.content}`
            })
        });

        return {
            "channel_id": `${channel_id}`,
            "content": "",
            "tts": false,
            "embeds": [
                {
                "type": "rich",
                "title": `Rules`,
                "description": `you will obey.`,
                "color": 0x00FFFF,
                "fields": fields
                }
            ]
        }
    }
}

module.exports = RuleManager