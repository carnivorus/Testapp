$(document).ready(function () {
    $('.WorkStepButton').click(function () {
        if ($(this).next().hasClass('visible')) {
            $(this).next().removeClass('visible');
            $(this).next().addClass('invisible');
        }
        else {
            if ($(this).next().children().length > 0) {
                $(this).next().removeClass('invisible');
                $(this).next().addClass('visible');
            }
        }
    });
});
