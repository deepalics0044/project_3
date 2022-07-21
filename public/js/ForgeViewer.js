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

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };


  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().search({'role':'3d'})[0]
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
    var ViewerInstance = new CustomEvent("viewerinstance", {detail: {viewer: viewer}});      
      document.dispatchEvent(ViewerInstance);
      viewer.loadExtension('IconMarkupExtension', {
        button: {
            icon: 'fa-thermometer-half',
            tooltip: 'Show Temperature'
        },
        icons: [
            { dbId: 56168,   label: '300&#176;C', css: 'fas fa-thermometer-full' },
            { dbId: 66068,    label: '356&#176;C', css: 'fas fa-thermometer-full' },
            { dbId: 38495,  label: '450&#176;C', css: 'fas fa-thermometer-empty' }
        ], 
        onClick: (id) => {
            viewer.select(id);
            viewer.utilities.fitToView();
            switch (id){
                case 563:
                    alert('Sensor offline');
            }
        }
    })
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}