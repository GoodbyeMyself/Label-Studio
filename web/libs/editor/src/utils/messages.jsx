import { htmlEscape } from "./html";

const URL_CORS_DOCS = "https://labelstud.io/guide/storage.html#Troubleshoot-CORS-and-access-problems";
const URL_TAGS_DOCS = "https://labelstud.io/tags";

export default {
  DONE: "完成！",
  NO_COMP_LEFT: "没有更多标注了",
  NO_NEXT_TASK: "当前队列已处理完成！",
  NO_ACCESS: "你无权访问此任务",

  CONFIRM_TO_DELETE_ALL_REGIONS: "请确认是否删除所有已标注区域",

  // Tree validation messages
  ERR_REQUIRED: ({ modelName, field }) => {
    return `标签 <b>${modelName}</b> 缺少必填属性 <b>${field}</b>`;
  },

  ERR_UNKNOWN_TAG: ({ modelName, field, value }) => {
    return `名称为 <b>${value}</b> 的标签尚未注册。由 <b>${modelName}#${field}</b> 引用。`;
  },

  ERR_TAG_NOT_FOUND: ({ modelName, field, value }) => {
    return `配置中不存在名称为 <b>${value}</b> 的标签。由 <b>${modelName}#${field}</b> 引用。`;
  },

  ERR_TAG_UNSUPPORTED: ({ modelName, field, value, validType }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 无效：引用的标签是 <b>${value}</b>，但 <b>${modelName}</b> 只能控制 <b>${[]
      .concat(validType)
      .join(", ")}</b>`;
  },

  ERR_PARENT_TAG_UNEXPECTED: ({ validType, value }) => {
    return `标签 <b>${value}</b> 必须作为以下标签之一的子标签：<b>${[].concat(validType).join(", ")}</b>。`;
  },

  ERR_BAD_TYPE: ({ modelName, field, validType }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 类型无效。有效类型为：<b>${validType}</b>。`;
  },

  ERR_INTERNAL: ({ value }) => {
    return `内部错误。请查看浏览器控制台获取更多信息。请重试或联系开发人员。<br/>${value}`;
  },

  ERR_GENERAL: ({ value }) => {
    return value;
  },

  // Object loading errors
  URL_CORS_DOCS,
  URL_TAGS_DOCS,

  ERR_LOADING_AUDIO({ attr, url, error }) {
    return (
      <div data-testid="error:audio">
        <p>
          加载音频时出错。请检查任务中的 <code>{attr}</code> 字段。
        </p>
        <p>技术说明：{error}</p>
        <p>URL：{htmlEscape(url)}</p>
      </div>
    );
  },

  ERR_LOADING_S3({ attr, url }) {
    return `
    <div>
      <p>
        从 <code>${attr}</code> 字段加载 URL 时发生问题。
        请求参数无效。
        如果你使用的是 S3，请确认已填写正确的存储桶区域名称。
      </p>
      <p>URL：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_CORS({ attr, url }) {
    return `
    <div>
      <p>
        从 <code>${attr}</code> 字段加载 URL 时发生问题。
        很可能是因为静态服务器的 CORS 配置不正确。
        <a href="${URL_CORS_DOCS}" target="_blank">点此了解更多。</a>
      </p>
      <p>
        另请检查：
        <ul>
          <li>URL 是否有效</li>
          <li>网络是否可达</li>
        </ul>
      </p>
      <p>URL：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_HTTP({ attr, url, error }) {
    return `
    <div data-testid="error:http">
      <p>
        从 <code>${attr}</code> 字段加载 URL 时发生问题
      </p>
      <p>
        请检查以下内容：
        <ul>
          <li>URL 是否有效</li>
          <li>URL 协议是否与服务协议一致，例如 https 对应 https</li>
          <li>
            静态服务器的 CORS 配置是否正确，
            <a href=${URL_CORS_DOCS} target="_blank">点此了解更多</a>
          </li>
        </ul>
      </p>
      <p>
        技术说明：<code>${error}</code>
        <br />
        URL：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code>
      </p>
    </div>`;
  },
};
