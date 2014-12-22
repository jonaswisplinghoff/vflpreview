function VflForm(vflCont, vflPars) {
  var wrapperElement = $("#vflForm");
  var vflContent;
  var vflParser;

  var construct = function(vflCont, vflPars) {
    addInputRow();
    vflContent=vflCont;
    vflParser=vflPars;
  };

  var addInputRow = function() {
    // TODO: (if there is time left) Add input row at certain index, not only at the end (as implemented so far)
    wrapperElement.append(generateInputRow());
    updateEventHandlers();
  };

  var removeInputRow = function(row) {
    row.remove();
    var allRows = $(".row");
    for(var i=0; i<allRows.length; i++){
      var currentRow = allRows[i];
      $(currentRow).attr("id", i);
      $(currentRow).find("input").attr("placeholder", i);
    }
    updateEventHandlers();
  };

  var generateInputRow = function() {
    var addButton = '<button type="button" class="btn btn-default addConstraintButton">' +
        '<span class="glyphicon glyphicon-plus">' +
        '</span>' +
        '</button>';

    var removeButton = '<button type="button" class="btn btn-default removeConstraintButton">' +
        '<span class="glyphicon glyphicon-minus">' +
        '</span>' +
        '</button>';

    var button = getInputRowCount() == 0 ? addButton : removeButton;

    return '<div class="row" id="'+getInputRowCount()+'">' +
        '<div class="col-xs-11">' +
        '<input type="text" class="form-control vflString" placeholder="'+getInputRowCount()+'">' +
        '</div>' +
        '<div class="col-xs-1">' +
            button +
        '</div>' +
        '</div>';
  };

  var getInputRowCount = function() {
    return $(".row").length;
  };

  var updateEventHandlers = function() {
    updateInputUpdateHandlers();
    updateAddConstraintButtonClickHandlers();
    updateRemoveConstraintButtonClickHandlers();
  };

  var updateInputUpdateHandlers = function() {
    $(".vflString").off('input');
    $(".vflString").on('input', handleInputEvent);
  };

  var handleInputEvent = function(event) {
    var vflString = $(event.target).val();
    var rowId = $(event.target).parent().parent().attr('id');
    console.log("Input Event in row " + rowId + ": " + vflString);

    if(vflParser.isValidVflString(vflString)){
      validVflStringInRow(vflString, rowId);
    } else {
      invalidVflStringInRow(rowId);
    }
  };

  var updateAddConstraintButtonClickHandlers = function() {
    $(".addConstraintButton").off("click");
    $(".addConstraintButton").on("click", handleAddConstraintButtonClick);
  };

  var handleAddConstraintButtonClick = function() {
    console.log("addConstraint button clicked");
    addInputRow();
  };

  var updateRemoveConstraintButtonClickHandlers = function() {
    $(".removeConstraintButton").off("click");
    $(".removeConstraintButton").on("click", handleRemoveConstraintButtonClick);
  };

  var handleRemoveConstraintButtonClick = function() {
    console.log("removeConstraint button clicked");
    var row = $($(event.target).parents(".row")[0]);
    removeInputRow(row);
  };

  var validVflStringInRow = function(vflString, rowId) {
    setRowHighlightingToValid(true, rowId);
    vflContent.renderVfl(vflString);
  };

  var setRowHighlightingToValid = function(valid, rowId) {
    var row = $("div[id="+rowId+"]");
    if(valid){
      row.removeClass("has-error");
      row.addClass("has-success");
    } else {
      row.removeClass("has-success");
      row.addClass("has-error");
    }
  };

  var invalidVflStringInRow = function(rowId) {
    setRowHighlightingToValid(false, rowId);
    vflContent.reset();
  };

  construct(vflCont, vflPars);
}