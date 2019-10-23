(function(){
    window.addEventListener('DOMContentLoaded', startWatchingFiles, false);

})();
var file;
    
function startWatchingFiles() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
    function handleFileSelect(evt) {
        file = evt.target.files[0]; // FileList object
        console.log(evt);
        processFiles();
    }
function processFiles() {
        // Loop through the FileList
        if(file) {
            
        var canvases = document.getElementsByClassName('canvas');

            while(canvases[0]){
                canvases[0].parentNode.removeChild(canvases[0]);
            }


          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
                var jsonData = reader.result;
                var layouts = JSON.parse(jsonData).layouts;
                for (var layoutIndex = 0; layoutIndex < layouts.length; layoutIndex++) {
                var span = document.createElement('div');
                    span.className = "canvas";
                var layout = layouts[layoutIndex];
                var canvasWidth = layout.canvasWidth;
                var canvasHeight = layout.canvasHeight;
                var elements = layout.elements;
                var htmlText = ['<div style = "width:',canvasWidth,'px;height:',canvasHeight,'px;top:0;left:0;position:relative;border: 1px solid #000000">'].join('');
                for (var index = 0; index < elements.length; index++) {
                    element = elements[index];
                    var htmlPlacement = [' style = "width:',element.width,'px; height:',element.height,'px; top:',element.y,'px; left:',element.x,'px; position: absolute; '].join('');
                    var color = element.color;
                    if (element.type == "button") {
                        htmlText = [htmlText,'<button',htmlPlacement,' background-color:',color,'">Button</button>\n'].join(''); 
                    }
                    else if (element.type == "title") {
                        htmlText = [htmlText,'<div class = "le" ',htmlPlacement, 'background-color:',color?color:'#29b571',';font-size:30px">Title</div>'].join(''); 
                    }
                    else if (element.type == "text") {
                        htmlText = [htmlText,'<div class = "le" ',htmlPlacement, 'background-color:',color?color:'#91115e;','">Some Text</div>'].join(''); 
                    }
                    else if (element.type == "image") {
                        htmlText = [htmlText,'<img src="https://placeimg.com/',element.width,'/',element.height,'/any"',htmlPlacement,'"></img>'].join('');
                    }
                    else {
                        htmlText = [htmlText,'<div',htmlPlacement, 'background-color:',color?color:'#ccd1cc','">Unassigned</div>'].join(''); 

                    }
                }

              span.innerHTML = [htmlText,'</div><br/><br/>'].join('');
              document.getElementById('list').insertBefore(span, null);
                }
            };
          })(file);

          // Read in the text file.
          reader.readAsText(file);
        }
      }

