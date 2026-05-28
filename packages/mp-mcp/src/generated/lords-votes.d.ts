/* Auto-generated from https://lordsvotes-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/data/Divisions/{divisionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return a Division
         * @description Get a single Division which has the Id specified.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Division with ID specified */
                    divisionId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Division with id matching given divisionId */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DivisionViewModel"];
                        "application/json": components["schemas"]["DivisionViewModel"];
                        "text/json": components["schemas"]["DivisionViewModel"];
                    };
                };
                /** @description divisionId was not valid */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Division with given divisionId was not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Temporary error occured when trying to get division */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/Divisions/searchTotalResults": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return total results count
         * @description Get total count of Divisions meeting the specified query, useful for paging lists etc...
         */
        get: {
            parameters: {
                query?: {
                    SearchTerm?: string;
                    MemberId?: number;
                    IncludeWhenMemberWasTeller?: boolean;
                    StartDate?: string;
                    EndDate?: string;
                    DivisionNumber?: number;
                    "TotalVotesCast.Comparator"?: components["schemas"]["Comparators"];
                    "TotalVotesCast.ValueToCompare"?: number;
                    "Majority.Comparator"?: components["schemas"]["Comparators"];
                    "Majority.ValueToCompare"?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Division with id matching given divisionId */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": number;
                        "application/json": number;
                        "text/json": number;
                    };
                };
                /** @description divisionId was not valid */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/Divisions/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return a list of Divisions
         * @description Get a list of Divisions which meet the specified criteria.
         */
        get: {
            parameters: {
                query?: {
                    SearchTerm?: string;
                    MemberId?: number;
                    IncludeWhenMemberWasTeller?: boolean;
                    StartDate?: string;
                    EndDate?: string;
                    DivisionNumber?: number;
                    "TotalVotesCast.Comparator"?: components["schemas"]["Comparators"];
                    "TotalVotesCast.ValueToCompare"?: number;
                    "Majority.Comparator"?: components["schemas"]["Comparators"];
                    "Majority.ValueToCompare"?: number;
                    /** @description The number of records to skip. Must be a positive integer. Default is 0 */
                    skip?: number;
                    /** @description The number of records to return per page. Must be more than 0. Default is 25 */
                    take?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of divisions matching specified parameters */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DivisionViewModel"][];
                        "application/json": components["schemas"]["DivisionViewModel"][];
                        "text/json": components["schemas"]["DivisionViewModel"][];
                    };
                };
                /** @description A parameter was not valid */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Temporary error occured when trying to get division */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/Divisions/membervoting": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return voting records for a Member
         * @description Get a list of voting records for a Member.
         */
        get: {
            parameters: {
                query: {
                    MemberId: number;
                    SearchTerm?: string;
                    IncludeWhenMemberWasTeller?: boolean;
                    StartDate?: string;
                    EndDate?: string;
                    DivisionNumber?: number;
                    "TotalVotesCast.Comparator"?: components["schemas"]["Comparators"];
                    "TotalVotesCast.ValueToCompare"?: number;
                    "Majority.Comparator"?: components["schemas"]["Comparators"];
                    "Majority.ValueToCompare"?: number;
                    /** @description The number of records to skip. Must be a positive integer. Default is 0 */
                    skip?: number;
                    /** @description The number of records to return per page. Must be more than 0. Default is 25 */
                    take?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of voting records for a member */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["MemberVotingRecordViewModel"];
                        "application/json": components["schemas"]["MemberVotingRecordViewModel"];
                        "text/json": components["schemas"]["MemberVotingRecordViewModel"];
                    };
                };
                /** @description A parameter was not valid */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Temporary error occured when trying to get division */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/Divisions/groupedbyparty": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return Divisions results grouped by party
         * @description Get a list of Divisions which contain grouped by party
         */
        get: {
            parameters: {
                query?: {
                    SearchTerm?: string;
                    MemberId?: number;
                    IncludeWhenMemberWasTeller?: boolean;
                    StartDate?: string;
                    EndDate?: string;
                    DivisionNumber?: number;
                    "TotalVotesCast.Comparator"?: components["schemas"]["Comparators"];
                    "TotalVotesCast.ValueToCompare"?: number;
                    "Majority.Comparator"?: components["schemas"]["Comparators"];
                    "Majority.ValueToCompare"?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of divisions with votes grouped by party */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DivisionGroupByPartyViewModel"];
                        "application/json": components["schemas"]["DivisionGroupByPartyViewModel"];
                        "text/json": components["schemas"]["DivisionGroupByPartyViewModel"];
                    };
                };
                /** @description A parameter was not valid */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
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
        Comparators: "LessThan" | "LessThanOrEqualTo" | "EqualTo" | "GreaterThanOrEqualTo" | "GreaterThan";
        DivisionGroupByPartyViewModel: {
            /** Format: int32 */
            divisionId?: number;
            /** Format: int32 */
            number?: number;
            title?: string | null;
            /** Format: date-time */
            date?: string;
            /** Format: int32 */
            readonly contentCount?: number;
            /** Format: int32 */
            readonly notContentCount?: number;
            content?: components["schemas"]["PartyVoteResultViewModel"][] | null;
            notContent?: components["schemas"]["PartyVoteResultViewModel"][] | null;
        };
        DivisionViewModel: {
            /** Format: int32 */
            divisionId?: number;
            /** Format: date-time */
            date?: string;
            /** Format: int32 */
            number?: number;
            notes?: string | null;
            title?: string | null;
            isWhipped?: boolean;
            isGovernmentContent?: boolean;
            /**
             * Format: int32
             * @description Authoritative content count is the official count. This is the teller content count when tellers are present, but member content count when there are no tellers.
             */
            authoritativeContentCount?: number;
            /**
             * Format: int32
             * @description Authoritative not content count is the official count. This is the teller not content count when tellers are present, but member not content count when there are no tellers.
             */
            authoritativeNotContentCount?: number;
            /** @description Whether the division had tellers or not */
            divisionHadTellers?: boolean;
            /**
             * Format: int32
             * @description Content count is count recorded by the tellers
             */
            tellerContentCount?: number;
            /**
             * Format: int32
             * @description Not Content count recorded by the tellers
             */
            tellerNotContentCount?: number;
            /**
             * Format: int32
             * @description Member content count is the total tally of all members that voted content
             */
            memberContentCount?: number;
            /**
             * Format: int32
             * @description Member not content count is the total tally of all members that voted not content
             */
            memberNotContentCount?: number;
            /** Format: int32 */
            sponsoringMemberId?: number | null;
            isHouse?: boolean | null;
            isInquorate?: boolean;
            amendmentMotionNotes?: string | null;
            isGovernmentWin?: boolean | null;
            /** Format: date-time */
            remoteVotingStart?: string | null;
            /** Format: date-time */
            remoteVotingEnd?: string | null;
            divisionWasExclusivelyRemote?: boolean;
            contentTellers?: components["schemas"]["MemberViewModel"][] | null;
            notContentTellers?: components["schemas"]["MemberViewModel"][] | null;
            contents?: components["schemas"]["MemberViewModel"][] | null;
            notContents?: components["schemas"]["MemberViewModel"][] | null;
        };
        MemberViewModel: {
            /** Format: int32 */
            memberId?: number;
            name?: string | null;
            listAs?: string | null;
            memberFrom?: string | null;
            party?: string | null;
            partyColour?: string | null;
            partyAbbreviation?: string | null;
            partyIsMainParty?: boolean;
        };
        MemberVotingRecordViewModel: {
            /** Format: int32 */
            memberId?: number;
            memberWasContent?: boolean;
            memberWasTeller?: boolean;
            publishedDivision?: components["schemas"]["DivisionViewModel"];
        };
        PartyVoteResultViewModel: {
            partyName?: string | null;
            /** Format: int32 */
            voteCount?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

