var fhirServiceUrl = getParameterByName("fhirServiceUrl");

var client = {
  "client_name": "SMART Diabetes Monograph",
  "client_uri": "http://smartplatforms.org/smart-app-gallery/diabetes-monograph/",
  "logo_uri": "http://smartplatforms.org/smart-app-gallery/diabetes-monograph/image.png",
  "contacts": [ "info@smartplatforms.org" ],
  "redirect_uris": [ relative("index.html")],
  "response_types": ["token"],
  "grant_types": ["implicit"],
  "token_endpoint_auth_method": "none",
  "scope":  "summary search"
};

BBClient.providers(["https://pilots.fhir.me"], function(providers){

  var matched;

  var matching = providers.filter(function(p){
    return (p.bb_api.fhir_service_uri === fhirServiceUrl);
  });

  console.log(matching);
  if (matching.length === 1) {
    matched = matching[0];
  } else if (matching.length === 0) {
    matched = BBClient.noAuthFhirProvider(fhirServiceUrl);
  } else {
    throw "Found >1 match for " + fhirServiceUrl;
  }

  BBClient.authorize({
    client: client, 
    provider: matched,
    patientId: getParameterByName("patientId")
  });
});

function relative(url){
  return (window.location.protocol + "//" + window.location.host + window.location.pathname).match(/(.*\/)[^\/]*/)[1] + url;
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
