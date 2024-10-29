"use strict";
class CommandManager {
    constructor(initialState) {
        this.history = [];
        this.index = -1;
        this.state = initialState;
    }
    execute(command) {
        command.execute(this.state);
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(command);
    }
    batch(commands) {
        commands.forEach((command) => this.execute(command));
    }
    getCurrentState() {
        return this.state;
    }
    getHistory() {
        return this.history;
    }
}
class InsertTextCommand {
    constructor(text, position) {
        this.text = text;
        this.position = position;
    }
    execute(state) {
        state.content = state.content.slice(0, this.position) + this.text + state.content.slice(this.position);
    }
}
const initialState = {
    content: "good morning"
};
const commandManager = new CommandManager(initialState);
const command = new InsertTextCommand("all", 4);
commandManager.execute(command);
console.log(commandManager.getCurrentState());
