class RuleManager {
    static Add(server, command, content) {
        console.log(`Added ${command} to ${server} with ${content}`)
    }

    static Remove(server, command) {
        console.log(`Removed ${command} from ${server}`)
    }

    static Get(server) {
        console.log(`Issued list of ${server}`)
        return "gort"
    }
}

module.exports = RuleManager