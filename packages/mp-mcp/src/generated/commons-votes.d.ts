/* Auto-generated from https://commonsvotes-api.parliament.uk/swagger/docs/v1. Do not edit by hand. */
export interface paths {
    "/data/division/{divisionId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return a Division
         * @description Single Division which has the specified Id
         */
        get: operations["Divisions_GetDivisionById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/divisions.{format}/groupedbyparty": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return Divisions results grouped by party
         * @description Division results which meet the specified criteria grouped by parties
         */
        get: operations["Divisions_GetDivisionsGroupsByParty"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/divisions.{format}/membervoting": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return voting records for a Member
         * @description List of voting records for a member which meet the specified criteria.
         */
        get: operations["Divisions_GetVotingRecordsForMember"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/divisions.{format}/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return a list of Divisions
         * @description List of Divisions which meet the specified criteria
         */
        get: operations["Divisions_SearchDivisions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/divisions.{format}/searchTotalResults": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return total results count
         * @description Total count of Divisions meeting the specified criteria
         */
        get: operations["Divisions_SearchTotalResults"];
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
        PublishedDivision: {
            /** Format: int32 */
            DivisionId?: number;
            /** Format: date-time */
            Date?: string;
            /** Format: date-time */
            PublicationUpdated?: string;
            /** Format: int32 */
            Number?: number;
            IsDeferred?: boolean;
            EVELType?: string;
            EVELCountry?: string;
            Title?: string;
            /** Format: int32 */
            AyeCount?: number;
            /** Format: int32 */
            NoCount?: number;
            /** Format: int32 */
            DoubleMajorityAyeCount?: number;
            /** Format: int32 */
            DoubleMajorityNoCount?: number;
            AyeTellers?: components["schemas"]["RecordedMember"][];
            NoTellers?: components["schemas"]["RecordedMember"][];
            Ayes?: components["schemas"]["RecordedMember"][];
            Noes?: components["schemas"]["RecordedMember"][];
            FriendlyDescription?: string;
            FriendlyTitle?: string;
            NoVoteRecorded?: components["schemas"]["RecordedMember"][];
            /** Format: date-time */
            RemoteVotingStart?: string;
            /** Format: date-time */
            RemoteVotingEnd?: string;
        };
        RecordedMember: {
            /** Format: int32 */
            MemberId?: number;
            Name?: string;
            Party?: string;
            SubParty?: string;
            PartyColour?: string;
            PartyAbbreviation?: string;
            MemberFrom?: string;
            ListAs?: string;
            ProxyName?: string;
        };
        QueryParameters: {
            /** @description Divisions containing search term within title or number */
            SearchTerm?: string;
            /**
             * Format: int32
             * @description Divisions returning Member with Member ID voting records
             */
            MemberId?: number;
            /** @description Divisions where member was a teller as well as if they actually voted */
            IncludeWhenMemberWasTeller?: boolean;
            /**
             * Format: date-time
             * @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd
             */
            StartDate?: string;
            /**
             * Format: date-time
             * @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd
             */
            EndDate?: string;
            /**
             * Format: int32
             * @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint
             */
            DivisionNumber?: number;
        };
        DivisionGroupedByParty: {
            /** Format: int32 */
            DivisionId?: number;
            /** Format: int32 */
            Number?: number;
            Title?: string;
            /** Format: date-time */
            Date?: string;
            /** Format: int32 */
            AyeCount?: number;
            /** Format: int32 */
            NoCount?: number;
            /** @description Counts of all members who voted 'Aye', grouped by party */
            Ayes?: components["schemas"]["PartyVoteResult"][];
            /** @description Counts of all members who voted 'Noe', grouped by party */
            Noes?: components["schemas"]["PartyVoteResult"][];
        };
        PartyVoteResult: {
            PartyName?: string;
            /** Format: int32 */
            VoteCount?: number;
        };
        MemberSearchQueryParameters: {
            /**
             * Format: int32
             * @description Id number of a Member whose voting records are to be returned
             */
            MemberId: number;
            /**
             * Format: int32
             * @description The number of records to skip. Default is 0
             */
            Skip?: number;
            /**
             * Format: int32
             * @description The number of records to return per page. Default is 25
             */
            Take?: number;
            /** @description Divisions containing search term within title or number */
            SearchTerm?: string;
            /** @description Divisions where member was a teller as well as if they actually voted */
            IncludeWhenMemberWasTeller?: boolean;
            /**
             * Format: date-time
             * @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd
             */
            StartDate?: string;
            /**
             * Format: date-time
             * @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd
             */
            EndDate?: string;
            /**
             * Format: int32
             * @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint
             */
            DivisionNumber?: number;
        };
        MemberVotingRecord: {
            /** Format: int32 */
            MemberId?: number;
            MemberVotedAye?: boolean;
            MemberVotedNo?: boolean;
            MemberWasTeller?: boolean;
            PublishedDivision?: components["schemas"]["PublishedDivision"];
        };
        SearchQueryParameters: {
            /**
             * Format: int32
             * @description The number of records to skip. Default is 0
             */
            Skip?: number;
            /**
             * Format: int32
             * @description The number of records to return per page. Default is 25
             */
            Take?: number;
            /** @description Divisions containing search term within title or number */
            SearchTerm?: string;
            /**
             * Format: int32
             * @description Divisions returning Member with Member ID voting records
             */
            MemberId?: number;
            /** @description Divisions where member was a teller as well as if they actually voted */
            IncludeWhenMemberWasTeller?: boolean;
            /**
             * Format: date-time
             * @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd
             */
            StartDate?: string;
            /**
             * Format: date-time
             * @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd
             */
            EndDate?: string;
            /**
             * Format: int32
             * @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint
             */
            DivisionNumber?: number;
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
    Divisions_GetDivisionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id number of a Division whose records are to be returned */
                divisionId: number;
                /** @description xml or json */
                format: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublishedDivision"];
                    "text/json": components["schemas"]["PublishedDivision"];
                };
            };
            /** @description BadRequest */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description NotFound */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Divisions_GetDivisionsGroupsByParty: {
        parameters: {
            query?: {
                /** @description Divisions containing search term within title or number */
                "queryParameters.searchTerm"?: string;
                /** @description Divisions returning Member with Member ID voting records */
                "queryParameters.memberId"?: number;
                /** @description Divisions where member was a teller as well as if they actually voted */
                "queryParameters.includeWhenMemberWasTeller"?: boolean;
                /** @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd */
                "queryParameters.startDate"?: string;
                /** @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd */
                "queryParameters.endDate"?: string;
                /** @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint */
                "queryParameters.divisionNumber"?: number;
            };
            header?: never;
            path: {
                /** @description xml or json */
                format: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DivisionGroupedByParty"][];
                    "text/json": components["schemas"]["DivisionGroupedByParty"][];
                };
            };
            /** @description BadRequest */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Divisions_GetVotingRecordsForMember: {
        parameters: {
            query: {
                /** @description Id number of a Member whose voting records are to be returned */
                "queryParameters.memberId": number;
                /** @description The number of records to skip. Default is 0 */
                "queryParameters.skip"?: number;
                /** @description The number of records to return per page. Default is 25 */
                "queryParameters.take"?: number;
                /** @description Divisions containing search term within title or number */
                "queryParameters.searchTerm"?: string;
                /** @description Divisions where member was a teller as well as if they actually voted */
                "queryParameters.includeWhenMemberWasTeller"?: boolean;
                /** @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd */
                "queryParameters.startDate"?: string;
                /** @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd */
                "queryParameters.endDate"?: string;
                /** @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint */
                "queryParameters.divisionNumber"?: number;
            };
            header?: never;
            path: {
                /** @description xml or json */
                format: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MemberVotingRecord"][];
                    "text/json": components["schemas"]["MemberVotingRecord"][];
                };
            };
            /** @description BadRequest */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Divisions_SearchDivisions: {
        parameters: {
            query?: {
                /** @description The number of records to skip. Default is 0 */
                "queryParameters.skip"?: number;
                /** @description The number of records to return per page. Default is 25 */
                "queryParameters.take"?: number;
                /** @description Divisions containing search term within title or number */
                "queryParameters.searchTerm"?: string;
                /** @description Divisions returning Member with Member ID voting records */
                "queryParameters.memberId"?: number;
                /** @description Divisions where member was a teller as well as if they actually voted */
                "queryParameters.includeWhenMemberWasTeller"?: boolean;
                /** @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd */
                "queryParameters.startDate"?: string;
                /** @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd */
                "queryParameters.endDate"?: string;
                /** @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint */
                "queryParameters.divisionNumber"?: number;
            };
            header?: never;
            path: {
                /** @description json or xml */
                format: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublishedDivision"][];
                    "text/json": components["schemas"]["PublishedDivision"][];
                };
            };
            /** @description BadRequest */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Divisions_SearchTotalResults: {
        parameters: {
            query?: {
                /** @description Divisions containing search term within title or number */
                "queryParameters.searchTerm"?: string;
                /** @description Divisions returning Member with Member ID voting records */
                "queryParameters.memberId"?: number;
                /** @description Divisions where member was a teller as well as if they actually voted */
                "queryParameters.includeWhenMemberWasTeller"?: boolean;
                /** @description Divisions where division date in one or after date provided. Date format is yyyy-MM-dd */
                "queryParameters.startDate"?: string;
                /** @description Divisions where division date in one or before date provided. Date format is yyyy-MM-dd */
                "queryParameters.endDate"?: string;
                /** @description Division Number - as specified by the House, unique within a session. This is different to the division id which uniquely identifies a division in this system and is passed to the GET division endpoint */
                "queryParameters.divisionNumber"?: number;
            };
            header?: never;
            path: {
                /** @description json or xml */
                format: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number;
                    "text/json": number;
                };
            };
            /** @description BadRequest */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}

