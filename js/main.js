window.MainModule = (function ($, win) {

    var modules = {};

    // -- Create as many modules as you need ...
    modules["alerter"] = (function () {
        var someFunction = function () {
            alert('I alert first');
        };

        return {
            init: someFunction
        };
    }());

    modules["type"] = (function () {
        return {
            init: function (text) {

                var $focused = $(':focus');
                var focused_id = $focused.attr('id');
                var txtarea = document.getElementById(focused_id);
                if (!txtarea) {
                    return;
                }

                var scrollPos = txtarea.scrollTop;
                var strPos = 0;
                var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                    "ff" : (document.selection ? "ie" : false ) );
                if (br == "ie") {
                    txtarea.focus();
                    var range = document.selection.createRange();
                    range.moveStart('character', -txtarea.value.length);
                    strPos = range.text.length;
                } else if (br == "ff") {
                    strPos = txtarea.selectionStart;
                }

                var front = (txtarea.value).substring(0, strPos);
                var back = (txtarea.value).substring(strPos, txtarea.value.length);
                txtarea.value = front + text + back;
                strPos = strPos + text.length;
                if (br == "ie") {
                    txtarea.focus();
                    var ieRange = document.selection.createRange();
                    ieRange.moveStart('character', -txtarea.value.length);
                    ieRange.moveStart('character', strPos);
                    ieRange.moveEnd('character', 0);
                    ieRange.select();
                } else if (br == "ff") {
                    txtarea.selectionStart = strPos;
                    txtarea.selectionEnd = strPos;
                    txtarea.focus();
                }

                txtarea.scrollTop = scrollPos;

            }

        };
    }());

    return {
        init: function () {

            var fieldId = $('form').find('*').filter(':input:visible:first').attr('id');

            console.log(fieldId);

            $('form').find('*').filter(':input:visible:first').focus();

            $("input").focus(function(event){
                fieldId = event.currentTarget.id;
            });

            $('button').on('click', function (event) {
                var char = $(event.currentTarget).attr('data-letter');
                $("#"+fieldId).focus();
                modules.type.init(char);
            })
        }
    }
}(jQuery, this));