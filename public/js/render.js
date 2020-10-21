function renderPage(templateName, idAction) {
    fetch(templateName)
      .then(function(response) { return response.text() } )
      .then(function(template) { 
          document.getElementById('target').innerHTML = template;  
          if (idAction) {
            var items = document.getElementsByClassName('current');
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                element.className = undefined;
            }
            document.getElementById(idAction).className = 'current';
          }
          $(document).ready(function () {
            $('#camera_wrap').camera({
                loader: true,
                pagination: true,
                thumbnails: false,
                height: '38.43434343434343%',
                caption: true,
                navigation: false,
                fx: 'scrollTop',
                autoAdvance: true
            });
            $('.gallery .gall_item').touchTouch();
        });
        return true;
    });
}
