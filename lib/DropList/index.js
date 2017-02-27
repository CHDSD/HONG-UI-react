'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OptionItem = require('./OptionItem');

var _OptionItem2 = _interopRequireDefault(_OptionItem);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 下拉选择框, 传入属性说明：
//  nodefault 选中框中默认会显示第一个选项，设置为true之后禁止默认选中，选中框显示内容为空
//  curoption 当前选中项的value，指定下拉框组件加载时的选中项
var DropList = _react2.default.createClass({
	displayName: 'DropList',

	getInitialState: function getInitialState() {
		var i,
		    index = -1,
		    dropData = this.props.dropData;
		// 如果没有禁用默认选择，默认选中第一项456
		if (!this.props.nodefault && dropData.length > 0) {
			index = 0;
		}
		// 初始化时已经指定了选项，选中指定的选项
		for (i = 0; i < dropData.length; i++) {
			if (this.props.curoption === dropData[i].value) {
				index = i;
			}
		}
		// index表示当前选中的选项的序号，如果没有选项选中index的值为-1
		return {
			index: index
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var i,
		    index = -1;
		var dropData = nextProps.dropData;
		// 选项改变，重新计算index的值
		if (this.props.curoption !== nextProps.curoption || this.props.dropData.length != dropData.length) {
			for (i = 0; i < dropData.length; i++) {
				if (nextProps.curoption === dropData[i].value) {
					index = i;
				}
			}
			this.setState({
				index: index
			});
		}
	},
	// 设置下拉框选中项，当点击已选中的选项时，取消选中
	handleSel: function handleSel(value, index) {
		// this.setState({
		// 	index: this.state.index == index ? -1 : index
		// });
		this.props.chgOption(this.props.propKey, value);
	},
	// 切换展开收起状态
	switchDrop: function switchDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		var curActive = this.props.curActive == this.props.propKey ? '' : this.props.propKey;
		this.props.chgActive(curActive);
	},
	render: function render() {
		var dropData = this.props.dropData;
		var i,
		    dropCls,
		    optList = [];
		for (i = 0; i < dropData.length; i++) {
			optList.push(_react2.default.createElement(_OptionItem2.default, { key: i, index: i, chgSel: this.handleSel, item: dropData[i] }));
		}
		var selectOption = '';
		if (this.state.index > -1) {
			selectOption = dropData.length > this.state.index ? dropData[this.state.index].nm : '';
		}
		dropCls = this.props.propKey == this.props.curActive ? 'active' : '';
		return _react2.default.createElement(
			'div',
			{ ref: 'drop', className: 'droplist', onClick: this.switchDrop, style: { position: 'relative' } },
			_react2.default.createElement(
				'div',
				{ className: 'select-abtest' },
				_react2.default.createElement('input', { className: 'abtestDrop', type: 'text', placeholder: this.props.placeholder, value: selectOption, readOnly: true }),
				_react2.default.createElement('span', { className: 'icon-arrow' })
			),
			_react2.default.createElement(
				'ul',
				{ className: "option-list " + dropCls },
				optList
			)
		);
	}
});

exports.default = DropList;