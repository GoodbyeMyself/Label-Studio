import { format } from "date-fns/esm";
import { Button, CodeBlock, IconFileCopy, Space, Tooltip } from "@humansignal/ui";
import { DescriptionList } from "../../../components/DescriptionList/DescriptionList";
import { modal } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { getLastTraceback } from "../../../utils/helpers";
import { useCopyText } from "@humansignal/core";

const CopyButton = ({ msg }) => {
  const [copyText, copied] = useCopyText({ defaultText: msg });

  return (
    <Button variant="neutral" icon={<IconFileCopy />} onClick={() => copyText()} disabled={copied} className="w-[7rem]">
      {copied ? "已复制" : "复制"}
    </Button>
  );
};

const STATUS_LABELS = {
  Initialized: "已初始化",
  Queued: "排队中",
  "In progress": "进行中",
  Failed: "失败",
  "Completed with errors": "完成但有错误",
  Completed: "已完成",
};

export const StorageSummary = ({ target, storage, className, storageTypes = [] }) => {
  const rawStatus = storage.status.replace(/_/g, " ").replace(/(^\w)/, (match) => match.toUpperCase());
  const storageStatus = STATUS_LABELS[rawStatus] ?? rawStatus;
  const lastSyncCount = storage.last_sync_count ? storage.last_sync_count : 0;

  const tasksExisted =
    typeof storage.meta?.tasks_existed !== "undefined" && storage.meta?.tasks_existed !== null
      ? storage.meta.tasks_existed
      : 0;
  const totalAnnotations =
    typeof storage.meta?.total_annotations !== "undefined" && storage.meta?.total_annotations !== null
      ? storage.meta.total_annotations
      : 0;

  const tasksAddedHelp = `上次同步期间新增了 ${lastSyncCount} 个任务。`;
  const tasksTotalHelp = [
    `已发现并同步过的 ${tasksExisted} 个任务不会再次添加到项目中。`,
    `该存储累计已添加 ${tasksExisted + lastSyncCount} 个任务。`,
  ].join("\n");
  const annotationsHelp = `上次同步期间成功保存了 ${lastSyncCount} 条标注。`;
  const totalAnnotationsHelp =
    typeof storage.meta?.total_annotations !== "undefined"
      ? `同步时刻项目中共检测到 ${storage.meta.total_annotations} 条标注。`
      : "";

  const handleButtonClick = () => {
    const msg =
      `${target === "export" ? "导出" : "导入"}存储错误日志\n` +
      `存储类型：${storage.type}\n` +
      `存储 ID：${storage.id}\n` +
      `项目 ID：${storage.project}\n` +
      `任务 ID：${storage.last_sync_job}\n\n` +
      `${getLastTraceback(storage.traceback)}\n\n` +
      `meta = ${JSON.stringify(storage.meta)}\n`;

    const currentModal = modal({
      title: "存储同步错误日志",
      body: <CodeBlock code={msg} variant="negative" className="max-h-[50vh] overflow-y-auto" />,
      footer: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {!window.APP_SETTINGS?.whitelabel_is_active && (
            <div>
              <>
                <a
                  href="https://labelstud.io/guide/storage.html#Troubleshooting"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="了解云存储故障排查（将在新窗口打开）"
                >
                  查看文档
                </a>{" "}
                获取云存储连接的故障排查建议。
              </>
            </div>
          )}
          <Space>
            <CopyButton msg={msg} />
            <Button variant="primary" className="w-[7rem]" onClick={() => currentModal.close()}>
              关闭
            </Button>
          </Space>
        </div>
      ),
      style: { width: "700px" },
      optimize: false,
      allowClose: true,
    });
  };

  return (
    <div className={className}>
      <DescriptionList>
        <DescriptionList.Item term="类型">
          {(storageTypes ?? []).find((s) => s.name === storage.type)?.title ?? storage.type}
        </DescriptionList.Item>

        <Oneof value={storage.type}>
          <SummaryS3 case={["s3", "s3s"]} storage={storage} />
          <GSCStorage case="gcs" storage={storage} />
          <AzureStorage case="azure" storage={storage} />
          <RedisStorage case="redis" storage={storage} />
          <LocalStorage case="localfiles" storage={storage} />
        </Oneof>

        <DescriptionList.Item
          term="状态"
          help={[
            "已初始化：已添加存储，但从未同步；足以开始解析 URI 链接。",
            "排队中：同步任务已进入队列，但尚未开始。",
            "进行中：同步任务正在运行。",
            "失败：同步任务已停止，并发生了一些错误。",
            "完成但有错误：同步任务已完成，但部分任务存在校验错误。",
            "已完成：同步任务已成功完成。",
          ].join("\n")}
        >
          {rawStatus === "Failed" || rawStatus === "Completed with errors" ? (
            <span
              className="cursor-pointer border-b border-dashed border-negative-border-subtle text-negative-content"
              onClick={handleButtonClick}
            >
              {storageStatus}（查看日志）
            </span>
          ) : (
            storageStatus
          )}
        </DescriptionList.Item>

        {target === "export" ? (
          <DescriptionList.Item term="标注" help={`${annotationsHelp}\n${totalAnnotationsHelp}`}>
            <Tooltip title={annotationsHelp}>
              <span>{lastSyncCount}</span>
            </Tooltip>
            <Tooltip title={totalAnnotationsHelp}>
              <span>（共 {totalAnnotations} 条）</span>
            </Tooltip>
          </DescriptionList.Item>
        ) : (
          <DescriptionList.Item term="任务" help={`${tasksAddedHelp}\n${tasksTotalHelp}`}>
            <Tooltip title={`${tasksAddedHelp}\n${tasksTotalHelp}`} style={{ whiteSpace: "pre-wrap" }}>
              <span>{lastSyncCount + tasksExisted}</span>
            </Tooltip>
            <Tooltip title={tasksAddedHelp}>
              <span>（新增 {lastSyncCount} 个）</span>
            </Tooltip>
          </DescriptionList.Item>
        )}

        <DescriptionList.Item term="最近同步">
          {storage.last_sync ? format(new Date(storage.last_sync), "yyyy-MM-dd HH:mm:ss") : "尚未同步"}
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  );
};

const SummaryS3 = ({ storage }) => {
  return <DescriptionList.Item term="存储桶">{storage.bucket}</DescriptionList.Item>;
};

const GSCStorage = ({ storage }) => {
  return <DescriptionList.Item term="存储桶">{storage.bucket}</DescriptionList.Item>;
};

const AzureStorage = ({ storage }) => {
  return <DescriptionList.Item term="容器">{storage.container}</DescriptionList.Item>;
};

const RedisStorage = ({ storage }) => {
  return (
    <>
      <DescriptionList.Item term="路径">{storage.path}</DescriptionList.Item>
      <DescriptionList.Item term="主机">
        {storage.host}
        {storage.port ? `:${storage.port}` : ""}
      </DescriptionList.Item>
    </>
  );
};

const LocalStorage = ({ storage }) => {
  return <DescriptionList.Item term="路径">{storage.path}</DescriptionList.Item>;
};
