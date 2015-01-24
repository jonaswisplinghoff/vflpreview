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
  var float="none";
  var clear="none";

  var construct = function(id, contentEl) {
    domElementId=id;
    contentElement=contentEl;
  };

  this.draw = function() {
    if($("#"+domElementId).length === 0){
      contentElement.append("<div class='view' id='"+domElementId+"'>"+domElementId+"</div>");
      domElement=$('#'+domElementId);
      //console.log("drawing: "+domElementId);
      refreshProperties();
    }
  };

  this.getId = function() { return domElementId; };

  this.setWidth = function(w) {
    var parsed=parseInt(w);
    if (!isNaN(parsed)) {
      width=parsed;
      refreshProperties();
    }
  };

  this.setHeight = function(h) {
    var parsed=parseInt(h);
    if (!isNaN(parsed)) {
      height=parsed;
      refreshProperties();
    }
  };

  this.setMarginTop = function(m) {
    var parsed=parseInt(m);
    if (!isNaN(parsed)) {
      marginTop=parsed;
      refreshProperties();
    }
  };

  this.setMarginRight = function(m) {
    var parsed=parseInt(m);
    if (!isNaN(parsed)) {
      marginRight=parsed;
      refreshProperties();
    }
  };

  this.setMarginBottom = function(m) {
    var parsed=parseInt(m);
    if (!isNaN(parsed)) {
      marginBottom=parsed;
      refreshProperties();
    }
  };

  this.setMarginLeft = function(m) {
    var parsed=parseInt(m);
    if (!isNaN(parsed)) {
      marginLeft=parsed;
      refreshProperties();
    }
  };

  this.setFloating = function (f) {
    float = f;
    refreshProperties();
  };

  this.setClearing = function (c) {
    clear = c;
    refreshProperties();
  };

  var refreshProperties = function() {
    console.log(domElementId+" - width: "+width+"; height: "+height+"; margin: "+marginTop+" "+marginRight+" "+marginBottom+" "+marginLeft+"; float: " + float + "; clear: " + clear + ";");
    if(domElement.length === 0){
      console.log("domElement of "+domElementId+" does not yet exist.");
    } else {
      domElement.css("width", width);
      domElement.css("height", height);
      domElement.css("margin", marginTop+"px "+marginRight+"px "+marginBottom+"px "+marginLeft+"px");
      domElement.css("float", float);
      domElement.css("clear", clear);
    }
  };

  construct(id, contentElement);
}