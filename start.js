/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const config = require("./config");
if (
  config.credentials.client_id == null ||
  config.credentials.client_secret == null
) {
  console.error(
    "Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables."
  );
  return;
}

let app = express();
let data;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Process application/json
app.use(bodyParser.json());
app.use("/api/forge/oauth", require("./routes/oauth"));
app.use("/api/forge/oss", require("./routes/oss"));
app.use("/api/forge/modelderivative", require("./routes/modelderivative"));
app.post("/sensors", function (req, res) {
  data = [
    { dbid: 2448, closed: false, locked: false },
    { dbid: 2447, closed: false, locked: false },
    { dbid: 2442, closed: false, locked: false },
    { dbid: 2470, closed: false, locked: false },
  ];
  data = req.body;
  res.status(200).end();
  console.log(req.body);
});
app.get("/sensors", function (req, res) {
  res.json(data);
  console.log(req.body);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).json(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
