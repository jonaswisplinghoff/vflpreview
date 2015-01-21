function ViewElement(id, contentElement) {
  var self = this;
  var LOG = "ViewElement: ";
  var domElement;
  var domElementId;
  var contentElement;

  var width=100;
  var height=50;
  var marginTop=0;
  var marginRight=0;
  var marginBottom=0;
  var marginLeft=0;

  var construct = function(id, contentEl) {
    domElementId=id;
    contentElement=contentEl;
  };

  this.draw = function() {
    if($("#"+domElementId).length === 0){
      contentElement.append("<div class='view' id='"+domElementId+"'>"+domElementId+"</div>");
      domElement=$('#'+domElementId);
      //console.log('drawing: '+domElementId);
      refreshProperties();
    }
  };

  this.setWidth = function(w) {
    if (w != "undefined") {
      width=parseInt(w);
      refreshProperties();
    }
  };

  this.setHeight = function(h) {
    if (h != "undefined") {
      height=parseInt(h);
      refreshProperties();
    }
  };

  var refreshProperties = function() {
    console.log("id: "+domElementId+" - "+width+"; "+height+"; "+marginTop+"; "+marginRight+"; "+marginBottom+"; "+marginLeft);

    //if($("#"+domElementId).length === 0){
    if(domElement.length === 0){
      console.log("domElement of "+domElementId+" does not yet exist.");
    } else {
      domElement.css("width", width);
      domElement.css("height", height);
      domElement.css("margin", marginTop+"px "+marginRight+"px "+marginBottom+"px "+marginLeft+"px");
    }
  }

  construct(id, contentElement);
}