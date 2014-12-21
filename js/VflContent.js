function VflContent(vflCont) {
  var self=this;
  var contentElement=$('#content');
  var vflContent;

  var construct = function(vflCont) {
    //self.reset();
    vflContent=vflCont;
  };

  this.reset = function() {
    contentElement.empty();
  };

  this.renderVfl = function(vflString) {
    self.reset();

    //TODO: implement layout logic

    var orientation = vflContent.getOrientation(vflString);

    var views = vflContent.getViewsFromVflString(vflString);

    for (var i = 0 ; i < views.length; i++) {
      contentElement.append("<div class='view' id='"+views[i]["viewName"]+"'>" + views[i]["viewName"] + "</div>");

      if(orientation === 'H'){
        $("#" + views[i]["viewName"]).css("width", vflContent.getWidthForView(views[i]));
      }
      else if(orientation === 'V'){
        $("#" + views[i]["viewName"]).css("height", vflContent.getWidthForView(views[i]));
      }
    }
  };

  construct(vflCont);
}