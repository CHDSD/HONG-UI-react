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

// 月份名映射
var MONTH_MAP = {
	1: '一月',
	2: '二月',
	3: '三月',
	4: '四月',
	5: '五月',
	6: '六月',
	7: '七月',
	8: '八月',
	9: '九月',
	10: '十月',
	11: '十一月',
	12: '十二月'
};

/**
 * 日历组件
 * 组件可传入属性
 * 
 * startDate string 可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * endDate string  可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * hide boolean 可选 是否隐藏日期选择组件
 * chg function 可选 选择日期时的回调，点击日期元素时调用(e.g,chg(dateStr))
 */

var Calendar = function (_React$Component) {
	_inherits(Calendar, _React$Component);

	function Calendar(props) {
		_classCallCheck(this, Calendar);

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

		var now = new Date();
		var startTime = _this.props.startDate || null;
		var endTime = _this.props.endDate || null;
		startTime = startTime && _this.strToTime(startTime);
		endTime = endTime && _this.strToTime(endTime);

		_this.state = {
			// 当前文本框显示的时间
			selTime: '',
			// 当前的系统时间
			curTime: now,
			// 当前日历框视图中显示的时间
			viewTime: now,
			// 当前的视图
			curView: 'month',
			// 可选的开始时间
			startTime: startTime,
			// 可选的结束时间
			endTime: endTime,
			// 是否显示日历视图框
			showItem: false
		};

		_this.preView = _this.preView.bind(_this);
		_this.nextView = _this.nextView.bind(_this);
		_this.parentView = _this.parentView.bind(_this);
		_this.dayClk = _this.dayClk.bind(_this);
		_this.monthClk = _this.monthClk.bind(_this);
		_this.yearClk = _this.yearClk.bind(_this);
		_this.toggle = _this.toggle.bind(_this);
		_this.outsideClk = _this.outsideClk.bind(_this);
		return _this;
	}

	_createClass(Calendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('click', this.outsideClk);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('click', this.outsideClk);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// 如果开始时间或结束时间与之前不同，重设state中的可选范围的开始，结束时间
			if (nextProps.startDate !== this.props.startDate || nextProps.endDate !== this.props.endDate) {
				var startTime = nextProps.startDate || null;
				var endTime = nextProps.endDate || null;
				startTime = startTime && this.strToTime(startTime);
				endTime = endTime && this.strToTime(endTime);
				this.setState({ startTime: startTime, endTime: endTime });
			}
		}

		/**
   * 字符串转换为时间
   * @param  {string} str 输入时间字符串
   * @return {[type]}     [description]
   */

	}, {
		key: 'strToTime',
		value: function strToTime(str) {
			var ymd = str.split('-');
			var y = ymd[0];
			var m = ymd[1] - 1;
			var d = ymd[2];
			return new Date(y, m, d);
		}

		/**
   * 时间转换为字符串
   * @param  {Date} time 输入的事件对象
   * @return {[type]}      [description]
   */

	}, {
		key: 'timeToStr',
		value: function timeToStr(time) {
			var y = time.getFullYear();
			var m = time.getMonth();
			var d = time.getDate();

			m = (m + 101 + '').substring(1);
			d = (d + 100 + '').substring(1);
			return [y, m, d].join('-');
		}

		// 阻止点击事件冒泡

	}, {
		key: 'preventClk',
		value: function preventClk(e) {
			e.stopPropagation();
		}

		// 点击item元素框外面时，收起item框

	}, {
		key: 'outsideClk',
		value: function outsideClk() {
			this.setState({ showItem: false });
		}

		// 获取时间对象的yyyy, mm, dd

	}, {
		key: 'getYmd',
		value: function getYmd(date) {
			var y = date.getFullYear();
			var m = date.getMonth();
			var d = date.getDate();
			return { y: y, m: m, d: d };
		}

		// 获取月视图，显示天

	}, {
		key: 'getMonthView',
		value: function getMonthView() {
			var _getYmd = this.getYmd(this.state.viewTime),
			    y = _getYmd.y,
			    m = _getYmd.m,
			    d = _getYmd.d;

			var _state = this.state,
			    startTime = _state.startTime,
			    endTime = _state.endTime,
			    curTime = _state.curTime;

			var dayList = [];

			var day = 1;
			var cls = '';
			var monthDay = new Date(y, m, day);
			// 当前月份的天
			while (monthDay.getMonth() === m) {
				cls = 'day cur-month';
				if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
					cls += ' disable';
				}
				if (monthDay > curTime) {
					cls += ' post';
				}
				dayList.push(_react2.default.createElement(
					'span',
					{ className: cls, key: day },
					day
				));
				day += 1;
				monthDay = new Date(y, m, day);
			}
			var lastDate = day - 1;

			// 设置灰色显示的上月的日期
			day = 1;
			cls = '';
			var firstDayOfMonth = new Date(y, m, 1).getDay();
			var preDays = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
			while (preDays > 0) {
				preDays -= 1;
				day -= 1;
				monthDay = new Date(y, m, day);
				cls = 'day pre-month';
				if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
					cls += ' disable';
				}
				dayList.unshift(_react2.default.createElement(
					'span',
					{ className: cls, key: day },
					monthDay.getDate()
				));
			}

			// 设置灰色显示的下月的日期
			day = lastDate;
			cls = '';
			var lastDayOfMonth = new Date(y, m, day).getDay();
			var postDays = lastDayOfMonth === 6 ? 7 : 7 - lastDayOfMonth - 1;
			// 确保每个月显示6行天数
			if ((dayList.length + postDays) / 7 < 6) {
				postDays += 7;
			}
			while (postDays > 0) {
				postDays -= 1;
				day += 1;
				monthDay = new Date(y, m, day);
				cls = 'day post-month';
				if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
					cls += ' disable';
				}
				dayList.push(_react2.default.createElement(
					'span',
					{ className: cls, key: day },
					monthDay.getDate()
				));
			}

			return _react2.default.createElement(
				'div',
				{ className: 'days', onClick: this.dayClk },
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u65E5'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u4E00'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u4E8C'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u4E09'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u56DB'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u4E94'
				),
				_react2.default.createElement(
					'span',
					{ className: 'day-name' },
					'\u516D'
				),
				dayList
			);
		}

		// 获取年视图，显示月份

	}, {
		key: 'getYearView',
		value: function getYearView() {
			var _getYmd2 = this.getYmd(this.state.viewTime),
			    y = _getYmd2.y,
			    m = _getYmd2.m,
			    d = _getYmd2.d;

			var _state2 = this.state,
			    startTime = _state2.startTime,
			    endTime = _state2.endTime,
			    curTime = _state2.curTime;

			var mList = [];

			// 开始，结束日期所在的月份，每个显示的月份如果不在开始，结束时间的月份范围内，都要加上disable。
			// 为了方便对比，生成时间时天都设置为每月第一天。
			startTime = startTime && new Date(startTime.getFullYear(), startTime.getMonth(), 1);
			endTime = endTime && new Date(endTime.getFullYear(), endTime.getMonth(), 1);
			var cls = void 0,
			    monthDay = void 0;
			for (var i = 1; i < 13; i++) {
				monthDay = new Date(y, i - 1, 1);
				cls = 'month';
				if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
					cls += ' disable';
				}
				if (monthDay > curTime) {
					cls += ' post-month';
				}
				mList.push(_react2.default.createElement(
					'span',
					{ className: cls, key: i },
					MONTH_MAP[i]
				));
			}

			return _react2.default.createElement(
				'div',
				{ className: 'months', onClick: this.monthClk },
				mList
			);
		}

		// 获取十年期视图

	}, {
		key: 'getDecadeView',
		value: function getDecadeView() {
			var _getYmd3 = this.getYmd(this.state.viewTime),
			    y = _getYmd3.y,
			    m = _getYmd3.m,
			    d = _getYmd3.d;

			var _state3 = this.state,
			    startTime = _state3.startTime,
			    endTime = _state3.endTime,
			    curTime = _state3.curTime;

			var yList = [];

			// 开始，结束日期所在的年份，每个显示的年份如果不在开始，结束时间的年份范围内，都要加上disable。
			// 为了方便对比，生成时间时天都设置为每年第一个月的第一天。
			startTime = startTime && new Date(startTime.getFullYear(), 0, 1);
			endTime = endTime && new Date(endTime.getFullYear(), 0, 1);

			var cls = '';
			var monthDay = void 0;
			y = y - y % 10 - 1;
			for (var i = 0; i < 12; i++) {
				cls = 'year';
				if (i == 0) {
					cls += ' pre-year';
				} else if (i == 11) {
					cls += ' post-year';
				} else if (new Date(y, 0, 1) > curTime) {
					cls += ' post-year';
				}
				monthDay = new Date(y, 0, 1);
				if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
					cls += ' disable';
				}
				yList.push(_react2.default.createElement(
					'span',
					{ className: cls, key: i },
					y
				));
				y++;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'years', onClick: this.yearClk },
				yList
			);
		}

		// 获取日历视图

	}, {
		key: 'getView',
		value: function getView() {
			var curView = this.state.curView;
			if (curView === 'month') {
				return this.getMonthView();
			} else if (curView === 'year') {
				return this.getYearView();
			} else if (curView === 'decade') {
				return this.getDecadeView();
			}
		}

		// 获取当前视图父级信息的描述

	}, {
		key: 'getParentsInfo',
		value: function getParentsInfo() {
			var _getYmd4 = this.getYmd(this.state.viewTime),
			    y = _getYmd4.y,
			    m = _getYmd4.m,
			    d = _getYmd4.d;

			var curView = this.state.curView;
			var info = '';

			if (curView === 'month') {
				info = MONTH_MAP[m + 1] + y;
			} else if (curView === 'year') {
				info = y;
			} else if (curView === 'decade') {
				info = y - y % 10 + '-' + (y - y % 10 + 9);
			}
			return info;
		}

		// 显示、隐藏日历框

	}, {
		key: 'toggle',
		value: function toggle() {
			this.setState({ showItem: !this.state.showItem });
		}

		// 设置选中的日期，如果传入了select方法，调用select方法

	}, {
		key: 'setSelectTime',
		value: function setSelectTime(timeStr, viewTime) {
			this.setState({
				selTime: timeStr,
				viewTime: viewTime,
				showItem: false
			});
			if (this.props.select) {
				this.props.select(timeStr);
			}
		}

		// 日期被点击

	}, {
		key: 'dayClk',
		value: function dayClk(e) {
			if (e.target.className.match(/disable/)) {
				return;
			}

			var _getYmd5 = this.getYmd(this.state.viewTime),
			    y = _getYmd5.y,
			    m = _getYmd5.m,
			    d = _getYmd5.d;

			var cls = e.target.className;
			d = e.target.innerHTML;
			if (cls.match(/pre-month/)) {
				m -= 1;
			} else if (cls.match(/post-month/)) {
				m += 1;
			}
			var nextSelTime = this.timeToStr(new Date(y, m, e.target.innerHTML));
			var nextViewTime = new Date(y, m, d);
			this.setSelectTime(nextSelTime, nextViewTime);
		}

		// 月份被点击

	}, {
		key: 'monthClk',
		value: function monthClk(e) {
			if (e.target.className.match(/disable/)) {
				return;
			}
			var month = e.target.innerHTML;
			for (var i = 1; i < 13; i++) {
				if (MONTH_MAP[i] === month) {
					month = i - 1;
					break;
				}
			}
			if (typeof month === 'number') {
				var viewTime = this.state.viewTime;
				var y = viewTime.getFullYear();
				var m = viewTime.getMonth();
				var d = viewTime.getDate();
				this.setState({
					viewTime: new Date(y, month, d),
					curView: 'month'
				});
			}
		}

		// 年被点击

	}, {
		key: 'yearClk',
		value: function yearClk(e) {
			if (e.target.className.match(/disable/)) {
				return;
			}

			var _getYmd6 = this.getYmd(this.state.viewTime),
			    y = _getYmd6.y,
			    m = _getYmd6.m,
			    d = _getYmd6.d;

			var year = e.target.innerHTML;

			this.setState({
				viewTime: new Date(year, m, d),
				curView: 'year'
			});
		}

		// 上一个日历视图

	}, {
		key: 'preView',
		value: function preView() {
			var _getYmd7 = this.getYmd(this.state.viewTime),
			    y = _getYmd7.y,
			    m = _getYmd7.m,
			    d = _getYmd7.d;

			var curView = this.state.curView;
			var nextTime = null;

			if (curView === 'month') {
				nextTime = new Date(y, m - 1, d);
			} else if (curView === 'year') {
				nextTime = new Date(y - 1, m, d);
			} else if (curView === 'decade') {
				nextTime = new Date(y - 10, m, d);
			}
			this.setState({ viewTime: nextTime });
		}

		// 下一个日历视图

	}, {
		key: 'nextView',
		value: function nextView() {
			var _getYmd8 = this.getYmd(this.state.viewTime),
			    y = _getYmd8.y,
			    m = _getYmd8.m,
			    d = _getYmd8.d;

			var curView = this.state.curView;
			var nextTime = null;

			if (curView === 'month') {
				nextTime = new Date(y, m + 1, d);
			} else if (curView === 'year') {
				nextTime = new Date(y + 1, m, d);
			} else if (curView === 'decade') {
				nextTime = new Date(y + 10, m, d);
			}
			nextTime && this.setState({ viewTime: nextTime });
		}

		// 切换到父级的视图

	}, {
		key: 'parentView',
		value: function parentView() {
			var curView = this.state.curView;
			var nextView = null;

			if (curView === 'month') {
				nextView = 'year';
			} else if (curView === 'year') {
				nextView = 'decade';
			}
			nextView && this.setState({ curView: nextView });
		}

		// 获取tools中pre，netx按钮的class
		// 主要用于props中传入了startDate，endDate时，控制按钮的显示

	}, {
		key: 'getPreNextBtnCls',
		value: function getPreNextBtnCls() {
			var _getYmd9 = this.getYmd(this.state.viewTime),
			    y = _getYmd9.y,
			    m = _getYmd9.m,
			    d = _getYmd9.d;

			var curView = this.state.curView;

			var pre = 'pre-view';
			var next = 'next-view';

			if (this.props.startDate) {
				// 和属于当前视图(不包括pre和post)的第一个元素的第一天比较，如果比startDate小，则不显示preView按钮
				var startTime = this.strToTime(this.props.startDate);
				var compareTime = void 0;
				if (curView === 'month') {
					// 比较这个月第一天
					compareTime = new Date(y, m, 1);
				} else if (curView === 'year') {
					// 比较今年第一个月的第一天
					compareTime = new Date(y, 0, 1);
				} else if (curView === 'decade') {
					// 比较本十年开头的第一年的第一个月的第一天
					compareTime = new Date(y - y % 10, 0, 1);
				}
				if (startTime >= compareTime) {
					pre += ' disable';
				}
			}

			if (this.props.endDate) {
				// 和属于当前视图(不包括pre和post)的最后一个元素的最后一天比较，如果比endDate大，则不显示nextView按钮
				var endTime = this.strToTime(this.props.endDate);
				var _compareTime = void 0;
				if (curView === 'month') {
					// 比较这个月最后一天
					_compareTime = new Date(y, m + 1, 0);
				} else if (curView === 'year') {
					// 比较今年最后一个月的最后一天
					_compareTime = new Date(y, 11, 31);
				} else if (curView === 'decade') {
					// 比较本十年结束的最后一年的最后一个月的最后一天
					_compareTime = new Date(y - y % 10 + 9, 11, 31);
				}
				if (endTime <= _compareTime) {
					next += ' disable';
				}
			}

			return {
				pre: pre,
				next: next
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var items = null;
			var parentsInfo = null;
			var btnCls = null;
			// 日历视图框显示时才计算视图中的内容
			if (this.state.showItem) {
				items = this.getView();
				parentsInfo = this.getParentsInfo();
				btnCls = this.getPreNextBtnCls();
			}

			return _react2.default.createElement(
				'div',
				{ className: 'chui-calendar', onClick: this.preventClk, style: { display: this.props.hide ? 'none' : '' } },
				_react2.default.createElement(
					'div',
					{ className: 'ipt-box' },
					_react2.default.createElement('input', { type: 'text', onClick: this.toggle, value: this.state.selTime, readOnly: true })
				),
				_react2.default.createElement(
					'div',
					{ className: 'item-box', style: { display: this.state.showItem ? '' : 'none' } },
					_react2.default.createElement(
						'div',
						{ className: 'tools' },
						_react2.default.createElement(
							'span',
							{ className: btnCls && btnCls.pre, onClick: this.preView },
							'<'
						),
						_react2.default.createElement(
							'div',
							{ className: 'parents-info', onClick: this.parentView },
							parentsInfo
						),
						_react2.default.createElement(
							'span',
							{ className: btnCls && btnCls.next, onClick: this.nextView },
							'>'
						)
					),
					items
				)
			);
		}
	}]);

	return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
	hide: _react2.default.PropTypes.bool,
	startDate: _react2.default.PropTypes.string,
	endDate: _react2.default.PropTypes.string
};

exports.default = Calendar;