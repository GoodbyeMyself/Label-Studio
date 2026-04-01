import { EnterpriseBadge, IconSpark } from "@humansignal/ui";
import { Alert, AlertTitle, AlertDescription } from "@humansignal/shad/components/ui/alert";
import { IconCloudProviderGCS } from "@humansignal/icons";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";

const gcsWifProvider: ProviderConfig = {
  name: "gcswif",
  title: "Google Cloud Storage\n（WIF 认证）",
  description: "使用 Workload Identity Federation 身份认证配置 Google Cloud Storage 连接（仅代理模式）",
  icon: IconCloudProviderGCS,
  disabled: true,
  badge: <EnterpriseBadge />,
  fields: [
    {
      name: "enterprise_info",
      type: "message",
      content: (
        <Alert variant="gradient">
          <IconSpark />
          <AlertTitle>企业版功能</AlertTitle>
          <AlertDescription>
            支持 Workload Identity Federation 的 Google Cloud Storage 仅在 Label Studio Enterprise 中可用。{" "}
            <a
              href="https://docs.humansignal.com/guide/storage.html#Google-Cloud-Storage-with-Workload-Identity-Federation-WIF"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              了解更多
            </a>
          </AlertDescription>
        </Alert>
      ),
    },
  ],
  layout: [{ fields: ["enterprise_info"] }],
};

export default gcsWifProvider;
