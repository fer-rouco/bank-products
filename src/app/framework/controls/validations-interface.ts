export interface Validation {
  name: string,
  value?: string,
  message?: string,
  model?: any,
  fn?(): boolean
}
