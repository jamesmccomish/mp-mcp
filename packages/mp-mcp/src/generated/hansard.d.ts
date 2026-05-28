/* Auto-generated from https://hansard-api.parliament.uk/swagger/docs/v1. Do not edit by hand. */
export interface paths {
    "/debates/speakerslist/{debateSectionExtId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a list of speaker id’s for a given debate section
         * @description Get a list of speaker id’s for a given debate section by External Id
         */
        get: operations["Debates_GetSpeakersList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/divisions/{debateSectionExtId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get divisions for a given debate section
         * @description Get divisions for a given debate section by External Id
         */
        get: operations["Debates_GetDivisionsList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/division/{divisionExtId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all data related to a division
         * @description Get all data (debate title, aye/noe count, house and a record of how members voted) related to a division.  Results can be filtered to show EVEL (English Votes for English Laws) voters only
         */
        get: operations["Debates_GetDivision"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/debate/{debateSectionExtId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get data for a debate section
         * @description Get data (debate title, date, location, house and a record of each member’s contribution) related to a debate section.
         */
        get: operations["Debates_GetDebate"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/topleveldebateid/{debateSectionExtId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get top level debate id given the id of its child debate section
         * @description Get top level debate id given the id of its child debate section.
         */
        get: operations["Debates_GetTopLevelDebateId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/topleveldebatebytitle.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get top level debate given the house, sitting date and section title
         * @description Get top level debate given the house, sitting date and section title
         */
        get: operations["Debates_GetTopLevelDebateByTitle"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/debates/memberdebatecontributions/{memberId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get debate contribuitions for a Member */
        get: operations["Debates_GetMemberContributionDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/historicsittingdays": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get historic sitting days given house and sitting date range
         * @description Get historic sitting days given house and sitting date range. Results can be filtered on whether or not to include results with sitting sections
         */
        get: operations["HistoricSittingDays_Query"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/historicsittingdays/{house}/{sittingDate}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get details of historic sitting day given house and sitting date.
         * @description Get details of historic sitting day for given house and sitting date.
         */
        get: operations["HistoricSittingDays_Details"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/speakerslist/{date}/{house}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get list of speaker ids for given sitting date, house and Hansard section name
         * @description Get list of speaker ids for given sitting date, house and Hansard section name
         */
        get: operations["Overview_GetSpeakersList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/currentlyprocessing.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get status information on which house and sitting date is currently being processed
         * @description Get status information on which house and sitting date is currently being processed
         */
        get: operations["Overview_GetCurrentlyProcessing"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/lastsittingdate.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the last sitting date for given house.
         * @description Get the last sitting date for given house.
         */
        get: operations["Overview_GetLastSittingDate"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/firstyear.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets the year of the earliest sitting date in Hansard
         * @description Gets the year of the earliest sitting date in Hansard
         */
        get: operations["Overview_GetFirstYear"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/linkedsittingdates.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the previous and next sitting days given a house and date.
         * @description Get the previous and next sitting days given a house and date. Returns only the previous sitting day if there is no future day with any Hansard data.
         */
        get: operations["Overview_GetLinkedSittingDates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/calendar.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all sitting dates given a year, month and house.
         * @description Get all sitting dates given a year, month and house.
         */
        get: operations["Overview_DatesWithSittings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/sectionsforday.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Hansard name for debate sections given the sitting date and house
         * @description Get Hansard name for debate sections given the sitting date and house. Note that Commons Chamber is returned as 'Debate'.
         */
        get: operations["Overview_SectionsForDay"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/sectiontrees.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get section hierarchy given Hansard section name, sitting date and house.
         * @description Get section hierarchy given Hansard section name, sitting date and house.
         */
        get: operations["Overview_GetSectionTrees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/overview/pdfsforday.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get pdf data (titles and sizes) for a given sitting date and house.
         * @description Get pdf data (titles and sizes) for a given sitting date and house.
         */
        get: operations["Overview_PdfsForDay"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pdfs/pdf.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get pdf (data and meta data) for a given sitting date, house or debate section
         * @description Get pdf (data and meta data) for a given sitting date, house or debate section
         */
        get: operations["Pdfs_GetPdf"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/parlisearchredirect.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a web link for a content item, debate section or division
         * @description Get a web link for a content item, debate section or division given its external id.
         */
        get: operations["Search_GetParliSearchRedirect"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all results that contain the given search term
         * @description Get contributions, written statements, written answers, corrections,
         *     petitions, committees, divisions and members that contain the given search term.
         *     <br /><br />
         *     There are a maximum of four search results of each type.
         *     <br /><br />
         *     The search term can be simple text or it can contain directives for advanced searches.<br />
         *     you can also connect multiple search directives with AND<br />
         *     use spokenby:name to get results when named person spoke<br />
         *     use debate:debate to get results for debates matching supplied text<br />
         *     use words:words to get results containing specified words<br />
         */
        get: operations["Search_FullSearch"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/members.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets all members whose name contains the search term.
         * @description Gets all members whose name contains the search term.
         *                 Results can be filtered to include current members, former members or both.
         */
        get: operations["Search_SearchMembers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/contributions/{contributionType}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets all contributions of required type that contain the specified search term. OutputType can be List or Group.
         * @description Gets all contributions of required type that contain the specified search term.
         *     Results can be filtered by house, memberid, debate, section and sitting date range.
         *     <br /><br />
         *     OutputType can be List or Group
         *     <br /><br />
         *     How many results to skip and how many to return (used for paging), can also be configured.
         *     Note: skip and take parameters can be omitted to return all results.
         *     <br /><br />
         *     The search term can be simple text or it can contain directives for advanced searches.<br />
         *     you can also connect multiple search directives with AND<br />
         *     use spokenby:name to find contributions when named person spoke<br />
         *     use debate:debate to find contributions in debates matching supplied text<br />
         *     use words:words to find contributions containing specified words<br />
         */
        get: operations["Search_SearchContributions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/membercontributionsummary/{memberId}.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get contribution summary for a given Member */
        get: operations["Search_GetMemberContributionSummary"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/debates.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all debates for the given house, date range and title (from search term) */
        get: operations["Search_SearchDebates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/divisions.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all divisions for the given house, sitting date range and title (from search term)
         * @description Gets all divisions for a given house and sitting date range that contain the specified search term in their title.
         *                 <br />Specifying MemberId returns information on how that member voted
         *                 <br /><br />
         *                 Results can be filtered by whether search should IncludeCommitteeDivisions and also WithDivision.
         *                 Specifying MemberId returns information on how that member voted in MemberVotedAye
         */
        get: operations["Search_SearchDivisions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/debatebycolumn.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the debate for a given volume number, column number and house
         * @description Get the debate for a given volume number, column number and house
         */
        get: operations["Search_FindDebateByColumnNumber"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/debatebyexternalid.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the debate for a given contribution id (external reference id)
         * @description Get the debate for a given contribution Id (external reference id)
         */
        get: operations["Search_FindDebateByContributionId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/petitions.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets all petitions that contain the specified search term in their title
         * @description Gets all petitions that contain the specified search term in their title.
         *     <br />Results can be filtered by house and sitting date range.
         *     <br />How many results to skip and how many to return (used for paging) can also be configured.
         *     Note: skip and take parameters can be omitted to return all results.
         */
        get: operations["Search_SearchPetitions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/committees.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets committees for the given house, sitting date range and title
         * @description Gets all committees for the given house, sitting date range and title which contains a given search term. Results can be filtered on whether they have a division
         */
        get: operations["Search_SearchCommittees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/search/committeedebates.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Gets all committee debates
         * @description Gets all committee debates. Results can be filtered by house, sitting date range, member id and debate section id.
         */
        get: operations["Search_SearchCommitteeDebates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/timeline-stats.{format}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get counts for given contribution type and sitting date range.
         * @description Get counts for given contribution type and sitting date range.
         *     Counts are by given TimelineGroupingSize (Day, Month or Year), house, contribution type,
         *     search term, optional memberid and whether this is a debates search
         *     <br /><br /><br />
         *     The search term can be simple text or it can contain directives for advanced searches.<br />
         *     you can also connect multiple search directives with AND<br />
         *     use spokenby:name to count times when named person spoke<br />
         *     use debate:debate to count debates matching supplied text<br />
         *     use words:words to count occurrences of specified words<br />
         */
        get: operations["TimelineStats_Query"];
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
        DivisionOverview: {
            /** Format: int32 */
            Id?: number;
            Time?: string;
            /** Format: date-time */
            Date?: string;
            DivisionHasTime?: boolean;
            ExternalId?: string;
            /** Format: int32 */
            AyesCount?: number;
            /** Format: int32 */
            NoesCount?: number;
            House?: string;
            DebateSection?: string;
            DebateSectionSource?: string;
            Number?: string;
            DebateSectionExtId?: string;
            MemberVotedAye?: boolean;
            TextBeforeVote?: string;
            TextAfterVote?: string;
            /** Format: int32 */
            EVELType?: number;
            EVELInfo?: string;
            /** Format: int32 */
            EVELAyesCount?: number;
            /** Format: int32 */
            EVELNoesCount?: number;
            IsCommitteeDivision?: boolean;
        };
        DivisionItem: {
            AyeMembers?: components["schemas"]["Member"][];
            NoeMembers?: components["schemas"]["Member"][];
            /** Format: int32 */
            Id?: number;
            Time?: string;
            /** Format: date-time */
            Date?: string;
            DivisionHasTime?: boolean;
            ExternalId?: string;
            /** Format: int32 */
            AyesCount?: number;
            /** Format: int32 */
            NoesCount?: number;
            House?: string;
            DebateSection?: string;
            DebateSectionSource?: string;
            Number?: string;
            DebateSectionExtId?: string;
            MemberVotedAye?: boolean;
            TextBeforeVote?: string;
            TextAfterVote?: string;
            /** Format: int32 */
            EVELType?: number;
            EVELInfo?: string;
            /** Format: int32 */
            EVELAyesCount?: number;
            /** Format: int32 */
            EVELNoesCount?: number;
            IsCommitteeDivision?: boolean;
        };
        Member: {
            /** Format: int32 */
            MemberId?: number;
            /** Format: int32 */
            DodsId?: number;
            /** Format: int32 */
            PimsId?: number;
            DisplayAs?: string;
            ListAs?: string;
            FullTitle?: string;
            LayingMinisterName?: string;
            HistoricalMemberName?: string;
            HistoricalFullTitle?: string;
            Gender?: string;
            Party?: string;
            /** Format: int32 */
            PartyId?: number;
            House?: string;
            MemberFrom?: string;
            /** Format: date-time */
            HouseStartDate?: string;
            /** Format: date-time */
            HouseEndDate?: string;
            IsTeller?: boolean;
            /** Format: int32 */
            SortOrder?: number;
            ConstituencyCountry?: string;
        };
        Debate: {
            Overview?: components["schemas"]["DebateOverview"];
            Navigator?: components["schemas"]["SectionTreeItem"][];
            Items?: components["schemas"]["DebateItem"][];
            ChildDebates?: components["schemas"]["Debate"][];
        };
        DebateOverview: {
            /** Format: int32 */
            Id?: number;
            ExtId?: string;
            Title?: string;
            HRSTag?: string;
            /** Format: date-time */
            Date?: string;
            Location?: string;
            House?: string;
            /** @enum {string} */
            Source?: "RollingHansard" | "DailyHansard" | "BoundVolume" | "Historic";
            /** Format: int32 */
            VolumeNo?: number;
            /** Format: date-time */
            ContentLastUpdated?: string;
            /** Format: int32 */
            DebateTypeId?: number;
            /** Format: int32 */
            SectionType?: number;
            NextDebateExtId?: string;
            NextDebateTitle?: string;
            PreviousDebateExtId?: string;
            PreviousDebateTitle?: string;
        };
        SectionTreeItem: {
            /** Format: int32 */
            Id?: number;
            Title?: string;
            /** Format: int32 */
            ParentId?: number;
            /** Format: int32 */
            SortOrder?: number;
            ExternalId?: string;
            HRSTag?: string;
            HansardSection?: string;
            /** Format: date-time */
            Timecode?: string;
        };
        DebateItem: {
            ItemType?: string;
            /** Format: int64 */
            ItemId?: number;
            /** Format: int32 */
            MemberId?: number;
            AttributedTo?: string;
            Value?: string;
            /** Format: int32 */
            OrderInSection?: number;
            /** Format: date-time */
            Timecode?: string;
            ExternalId?: string;
            HRSTag?: string;
            HansardSection?: string;
            UIN?: string;
            IsReiteration?: boolean;
        };
        GetMemberContributionDetailsResult: {
            AttributedTo?: string;
            ContentItemExtId?: string;
            DebateSectionExtId?: string;
            OverviewText?: string;
            /** Format: date-time */
            Timecode?: string;
        };
        SittingDayQueryParameters: {
            /**
             * @description the parliamentary house (Commons or Lords)
             * @enum {string}
             */
            House?: "Commons" | "Lords";
            /**
             * Format: date-time
             * @description the date to search from (yyyy-mm-dd)
             */
            StartDate?: string;
            /**
             * Format: date-time
             * @description the date to search to (yyyy-mm-dd)
             */
            EndDate?: string;
            /**
             * Format: int32
             * @description how many results to skip (Default is 0)
             */
            Skip?: number;
            /**
             * Format: int32
             * @description how many results to return per page (maximum 100)
             */
            Take?: number;
            /**
             * @description how to order results (SittingDateAsc or SittingDateDesc)
             * @enum {string}
             */
            OrderBy?: "SittingDateAsc" | "SittingDateDesc";
            /** @description whether or not to only include results with sitting sections */
            HasSittingSections?: boolean;
        };
        HouseSittingDay: {
            /** Format: int32 */
            HouseId?: number;
            /** Format: date-time */
            SittingDate?: string;
        };
        SittingDayDetailsDto: {
            /** Format: date-time */
            SittingDate?: string;
            House?: string;
            SittingSections?: components["schemas"]["SittingSection"][];
        };
        SittingSection: {
            Name?: string;
            ExternalId?: string;
            DebateSections?: components["schemas"]["DebateSection"][];
        };
        DebateSection: {
            Title?: string;
            ExternalId?: string;
            ParentExternalId?: string;
        };
        LinkedSittingDates: {
            /** Format: date-time */
            PreviousSittingDate?: string;
            /** Format: date-time */
            NextSittingDate?: string;
        };
        CalendarItem: {
            House?: string;
            /** Format: date-time */
            ItemDate?: string;
            Metadata?: string;
        };
        SectionTree: {
            House?: string;
            /** Format: date-time */
            ItemDate?: string;
            Metadata?: string;
            Title?: string;
            Description?: string;
            /** Format: int32 */
            SectionType?: number;
            /** Format: int32 */
            SortOrder?: number;
            /** Format: date-time */
            LastUpdated?: string;
            /** Format: int32 */
            VolumeNo?: number;
            SectionTreeItems?: components["schemas"]["SectionTreeItem"][];
            /** @enum {string} */
            Source?: "RollingHansard" | "DailyHansard" | "BoundVolume" | "Historic";
        };
        PdfInfo: {
            /** Format: date-time */
            SittingDate?: string;
            House?: string;
            IsDebateSectionPdf?: boolean;
            SectionExternalId?: string;
            Title?: string;
            /** Format: double */
            PdfSize?: number;
        };
        PdfData: {
            /** Format: date-time */
            SittingDate?: string;
            House?: string;
            IsDebateSectionPdf?: boolean;
            Title?: string;
            /** Format: double */
            Size?: number;
            /** Format: byte */
            Data?: string;
        };
        SearchQueryParameters: {
            /** @description the parliamentary house (Commons or Lords) */
            House?: string;
            /**
             * Format: date-time
             * @description the date to search from (yyyy-mm-dd)
             */
            StartDate?: string;
            /**
             * Format: date-time
             * @description the date to search to (yyyy-mm-dd)
             */
            EndDate?: string;
            /** @description the date to search (yyyy-mm-dd) */
            Date?: string;
            /**
             * Format: int32
             * @description the unique id of a member (member details are returned from ‘Search Members’ operation)
             */
            MemberId?: number;
            /**
             * Format: int32
             * @description the unique id of the division to be searched
             */
            DivisionId?: number;
            /** @description Hansard identifier */
            HansardIdentifier?: string;
            /** @description the term for which to search */
            SearchTerm?: string;
            /**
             * Format: int32
             * @description how many results to skip (Default is 0)
             */
            Skip?: number;
            /**
             * Format: int32
             * @description how many results to return per page
             */
            Take?: number;
            /** @description the list of member ids in which to search */
            MemberIds?: string;
            /** @description department to be searched */
            Department?: string;
            /** @description debate type to be searched */
            DebateType?: string;
            /** @description whether or not to include former members */
            IncludeFormer?: boolean;
            /** @description whether or not to include current members */
            IncludeCurrent?: boolean;
            /** @description whether or not to only include results with a division */
            WithDivision?: boolean;
            /**
             * Format: int32
             * @description the series number in which to search
             */
            SeriesNumber?: number;
            /**
             * Format: int32
             * @description the Volume Number in which to search
             */
            VolumeNumber?: number;
            /** @description the Column number for which to search */
            ColumnNumber?: string;
            /** @description the title of the committee to be searched */
            CommitteeTitle?: string;
            /**
             * Format: int32
             * @description committee type to be searched
             */
            CommitteeType?: number;
            /** @description whether or not to include committee divisions */
            IncludeCommitteeDivisions?: boolean;
            /**
             * Format: int32
             * @description unique id of the section to search
             */
            Section?: number;
            /** @description output type (List or Group) */
            OutputType?: string;
            /**
             * Format: int32
             * @description the unique id of the debate section to search
             */
            DebateSectionId?: number;
            /**
             * @description timeline grouping size. Enter Day, Month or Year
             * @enum {string}
             */
            TimelineGroupingSize?: "Day" | "Month" | "Year";
            /**
             * @description order results (SittingDateAsc or SittingDateDesc)
             * @enum {string}
             */
            OrderBy?: "SittingDateAsc" | "SittingDateDesc";
        };
        FullSearchResult: {
            /** Format: int32 */
            TotalMembers?: number;
            /** Format: int32 */
            TotalContributions?: number;
            /** Format: int32 */
            TotalWrittenStatements?: number;
            /** Format: int32 */
            TotalWrittenAnswers?: number;
            /** Format: int32 */
            TotalCorrections?: number;
            /** Format: int32 */
            TotalPetitions?: number;
            /** Format: int32 */
            TotalDebates?: number;
            /** Format: int32 */
            TotalCommittees?: number;
            /** Format: int32 */
            TotalDivisions?: number;
            SearchTerms?: string[];
            Members?: components["schemas"]["Member"][];
            Contributions?: components["schemas"]["SearchReferencesItem"][];
            WrittenStatements?: components["schemas"]["SearchReferencesItem"][];
            WrittenAnswers?: components["schemas"]["SearchReferencesItem"][];
            Corrections?: components["schemas"]["SearchReferencesItem"][];
            Petitions?: components["schemas"]["SearchDebateItem"][];
            Debates?: components["schemas"]["SearchDebateItem"][];
            Divisions?: components["schemas"]["DivisionOverview"][];
            Committees?: components["schemas"]["SearchCommitteeItem"][];
        };
        SearchReferencesItem: {
            MemberName?: string;
            /** Format: int32 */
            MemberId?: number;
            AttributedTo?: string;
            /** Format: int64 */
            ItemId?: number;
            ContributionExtId?: string;
            ContributionText?: string;
            ContributionTextFull?: string;
            HRSTag?: string;
            HansardSection?: string;
            /** Format: date-time */
            Timecode?: string;
            DebateSection?: string;
            /** Format: int32 */
            DebateSectionId?: number;
            DebateSectionExtId?: string;
            /** Format: date-time */
            SittingDate?: string;
            Section?: string;
            House?: string;
            /** Format: int32 */
            OrderInDebateSection?: number;
            /** Format: int32 */
            DebateSectionOrder?: number;
            /** Format: int32 */
            Rank?: number;
        };
        SearchDebateItem: {
            DebateSection?: string;
            /** Format: date-time */
            SittingDate?: string;
            House?: string;
            Title?: string;
            /** Format: int32 */
            Rank?: number;
            DebateSectionExtId?: string;
        };
        SearchCommitteeItem: {
            House?: string;
            Title?: string;
            DebateSection?: string;
        };
        SearchContributionsQueryResult: {
            SearchTerms?: string[];
            /** Format: int32 */
            SpokenResultCount?: number;
            /** Format: int32 */
            WrittenResultCount?: number;
            /** Format: int32 */
            CorrectionsResultCount?: number;
            /** Format: int32 */
            DivisionsResultCount?: number;
            Results?: components["schemas"]["SearchReferencesItem"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        TimelineDataItem: {
            /** Format: date-time */
            GroupingDate?: string;
            /** Format: int32 */
            GroupingSize?: number;
            /** Format: int32 */
            Count?: number;
        };
        QueryResult_HouseSittingDay_: {
            Results?: components["schemas"]["HouseSittingDay"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        QueryResult_Member_: {
            Results?: components["schemas"]["Member"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        QueryResult_SearchDebateItem_: {
            Results?: components["schemas"]["SearchDebateItem"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        QueryResult_DivisionOverview_: {
            Results?: components["schemas"]["DivisionOverview"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        QueryResult_SearchCommitteeItem_: {
            Results?: components["schemas"]["SearchCommitteeItem"][];
            /** Format: int32 */
            TotalResultCount?: number;
        };
        QueryResult_TimelineDataItem_: {
            Results?: components["schemas"]["TimelineDataItem"][];
            /** Format: int32 */
            TotalResultCount?: number;
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
    Debates_GetSpeakersList: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
                format: string;
                /** @description the External ID of the required debate section */
                debateSectionExtId: string;
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
                    "application/json": number[];
                    "text/json": number[];
                };
            };
        };
    };
    Debates_GetDivisionsList: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
                format: string;
                /** @description the External ID of the required debate section */
                debateSectionExtId: string;
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
                    "application/json": components["schemas"]["DivisionOverview"][];
                    "text/json": components["schemas"]["DivisionOverview"][];
                };
            };
        };
    };
    Debates_GetDivision: {
        parameters: {
            query?: {
                /** @description whether or not to return EVEL (English votes for English laws) voters only */
                isEvel?: boolean;
            };
            header?: never;
            path: {
                /** @description the External ID of the required division */
                divisionExtId: string;
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["DivisionItem"];
                    "text/json": components["schemas"]["DivisionItem"];
                };
            };
        };
    };
    Debates_GetDebate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the External ID of the required debate section */
                debateSectionExtId: string;
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["Debate"];
                    "text/json": components["schemas"]["Debate"];
                };
            };
        };
    };
    Debates_GetTopLevelDebateId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the External ID of the required debate section */
                debateSectionExtId: string;
                /** @description the required output format (xml or json) */
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
                    "application/json": string;
                    "text/json": string;
                };
            };
        };
    };
    Debates_GetTopLevelDebateByTitle: {
        parameters: {
            query: {
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
                /** @description sitting date of the required debate (yyyy-mm-dd) */
                date: string;
                /** @description section title of the required debate */
                sectionTitle: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["Debate"];
                    "text/json": components["schemas"]["Debate"];
                };
            };
        };
    };
    Debates_GetMemberContributionDetails: {
        parameters: {
            query: {
                /** @description the External ID of the required debate section */
                debateSectionExtId: string;
            };
            header?: never;
            path: {
                /** @description the MNIS Id of the Member */
                memberId: number;
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["GetMemberContributionDetailsResult"][];
                    "text/json": components["schemas"]["GetMemberContributionDetailsResult"][];
                };
            };
        };
    };
    HistoricSittingDays_Query: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParams.house"?: "Commons" | "Lords";
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParams.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParams.endDate"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParams.skip"?: number;
                /** @description how many results to return per page (maximum 100) */
                "queryParams.take"?: number;
                /** @description how to order results (SittingDateAsc or SittingDateDesc) */
                "queryParams.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
                /** @description whether or not to only include results with sitting sections */
                "queryParams.hasSittingSections"?: boolean;
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
                    "application/json": components["schemas"]["QueryResult_HouseSittingDay_"];
                    "text/json": components["schemas"]["QueryResult_HouseSittingDay_"];
                };
            };
        };
    };
    HistoricSittingDays_Details: {
        parameters: {
            query: {
                /** @description whether or not to flatten the structure of the returned data */
                flattenStructure: boolean;
            };
            header?: never;
            path: {
                /** @description the parliamentary house (Commons or Lords) */
                house: "Commons" | "Lords";
                /** @description the sitting date <br />(yyyy-mm-dd) */
                sittingDate: string;
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
                    "application/json": components["schemas"]["SittingDayDetailsDto"];
                    "text/json": components["schemas"]["SittingDayDetailsDto"];
                };
            };
        };
    };
    Overview_GetSpeakersList: {
        parameters: {
            query: {
                /** @description Hansard section name e.g. CWA, QWA, WMS */
                section: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
                format: string;
                /** @description Sitting date (yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
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
                    "application/json": number[];
                    "text/json": number[];
                };
            };
        };
    };
    Overview_GetCurrentlyProcessing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": string;
                    "text/json": string;
                };
            };
        };
    };
    Overview_GetLastSittingDate: {
        parameters: {
            query: {
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": string;
                    "text/json": string;
                };
            };
        };
    };
    Overview_GetFirstYear: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
        };
    };
    Overview_GetLinkedSittingDates: {
        parameters: {
            query: {
                /** @description the date from which to calculate the previous and next sitting dates (yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["LinkedSittingDates"];
                    "text/json": components["schemas"]["LinkedSittingDates"];
                };
            };
        };
    };
    Overview_DatesWithSittings: {
        parameters: {
            query: {
                /** @description the year for which to return sitting dates (yyyy) */
                year: number;
                /** @description the month for which to return sitting dates (mm) */
                month: number;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["CalendarItem"][];
                    "text/json": components["schemas"]["CalendarItem"][];
                };
            };
        };
    };
    Overview_SectionsForDay: {
        parameters: {
            query: {
                /** @description date of debate (yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": string[];
                    "text/json": string[];
                };
            };
        };
    };
    Overview_GetSectionTrees: {
        parameters: {
            query: {
                /** @description the Hansard section name<br />(Hansard section names are returned from ‘Sections For Day’ operation) */
                section: string;
                /** @description The sitting date (yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
                /** @description whether or not to group the results by owner */
                groupByOwner?: boolean;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["SectionTree"][];
                    "text/json": components["schemas"]["SectionTree"][];
                };
            };
        };
    };
    Overview_PdfsForDay: {
        parameters: {
            query: {
                /** @description the sitting date (yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["PdfInfo"][];
                    "text/json": components["schemas"]["PdfInfo"][];
                };
            };
        };
    };
    Pdfs_GetPdf: {
        parameters: {
            query: {
                /** @description the sitting date<br />(yyyy-mm-dd) */
                date: string;
                /** @description the parliamentary house (Commons or Lords) */
                house: string;
                /** @description the External Id of a debate section */
                sectionExternalId?: string;
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["PdfData"];
                    "text/json": components["schemas"]["PdfData"];
                };
            };
        };
    };
    Search_GetParliSearchRedirect: {
        parameters: {
            query: {
                /** @description The External Id of a content item, debate section or division */
                externalId: string;
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": string;
                    "text/json": string;
                };
            };
        };
    };
    Search_FullSearch: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["FullSearchResult"];
                    "text/json": components["schemas"]["FullSearchResult"];
                };
            };
        };
    };
    Search_SearchMembers: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_Member_"];
                    "text/json": components["schemas"]["QueryResult_Member_"];
                };
            };
        };
    };
    Search_SearchContributions: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The type of contribution to return (Spoken, Written, Corrections or Petitions) */
                contributionType: string;
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["SearchContributionsQueryResult"];
                    "text/json": components["schemas"]["SearchContributionsQueryResult"];
                };
            };
        };
    };
    Search_GetMemberContributionSummary: {
        parameters: {
            query: {
                /** @description How many results to skip */
                skip: number;
                /** @description How many results to return per page */
                take: number;
            };
            header?: never;
            path: {
                /** @description The member id for which to search */
                memberId: number;
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                };
            };
        };
    };
    Search_SearchDebates: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": Record<string, never>;
                    "text/json": Record<string, never>;
                };
            };
        };
    };
    Search_SearchDivisions: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_DivisionOverview_"];
                    "text/json": components["schemas"]["QueryResult_DivisionOverview_"];
                };
            };
        };
    };
    Search_FindDebateByColumnNumber: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                };
            };
        };
    };
    Search_FindDebateByContributionId: {
        parameters: {
            query: {
                /** @description The external reference id of the contribution */
                contentItemExternalId: string;
                /** @description The house to search */
                house: string;
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                };
            };
        };
    };
    Search_SearchPetitions: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                };
            };
        };
    };
    Search_SearchCommittees: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchCommitteeItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchCommitteeItem_"];
                };
            };
        };
    };
    Search_SearchCommitteeDebates: {
        parameters: {
            query?: {
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description The required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                    "text/json": components["schemas"]["QueryResult_SearchDebateItem_"];
                };
            };
        };
    };
    TimelineStats_Query: {
        parameters: {
            query?: {
                /** @description the type of contribution to return (Spoken, Written, Corrections or Petitions */
                contributionType?: "Spoken" | "Written" | "Corrections" | "Petitions" | "WrittenAnswers" | "Divisions";
                /** @description whether or not to search debates */
                isDebatesSearch?: boolean;
                /** @description the parliamentary house (Commons or Lords) */
                "queryParameters.house"?: string;
                /** @description the date to search from (yyyy-mm-dd) */
                "queryParameters.startDate"?: string;
                /** @description the date to search to (yyyy-mm-dd) */
                "queryParameters.endDate"?: string;
                /** @description the date to search (yyyy-mm-dd) */
                "queryParameters.date"?: string;
                /** @description the unique id of a member (member details are returned from ‘Search Members’ operation) */
                "queryParameters.memberId"?: number;
                /** @description the unique id of the division to be searched */
                "queryParameters.divisionId"?: number;
                /** @description Hansard identifier */
                "queryParameters.hansardIdentifier"?: string;
                /** @description the term for which to search */
                "queryParameters.searchTerm"?: string;
                /** @description how many results to skip (Default is 0) */
                "queryParameters.skip"?: number;
                /** @description how many results to return per page */
                "queryParameters.take"?: number;
                /** @description the list of member ids in which to search */
                "queryParameters.memberIds"?: string;
                /** @description department to be searched */
                "queryParameters.department"?: string;
                /** @description debate type to be searched */
                "queryParameters.debateType"?: string;
                /** @description whether or not to include former members */
                "queryParameters.includeFormer"?: boolean;
                /** @description whether or not to include current members */
                "queryParameters.includeCurrent"?: boolean;
                /** @description whether or not to only include results with a division */
                "queryParameters.withDivision"?: boolean;
                /** @description the series number in which to search */
                "queryParameters.seriesNumber"?: number;
                /** @description the Volume Number in which to search */
                "queryParameters.volumeNumber"?: number;
                /** @description the Column number for which to search */
                "queryParameters.columnNumber"?: string;
                /** @description the title of the committee to be searched */
                "queryParameters.committeeTitle"?: string;
                /** @description committee type to be searched */
                "queryParameters.committeeType"?: number;
                /** @description whether or not to include committee divisions */
                "queryParameters.includeCommitteeDivisions"?: boolean;
                /** @description unique id of the section to search */
                "queryParameters.section"?: number;
                /** @description output type (List or Group) */
                "queryParameters.outputType"?: string;
                /** @description the unique id of the debate section to search */
                "queryParameters.debateSectionId"?: number;
                /** @description timeline grouping size. Enter Day, Month or Year */
                "queryParameters.timelineGroupingSize"?: "Day" | "Month" | "Year";
                /** @description order results (SittingDateAsc or SittingDateDesc) */
                "queryParameters.orderBy"?: "SittingDateAsc" | "SittingDateDesc";
            };
            header?: never;
            path: {
                /** @description the required output format (xml or json) */
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
                    "application/json": components["schemas"]["QueryResult_TimelineDataItem_"];
                    "text/json": components["schemas"]["QueryResult_TimelineDataItem_"];
                };
            };
        };
    };
}

