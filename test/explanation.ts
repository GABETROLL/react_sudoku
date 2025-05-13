let globalMessages: string[] = [];

function hook(message: string) {
    globalMessages.push(message);
}

function run(mainCallback: () => void) {
    const lastMessage: string | undefined = globalMessages.pop();
    if (lastMessage !== undefined) {
        globalMessages.push(lastMessage);
    }
    mainCallback();
    const newLastMessage: string | undefined = globalMessages.pop();
    if (newLastMessage !== lastMessage) {
        console.log(`New message: ${newLastMessage}`);
    }
    if (newLastMessage !== undefined) {
        globalMessages.push(newLastMessage);
    }
}

function main() {
    hook("Hello, World!");
}

run(main);
