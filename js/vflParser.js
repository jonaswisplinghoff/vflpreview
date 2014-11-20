//TODO: ordentliche Architektur einführen

//NOTE:
// regex: ([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?
// http://regexr.com/39uil

$( document ).ready(function() {
  $("#vflString").change(function(){
    var vflString = $("#vflString").val();
    console.log(vflString);

    $("#content").text(vflString);

    var viewRegex = /(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])/;
    var completeRegex = /([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?/;

    if(completeRegex.test(vflString)){
      console.log("Erkannt!");
      var result = completeRegex.exec(vflString);
      for(var i=0; i<result.length; i++){
        console.log(i + ": " + result[i]);
      }
    }
    else {
      console.log("Nicht erkannt!");
    }
  });
});