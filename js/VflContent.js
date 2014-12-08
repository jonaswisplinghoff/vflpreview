function VflContent(vflCont) {
  var self=this;
  var contentElement=$('#content');
  var vflContent;

  var construct = function(vflCont) {
    //self.reset();
    vflContent=vflCont;
  }

  this.reset = function() {
    contentElement.empty();
  }

  this.renderVfl = function(vflString) {
    self.reset();

    //TODO: implement layout logic

    views = vflContent.getViewsFromVflString(vflString);
    for (var i = 0 ; i < views.length; i++) {
      //console.log(i + ": " + views[i][0] + " -> " + views[i]["viewName"]);
      contentElement.append("<div class='view' id='view-"+i+"'>" + views[i]["viewName"] + "</div>");
    };
  }

  construct(vflCont);
}