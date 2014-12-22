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
    console.log("Input Event: " + vflString);

    if(vflPars.isValidVflString(vflString)){
      validVflString(vflString);
    } else {
      invalidVflString();
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

  var validVflString = function(vflString) {
    console.log("Valid VFL!");
    setTextViewColorToValid(true);
    vflContent.renderVfl(vflString);
  };

  var setTextViewColorToValid = function(valid) {
    if(valid){
      wrapperElement.removeClass("has-error");
      wrapperElement.addClass("has-success");
    } else {
      wrapperElement.removeClass("has-success");
      wrapperElement.addClass("has-error");
    }
  };

  var invalidVflString = function() {
    console.log("Invalid VFL!");
    setTextViewColorToValid(false);
    vflContent.reset();
  };

  construct(vflCont, vflPars);
}