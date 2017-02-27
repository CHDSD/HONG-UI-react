"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionItem = _react2.default.createClass({
	displayName: "OptionItem",

	handleClk: function handleClk(event) {
		this.props.chgSel(this.props.item.value, this.props.index);
	},
	render: function render() {
		return _react2.default.createElement(
			"li",
			{ className: "option", onClick: this.handleClk, "data-value": this.props.item.value },
			this.props.item.nm
		);
	}
});

exports.default = OptionItem;