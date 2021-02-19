$("#inp").on("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("inp").readOnly = true;
    var clrd = false;
    var inputtxt = document.getElementById("inp").value.toLowerCase();
    var statement = "";
    var splitted = inputtxt.split(" ");

    switch (splitted[0]) {
      case "help":
      case "cmds":
        statement =
          "commands: list all commands.\r\nping (host/url): check if server is online.\r\nprint (text): prints your message.\r\nclear: clears the debug console.";
        break;

      case "ping":
        var host = inputtxt.replace(splitted[0] + " ", "");
        statement =
          "PING RESPONSE:\r\n" +
          host +
          ": " +
          ping(host) +
          "\r\n" +
          host +
          ": " +
          ping(host) +
          "\r\n" +
          host +
          ": " +
          ping(host) +
          "\r\n" +
          host +
          ": " +
          ping(host) +
          "\r\n";
        break;

      case "print":
        statement = inputtxt.replace(splitted[0] + " ", "");
        break;

      case "clear":
        document.getElementById("log").value = "";
        statement = "Console has successfully cleared.";
        clrd = true;
        break;

      default:
        statement = 'Invalid command, use the "help" command for help.';
        break;
    }
    var newl = "";
    if (document.getElementById("log").value != "") {
      newl = "\r\n";
    }
    var bdy = document.getElementById("log").value;
    if (clrd) {
      document.getElementById("log").value = statement;
    } else {
      document.getElementById("log").value =
        bdy + newl + newl + "> " + inputtxt + newl + statement;
    }

    document.getElementById("inp").readOnly = false;

    document.getElementById("inp").value = "";
    document.getElementById("log").scrollTop = document.getElementById(
      "log"
    ).scrollHeight;
  }
});


function ping(url) {
  var resp = "";
  var started = new Date().getTime();
  $.ajax({
    url: url,
    async: false,
    success: function (result) {
      var ended = new Date().getTime();
      var milliseconds = ended - started;

      resp = "OK! " + milliseconds.toString() + "ms";
    },
    error: function (result) {
      resp = "unresponsive";
    }
  });
  return resp;
}