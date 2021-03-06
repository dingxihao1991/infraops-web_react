import React, { PureComponent } from 'react';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import List from './NoticeList';

const { TabPane } = Tabs;

export default class NoticeIcon extends PureComponent {
  static Tab = TabPane;
  static tabs = Tabs;

    static defaultProps = {
      onItemClick: () => {},
      onPopupVisibleChange: () => {},
      onTabChange: () => {},
      onClear: () => {},
      onMore: () => {},
      loading: false,
      locale: {
        emptyText: '暂无数据',
        clear: '清空',
      },
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  constructor(props) {
    super(props);
    this.state = {};
    if (props.children && props.children[0]) {
      this.state.tabType = props.children[0].props.title;
    }
  }

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };

  onTabChange = tabType => {
    this.setState({ tabType });
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  getNotificationBox() {
    const { children, loading, locale, onClear,onMore } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
        const title =
            child.props.list && child.props.list.length > 0
                ? `${child.props.title} (${child.props.list.length})`
                : child.props.title;

      return (
        <TabPane tab={title}>
          <List
              {...child.props}
              data={child.props.list}
              onClick={item => this.onItemClick(item, child.props)}
              onClear={() => onClear(child.props.title)}
              onMore={() => onMore(child.props.title)}
              title={child.props.title}
              locale={locale}
          />
        </TabPane>
      );
    });
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} tabPosition="top" onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  render() {
    const { className, count, popupAlign, onPopupVisibleChange, popupVisible } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={styles.badge}>
          <Icon type="bell" className={styles.icon} />
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
