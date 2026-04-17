import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Space } from "../space/space";
import { Label } from "../label/label";
import { Dropdown } from "./dropdown";
import { DropdownTrigger } from "./dropdown-trigger";
import type { Align } from "@humansignal/core/lib/utils/dom";
import { IconUserEdit, IconSettings, IconCross, IconBell, IconChevronDown } from "@humansignal/icons";

const meta = {
  component: DropdownTrigger,
  title: "UI/Dropdown",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    animated: {
      control: "boolean",
      description: "Enable animation on open/close",
      defaultValue: true,
    },
    alignment: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Dropdown alignment relative to trigger",
    },
    enabled: {
      control: "boolean",
      description: "Enable/disable dropdown (when disabled, prevents opening)",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "Disable the dropdown trigger",
      defaultValue: false,
    },
    inline: {
      control: "boolean",
      description: "Render inline instead of using portal",
    },
    syncWidth: {
      control: "boolean",
      description: "Sync dropdown width to match trigger width",
    },
    constrainHeight: {
      control: "boolean",
      description: "Constrain dropdown height to prevent overflow",
    },
    closeOnClickOutside: {
      control: "boolean",
      description: "Close dropdown when clicking outside",
      defaultValue: true,
    },
    toggle: {
      control: "boolean",
      description: "If false, clicking trigger only opens dropdown (doesn't toggle)",
      defaultValue: true,
    },
  },
} satisfies Meta<typeof DropdownTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dropdown content using semantic tokens - styled like Select component
const MenuContent = ({ items = 3, fullWidth = false }: { items?: number; fullWidth?: boolean }) => (
  <div className={`p-tight flex flex-col gap-tightest ${fullWidth ? "w-full" : "w-max"}`}>
    {Array.from({ length: items }, (_, i) => (
      <button
        key={i}
        type="button"
        className={`w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle ${fullWidth ? "" : "whitespace-nowrap"}`}
        onClick={() => console.log(`Item ${i + 1} clicked`)}
      >
        菜单项 {i + 1}
      </button>
    ))}
  </div>
);

// Basic Examples
export const Default: Story = {
  args: {
    alignment: "bottom-left",
    animated: true,
    enabled: true,
    disabled: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>点击打开</Button>
    </Dropdown.Trigger>
  ),
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={
        <div className="w-80 p-base flex flex-col gap-base">
          <div>
            <h3 className="text-heading-small font-medium text-primary-foreground mb-tight">自定义下拉菜单</h3>
            <p className="text-body-small text-secondary-foreground">
              这是一个带有富文本和交互元素的自定义下拉菜单。
            </p>
          </div>
          <div className="flex flex-col gap-tight">
            <input
              type="text"
              placeholder="搜索..."
              className="w-full px-base py-tight border border-neutral-border rounded-base bg-primary-background text-primary-foreground"
            />
            <Button className="w-full">提交</Button>
          </div>
        </div>
      }
    >
      <Button>打开自定义下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// Alignment Examples
export const AllAlignments: Story = {
  render: (args) => {
    const alignmentShorthand: Record<string, string> = {
      "top-left": "↑←",
      "top-center": "↑↕",
      "top-right": "↑→",
      "bottom-left": "↓←",
      "bottom-center": "↓↕",
      "bottom-right": "↓→",
    };

    return (
      <div className="grid grid-cols-3 gap-loose">
        {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as Align[]).map(
          (alignment) => (
            <div key={alignment} className="flex justify-center">
              <Dropdown.Trigger {...args} alignment={alignment} content={<MenuContent />}>
                <Button>{alignmentShorthand[alignment]}</Button>
              </Dropdown.Trigger>
            </div>
          ),
        )}
      </div>
    );
  },
};

// Width and Height Constraints
export const SyncWidth: Story = {
  args: {
    syncWidth: true,
    alignment: "bottom-left",
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent fullWidth />}>
      <Button className="w-80">宽按钮 - 下拉宽度同步</Button>
    </Dropdown.Trigger>
  ),
};

export const ConstrainHeight: Story = {
  args: {
    constrainHeight: true,
    alignment: "bottom-left",
  },
  render: (args) => (
    <div className="h-[200px] flex items-center">
      <Dropdown.Trigger {...args} content={<MenuContent items={100} />}>
        <Button>限制高度（大量项目）</Button>
      </Dropdown.Trigger>
    </div>
  ),
};

// Animation Examples
export const WithAnimation: Story = {
  args: {
    animated: true,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>带动画下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

export const WithoutAnimation: Story = {
  args: {
    animated: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>无动画下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// State Examples
export const DisabledTrigger: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button disabled>禁用触发器</Button>
    </Dropdown.Trigger>
  ),
};

export const DisabledDropdown: Story = {
  args: {
    enabled: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>下拉已禁用（点击不打开）</Button>
    </Dropdown.Trigger>
  ),
};

export const ControlledVisibility: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <Space direction="vertical" size="base">
        <Space direction="horizontal" size="tight">
          <Button onClick={() => setVisible(true)}>打开下拉</Button>
          <Button onClick={() => setVisible(false)}>关闭下拉</Button>
          <Button onClick={() => setVisible(!visible)}>切换下拉</Button>
        </Space>
        <Dropdown.Trigger {...args} visible={visible} onToggle={setVisible} content={<MenuContent />}>
          <Button>受控下拉菜单</Button>
        </Dropdown.Trigger>
      </Space>
    );
  },
};

// Behavior Examples
export const OpenOnlyMode: Story = {
  args: {
    toggle: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>仅点击打开（不切换）</Button>
    </Dropdown.Trigger>
  ),
};

export const NoCloseOnClickOutside: Story = {
  args: {
    closeOnClickOutside: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>点击外部不关闭</Button>
    </Dropdown.Trigger>
  ),
};

// Nested Dropdowns
export const NestedDropdowns: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      alignment="bottom-left"
      content={
        <div className="p-tight flex flex-col gap-tightest w-max">
          <button
            type="button"
            className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
          >
            常规项
          </button>
          <Dropdown.Trigger
            style={{
              left: "calc(anchor(right) + 4px)",
              top: "anchor(top)",
              right: "auto",
              bottom: "auto",
            }}
            content={
              <div className="p-tight flex flex-col gap-tightest w-max">
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 1
                </button>
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 2
                </button>
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 3
                </button>
              </div>
            }
          >
            <button
              type="button"
              className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
            >
              嵌套下拉菜单 →
            </button>
          </Dropdown.Trigger>
          <button
            type="button"
            className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
          >
            其他项
          </button>
        </div>
      }
    >
      <Button>嵌套下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// Inline Rendering
export const InlineDropdown: Story = {
  args: {
    inline: true,
  },
  render: (args) => (
    <div className="relative border border-dashed border-neutral-border p-loose rounded-base">
      <p className="text-body-small text-secondary-foreground mb-base">
        该下拉菜单以内联方式渲染（不使用 portal），位于当前边框容器内。
      </p>
      <Dropdown.Trigger {...args} content={<MenuContent />}>
        <Button>内联下拉菜单</Button>
      </Dropdown.Trigger>
    </div>
  ),
};

// Advanced Use Cases
export const WithCustomTrigger: Story = {
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <div className="cursor-pointer bg-accent-background text-accent-foreground px-base py-tight rounded-base hover:bg-accent-surface-hover transition-colors">
        自定义触发元素
      </div>
    </Dropdown.Trigger>
  ),
};

export const WithCallbacks: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={<MenuContent />}
      onToggle={(visible) => console.log("onToggle:", visible)}
      onVisibilityChanged={(visible) => console.log("onVisibilityChanged:", visible)}
    >
      <Button>带回调的下拉菜单（查看控制台）</Button>
    </Dropdown.Trigger>
  ),
};

// Complex Content Example - User Profile Menu
export const UserProfileMenu: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={
        <div className="w-96 p-base flex flex-col gap-base">
          <div className="pb-base border-b border-neutral-border">
            <h3 className="text-heading-small font-medium text-primary-foreground">用户资料</h3>
          </div>
          <div className="flex items-center gap-base pb-base border-b border-neutral-border">
            <div className="w-12 h-12 bg-accent-background rounded-full flex items-center justify-center text-accent-foreground font-medium text-body-large">
              JD
            </div>
            <div className="flex flex-col gap-tightest">
              <div className="text-body-medium font-medium text-primary-foreground">张三</div>
              <div className="text-body-small text-secondary-foreground">john.doe@example.com</div>
            </div>
          </div>
          <div className="flex flex-col gap-tight">
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconUserEdit className="w-4 h-4" />
              查看资料
            </button>
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconSettings className="w-4 h-4" />
              设置
            </button>
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconBell className="w-4 h-4" />
              通知
            </button>
          </div>
          <div className="pt-base border-t border-neutral-border">
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-danger-foreground hover:bg-danger-surface hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-danger-surface"
            >
              <IconCross className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      }
    >
      <Button trailing={<IconChevronDown />}>用户菜单</Button>
    </Dropdown.Trigger>
  ),
};

// Multiple Dropdowns
export const MultipleDropdowns: Story = {
  render: (args) => (
    <Space direction="horizontal" size="base" wrap>
      <Dropdown.Trigger {...args} alignment="bottom-left" content={<MenuContent />}>
        <Button>下拉菜单 1</Button>
      </Dropdown.Trigger>
      <Dropdown.Trigger {...args} alignment="bottom-center" content={<MenuContent />}>
        <Button>下拉菜单 2</Button>
      </Dropdown.Trigger>
      <Dropdown.Trigger {...args} alignment="bottom-right" content={<MenuContent />}>
        <Button>下拉菜单 3</Button>
      </Dropdown.Trigger>
    </Space>
  ),
};

// With Labels
export const WithLabels: Story = {
  render: (args) => (
    <Space direction="vertical" size="small" style={{ gridGap: "var(--spacing-base)" }}>
      <Label>选择一个选项</Label>
      <Dropdown.Trigger {...args} content={<MenuContent items={5} />}>
        <Button>打开菜单</Button>
      </Dropdown.Trigger>
    </Space>
  ),
};
