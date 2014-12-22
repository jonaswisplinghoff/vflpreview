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

  this.addConstraint = function(vflString, rowId) {
    console.log(LOG + "Constraint added [" + rowId + "]: " + vflString);
    constrains[rowId] = vflString;
    self.reset();
    self.layoutConstrains();
  };

  this.layoutConstrains = function() {
    console.log(LOG + "layoutConstrains");
    console.log(constrains);

    //TODO: implement layout logic

    for(var i = 0; i < constrains.length; i++){
      var vflString = constrains[i];
      console.log(LOG + "layouting: " + vflString);

      var orientation = vflContent.getOrientation(vflString);

      var views = vflContent.getViewsFromVflString(vflString);

      for (var j = 0; j < views.length; j++) {
        contentElement.append("<div class='view' id='" + views[j]["viewName"] + "'>" + views[j]["viewName"] + "</div>");

        if (orientation === 'H') {
          $("#" + views[j]["viewName"]).css("width", vflContent.getWidthForView(views[j]));
        }
        else if (orientation === 'V') {
          $("#" + views[j]["viewName"]).css("height", vflContent.getWidthForView(views[j]));
        }
      }
    }
  };

  construct(vflCont);
}