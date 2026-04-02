import type { TipsCollection } from "./types";

const APP_NAME = window?.APP_SETTINGS?.app_name || "Label Studio";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "你知道吗？",
      content: `使用 ${APP_NAME} 企业版将项目组织到工作区后，会更容易查找和管理项目。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
        params: {
          experiment: "project_creation_tip",
          treatment: "find_and_manage_projects",
        },
      },
    },
    {
      title: "更快分配访问权限",
      content:
        `在 ${APP_NAME} 企业版中通过工作区为成员分配多个项目，可以更高效地完成权限配置。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "在企业版平台中，管理员可以查看标注员绩效看板，以优化资源分配、提升团队管理效率并辅助绩效评估。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        `你可以使用 ${APP_NAME} 企业版控制内部成员和外部标注员对特定项目与工作区的访问权限。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "你可以使用或修改数十种模板来配置标注界面，也可以通过简单的类 XML 标签从零创建自定义配置。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
    {
      title: "生成式 AI 标注",
      content:
        `${APP_NAME} 提供了适用于监督式 LLM 微调、RAG 检索排序、RLHF、聊天机器人评测等场景的模板。`,
      closable: true,
      link: {
        label: "查看模板",
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: "你的团队似乎正在扩展！",
      content:
        `使用 ${APP_NAME} 企业版为团队成员分配角色，并在项目和工作区层级控制敏感数据访问权限。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing",
        },
      },
    },
    {
      title: "想让登录更简单、更安全？",
      content: `通过 ${APP_NAME} 企业版，使用 SAML、SCIM2 或 LDAP 为团队启用单点登录。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso",
        },
      },
    },
    {
      title: "你知道吗？",
      content: `试试 ${APP_NAME} Starter Cloud，专为小型团队和项目场景优化。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "organization_page_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "想自动分发任务？",
      content:
        "你可以创建规则，自动将任务分配给标注员，并且只向每位标注员显示分配给自己的任务，同时控制任务可见范围。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: "与社区分享经验",
      content:
        `如果你有问题，或想与其他 ${APP_NAME} 用户分享经验，欢迎加入社区 Slack 频道获取最新动态。`,
      closable: true,
      link: {
        label: "加入社区",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        `${APP_NAME} 支持与云存储、机器学习模型及多种常用工具集成，帮助你自动化机器学习流程。`,
      closable: true,
      link: {
        label: "查看集成目录",
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points",
        },
      },
    },
  ],
  projectSettings: [
    {
      title: `将你的 AWS 预算用于 ${APP_NAME} 企业版`,
      content:
        `${APP_NAME} 企业版现已上架 AWS Marketplace，你可以使用已承诺的 AWS 预算来简化数据标注工作流。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://aws.amazon.com/marketplace/pp/prodview-wjac3msf77tny",
        params: {
          experiment: "project_settings_tip",
          treatment: "aws_marketplace",
        },
      },
    },
    {
      title: "使用自动标注节省时间",
      content:
        "在企业版平台中使用自动化能力，可以快速处理大规模数据集，同时兼顾标注质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        `你可以使用 ${APP_NAME} 企业版的审核流程和任务一致性评分，进一步提升标注数据质量。`,
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: "评估生成式 AI 模型",
      content:
        "结合自动化能力与人工监督，在企业版平台中评估并保障 LLM 输出质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "使用企业版云服务，可以减少基础设施与升级维护成本，并获得更多自动化、质量管理和团队协作能力。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: "你知道吗？",
      content: `试试 ${APP_NAME} Starter Cloud，专为小型团队和项目场景优化。`,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_settings_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "你可以通过后端 SDK 连接机器学习模型，以便使用预标注或主动学习能力节省时间。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models",
        },
      },
    },
  ],
};
