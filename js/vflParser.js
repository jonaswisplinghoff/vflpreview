function VflParser() {
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
  var superView = XRegExp.build('\|');
  var orientation = XRegExp.build('H|V');

  var visualFormatString = XRegExp.build('(?x)^({{orientation}}:)?({{superview}}{{connection}})?{{view}}({{connection}}{{view}})*({{connection}}{{superview}})? $',{
    orientation: orientation,
    superview: superView,
    connection: connection,
    view: view
  }, 'x');

  var construct = function() {
    //
  };

  this.isValidVflString = function(vflString) {
    return !!visualFormatString.test(vflString);
  };

  this.getViewsFromVflString = function(vflString) {
    var return_array=new Array();
    XRegExp.forEach(vflString, view, function (match, i) {
      return_array[i]=match;
    });
    return return_array;
  };

  this.getOrientation = function(vflString){
    var actualOrientation = XRegExp.exec(vflString, orientation);
    if(actualOrientation != null){
      if(actualOrientation[0] === 'V' || actualOrientation[0] === 'H'){
        return actualOrientation[0];
      }
    }
    return 'H';
  };

  this.getWidthForView = function(actualView){
    var actualPredicateListWithParens = XRegExp.exec(actualView, view).predicateListWithParens;
    var actualPredicate = XRegExp.exec(actualPredicateListWithParens, predicate);
    var actualObjectOfPredicate = XRegExp.exec(actualPredicate, objectOfPredicate);

    return actualObjectOfPredicate[0];
  };

  construct();
}