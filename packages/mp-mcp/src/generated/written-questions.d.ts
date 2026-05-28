/* Auto-generated from https://questions-statements-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/api/dailyreports/dailyreports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of daily reports */
        get: {
            parameters: {
                query?: {
                    /** @description Daily report with report date on or after the date specified. Date format yyyy-mm-dd */
                    dateFrom?: string;
                    /** @description Daily report with report date on or before the date specified. Date format yyyy-mm-dd */
                    dateTo?: string;
                    /** @description Daily report relating to the House specified. Defaults to Bicameral */
                    house?: components["schemas"]["HouseEnum"];
                    /** @description Number of records to skip, default is 0 */
                    skip?: number;
                    /** @description Number of records to take, default is 20 */
                    take?: number;
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
                        "text/plain": components["schemas"]["DailyReportViewModelSearchResult"];
                        "application/json": components["schemas"]["DailyReportViewModelSearchResult"];
                        "text/json": components["schemas"]["DailyReportViewModelSearchResult"];
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
    "/api/writtenquestions/questions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of written questions */
        get: {
            parameters: {
                query?: {
                    /** @description Written questions asked by member with member ID specified */
                    askingMemberId?: number;
                    /** @description Written questions answered by member with member ID specified */
                    answeringMemberId?: number;
                    /** @description Written questions tabled on or after the date specified. Date format yyyy-mm-dd */
                    tabledWhenFrom?: string;
                    /** @description Written questions DateForAnswer on or after the date specified format yyyy-mm-dd */
                    dateForAnswerWhenFrom?: string;
                    /** @description Written questions DateForAnswer on or before the date specified format yyyy-mm-dd */
                    dateForAnswerWhenTo?: string;
                    /** @description Written questions tabled on or before the date specified. Date format yyyy-mm-dd */
                    tabledWhenTo?: string;
                    /** @description Written questions that have been answered, unanswered or either. */
                    answered?: components["schemas"]["Answered"];
                    /** @description Written questions answered on or after the date specified. Date format yyyy-mm-dd */
                    answeredWhenFrom?: string;
                    /** @description Written questions answered on or before the date specified. Date format yyyy-mm-dd */
                    answeredWhenTo?: string;
                    /** @description Written questions with the status specified */
                    questionStatus?: components["schemas"]["QuestionStatusEnum"];
                    /** @description Include written questions that have been withdrawn */
                    includeWithdrawn?: boolean;
                    /** @description Expand the details of Members in the results */
                    expandMember?: boolean;
                    /** @description Written questions corrected on or after the date specified. Date format yyyy-mm-dd */
                    correctedWhenFrom?: string;
                    /** @description Written questions corrected on or before the date specified. Date format yyyy-mm-dd */
                    correctedWhenTo?: string;
                    /** @description The Session status for which the Questions data will be returned */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                    /** @description Written questions / statements containing the search term specified, searches item content */
                    searchTerm?: string;
                    /** @description Written questions / statements with the uin specified */
                    uIN?: string;
                    /** @description Written questions / statements relating to the answering bodies with the IDs specified */
                    answeringBodies?: number[];
                    /** @description Written questions / statements relating to the members with the IDs specified */
                    members?: number[];
                    /** @description Written questions / statements relating to the House specified */
                    house?: components["schemas"]["HouseEnum"];
                    /** @description Number of records to skip, default is 0 */
                    skip?: number;
                    /** @description Number of records to take, default is 20 */
                    take?: number;
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
                        "text/plain": components["schemas"]["QuestionsViewModelSearchResult"];
                        "application/json": components["schemas"]["QuestionsViewModelSearchResult"];
                        "text/json": components["schemas"]["QuestionsViewModelSearchResult"];
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
    "/api/writtenquestions/questions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a written question */
        get: {
            parameters: {
                query?: {
                    /** @description Expand the details of Members in the result */
                    expandMember?: boolean;
                    /** @description Session status to get the Questions data for */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                };
                header?: never;
                path: {
                    /** @description written question with ID specified */
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
                        "text/plain": components["schemas"]["QuestionsViewModelItem"];
                        "application/json": components["schemas"]["QuestionsViewModelItem"];
                        "text/json": components["schemas"]["QuestionsViewModelItem"];
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
    "/api/writtenquestions/questions/{date}/{uin}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a written question */
        get: {
            parameters: {
                query?: {
                    /** @description Expand the details of Members in the results */
                    expandMember?: boolean;
                    /** @description Session status to get the Questions data for */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                };
                header?: never;
                path: {
                    /** @description Written question on date specified */
                    date: string;
                    /** @description Written question with uid specified */
                    uin: string;
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
                        "text/plain": components["schemas"]["QuestionsViewModelItem"];
                        "application/json": components["schemas"]["QuestionsViewModelItem"];
                        "text/json": components["schemas"]["QuestionsViewModelItem"];
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
    "/api/writtenstatements/statements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a list of written statements */
        get: {
            parameters: {
                query?: {
                    /** @description Written statements made on or after the date specified. Date format yyyy-mm-dd */
                    madeWhenFrom?: string;
                    /** @description Written statements made on or before the date specified. Date format yyyy-mm-dd */
                    madeWhenTo?: string;
                    /** @description The Session status for which the Written statements data will be returned */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                    /** @description Written questions / statements containing the search term specified, searches item content */
                    searchTerm?: string;
                    /** @description Written questions / statements with the uin specified */
                    uIN?: string;
                    /** @description Written questions / statements relating to the answering bodies with the IDs specified */
                    answeringBodies?: number[];
                    /** @description Written questions / statements relating to the members with the IDs specified */
                    members?: number[];
                    /** @description Written questions / statements relating to the House specified */
                    house?: components["schemas"]["HouseEnum"];
                    /** @description Number of records to skip, default is 0 */
                    skip?: number;
                    /** @description Number of records to take, default is 20 */
                    take?: number;
                    /** @description Expand the details of Members in the results */
                    expandMember?: boolean;
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
                        "text/plain": components["schemas"]["StatementsViewModelSearchResult"];
                        "application/json": components["schemas"]["StatementsViewModelSearchResult"];
                        "text/json": components["schemas"]["StatementsViewModelSearchResult"];
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
    "/api/writtenstatements/statements/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a written statement */
        get: {
            parameters: {
                query?: {
                    /** @description Expand the details of Members in the results */
                    expandMember?: boolean;
                    /** @description Session status to filter the Written statement records */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                };
                header?: never;
                path: {
                    /** @description Written statement with ID specified */
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
                        "text/plain": components["schemas"]["StatementsViewModelSearchResult"];
                        "application/json": components["schemas"]["StatementsViewModelSearchResult"];
                        "text/json": components["schemas"]["StatementsViewModelSearchResult"];
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
    "/api/writtenstatements/statements/{date}/{uin}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a written statemnet */
        get: {
            parameters: {
                query?: {
                    /** @description Expand the details of Members in the results */
                    expandMember?: boolean;
                    /** @description Session status to filter the Written statement records */
                    sessionStatus?: components["schemas"]["SessionStatus"];
                };
                header?: never;
                path: {
                    /** @description Written statement on date specified */
                    date: string;
                    /** @description Written statement with uid specified */
                    uin: string;
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
                        "text/plain": components["schemas"]["StatementsViewModelItem"];
                        "application/json": components["schemas"]["StatementsViewModelItem"];
                        "text/json": components["schemas"]["StatementsViewModelItem"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @enum {string} */
        Answered: "Any" | "Answered" | "Unanswered";
        AttachmentViewModel: {
            url?: string | null;
            title?: string | null;
            fileType?: string | null;
            /** Format: int64 */
            fileSizeBytes?: number;
        };
        DailyReportViewModel: {
            house?: components["schemas"]["HouseEnum"];
            /** Format: date-time */
            date?: string;
            /** Format: int64 */
            fileSizeBytes?: number;
            url?: string | null;
        };
        DailyReportViewModelItem: {
            value?: components["schemas"]["DailyReportViewModel"];
            links?: components["schemas"]["Link"][] | null;
        };
        DailyReportViewModelSearchResult: {
            /** Format: int32 */
            totalResults?: number;
            results?: components["schemas"]["DailyReportViewModelItem"][] | null;
        };
        GroupedQuestionViewModel: {
            questionUin?: string | null;
            /** Format: date-time */
            dateTabled?: string;
        };
        /** @enum {string} */
        HouseEnum: "Bicameral" | "Commons" | "Lords";
        Link: {
            rel?: string | null;
            href?: string | null;
            method?: string | null;
        };
        LinkedStatements: {
            /** Format: int32 */
            linkedStatementId?: number;
            linkType?: components["schemas"]["StatementLinkTypeEnum"];
            /** Format: date-time */
            linkDate?: string;
        };
        MemberViewModel: {
            /** Format: int32 */
            id?: number;
            listAs?: string | null;
            name?: string | null;
            party?: string | null;
            partyColour?: string | null;
            partyAbbreviation?: string | null;
            memberFrom?: string | null;
            thumbnailUrl?: string | null;
        };
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
        /** @enum {string} */
        QuestionStatusEnum: "NotAnswered" | "AnsweredOnly" | "AllQuestions";
        QuestionsViewModel: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            askingMemberId?: number;
            askingMember?: components["schemas"]["MemberViewModel"];
            house?: components["schemas"]["HouseEnum"];
            memberHasInterest?: boolean;
            /** Format: date-time */
            dateTabled?: string;
            /** Format: date-time */
            dateForAnswer?: string;
            uin?: string | null;
            questionText?: string | null;
            /** Format: int32 */
            answeringBodyId?: number;
            answeringBodyName?: string | null;
            isWithdrawn?: boolean;
            isNamedDay?: boolean;
            groupedQuestions?: string[] | null;
            answerIsHolding?: boolean | null;
            answerIsCorrection?: boolean | null;
            /** Format: int32 */
            answeringMemberId?: number | null;
            answeringMember?: components["schemas"]["MemberViewModel"];
            /** Format: int32 */
            correctingMemberId?: number | null;
            correctingMember?: components["schemas"]["MemberViewModel"];
            /** Format: date-time */
            dateAnswered?: string | null;
            answerText?: string | null;
            originalAnswerText?: string | null;
            comparableAnswerText?: string | null;
            /** Format: date-time */
            dateAnswerCorrected?: string | null;
            /** Format: date-time */
            dateHoldingAnswer?: string | null;
            /** Format: int32 */
            attachmentCount?: number;
            heading?: string | null;
            attachments?: components["schemas"]["AttachmentViewModel"][] | null;
            groupedQuestionsDates?: components["schemas"]["GroupedQuestionViewModel"][] | null;
        };
        QuestionsViewModelItem: {
            value?: components["schemas"]["QuestionsViewModel"];
            links?: components["schemas"]["Link"][] | null;
        };
        QuestionsViewModelSearchResult: {
            /** Format: int32 */
            totalResults?: number;
            results?: components["schemas"]["QuestionsViewModelItem"][] | null;
        };
        /** @enum {string} */
        SessionStatus: "Current" | "Any";
        /** @enum {string} */
        StatementLinkTypeEnum: "CorrectedStatement" | "CorrectedAnswer" | "JointStatement";
        StatementsViewModel: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            memberId?: number;
            member?: components["schemas"]["MemberViewModel"];
            memberRole?: string | null;
            uin?: string | null;
            /** Format: date-time */
            dateMade?: string;
            /** Format: int32 */
            answeringBodyId?: number;
            answeringBodyName?: string | null;
            title?: string | null;
            text?: string | null;
            house?: components["schemas"]["HouseEnum"];
            /** Format: int32 */
            noticeNumber?: number;
            hasAttachments?: boolean;
            hasLinkedStatements?: boolean;
            linkedStatements?: components["schemas"]["LinkedStatements"][] | null;
            attachments?: components["schemas"]["AttachmentViewModel"][] | null;
        };
        StatementsViewModelItem: {
            value?: components["schemas"]["StatementsViewModel"];
            links?: components["schemas"]["Link"][] | null;
        };
        StatementsViewModelSearchResult: {
            /** Format: int32 */
            totalResults?: number;
            results?: components["schemas"]["StatementsViewModelItem"][] | null;
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

