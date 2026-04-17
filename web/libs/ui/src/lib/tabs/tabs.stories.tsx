import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "UI/Tabs",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "flat"],
      description: "Visual variant of the tabs",
    },
    defaultValue: {
      control: "text",
      description: "Default active tab",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Default variant with pill-style tabs in a bordered container.
 * This variant features rounded corners, background colors, and a distinct active state.
 */
export const Default: Story = {
  args: {
    variant: "default",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">账户</TabsTrigger>
        <TabsTrigger value="tab2">密码</TabsTrigger>
        <TabsTrigger value="tab3">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">账户设置</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            管理账户设置并配置邮件偏好。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">密码</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            在这里修改密码。保存后你将退出登录。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">设置</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            配置应用偏好和通知设置。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Flat variant with underline indicator for active tabs.
 * This variant features a minimalist design with no background container,
 * perfect for navigation-style tabs.
 */
export const Flat: Story = {
  args: {
    variant: "flat",
    defaultValue: "existing",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="existing">添加现有成员</TabsTrigger>
        <TabsTrigger value="invite">邀请成员</TabsTrigger>
      </TabsList>
      <TabsContent value="existing">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">添加现有成员</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            从组织中选择成员并添加到该项目。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="invite">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">邀请成员</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            发送邮件邀请新成员加入该项目。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Example with custom className overrides to demonstrate styling flexibility
 */
export const CustomStyling: Story = {
  args: {
    variant: "flat",
    defaultValue: "custom1",
  },
  render: (args) => (
    <div className="max-w-3xl p-widest bg-neutral-surface rounded-smaller">
      <Tabs {...args}>
        <TabsList className="border-b-4 border-neutral-300 gap-widest">
          <TabsTrigger
            value="custom1"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            仪表盘
          </TabsTrigger>
          <TabsTrigger
            value="custom2"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            分析
          </TabsTrigger>
          <TabsTrigger
            value="custom3"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            报表
          </TabsTrigger>
        </TabsList>
        <TabsContent value="custom1" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">仪表盘概览</h3>
          <p className="text-body-large text-neutral-content">
            该示例展示如何通过颜色、边框、间距和字体来自定义标签页样式。
          </p>
        </TabsContent>
        <TabsContent value="custom2" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">分析数据</h3>
          <p className="text-body-large text-neutral-content">
            自定义绿色主题、加粗字体和更大间距，展示组件的灵活性。
          </p>
        </TabsContent>
        <TabsContent value="custom3" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">详细报表</h3>
          <p className="text-body-large text-neutral-content">
            你可以覆盖标签页的任意样式，以满足具体设计需求。
          </p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
