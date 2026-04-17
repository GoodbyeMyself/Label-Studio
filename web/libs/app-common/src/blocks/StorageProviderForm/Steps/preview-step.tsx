import { Label, Toggle, Select, Tooltip, cn } from "@humansignal/ui";
import { Form, Input } from "apps/labelstudio/src/components/Form";
import { IconDocument, IconSearch } from "@humansignal/icons";
import { formatDistanceToNow } from "date-fns";
import type { ForwardedRef } from "react";

interface PreviewStepProps {
  formData: any;
  formState: any;
  setFormState: (updater: (prevState: any) => any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  action: string;
  target: string;
  type: string;
  project: string;
  storage?: any;
  onSubmit: () => void;
  formRef: ForwardedRef<unknown>;
  filesPreview: any[] | null;
  formatSize: (bytes: number) => string;
  onImportSettingsChange?: () => void;
}

const regexFilters = [
  { title: "图片", regex: ".*.(jpe?g|png|gif)$", blob: true },
  { title: "视频", regex: ".*\\.(mp4|avi|mov|wmv|webm)$", blob: true },
  { title: "音频", regex: ".*\\.(mp3|wav|ogg|flac)$", blob: true },
  { title: "表格数据", regex: ".*\\.(csv|tsv)$", blob: true },
  { title: "JSON", regex: ".*\\.json$", blob: false },
  { title: "JSONL", regex: ".*\\.jsonl$", blob: false },
  { title: "Parquet", regex: ".*\\.parquet$", blob: false },
  { title: "全部任务文件", regex: ".*\\.(json|jsonl|parquet)$", blob: false },
] as const;

export const PreviewStep = ({
  formData,
  formState,
  setFormState,
  handleChange,
  action,
  target,
  type,
  project,
  storage,
  onSubmit,
  formRef,
  filesPreview,
  formatSize,
  onImportSettingsChange,
}: PreviewStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">配置导入设置并预览数据</h2>
        <p className="text-muted-foreground">设置文件筛选条件，并预览即将同步的数据</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h4>导入配置</h4>
        <div className="flex justify-between items-center">
          <h4>文件预览</h4>
        </div>

        <div>
          <Form
            ref={formRef}
            action={action}
            params={{ target, type, project, pk: storage?.id }}
            formData={formData}
            skipEmpty={false}
            onSubmit={onSubmit}
            autoFill="off"
            autoComplete="off"
          >
            <div className="space-y-8">
              {type !== "localfiles" && (
                <div className="space-y-2">
                  <Label text={`${type === "redis" ? "文件路径" : "存储桶前缀"}（可选）`} />
                  <p className="text-sm text-muted-foreground">
                    {type === "redis" ? "指定存储中放置文件的文件夹路径" : "指定存储桶中放置文件的文件夹路径"}
                  </p>
                  <Input
                    id={type === "redis" ? "path" : "prefix"}
                    name={type === "redis" ? "path" : "prefix"}
                    value={type === "redis" ? (formData.path ?? "") : (formData.prefix ?? "")}
                    onChange={(e) => {
                      handleChange(e);
                      onImportSettingsChange?.();
                    }}
                    placeholder="路径示例：path/to/files/，留空则表示根目录"
                    style={{ width: "100%" }}
                    required={false}
                    skip={false}
                    labelProps={{}}
                    ghost={false}
                    tooltipIcon={null}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label text="导入方式（可选）" />
                <p className="text-sm text-muted-foreground">选择如何解析存储中的数据</p>
                <Select
                  name="use_blob_urls"
                  value={formData.use_blob_urls ? "Files" : "Tasks"}
                  onChange={(value) => {
                    const isFiles = value === "文件";
                    setFormState((prevState) => ({
                      ...prevState,
                      formData: {
                        ...prevState.formData,
                        use_blob_urls: isFiles,
                        regex_filter: "",
                      },
                    }));
                    onImportSettingsChange?.();
                  }}
                  options={
                    [
                      {
                        value: "文件",
                        label: "文件：为每个存储对象自动创建一个任务（例如 JPG、MP3、TXT）",
                      },
                      {
                        value: "任务",
                        label: "任务：将每个 JSON、JSONL 或 Parquet 文件视为一个或多个任务定义",
                      },
                    ] as any
                  }
                  placeholder="选择导入方式"
                />
              </div>

              <div className="space-y-2">
                <Label text="文件名筛选（可选）" />
                <p className="text-sm text-muted-foreground">使用正则表达式筛选要导入的文件</p>
                <Input
                  id="regex_filter"
                  name="regex_filter"
                  value={formData.regex_filter ?? ""}
                  onChange={(e) => {
                    handleChange(e);
                    onImportSettingsChange?.();
                  }}
                  placeholder={
                    formData.use_blob_urls
                      ? ".*\\.(jpg|png)$ - 仅导入 JPG、PNG 文件"
                      : ".*\\.(json|jsonl|parquet)$ - 导入任务定义文件"
                  }
                  style={{ width: "100%" }}
                  label=""
                  description=""
                  footer=""
                  className=""
                  validate=""
                  required={false}
                  skip={false}
                  labelProps={{}}
                  ghost={false}
                  tooltip=""
                  tooltipIcon={null}
                />

                <div className="flex flex-wrap gap-x-2 items-center text-xs">
                  <span className="text-muted-foreground">常用筛选：</span>
                  {regexFilters
                    .filter((r) => r.blob === formData.use_blob_urls)
                    .map((r) => (
                      <button
                        key={r.regex}
                        type="button"
                        className="text-blue-600 border-b border-dotted border-blue-400 hover:text-blue-800"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormState((prevState) => ({
                            ...prevState,
                            formData: {
                              ...prevState.formData,
                              regex_filter: r.regex,
                            },
                          }));
                          onImportSettingsChange?.();
                        }}
                      >
                        {r.title}
                      </button>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label text="扫描所有子文件夹" className="block mb-2" />
                  <p className="text-sm text-muted-foreground">包含所有嵌套文件夹中的文件</p>
                </div>
                <Toggle
                  checked={formData.recursive_scan ?? false}
                  onChange={(e) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      formData: {
                        ...prevState.formData,
                        recursive_scan: e.target.checked,
                      },
                    }));
                    onImportSettingsChange?.();
                  }}
                />
              </div>
            </div>
          </Form>
        </div>

        <div className="border rounded-md overflow-hidden h-[340px]">
          <div className="bg-card h-full flex flex-col">
            {filesPreview === null ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center flex-grow">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <IconDocument className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">暂无可用预览</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  配置导入设置后，点击“加载预览”即可查看将要导入的文件样例。
                </p>
              </div>
            ) : filesPreview.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center flex-grow">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <IconSearch className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">未找到文件</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  未找到符合当前条件的文件。请调整筛选设置后重新加载预览。
                </p>
              </div>
            ) : (
              <div className="px-2 py-2 flex-grow overflow-auto">
                <div className="grid grid-cols-1 text-xs gap-1">
                  {filesPreview.map((file, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex justify-between py-0.5 px-2 bg-neutral-surface border-b last:border-b-0 rounded-small",
                        {
                          "hover:bg-neutral-surface-hover": file.key !== null,
                        },
                      )}
                    >
                      <Tooltip title={file.key || "..."} disabled={file.key === null}>
                        <div
                          className={cn("max-w-[260px] overflow-hidden", {
                            "cursor-help": file.key !== null,
                          })}
                        >
                          {file.key ? (
                            file.key.length > 28 ? (
                              <span>
                                {file.key.slice(0, 12)}...{file.key.slice(-13)}
                              </span>
                            ) : (
                              file.key
                            )
                          ) : (
                            <span className="italic">... 已达到预览上限 ...</span>
                          )}
                        </div>
                      </Tooltip>
                      <div className="flex items-center space-x-1 text-muted-foreground whitespace-nowrap">
                        <span>
                          {file.last_modified && formatDistanceToNow(new Date(file.last_modified), { addSuffix: true })}
                        </span>
                        <span className="mx-0.5">•</span>
                        <span>{file.size && formatSize(file.size)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
