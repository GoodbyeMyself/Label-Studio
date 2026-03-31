import { observer } from "mobx-react";
import { Button, Tooltip } from "@humansignal/ui";
import Utils from "../../utils";
import { cn } from "../../utils/bem";

import "./DraftPanel.prefix.css";

const panel = cn("draft-panel");

export const DraftPanel = observer(({ item }) => {
  if (!item.draftSaved && !item.versions.draft) return null;
  const saved = item.draft && item.draftSaved ? ` 已保存于 ${Utils.UDate.prettyDate(item.draftSaved)}` : "";

  if (!item.selected) {
    if (!item.draft) return null;
    return <div className={panel}>草稿{saved}</div>;
  }
  if (!item.versions.result || !item.versions.result.length) {
    return <div className={panel}>{saved ? `草稿${saved}` : "未提交的草稿"}</div>;
  }
  return (
    <div className={panel}>
      <Tooltip
        alignment="top-left"
        title={item.draftSelected ? "切换到原始结果" : "切换到当前草稿"}
      >
        <Button
          type="button"
          size="smaller"
          look="string"
          onClick={() => item.toggleDraft()}
          className={panel.elem("toggle").toClassName()}
          aria-label="切换草稿模式"
        >
          {item.draftSelected ? "草稿" : "原始结果"}
        </Button>
      </Tooltip>
      {saved}
    </div>
  );
});
