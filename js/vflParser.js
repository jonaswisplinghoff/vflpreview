//TODO: ordentliche Architektur einführen

//NOTE:
// regex: ([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?
// http://regexr.com/39uil

var viewRegex = /(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])/;
var completeRegex = /([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?/;

$( document ).ready(function() {
  $("#vflString").bind('input', function(){
    var vflString = $("#vflString").val();
    console.log("Textfield changed to: " + vflString);

    // Just testing
    $("#content").text(vflString);

    if(completeRegex.test(vflString)){
      validVflString(vflString)
    }
    else {
      invalidVflString()
    }
  });
});

var validVflString = function(vflString){
  console.log("Valid VFL!");
  var result = completeRegex.exec(vflString);
  for(var i=0; i<result.length; i++){
    console.log(i + ": " + result[i]);
  }
};

var invalidVflString = function(){
  console.log("Invalid VFL!");
};