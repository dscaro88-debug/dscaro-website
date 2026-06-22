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
      content?: string
      mentions?: Array<{ name?: string; key?: string; id?: Record<string, string> }>
      message_type?: string
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

type AgentConfig = {
  id: AgentId
  label: string
  envPrefix: string
  fallbackEnvPrefix?: string
}

const AGENTS: Record<AgentId, AgentConfig> = {
  "general-manager": {
    id: "general-manager",
    label: "总经理",
    envPrefix: "FEISHU_GM",
    fallbackEnvPrefix: "FEISHU",
  },
  strategy: {
    id: "strategy",
    label: "战略师Strategy",
    envPrefix: "FEISHU_STRATEGY",
  },
  seo: {
    id: "seo",
    label: "建站大师SEO",
    envPrefix: "FEISHU_SEO",
  },
  social: {
    id: "social",
    label: "社媒运营",
    envPrefix: "FEISHU_SOCIAL",
  },
  "sales-manager": {
    id: "sales-manager",
    label: "外贸业务经理",
    envPrefix: "FEISHU_SALES_MANAGER",
  },
  "sales-rep": {
    id: "sales-rep",
    label: "外贸业务员",
    envPrefix: "FEISHU_SALES_REP",
  },
  procurement: {
    id: "procurement",
    label: "采购经理",
    envPrefix: "FEISHU_PROCUREMENT",
  },
}

const processedEventIds = new Set<string>()

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init)
}

function resolveAgent(rawAgent: string) {
  const normalized = rawAgent.toLowerCase().trim()
  if (normalized in AGENTS) return AGENTS[normalized as AgentId]
  return null
}

function envValue(agent: AgentConfig, suffix: "APP_ID" | "APP_SECRET" | "VERIFICATION_TOKEN" | "DRY_RUN") {
  const primary = process.env[`${agent.envPrefix}_${suffix}`]
  if (primary !== undefined) return primary
  if (!agent.fallbackEnvPrefix) return undefined
  return process.env[`${agent.fallbackEnvPrefix}_${suffix}`]
}

function requiredEnvNames(agent: AgentConfig) {
  return [
    `${agent.envPrefix}_APP_ID`,
    `${agent.envPrefix}_APP_SECRET`,
    `${agent.envPrefix}_VERIFICATION_TOKEN`,
  ]
}

function missingEnv(agent: AgentConfig) {
  return requiredEnvNames(agent).filter((name) => {
    const suffix = name.replace(`${agent.envPrefix}_`, "") as "APP_ID" | "APP_SECRET" | "VERIFICATION_TOKEN"
    return !envValue(agent, suffix)
  })
}

function isTokenValid(agent: AgentConfig, body: FeishuEventBody) {
  const expected = envValue(agent, "VERIFICATION_TOKEN")
  if (!expected) return false
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

function buildAgentReply(agent: AgentConfig) {
  const today = new Date().toISOString().slice(0, 10)
  const prefix = `【${agent.label}】`

  if (agent.id === "strategy") {
    return `${prefix}\n${today} 策略汇报：继续聚焦长期护理 B2B 用品，不扩散到泛家居。优先推进 Dining Solutions、Mobility & Transfer、Daily Care Supplies 三大类；本周核心是验证 launch SKU 的供应商资料、FOB/MOQ、海外护理采购需求和产品页转化逻辑。`
  }

  if (agent.id === "seo") {
    return `${prefix}\n${today} 建站/SEO汇报：dscaro.com 继续保持当前 B2B 模板，不做大改版。重点检查产品页资料完整度、类目页关键词、RFQ/Trade Account/Contact/WhatsApp 转化链路、结构化数据、GSC/GA4/Bing 状态，以及可询盘产品的页面可信度。`
  }

  if (agent.id === "social") {
    return `${prefix}\n${today} 社媒汇报：内容主线围绕 long-term care supplies、adult bibs wholesale、disposable underpads、care facility sourcing。优先输出 LinkedIn/Facebook 图文，短视频按产品痛点、采购清单、供应商文件核查三类脚本推进，并统一回链到产品页或 RFQ。`
  }

  if (agent.id === "sales-manager") {
    return `${prefix}\n${today} 业务经理汇报：询盘链路已具备承接基础。下一步固化报价 SOP、样品流程、MOQ/FOB/交期模板、客户分级、跟进节奏和订单转化记录，确保每条询盘进入后都能进入业务闭环。`
  }

  if (agent.id === "sales-rep") {
    return `${prefix}\n${today} 业务员汇报：客户开发优先找护理用品进口商、护理院采购组、养老机构供应商、医疗耗材和家护分销渠道。开发话术以长期护理三大类 launch SKU、OEM/ODM、文件按 SKU 确认、可小批量测试为核心，避免未确认认证表述。`
  }

  if (agent.id === "procurement") {
    return `${prefix}\n${today} 采购汇报：10 个优先 SKU 供应商资料催收项为白底图、场景图、包装图、尺寸图、MOQ、FOB、交期、证书/检测文件。未拿到文件前，网站与资料包统一标注“待供应商文件确认”，不虚构 CE/UKCA/ISO/MDR 证据。`
  }

  return `${prefix}\n${today} 总经理汇报：DSCARO AI 工作群将改为 7 个独立员工机器人协作。我的职责是项目总控、日报、风险、明日计划和跨 Agent 协调。当前仍不能宣称群内 Agent 对话已上线，只有事件订阅验证通过、机器人入群并完成群内 @ 测试后才可对外确认。当前优先级：完成 7 个飞书自建应用机器人入群、继续推进产品资料补齐、供应商建档、网站询盘链路和客户开发闭环。`
}

async function getTenantAccessToken(agent: AgentConfig) {
  const appId = envValue(agent, "APP_ID")
  const appSecret = envValue(agent, "APP_SECRET")
  if (!appId || !appSecret) {
    throw new Error(`Missing ${agent.envPrefix}_APP_ID or ${agent.envPrefix}_APP_SECRET`)
  }

  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    cache: "no-store",
  })
  const data = await response.json()
  if (!response.ok || data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`Failed to get tenant_access_token for ${agent.id}: ${JSON.stringify(data)}`)
  }
  return data.tenant_access_token as string
}

async function replyMessage(agent: AgentConfig, messageId: string, text: string) {
  const token = await getTenantAccessToken(agent)
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
    throw new Error(`Failed to reply Feishu message for ${agent.id}: ${JSON.stringify(data)}`)
  }
  return data
}

type RouteContext = {
  params: Promise<{
    agent: string
  }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  const params = await context.params
  const agent = resolveAgent(params.agent)
  if (!agent) return json({ error: "unknown_agent" }, { status: 404 })

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
        message: "Disable event encryption for MVP or add Encrypt Key support later.",
      },
      { status: 400 },
    )
  }

  if (!isTokenValid(agent, body)) {
    return json({ error: "invalid_or_missing_verification_token", agent: agent.id }, { status: 401 })
  }

  if (body.type === "url_verification" && body.challenge) {
    return json({ challenge: body.challenge })
  }

  const eventId = body.header?.event_id
  if (eventId) {
    const processedKey = `${agent.id}:${eventId}`
    if (processedEventIds.has(processedKey)) return json({ ok: true, duplicate: true })
    processedEventIds.add(processedKey)
    if (processedEventIds.size > 500) processedEventIds.clear()
  }

  if (body.header?.event_type !== "im.message.receive_v1") {
    return json({ ok: true, ignored: "unsupported_event_type", agent: agent.id })
  }

  const message = body.event?.message
  const messageId = message?.message_id
  if (!messageId) return json({ ok: true, ignored: "missing_message_id", agent: agent.id })
  if (body.event?.sender?.sender_type === "app") return json({ ok: true, ignored: "app_sender", agent: agent.id })
  if (message?.message_type !== "text") return json({ ok: true, ignored: "non_text_message", agent: agent.id })

  if (message.chat_id) {
    console.info("feishu_agent_group_chat", {
      agent: agent.id,
      chatId: message.chat_id,
      chatType: message.chat_type,
    })
  }

  cleanText(parseMessageText(message.content))
  const reply = buildAgentReply(agent)

  if (envValue(agent, "DRY_RUN") === "true") {
    return json({ ok: true, dryRun: true, agent: agent.id, reply })
  }

  try {
    await replyMessage(agent, messageId, reply)
  } catch (error) {
    console.error(error)
    return json({ ok: false, error: "reply_failed", agent: agent.id }, { status: 500 })
  }

  return json({ ok: true, agent: agent.id })
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const params = await context.params
  const agent = resolveAgent(params.agent)
  if (!agent) return json({ error: "unknown_agent" }, { status: 404 })

  return json({
    ok: true,
    service: "DSCARO Feishu Independent Agent",
    agent: agent.id,
    label: agent.label,
    callback: `/api/feishu/agents/${agent.id}`,
    requiredEnv: requiredEnvNames(agent),
    missingEnv: missingEnv(agent),
  })
}
