var usertest = {
  "greeting": "Welcome to usertest.sh!",
  "question": "What is your favorite CLI tool?"
};
terminal = new Terminal({
  cursorBlink: true
})
terminal.open(document.getElementById('terminal'));
terminal.writeln(usertest.greeting);
terminal.write(usertest.question);
