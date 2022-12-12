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

var viewer;

var x = 0;
function launchViewer(urn) {
  var options = {
    env: "AutodeskProduction2",

    getAccessToken: getForgeToken,
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      {
        extensions: [
          "MyAwesomeExtension",
          "HandleSelectionExtension",
          "ModelSummaryExtension",
        ],
      }
    );

    viewer.start();
    viewer.loadExtension("Autodesk.PDF").then(() => {
      viewer.loadModel("/ visualization_-_aerial.pdf");
    });
    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();

  viewer.loadDocumentNode(doc, viewables).then((i) => {
    viewer.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,

      async function () {
        const resp = await fetch("/sensors");
        if (!resp.ok) {
          throw new Error(await resp.text());
        }
        var door_locked = [];
        let data1 = await resp.json();

        var red = new THREE.Vector4(1, 0, 0, 1);
        var green = new THREE.Vector4(0, 128, 0, 1);

        var myDbid = viewer.getSelection();
        viewer.getProperties(myDbid, function (e) {
          console.log("Entire object response ", e);
          dbID = e;
          console.log("Properties ", e.properties.label);
        });

        data1.forEach((e) => {
          if (e.closed == true && e.locked == false) {
            viewer.setThemingColor(e.dbid, red);
          } else if (e.closed == false && e.locked == true) {
            door_locked.push(e.dbid);
            viewer.setThemingColor(e.dbid, green);
          } else if (e.closed == false && e.locked == false) {
            viewer.setThemingColor(e.dbid, green);
          } else {
            viewer.setThemingColor(e.dbid, red);
          }
        });
        viewer.loadExtension("IconMarkupExtension", {
          button: {
            icon: "fa-door-closed",
            tooltip: "Show locked door",
          },
          icons: [
            {
              dbId: door_locked[0],
              label: "Locked1",
              css: "fas fa-solid fa-lock",
            },
            {
              dbId: door_locked[1],
              label: "Locked2",
              css: "fas fa-solid fa-lock",
            },
            {
              dbId: door_locked[2],
              label: "Locked3",
              css: "fas fa-solid fa-lock",
            },
            {
              dbId: door_locked[3],
              label: "Locked4",
              css: "fas fa-solid fa-lock",
            },
          ],
          onClick: (id) => {
            viewers.select(id);
            viewers.utilities.fitToView();
            switch (id) {
              case 563:
                alert("Sensor offline");
            }
          },
        });
      }
    );
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch("/api/forge/oauth/token").then((res) => {
    res.json().then((data) => {
      callback(data.access_token, data.expires_in);
    });
  });
}
