import { DateYMD, WorkScheduleExclusionID } from 'app/schema/types/Scalars';
import { schemaComposer } from 'graphql-compose';
import { WorkScheduleExclusionEnum } from '../types/Enums';

export const WorkScheduleExclusionTC = schemaComposer.createObjectTC({
  name: 'WorkScheduleExclusion',
  fields: {
    id: WorkScheduleExclusionID.NonNull,
    fromDate: {
      type: DateYMD.NonNull,
      description: 'Format: yyyy-MM-dd',
    },
    toDate: {
      type: DateYMD.NonNull,
      description: 'Format: yyyy-MM-dd',
    },
    isWorkDays: {
      type: 'Boolean!',
      description: 'True if this exception is for working days',
    },
    exclusionType: {
      type: WorkScheduleExclusionEnum.NonNull,
      description: '',
    },
  },
});

if (!process.env.DISABLE_RELATIONS) {
  WorkScheduleExclusionTC.addFields({});
}