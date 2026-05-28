/* Auto-generated from https://bills-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/api/v1/Bills/{billId}/Stages/{billStageId}/Amendments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of amendments. */
        get: operations["GetAmendments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/Stages/{billStageId}/Amendments/{amendmentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an amendment. */
        get: operations["GetAmendment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/NewsArticles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of news articles for a Bill. */
        get: operations["GetNewsArticles"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/BillTypes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of Bill types. */
        get: {
            parameters: {
                query?: {
                    Category?: components["schemas"]["BillTypeCategory"];
                    Skip?: number;
                    Take?: number;
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
                        "text/plain": components["schemas"]["BillTypeSearchResult"];
                        "application/json": components["schemas"]["BillTypeSearchResult"];
                        "text/json": components["schemas"]["BillTypeSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Bills": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of Bills. */
        get: operations["GetBills"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a Bill. */
        get: operations["GetBill"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/Stages/{billStageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a Bill stage. */
        get: operations["GetBillStageDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/Stages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns all Bill stages. */
        get: {
            parameters: {
                query?: {
                    Skip?: number;
                    Take?: number;
                };
                header?: never;
                path: {
                    /** @description Stages relating to a Bill with Bill ID specified */
                    billId: number;
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
                        "text/plain": components["schemas"]["StageSummarySearchResult"];
                        "application/json": components["schemas"]["StageSummarySearchResult"];
                        "text/json": components["schemas"]["StageSummarySearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Publications/{publicationId}/Documents/{documentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return information on a document. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Document with publication Id specified */
                    publicationId: number;
                    /** @description Document with Id specified */
                    documentId: number;
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
                        "text/plain": components["schemas"]["PublicationDocument"];
                        "application/json": components["schemas"]["PublicationDocument"];
                        "text/json": components["schemas"]["PublicationDocument"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Publications/{publicationId}/Documents/{documentId}/Download": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a document. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Document with publication Id specified */
                    publicationId: number;
                    /** @description Document with Id specified */
                    documentId: number;
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
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Bills/{billId}/Stages/{billStageId}/PingPongItems": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of motions or amendments. */
        get: operations["SearchPingPongItems"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/Stages/{billStageId}/PingPongItems/{pingPongItemId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns amendment or motion detail. */
        get: operations["GetPingPongItem"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/PublicationTypes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of publication types. */
        get: {
            parameters: {
                query?: {
                    Skip?: number;
                    Take?: number;
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
                        "text/plain": components["schemas"]["PublicationTypeSearchResult"];
                        "application/json": components["schemas"]["PublicationTypeSearchResult"];
                        "text/json": components["schemas"]["PublicationTypeSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Bills/{billId}/Publications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Bill publications. */
        get: operations["GetBillPublication"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Bills/{billId}/Stages/{stageId}/Publications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of Bill stage publications. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    billId: number;
                    stageId: number;
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
                        "text/plain": components["schemas"]["BillStagePublicationList"];
                        "application/json": components["schemas"]["BillStagePublicationList"];
                        "text/json": components["schemas"]["BillStagePublicationList"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Rss/allbills.rss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an Rss feed of all Bills. */
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
    "/api/v1/Rss/publicbills.rss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an Rss feed of public Bills. */
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
    "/api/v1/Rss/privatebills.rss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an Rss feed of private Bills. */
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
    "/api/v1/Rss/Bills/{id}.rss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns an Rss feed of a certain Bill. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of Bill */
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
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
    "/api/v1/Sittings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of Sittings. */
        get: operations["GetSittings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/Stages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of Bill stages. */
        get: {
            parameters: {
                query?: {
                    Skip?: number;
                    Take?: number;
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
                        "text/plain": components["schemas"]["StageReferenceSearchResult"];
                        "application/json": components["schemas"]["StageReferenceSearchResult"];
                        "text/json": components["schemas"]["StageReferenceSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @enum {string} */
        AmendmentDecision: "NoDecision" | "Withdrawn" | "Disagreed" | "NotMoved" | "Agreed" | "QuestionProposed" | "NotSelected" | "WithdrawnBeforeDebate" | "StoodPart" | "NotStoodPart" | "Preempted" | "NotCalled" | "NegativedOnDivision" | "AgreedOnDivision";
        /** @enum {string} */
        AmendmentDecisionSearch: "All" | "NoDecision" | "Withdrawn" | "Disagreed" | "NotMoved" | "Agreed" | "QuestionProposed" | "NotSelected" | "WithdrawnBeforeDebate" | "StoodPart" | "NotStoodPart" | "Preempted" | "NotCalled" | "NegativedOnDivision" | "AgreedOnDivision";
        AmendmentDetail: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            /** Format: int32 */
            amendmentId?: number;
            amendmentType?: components["schemas"]["AmendmentType"];
            /** Format: int32 */
            clause?: number | null;
            /** Format: int32 */
            schedule?: number | null;
            /** Format: int32 */
            pageNumber?: number | null;
            /** Format: int32 */
            lineNumber?: number | null;
            amendmentPosition?: string | null;
            marshalledListText?: string | null;
            dNum?: string | null;
            amendmentLines?: components["schemas"]["AmendmentLine"][] | null;
            explanatoryTextPrefix?: string | null;
            explanatoryText?: string | null;
            amendmentNote?: string | null;
            amendmentLocation?: string | null;
            mainHeader?: string | null;
        };
        AmendmentDetailMotionDetailPingPongItem: {
            type?: components["schemas"]["PingpongItemType"];
            amendment?: components["schemas"]["PingPongAmendmentDetail"];
            motion?: components["schemas"]["MotionDetail"];
        };
        AmendmentGroup: {
            text?: components["schemas"]["AmendmentLine"][] | null;
            amendments?: components["schemas"]["PingPongAmendment"][] | null;
            /** Format: int32 */
            sortOrder?: number;
        };
        AmendmentLine: {
            text?: string | null;
            /** Format: int32 */
            indentation?: number;
            hangingIndentation?: string | null;
            isImage?: boolean;
            imageType?: string | null;
        };
        AmendmentMember: {
            /** Format: int32 */
            memberId?: number;
            name?: string | null;
            party?: string | null;
            partyColour?: string | null;
            house?: components["schemas"]["House"];
            memberPhoto?: string | null;
            memberPage?: string | null;
            memberFrom?: string | null;
            /** Format: int32 */
            sortOrder?: number;
            isLead?: boolean;
        };
        AmendmentSearchItem: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            /** Format: int32 */
            amendmentId?: number;
            amendmentType?: components["schemas"]["AmendmentType"];
            /** Format: int32 */
            clause?: number | null;
            /** Format: int32 */
            schedule?: number | null;
            /** Format: int32 */
            pageNumber?: number | null;
            /** Format: int32 */
            lineNumber?: number | null;
            amendmentPosition?: string | null;
            marshalledListText?: string | null;
            dNum?: string | null;
            summaryText?: string[] | null;
        };
        AmendmentSearchItemSearchResult: {
            items?: components["schemas"]["AmendmentSearchItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        AmendmentSummaryMotionSummaryPingPongItem: {
            type?: components["schemas"]["PingpongItemType"];
            amendment?: components["schemas"]["PingPongAmendmentSummary"];
            motion?: components["schemas"]["MotionSummary"];
        };
        AmendmentSummaryMotionSummaryPingPongItemSearchResult: {
            items?: components["schemas"]["AmendmentSummaryMotionSummaryPingPongItem"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        /** @enum {string} */
        AmendmentType: "EditLongTitle" | "EditBillBody" | "AddClauseOrSchedule" | "DeleteClauseOrSchedule";
        Bill: {
            /** Format: int32 */
            billId?: number;
            shortTitle?: string | null;
            formerShortTitle?: string | null;
            currentHouse?: components["schemas"]["House"];
            originatingHouse?: components["schemas"]["House"];
            /** Format: date-time */
            lastUpdate?: string;
            /** Format: date-time */
            billWithdrawn?: string | null;
            isDefeated?: boolean;
            /** Format: int32 */
            billTypeId?: number;
            /** Format: int32 */
            introducedSessionId?: number;
            includedSessionIds?: number[] | null;
            isAct?: boolean;
            currentStage?: components["schemas"]["StageSummary"];
            longTitle?: string | null;
            summary?: string | null;
            sponsors?: components["schemas"]["Sponsor"][] | null;
            promoters?: components["schemas"]["Promoter"][] | null;
            petitioningPeriod?: string | null;
            petitionInformation?: string | null;
            agent?: components["schemas"]["BillAgent"];
        };
        BillAgent: {
            name?: string | null;
            address?: string | null;
            phoneNo?: string | null;
            email?: string | null;
            website?: string | null;
        };
        BillPublication: {
            /** Format: int32 */
            id?: number;
            title?: string | null;
            publicationType?: components["schemas"]["PublicationType"];
            /** Format: date-time */
            displayDate?: string;
            links?: components["schemas"]["PublicationLink"][] | null;
            files?: components["schemas"]["PublicationDocument"][] | null;
            house?: components["schemas"]["House"];
        };
        BillPublicationList: {
            /** Format: int32 */
            billId?: number;
            publications?: components["schemas"]["BillPublication"][] | null;
        };
        /** @enum {string} */
        BillSortOrder: "TitleAscending" | "TitleDescending" | "DateUpdatedAscending" | "DateUpdatedDescending";
        BillStageDetails: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            stageId?: number;
            /** Format: int32 */
            sessionId?: number;
            description?: string | null;
            abbreviation?: string | null;
            house?: components["schemas"]["House"];
            stageSittings?: components["schemas"]["BillStageSitting"][] | null;
            /** Format: int32 */
            sortOrder?: number;
            committee?: components["schemas"]["Committee"];
            /** Format: int32 */
            nextStageBillStageId?: number | null;
            /** Format: int32 */
            previousStageBillStageId?: number | null;
            /** Format: date-time */
            lastUpdate?: string;
            hasMotions?: boolean;
        };
        BillStagePublicationList: {
            /** Format: int32 */
            billStageId?: number;
            publications?: components["schemas"]["Publication"][] | null;
            sittings?: components["schemas"]["BillStageSittingPublicationList"][] | null;
        };
        BillStageSitting: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            stageId?: number;
            /** Format: int32 */
            billStageId?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: date-time */
            date?: string | null;
        };
        BillStageSittingPublicationList: {
            /** Format: int32 */
            sittingId?: number;
            publications?: components["schemas"]["Publication"][] | null;
        };
        BillStageSittingSearchResult: {
            items?: components["schemas"]["BillStageSitting"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        BillSummary: {
            /** Format: int32 */
            billId?: number;
            shortTitle?: string | null;
            formerShortTitle?: string | null;
            currentHouse?: components["schemas"]["House"];
            originatingHouse?: components["schemas"]["House"];
            /** Format: date-time */
            lastUpdate?: string;
            /** Format: date-time */
            billWithdrawn?: string | null;
            isDefeated?: boolean;
            /** Format: int32 */
            billTypeId?: number;
            /** Format: int32 */
            introducedSessionId?: number;
            includedSessionIds?: number[] | null;
            isAct?: boolean;
            currentStage?: components["schemas"]["StageSummary"];
        };
        BillSummarySearchResult: {
            items?: components["schemas"]["BillSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        BillType: {
            /** Format: int32 */
            id?: number;
            category?: components["schemas"]["BillTypeCategory"];
            name?: string | null;
            description?: string | null;
        };
        /** @enum {string} */
        BillTypeCategory: "Public" | "Private" | "Hybrid";
        BillTypeSearchResult: {
            items?: components["schemas"]["BillType"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        Committee: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            category?: string | null;
            house?: components["schemas"]["CommitteeHouse"];
            url?: string | null;
        };
        /** @enum {string} */
        CommitteeHouse: "Commons" | "Lords" | "Joint";
        /** @enum {string} */
        House: "All" | "Commons" | "Lords" | "Unassigned";
        Member: {
            /** Format: int32 */
            memberId?: number;
            name?: string | null;
            party?: string | null;
            partyColour?: string | null;
            house?: components["schemas"]["House"];
            memberPhoto?: string | null;
            memberPage?: string | null;
            memberFrom?: string | null;
        };
        MotionDetail: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            type?: components["schemas"]["PingpongItemType"];
            number?: string | null;
            summary?: string | null;
            motionGroups?: components["schemas"]["MotionGroup"][] | null;
        };
        MotionGroup: {
            text?: components["schemas"]["AmendmentLine"][] | null;
            amendments?: components["schemas"]["PingPongAmendment"][] | null;
            /** Format: int32 */
            sortOrder?: number;
        };
        MotionSummary: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            type?: components["schemas"]["PingpongItemType"];
            number?: string | null;
            summary?: string | null;
        };
        NewsArticlesSummary: {
            /** Format: int32 */
            id?: number;
            title?: string | null;
            content?: string | null;
            /** Format: date-time */
            displayDate?: string | null;
        };
        NewsArticlesSummarySearchResult: {
            items?: components["schemas"]["NewsArticlesSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        Organisation: {
            name?: string | null;
            url?: string | null;
        };
        /** @enum {string} */
        OriginatingHouse: "All" | "Commons" | "Lords";
        PingPongAmendment: {
            number?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            /** Format: int32 */
            sortOrder?: number;
            text?: components["schemas"]["AmendmentLine"][] | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
        };
        PingPongAmendmentDetail: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            type?: components["schemas"]["PingpongItemType"];
            number?: string | null;
            summary?: string | null;
            amendmentGroups?: components["schemas"]["AmendmentGroup"][] | null;
        };
        PingPongAmendmentSummary: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            billId?: number;
            /** Format: int32 */
            billStageId?: number;
            statusIndicator?: string | null;
            decision?: components["schemas"]["AmendmentDecision"];
            decisionExplanation?: string | null;
            sponsors?: components["schemas"]["AmendmentMember"][] | null;
            type?: components["schemas"]["PingpongItemType"];
            number?: string | null;
            summary?: string | null;
        };
        /** @enum {string} */
        PingpongItemType: "Motion" | "Amendment";
        ProblemDetails: {
            type?: string | null;
            title?: string | null;
            /** Format: int32 */
            status?: number | null;
            detail?: string | null;
            instance?: string | null;
        } & {
            [key: string]: unknown;
        };
        Promoter: {
            organisationName?: string | null;
            organisationUrl?: string | null;
        };
        Publication: {
            /** Format: int32 */
            id?: number;
            title?: string | null;
            publicationType?: components["schemas"]["PublicationType"];
            /** Format: date-time */
            displayDate?: string;
            links?: components["schemas"]["PublicationLink"][] | null;
            files?: components["schemas"]["PublicationDocument"][] | null;
        };
        PublicationDocument: {
            /** Format: int32 */
            id?: number;
            filename?: string | null;
            contentType?: string | null;
            /** Format: int32 */
            contentLength?: number;
        };
        PublicationLink: {
            /** Format: int32 */
            id?: number;
            title?: string | null;
            url?: string | null;
            contentType?: string | null;
        };
        PublicationType: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            description?: string | null;
        };
        PublicationTypeSearchResult: {
            items?: components["schemas"]["PublicationType"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        Sponsor: {
            member?: components["schemas"]["Member"];
            organisation?: components["schemas"]["Organisation"];
            /** Format: int32 */
            sortOrder?: number;
        };
        StageReference: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            house?: components["schemas"]["House"];
        };
        StageReferenceSearchResult: {
            items?: components["schemas"]["StageReference"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
        };
        StageSummary: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            stageId?: number;
            /** Format: int32 */
            sessionId?: number;
            description?: string | null;
            abbreviation?: string | null;
            house?: components["schemas"]["House"];
            stageSittings?: components["schemas"]["BillStageSitting"][] | null;
            /** Format: int32 */
            sortOrder?: number;
        };
        StageSummarySearchResult: {
            items?: components["schemas"]["StageSummary"][] | null;
            /** Format: int32 */
            totalResults?: number;
            /** Format: int32 */
            itemsPerPage?: number;
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
    GetAmendments: {
        parameters: {
            query?: {
                SearchTerm?: string;
                AmendmentNumber?: string;
                Decision?: components["schemas"]["AmendmentDecisionSearch"];
                MemberId?: number;
                Skip?: number;
                Take?: number;
            };
            header?: never;
            path: {
                /** @description Amendments relating to a Bill with Bill ID specified */
                billId: number;
                /** @description Amendments relating to a Bill stage with Bill stage ID specified */
                billStageId: number;
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
                    "text/plain": components["schemas"]["AmendmentSearchItemSearchResult"];
                    "application/json": components["schemas"]["AmendmentSearchItemSearchResult"];
                    "text/json": components["schemas"]["AmendmentSearchItemSearchResult"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetAmendment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Amendment relating to a bill with bill ID specified */
                billId: number;
                /** @description Amendment relating to a bill stage with bill stage ID specified */
                billStageId: number;
                /** @description Amendment with amendment ID specified */
                amendmentId: number;
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
                    "text/plain": components["schemas"]["AmendmentDetail"];
                    "application/json": components["schemas"]["AmendmentDetail"];
                    "text/json": components["schemas"]["AmendmentDetail"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetNewsArticles: {
        parameters: {
            query?: {
                Skip?: number;
                Take?: number;
            };
            header?: never;
            path: {
                billId: number;
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
                    "text/plain": components["schemas"]["NewsArticlesSummarySearchResult"];
                    "application/json": components["schemas"]["NewsArticlesSummarySearchResult"];
                    "text/json": components["schemas"]["NewsArticlesSummarySearchResult"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBills: {
        parameters: {
            query?: {
                SearchTerm?: string;
                Session?: number;
                CurrentHouse?: components["schemas"]["House"];
                OriginatingHouse?: components["schemas"]["OriginatingHouse"];
                MemberId?: number;
                DepartmentId?: number;
                BillStage?: number[];
                BillStagesExcluded?: number[];
                IsDefeated?: boolean;
                IsWithdrawn?: boolean;
                BillType?: number[];
                SortOrder?: components["schemas"]["BillSortOrder"];
                BillIds?: number[];
                IsInAmendableStage?: boolean;
                Skip?: number;
                Take?: number;
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
                    "text/plain": components["schemas"]["BillSummarySearchResult"];
                    "application/json": components["schemas"]["BillSummarySearchResult"];
                    "text/json": components["schemas"]["BillSummarySearchResult"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBill: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Bill with ID specified */
                billId: number;
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
                    "text/plain": components["schemas"]["Bill"];
                    "application/json": components["schemas"]["Bill"];
                    "text/json": components["schemas"]["Bill"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBillStageDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Bill stage relating to Bill with Bill ID specified */
                billId: number;
                /** @description Bill stage with ID specified */
                billStageId: number;
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
                    "text/plain": components["schemas"]["BillStageDetails"];
                    "application/json": components["schemas"]["BillStageDetails"];
                    "text/json": components["schemas"]["BillStageDetails"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    SearchPingPongItems: {
        parameters: {
            query?: {
                SearchTerm?: string;
                AmendmentNumber?: string;
                Decision?: components["schemas"]["AmendmentDecisionSearch"];
                MemberId?: number;
                Skip?: number;
                Take?: number;
            };
            header?: never;
            path: {
                /** @description Motions or amendments relating to a Bill with Bill ID specified */
                billId: number;
                /** @description Motions or amendments relating to a Bill stage with Bill stage ID specified */
                billStageId: number;
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
                    "text/plain": components["schemas"]["AmendmentSummaryMotionSummaryPingPongItemSearchResult"];
                    "application/json": components["schemas"]["AmendmentSummaryMotionSummaryPingPongItemSearchResult"];
                    "text/json": components["schemas"]["AmendmentSummaryMotionSummaryPingPongItemSearchResult"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetPingPongItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Motions or amendments relating to a bill with bill ID specified */
                billId: number;
                /** @description Motions or amendments relating to a bill stage with bill stage ID specified */
                billStageId: number;
                /** @description Motions or amendments with ping pong item ID specified */
                pingPongItemId: number;
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
                    "text/plain": components["schemas"]["AmendmentDetailMotionDetailPingPongItem"];
                    "application/json": components["schemas"]["AmendmentDetailMotionDetailPingPongItem"];
                    "text/json": components["schemas"]["AmendmentDetailMotionDetailPingPongItem"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetBillPublication: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Publications relating to Bill with Bill ID specified */
                billId: number;
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
                    "text/plain": components["schemas"]["BillPublicationList"];
                    "application/json": components["schemas"]["BillPublicationList"];
                    "text/json": components["schemas"]["BillPublicationList"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
    GetSittings: {
        parameters: {
            query?: {
                House?: components["schemas"]["House"];
                DateFrom?: string;
                DateTo?: string;
                Skip?: number;
                Take?: number;
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
                    "text/plain": components["schemas"]["BillStageSittingSearchResult"];
                    "application/json": components["schemas"]["BillStageSittingSearchResult"];
                    "text/json": components["schemas"]["BillStageSittingSearchResult"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": components["schemas"]["ProblemDetails"];
                    "application/json": components["schemas"]["ProblemDetails"];
                    "text/json": components["schemas"]["ProblemDetails"];
                };
            };
        };
    };
}

