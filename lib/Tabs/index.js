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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by xiening on 2017/2/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this2 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this2.state = {
            currentIndex: _this2.props.currentIndex,
            animateshow: false
        }, _this2.callBack = function (index, name) {
            if (_this2.props.callBack != undefined) {
                _this2.props.callBack(index, name);
            }
        };
        return _this2;
    }

    _createClass(Tabs, [{
        key: 'check_title_index',
        value: function check_title_index(index) {
            return index === this.state.currentIndex ? "Tab_title active" : "Tab_title";
        }
    }, {
        key: 'check_item_index',
        value: function check_item_index(index) {
            return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;
            var animatestyle = this.state.animateshow ? { animation: 'tabanimate 300ms linear' } : {};
            var isanimate = this.props.animate;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'Tab_title_wrap' },
                    _react2.default.Children.map(this.props.children, function (element, index) {
                        return (
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                            _react2.default.createElement(
                                'div',
                                { onClick: function onClick() {
                                        _this3.setState({ currentIndex: index, animateshow: isanimate, callBack: _this3.callBack(index, element.props.name) });
                                    }, className: _this3.check_title_index(index) },
                                element.props.name
                            )
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Tab_item_wrap' },
                    _react2.default.Children.map(this.props.children, function (element, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: _this3.check_item_index(index), style: animatestyle },
                            element
                        );
                    })
                )
            );
        }
    }]);

    return Tabs;
}(_react2.default.Component);

exports.default = Tabs;