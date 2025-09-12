import { ListSortOptions } from './core';

/** Represents a cloud transcoder schedule creation request. */
export interface CreateTranscoderScheduleRequest {
    /** The start date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    start?: string;
    /** The stop date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    stop?: string;
    /** A field that can be used to associate particular schedules. */
    clientId?: string;
    /** The name of the schedule. */
    name: string;
    /** The description of the schedule. */
    description?: string;
    /** Recurring information about the schedule. */
    recurring?: {
        /** The description of the frequency for the schedule. */
        frequency: {
            /** The interval of the schedule. */
            interval: 'Daily' | 'Weekly';
            /** Days of the week to trigger the schedule. */
            daysOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
        };
    };
    /** The Transcoder Ids to schedule for. */
    transcoderIds?: string[];
}

/** Represents a cloud transcoder schedule. */
export interface TranscoderSchedule {
    /** The start date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    metadata?: {
        /** When was the schedule created. */
        createdOn: string;
        /** When was the schedule last modified. */
        lastModifiedOn: string;
    };
    /** The status of the schedule. */
    status: 'Active' | 'Inactive' | 'Deleted';
    /** Identifier of the schedule. */
    scheduleId?: string;
    /** The start date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    start?: string;
    /** The stop date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    stop?: string;
    /** A field that can be used to associate particular schedules. */
    clientId?: string;
    /** The name of the schedule. */
    name: string;
    /** The description of the schedule. */
    description?: string;
    /** Recurring information about the schedule. */
    recurring?: {
        /** The description of the frequency for the schedule. */
        frequency: {
            /** The interval of the schedule. */
            interval: 'Daily' | 'Weekly';
            /** Days of the week to trigger the schedule. */
            daysOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
        };
        /** When does the schedule stops. */
        endDate?: string;
    };
    /** The Transcoder Ids to schedule for. */
    transcoderIds?: string[];
    /** The recent executions. */
    executions?: {
        /** Execution time. */
        executionTime: string;
        /** Type of execution. */
        scheduleType: 'Start' | 'Stop';
        /** Status of the execution. */
        executionStatus: 'Pending' | 'Running' | 'Completed' | 'NoAction' | 'UnexpectedError' | 'Deleted' | 'RemovedByScheduleUpdate';
        /** Identifier of the transcoder. */
        transcoderId: string;
    }[];
}

/** Represents a cloud transcoder schedule update request. */
export interface UpdateTranscoderScheduleRequest {
    /** Update display name for schedule. */
    name?: string;
    /**
     * Update the start date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`.
     * If it's weekly, then we use the time from this as well and the first day to anchor the schedule.
     */
    start?: string;
    /** Update the stop date and time of the schedule in the format of `YYYY-MM-DDTHH:MM:SSZ`. */
    stop?: string;
    /** Update the customers reference field. */
    clientId?: string;
    /** Update the description of the schedule. */
    description?: string;
    /** Update recurring schedule. */
    recurring?: {
        /** The description of the frequency for the schedule. */
        frequency: {
            /** The interval of the schedule. */
            interval: 'Daily' | 'Weekly';
            /** Days of the week to trigger the schedule. */
            daysOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
        };
    };
    /** Update all transcoder Ids for the schedule. This replaces all existing transcoder Ids for the schedule. */
    transcoderIds?: string[];
}

/** Represents the options to sort the response for listing transcoder schedules. */
export interface ListTranscoderSchedulesSortOptions extends ListSortOptions<'CreatedDate'> {
    /** List the transcoders with this status. */
    status?: 'Active' | 'Inactive' | 'Deleted';
}
