import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "../button/button";
import {
  IconUpload,
  IconSearch,
  IconInbox,
  IconLsLabeling,
  IconLsReview,
  IconCheck,
  IconCloudProviderS3,
  IconCloudProviderGCS,
  IconCloudProviderAzure,
  IconCloudProviderRedis,
  IconExternal,
  IconRelationLink,
} from "@humansignal/icons";
import { Typography } from "../typography/typography";
import { Tooltip } from "../Tooltip/Tooltip";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: "UI/Empty State",
  parameters: {
    docs: {
      description: {
        component:
          "A reusable empty state component for displaying various empty states throughout the application with support for different sizes and customizable content.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "Size of the empty state",
    },
    variant: {
      control: "select",
      options: ["primary", "neutral", "negative", "positive", "warning", "gradient"],
      description: "Color variant of the empty state",
    },
    icon: {
      control: false,
      description: "Icon element to display",
    },

    title: {
      control: "text",
      description: "Main title text",
    },
    description: {
      control: "text",
      description: "Description text below the title",
    },
    actions: {
      control: false,
      description: "Action buttons or other interactive elements",
    },
    additionalContent: {
      control: false,
      description: "Additional content to display between description and actions",
    },
    footer: {
      control: false,
      description: "Footer content displayed at the bottom",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic Stories
export const Default: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: "Add your first items",
    description: "Start building your collection by adding new items",
    footer: (
      <Typography variant="label" size="small" className="text-primary-link">
        <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
          Learn more
          <IconExternal width={16} height={16} />
        </a>
      </Typography>
    ),
  },
};

export const WithSingleAction: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: "Upload your data",
    description: "Choose a file from your computer to get started",
    actions: (
      <Button variant="primary" look="filled">
        Upload File
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: "Import data to get started",
    description: "Connect your cloud storage or upload files from your computer",
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          Connect Cloud Storage
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          Upload Files
        </Button>
      </>
    ),
  },
};

// Size Comparison Stories
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size (Data Manager Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-96">
          <EmptyState
            size="large"
            variant="primary"
            icon={<IconUpload />}
            title="Import data to get your project started"
            description="Connect your cloud storage or upload files from your computer"
            actions={
              <>
                <Button variant="primary" look="filled" className="flex-1">
                  Connect Cloud Storage
                </Button>
                <Button variant="primary" look="outlined" className="flex-1">
                  Import
                </Button>
              </>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Home Page Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-64">
          <EmptyState
            size="medium"
            variant="primary"
            icon={<IconUpload />}
            title="Create your first project"
            description="Import your data and set up the labeling interface to start annotating"
            actions={
              <Button variant="primary" look="filled">
                Create Project
              </Button>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size (Sidepanel Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-48">
          <EmptyState
            size="small"
            variant="primary"
            icon={<IconLsLabeling />}
            title="Labeled regions will appear here"
            description="Start labeling and track your results using this panel"
            footer={
              <Typography variant="label" size="small" className="text-primary-link">
                <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
                  Learn more
                  <IconExternal width={16} height={16} />
                </a>
              </Typography>
            }
          />
        </div>
      </div>
    </div>
  ),
};

// Color Variant Stories
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="primary"
          icon={<IconUpload />}
          title="Primary Variant"
          description="Default blue theme for standard empty states"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="neutral"
          icon={<IconInbox />}
          title="Neutral Variant"
          description="Gray theme for neutral states"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="negative"
          icon={<IconSearch />}
          title="Negative Variant"
          description="Red theme for error states and failures"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="positive"
          icon={<IconCheck />}
          title="Positive Variant"
          description="Green theme for success states"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="warning"
          icon={<IconSearch />}
          title="Warning Variant"
          description="Orange/Yellow theme for warning states"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="gradient"
          icon={<IconLsLabeling />}
          title="Gradient Variant"
          description="AI gradient theme with special effects and pulsating animation"
        />
      </div>
    </div>
  ),
};

// Data Manager Inspired Stories
export const DataManagerImport: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: "导入数据以开始你的项目",
    description: "连接云存储或从本地上传文件",
    additionalContent: (
      <div className="flex items-center justify-center gap-base">
        <Tooltip title="Amazon S3 存储">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderS3 width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Google Cloud Storage 存储">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderGCS width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Azure Blob Storage 存储">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderAzure width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Redis 存储">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderRedis width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          连接云存储
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          导入
        </Button>
      </>
    ),
    footer: (
      <Typography variant="label" size="small" className="text-primary-link hover:underline">
        <a href="/docs/import-data" className="inline-flex items-center gap-1">
          查看数据导入文档
          <IconExternal width={20} height={20} />
        </a>
      </Typography>
    ),
  },
};

export const AnnotatorLabelingState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsLabeling />,
    title: "开始标注任务",
    description: "开始标注后可在此追踪进度",
    actions: (
      <Button variant="primary" look="filled">
        标注全部任务
      </Button>
    ),
  },
};

export const ReviewerEmptyState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsReview />,
    title: "开始审核任务",
    description: "将任务导入该项目后即可开始审核",
  },
};

export const NoResultsFound: Story = {
  args: {
    size: "medium",
    variant: "warning",
    icon: <IconSearch />,
    title: "优化你的搜索条件",
    description: "调整或清空筛选条件以查看更多结果",
    actions: (
      <Button variant="primary" look="outlined">
        清空筛选
      </Button>
    ),
  },
};

export const AssignedTasksEmpty: Story = {
  args: {
    size: "medium",
    variant: "neutral",
    icon: <IconInbox />,
    title: "等待任务分配",
    description: "任务分配给你后请回到这里查看",
  },
};

export const LabelingQueueComplete: Story = {
  args: {
    size: "medium",
    variant: "positive",
    icon: <IconCheck />,
    title: "你已全部处理完毕！",
    description: "队列中的任务已全部完成",
    actions: (
      <Button variant="primary" look="outlined">
        返回上一任务
      </Button>
    ),
  },
};

// Complex Content Example
export const ComplexContent: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: "上传你的文件",
    description: "可选择多种上传方式和格式开始使用",
    additionalContent: (
      <div className="text-center">
        <Typography variant="label" size="small" className="text-neutral-content-subtler mb-2">
          支持格式：CSV、JSON、TSV、TXT
        </Typography>
        <div className="flex justify-center items-center gap-2 text-neutral-content-subtler">
          <div className="w-2 h-2 bg-positive-icon rounded-full" />
          <Typography variant="label" size="smallest">
            支持拖拽上传
          </Typography>
        </div>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          浏览文件
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          连接存储
        </Button>
        <Button variant="neutral" look="outlined">
          通过 URL 导入
        </Button>
      </>
    ),
    footer: (
      <div className="text-center space-y-1">
        <Typography variant="label" size="small" className="text-primary-link">
          <a href="/docs/import-guide" className="hover:underline">
            需要帮助？查看导入指南
          </a>
        </Typography>
        <Typography variant="label" size="smallest" className="text-neutral-content-subtler">
          最大文件大小：每个文件 100MB
        </Typography>
      </div>
    ),
  },
};

// Accessibility Example
export const WithAccessibility: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: "创建你的集合",
    description: "添加条目以创建你的第一个集合",
    titleId: "accessible-empty-title",
    descriptionId: "accessible-empty-desc",
    "aria-label": "添加条目以创建集合",
    "data-testid": "accessible-empty-state",
    actions: (
      <Button variant="primary" look="filled">
        添加第一个条目
      </Button>
    ),
  },
};

// Relations Panel Example
export const RelationsPanel: Story = {
  args: {
    size: "small",
    variant: "primary",
    icon: <IconRelationLink />,
    title: "在标签之间创建关系",
    description: "添加关系以建立标注区域之间的连接",
    actions: (
      <Button variant="primary" look="outlined" size="small">
        添加关系
      </Button>
    ),
  },
};
