function VflContent(vflCont) {
  var self=this;
  var LOG = "VflContent: ";
  var contentElement=$('#content');
  var vflParser;
  var constraints = [];
  var viewElements = [];

  var construct = function(parser) {
    vflParser=parser;

    contentElement.resizable({
      minHeight: 150,
      minWidth: 150
    });
  };

  this.reset = function() {
    contentElement.children("p").remove();
    contentElement.children("div.view").remove();
    viewElements=[];
  };

  this.removeConstraint = function(constraintId){
    console.log(LOG + "removeConstraint: " + constraintId);
    constraints.splice(constraintId,1);

    self.layoutConstraints();
  };

  this.addConstraint = function(vflString, rowId) {
    console.log(LOG + "Constraint added [" + rowId + "]: " + vflString);
    constraints[rowId] = vflString;
    self.layoutConstraints();
  };

  this.layoutConstraints = function() {
    console.log(LOG + "layoutConstraints: "+constraints);

    self.reset();

    layoutConstrainsWithOrientation(constraints, 'H');
    layoutConstrainsWithOrientation(constraints, 'V');

  };

  var layoutConstrainsWithOrientation = function(constraints, layoutOrientation){

    for(var constraintIndex = 0; constraintIndex < constraints.length; constraintIndex++){
      var vflString = constraints[constraintIndex];
      var orientation = vflParser.getOrientation(vflString);

      if(orientation == layoutOrientation){
        layoutConstraint(vflString);
      }
    }
  };

  var layoutConstraint = function(vflString){
    var orientation = vflParser.getOrientation(vflString);
    var viewsOrConnections = vflParser.getViewsAndConnectionsFromVflString(vflString);
    var lastAddedViewElement=null;
    var firstElementMarked=false;

    for (var elementIndex = 0; elementIndex < viewsOrConnections.length; elementIndex++) {
      var currentElement = viewsOrConnections[elementIndex];

      if (currentElement[0] == "") {
        continue;
      }

      if(vflParser.isView(currentElement)) {
        lastAddedViewElement = addViewToContentElement(currentElement);
        if(!firstElementMarked){
          setViewIsFirstElementOfLayoutOrientation(currentElement, orientation, true);
          firstElementMarked = true;
        }else{
          setViewIsFirstElementOfLayoutOrientation(currentElement, orientation, false);
        }
        setViewDimensionForOrientation(currentElement, orientation);

      } else if(vflParser.isConnection(currentElement)){
        if (lastAddedViewElement !== null) {
          setConnectionForOrientation(currentElement,orientation,lastAddedViewElement);
        }
      }
    }
  };

  var addViewToContentElement = function(view){
    if (typeof viewElements[view["viewName"]] == 'undefined') { // check if element already exists in viewElements
      viewElements[view["viewName"]] = new ViewElement(view["viewName"], contentElement);
    }
    viewElements[view["viewName"]].draw();
    return viewElements[view["viewName"]];
  };

  var setViewIsFirstElementOfLayoutOrientation = function(view, orientation, first){
    if (orientation === 'H') {
      viewElements[view["viewName"]].setisFirstElementOfHorizontalLayout(first);
    }
    else if (orientation === 'V') {
      viewElements[view["viewName"]].setisFirstElementOfVerticalLayout(first);
    }
  };

  var setViewDimensionForOrientation = function(view, orientation){
    if (orientation === 'H') {
      viewElements[view["viewName"]].setWidth(vflParser.getDimensionForView(view));
    }
    else if (orientation === 'V') {
      viewElements[view["viewName"]].setHeight(vflParser.getDimensionForView(view));
    }
  };

  var setConnectionForOrientation = function(connection, orientation, lastAddedVE){
    if (orientation === 'H') {
      viewElements[lastAddedVE.getId()].setMarginRight(vflParser.getDimensionForConnection(connection));
    }
    else if (orientation === 'V') {
      viewElements[lastAddedVE.getId()].setMarginBottom(vflParser.getDimensionForConnection(connection));
    }
  };

  construct(vflCont);
}