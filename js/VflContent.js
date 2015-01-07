function VflContent(vflCont) {
  var self=this;
  var LOG = "VflContent: ";
  var contentElement=$('#content');
  var vflParser;
  var constrains = [];

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
    constrains.splice(constraintId,1);

    self.layoutConstrains();
  };

  this.addConstraint = function(vflString, rowId) {
    console.log(LOG + "Constraint added [" + rowId + "]: " + vflString);
    constrains[rowId] = vflString;
    self.layoutConstrains();
  };

  this.layoutConstrains = function() {
    console.log(LOG + "layoutConstrains");
    console.log(constrains);

    self.reset();

    //TODO: implement layout logic

    for(var constraintIndex = 0; constraintIndex < constrains.length; constraintIndex++){
      var vflString = constrains[constraintIndex];
      console.log(LOG + "layouting: " + vflString);

      var orientation = vflParser.getOrientation(vflString);

      var viewsOrConnections = vflParser.getViewsAndConnectionsFromVflString(vflString);
      console.log(viewsOrConnections);

      for (var elementIndex = 0; elementIndex < viewsOrConnections.length; elementIndex++) {
        var currentElement = viewsOrConnections[elementIndex];

        if(vflParser.isView(currentElement)) {
          self.addViewToContentElement(currentElement);
          self.setViewDimensionForOrientation(currentElement, orientation);
        }
        else if(vflParser.isConnection(currentElement)){
          console.log("found connection: " + currentElement);
          //TODO: add margins to views according to connection
        }
      }
    }
  };

  this.addViewToContentElement = function(view){
    if($("#" + view["viewName"]).length === 0){
      contentElement.append("<div class='view' id='" + view["viewName"] + "'>" + view["viewName"] + "</div>");
    }
  };

  this.setViewDimensionForOrientation = function(view, orientation){
    if (orientation === 'H') {
      $("#" + view["viewName"]).css("width", vflParser.getWidthForView(view));
    }
    else if (orientation === 'V') {
      $("#" + view["viewName"]).css("height", vflParser.getWidthForView(view));
    }
  };

  construct(vflCont);
}