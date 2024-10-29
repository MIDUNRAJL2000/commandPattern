interface Command<TState>{
    execute(state: TState): void;
}

class CommandManager<TState>{
    private state: TState
    private history: Command<TState>[] = []
    private index: number = -1

    constructor(initialState: TState){
        this.state = initialState
    }

    execute(command: Command<TState>){
        command.execute(this.state)
        this.history = this.history.slice(0, this.index + 1)
        this.history.push(command)

    }
    batch(commands: Command<TState>[]){
        commands.forEach((command) => this.execute(command))
    }

 
   getCurrentState(){
    return this.state
   }
   getHistory(){
    return this.history
   }
}

interface DocumentState{
    content: string;
}

class InsertTextCommand implements Command<DocumentState>{
    constructor(private text: string, private position: number){}

    execute(state: DocumentState){
        state.content = state.content.slice(0, this.position) + this.text + state.content.slice(this.position)
    }
}

const initialState: DocumentState = 
{
    content: "good morning"
}
const commandManager = new CommandManager(initialState)
const command = new InsertTextCommand("all", 4)
commandManager.execute(command)

console.log(commandManager.getCurrentState())