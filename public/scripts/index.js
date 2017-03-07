var usertest = {
  "greeting": "Welcome to usertest.sh! This is from the JSON object"
};
terminal = new Terminal({
  cursorBlink: true
})
terminal.open(document.getElementById('terminal'));
terminal.writeln(usertest.greeting);
