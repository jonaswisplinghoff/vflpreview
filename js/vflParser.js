//TODO: ordentliche Architektur einführen

//NOTE:
//var completeRegex = /([HV]:)?(\|(-\d*-|-)?)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\])((-\d*-|-)?(\[[a-zA-Z0-9]+(\((==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?(,(==|<=|>=)?(\d*|[a-zA-Z0-9]+)(@\d*)?)*\))?\]))*((-\d*-|-)?\|)?/;
// http://regexr.com/39uil

var metricName = /[a-z][a-zA-Z0-9]*/;
var viewName = /[a-z][a-zA-Z0-9]*/;
var number = /\d+/;
var constant = XRegExp.build('{{metricName}}|{{number}}', {
  metricName: metricName,
  number: number
}, 'x');
var priority = XRegExp.build('{{metricName}}|{{number}}', {
  metricName: metricName,
  number: number
}, 'x');
var objectOfPredicate = XRegExp.build('{{constant}}|{{viewName}}', {
  constant: constant,
  viewName: viewName
}, 'x');
var relation = /==|<=|>=/;
var predicate = XRegExp.build('({{relation}})?({{objectOfPredicate}})(@{{priority}})?', {
  relation: relation,
  objectOfPredicate: objectOfPredicate,
  priority: priority
}, 'x');
var predicateListWithParens = XRegExp.build('{{openParens}}{{predicate}}(,{{predicate}})*{{closeParens}}', {
  openParens: /\(/,
  predicate: predicate,
  closeParens: /\)/
}, 'x');
var simplePredicate = XRegExp.build('{{metricName}}|{{positiveNumber}}', {
  metricName: metricName,
  positiveNumber: number
}, 'x');
var predicateList = XRegExp.build('{{simplePredicate}}|{{predicateListWithParens}}', {
  simplePredicate: simplePredicate,
  predicateListWithParens: predicateListWithParens
}, 'x');
var connection = XRegExp.build('(({{hyphen}}{{predicateList}}{{hyphen}})|{{hyphen}}|)',{
  predicateList: predicateList,
  hyphen: /-/
}, 'x');
var view = XRegExp.build('{{openBracket}}({{viewName}})({{predicateListWithParens}})?{{closeBracket}}', {
  openBracket: /\[/,
  viewName: viewName,
  predicateListWithParens: predicateListWithParens,
  closeBracket: /\]/
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

  addInputRow();

});

var addInputRow = function() {
  $("#vflForm").append(generateInputRow());

  updateInputUpdateHandlers();
  updateAddConstraintButtonClickHandlers();
};

var generateInputRow = function(){
  return '<div class="row">' +
      '<div class="col-xs-11">' +
      '<input type="text" class="form-control vflString">' +
      '</div>' +
      '<div class="col-xs-1"><button type="button" class="btn btn-default addConstraintButton">' +
      '<span class="glyphicon glyphicon-plus">' +
      '</span>' +
      '</button>' +
      '</div>' +
      '</div>'
};

var updateInputUpdateHandlers = function () {
  $(".vflString").off('input');
  $(".vflString").on('input', handleInputEvent);
};

var updateAddConstraintButtonClickHandlers = function () {
  $(".addConstraintButton").off("click");
  $(".addConstraintButton").on("click", handleAddConstraintButtonClick);
};

var handleInputEvent = function(event){

  var vflString = $(event.target).val();
  console.log("Input Event: " + vflString);

  if(visualFormatString.test(vflString)){
    validVflString(vflString);
  }
  else {
    invalidVflString();
  }
};

var handleAddConstraintButtonClick = function(event){
  console.log("addConstraint button clicked");
  addInputRow()
};

var validVflString = function(vflString){
  console.log("Valid VFL!");
  setTextViewColorToValid(true);
  $("#content").empty();

  //TODO: implement layout logic

  XRegExp.forEach(vflString, view, function (match, i) {
    console.log(i + ": " + match[0]);
    $("#content").append("<div class='view' id='view-"+i+"'>" + match["viewName"] + "</div>");
  });
};

var invalidVflString = function(){
  console.log("Invalid VFL!");
  setTextViewColorToValid(false);
  $("#content").empty();
};

var setTextViewColorToValid = function(valid){
  var textView = $("#vflForm");
  if(valid){
    textView.removeClass("has-error");
    textView.addClass("has-success");
  }
  else{
    textView.removeClass("has-success");
    textView.addClass("has-error");
  }
};