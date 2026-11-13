export class TypertRemoteService {
  constructor(ctx, name) {
    this.ctx = ctx
    this.remoteName = name
  }
}
export function Remote(target, options) {
  options?.addInitializer?.(() => {})
}
