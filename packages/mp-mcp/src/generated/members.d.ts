/* Auto-generated from https://members-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/api/Location/Browse/{locationType}/{locationName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of locations, both parent and child */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Location by type of location */
                    locationType: components["schemas"]["LocationType"];
                    /** @description Location by name specified */
                    locationName: string;
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
                        "text/plain": components["schemas"]["LocationItem"];
                        "application/json": components["schemas"]["LocationItem"];
                        "text/json": components["schemas"]["LocationItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/Search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of constituencies */
        get: {
            parameters: {
                query?: {
                    /** @description Constituencies containing serach term in their name */
                    searchText?: string;
                    /** @description The number of records to skip from the first, default is 0 */
                    skip?: number;
                    /** @description The number of records to return, default is 20. Maximum is 20 */
                    take?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["ConstituencyMembersServiceSearchResult"];
                        "application/json": components["schemas"]["ConstituencyMembersServiceSearchResult"];
                        "text/json": components["schemas"]["ConstituencyMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Location/Constituency/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a constituency by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Constituency by ID */
                    id: number;
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
                        "text/plain": components["schemas"]["ConstituencyItem"];
                        "application/json": components["schemas"]["ConstituencyItem"];
                        "text/json": components["schemas"]["ConstituencyItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/Synopsis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a synopsis by constituency ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Synopsis by constituency ID */
                    id: number;
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
                        "text/plain": components["schemas"]["StringItem"];
                        "application/json": components["schemas"]["StringItem"];
                        "text/json": components["schemas"]["StringItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/Representations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of representations by constituency ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Representations by constituency ID */
                    id: number;
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
                        "text/plain": components["schemas"]["ConstituencyRepresentationListItem"];
                        "application/json": components["schemas"]["ConstituencyRepresentationListItem"];
                        "text/json": components["schemas"]["ConstituencyRepresentationListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/Geometry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns geometry by constituency ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Geometry by constituency ID */
                    id: number;
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
                        "text/plain": components["schemas"]["StringItem"];
                        "application/json": components["schemas"]["StringItem"];
                        "text/json": components["schemas"]["StringItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/ElectionResults": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of election results by constituency ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Elections results by constituency ID */
                    id: number;
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
                        "text/plain": components["schemas"]["ElectionResultListItem"];
                        "application/json": components["schemas"]["ElectionResultListItem"];
                        "text/json": components["schemas"]["ElectionResultListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/ElectionResult/{electionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an election result by constituency and election id */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Election result by constituency id */
                    id: number;
                    /** @description Election result by election id */
                    electionId: number;
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
                        "text/plain": components["schemas"]["ElectionResultItem"];
                        "application/json": components["schemas"]["ElectionResultItem"];
                        "text/json": components["schemas"]["ElectionResultItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Location/Constituency/{id}/ElectionResult/Latest": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns latest election result by constituency id */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Latest election result by constituency id */
                    id: number;
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
                        "text/plain": components["schemas"]["ElectionResultItem"];
                        "application/json": components["schemas"]["ElectionResultItem"];
                        "text/json": components["schemas"]["ElectionResultItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/LordsInterests/Register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of registered interests */
        get: {
            parameters: {
                query?: {
                    /** @description Registered interests containing search term */
                    searchTerm?: string;
                    /** @description Page of results to return, default 0. Results per page 20. */
                    page?: number;
                    /** @description Registered interests that have been deleted */
                    includeDeleted?: boolean;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["MembersInterestsMembersServiceSearchResult"];
                        "application/json": components["schemas"]["MembersInterestsMembersServiceSearchResult"];
                        "text/json": components["schemas"]["MembersInterestsMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/LordsInterests/Staff": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of staff */
        get: {
            parameters: {
                query?: {
                    /** @description Staff containing search term */
                    searchTerm?: string;
                    /** @description Page of results to return, default 0. Results per page 20. */
                    page?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["MembersStaffMembersServiceSearchResult"];
                        "application/json": components["schemas"]["MembersStaffMembersServiceSearchResult"];
                        "text/json": components["schemas"]["MembersStaffMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Members/Search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of current members of the Commons or Lords */
        get: {
            parameters: {
                query?: {
                    /** @description Members where name contains term specified */
                    Name?: string;
                    /**
                     * @description Members where postcode or geographical location matches the term specified
                     *         Searches for current constituencies with full postcode, or outward code; and name of constituency
                     *         If there are no results based on above, searches for all current and past constituencies in specified area of UK.
                     *         To explicitly search by area (ignoring name of constituency); please prefix query with `region:`.
                     */
                    Location?: string;
                    /** @description Members which have held the post specified */
                    PostTitle?: string;
                    /** @description Members which are currently affiliated with party with party ID */
                    PartyId?: number;
                    /** @description Members where their most recent house is the house specified */
                    House?: components["schemas"]["House"];
                    /** @description Members which currently hold the constituency with constituency id */
                    ConstituencyId?: number;
                    /** @description Members with surname begining with letter(s) specified */
                    NameStartsWith?: string;
                    /** @description Members with the gender specified */
                    Gender?: string;
                    /** @description Members who started on or after the date given */
                    MembershipStartedSince?: string;
                    /** @description Members who left the House on or after the date given */
                    "MembershipEnded.MembershipEndedSince"?: string;
                    "MembershipEnded.MembershipEndReasonIds"?: number[];
                    /** @description Members who were active on or after the date specified */
                    "MembershipInDateRange.WasMemberOnOrAfter"?: string;
                    /** @description Members who were active on or before the date specified */
                    "MembershipInDateRange.WasMemberOnOrBefore"?: string;
                    /** @description Members who were active in the house specifid */
                    "MembershipInDateRange.WasMemberOfHouse"?: components["schemas"]["House"];
                    /** @description Members currently Eligible to sit in their House */
                    IsEligible?: boolean;
                    /** @description Members who are current or former members */
                    IsCurrentMember?: boolean;
                    /** @description Members with specified policy interest */
                    PolicyInterestId?: number;
                    /** @description Members with specified experience */
                    Experience?: string;
                    /** @description The number of records to skip from the first, default is 0 */
                    skip?: number;
                    /** @description The number of records to return, default is 20. Maximum is 20 */
                    take?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["MemberMembersServiceSearchResult"];
                        "application/json": components["schemas"]["MemberMembersServiceSearchResult"];
                        "text/json": components["schemas"]["MemberMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Members/SearchHistorical": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of members of the Commons or Lords */
        get: {
            parameters: {
                query?: {
                    /** @description Members with names containing the term specified */
                    name?: string;
                    /** @description Members that were an active member of the Commons or Lords on the date specified */
                    dateToSearchFor?: string;
                    /** @description The number of records to skip from the first, default is 0 */
                    skip?: number;
                    /** @description The number of records to return, default is 20. Maximum is 20 */
                    take?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["MemberMembersServiceSearchResult"];
                        "application/json": components["schemas"]["MemberMembersServiceSearchResult"];
                        "text/json": components["schemas"]["MemberMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Members/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return member by ID */
        get: {
            parameters: {
                query?: {
                    /** @description Member object will be populated with details from the date specified */
                    detailsForDate?: string;
                };
                header?: never;
                path: {
                    /** @description Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["MemberItem"];
                        "application/json": components["schemas"]["MemberItem"];
                        "text/json": components["schemas"]["MemberItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Biography": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return biography of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Biography of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["MemberBiographyItem"];
                        "application/json": components["schemas"]["MemberBiographyItem"];
                        "text/json": components["schemas"]["MemberBiographyItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of contact details of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Contact details of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["ContactInformationListItem"];
                        "application/json": components["schemas"]["ContactInformationListItem"];
                        "text/json": components["schemas"]["ContactInformationListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/ContributionSummary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return contribution summary of member by ID */
        get: {
            parameters: {
                query?: {
                    page?: number;
                };
                header?: never;
                path: {
                    /** @description Contribution summary of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["DebateContributionMembersServiceSearchResult"];
                        "application/json": components["schemas"]["DebateContributionMembersServiceSearchResult"];
                        "text/json": components["schemas"]["DebateContributionMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Edms": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of early day motions of member by ID */
        get: {
            parameters: {
                query?: {
                    page?: number;
                };
                header?: never;
                path: {
                    /** @description Early day motions of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["EarlyDayMotionMembersServiceSearchResult"];
                        "application/json": components["schemas"]["EarlyDayMotionMembersServiceSearchResult"];
                        "text/json": components["schemas"]["EarlyDayMotionMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Experience": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return experience of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Experience of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["BiographyExperienceListItem"];
                        "application/json": components["schemas"]["BiographyExperienceListItem"];
                        "text/json": components["schemas"]["BiographyExperienceListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Focus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of areas of focus of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Areas of focus of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["MemberFocusListItem"];
                        "application/json": components["schemas"]["MemberFocusListItem"];
                        "text/json": components["schemas"]["MemberFocusListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/History": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return members by ID with list of their historical names, parties and memberships */
        get: {
            parameters: {
                query?: {
                    /** @description List of MemberIds to find */
                    ids?: number[];
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["MemberHistoryItem"][];
                        "application/json": components["schemas"]["MemberHistoryItem"][];
                        "text/json": components["schemas"]["MemberHistoryItem"][];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/LatestElectionResult": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return latest election result of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Latest election result of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["ElectionResultItem"];
                        "application/json": components["schemas"]["ElectionResultItem"];
                        "text/json": components["schemas"]["ElectionResultItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Portrait": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return portrait of member by ID */
        get: {
            parameters: {
                query?: {
                    cropType?: components["schemas"]["PortraitCropEnum"];
                    webVersion?: boolean;
                };
                header?: never;
                path: {
                    /** @description Portrait of Member by ID specified */
                    id: number;
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
                    content?: never;
                };
                /** @description No Content */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/PortraitUrl": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return portrait url of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Portrait url of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["StringItem"];
                        "application/json": components["schemas"]["StringItem"];
                        "text/json": components["schemas"]["StringItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/RegisteredInterests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of registered interests of member by ID */
        get: {
            parameters: {
                query?: {
                    /** @description Registered interests of Member by House specified */
                    house?: components["schemas"]["House"];
                };
                header?: never;
                path: {
                    /** @description Registered interests of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["RegisteredInterestCategoryListItem"];
                        "application/json": components["schemas"]["RegisteredInterestCategoryListItem"];
                        "text/json": components["schemas"]["RegisteredInterestCategoryListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Staff": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of staff of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Staff of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["StaffListItem"];
                        "application/json": components["schemas"]["StaffListItem"];
                        "text/json": components["schemas"]["StaffListItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Synopsis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return synopsis of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Synopsis of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["StringItem"];
                        "application/json": components["schemas"]["StringItem"];
                        "text/json": components["schemas"]["StringItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Thumbnail": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return thumbnail of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Thumbnail of Member by ID specified */
                    id: number;
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
                    content?: never;
                };
                /** @description No Content */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/ThumbnailUrl": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return thumbnail url of member by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Thumbnail url of Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["StringItem"];
                        "application/json": components["schemas"]["StringItem"];
                        "text/json": components["schemas"]["StringItem"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/Voting": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of votes by member by ID */
        get: {
            parameters: {
                query: {
                    house: components["schemas"]["House"];
                    page?: number;
                };
                header?: never;
                path: {
                    /** @description Votes by Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["VoteMembersServiceSearchResult"];
                        "application/json": components["schemas"]["VoteMembersServiceSearchResult"];
                        "text/json": components["schemas"]["VoteMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Members/{id}/WrittenQuestions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return list of written questions by member by ID */
        get: {
            parameters: {
                query?: {
                    page?: number;
                };
                header?: never;
                path: {
                    /** @description Written questions by Member by ID specified */
                    id: number;
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
                        "text/plain": components["schemas"]["WrittenQuestionMembersServiceSearchResult"];
                        "application/json": components["schemas"]["WrittenQuestionMembersServiceSearchResult"];
                        "text/json": components["schemas"]["WrittenQuestionMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Parties/StateOfTheParties/{house}/{forDate}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns current state of parties */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description State of parties in Commons or Lords. */
                    house: components["schemas"]["House"];
                    /** @description State of parties for the date specified */
                    forDate: string;
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
                        "text/plain": components["schemas"]["PartySeatCountMembersServiceSearchResult"];
                        "application/json": components["schemas"]["PartySeatCountMembersServiceSearchResult"];
                        "text/json": components["schemas"]["PartySeatCountMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Parties/LordsByType/{forDate}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns the composition of the House of Lords by peerage type. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Composition of the Lords for date specified. */
                    forDate: string;
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
                        "text/plain": components["schemas"]["LordsByTypeMembersServiceSearchResult"];
                        "application/json": components["schemas"]["LordsByTypeMembersServiceSearchResult"];
                        "text/json": components["schemas"]["LordsByTypeMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Parties/GetActive/{house}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of current parties with at least one active member. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Current parties by house */
                    house: components["schemas"]["House"];
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
                        "text/plain": components["schemas"]["PartyMembersServiceSearchResult"];
                        "application/json": components["schemas"]["PartyMembersServiceSearchResult"];
                        "text/json": components["schemas"]["PartyMembersServiceSearchResult"];
                    };
                };
                /** @description Bad Request */
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
    "/api/Posts/GovernmentPosts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of government posts. */
        get: {
            parameters: {
                query?: {
                    /** @description Government posts by department ID */
                    departmentId?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["GovernmentOppositionPostItem"][];
                        "application/json": components["schemas"]["GovernmentOppositionPostItem"][];
                        "text/json": components["schemas"]["GovernmentOppositionPostItem"][];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Posts/OppositionPosts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of opposition posts. */
        get: {
            parameters: {
                query?: {
                    /** @description Opposition posts by department ID */
                    departmentId?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["GovernmentOppositionPostItem"][];
                        "application/json": components["schemas"]["GovernmentOppositionPostItem"][];
                        "text/json": components["schemas"]["GovernmentOppositionPostItem"][];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Posts/Spokespersons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of spokespersons. */
        get: {
            parameters: {
                query?: {
                    /** @description Spokespersons by party ID */
                    partyId?: number;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["GovernmentOppositionPostItem"][];
                        "application/json": components["schemas"]["GovernmentOppositionPostItem"][];
                        "text/json": components["schemas"]["GovernmentOppositionPostItem"][];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Posts/Departments/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of departments. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Departments by type */
                    type: components["schemas"]["PostType"];
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
                        "text/plain": components["schemas"]["GovernmentDepartment"][];
                        "application/json": components["schemas"]["GovernmentDepartment"][];
                        "text/json": components["schemas"]["GovernmentDepartment"][];
                    };
                };
                /** @description Not Found */
                404: {
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
    "/api/Posts/SpeakerAndDeputies/{forDate}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list containing the speaker and deputy speakers. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Speaker and deputy speakers for date specified */
                    forDate: string;
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
                        "text/plain": components["schemas"]["MemberItem"][];
                        "application/json": components["schemas"]["MemberItem"][];
                        "text/json": components["schemas"]["MemberItem"][];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
    "/api/Reference/PolicyInterests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of policy interest. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["GenericReferenceData"][];
                        "application/json": components["schemas"]["GenericReferenceData"][];
                        "text/json": components["schemas"]["GenericReferenceData"][];
                    };
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
    "/api/Reference/Departments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of departments. */
        get: {
            parameters: {
                query?: {
                    id?: number;
                    nameContains?: string;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["GovernmentDepartment"][];
                        "application/json": components["schemas"]["GovernmentDepartment"][];
                        "text/json": components["schemas"]["GovernmentDepartment"][];
                    };
                };
                /** @description Bad Request */
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
    "/api/Reference/AnsweringBodies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of answering bodies. */
        get: {
            parameters: {
                query?: {
                    id?: number;
                    nameContains?: string;
                };
                header?: never;
                path?: never;
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
                        "text/plain": components["schemas"]["AnsweringBody"][];
                        "application/json": components["schemas"]["AnsweringBody"][];
                        "text/json": components["schemas"]["AnsweringBody"][];
                    };
                };
                /** @description Bad Request */
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
    "/api/Reference/Departments/{id}/Logo": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns department logo. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Logo by department ID */
                    id: number;
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
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
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
        AnsweringBody: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            shortName?: string | null;
            target?: string | null;
            department?: components["schemas"]["GovernmentDepartment"] | null;
        };
        BiographyExperience: {
            /** Format: int32 */
            id?: number;
            type?: string | null;
            /** Format: int32 */
            typeId?: number;
            title?: string | null;
            organisation?: string | null;
            /** Format: int32 */
            startMonth?: number | null;
            /** Format: int32 */
            startYear?: number | null;
            /** Format: int32 */
            endMonth?: number | null;
            /** Format: int32 */
            endYear?: number | null;
        };
        BiographyExperienceListItem: {
            value?: components["schemas"]["BiographyExperience"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        BiographyItem: {
            house?: components["schemas"]["House"] | null;
            name?: string | null;
            /** Format: int32 */
            id?: number;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            additionalInfo?: string | null;
            additionalInfoLink?: string | null;
        };
        Constituency: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            currentRepresentation?: components["schemas"]["ConstituencyRepresentation"] | null;
        };
        ConstituencyItem: {
            value?: components["schemas"]["Constituency"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        ConstituencyMembersServiceSearchResult: {
            items?: components["schemas"]["ConstituencyItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        ConstituencyRepresentation: {
            member?: components["schemas"]["MemberItem"] | null;
            representation?: components["schemas"]["HouseMembership"] | null;
        };
        ConstituencyRepresentationListItem: {
            value?: components["schemas"]["ConstituencyRepresentation"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        ContactInformation: {
            type?: string | null;
            typeDescription?: string | null;
            /** Format: int32 */
            typeId?: number;
            isPreferred?: boolean;
            isWebAddress?: boolean;
            notes?: string | null;
            line1?: string | null;
            line2?: string | null;
            line3?: string | null;
            line4?: string | null;
            line5?: string | null;
            postcode?: string | null;
            phone?: string | null;
            fax?: string | null;
            email?: string | null;
            website?: string | null;
        };
        ContactInformationListItem: {
            value?: components["schemas"]["ContactInformation"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        DebateContribution: {
            /** Format: int32 */
            totalContributions?: number;
            debateTitle?: string | null;
            /** Format: int32 */
            debateId?: number;
            debateWebsiteId?: string | null;
            /** Format: date-time */
            sittingDate?: string;
            section?: string | null;
            house?: string | null;
            /** Format: date-time */
            firstTimecode?: string | null;
            /** Format: int32 */
            speechCount?: number;
            /** Format: int32 */
            questionCount?: number;
            /** Format: int32 */
            supplementaryQuestionCount?: number;
            /** Format: int32 */
            interventionCount?: number;
            /** Format: int32 */
            answerCount?: number;
            /** Format: int32 */
            pointsOfOrderCount?: number;
            /** Format: int32 */
            statementsCount?: number;
        };
        DebateContributionItem: {
            value?: components["schemas"]["DebateContribution"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        DebateContributionMembersServiceSearchResult: {
            items?: components["schemas"]["DebateContributionItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        EarlyDayMotion: {
            title?: string | null;
            number?: string | null;
            isPrayer?: boolean;
            isAmendment?: boolean;
            /** Format: int32 */
            id?: number;
            /** Format: date-time */
            dateTabled?: string;
            /** Format: int32 */
            sponsorsCount?: number;
        };
        EarlyDayMotionItem: {
            value?: components["schemas"]["EarlyDayMotion"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        EarlyDayMotionMembersServiceSearchResult: {
            items?: components["schemas"]["EarlyDayMotionItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        ElectionCandidate: {
            /** Format: int32 */
            memberId?: number | null;
            name?: string | null;
            party?: components["schemas"]["Party"] | null;
            resultChange?: string | null;
            /** Format: int32 */
            rankOrder?: number | null;
            /** Format: int32 */
            votes?: number;
            /** Format: double */
            voteShare?: number | null;
        };
        ElectionResult: {
            result?: string | null;
            isNotional?: boolean;
            /** Format: int32 */
            electorate?: number;
            /** Format: int32 */
            turnout?: number;
            /** Format: int32 */
            majority?: number;
            winningParty?: components["schemas"]["Party"] | null;
            electionTitle?: string | null;
            /** Format: date-time */
            electionDate?: string;
            /** Format: int32 */
            electionId?: number;
            isGeneralElection?: boolean;
            constituencyName?: string | null;
            candidates?: components["schemas"]["ElectionCandidate"][] | null;
        };
        ElectionResultItem: {
            value?: components["schemas"]["ElectionResult"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        ElectionResultListItem: {
            value?: components["schemas"]["ElectionResult"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        GenericReferenceData: {
            /** Format: int32 */
            id?: number;
            description?: string | null;
        };
        GovernmentDepartment: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            url?: string | null;
            imageUrl?: string | null;
        };
        GovernmentOppositionPost: {
            type?: components["schemas"]["PostType"] | null;
            name?: string | null;
            hansardName?: string | null;
            /** Format: int32 */
            id?: number;
            postHolders?: components["schemas"]["GovernmentOppositionPostHolder"][] | null;
            governmentDepartments?: components["schemas"]["GovernmentDepartment"][] | null;
            /** Format: date-time */
            createdWhen?: string;
            /** Format: int32 */
            order?: number;
        };
        GovernmentOppositionPostHolder: {
            member?: components["schemas"]["MemberItem"] | null;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            layingMinisterName?: string | null;
            isPaid?: boolean;
        };
        GovernmentOppositionPostItem: {
            value?: components["schemas"]["GovernmentOppositionPost"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        GovernmentType: 0 | 1 | 2 | 3;
        GroupedQuestion: {
            questionUin?: string | null;
            /** Format: date-time */
            dateTabled?: string;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        House: 1 | 2;
        HouseMembership: {
            membershipFrom?: string | null;
            /** Format: int32 */
            membershipFromId?: number | null;
            house?: components["schemas"]["House"] | null;
            /** Format: date-time */
            membershipStartDate?: string | null;
            /** Format: date-time */
            membershipEndDate?: string | null;
            membershipEndReason?: string | null;
            membershipEndReasonNotes?: string | null;
            /** Format: int32 */
            membershipEndReasonId?: number | null;
            membershipStatus?: components["schemas"]["HouseMembershipStatus"] | null;
        };
        HouseMembershipStatus: {
            statusIsActive?: boolean;
            statusDescription?: string | null;
            statusNotes?: string | null;
            /** Format: int32 */
            statusId?: number | null;
            status?: components["schemas"]["MemberStatus"] | null;
            /** Format: date-time */
            statusStartDate?: string | null;
        };
        Link: {
            rel?: string | null;
            href?: string | null;
            method?: string | null;
        };
        Location: {
            context?: components["schemas"]["LocationContext"] | null;
            parentContext?: components["schemas"]["LocationContext"] | null;
            childContexts?: components["schemas"]["LocationContext"][] | null;
            stateOfTheParties?: components["schemas"]["PartySeatCount"][] | null;
        };
        LocationContext: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            type?: components["schemas"]["LocationType"];
            typeName?: string | null;
        };
        LocationItem: {
            value?: components["schemas"]["Location"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        LocationType: 0 | 1 | 2 | 3;
        LordsByType: {
            /** Format: int32 */
            life?: number;
            /** Format: int32 */
            hereditary?: number;
            /** Format: int32 */
            bishop?: number;
            /** Format: int32 */
            total?: number;
            party?: components["schemas"]["Party"] | null;
        };
        LordsByTypeItem: {
            value?: components["schemas"]["LordsByType"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        LordsByTypeMembersServiceSearchResult: {
            items?: components["schemas"]["LordsByTypeItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        MatchedBy: 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;
        Member: {
            /** Format: int32 */
            id?: number;
            nameListAs?: string | null;
            nameDisplayAs?: string | null;
            nameFullTitle?: string | null;
            nameAddressAs?: string | null;
            latestParty?: components["schemas"]["Party"] | null;
            gender?: string | null;
            latestHouseMembership?: components["schemas"]["HouseMembership"] | null;
            thumbnailUrl?: string | null;
        };
        MemberBiography: {
            representations?: components["schemas"]["RepresentationItem"][] | null;
            electionsContested?: components["schemas"]["BiographyItem"][] | null;
            houseMemberships?: components["schemas"]["BiographyItem"][] | null;
            governmentPosts?: components["schemas"]["BiographyItem"][] | null;
            oppositionPosts?: components["schemas"]["BiographyItem"][] | null;
            otherPosts?: components["schemas"]["BiographyItem"][] | null;
            partyAffiliations?: components["schemas"]["BiographyItem"][] | null;
            committeeMemberships?: components["schemas"]["BiographyItem"][] | null;
        };
        MemberBiographyItem: {
            value?: components["schemas"]["MemberBiography"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MemberFocus: {
            category?: string | null;
            focus?: string[] | null;
        };
        MemberFocusListItem: {
            value?: components["schemas"]["MemberFocus"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MemberHistory: {
            /** Format: int32 */
            id?: number;
            thumbnailUrl?: string | null;
            partyHistory?: components["schemas"]["MemberParty"][] | null;
            houseMembershipHistory?: components["schemas"]["HouseMembership"][] | null;
            nameHistory?: components["schemas"]["MemberName"][] | null;
        };
        MemberHistoryItem: {
            value?: components["schemas"]["MemberHistory"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MemberItem: {
            value?: components["schemas"]["Member"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MemberMembersServiceSearchResult: {
            items?: components["schemas"]["MemberItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        MemberName: {
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            nameListAs?: string | null;
            nameDisplayAs?: string | null;
            nameFullTitle?: string | null;
            nameAddressAs?: string | null;
        };
        MemberParty: {
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            party?: components["schemas"]["Party"] | null;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        MemberStatus: 0 | 1 | 2 | 3;
        MembersInterests: {
            member?: components["schemas"]["Member"] | null;
            interestCategories?: components["schemas"]["RegisteredInterestCategory"][] | null;
        };
        MembersInterestsItem: {
            value?: components["schemas"]["MembersInterests"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MembersInterestsMembersServiceSearchResult: {
            items?: components["schemas"]["MembersInterestsItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        MembersStaff: {
            member?: components["schemas"]["Member"] | null;
            staff?: components["schemas"]["Staff"][] | null;
        };
        MembersStaffItem: {
            value?: components["schemas"]["MembersStaff"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        MembersStaffMembersServiceSearchResult: {
            items?: components["schemas"]["MembersStaffItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        Party: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            abbreviation?: string | null;
            backgroundColour?: string | null;
            foregroundColour?: string | null;
            isLordsMainParty?: boolean;
            isLordsSpiritualParty?: boolean;
            governmentType?: components["schemas"]["GovernmentType"] | null;
            readonly isIndependentParty?: boolean;
        };
        PartyItem: {
            value?: components["schemas"]["Party"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        PartyMembersServiceSearchResult: {
            items?: components["schemas"]["PartyItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        PartySeatCount: {
            /** Format: int32 */
            male?: number | null;
            /** Format: int32 */
            female?: number | null;
            /** Format: int32 */
            nonBinary?: number | null;
            /** Format: int32 */
            total?: number;
            party?: components["schemas"]["Party"] | null;
        };
        PartySeatCountItem: {
            value?: components["schemas"]["PartySeatCount"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        PartySeatCountMembersServiceSearchResult: {
            items?: components["schemas"]["PartySeatCountItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        /**
         * Format: int32
         * @enum {integer}
         */
        PortraitCropEnum: 0 | 1 | 2 | 3;
        /**
         * Format: int32
         * @enum {integer}
         */
        PostType: 0 | 1 | 2;
        RegisteredInterest: {
            /** Format: int32 */
            id?: number;
            interest?: string | null;
            /** Format: date-time */
            createdWhen?: string | null;
            /** Format: date-time */
            lastAmendedWhen?: string | null;
            /** Format: date-time */
            deletedWhen?: string | null;
            isCorrection?: boolean;
            childInterests?: components["schemas"]["RegisteredInterest"][] | null;
        };
        RegisteredInterestCategory: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            /** Format: int32 */
            sortOrder?: number;
            interests?: components["schemas"]["RegisteredInterest"][] | null;
        };
        RegisteredInterestCategoryListItem: {
            value?: components["schemas"]["RegisteredInterestCategory"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        RepresentationItem: {
            house?: components["schemas"]["House"] | null;
            name?: string | null;
            /** Format: int32 */
            id?: number;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string | null;
            additionalInfo?: string | null;
            additionalInfoLink?: string | null;
            /** Format: date-time */
            constituencyStart?: string;
            /** Format: date-time */
            constituencyEnd?: string | null;
        };
        Staff: {
            surname?: string | null;
            forename?: string | null;
            title?: string | null;
            details?: string | null;
        };
        StaffListItem: {
            value?: components["schemas"]["Staff"][] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        StringItem: {
            value?: string | null;
            links?: components["schemas"]["Link"][] | null;
        };
        Vote: {
            house?: components["schemas"]["House"];
            /** Format: int32 */
            id?: number;
            inAffirmativeLobby?: boolean;
            inNegativeLobby?: boolean;
            actedAsTeller?: boolean;
            title?: string | null;
            /** Format: date-time */
            date?: string;
            /** Format: int32 */
            divisionNumber?: number;
            /** Format: int32 */
            numberInFavour?: number;
            /** Format: int32 */
            numberAgainst?: number;
        };
        VoteItem: {
            value?: components["schemas"]["Vote"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        VoteMembersServiceSearchResult: {
            items?: components["schemas"]["VoteItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
        };
        WrittenQuestion: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            askingMemberId?: number;
            house?: components["schemas"]["House"];
            memberHasInterest?: boolean;
            /** Format: date-time */
            dateTabled?: string;
            /** Format: date-time */
            dateForAnswer?: string;
            uin?: string | null;
            questionText?: string | null;
            /** Format: int32 */
            answeringBodyId?: number;
            isWithdrawn?: boolean;
            isNamedDay?: boolean;
            groupedQuestions?: string[] | null;
            groupedQuestionsDates?: components["schemas"]["GroupedQuestion"][] | null;
            answerIsHolding?: boolean | null;
            answerIsCorrection?: boolean | null;
            /** Format: int32 */
            answeringMemberId?: number | null;
            /** Format: int32 */
            correctingMemberId?: number | null;
            /** Format: date-time */
            dateAnswered?: string | null;
            answerText?: string | null;
            /** Format: int32 */
            attachmentCount?: number;
            heading?: string | null;
            answeringMember?: components["schemas"]["Member"] | null;
            correctingMember?: components["schemas"]["Member"] | null;
            answeringBody?: components["schemas"]["AnsweringBody"] | null;
        };
        WrittenQuestionItem: {
            value?: components["schemas"]["WrittenQuestion"] | null;
            links?: components["schemas"]["Link"][] | null;
        };
        WrittenQuestionMembersServiceSearchResult: {
            items?: components["schemas"]["WrittenQuestionItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            resultContext?: string | null;
            /** Format: int32 */
            skip?: number;
            /** Format: int32 */
            take?: number;
            links?: components["schemas"]["Link"][] | null;
            resultType?: components["schemas"]["MatchedBy"] | null;
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

