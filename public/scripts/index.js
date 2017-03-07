var usertest = {
  "greeting": "Welcome to usertest.sh!",
  "question": "What is your favorite CLI tool?"
};

terminal = new Terminal({
  cursorBlink: true
})

var shellprompt = "$ ";
var commandBuffer = "";
var commandBufferOffset = 0;
var commandHistory = [];

terminal.prompt = function() {
  terminal.write("\r\n" + shellprompt);
};

terminal.open(document.getElementById('terminal'));
terminal.insertMode = true;
terminal.writeln(usertest.greeting);
terminal.write(usertest.question + " ");

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

terminal.on('key', function(key, ev) {
  var printable = (
    !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
  );
  var keyActions = {
    "13": function() {
      commandHistory.push(commandBuffer);
      commandBuffer = "";
      terminal.prompt();
    },
    "8": function() {
      if (commandBufferOffset) {
        commandBuffer = commandBuffer.slice(0,-1);
        terminal.write('\b \b');
      }
    },
    "37": function() {
      if (commandBufferOffset < commandBuffer.length) {
        commandBufferOffset += 1;
        var remainingBuffer = commandBuffer.slice(commandBufferOffset);
        console.log(commandBuffer);
        terminal.write(key);
      }
    },
    "39": function() {
      if (commandBufferOffset > 0 ) {
        commandBufferOffset += -1;
        terminal.write(key);
      }
    },
    "default": function() {
      if (printable) {
        var index = commandBuffer.length - commandBufferOffset;
        commandBuffer = commandBuffer.splice(index, 0, key);
        terminal.write(key);
      }
    }
  };
  var action = keyActions[ev.keyCode.toString()]
  if (typeof action  === "undefined") {
    keyActions["default"]();
  }
  else {
    action();
  };
});
