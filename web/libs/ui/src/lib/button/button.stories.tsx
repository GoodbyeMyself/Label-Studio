import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup, buttonVariant } from "./button";
import { IconAnnotationGroundTruth, IconCrossAlt, IconChevronDown } from "@humansignal/icons";
import { Dropdown } from "../dropdown";
import { Space } from "../space/space";
import { Typography } from "../typography/typography";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "UI/Button",
  argTypes: {
    disabled: { control: "boolean" },
    waiting: { control: "boolean" },
    look: { control: "select" },
    size: { control: "select" },
    align: { control: "select" },
    leading: { control: false },
    trailing: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "默认按钮",
    className: "w-[200px]",
  },
};

export const WithDisabledState: Story = {
  args: {
    children: "禁用按钮",
    disabled: true,
  },
};

export const WithWaitingState: Story = {
  args: {
    children: "等待中按钮",
    waiting: true,
  },
};

export const WithAlignment: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Button {...props} className="w-48" leading={<IconAnnotationGroundTruth />}>
          默认
        </Button>
        <Button {...props} className="w-48" align="left" leading={<IconAnnotationGroundTruth />}>
          左对齐
        </Button>
        <Button {...props} className="w-48" align="center" leading={<IconAnnotationGroundTruth />}>
          居中
        </Button>
        <Button {...props} className="w-48" align="right" leading={<IconAnnotationGroundTruth />}>
          右对齐
        </Button>
      </div>
    );
  },
};

export const WithSize: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Button {...props} size="medium" className="w-48" leading={<IconAnnotationGroundTruth />}>
          中
        </Button>
        <Button {...props} size="small" className="w-48" leading={<IconAnnotationGroundTruth />}>
          小
        </Button>
        <Button {...props} size="smaller" className="w-48" leading={<IconAnnotationGroundTruth />}>
          更小
        </Button>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex gap-tight">
        <Button {...props} className="w-48" leading={<IconAnnotationGroundTruth />}>
          前置图标
        </Button>
        <Button {...props} className="w-48" trailing={<IconAnnotationGroundTruth />}>
          后置图标
        </Button>
        <Button
          {...props}
          className="w-48"
          leading={<IconAnnotationGroundTruth />}
          trailing={<IconAnnotationGroundTruth />}
        >
          双侧图标
        </Button>
      </div>
    );
  },
};

export const WideButton: Story = {
  args: {
    children: "宽按钮",
    align: "default",
  },
  render: ({ children, ...props }) => {
    return (
      <Button
        {...props}
        className="w-[250px]"
        leading={<IconAnnotationGroundTruth />}
        trailing={<IconAnnotationGroundTruth />}
      >
        {children}
      </Button>
    );
  },
};

export const WithComplexChildren: Story = {
  args: {
    children: "带有",
    align: "default",
  },
  render: ({ children, ...props }) => {
    return (
      <Button {...props} leading={<IconAnnotationGroundTruth />} trailing={<IconAnnotationGroundTruth />}>
        {children}
        <span className="max-h-6 px-tight rounded-4 bg-primary-surface-hover">徽标</span>
      </Button>
    );
  },
};

export const WithExtra: Story = {
  args: {
    children: "带有",
    align: "default",
  },
  render: ({ children, ...props }) => {
    return (
      <Button
        {...props}
        trailing={
          <>
            <span className="max-h-6 px-tight rounded-4 bg-primary-surface-hover">额外徽标</span>
            <IconAnnotationGroundTruth />
          </>
        }
      >
        {children}
      </Button>
    );
  },
};

export const IconButton: Story = {
  render: ({ children: _, ...props }) => {
    return (
      <div className="flex gap-4">
        <Button {...props}>
          <IconAnnotationGroundTruth />
        </Button>

        <Button {...props}>
          <IconCrossAlt />
        </Button>
      </div>
    );
  },
};

export const StyledLink: Story = {
  args: {
    children: "按钮样式链接",
  },
  render({ children, ...props }) {
    return (
      // biome-ignore lint: We don't need a real link here
      <a href="#" className={buttonVariant({ ...props })}>
        <span className="flex-1 px-tight">{children}</span>
      </a>
    );
  },
};

export const WithSecondaryAction: Story = {
  args: {
    children: "按钮样式链接",
  },
  render({ children, ...props }) {
    return (
      <Button
        {...props}
        waiting={props.waiting ?? true}
        waitingClickable
        onClick={() => alert("First action")}
        secondaryOnClick={() => alert("Second action")}
      >
        <span className="flex-1 px-tight">{children}</span>
      </Button>
    );
  },
};

export const WithTooltipAndDisabledState: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Button {...props} className="w-48" leading={<IconAnnotationGroundTruth />} disabled tooltip="提示文本">
          带提示
        </Button>
      </div>
    );
  },
};

export const WithButtonGroup: Story = {
  render: (props) => {
    return (
      <div className="flex flex-col gap-wider">
        <div>
          <Typography variant="title" size="large" className="mb-tight">
            Button Group - Collapsed (default)
          </Typography>
          <Typography variant="body" size="medium" className="text-secondary mb-comfortable">
            Buttons are visually connected with shared borders
          </Typography>
          <ButtonGroup>
            <Button {...props} size="small" variant="primary" look="filled">
              标注全部任务
            </Button>
            <Dropdown.Trigger
              alignment="bottom-right"
              content={
                <Space direction="vertical" className="bg-neutral-background p-tight rounded">
                  <Button align="left" look="string" size="small">
                    标注当前显示任务
                  </Button>
                  <Button align="left" look="string" size="small">
                    跳过全部任务
                  </Button>
                </Space>
              }
            >
              <Button size="small" variant="primary" look="filled" aria-label="切换标注选项">
                <IconChevronDown />
              </Button>
            </Dropdown.Trigger>
          </ButtonGroup>
        </div>

        <div>
          <Typography variant="title" size="large" className="mb-tight">
            Button Group - Not Collapsed
          </Typography>
          <Typography variant="body" size="medium" className="text-secondary mb-comfortable">
            Buttons maintain their individual styling with spacing between them
          </Typography>
          <ButtonGroup collapsed={false}>
            <Button {...props} size="small" variant="primary" look="outlined">
              保存
            </Button>
            <Button {...props} size="small" variant="neutral" look="outlined">
              取消
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Typography variant="title" size="large" className="mb-tight">
            Multiple Button Group Examples
          </Typography>
          <Typography variant="body" size="medium" className="text-secondary mb-comfortable">
            Various combinations of button groups
          </Typography>
          <div className="flex flex-wrap gap-comfortable">
            <ButtonGroup>
              <Button {...props} size="small" variant="neutral" look="outlined">
                上一页
              </Button>
              <Button {...props} size="small" variant="neutral" look="outlined">
                1
              </Button>
              <Button {...props} size="small" variant="neutral" look="outlined">
                2
              </Button>
              <Button {...props} size="small" variant="neutral" look="outlined">
                3
              </Button>
              <Button {...props} size="small" variant="neutral" look="outlined">
                下一页
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button {...props} size="small" variant="neutral" look="outlined" leading={<IconAnnotationGroundTruth />}>
                编辑
              </Button>
              <Button {...props} size="small" variant="neutral" look="outlined" leading={<IconCrossAlt />}>
                删除
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  },
};
