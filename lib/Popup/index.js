'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by xiening on 2017/2/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Popup = function (_React$Component) {
    _inherits(Popup, _React$Component);

    function Popup(props) {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

        var timestamp = new Date().getTime(),
            timeMark = false;
        _this.click = _this.click.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);
        _this.cancel = _this.cancel.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.autoClose = _this.autoClose.bind(_this);
        _this.drag = _this.drag.bind(_this);
        _this.popupBox = "popupBox" + timestamp;
        _this.popupMask = "popupMask" + timestamp;
        _this.timeMark = timeMark;
        return _this;
    }

    _createClass(Popup, [{
        key: 'click',
        value: function click(event) {
            clearTimeout(this.timeMark);
            var popupBox = document.getElementById(this.popupBox + ""),
                popupMask = document.getElementById(this.popupMask + ""),
                pHeight = document.body.clientHeight,
                pWidth = document.body.clientWidth,
                pBHeight = popupBox.offsetHeight,
                pBWidth = popupBox.offsetWidth;

            popupBox.style.display = 'block';
            popupMask.style.display = 'block';

            popupBox.style.top = pHeight / 4 + 'px';
            popupBox.style.left = pWidth / 2 - pBWidth / 2 + 'px';

            if (this.props.isdrag === true) {
                this.drag(this.props.isdrag, popupBox);
            }
            if (this.props.callBack != undefined) {
                document.getElementById('popupBoxFoot').style.display = 'block';
            }
            if (this.props.time != null) {
                this.autoClose(event);
            }
        }
        //关闭按钮函数

    }, {
        key: 'closePopup',
        value: function closePopup(event) {
            var popupBox = document.getElementById(this.popupBox + ""),
                popupMask = document.getElementById(this.popupMask + "");

            popupMask.style.display = 'none';
            popupBox.style.display = 'none';
        }
        //取消按钮函数

    }, {
        key: 'cancel',
        value: function cancel(event) {
            this.closePopup(event);
            this.props.callBack(false);
        }
        //确定按钮函数

    }, {
        key: 'confirm',
        value: function confirm(event) {
            this.closePopup(event);
            this.props.callBack(true);
        }
        //自动关闭函数

    }, {
        key: 'autoClose',
        value: function autoClose(event) {
            if (this.props.time != null) {
                this.timeMark = setTimeout(function () {
                    this.closePopup(event);
                }.bind(this), this.props.time);
            }
        }
        //拖拽函数

    }, {
        key: 'drag',
        value: function drag(b, o) {
            if (b === true) {

                //getPos函数用于获取鼠标坐标
                var getPos = function getPos(e) {
                    var e = event ? event : window.event;
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

                    return { x: e.clientX + scrollLeft, y: e.clientY + scrollTop };
                };

                var disX = 0;
                var disY = 0;

                o.onmousedown = function (e) {
                    var e = event ? event : window.event;
                    var pos = getPos(e);

                    disX = pos.x - o.offsetLeft;
                    disY = pos.y - o.offsetTop;

                    document.onmousemove = function (e) {
                        //要防止鼠标滑动太快跑出div，所以这里应该用document.因为触发onmousemove时要重新获取鼠标的坐标，所以重新获取e和pos
                        var e = event ? event : window.event;
                        var pos = getPos(e);

                        //防止div跑出可视框
                        var l = pos.x - disX;
                        var t = pos.y - disY;
                        if (l < 0) {
                            l = 0;
                        } else if (l > document.documentElement.clientWidth - o.offsetWidth) {
                            l = document.documentElement.clientWidth - o.offsetWidth;
                        }
                        if (t < 0) {
                            t = 0;
                        } else if (t > document.documentElement.clientHeight - o.offsetHeight) {
                            t = document.documentElement.clientHeight - o.offsetHeight;
                        }
                        o.style.left = l + 'px';
                        o.style.top = t + 'px';
                    };

                    document.onmouseup = function (e) {
                        var e = event ? event : window.event;
                        document.onmousemove = null; //将move清除
                        document.onmouseup = null;
                    };
                    return false; //火狐的bug，要阻止默认事件
                };
            } else {
                o.mousedown = function (e) {
                    var e = event ? event : window.event;
                    //解决文字被一起拖动
                    if (o.setCapture) {
                        o.setCapture();
                    }
                    document.mouseup = function (e) {
                        var e = event ? event : window.event;
                        //解决文字被一起拖动
                        if (o.releaseCapture) {
                            o.releaseCapture();
                        }
                    };
                };
            }
        }
        //获取提示框的脚部div

    }, {
        key: 'getFoot',
        value: function getFoot() {
            if (this.props.callBack != undefined) {
                return _react2.default.createElement(
                    'div',
                    { id: 'popupBoxFoot', className: 'popupBoxFoot' },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.cancel, style: { color: '#666', display: 'inline-block', padding: '5px 10px', background: '#e6e6e6', marginRight: '25px', cursor: 'pointer' } },
                        this.props.cancelText
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.confirm, style: { color: '#fff', display: 'inline-block', padding: '5px 10px', background: '#0e90d2', cursor: 'pointer' } },
                        this.props.confirmText
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var popupBoxFoot = this.getFoot();
            return _react2.default.createElement(
                'div',
                { className: 'Popup' },
                _react2.default.createElement('div', { id: this.popupMask, className: 'popupMask' }),
                _react2.default.Children.map(this.props.children, function (element) {
                    return _react2.default.createElement(
                        'div',
                        { onClick: _this2.click },
                        element
                    );
                }),
                _react2.default.createElement(
                    'div',
                    { id: this.popupBox, className: 'popupBox' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'popupBoxTitle' },
                        this.props.title
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:;', className: 'popupBoxCloseBtn', onClick: this.closePopup },
                        _react2.default.createElement('i', { className: 'fa-icon icon-cancel' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'popupBoxBody' },
                        this.props.content
                    ),
                    popupBoxFoot
                )
            );
        }
    }]);

    return Popup;
}(_react2.default.Component);

exports.default = Popup;