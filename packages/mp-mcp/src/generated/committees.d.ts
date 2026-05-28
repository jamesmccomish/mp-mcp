/* Auto-generated from https://committees-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/api/BillPetitions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Bill petitions */
        get: operations["GetBillPetitions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BillPetitions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a Bill petition */
        get: operations["GetBillPetitionById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BillPetitions/{id}/Document/{fileDataFormat}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a document for a Bill petition */
        get: operations["GetBillPetitionDocument"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Broadcast/Meetings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a list of Committee Meetings between two dates. */
        get: operations["Get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/CommitteeBusiness": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of committee businesses */
        get: operations["GetCommitteeBusiness"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/CommitteeBusiness/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a committee business */
        get: operations["GetCommitteeBusinessById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/CommitteeBusiness/{id}/Publications/Summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Publication Groups for a Commitee Business */
        get: operations["ListCommitteeBusinessPublicationGroups"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/CommitteeBusinessType": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Committee Business Types */
        get: operations["ListCommitteeBusinessTypes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/CommitteeType": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Committee Types */
        get: operations["ListCommitteeTypes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Committees */
        get: operations["GetCommittees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/NextEvent": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of next events for committees matching specified criteria */
        get: operations["GetNextEventForCommittees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a Committee */
        get: operations["GetCommitteeById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/Events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return events related to the committee id provided */
        get: operations["GetEventsCommitteeById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/Members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Memberships of a Committee */
        get: operations["ListCommitteeMemberships"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/Members/{personId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return photo for a lay member of the committee */
        get: operations["GetCommitteePersonPhoto"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/Staff": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of staff members of a Committee */
        get: operations["ListCommitteeStaffMemberships"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/Publications/Summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Publication Groups for a Commitee */
        get: operations["ListCommitteePublicationGroups"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Committees/{id}/ArchivedPublicationLinks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all CommitteeArchivedPublicationLinks linked to a Committee */
        get: operations["GetCommitteeArchivedPublicationLinks"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Countries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Countries */
        get: operations["GetCountries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of events */
        get: operations["GetEvents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Events/Activities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of event activities */
        get: operations["GetEventActivities"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Events/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return an event */
        get: operations["GetEventById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Events/{id}/Attendance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of attendances for an event */
        get: operations["GetAttendancesById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Events/{id}/Activities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of activities for an event */
        get: operations["GetActivitiesById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of memberships for one or more members */
        get: operations["ListMembersCommitteeMemberships"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Messaging/Banners/{location}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return messaging banners */
        get: operations["Banners"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/OralEvidence": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Oral Evidence */
        get: operations["GetOralEvidence"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/OralEvidence/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return an Oral Evidence */
        get: operations["GetOralEvidenceById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/OralEvidence/{id}/Document/{fileDataFormat}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a document for an Oral Evidence */
        get: operations["GetOralEvidenceDocument"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PublicationType": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Publication Types */
        get: operations["ListPublicationTypes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Publications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of publications */
        get: operations["GetPublications"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Publications/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a publication */
        get: operations["GetPublicationById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Publications/{id}/Document/{documentId}/{fileDataFormat}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a document for a publication */
        get: operations["GetDocument"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/SubmissionPeriodTemplate/{id}/Document/{documentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a submission period template file */
        get: operations["GetSubmissionPeriodTemplateDocumentById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/SubmissionPeriod/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a submission period */
        get: operations["GetSubmissionPeriodById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/WrittenEvidence": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Written Evidence */
        get: operations["GetWrittenEvidence"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/WrittenEvidence/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a Written Evidence */
        get: operations["GetWrittenEvidenceById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/WrittenEvidence/{id}/Document/{fileDataFormat}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a document for a Written Evidence */
        get: operations["GetWrittenEvidenceDocument"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @enum {string} */
        "Committees.Common.Enums.CommitteeBusinessQuerySortOrder": "DateOpenedNewest" | "DateOpenedOldest" | "PublicationDateAscending" | "PublicationDateDescending";
        /** @enum {string} */
        "Committees.Common.Enums.CommitteeBusinessStatus": "Open" | "Closed";
        /** @enum {string} */
        "Committees.Common.Enums.CommitteeCategory": "Select" | "General" | "Other";
        /** @enum {string} */
        "Committees.Common.Enums.CommitteeStatus": "Current" | "Former" | "All";
        /** @enum {string} */
        "Committees.Common.Enums.FileDataFormat": "OriginalFormat" | "Html" | "Pdf";
        /** @enum {string} */
        "Committees.Common.Enums.House": "Commons" | "Lords" | "Joint";
        /** @enum {string} */
        "Committees.Common.Enums.MembershipStatus": "Current" | "Former" | "All";
        /** @enum {string} */
        "Committees.Common.Enums.PublicationQuerySortOrder": "PublicationDateDescending" | "PublicationDateAscending" | "ResponseDateDescending" | "ResponseDateAscending";
        /** @enum {string} */
        "Committees.Common.Enums.RemoteAttendanceStatus": "InPerson" | "Remote";
        /** @enum {string} */
        "Committees.Common.Enums.SubmissionType": "OralEvidence" | "WrittenEvidence" | "Petition";
        /** @enum {string} */
        "Committees.Common.Enums.SubmitterType": "Individual" | "Organisation" | "Proxy";
        "Committees.Common.Link": {
            rel?: string | null;
            href?: string | null;
            method?: string | null;
        };
        /** ResourceCollection<CommitteeBusinessSummary> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeBusinessSummary]": {
            /** IEnumerable<CommitteeBusinessSummary> */
            items?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<CommitteeMember> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]": {
            /** IEnumerable<CommitteeMember> */
            items?: components["schemas"]["Committees.Common.Responses.CommitteeMember"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<CommitteeSummary> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeSummary]": {
            /** IEnumerable<CommitteeSummary> */
            items?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<EventSummary> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]": {
            /** IEnumerable<EventSummary> */
            items?: components["schemas"]["Committees.Common.Responses.Common.Events.EventSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<HybridBillPetition> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.HybridBillPetition]": {
            /** IEnumerable<HybridBillPetition> */
            items?: components["schemas"]["Committees.Common.Responses.Common.Submission.HybridBillPetition"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<OralEvidence> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.OralEvidence]": {
            /** IEnumerable<OralEvidence> */
            items?: components["schemas"]["Committees.Common.Responses.Common.Submission.OralEvidence"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<WrittenEvidence> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.WrittenEvidence]": {
            /** IEnumerable<WrittenEvidence> */
            items?: components["schemas"]["Committees.Common.Responses.Common.Submission.WrittenEvidence"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<EventActivities> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]": {
            /** IEnumerable<EventActivities> */
            items?: components["schemas"]["Committees.Common.Responses.EventActivities"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        /** ResourceCollection<Publication> */
        "Committees.Common.ResourceCollection`1[Committees.Common.Responses.Publication]": {
            /** IEnumerable<Publication> */
            items?: components["schemas"]["Committees.Common.Responses.Publication"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
            /** ICollection<Link> */
            links?: components["schemas"]["Committees.Common.Link"][] | null;
        };
        "Committees.Common.Responses.ActivityDetails": {
            /**
             * Format: int32
             * @description The id of the activity
             */
            id?: number;
            /** @description The name of the activity */
            name?: string | null;
            /**
             * Format: date-time
             * @description The datetime the activity starts
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The datetime the activity ends
             */
            endDate?: string | null;
            /**
             * Format: int32
             * @description The id of the event this activity is attached to
             */
            eventId?: number;
            /** @description Whether an activity is private or public */
            isPrivate?: boolean;
            /** @description Type of activity */
            activityType?: string | null;
            /**
             * IEnumerable<ActivityPerson>
             * @description A list of attendees of the activity
             */
            attendees?: components["schemas"]["Committees.Common.Responses.Common.People.ActivityPerson"][] | null;
            /** IEnumerable<CommitteeBusinessSummary> */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<OralEvidence> */
            oralEvidences?: components["schemas"]["Committees.Common.Responses.Common.Submission.OralEvidence"][] | null;
        };
        "Committees.Common.Responses.ArchivedPublicationGroup": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            description?: string | null;
            /** Format: uri */
            url?: string | null;
        };
        /** @description An activity representation for broadcasters. */
        "Committees.Common.Responses.Broadcast.ActivityForBroadcasters": {
            /** @description The name of the activity. */
            name?: string | null;
            /** @description The type of the activity. */
            type?: string | null;
            /**
             * Format: date-time
             * @description The start time of the activity.
             */
            startTime?: string;
            /**
             * Nullable<DateTimeOffset>
             * Format: date-time
             * @description The end time for the activity.
             */
            endTime?: string | null;
            /** @description Whether the activity is held in private. */
            private?: boolean;
            /**
             * IEnumerable<String>
             * @description The committee business that forms the subject of the meeting.
             */
            subjects?: string[] | null;
            /**
             * IEnumerable<ActivityPerson>
             * @description The people attending the activity.
             */
            attendees?: components["schemas"]["Committees.Common.Responses.Common.People.ActivityPerson"][] | null;
        };
        "Committees.Common.Responses.Broadcast.MeetingLocation": {
            /** Format: int32 */
            id?: number;
            description?: string | null;
        };
        "Committees.Common.Responses.CommitteeBusinessDetails": {
            /**
             * Format: int32
             * @description Id of committee business
             */
            id?: number;
            /** @description Title of committee business */
            title?: string | null;
            type?: components["schemas"]["Committees.Common.Responses.Common.Business.CommitteeBusinessType"];
            /**
             * Format: date-time
             * @description Date the business started
             */
            openDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date the business ended
             */
            closeDate?: string | null;
            latestReport?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationSummary"];
            /**
             * IEnumerable<SubmissionPeriodSummary>
             * @description Currently open submission periods
             */
            openSubmissionPeriods?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodSummary"][] | null;
            /**
             * IEnumerable<SubmissionPeriodSummary>
             * @description Closed submission periods
             */
            closedSubmissionPeriods?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodSummary"][] | null;
            nextOralEvidenceSession?: components["schemas"]["Committees.Common.Responses.Common.Activity.ActivitySummary"];
            contact?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContactInformation"];
            /** @description Scope of the committee business */
            scope?: string | null;
            /**
             * IEnumerable<Links>
             * @description Related information for the committee business
             */
            relatedInformation?: components["schemas"]["Committees.Common.Responses.Common.Shared.Links"][] | null;
            banner?: components["schemas"]["Committees.Common.Responses.Common.Shared.Banner"];
            /**
             * IEnumerable<HouseNumber>
             * @description HC Numbers for the committee business
             */
            hcNumbers?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"][] | null;
        };
        "Committees.Common.Responses.CommitteeBusinessSummary": {
            /**
             * Format: int32
             * @description Id of committee business
             */
            id?: number;
            /** @description Title of committee business */
            title?: string | null;
            type?: components["schemas"]["Committees.Common.Responses.Common.Business.CommitteeBusinessType"];
            /**
             * Format: date-time
             * @description Date the business started
             */
            openDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date the business ended
             */
            closeDate?: string | null;
            latestReport?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationSummary"];
            /**
             * IEnumerable<SubmissionPeriodSummary>
             * @description Currently open submission periods
             */
            openSubmissionPeriods?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodSummary"][] | null;
            /**
             * IEnumerable<SubmissionPeriodSummary>
             * @description Closed submission periods
             */
            closedSubmissionPeriods?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodSummary"][] | null;
            nextOralEvidenceSession?: components["schemas"]["Committees.Common.Responses.Common.Activity.ActivitySummary"];
            contact?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContactInformation"];
        };
        "Committees.Common.Responses.CommitteeDetails": {
            contact?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContactInformation"];
            /**
             * Format: int32
             * @description The id of the committee
             */
            id?: number;
            /** @description The current name of the committee */
            name?: string | null;
            parentCommittee?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"];
            /**
             * IEnumerable<CommitteeSummary>
             * @description Sub-committees of this committee
             */
            subCommittees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            house?: components["schemas"]["Committees.Common.Enums.House"];
            leadHouse?: components["schemas"]["Committees.Common.Responses.Common.Committee.LeadHouse"];
            category?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeCategory"];
            /**
             * IEnumerable<CommitteeType>
             * @description List of Committee types
             */
            committeeTypes?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][] | null;
            /** @description If this committee should be shown on the website */
            showOnWebsite?: boolean;
            /** @description The legacy website URL for the committee, if one exists. */
            websiteLegacyUrl?: string | null;
            /** @description Whether automatic redirect to the legacy website has been enabled for the committee. */
            websiteLegacyRedirectEnabled?: boolean;
            /**
             * Format: date-time
             * @description The start date of the committee
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The end date of the committee
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Commons
             */
            dateCommonsAppointed?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Lords
             */
            dateLordsAppointed?: string | null;
            /**
             * IEnumerable<ScrutinisingDepartment>
             * @description All the departments the committee scrutinises
             */
            scrutinisingDepartments?: components["schemas"]["Committees.Common.Responses.ScrutinisingDepartment"][] | null;
            /**
             * Nullable<Boolean>
             * @description Is the lead Committee, if linked to an event with multiple Committees
             */
            isLeadCommittee?: boolean | null;
            /**
             * ICollection<CommitteeName>
             * @description Previous names of this committee
             */
            nameHistory?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeName"][] | null;
            banner?: components["schemas"]["Committees.Common.Responses.Common.Shared.Banner"];
            /**
             * IEnumerable<ContentLink>
             * @description Social Media accounts of this committee
             */
            contentLinks?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContentLink"][] | null;
            /** @description The purpose of the committee */
            purpose?: string | null;
            /**
             * IEnumerable<CommitteeSummary>
             * @description Previous committees associated with this committee
             */
            previousCommittees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
        };
        "Committees.Common.Responses.CommitteeMeetingForBroadcasters": {
            /**
             * Format: int32
             * @description The id of the meeting event.
             */
            id?: number;
            /** @description The title of the meeting event. */
            title?: string | null;
            /**
             * Nullable<DateTimeOffset>
             * Format: date-time
             * @description The start time of the event.
             */
            startTime?: string | null;
            /**
             * Nullable<DateTimeOffset>
             * Format: date-time
             * @description The end time of the event.
             */
            endTime?: string | null;
            /** @description The notes related to the event. */
            notes?: string | null;
            /** @description Is a House of Commons event. */
            isCommons?: boolean;
            /** @description Is a House of Lords event. */
            isLords?: boolean;
            location?: components["schemas"]["Committees.Common.Responses.Broadcast.MeetingLocation"];
            /**
             * IEnumerable<CommitteeSummary>
             * @description Which committees are involved in the event.
             */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /**
             * IEnumerable<ActivityForBroadcasters>
             * @description The schedule of activities for the event.
             */
            activities?: components["schemas"]["Committees.Common.Responses.Broadcast.ActivityForBroadcasters"][] | null;
            eventType?: components["schemas"]["Committees.Common.Responses.Common.Events.EventTypeDetails"];
            /**
             * Nullable<DateTimeOffset>
             * Format: date-time
             * @description The date the meeting was cancelled, null if not cancelled.
             */
            cancelledDate?: string | null;
        };
        "Committees.Common.Responses.CommitteeMember": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            personId?: number | null;
            name?: string | null;
            photoUrl?: string | null;
            memberInfo?: components["schemas"]["Committees.Common.Responses.Common.People.MemberInfo"];
            isLayMember?: boolean;
            /** IEnumerable<CommitteeMemberRole> */
            roles?: components["schemas"]["Committees.Common.Responses.Common.People.CommitteeMemberRole"][] | null;
        };
        "Committees.Common.Responses.CommitteeSummary": {
            contact?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContactInformation"];
            /**
             * Format: int32
             * @description The id of the committee
             */
            id?: number;
            /** @description The current name of the committee */
            name?: string | null;
            parentCommittee?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"];
            /**
             * IEnumerable<CommitteeSummary>
             * @description Sub-committees of this committee
             */
            subCommittees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            house?: components["schemas"]["Committees.Common.Enums.House"];
            leadHouse?: components["schemas"]["Committees.Common.Responses.Common.Committee.LeadHouse"];
            category?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeCategory"];
            /**
             * IEnumerable<CommitteeType>
             * @description List of Committee types
             */
            committeeTypes?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][] | null;
            /** @description If this committee should be shown on the website */
            showOnWebsite?: boolean;
            /** @description The legacy website URL for the committee, if one exists. */
            websiteLegacyUrl?: string | null;
            /** @description Whether automatic redirect to the legacy website has been enabled for the committee. */
            websiteLegacyRedirectEnabled?: boolean;
            /**
             * Format: date-time
             * @description The start date of the committee
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The end date of the committee
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Commons
             */
            dateCommonsAppointed?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Lords
             */
            dateLordsAppointed?: string | null;
            /**
             * IEnumerable<ScrutinisingDepartment>
             * @description All the departments the committee scrutinises
             */
            scrutinisingDepartments?: components["schemas"]["Committees.Common.Responses.ScrutinisingDepartment"][] | null;
            /**
             * Nullable<Boolean>
             * @description Is the lead Committee, if linked to an event with multiple Committees
             */
            isLeadCommittee?: boolean | null;
            /**
             * ICollection<CommitteeName>
             * @description Previous names of this committee
             */
            nameHistory?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeName"][] | null;
        };
        "Committees.Common.Responses.Common.Activity.ActivitySummary": {
            /**
             * Format: int32
             * @description The id of the activity
             */
            id?: number;
            /** @description The name of the activity */
            name?: string | null;
            /**
             * Format: date-time
             * @description The datetime the activity starts
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The datetime the activity ends
             */
            endDate?: string | null;
            /**
             * Format: int32
             * @description The id of the event this activity is attached to
             */
            eventId?: number;
            /** @description Whether an activity is private or public */
            isPrivate?: boolean;
            /** @description Type of activity */
            activityType?: string | null;
            /**
             * IEnumerable<ActivityPerson>
             * @description A list of attendees of the activity
             */
            attendees?: components["schemas"]["Committees.Common.Responses.Common.People.ActivityPerson"][] | null;
        };
        "Committees.Common.Responses.Common.Activity.RemoteAttendance": {
            id?: components["schemas"]["Committees.Common.Enums.RemoteAttendanceStatus"];
            /** @description The remote attendance text */
            text?: string | null;
        };
        "Committees.Common.Responses.Common.Business.CommitteeBusinessType": {
            /**
             * Format: int32
             * @description Business type Id
             */
            id?: number;
            /** @description Name of business type */
            name?: string | null;
            /** @description If the business is an inquiry */
            isInquiry?: boolean;
            /** @description Description of the business */
            description?: string | null;
        };
        "Committees.Common.Responses.Common.Committee.CommitteeCategory": {
            /**
             * Format: int32
             * @description Committee category Id
             */
            id?: number;
            /** @description Committee category Name */
            name?: string | null;
        };
        "Committees.Common.Responses.Common.Committee.CommitteeName": {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            committeeId?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
        };
        "Committees.Common.Responses.Common.Committee.CommitteeType": {
            /**
             * Format: int32
             * @description Committee type Id
             */
            id?: number;
            /** @description Committee type name */
            name?: string | null;
            committeeCategory?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeCategory"];
        };
        "Committees.Common.Responses.Common.Committee.LeadHouse": {
            isCommons?: boolean;
            isLords?: boolean;
        };
        "Committees.Common.Responses.Common.Committee.MemberCommittee": {
            contact?: components["schemas"]["Committees.Common.Responses.Common.Shared.ContactInformation"];
            /**
             * Format: int32
             * @description The id of the committee
             */
            id?: number;
            /** @description The current name of the committee */
            name?: string | null;
            parentCommittee?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"];
            /**
             * IEnumerable<CommitteeSummary>
             * @description Sub-committees of this committee
             */
            subCommittees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            house?: components["schemas"]["Committees.Common.Enums.House"];
            leadHouse?: components["schemas"]["Committees.Common.Responses.Common.Committee.LeadHouse"];
            category?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeCategory"];
            /**
             * IEnumerable<CommitteeType>
             * @description List of Committee types
             */
            committeeTypes?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][] | null;
            /** @description If this committee should be shown on the website */
            showOnWebsite?: boolean;
            /** @description The legacy website URL for the committee, if one exists. */
            websiteLegacyUrl?: string | null;
            /** @description Whether automatic redirect to the legacy website has been enabled for the committee. */
            websiteLegacyRedirectEnabled?: boolean;
            /**
             * Format: date-time
             * @description The start date of the committee
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The end date of the committee
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Commons
             */
            dateCommonsAppointed?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date the committee was appointed by the House of Lords
             */
            dateLordsAppointed?: string | null;
            /**
             * IEnumerable<ScrutinisingDepartment>
             * @description All the departments the committee scrutinises
             */
            scrutinisingDepartments?: components["schemas"]["Committees.Common.Responses.ScrutinisingDepartment"][] | null;
            /**
             * Nullable<Boolean>
             * @description Is the lead Committee, if linked to an event with multiple Committees
             */
            isLeadCommittee?: boolean | null;
            /**
             * ICollection<CommitteeName>
             * @description Previous names of this committee
             */
            nameHistory?: components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeName"][] | null;
            /** IEnumerable<CommitteeMemberRole> */
            roles?: components["schemas"]["Committees.Common.Responses.Common.People.CommitteeMemberRole"][] | null;
        };
        "Committees.Common.Responses.Common.Department": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            address?: components["schemas"]["Committees.Common.Responses.Common.Shared.Address"];
            otherAddress?: string | null;
            phone?: string | null;
            email?: string | null;
            url?: string | null;
        };
        "Committees.Common.Responses.Common.Document.Document": {
            /** Format: int32 */
            documentId?: number;
            /** IEnumerable<DocumentFile> */
            files?: components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"][] | null;
        };
        "Committees.Common.Responses.Common.Document.DocumentFile": {
            fileName?: string | null;
            /**
             * Nullable<Int64>
             * Format: int64
             */
            fileSize?: number | null;
            fileDataFormat?: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            url?: string | null;
        };
        "Committees.Common.Responses.Common.Events.EventSummary": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            cancelledDate?: string | null;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            locationId?: number | null;
            location?: string | null;
            eventType?: components["schemas"]["Committees.Common.Responses.Common.Events.EventTypeDetails"];
            eventSource?: string | null;
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** IEnumerable<CommitteeBusinessSummary> */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<EventSummary> */
            childEvents?: components["schemas"]["Committees.Common.Responses.Common.Events.EventSummary"][] | null;
            nextActivity?: components["schemas"]["Committees.Common.Responses.ActivityDetails"];
            /** IEnumerable<ActivityDetails> */
            activities?: components["schemas"]["Committees.Common.Responses.ActivityDetails"][] | null;
        };
        "Committees.Common.Responses.Common.Events.EventTypeDetails": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            isVisit?: boolean;
            description?: string | null;
        };
        "Committees.Common.Responses.Common.People.ActivityPerson": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            personId?: number | null;
            name?: string | null;
            photoUrl?: string | null;
            memberInfo?: components["schemas"]["Committees.Common.Responses.Common.People.MemberInfo"];
            /** IEnumerable<Organisation> */
            organisations?: components["schemas"]["Committees.Common.Responses.Common.Submission.Organisation"][] | null;
            submitterType?: components["schemas"]["Committees.Common.Enums.SubmitterType"];
            additionalContext?: string | null;
            /** Format: int32 */
            displayOrder?: number;
        };
        "Committees.Common.Responses.Common.People.Attendee": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            personId?: number | null;
            name?: string | null;
            photoUrl?: string | null;
            memberInfo?: components["schemas"]["Committees.Common.Responses.Common.People.MemberInfo"];
            /** Nullable<Boolean> */
            layMember?: boolean | null;
            remoteAttendance?: components["schemas"]["Committees.Common.Responses.Common.Activity.RemoteAttendance"];
        };
        "Committees.Common.Responses.Common.People.CommitteeMemberRole": {
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
            role?: components["schemas"]["Committees.Common.Responses.Common.People.Role"];
            exOfficio?: boolean;
            alternate?: boolean;
            coOpted?: boolean;
        };
        "Committees.Common.Responses.Common.People.MemberInfo": {
            memberFrom?: string | null;
            party?: string | null;
            partyColour?: string | null;
            /** Format: int32 */
            mnisId?: number;
            isChair?: boolean;
            listAs?: string | null;
            displayAs?: string | null;
            fullTitle?: string | null;
            addressAs?: string | null;
            house?: components["schemas"]["Committees.Common.Enums.House"];
            /** Nullable<Boolean> */
            isCurrent?: boolean | null;
        };
        "Committees.Common.Responses.Common.People.Role": {
            /**
             * Format: int32
             * @description The id of the role
             */
            id?: number;
            /** @description The role name */
            name?: string | null;
            roleType?: components["schemas"]["Committees.Common.Responses.Common.People.RoleType"];
            /** @description Is the role a chair */
            isChair?: boolean;
        };
        "Committees.Common.Responses.Common.People.RoleType": {
            /**
             * Format: int32
             * @description The id of the role type
             */
            id?: number;
            /** @description The Name of the role type */
            name?: string | null;
        };
        "Committees.Common.Responses.Common.People.Submitter": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            personId?: number | null;
            name?: string | null;
            photoUrl?: string | null;
            memberInfo?: components["schemas"]["Committees.Common.Responses.Common.People.MemberInfo"];
            /** IEnumerable<Organisation> */
            organisations?: components["schemas"]["Committees.Common.Responses.Common.Submission.Organisation"][] | null;
            submitterType?: components["schemas"]["Committees.Common.Enums.SubmitterType"];
            additionalContext?: string | null;
        };
        "Committees.Common.Responses.Common.Publication.GovernmentResponse": {
            /**
             * IEnumerable<PublicationSummary>
             * @description Publication for government response
             */
            publication?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationSummary"][] | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Deadline for response
             */
            responseDeadline?: string | null;
            /** @description If the response is expected */
            responseExcepted?: boolean;
        };
        "Committees.Common.Responses.Common.Publication.PublicationSummary": {
            /** @description Description of publication */
            description?: string | null;
            /**
             * Format: int32
             * @description The id of the publication
             */
            id?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date when publication can be published from
             */
            publicationStartDate?: string | null;
            governmentResponses?: components["schemas"]["Committees.Common.Responses.Common.Publication.GovernmentResponse"];
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date when publication can be published until
             */
            publicationEndDate?: string | null;
            /**
             * IEnumerable<Document>
             * @description Documents associated with the publication
             */
            documents?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"][] | null;
            hcNumber?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            hlPaper?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            type?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"];
            /**
             * Nullable<Int32>
             * Format: int32
             * @description If publication is in response to another publication, that publication's id
             */
            responseToPublicationId?: number | null;
            /** @description Url to additional content related to the publication */
            additionalContentUrl?: string | null;
            /** @description Url2 for additional content related to the publication */
            additionalContentUrl2?: string | null;
            respondingDepartment?: components["schemas"]["Committees.Common.Responses.Common.Department"];
        };
        "Committees.Common.Responses.Common.Publication.PublicationType": {
            /**
             * Format: int32
             * @description The id of the publication type
             */
            id?: number;
            /** @description The name of the publication type */
            name?: string | null;
            /** @description The description of the publication type */
            description?: string | null;
            /** @description Indicates that the government can respond to this type of publication */
            governmentCanRespond?: boolean;
            /** @description Indicates that publications of this type can be responses to other publications. */
            canBeResponse?: boolean;
            /** @description Icon type to be rendered on the website for this type of publication */
            iconKey?: string | null;
            /** @description Plural form of the publication type name */
            pluralVersion?: string | null;
        };
        "Committees.Common.Responses.Common.Shared.Address": {
            addressLine1?: string | null;
            addressLine2?: string | null;
            addressLine3?: string | null;
            addressLine4?: string | null;
            addressLine5?: string | null;
            postcode?: string | null;
        };
        "Committees.Common.Responses.Common.Shared.Banner": {
            desktopBanner?: components["schemas"]["Committees.Common.Responses.Common.Shared.File"];
            mobileBanner?: components["schemas"]["Committees.Common.Responses.Common.Shared.File"];
        };
        "Committees.Common.Responses.Common.Shared.ContactInformation": {
            /** @description Current contact email */
            email?: string | null;
            /** @description Telephone number */
            phone?: string | null;
            /** @description Postal address */
            address?: string | null;
            /** @description Disclaimer for contact information */
            contactDisclaimer?: string | null;
        };
        "Committees.Common.Responses.Common.Shared.ContentLink": {
            /** @description Title of the content link */
            title?: string | null;
            /** @description Url of the content link */
            url?: string | null;
            /** @description Description of the content link */
            description?: string | null;
            /**
             * Format: int32
             * @description Order to display the content link
             */
            displayOrder?: number;
        };
        "Committees.Common.Responses.Common.Shared.File": {
            fileName?: string | null;
            /** Format: byte */
            fileData?: string | null;
        };
        "Committees.Common.Responses.Common.Shared.HouseNumber": {
            number?: string | null;
            /** Format: int32 */
            sessionId?: number;
            sessionDescription?: string | null;
        };
        "Committees.Common.Responses.Common.Shared.Links": {
            url?: string | null;
            description?: string | null;
        };
        "Committees.Common.Responses.Common.Submission.HybridBillPetition": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            publicationDate?: string | null;
            /** IEnumerable<Submitter> */
            witnesses?: components["schemas"]["Committees.Common.Responses.Common.People.Submitter"][] | null;
            document?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"];
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** Format: uuid */
            submissionId?: string;
            internalReference?: string | null;
            /** Format: date-time */
            createdDate?: string;
            committeeBusiness?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"];
            hcNumber?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            outcome?: components["schemas"]["Committees.Common.Responses.Common.Submission.HybridBillPetitionOutcome"];
        };
        "Committees.Common.Responses.Common.Submission.HybridBillPetitionOutcome": {
            /** Format: int32 */
            id?: number;
            outcomeText?: string | null;
        };
        "Committees.Common.Responses.Common.Submission.OralEvidence": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            publicationDate?: string | null;
            /** IEnumerable<Submitter> */
            witnesses?: components["schemas"]["Committees.Common.Responses.Common.People.Submitter"][] | null;
            document?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"];
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /**
             * Format: int32
             * @description The id of the activity
             */
            activityId?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description The date of the meeting
             */
            meetingDate?: string | null;
            /**
             * Format: date-time
             * @description The datetime the activity starts
             */
            activityStartDate?: string;
            legacyHtmlUrl?: string | null;
            legacyPdfUrl?: string | null;
            /**
             * IEnumerable<CommitteeBusinessSummary>
             * @description Associated committee businesses
             */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<HouseNumber> */
            hcNumbers?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"][] | null;
        };
        "Committees.Common.Responses.Common.Submission.Organisation": {
            name?: string | null;
            role?: string | null;
            idmsId?: string | null;
            /** Format: int32 */
            cisId?: number;
        };
        "Committees.Common.Responses.Common.Submission.SubmissionPeriodSummary": {
            /**
             * Format: int32
             * @description Id of the submission period
             */
            id?: number;
            /**
             * Format: date-time
             * @description Submission period start date
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Submission period end date
             */
            endDate?: string | null;
            submissionType?: components["schemas"]["Committees.Common.Enums.SubmissionType"];
            /** @description Whether the submission period should be promoted or not. */
            isPromoted?: boolean;
            /** @description The status message of the submission period (if applicable). */
            statusMessage?: string | null;
            /** @description Whether submissions are allowed past the deadline if the form is accessed via direct link. */
            allowSubmissionsPastEndDate?: boolean;
        };
        "Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateDetails": {
            /** Format: int32 */
            id?: number;
            description?: string | null;
            defaultForSubmissionPeriod?: boolean;
            document?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"];
            /** IEnumerable<SubmissionPeriodTemplateRouteDetails> */
            submissionPeriodTemplateRoutes?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateRouteDetails"][] | null;
            /** IEnumerable<SubmissionPeriodTemplateSubmitterTypeDetails> */
            submissionPeriodTemplateSubmitterTypes?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateSubmitterTypeDetails"][] | null;
        };
        "Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateRouteDetails": {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            submissionRoute?: number;
        };
        "Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateSubmitterTypeDetails": {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            submitterType?: number;
        };
        "Committees.Common.Responses.Common.Submission.WrittenEvidence": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            publicationDate?: string | null;
            /** IEnumerable<Submitter> */
            witnesses?: components["schemas"]["Committees.Common.Responses.Common.People.Submitter"][] | null;
            document?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"];
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** Format: uuid */
            submissionId?: string;
            internalReference?: string | null;
            committeeBusiness?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"];
            hcNumber?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            legacyHtmlUrl?: string | null;
            legacyPdfUrl?: string | null;
            /** @description If the Written Evidence is anonymous and that no submitter information is published */
            anonymous?: boolean;
            /** @description Text to display for anonymous witnesses */
            anonymousWitnessText?: string | null;
        };
        "Committees.Common.Responses.Country": {
            /** Format: int32 */
            id?: number;
            isoCode?: string | null;
            text?: string | null;
            /** Format: int32 */
            displayOrder?: number;
        };
        "Committees.Common.Responses.DocumentFileDetail": {
            fileName?: string | null;
            /**
             * Nullable<Int64>
             * Format: int64
             */
            fileSize?: number | null;
            fileDataFormat?: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            url?: string | null;
            /** Format: byte */
            data?: string | null;
        };
        "Committees.Common.Responses.EventActivities": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            cancelledDate?: string | null;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            locationId?: number | null;
            location?: string | null;
            eventType?: components["schemas"]["Committees.Common.Responses.Common.Events.EventTypeDetails"];
            eventSource?: string | null;
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** IEnumerable<CommitteeBusinessSummary> */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<EventSummary> */
            childEvents?: components["schemas"]["Committees.Common.Responses.Common.Events.EventSummary"][] | null;
            nextActivity?: components["schemas"]["Committees.Common.Responses.ActivityDetails"];
            /** IEnumerable<ActivitySummary> */
            activities?: components["schemas"]["Committees.Common.Responses.Common.Activity.ActivitySummary"][] | null;
        };
        "Committees.Common.Responses.EventAttendanceDetails": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            cancelledDate?: string | null;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            locationId?: number | null;
            location?: string | null;
            eventType?: components["schemas"]["Committees.Common.Responses.Common.Events.EventTypeDetails"];
            eventSource?: string | null;
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** IEnumerable<CommitteeBusinessSummary> */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<EventSummary> */
            childEvents?: components["schemas"]["Committees.Common.Responses.Common.Events.EventSummary"][] | null;
            nextActivity?: components["schemas"]["Committees.Common.Responses.ActivityDetails"];
            /** IEnumerable<ActivityDetails> */
            activities?: components["schemas"]["Committees.Common.Responses.ActivityDetails"][] | null;
            /** IEnumerable<Attendee> */
            membersAttended?: components["schemas"]["Committees.Common.Responses.Common.People.Attendee"][] | null;
            /** IEnumerable<Attendee> */
            othersAttended?: components["schemas"]["Committees.Common.Responses.Common.People.Attendee"][] | null;
        };
        "Committees.Common.Responses.EventDetails": {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            endDate?: string | null;
            /**
             * Nullable<DateTime>
             * Format: date-time
             */
            cancelledDate?: string | null;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            locationId?: number | null;
            location?: string | null;
            eventType?: components["schemas"]["Committees.Common.Responses.Common.Events.EventTypeDetails"];
            eventSource?: string | null;
            /** IEnumerable<CommitteeSummary> */
            committees?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"][] | null;
            /** IEnumerable<CommitteeBusinessSummary> */
            committeeBusinesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            /** IEnumerable<EventSummary> */
            childEvents?: components["schemas"]["Committees.Common.Responses.Common.Events.EventSummary"][] | null;
            nextActivity?: components["schemas"]["Committees.Common.Responses.ActivityDetails"];
            /** IEnumerable<ActivityDetails> */
            activities?: components["schemas"]["Committees.Common.Responses.ActivityDetails"][] | null;
            primaryDescription?: string | null;
            secondaryDescription?: string | null;
            parliamentTvUrl?: string | null;
        };
        "Committees.Common.Responses.MemberFullMemberships": {
            /** Format: int32 */
            id?: number;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            personId?: number | null;
            name?: string | null;
            photoUrl?: string | null;
            memberInfo?: components["schemas"]["Committees.Common.Responses.Common.People.MemberInfo"];
            /** IEnumerable<MemberCommittee> */
            committees?: components["schemas"]["Committees.Common.Responses.Common.Committee.MemberCommittee"][] | null;
        };
        "Committees.Common.Responses.MessagingBannerDetails": {
            /** Format: int32 */
            id?: number;
            location?: string | null;
            content?: string | null;
            displayType?: string | null;
        };
        "Committees.Common.Responses.Publication": {
            /** @description Description of publication */
            description?: string | null;
            /**
             * Format: int32
             * @description The id of the publication
             */
            id?: number;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date when publication can be published from
             */
            publicationStartDate?: string | null;
            governmentResponses?: components["schemas"]["Committees.Common.Responses.Common.Publication.GovernmentResponse"];
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Date when publication can be published until
             */
            publicationEndDate?: string | null;
            /**
             * IEnumerable<Document>
             * @description Documents associated with the publication
             */
            documents?: components["schemas"]["Committees.Common.Responses.Common.Document.Document"][] | null;
            hcNumber?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            hlPaper?: components["schemas"]["Committees.Common.Responses.Common.Shared.HouseNumber"];
            type?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"];
            /**
             * Nullable<Int32>
             * Format: int32
             * @description If publication is in response to another publication, that publication's id
             */
            responseToPublicationId?: number | null;
            /** @description Url to additional content related to the publication */
            additionalContentUrl?: string | null;
            /** @description Url2 for additional content related to the publication */
            additionalContentUrl2?: string | null;
            respondingDepartment?: components["schemas"]["Committees.Common.Responses.Common.Department"];
            /**
             * IEnumerable<CommitteeBusinessSummary>
             * @description Committee business associated with the publication
             */
            businesses?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"][] | null;
            committee?: components["schemas"]["Committees.Common.Responses.CommitteeSummary"];
        };
        "Committees.Common.Responses.PublicationGroup": {
            /** Format: int32 */
            total?: number;
            publicationType?: components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"];
        };
        "Committees.Common.Responses.ScrutinisingDepartment": {
            /**
             * Format: int32
             * @description The Id of the department which this committee scrutinises
             */
            departmentId?: number;
            /** @description The name of the department which this committee scrutinises */
            name?: string | null;
        };
        "Committees.Common.Responses.SubmissionPeriodDetails": {
            /**
             * Format: int32
             * @description Id of the submission period
             */
            id?: number;
            /**
             * Format: date-time
             * @description Submission period start date
             */
            startDate?: string;
            /**
             * Nullable<DateTime>
             * Format: date-time
             * @description Submission period end date
             */
            endDate?: string | null;
            submissionType?: components["schemas"]["Committees.Common.Enums.SubmissionType"];
            /** @description Whether the submission period should be promoted or not. */
            isPromoted?: boolean;
            /** @description The status message of the submission period (if applicable). */
            statusMessage?: string | null;
            /** @description Whether submissions are allowed past the deadline if the form is accessed via direct link. */
            allowSubmissionsPastEndDate?: boolean;
            committeeBusiness?: components["schemas"]["Committees.Common.Responses.CommitteeBusinessSummary"];
            description?: string | null;
            detail?: string | null;
            /** IEnumerable<SubmissionPeriodTemplateDetails> */
            submissionPeriodTemplates?: components["schemas"]["Committees.Common.Responses.Common.Submission.SubmissionPeriodTemplateDetails"][] | null;
        };
        /** @enum {string} */
        "Committees.Services.Domain.BannerLocation": "HomePage" | "FindACommitteePage" | "CommonsCommitteeDetailsPage" | "LordsCommitteeDetailsPage" | "JointCommitteeDetailsPage" | "FindAnInquiryPage" | "FindAPublicationPage" | "FormerCommitteesSearchPage";
        "Microsoft.AspNetCore.Mvc.ProblemDetails": {
            type?: string | null;
            title?: string | null;
            /**
             * Nullable<Int32>
             * Format: int32
             */
            status?: number | null;
            detail?: string | null;
            instance?: string | null;
        } & {
            [key: string]: unknown;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    GetBillPetitions: {
        parameters: {
            query?: {
                /** @description List of evidence related to a committee business with the committee business id */
                CommitteeBusinessId?: number;
                /** @description List of evidence related to a committee with the committee id */
                CommitteeId?: number;
                /** @description Search by witness names, organisation names, and submission identifiers (where applicable). Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of evidence published on or after date provided */
                StartDate?: string;
                /** @description List of evidence published on or before date provided */
                EndDate?: string;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.HybridBillPetition]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.HybridBillPetition]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.HybridBillPetition]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetBillPetitionById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Bill petition with ID specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Submission.HybridBillPetition"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Submission.HybridBillPetition"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Submission.HybridBillPetition"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetBillPetitionDocument: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Petition Id of the document return */
                id: number;
                /** @description Type of file to return */
                fileDataFormat: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "application/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "text/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    Get: {
        parameters: {
            query: {
                /** @description Get meetings from and including this date, format 'yyyy-mm-dd'. */
                FromDate: string;
                /** @description Get meetings up to and including this date, format 'yyyy-mm-dd'. */
                ToDate: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Activities for event with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.CommitteeMeetingForBroadcasters"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.CommitteeMeetingForBroadcasters"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.CommitteeMeetingForBroadcasters"][];
                };
            };
            /** @description No event with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommitteeBusiness: {
        parameters: {
            query?: {
                /** @description Search by committee business name. Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description Id for the related committee */
                CommitteeId?: number;
                /** @description List of committee business starting on or after date provided */
                DateFrom?: string;
                /** @description List of committee business opened on or before date provided */
                DateTo?: string;
                /** @description Id for committee business type */
                BusinessTypeId?: number;
                /** @description List of committees business by status */
                Status?: components["schemas"]["Committees.Common.Enums.CommitteeBusinessStatus"];
                /** @description Limit to committee businesses that are currently accepting hybrid or private bill petitions */
                CurrentlyAcceptingPetitions?: boolean;
                /** @description Limit to committee businesses that are currently accepting written evidence submissions */
                CurrentlyAcceptingEvidence?: boolean;
                /** @description List committee business by specified sort order */
                SortOrder?: components["schemas"]["Committees.Common.Enums.CommitteeBusinessQuerySortOrder"];
                /** @description List of committee businesses by Ids */
                CommitteeBusinessIds?: number[];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of committee businesses matching the specified search parameters */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeBusinessSummary]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeBusinessSummary]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeBusinessSummary]"];
                };
            };
            /** @description There was an error with one or more of specified search parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommitteeBusinessById: {
        parameters: {
            query?: {
                /** @description Include banner image file in result - defaults to false */
                includeBanners?: boolean;
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Committee business Id to return */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Committee business with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.CommitteeBusinessDetails"];
                    "application/json": components["schemas"]["Committees.Common.Responses.CommitteeBusinessDetails"];
                    "text/json": components["schemas"]["Committees.Common.Responses.CommitteeBusinessDetails"];
                };
            };
            /** @description No Committee business with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteeBusinessPublicationGroups: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The committee business id */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteeBusinessTypes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Business.CommitteeBusinessType"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Business.CommitteeBusinessType"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Business.CommitteeBusinessType"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteeTypes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Committee.CommitteeType"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommittees: {
        parameters: {
            query?: {
                /** @description List of committees by committee business */
                CommitteeBusinessId?: number;
                /** @description Search by committee name. Performs a full text search across committee names (including historic), as well as any metadata configured for the committee. */
                SearchTerm?: string;
                /** @description List of committees by child committees of a parent */
                ParentCommitteeId?: number;
                /** @description List of committees by status - defaults to current */
                CommitteeStatus?: components["schemas"]["Committees.Common.Enums.CommitteeStatus"];
                /** @description List of committees by the type */
                CommitteeTypeId?: number;
                /** @description List of committees by category */
                CommitteeCategory?: components["schemas"]["Committees.Common.Enums.CommitteeCategory"];
                /** @description List of committees by House */
                House?: components["schemas"]["Committees.Common.Enums.House"];
                /** @description List of committees by Ids */
                CommitteeIds?: number[];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeSummary]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeSummary]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeSummary]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetNextEventForCommittees: {
        parameters: {
            query?: {
                /** @description Only returns events with valid activities - defaults to false */
                EventWithActivitiesOnly?: boolean;
                /** @description Date from which upcoming event is to be calculated */
                EventFromDate?: string;
                /** @description House of committee */
                House?: components["schemas"]["Committees.Common.Enums.House"];
                /** @description List of event activities with the specified event type */
                EventTypes?: number[];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommitteeById: {
        parameters: {
            query?: {
                /** @description Include banner image file in result - defaults to false */
                includeBanners?: boolean;
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Committee with ID specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.CommitteeDetails"];
                    "application/json": components["schemas"]["Committees.Common.Responses.CommitteeDetails"];
                    "text/json": components["schemas"]["Committees.Common.Responses.CommitteeDetails"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetEventsCommitteeById: {
        parameters: {
            query?: {
                /** @description List of events related to a committee business */
                CommitteeBusinessId?: number;
                /** @description List of events containing the search term specified. Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of events starting after the date provided */
                StartDateFrom?: string;
                /** @description List of events starting before the date provided */
                StartDateTo?: string;
                /** @description List of events ending after the date provided */
                EndDateFrom?: string;
                /** @description List of events with committees pertaining to the house specified */
                House?: components["schemas"]["Committees.Common.Enums.House"];
                /** @description List of events with the location id specified */
                LocationId?: number;
                /** @description Exclude cancelled events from the response */
                ExcludeCancelledEvents?: boolean;
                /** @description Sort by start date ascending */
                SortAscending?: boolean;
                /** @description List of events with the specified event type */
                EventTypeId?: number;
                /** @description Include the events attendees in the response (it's a little more expensive to do so) */
                IncludeEventAttendees?: boolean;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path: {
                /** @description Committee with id specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteeMemberships: {
        parameters: {
            query?: {
                /** @description List of committee members' memberships by status */
                MembershipStatus?: components["schemas"]["Committees.Common.Enums.MembershipStatus"];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path: {
                /** @description The committee id */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommitteePersonPhoto: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The committee id */
                id: number;
                /** @description Id of the lay member */
                personId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteeStaffMemberships: {
        parameters: {
            query?: {
                /** @description List of committee staff by status */
                MembershipStatus?: components["schemas"]["Committees.Common.Enums.MembershipStatus"];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path: {
                /** @description The committee id */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.CommitteeMember]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListCommitteePublicationGroups: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The committee id */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.PublicationGroup"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetCommitteeArchivedPublicationLinks: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Committee Id specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.ArchivedPublicationGroup"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.ArchivedPublicationGroup"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.ArchivedPublicationGroup"][];
                };
            };
        };
    };
    GetCountries: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of Countries */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Country"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.Country"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.Country"][];
                };
            };
        };
    };
    GetEvents: {
        parameters: {
            query?: {
                /** @description Return a list of events for the committee ID specified */
                CommitteeId?: number;
                /** @description Return a list of events for the committee Business ID specified */
                CommitteeBusinessId?: number;
                /** @description Return child events as a property of its parent event - defaults to false */
                GroupChildEventsWithParent?: boolean;
                /** @description List of events containing the search term specified. Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of events starting after the date provided */
                StartDateFrom?: string;
                /** @description List of events starting before the date provided */
                StartDateTo?: string;
                /** @description List of events ending after the date provided */
                EndDateFrom?: string;
                /** @description List of events with committees pertaining to the house specified */
                House?: components["schemas"]["Committees.Common.Enums.House"];
                /** @description List of events with the location id specified */
                LocationId?: number;
                /** @description Exclude cancelled events from the response */
                ExcludeCancelledEvents?: boolean;
                /** @description Sort by start date ascending */
                SortAscending?: boolean;
                /** @description List of events with the specified event type */
                EventTypeId?: number;
                /** @description Include the events attendees in the response (it's a little more expensive to do so) */
                IncludeEventAttendees?: boolean;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of events matching the specified search parameters */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Events.EventSummary]"];
                };
            };
            /** @description There was an error with one or more of specified search parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetEventActivities: {
        parameters: {
            query?: {
                /** @description Return a list of attendees with each activity - defaults to false */
                IncludeActivityAttendees?: boolean;
                /** @description Return a list of events for the committee ID specified */
                CommitteeId?: number;
                /** @description Return a list of events for the committee Business ID specified */
                CommitteeBusinessId?: number;
                /** @description Return child events as a property of its parent event - defaults to false */
                GroupChildEventsWithParent?: boolean;
                /** @description List of events containing the search term specified. Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of events starting after the date provided */
                StartDateFrom?: string;
                /** @description List of events starting before the date provided */
                StartDateTo?: string;
                /** @description List of events ending after the date provided */
                EndDateFrom?: string;
                /** @description List of events with committees pertaining to the house specified */
                House?: components["schemas"]["Committees.Common.Enums.House"];
                /** @description List of events with the location id specified */
                LocationId?: number;
                /** @description Exclude cancelled events from the response */
                ExcludeCancelledEvents?: boolean;
                /** @description Sort by start date ascending */
                SortAscending?: boolean;
                /** @description List of events with the specified event type */
                EventTypeId?: number;
                /** @description Include the events attendees in the response (it's a little more expensive to do so) */
                IncludeEventAttendees?: boolean;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of events with activities matching the specified search parameters */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.EventActivities]"];
                };
            };
            /** @description There was an error with one or more of specified search parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetEventById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Event Id to return */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Event with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.EventDetails"];
                    "application/json": components["schemas"]["Committees.Common.Responses.EventDetails"];
                    "text/json": components["schemas"]["Committees.Common.Responses.EventDetails"];
                };
            };
            /** @description No event with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetAttendancesById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Event Id to return attendance for */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Attendance for event with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.EventAttendanceDetails"];
                    "application/json": components["schemas"]["Committees.Common.Responses.EventAttendanceDetails"];
                    "text/json": components["schemas"]["Committees.Common.Responses.EventAttendanceDetails"];
                };
            };
            /** @description No event with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetActivitiesById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Event Id to return activities for */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Activities for event with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.ActivityDetails"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.ActivityDetails"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.ActivityDetails"][];
                };
            };
            /** @description No event with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListMembersCommitteeMemberships: {
        parameters: {
            query: {
                /** @description List of member ids to filter by */
                Members: number[];
                /** @description List of committee members' memberships by status */
                MembershipStatus?: components["schemas"]["Committees.Common.Enums.MembershipStatus"];
                /** @description List of committee members' memberships by committee category */
                CommitteeCategory?: components["schemas"]["Committees.Common.Enums.CommitteeCategory"];
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.MemberFullMemberships"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.MemberFullMemberships"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.MemberFullMemberships"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    Banners: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Location of banner to return */
                location: components["schemas"]["Committees.Services.Domain.BannerLocation"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of banners matching criteria */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.MessagingBannerDetails"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.MessagingBannerDetails"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.MessagingBannerDetails"][];
                };
            };
            /** @description No banners matching criteria exist */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetOralEvidence: {
        parameters: {
            query?: {
                /** @description List of evidence related to a committee business with the committee business id */
                CommitteeBusinessId?: number;
                /** @description List of evidence related to a committee with the committee id */
                CommitteeId?: number;
                /** @description Search by witness names, organisation names, and submission identifiers (where applicable). Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of evidence published on or after date provided */
                StartDate?: string;
                /** @description List of evidence published on or before date provided */
                EndDate?: string;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.OralEvidence]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.OralEvidence]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.OralEvidence]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetOralEvidenceById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Oral Evidence with ID specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Submission.OralEvidence"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Submission.OralEvidence"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Submission.OralEvidence"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetOralEvidenceDocument: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Oral Evidence Id of the document return */
                id: number;
                /** @description Type of file to return */
                fileDataFormat: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "application/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "text/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    ListPublicationTypes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"][];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"][];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Publication.PublicationType"][];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetPublications: {
        parameters: {
            query?: {
                /** @description Ids for types of publications */
                PublicationTypeIds?: number[];
                /** @description Search by publication description, metadata, and paper number (where applicable). Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of publications published on or after date provided */
                StartDate?: string;
                /** @description List of publications published on or before date provided */
                EndDate?: string;
                /** @description List publications by specified sort order */
                SortOrder?: components["schemas"]["Committees.Common.Enums.PublicationQuerySortOrder"];
                /** @description List of publications by specfied paper numbers */
                PaperNumbers?: string[];
                /** @description List of publications related to a committee business with the committee business id */
                CommitteeBusinessId?: number;
                /** @description List of publications related to a committee with the committee id */
                CommitteeId?: number;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of publications matching the specified search parameters */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Publication]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Publication]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Publication]"];
                };
            };
            /** @description There was an error with one or more of specified search parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetPublicationById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Publication Id to return */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Publication with given Id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Publication"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Publication"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Publication"];
                };
            };
            /** @description No Publication with given Id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetDocument: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Publication Id to return */
                id: number;
                /** @description Document Id to return */
                documentId: number;
                /** @description Type of file to return */
                fileDataFormat: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Document and its data with given Ids */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description One of the parameters supplied is invalid */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetSubmissionPeriodTemplateDocumentById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Submission period template id to return */
                id: number;
                /** @description Document id to return */
                documentId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Submission period template document with given parameters */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Document.DocumentFile"];
                };
            };
            /** @description No submission period template with given parameters exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetSubmissionPeriodById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Submission period id to return */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Submission period with given id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.SubmissionPeriodDetails"];
                    "application/json": components["schemas"]["Committees.Common.Responses.SubmissionPeriodDetails"];
                    "text/json": components["schemas"]["Committees.Common.Responses.SubmissionPeriodDetails"];
                };
            };
            /** @description No submission period with given id exists */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetWrittenEvidence: {
        parameters: {
            query?: {
                /** @description List of evidence related to a committee business with the committee business id */
                CommitteeBusinessId?: number;
                /** @description List of evidence related to a committee with the committee id */
                CommitteeId?: number;
                /** @description Search by witness names, organisation names, and submission identifiers (where applicable). Must be 2 characters or more. */
                SearchTerm?: string;
                /** @description List of evidence published on or after date provided */
                StartDate?: string;
                /** @description List of evidence published on or before date provided */
                EndDate?: string;
                /** @description Only return committee website results - defaults to true */
                ShowOnWebsiteOnly?: boolean;
                /** @description Numbers of items to skip - defaults to 0 */
                Skip?: number;
                /** @description Number of items to be returned - defaults to 30 */
                Take?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.WrittenEvidence]"];
                    "application/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.WrittenEvidence]"];
                    "text/json": components["schemas"]["Committees.Common.ResourceCollection`1[Committees.Common.Responses.Common.Submission.WrittenEvidence]"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetWrittenEvidenceById: {
        parameters: {
            query?: {
                /** @description Only return committee website results - defaults to true */
                showOnWebsiteOnly?: boolean;
            };
            header?: never;
            path: {
                /** @description Written Evidence with the Id specified */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.Common.Submission.WrittenEvidence"];
                    "application/json": components["schemas"]["Committees.Common.Responses.Common.Submission.WrittenEvidence"];
                    "text/json": components["schemas"]["Committees.Common.Responses.Common.Submission.WrittenEvidence"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
    GetWrittenEvidenceDocument: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Evidence Id of the document return */
                id: number;
                /** @description Type of file to return */
                fileDataFormat: components["schemas"]["Committees.Common.Enums.FileDataFormat"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "application/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                    "text/json": components["schemas"]["Committees.Common.Responses.DocumentFileDetail"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "application/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                    "text/json": components["schemas"]["Microsoft.AspNetCore.Mvc.ProblemDetails"];
                };
            };
        };
    };
}

