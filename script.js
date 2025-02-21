var editor = CodeMirror.fromTextArea(document.getElementById("markdown"), {
    mode: "gfm",
    theme: "monokai",
    lineNumbers: true,
    autoRefresh: true,
    matchBrackets: true,
    highlightSelectionMatches: {showToken: /\b\w+\b/, annotateScrollbar: true},
    extraKeys: {"Ctrl-Space": "autocomplete"},
});

var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-output"), {
    mode: "htmlmixed",
    theme: "monokai",
    lineNumbers: true,
    autoRefresh: true,
    matchBrackets: true,
});

document.getElementById("vim-toggle").addEventListener("change", function () {
    editor.setOption("keyMap", this.checked ? "vim" : "default");
    htmlEditor.setOption("keyMap", this.checked ? "vim" : "default");
});

document.getElementById("theme-selector").addEventListener("change", function () {
    editor.setOption("theme", this.value);
    htmlEditor.setOption("theme", this.value);
});

editor.on("change", function () {
    updateOutput();
});

function updateOutput() {
    let markdown = editor.getValue();
    let sanitizedHTML = DOMPurify.sanitize(marked.parse(markdown));
    htmlEditor.setValue(sanitizedHTML);
    document.getElementById("preview").innerHTML = sanitizedHTML;
    hljs.highlightAll();
}

htmlEditor.on("change", function () {
    document.getElementById("preview").innerHTML = DOMPurify.sanitize(htmlEditor.getValue());
    hljs.highlightAll();
});

updateOutput();
