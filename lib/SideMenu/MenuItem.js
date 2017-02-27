'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_React$Component) {
	_inherits(MenuItem, _React$Component);

	function MenuItem(props) {
		_classCallCheck(this, MenuItem);

		var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

		_this.state = {};

		_this.subMenuClk = _this.subMenuClk.bind(_this);
		_this.itemClk = _this.itemClk.bind(_this);
		return _this;
	}

	// 子菜单点击事件


	_createClass(MenuItem, [{
		key: 'subMenuClk',
		value: function subMenuClk() {
			var path = this.props.parent + '/' + this.props.data.id;
			console.log('path: ' + path);
			this.props.setPath(path);
		}
	}, {
		key: 'itemClk',
		value: function itemClk() {
			var path = this.props.parent + '/' + this.props.data.id;
			console.log('path no-child: ' + path);
			this.props.setPath(path, true);
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.data;


			if (data.child) {
				var list = [];
				var child = data.child;
				var _props = this.props,
				    level = _props.level,
				    parent = _props.parent,
				    curPath = _props.curPath,
				    setPath = _props.setPath;

				level += 1;
				parent = parent + '/' + data.id;

				for (var i = 0; i < child.length; i++) {
					var itemProps = {
						key: i,
						level: level,
						parent: parent,
						data: child[i],
						curPath: curPath,
						setPath: setPath
					};
					list.push(_react2.default.createElement(MenuItem, itemProps));
				}
				var cls = "sub-menu level-" + level;
				if (this.props.curPath.indexOf(parent) === 0) {
					cls += ' expand';
				}
				return _react2.default.createElement(
					'li',
					{ className: 'mid-layer', ref: 'menu' },
					_react2.default.createElement(
						'p',
						{ className: 'mid-name', onClick: this.subMenuClk },
						data.name
					),
					_react2.default.createElement(
						'ul',
						{ className: cls },
						list
					)
				);
			} else {
				var _props2 = this.props,
				    _parent = _props2.parent,
				    _level = _props2.level;

				var itemCls = "menu-item " + (data.class || '');
				// let route = parent ? parent + '/' + data.path : data.path;
				// let link;
				// if (data.path) {
				// 	link = (
				// 		<Link to={route}><span className='menu_icon'></span>{data.name}</Link>
				// 	);
				// } else {
				// 	link = data.name;
				// }

				return _react2.default.createElement(
					'li',
					{ className: itemCls, onClick: this.itemClk },
					data.name
				);
			}
		}
	}]);

	return MenuItem;
}(_react2.default.Component);

exports.default = MenuItem;