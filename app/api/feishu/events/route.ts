import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

type FeishuEventBody = {
  challenge?: string
  token?: string
  type?: string
  encrypt?: string
  header?: {
    event_id?: string
    event_type?: string
    token?: string
    app_id?: string
    tenant_key?: string
  }
  event?: {
    sender?: {
      sender_id?: Record<string, string>
      sender_type?: string
    }
    message?: {
      message_id?: string
      chat_id?: string
      chat_type?: string
      message_type?: string
      content?: string
      mentions?: Array<{ name?: string; key?: string; id?: Record<string, string> }>
    }
  }
}

type FeishuTextContent = {
  text?: string
}

type AgentId =
  | "general-manager"
  | "strategy"
  | "seo"
  | "social"
  | "sales-manager"
  | "sales-rep"
  | "procurement"

const AGENT_LABELS: Record<AgentId, string> = {
  "general-manager": "总经理",
  strategy: "战略师Strategy",
  seo: "建站大师SEO",
  social: "社媒运营",
  "sales-manager": "外贸业务经理",
  "sales-rep": "外贸业务员",
  procurement: "采购经理",
}

const AGENT_ALIASES: Array<{ id: AgentId; aliases: string[] }> = [
  { id: "strategy", aliases: ["战略", "strategy", "选品", "市场", "蓝海"] },
  { id: "seo", aliases: ["seo", "建站", "网站", "页面", "搜索", "收录", "geo"] },
  { id: "social", aliases: ["社媒", "内容", "linkedin", "facebook", "tiktok", "instagram", "youtube"] },
  { id: "sales-manager", aliases: ["业务经理", "询盘", "报价", "订单", "样品", "转化"] },
  { id: "sales-rep", aliases: ["业务员", "客户开发", "潜客", "开发信", "私信", "whatsapp"] },
  { id: "procurement", aliases: ["采购", "供应商", "证书", "检测", "图片", "moq", "fob", "交期"] },
  { id: "general-manager", aliases: ["总经理", "汇报", "日报", "进度", "风险", "全员", "所有agent", "agents"] },
]

const processedEventIds = new Set<string>()

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init)
}

function verificationToken() {
  return process.env.FEISHU_VERIFICATION_TOKEN || ""
}

function isTokenValid(body: FeishuEventBody) {
  const expected = verificationToken()
  if (!expected) return true
  return body.token === expected || body.header?.token === expected
}

function parseMessageText(content?: string) {
  if (!content) return ""
  try {
    const parsed = JSON.parse(content) as FeishuTextContent
    return parsed.text || ""
  } catch {
    return content
  }
}

function cleanText(text: string) {
  return text
    .replace(/@_user_\d+/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function routeAgent(text: string): AgentId {
  const lower = text.toLowerCase()
  for (const candidate of AGENT_ALIASES) {
    if (candidate.aliases.some((alias) => lower.includes(alias.toLowerCase()))) {
      return candidate.id
    }
  }
  return "general-manager"
}

function buildAgentReply(agentId: AgentId, text: string) {
  const today = new Date().toISOString().slice(0, 10)
  const prefix = `【${AGENT_LABELS[agentId]}】`

  if (agentId === "strategy") {
    return `${prefix}\n今日策略方向：继续聚焦长期护理 B2B 用品，不扩散到泛家居。优先推进 Dining Solutions、Mobility & Transfer、Daily Care Supplies 三大类；短期以可询盘 SKU、供应商资料补齐、FOB/MOQ 梳理和海外护理采购需求验证为核心。`
  }

  if (agentId === "seo") {
    return `${prefix}\n今日建站/SEO判断：dscaro.com 当前应保持现有 B2B 模板，不做大改版。重点推进产品页资料完整度、RFQ/Trade Account/Contact/WhatsApp 链路、Google 收录、类目页关键词、结构化数据和可询盘转化。GA4 与 GSC 已确认；Bing 仍待确认。`
  }

  if (agentId === "social") {
    return `${prefix}\n今日社媒动作：围绕“long-term care supplies / adult bibs wholesale / disposable underpads / care facility sourcing”输出 LinkedIn 与 Facebook 图文，短视频先做产品痛点、采购清单、供应商文件核查三类。所有内容回链到 /rfq 或产品页。`
  }

  if (agentId === "sales-manager") {
    return `${prefix}\n今日业务经理进展：询盘链路已通过生产测试，email=sent、webhook=sent。下一步把 RFQ 字段、报价 SOP、样品流程、MOQ/FOB/交期模板和客户跟进节奏固化，确保询盘进入后能直接承接。`
  }

  if (agentId === "sales-rep") {
    return `${prefix}\n今日业务员动作：客户开发优先找护理用品进口商、护理院采购组、养老机构供应商、医疗耗材和家护分销渠道。话术先以“长期护理三大类 launch SKU + OEM/ODM + 文件按 SKU 确认”为核心，避免虚构认证。`
  }

  if (agentId === "procurement") {
    return `${prefix}\n今日采购进展：优先围绕 Dining Solutions、Mobility & Transfer、Daily Care Supplies 催收供应商资料。催收项：白底图、场景图、包装图、尺寸图、MOQ、FOB、交期、证书或检测文件。未收到文件前统一标注“待供应商文件确认”。`
  }

  return `${prefix}\n${today} 总经理汇报：当前飞书 Agent 群已进入“可对话升级”阶段。已具备单向日报推送；下一步上线自建应用机器人事件订阅后，可在群里 @DSCARO总经理 并指定“战略师/SEO/社媒/业务经理/业务员/采购经理”获得角色回复。当前仍需完成飞书自建应用凭证、事件订阅 URL、消息权限与线上部署配置。`
}

async function getTenantAccessToken() {
  const appId = process.env.FEISHU_APP_ID
  const appSecret = process.env.FEISHU_APP_SECRET
  if (!appId || !appSecret) {
    throw new Error("Missing FEISHU_APP_ID or FEISHU_APP_SECRET")
  }

  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    cache: "no-store",
  })
  const data = await response.json()
  if (!response.ok || data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`Failed to get tenant_access_token: ${JSON.stringify(data)}`)
  }
  return data.tenant_access_token as string
}

async function replyMessage(messageId: string, text: string) {
  const token = await getTenantAccessToken()
  const response = await fetch(
    `https://open.feishu.cn/open-apis/im/v1/messages/${encodeURIComponent(messageId)}/reply`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        msg_type: "text",
        content: JSON.stringify({ text }),
      }),
    },
  )
  const data = await response.json()
  if (!response.ok || data.code !== 0) {
    throw new Error(`Failed to reply Feishu message: ${JSON.stringify(data)}`)
  }
  return data
}

export async function POST(request: NextRequest) {
  let body: FeishuEventBody
  try {
    body = (await request.json()) as FeishuEventBody
  } catch {
    return json({ error: "invalid_json" }, { status: 400 })
  }

  if (body.encrypt) {
    return json(
      {
        error: "encrypted_events_not_enabled",
        message: "Disable event encryption for MVP or add FEISHU_ENCRYPT_KEY support.",
      },
      { status: 400 },
    )
  }

  if (!isTokenValid(body)) {
    return json({ error: "invalid_verification_token" }, { status: 401 })
  }

  if (body.type === "url_verification" && body.challenge) {
    return json({ challenge: body.challenge })
  }

  const eventId = body.header?.event_id
  if (eventId) {
    if (processedEventIds.has(eventId)) return json({ ok: true, duplicate: true })
    processedEventIds.add(eventId)
    if (processedEventIds.size > 500) processedEventIds.clear()
  }

  if (body.header?.event_type !== "im.message.receive_v1") {
    return json({ ok: true, ignored: "unsupported_event_type" })
  }

  const message = body.event?.message
  const messageId = message?.message_id
  if (!messageId) return json({ ok: true, ignored: "missing_message_id" })
  if (body.event?.sender?.sender_type === "app") return json({ ok: true, ignored: "app_sender" })
  if (message?.message_type !== "text") return json({ ok: true, ignored: "non_text_message" })

  const rawText = parseMessageText(message.content)
  const text = cleanText(rawText)
  const agentId = routeAgent(text)
  const reply = buildAgentReply(agentId, text)

  if (process.env.FEISHU_AGENT_GATEWAY_DRY_RUN === "true") {
    return json({ ok: true, dryRun: true, agentId, reply })
  }

  try {
    await replyMessage(messageId, reply)
  } catch (error) {
    console.error(error)
    return json({ ok: false, error: "reply_failed" }, { status: 500 })
  }

  return json({ ok: true, agentId })
}

export async function GET() {
  return json({
    ok: true,
    service: "DSCARO Feishu Agent Gateway",
    callback: "/api/feishu/events",
    supportedAgents: Object.values(AGENT_LABELS),
  })
}
