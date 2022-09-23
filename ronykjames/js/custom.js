﻿(function () {

    (function ($) {
        var Fewlines;
        Fewlines = (function () {

            function Fewlines(el, options) {
                var appendText, div, hidLines, i, lineHeight, needCut, string, text, visLines, words, _i, _ref,
                    _this = this;
                this.defaults = {
                    'closeMark': 'close',
                    'openMark': '...',
                    'newLine': false,
                    'lines': 3
                };
                this.opts = $.extend({}, this.defaults, options);
                this.$el = $(el);
                string = '';
                div = $("<div>x</div>").css({
                    'position': 'absolute',
                    'left': 0,
                    'top': "-3000px",
                    "visibility": "hidden"
                }).width($(this.$el).width()).css($(this.$el).css(['font-size', 'font-weight', 'font-family'])).appendTo('body');
                text = $(el).text();
                lineHeight = div.height();
                words = text.split(/\b/);
                needCut = false;
                this.openMark = $("<a>" + this.opts.openMark + "</a>");
                if (this.opts.newLine) {
                    this.openMark.css({
                        'display': 'block',
                        'color': 'black'
                    });
                }
                //this.openMark.bind('click', function (event) {
                //    event.preventDefault();
                //    return _this.show();
                //});
                this.closeMark = $("<a >" + this.opts.closeMark + "</a>").hide();
                this.closeMark.bind('click', function (event) {
                    event.preventDefault();
                    return _this.close();
                });
                for (i = _i = 0, _ref = words.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    appendText = this.getLines(words, i);
                    if (!this.opts.newLine) {
                        appendText += this.opts.openMark;
                    }
                    div.text(appendText);
                    if (div.height() > this.opts.lines * lineHeight) {
                        needCut = true;
                        break;
                    }
                }
                visLines = this.getLines(words, i - 1);
                hidLines = text.slice(visLines.length);
                this.hidePart = $('<span>').hide().text(hidLines);
                if (needCut) {
                    this.$el.text(visLines).append(this.openMark).append(this.hidePart).append(this.closeMark);
                }
                div.remove();
                this.$el;
            }

            Fewlines.prototype.getLines = function (words, i) {
                return words.slice(0, +i + 1 || 9e9).join('').replace(/\W+$/, '');
            };

            Fewlines.prototype.show = function () {
                this.openMark.hide();
                this.hidePart.show();
                return this.closeMark.css({ "display": "block", "color": "black", "font-weight": 300, "font-size": "16px" });
            };

            Fewlines.prototype.close = function () {
                this.openMark.show();
                this.hidePart.hide();
                return this.closeMark.hide();
            };

            Fewlines.prototype.init = function () {
                var _this;
                return _this = this;
            };

            return Fewlines;

        })();
        return $.fn.fewlines = function (options) {
            if (this.length) {
                return this.each(function () {
                    var rev;
                    rev = new Fewlines(this, options);
                    rev.init();
                    return $(this).data("fewlines", rev);
                });
            }
        };
    })(jQuery);

}).call(this);
$('.1').fewlines();
$('.2').fewlines({ lines: 7 });
$('.3').fewlines({ lines: 4 });
    //$('#3').fewlines({ openMark: 'Read More', closeMark: 'Read Less', newLine: true });