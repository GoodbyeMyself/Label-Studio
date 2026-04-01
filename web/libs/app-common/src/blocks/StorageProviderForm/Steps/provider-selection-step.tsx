import { Label } from "@humansignal/ui";
import { useEffect } from "react";
import { ProviderGrid } from "../components";
import type { ProviderConfig } from "../types/provider";

interface ProviderSelectionStepProps {
  formData: {
    provider: string;
  };
  errors: {
    provider?: string;
  };
  handleSelectChange: (name: string, value: string) => void;
  setFormState: (updater: (prevState: any) => any) => void;
  storageTypesLoading?: boolean;
  target?: "import" | "export";
  providers: Record<string, ProviderConfig>;
}

export const ProviderSelectionStep = ({
  formData,
  errors,
  handleSelectChange,
  providers,
}: ProviderSelectionStepProps) => {
  useEffect(() => {
    if (!formData.provider && Object.entries(providers).length > 0) {
      const enabledProviders = Object.values(providers).filter((provider) => !provider.disabled);
      if (enabledProviders.length > 0) {
        handleSelectChange("provider", enabledProviders[0].name);
      }
    }
  }, [providers, formData.provider, handleSelectChange]);

  const selectedProvider = formData.provider ? providers[formData.provider] : null;
  const isSelectedProviderDisabled = selectedProvider?.disabled || false;

  const getMessageContent = () => {
    if (!selectedProvider?.fields) return null;

    const messageField = selectedProvider.fields.find((field) => field.type === "message");
    return messageField?.content || null;
  };

  const messageContent = getMessageContent();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">选择云存储提供商</h2>
        <p className="text-muted-foreground">选择用于存放数据的云存储服务</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label text="存储提供商" required />
          <ProviderGrid
            providers={providers}
            selectedProvider={formData.provider}
            onProviderSelect={(providerName) => handleSelectChange("provider", providerName)}
            error={errors.provider}
          />
        </div>

        {isSelectedProviderDisabled && messageContent && (
          <div>{typeof messageContent === "function" ? messageContent({}) : messageContent}</div>
        )}
      </div>
    </div>
  );
};
