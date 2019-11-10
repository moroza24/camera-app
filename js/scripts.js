import $ from 'jquery';
import Tesseract from 'tesseract.js';

$(document).ready(() => {
    let acceptBtn = $('#accept-terms');

    let imgInputBtn = $('.in-button');

    acceptBtn.click(()=>{
        let termsCheckBox = $('#cbx')[0];
        $('#cbx-lable').removeClass('worning');

        if(termsCheckBox.checked){
            // next screen: 2
            $('#acceptens').hide('slow');
            $('#select-input').removeClass('hidden');

            // add localstorage timestemp for 3 minuts
        } else {
            $('#cbx-lable').addClass('worning');
        }
    });

    imgInputBtn.click((e)=>{
        $(`#${e.currentTarget.dataset.target}`).trigger('click');
    })


    
    const cameraInput = document.getElementById('camera-input');
    const fileInput = document.getElementById('file-input');

    cameraInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));
    fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

    const output = document.getElementById('output');

    function doSomethingWithFiles(fileList) {
        let file = null;

        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].type.match(/^image\//)) {
                file = fileList[i];
                break;
            }
        }

        if (file !== null) {
            output.src = URL.createObjectURL(file);
        }
        console.log(URL.createObjectURL(file));
        

        Tesseract.recognize(
            URL.createObjectURL(file),
            'eng+heb',
            { logger: m => console.log(m.progress) }
        ).then(({ data: { text } }) => {
            console.log(text);
            alert(text);
        })
    }

    $.getJSON("pm_migration.json", function(json) {
        console.log(json); // this will show the info it in firebug console
    });
});
