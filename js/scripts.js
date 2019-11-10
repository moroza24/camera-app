import $ from 'jquery';
import camera from './modules/camera';

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
        } else {
            $('#cbx-lable').addClass('worning');
        }
    });

    imgInputBtn.click((e)=>{
        console.log(e.currentTarget.dataset);
        $(`#${e.currentTarget.dataset.target}`).trigger('click');
    })
});