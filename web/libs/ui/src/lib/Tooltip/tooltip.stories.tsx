import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "UI/Tooltip",
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="这是一个提示示例">
          <Button>悬停查看提示</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithLongText: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="这是一个非常非常长的提示文案，用于测试超长文本显示效果。">
          <Button>悬停查看提示</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithLongTextString: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="这是一个无空格超长提示文案用于测试超长连续文本显示效果。">
          <Button>悬停查看提示</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip
          {...props}
          title={
            <div>
              <button type="button" onClick={() => alert("hello there")}>
                点我
              </button>
            </div>
          }
          interactive
        >
          <Button>悬停查看提示</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithDisabledButton: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="该按钮已禁用，因此无法点击">
          <Button disabled>悬停查看提示</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithDisabledInput: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="该输入框已禁用，因此无法编辑">
          <input type="text" disabled className="border p-2" aria-label="禁用输入框示例" />
        </Tooltip>
      </div>
    );
  },
};
