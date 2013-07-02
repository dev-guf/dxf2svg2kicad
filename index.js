$(document).ready(function() {
    var bareFilename = null;
    var fileExtension = null;
    var svgString = null;
    var kicadPcb = null;

    $('#uploadButton').change(function(event) {
        var file = $('#uploadButton')[0].files[0];
        var baseFilename = file.name;
        var lastDotPosition = baseFilename.lastIndexOf('.');
        bareFilename = baseFilename.substr(0, lastDotPosition);
        fileExtension = baseFilename.substr(lastDotPosition+1);

        $(new FileReader()).load(function(event) {
            var fileData = event.target.result;
            svgString = fileExtension.toLowerCase() == 'dxf' ? dxfToSvg(fileData) : fileData;
            $('#svgImage')[0].src = 'data:image/svg+xml;utf8,' + svgString;
            kicadPcb = svgToKicadPcb(svgString, baseFilename);
        })[0].readAsText(file);
    });

    $('#saveSvgLink').click(function() {
        if (fileExtension == 'svg' || !svgString) {
            return;
        }
        var blob = new Blob([svgString], {type: 'text/plain; charset=utf-8'});
        saveAs(blob, bareFilename+'.svg');
    });

    $('#saveKicadPcbLink').click(function() {
        if (!kicadPcb) {
            return;
        }
        var blob = new Blob([kicadPcb], {type: 'text/plain; charset=utf-8'});
        saveAs(blob, bareFilename+'.kicad_pcb');
    });
});
