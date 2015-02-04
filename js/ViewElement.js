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
  var float="left";
  var clear="none";
  var partOfHorizontalLayout=false;
  var partOfVerticalLayout=false;
  var firstElementOfHorizontalLayout=false;
  var firstElementOfVerticalLayout=false;


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

  this.setisFirstElementOfHorizontalLayout = function(){
    firstElementOfHorizontalLayout = true;
    calculateClearing();
    refreshProperties();
  };

  this.setisFirstElementOfVerticalLayout = function(){
    firstElementOfVerticalLayout = true;
    calculateClearing();
    refreshProperties();
  };

  this.setIsPartOfHorizontalLayout = function(){
    partOfHorizontalLayout = true;
    calculateClearing();
    refreshProperties();
  };

  this.setIsPartOfVerticalLayout = function(){
    partOfVerticalLayout = true;
    calculateClearing();
    refreshProperties();
  };

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

  var calculateClearing = function () {
    if((partOfHorizontalLayout && !firstElementOfHorizontalLayout)) {
      clear = "none";
    }else{
      clear = "left";
    }
  };

  var refreshProperties = function() {
    console.log(domElementId+" - Horizontal:"+partOfHorizontalLayout + ", 1st:" + firstElementOfHorizontalLayout + ", Vertical:"+partOfVerticalLayout+", 1st:"+firstElementOfVerticalLayout+" - width: "+width+"; height: "+height+"; margin: "+marginTop+" "+marginRight+" "+marginBottom+" "+marginLeft+"; float: " + float + "; clear: " + clear + ";");
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