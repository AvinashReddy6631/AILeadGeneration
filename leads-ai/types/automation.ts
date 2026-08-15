export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'failed'

export interface AutomationWorkflow {
  id: string
  name: string
  status: WorkflowStatus
}
