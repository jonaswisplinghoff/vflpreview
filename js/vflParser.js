//TODO: ordentliche Architektur einführen

//NOTE:
//var completeRegex = /([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?/;
// http://regexr.com/39uil

var metricName = /[a-z][a-zA-Z0-9]*/;
var viewName = /[a-z][a-zA-Z0-9]*/;
var number = /\d+/;
var constant = XRegExp.build('(?x)^ {{metricName}}|{{number}} $', {
  metricName: metricName,
  number: number
}, 'x');
var priority = XRegExp.build('(?x)^ {{metricName}}|{{number}} $', {
  metricName: metricName,
  number: number
}, 'x');
var objectOfPredicate = XRegExp.build('(?x)^ {{constant}}|{{viewName}} $', {
  constant: constant,
  viewName: viewName
}, 'x');
var relation = /==|<=|>=/;
var predicate = XRegExp.build('(?x)^ ({{relation}})?({{objectOfPredicate}})(@{{priority}})? $', {
  relation: relation,
  objectOfPredicate: objectOfPredicate,
  priority: priority
}, 'x');
var predicateListWithParens = XRegExp.build('(?x)^ {{openParens}}{{predicate}}(,{{predicate}})*{{closeParens}} $', {
  openParens: /\(/,
  predicate: predicate,
  closeParens: /\)/
}, 'x');
var simplePredicate = XRegExp.build('(?x)^ {{metricName}}|{{positiveNumber}} $', {
  metricName: metricName,
  positiveNumber: number
}, 'x');
var predicateList = XRegExp.build('(?x)^ {{simplePredicate}}|{{predicateListWithParens}} $', {
  simplePredicate: simplePredicate,
  predicateListWithParens: predicateListWithParens
}, 'x');
var connection = XRegExp.build('(?x)^ (({{hyphen}}{{predicateList}}{{hyphen}})|{{hyphen}}|) $',{
  predicateList: predicateList,
  hyphen: /-/
}, 'x');
var view = XRegExp.build('(?x)^ {{openBracket}}{{viewName}}({{predicateListWithParens}})?{{closeBracket}} $', {
  openBracket: /\[/,
  viewName: viewName,
  predicateListWithParens: predicateListWithParens,
  closeBracket: /]/
}, 'x');
var superView = /\|/;
var orientation = /H|V/;

var visualFormatString = XRegExp.build('(?x)^({{orientation}}:)?({{superview}}{{connection}})?{{view}}({{connection}}{{view}})*({{connection}}{{superview}})? $',{
  orientation: orientation,
  superview: superView,
  connection: connection,
  view: view
}, 'x');


$( document ).ready(function() {
  $("#vflString").bind('input', function(){
    var vflString = $("#vflString").val();
    console.log("Textfield changed to: " + vflString);

    // Just testing
    //TODO: implement layout logic
    $("#content").text(vflString);

    if(visualFormatString.test(vflString)){
      validVflString(vflString)
    }
    else {
      invalidVflString()
    }
  });
});

var validVflString = function(vflString){
  console.log("Valid VFL!");
  $("#vflForm").removeClass("has-error");
  $("#vflForm").addClass("has-success");
  var result = visualFormatString.exec(vflString);
  for(var i=0; i<result.length; i++){
    console.log(i + ": " + result[i]);
  }
};

var invalidVflString = function(){
  $("#vflForm").removeClass("has-success");
  $("#vflForm").addClass("has-error");
  console.log("Invalid VFL!");
};