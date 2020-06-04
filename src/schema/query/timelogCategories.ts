import { FieldConfig } from 'app/schema/definitions';
import { timelogCategoryFindMany } from 'app/vendor/timelogCategory/timelogCategoryFindMany';
import { TimelogCategoryTC } from '../entities/TimelogCategoryTC';

export default {
  type: TimelogCategoryTC.NonNull.List,
  resolve: () => {
    return timelogCategoryFindMany();
  },
  extensions: {
    complexity: ({ childComplexity }) => childComplexity * 10,
  },
} as FieldConfig;
