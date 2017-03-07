var usertest = {
  "greeting": "Welcome to usertest.sh!",
  "question": "What is your favorite CLI tool?"
};

terminal = new Terminal({
  cursorBlink: true
})

var shellprompt = "$ ";

terminal.prompt = function() {
  terminal.write("\r\n" + shellprompt);
};

terminal.open(document.getElementById('terminal'));
terminal.writeln(usertest.greeting);
terminal.write(usertest.question + " ");

terminal.on('key', function(key, ev) {
  var printable = (
    !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
  );
  if (ev.keyCode == 13) {
          terminal.prompt();
  }
  else if (ev.keyCode == 8) {
    if (terminal.x > shellprompt.length) {
      terminal.write('\b \b');
    }
  }
  else if (printable) {
    terminal.write(key);
  }
});
