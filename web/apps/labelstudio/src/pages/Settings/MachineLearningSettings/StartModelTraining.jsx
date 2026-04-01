import { useCallback, useState } from "react";
import { Button } from "@humansignal/ui";
import { useAPI } from "../../../providers/ApiProvider";
import { Typography } from "@humansignal/ui";

export const StartModelTraining = ({ backend }) => {
  const api = useAPI();
  const [response, setResponse] = useState(null);

  const onStartTraining = useCallback(
    async (backend) => {
      const res = await api.callApi("trainMLBackend", {
        params: {
          pk: backend.id,
        },
      });

      setResponse(res.response || {});
    },
    [api],
  );

  return (
    <div className="max-w-[680px]">
      <Typography size="small" className="text-neutral-content-subtler">
        你即将手动触发模型训练流程。此操作会根据机器学习后端中 `train` 方法的实现启动训练阶段。
      </Typography>
      <Typography size="small" className="text-neutral-content-subtler mt-base mb-wide">
        注意：当前界面暂不提供内置训练进度追踪。你需要通过模型自身的工具和运行环境来监控训练过程。
      </Typography>

      {!response && (
        <Button
          onClick={() => {
            onStartTraining(backend);
          }}
        >
          开始训练
        </Button>
      )}

      {!!response && (
        <>
          <pre>请求已发送！</pre>
          <pre>响应：{JSON.stringify(response, null, 2)}</pre>
        </>
      )}
    </div>
  );
};
