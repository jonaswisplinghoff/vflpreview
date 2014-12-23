function VflContent(vflCont) {
  var self=this;
  var LOG = "VflContent: ";
  var contentElement=$('#content');
  var vflContent;
  var constrains = [];

  var construct = function(vflCont) {
    //self.reset();
    vflContent=vflCont;
  };

  this.reset = function() {
    contentElement.empty();
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

    for(var i = 0; i < constrains.length; i++){
      var vflString = constrains[i];
      console.log(LOG + "layouting: " + vflString);

      var orientation = vflContent.getOrientation(vflString);

      var views = vflContent.getViewsFromVflString(vflString);

      for (var j = 0; j < views.length; j++) {
        self.addViewToContentElement(views[j]);
        self.setViewDimensionForOrientation(views[j], orientation);
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
      $("#" + view["viewName"]).css("width", vflContent.getWidthForView(view));
    }
    else if (orientation === 'V') {
      $("#" + view["viewName"]).css("height", vflContent.getWidthForView(view));
    }
  };

  construct(vflCont);
}