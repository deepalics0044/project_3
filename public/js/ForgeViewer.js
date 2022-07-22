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
            // switch (id){
            //     case 563:
            //         alert('Sensor offline');
            // }
        },
    })
    $(document).ready(function(){
      $("#view1").click(function(){
        var state={"seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGllcjlzYW1wbGUvQURTS19QaWVyJTIwOV9uZXdfZXF1aXBfMjAyMi4wMDAyLnJ2dA","objectSet":[{"id":[],"idType":"lmv","isolated":[],"hidden":[],"explodeScale":0}],"viewport":{"name":"","eye":[2361.2613842938813,-419.5501397658872,-14.335376601519163],"target":[2322.079209197269,-415.24774913186377,-2.0953697436562866],"up":[0.2947806775764574,-0.0323683313437513,0.9550165670047749],"worldUpVector":[0,0,1],"pivotPoint":[2358.6164106747015,-416.4689171156964,-12.82213726998208],"distanceToOrbit":3.280839895013737,"aspectRatio":4.42657348253749,"projection":"perspective","isOrthographic":false,"fieldOfView":53.13010223743877},"renderOptions":{"environment":"Boardwalk","ambientOcclusion":{"enabled":true,"radius":13.123359580052492,"intensity":1},"toneMap":{"method":1,"exposure":-7,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":true,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[]};
        viewer.restoreState(state);
      });
    
      $("#view2").click(function(){
      var state={"seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGllcjlzYW1wbGUvQURTS19QaWVyJTIwOV9uZXdfZXF1aXBfMjAyMi4wMDAyLnJ2dA","objectSet":[{"id":[],"idType":"lmv","isolated":[],"hidden":[],"explodeScale":0}],"viewport":{"name":"","eye":[2357.951346696003,-424.71510320076163,-15.495941397877818],"target":[2351.8913536510217,-384.6140399762248,-7.830930575557682],"up":[0.02774889714651856,-0.1836240191406303,0.9826048128834874],"worldUpVector":[0,0,1],"pivotPoint":[2418.743850708008,-361.5837097167969,0],"distanceToOrbit":55.28884010056287,"aspectRatio":4.42657348253749,"projection":"perspective","isOrthographic":false,"fieldOfView":53.13010235415598},"renderOptions":{"environment":"Boardwalk","ambientOcclusion":{"enabled":true,"radius":13.123359580052492,"intensity":1},"toneMap":{"method":1,"exposure":-7,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":true,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[]};

        viewer.restoreState(state);

      });
    
      $("#view3").click(function(){
        var state={"seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGllcjlzYW1wbGUvQURTS19QaWVyJTIwOV9uZXdfZXF1aXBfMjAyMi4wMDAyLnJ2dA","objectSet":[{"id":[],"idType":"lmv","isolated":[],"hidden":[],"explodeScale":0}],"viewport":{"name":"","eye":[2342.748986361519,-416.09292048639844,-10.764488906020254],"target":[2383.225407937183,-421.8240519824802,-5.073741454778178],"up":[-0.13651450934299703,0.019329342212361184,0.9904494763835652],"worldUpVector":[0,0,1],"pivotPoint":[2418.743850708008,-361.5837097167969,0],"distanceToOrbit":68.44103794839216,"aspectRatio":4.42657348253749,"projection":"perspective","isOrthographic":false,"fieldOfView":53.13010235415598},"renderOptions":{"environment":"Boardwalk","ambientOcclusion":{"enabled":true,"radius":13.123359580052492,"intensity":1},"toneMap":{"method":1,"exposure":-7,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":true,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[]};
        viewer.restoreState(state);
        

      });
    
      $("#view4").click(function(){
        var state={"seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGllcjlzYW1wbGUvQURTS19QaWVyJTIwOV9uZXdfZXF1aXBfMjAyMi4wMDAyLnJ2dA","objectSet":[{"id":[8420],"idType":"lmv","isolated":[],"hidden":[],"explodeScale":0}],"viewport":{"name":"","eye":[2352.9987164870936,-422.7996551584668,-9.677137433808003],"target":[2356.665353108639,-382.0080966073114,-14.793357249578744],"up":[0.011097347660556783,0.12345867714246897,0.9922876618769038],"worldUpVector":[0,0,1],"pivotPoint":[2347.1633228704545,-419.0435517563387,-10.379503429199156],"distanceToOrbit":3.280839895013468,"aspectRatio":4.42657348253749,"projection":"perspective","isOrthographic":false,"fieldOfView":53.13010235415598},"renderOptions":{"environment":"Boardwalk","ambientOcclusion":{"enabled":true,"radius":13.123359580052492,"intensity":1},"toneMap":{"method":1,"exposure":-7,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":true,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[]};
        viewer.restoreState(state);
      });


     



    });

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


