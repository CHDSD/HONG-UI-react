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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
	_inherits(Pagination, _React$Component);

	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

		_this.handleclick = _this.handleclick.bind(_this);
		_this.handleup = _this.handleup.bind(_this);
		_this.handledown = _this.handledown.bind(_this);
		return _this;
	}

	_createClass(Pagination, [{
		key: 'handleclick',
		value: function handleclick(event) {
			var value = event.target.innerHTML;
			if (event.target.className == 'disable') {
				return;
			} else if (event.target.innerHTML == this.props.current) {
				return;
			} else {
				this.props.click(value);
			}
		}
	}, {
		key: 'handleup',
		value: function handleup() {
			this.props.click('up');
		}
	}, {
		key: 'handledown',
		value: function handledown() {
			this.props.click('down');
		}
	}, {
		key: 'render',
		value: function render() {
			var total = parseInt(this.props.total),
			    current = parseInt(this.props.current),
			    range = parseInt(this.props.range),
			    dif = total - current;
			var sp = [],
			    i;
			var part = parseInt(range / 2);
			if (current < range + 1) {
				if (dif < range) {
					if (current - part > 0 && current + range - part < total) {
						sp.push(_react2.default.createElement(
							'span',
							{ onClick: this.handleclick, key: 1 },
							'1'
						));
						sp.push(_react2.default.createElement(
							'span',
							{ key: 'dot' },
							'...'
						));

						for (i = current - part; i < current + range - part; i++) {
							if (i == current) {
								sp.push(_react2.default.createElement(
									'span',
									{ onClick: this.handleclick, key: i, className: 'active' },
									i
								));
							} else {
								sp.push(_react2.default.createElement(
									'span',
									{ onClick: this.handleclick, key: i },
									i
								));
							}
						};
						sp.push(_react2.default.createElement(
							'span',
							{ key: 'anotherdot' },
							'...'
						));
						sp.push(_react2.default.createElement(
							'span',
							{ onClick: this.handleclick, key: total },
							total
						));
					} else {
						for (i = 1; i < total + 1; i++) {
							if (i == current) {
								sp.push(_react2.default.createElement(
									'span',
									{ onClick: this.handleclick, key: i, className: 'active' },
									i
								));
							} else {
								sp.push(_react2.default.createElement(
									'span',
									{ onClick: this.handleclick, key: i },
									i
								));
							}
						}
					}
				} else {
					for (i = 1; i < Math.min(total + 1, range + 1); i++) {
						if (i == current) {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i, className: 'active' },
								i
							));
						} else {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i },
								i
							));
						}
					};
					sp.push(_react2.default.createElement(
						'span',
						{ key: 'dot' },
						'...'
					));
					sp.push(_react2.default.createElement(
						'span',
						{ onClick: this.handleclick, key: total },
						total
					));
				}
			} else {
				if (dif < range) {
					sp.push(_react2.default.createElement(
						'span',
						{ onClick: this.handleclick, key: 1 },
						'1'
					));
					sp.push(_react2.default.createElement(
						'span',
						{ key: 'dot' },
						'...'
					));
					for (i = total - range + 1; i < total + 1; i++) {
						if (i == current) {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i, className: 'active' },
								i
							));
						} else {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i },
								i
							));
						}
					}
				} else {
					sp.push(_react2.default.createElement(
						'span',
						{ onClick: this.handleclick, key: 1 },
						'1'
					));
					sp.push(_react2.default.createElement(
						'span',
						{ key: 'dot' },
						'...'
					));

					for (i = current - part; i < current + range - part; i++) {
						if (i == current) {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i, className: 'active' },
								i
							));
						} else {
							sp.push(_react2.default.createElement(
								'span',
								{ onClick: this.handleclick, key: i },
								i
							));
						}
					};
					sp.push(_react2.default.createElement(
						'span',
						{ key: 'anotherdot' },
						'...'
					));
					sp.push(_react2.default.createElement(
						'span',
						{ onClick: this.handleclick, key: total },
						total
					));
				}
			};
			var up = '',
			    down = '';
			if (total == 1 || total == 0) {
				up = 'disable';
				down = 'disable';
			} else {
				if (current == 1) {
					up = 'disable';
				} else if (current == total) {
					down = 'disable';
				};
			};
			return _react2.default.createElement(
				'div',
				{ className: 'pagination' },
				_react2.default.createElement(
					'span',
					{ onClick: this.handleup, className: 'up ' + up },
					'\xA0',
					_react2.default.createElement('icon', { className: 'icon-left-open' })
				),
				sp,
				_react2.default.createElement(
					'span',
					{ onClick: this.handledown, className: 'down ' + down },
					'\xA0',
					_react2.default.createElement('icon', { className: 'icon-right-open' })
				)
			);
		}
	}]);

	return Pagination;
}(_react2.default.Component);

exports.default = Pagination;