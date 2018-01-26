var ULTRA_SETTINGS = window.ULTRA_SETTINGS || {};

/******************************
     initialize respective scripts 
     *****************************/
$(document).ready(function() {
    ULTRA_SETTINGS.otherScripts();
    ULTRA_SETTINGS.iCheck();

});


/*--------------------------------
     Other Form component Scripts
 --------------------------------*/
ULTRA_SETTINGS.otherScripts = function() {


    //// datepicker
    if ($.isFunction($.fn.datepicker)) {
        $(".datepicker").each(function(i, e) {

            var $this = $(e),
                options = {
                    minViewMode: getValue($this, 'minViewMode', 0),
                    format: getValue($this, 'format', 'mm/dd/yyyy'),
                    startDate: getValue($this, 'startDate', ''),
                    endDate: getValue($this, 'endDate', ''),
                    daysOfWeekDisabled: getValue($this, 'disabledDays', ''),
                    startView: getValue($this, 'startView', 0)
                },
                $nxt = $this.next(),
                $prv = $this.prev();


            $this.datepicker(options);

            if ($nxt.is('.input-group-addon') && $nxt.has('a')) {
                $nxt.on('click', function(ev) {
                    ev.preventDefault();
                    $this.datepicker('show');
                });
            }

            if ($prv.is('.input-group-addon') && $prv.has('a')) {
                $prv.on('click', function(ev) {
                    ev.preventDefault();

                    $this.datepicker('show');
                });
            }
        });
    }


    // Date Range Picker
    if ($.isFunction($.fn.daterangepicker)) {
        $(".daterange").each(function(i, e) {
            // Change the range as you desire
            var ranges = {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            };

            var $this = $(e),
                options = {
                    format: getValue($this, 'format', 'MM/DD/YYYY'),
                    timePicker: getValue($this, 'timePicker', false),
                    timePickerIncrement: getValue($this, 'timePickerIncrement', false),
                    separator: getValue($this, 'separator', ' - '),
                },
                min_date = getValue($this, 'minDate', ''),
                max_date = getValue($this, 'maxDate', ''),
                start_date = getValue($this, 'startDate', ''),
                end_date = getValue($this, 'endDate', '');

            if ($this.hasClass('add-date-ranges')) {
                options['ranges'] = ranges;
            }

            if (min_date.length) {
                options['minDate'] = min_date;
            }

            if (max_date.length) {
                options['maxDate'] = max_date;
            }

            if (start_date.length) {
                options['startDate'] = start_date;
            }

            if (end_date.length) {
                options['endDate'] = end_date;
            }


            $this.daterangepicker(options, function(start, end) {
                var drp = $this.data('daterangepicker');

                if ($this.hasClass('daterange-text')) {
                    $this.find('span').html(start.format(drp.format) + drp.separator + end.format(drp.format));
                }
            });

            if (typeof options['ranges'] == 'object') {
                $this.data('daterangepicker').container.removeClass('show-calendar');
            }
        });
    }

};

/*--------------------------------
         iCheck
     --------------------------------*/
ULTRA_SETTINGS.iCheck = function() {



    if ($.isFunction($.fn.iCheck)) {


        $('input.skin-square-green').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%'
        });

    }
};

// Element Attribute Helper
function getValue($el, data_var, default_val) {
    if (typeof $el.data(data_var) != 'undefined') {
        return $el.data(data_var);
    }
    return default_val;
}