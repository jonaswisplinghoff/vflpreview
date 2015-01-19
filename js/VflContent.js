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
    console.log(LOG + "layoutConstraints");
    console.log(constraints);

    self.reset();

    //TODO: implement layout logic

    for(var constraintIndex = 0; constraintIndex < constraints.length; constraintIndex++){
      var vflString = constraints[constraintIndex];
      console.log(LOG + "layouting: " + vflString);

      var orientation = vflParser.getOrientation(vflString);

      var viewsOrConnections = vflParser.getViewsAndConnectionsFromVflString(vflString);
      //console.log(viewsOrConnections);

      for (var elementIndex = 0; elementIndex < viewsOrConnections.length; elementIndex++) {
        var currentElement = viewsOrConnections[elementIndex];

        if(vflParser.isView(currentElement)) {
          self.addViewToContentElement(currentElement);
          self.setViewDimensionForOrientation(currentElement, orientation);
        } else if(vflParser.isConnection(currentElement)){
          console.log("found connection: " + currentElement);
          //TODO: add margins to views according to connection
        }
      }
    }
  };

  this.addViewToContentElement = function(view){
    if (typeof viewElements[view["viewName"]] == 'undefined') {
      viewElements[view["viewName"]] = new ViewElement(view["viewName"], contentElement);
    }
    viewElements[view["viewName"]].draw();
  };

  this.setViewDimensionForOrientation = function(view, orientation){
    //TODO: implement more sophisticated layout logic
    if (orientation === 'H') {
      viewElements[view["viewName"]].setWidth(vflParser.getWidthForView(view));
    }
    else if (orientation === 'V') {
      viewElements[view["viewName"]].setHeight(vflParser.getWidthForView(view));
    }
  };

  construct(vflCont);
}