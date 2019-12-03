$(document).ready(function(){
    var elementPickFilter = document.querySelector('.js-filter-datepicker');
    pickmeup(elementPickFilter, {
        format	: 'Y-m-d',
        mode: 'range',
        locale: 'ru',
        title_format: 'B',
        dateFormat: 'dd.mm.yy',
        min: new Date,
        class_name: 'filter__datepicker',
        next: '<i class="i-ARROW"></i>',
        prev: '<i class="i-ARROW i-ARROW-left"></i>'
    });
    $('.js-filter-datepicker').on('click', function(e){
        e.preventDefault();
        $(this).addClass('active');
        $('.js-open-range, .js-open-filter-list').removeClass('active').siblings('.filter__price-range,.filter__section-wrap').removeClass('open');
    })
    $('.filter__datepicker').appendTo($('.filter__date'));
    $('.pick-btn').clone().insertBefore($('.filter__datepicker .pmu-instance'));
    $('.pick-accept').clone().insertAfter($('.filter__datepicker .pmu-instance'));

    elementPickFilter.addEventListener('pickmeup-hide', function (e) {
        $(this).removeClass('active');
    })

    elementPickFilter.addEventListener('pickmeup-change', function (e) {
        $('#filter-from').val(e.detail.formatted_date[0]);
        $('#filter-to').val(e.detail.formatted_date[1]);
        $('.pick-btn-item').removeClass('active');
    })
    $('.filter__datepicker').find('#three-days').attr('id', 'filter-three-days');
    $('.filter__datepicker').find('#week').attr('id', 'filter-week');
    $('.filter__datepicker').find('#weekend').attr('id', 'filter-weekend');

    $('#filter-three-days').on('click', function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var threeDay = new Date(dateNow.setDate(dateNow.getDate() + 2));
        pickmeup(elementPickFilter).set_date([new Date(), threeDay]);
        var result = pickmeup(elementPickFilter).get_date(true);
        $('#filter-from').val(result[0]);
        $('#filter-to').val(result[1]);
    });

    $('#filter-week').on('click', function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var week = new Date(dateNow.setDate(dateNow.getDate() + 6));
        pickmeup(elementPickFilter).set_date([new Date(), week]);
        var result = pickmeup(elementPickFilter).get_date(true);
        $('#filter-from').val(result[0]);
        $('#filter-to').val(result[1]);
    });

    $('#filter-weekend').on('click', function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var saturday = new Date(dateNow.setDate(dateNow.getDate() + 5));
        var sunday = new Date(dateNow.setDate(saturday.getDate() + 1));
        pickmeup(elementPickFilter).set_date([saturday, sunday]);
        var result = pickmeup(elementPickFilter).get_date(true);
        $('#filter-from').val(result[0]);
        $('#filter-to').val(result[1]);
    });
});