+ justify-content
  + flex-start/end:从头/尾开始
  + center:居中
  + space-between:平均分布各元素
  + space-around:等距（元素边距上下/左右）分布~

+ 主轴/交叉轴
  + Q:如何确定主轴/交叉轴？
  + A:根据 flex-direction 确定，如果取值是 row ,则主轴为水平方向；反之主轴是垂直方向。
  + 主轴排布方式：justify-content
  + 交叉轴排布方式：align-items

+ flex-direction
  + row/row-reverse:水平方向从左到右排布/从右向左
  + column/column-reverse:水平方向从上到下排布/从下向上

+ align-items
  + baseline: 以第一个文字底线（基线）为基准，后续的文字底线（基线）以它对齐
  + strech:没有高度的时候自动撑满容器

>保存状态:
  + promise 对象
    + promise 状态: pending(进行中) fulfilled(成功) rejected(失败)
    + success：pending(进行中) => fulfilled(成功 => 凝固)
    + fail:pending(进行中) => rejected(失败 => 凝固)
    + then(): 异步执行后的结果
  + 闭包函数
