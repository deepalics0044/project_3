let data = [
  { dbid: 2448, closed: false, locked: false },
  { dbid: 2447, closed: false, locked: false },
  { dbid: 2442, closed: false, locked: false },
  { dbid: 2470, closed: false, locked: false },
];
function myFunction() {
  var checkBox = document.getElementById("closed1");
  var checkBox1 = document.getElementById("locked1");
  var checkBox2 = document.getElementById("closed2");
  var checkBox3 = document.getElementById("locked2");
  var checkBox4 = document.getElementById("closed3");
  var checkBox5 = document.getElementById("locked3");
  var checkBox6 = document.getElementById("closed4");
  var checkBox7 = document.getElementById("locked4");

  if (checkBox.checked == true) {
    data[0].closed = true;
  }
  if (checkBox1.checked == true) {
    data[0].locked = true;
  }
  if (checkBox2.checked == true) {
    data[1].closed = true;
  }
  if (checkBox3.checked == true) {
    data[1].locked = true;
  }
  if (checkBox4.checked == true) {
    data[2].closed = true;
  }
  if (checkBox5.checked == true) {
    data[2].locked = true;
  }
  if (checkBox6.checked == true) {
    data[3].closed = true;
  }
  if (checkBox7.checked == true) {
    data[3].locked = true;
  }
  console.log(data);
  var send_data = JSON.stringify(data);

  fetch("/sensors", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

function myFunction1() {
  let data = [
    { dbid: 2448, closed: false, locked: false },
    { dbid: 2447, closed: false, locked: false },
    { dbid: 2442, closed: false, locked: false },
    { dbid: 2470, closed: false, locked: false },
  ];
  var checkBox = document.getElementById("closed1");
  var checkBox1 = document.getElementById("locked1");
  var checkBox2 = document.getElementById("closed2");
  var checkBox3 = document.getElementById("locked2");
  var checkBox4 = document.getElementById("closed3");
  var checkBox5 = document.getElementById("locked3");
  var checkBox6 = document.getElementById("closed4");
  var checkBox7 = document.getElementById("locked4");

  if (checkBox.checked == true) {
    data[0].closed = true;
  }
  if (checkBox1.checked == true) {
    data[0].locked = true;
  }
  if (checkBox2.checked == true) {
    data[1].closed = true;
  }
  if (checkBox3.checked == true) {
    data[1].locked = true;
  }
  if (checkBox4.checked == true) {
    data[2].closed = true;
  }
  if (checkBox5.checked == true) {
    data[2].locked = true;
  }
  if (checkBox6.checked == true) {
    data[3].closed = true;
  }
  if (checkBox7.checked == true) {
    data[3].locked = true;
  }
  console.log(data);
  var send_data = JSON.stringify(data);

  fetch("/sensors", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}
