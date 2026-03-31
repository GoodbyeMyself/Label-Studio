export default {
  enableHotkeys: {
    newUI: {
      title: "标注快捷键",
      description: "启用后可使用快捷键快速选择标签",
    },
    description: "启用标注快捷键",
    onChangeEvent: "toggleHotkeys",
    defaultValue: true,
  },
  enableTooltips: {
    newUI: {
      title: "在提示中显示快捷键",
      description: "在工具和操作按钮的提示中展示快捷键",
    },
    description: "显示快捷键提示",
    onChangeEvent: "toggleTooltips",
    checked: "",
    defaultValue: false,
  },
  enableLabelTooltips: {
    newUI: {
      title: "在标签上显示快捷键",
      description: "在标签上展示对应的快捷键",
    },
    description: "显示标签快捷键提示",
    onChangeEvent: "toggleLabelTooltips",
    defaultValue: true,
  },
  showLabels: {
    newUI: {
      title: "显示区域标签",
      description: "显示标注区域的标签名称",
    },
    description: "在区域内显示标签",
    onChangeEvent: "toggleShowLabels",
    defaultValue: false,
  },
  continuousLabeling: {
    newUI: {
      title: "创建区域后保持标签选中",
      description: "使用当前标签连续创建多个区域",
    },
    description: "创建区域后保持标签选中",
    onChangeEvent: "toggleContinuousLabeling",
    defaultValue: false,
  },
  selectAfterCreate: {
    newUI: {
      title: "创建后自动选中区域",
      description: "自动选中刚创建的标注区域",
    },
    description: "创建后选中区域",
    onChangeEvent: "toggleSelectAfterCreate",
    defaultValue: false,
  },
  showLineNumbers: {
    newUI: {
      tags: "文本标签",
      title: "显示行号",
      description: "便于在文档中定位和引用具体文本行",
    },
    description: "为文本显示行号",
    onChangeEvent: "toggleShowLineNumbers",
    defaultValue: false,
  },
  preserveSelectedTool: {
    newUI: {
      tags: "图像标签",
      title: "保留当前工具",
      description: "在切换任务后继续使用当前已选工具",
    },
    description: "记住当前工具",
    onChangeEvent: "togglepreserveSelectedTool",
    defaultValue: true,
  },
  enableSmoothing: {
    newUI: {
      tags: "图像标签",
      title: "缩放时平滑像素",
      description: "放大图像时对像素边缘进行平滑处理",
    },
    description: "缩放时启用图像平滑",
    onChangeEvent: "toggleSmoothing",
    defaultValue: true,
  },
  invertedZoom: {
    newUI: {
      tags: "图像标签",
      title: "反转缩放方向",
      description: "反转滚轮缩放的方向",
    },
    description: "启用反向缩放方向",
    onChangeEvent: "toggleInvertedZoom",
    defaultValue: false,
  },
};
