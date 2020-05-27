import { FieldConfig } from 'app/schema/definitions';
import { TaskID } from 'app/schema/types/Scalars';
import { ApprovalTC } from '../entities/ApprovalTC';
import { ApprovalCreateInput } from '../types/inputs/ApprovalCreateInput';
import { approvalCreateForTask, CreateArgs } from 'app/vendor/approval/approvalCreateForTask';

export default {
  type: ApprovalTC,
  args: {
    taskId: TaskID.NonNull,
    approval: ApprovalCreateInput.NonNull,
  },
  resolve: (_, args) => {
    return approvalCreateForTask(args);
  },
} as FieldConfig<CreateArgs>;