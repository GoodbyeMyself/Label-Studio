import { z } from "zod";
import type { FieldDefinition } from "./types/common";
import { getProviderConfig } from "./providers";
import { assembleSchema } from "./types/provider";

export const step1Schema = z.object({
  provider: z.string().min(1, "请选择一个存储提供商"),
});

export const getProviderSchema = (provider: string, isEditMode = false, target?: "import" | "export") => {
  const providerConfig = getProviderConfig(provider);
  if (!providerConfig) {
    return z.object({});
  }

  const commonFields: FieldDefinition[] = [
    {
      name: "title",
      type: "text",
      label: "存储标题",
      required: true,
      schema: z.string().min(1, "存储标题不能为空"),
    },
  ];

  const exportFields: FieldDefinition[] =
    target === "export"
      ? [
          {
            name: "can_delete_objects",
            type: "toggle",
            label: "允许从存储中删除对象",
            description: "如果未勾选，则不会从存储中删除标注结果",
            schema: z.boolean().default(false),
          },
        ]
      : [];

  const providerFields = providerConfig.fields.filter(
    (field): field is FieldDefinition => "type" in field && field.type !== "message",
  );

  const filteredProviderFields = target
    ? providerFields.filter((field) => !field.target || field.target === target)
    : providerFields;

  const allFields = [...commonFields, ...exportFields, ...filteredProviderFields];
  return assembleSchema(allFields, isEditMode);
};

export const formatValidationErrors = (zodError: z.ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};

  zodError.issues.forEach((issue) => {
    const fieldName = issue.path.join(".");
    if (fieldName) {
      errors[fieldName] = issue.message;
    }
  });

  return errors;
};
