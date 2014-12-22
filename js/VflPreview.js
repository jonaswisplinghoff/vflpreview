function VflPreview() {
  var form;
  var parser;
  var content;

  var construct = function() {
    parser = new VflParser();
    content = new VflContent(parser);
    form = new VflForm(content, parser);
  };

  construct();
}