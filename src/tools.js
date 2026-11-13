import { defineTool } from '@deepseek-ai/dsh-tools'

const textOutput = {
  schema: { type: 'string' },
  render: (args, value) => [{ type: 'text', text: String(value ?? '') }],
}

const OPS = ['list', 'add', 'done', 'reopen', 'update', 'remove', 'export']

/**
 * One tool, seven operations. It is reachable from the pet conversation and
 * from every ordinary conversation, so "记一下…" works wherever the user is.
 */
export function createMemoTool(pet) {
  return defineTool({
    name: 'memo_pet',
    description:
      '读写用户的备忘（备忘录住在「备忘精灵」插件里，宠物阿墨负责提醒）。op=list 查看，add 新增，done 完成，reopen 恢复，update 改标题/标签/时间，remove 删除，export 导出成可复制的清单。用户说「记一下」「备忘」「提醒我」「把这件事记上」「我今天要做完什么」时用它。新增前不需要再问一遍，写完回一句记下了即可。',
    parameters: {
      op: {
        type: 'string',
        enum: OPS,
        description: '要做的操作。',
      },
      text: {
        type: 'string',
        description: 'op=add 时的原始句子，例如「周五前把方案发出去 #工作」。日期和 #标签 会从这句话里读出来。',
      },
      id: {
        type: 'string',
        description: 'op=done/reopen/update/remove 时的备忘 id；也可以用序号（从 1 开始）代替，序号取自最近一次 list。',
      },
      title: {
        type: 'string',
        description: 'op=update 时的新标题。',
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'op=update/add 时的标签，最多 6 个。',
      },
      due: {
        type: 'string',
        description: 'op=update 时的截止时间，写中文即可，例如「明天 18:00」「3月14日」。留空表示去掉时间。',
      },
      done: {
        type: 'boolean',
        description: 'op=list 时只看已完成（true）或只看未完成（false）。',
      },
      query: {
        type: 'string',
        description: 'op=list 时的搜索词。',
      },
    },
    output: textOutput,
    async execute(args) {
      try {
        return await pet.runTool(args ?? {})
      } catch (error) {
        return `没能完成：${error?.message ?? error}`
      }
    },
  })
}
