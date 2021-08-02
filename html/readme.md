### BFC (块级格式化上下文)
 * 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
 只要有以下属性就会触发BFC特性:
    - body 根元素
    - 浮动元素：float 除 none 以外的值
    - 绝对定位元素：position (absolute、fixed)
    - display 为 inline-block、table-cells、flex
    - overflow 除了 visible 以外的值 (hidden、auto、scroll)


### 清除浮动
  - 父元素设置overflow:hidden;
  - 父元素添加伪类:after:{content:'';display:block;clear:both}

### 元素垂直居中

  1. 知道元素宽高

      - margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -1/2 元素高度

  2. 不知道元素宽高：
   设置自身
    - margin: 0 auto;
      position:relative;
      top:50%;
      transform: translateY(-50%)
    - position: absolute;
      width: 200px;
      height: 200px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    设置父元素
    - display: flex;
      align-items:center;
      justify-content:center;
    - display:grid;
      justify-content:center;
      align-content:center

## float 是否完全脱离了文档流
    - 如果跟随的是 块元素 则会覆盖到块元素之上,如果块元素里面有文案内容,则会随着float元素环绕排列,如果想消除这个效果,则设置overflow:hidden 触发BFC
        * 此方法可实现两列自适应布局,左侧宽度固定,右侧内容自适应
    - 如果是内联元素 则会被内联元素环绕
