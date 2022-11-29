import sqlBuilder, { compileTyped } from '../db-builder';
import { InsertObject } from 'kysely';
import { DB } from '@/__generated__/db';

export type JobPayload = Omit<InsertObject<DB, 'system.job'>, 'on_complete'>;

/**
 * Creates a jobs document
 * @param jobs
 * @returns
 */
export const createJobs = (jobOrJobs: JobPayload | Array<JobPayload>) => {
  const query = Array.isArray(jobOrJobs)
    ? sqlBuilder.insertInto('system.job').values(
        jobOrJobs.map((d) => ({
          ...d,
          on_complete: false,
          // on_complete: false,
        }))
      )
    : sqlBuilder.insertInto('system.job').values({
        ...jobOrJobs,
        on_complete: false,
      });

  return compileTyped(query);
};
