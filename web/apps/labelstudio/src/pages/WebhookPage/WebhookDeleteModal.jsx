import { Button } from "@humansignal/ui";
import { modal } from "../../components/Modal/Modal";
import { useModalControls } from "../../components/Modal/ModalPopup";
import { Space } from "../../components/Space/Space";
import { cn } from "../../utils/bem";

export const WebhookDeleteModal = ({ onDelete }) => {
  return modal({
    title: "删除 Webhook 配置",
    body: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <div className={rootClass}>
          <div className={rootClass.elem("modal-text").toClassName()}>
            确定要删除此 Webhook 配置吗？该操作无法撤销。
          </div>
        </div>
      );
    },
    footer: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <Space align="end">
          <Button
            look="outlined"
            onClick={() => {
              ctrl.hide();
            }}
            aria-label="取消删除 Webhook 配置"
          >
            取消
          </Button>
          <Button
            variant="negative"
            onClick={async () => {
              await onDelete();
              ctrl.hide();
            }}
            aria-label="确认删除 Webhook 配置"
          >
            删除配置
          </Button>
        </Space>
      );
    },
    style: { width: 512 },
  });
};
