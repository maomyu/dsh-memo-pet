export function createUserMessage(input) {
  return { role: 'user', content: input.content, source: input.source }
}
