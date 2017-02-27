'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_React$Component) {
	_inherits(SideMenu, _React$Component);

	function SideMenu(props) {
		_classCallCheck(this, SideMenu);

		var _this = _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

		var contextPath = window.appConf.contextPath || '';
		contextPath = contextPath && contextPath.replace(/\/+$/, '');
		_this.state = {
			contextPath: contextPath,
			// 当前展开路径
			curPath: _this.props.curPath || ''
		};

		_this.setCurPath = _this.setCurPath.bind(_this);
		return _this;
	}

	_createClass(SideMenu, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.curPath !== this.props.curPath) {
				var path = nextProps.curPath;
				// let path = nextProps.curPath.slice(this.state.contextPath.length);
				if (path !== this.state.curPath) {
					this.setState({ curPath: path });
				}
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {}
		// 


		// 子菜单，菜单元素点击时，会传入父级的路径

	}, {
		key: 'setCurPath',
		value: function setCurPath(path, isItem) {
			// 点击子菜单时，如果路径在当前展开路径上，说明该子菜单是展开的，将展开往上一退层，收起该子菜单。
			if (!isItem && this.state.curPath.indexOf(path) === 0) {
				path = path.split('/');
				path.pop();
				path = path.join('/');
			}
			this.setState({ curPath: path });
			if (isItem && this.props.itemClk) {
				this.props.itemClk(path);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.data;
			var contextPath = this.state.contextPath;

			var curActive = this.props.curActive;
			var curPath = this.state.curPath;

			var list = [];
			for (var i = 0; i < data.length; i++) {
				var itemProps = {
					key: i,
					level: 1,
					parent: contextPath,
					data: data[i],
					curPath: curPath,
					setPath: this.setCurPath
				};
				list.push(_react2.default.createElement(_MenuItem2.default, itemProps));
			}

			return _react2.default.createElement(
				'ul',
				{ ref: 'menu', className: 'h-ui-side-menu level-1' },
				list
			);
		}
	}]);

	return SideMenu;
}(_react2.default.Component);

exports.default = SideMenu;