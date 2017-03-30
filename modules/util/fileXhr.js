"use strict";

const EXPORTED_SYMBOLS = ["fileXhr"];

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

Cu.importGlobalProperties(["XMLHttpRequest"]);


// Sync XHR.
// It's just meant to fetch file:// URLs
// that aren't otherwise accessible in content.
// Don't use it in the parent process or for web URLs.
function fileXhr(aUrl, aMimetype, aResponseType) {
  if (!aUrl.match(
      new RegExp("^file:\/\/", ""))) {
    throw new Error("fileXhr - used for non-file URL:" + "\n"  + aUrl);
  }
  let xhr = new XMLHttpRequest();
  xhr.open("open", aUrl, false);
  if (aResponseType) {
    xhr.responseType = aResponseType;
  } else {
    xhr.overrideMimeType(aMimetype);
  }
  xhr.send(null);
  return aResponseType ? xhr.response : xhr.responseText;
}