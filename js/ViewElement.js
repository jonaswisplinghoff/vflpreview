function ViewElement(id, contentElement) {
  var self = this;
  var LOG = "ViewElement: ";
  var domElement;
  var domElementId;
  var contentElement

  var construct = function(id, contentEl) {
    domElementId=id;
    contentElement=contentEl;
  };

  this.draw = function() {
    if($("#"+domElementId).length === 0){
      contentElement.append("<div class='view' id='"+domElementId+"'>"+domElementId+"</div>");
      domElement=$('#'+domElementId);
      //console.log('drawing: '+domElementId);
    }
  };

  this.setWidth = function(width) {
    //TODO: implement more sophisticated layout logic
    if($("#"+domElementId).length === 0){
      console.log("domElement of "+domElementId+" does not yet exist.");
    } else {
      $("#"+domElementId).css("width", width);
    }
  };

  this.setHeight = function(height) {
    //TODO: implement more sophisticated layout logic
    if($("#"+domElementId).length === 0){
      console.log("domElement of "+domElementId+" does not yet exist.");
    } else {
      $("#"+domElementId).css("height", height);
    }
  };

  construct(id, contentElement);
}