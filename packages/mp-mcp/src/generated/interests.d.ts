/* Auto-generated from https://interests-api.parliament.uk/swagger/v1/swagger.json. Do not edit by hand. */
export interface paths {
    "/api/v1/Categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of categories interests should be registered under, sorted by category number. */
        get: {
            parameters: {
                query?: {
                    /** @description The number of records to skip from the first, default is 0. */
                    Skip?: number;
                    /** @description The number of records to return, default is 20. */
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
                        "application/json": components["schemas"]["PublishedCategoryApiLinkedSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ObjectApiResponse"];
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
    "/api/v1/Categories/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return details of an interest category by ID. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the category. */
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
                        "application/json": components["schemas"]["PublishedCategory"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ObjectApiResponse"];
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
    "/api/v1/Interests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of interests that have been published on a register. */
        get: {
            parameters: {
                query?: {
                    /** @description Search for an interest created by member with this ID. */
                    MemberId?: number;
                    /** @description Search for an interest within a specific category with this ID. */
                    CategoryId?: number;
                    /** @description Search for an interest published on or after this date. */
                    PublishedFrom?: string;
                    /** @description Search for an interest published on or before this date. */
                    PublishedTo?: string;
                    /** @description Search for an interest registered on or after this date. */
                    RegisteredFrom?: string;
                    /** @description Search for an interest registered on or before this date. */
                    RegisteredTo?: string;
                    /** @description Search for an interest which has any updates on or after this date. */
                    UpdatedFrom?: string;
                    /** @description Search for an interest which has any updates on or before this date. */
                    UpdatedTo?: string;
                    /** @description Search for an interest published in a register with this ID. If not provided, default value is latest register ID. */
                    RegisterId?: number;
                    /** @description If true returns related interests in a nested format, rather than as individual items. */
                    ExpandChildInterests?: boolean;
                    /** @description The number of records to return, default is 20. Maximum is 20. */
                    Take?: number;
                    /** @description The order in which to return records. */
                    SortOrder?: components["schemas"]["InterestsSortOrder"];
                    /** @description The number of records to skip from the first, default is 0. */
                    Skip?: number;
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
                        "application/json": components["schemas"]["PublishedInterestApiLinkedSearchResult"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ObjectApiResponse"];
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
    "/api/v1/Interests/csv": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return interests that have been published on a register as a collection of CSVs packaged in a ZIP file.
         * @description If the result set is an empty, an empty ZIP will be returned.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Search for an interest created by member with this ID. */
                    MemberId?: number;
                    /** @description Search for an interest with associated category with this ID. */
                    CategoryId?: number;
                    /** @description Search for an interest published on or after this date. */
                    PublishedFrom?: string;
                    /** @description Search for an interest published on or before this date. */
                    PublishedTo?: string;
                    /** @description Search for an interest registered on or after this date. */
                    RegisteredFrom?: string;
                    /** @description Search for an interest registered on or before this date. */
                    RegisteredTo?: string;
                    /** @description Search for an interest which has any updates on or after this date. */
                    UpdatedFrom?: string;
                    /** @description Search for an interest which has any updates on or before this date. */
                    UpdatedTo?: string;
                    /** @description Search for an interest published in a register with this ID. If not provided, default value is latest register ID. */
                    RegisterId?: number;
                    /** @description Returns a metadata file for each category, containing a list of fields which are available for a member to add further information about the interest. */
                    IncludeFieldDescriptions?: boolean;
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
    "/api/v1/Interests/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the latest version of an interest which has been published. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the interest. */
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
                        "application/json": components["schemas"]["PublishedInterest"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ObjectApiResponse"];
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
    "/api/v1/Registers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a list of published versions of registers of interests. */
        get: {
            parameters: {
                query?: {
                    /** @description Search for registers published within a parliamentary session with this ID. Find session data at https://whatson-api.parliament.uk/. */
                    SessionId?: number;
                    /** @description The number of records to skip from the first, default is 0. */
                    Skip?: number;
                    /** @description The number of records to return, default is 20. */
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
                        "application/json": components["schemas"]["PublishedRegisterApiLinkedSearchResult"];
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
    "/api/v1/Registers/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a published version of a register of interests by ID. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the register. */
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
                        "application/json": components["schemas"]["PublishedRegister"];
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
    "/api/v1/Registers/{id}/document": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a published register as a PDF document by ID. */
        get: {
            parameters: {
                query?: {
                    /** @description Whether to return a document containing the full register or only updates. Default value is Full. */
                    type?: components["schemas"]["RegisterDocument"];
                };
                header?: never;
                path: {
                    /** @description ID of the register. */
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
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ProblemDetails"];
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
        ApiResponseError: {
            errorType?: components["schemas"]["ApiResponseErrorType"];
            errorMessages?: string[] | null;
        };
        /** @enum {string} */
        ApiResponseErrorType: "ValidationError" | "AuthenticationError" | "ConnectivityError" | "GenericError";
        Field: {
            name?: string | null;
            description?: string | null;
            type?: string | null;
            typeInfo?: components["schemas"]["FieldTypeInfo"];
            value?: unknown;
            values?: components["schemas"]["Field"][][] | null;
        };
        FieldTypeInfo: {
            currencyCode?: string | null;
        };
        /**
         * @description The order in which interests endpoints should return results.
         * @enum {string}
         */
        InterestsSortOrder: "PublishingDateDescending" | "CategoryAscending";
        /** @description HATEOAS Link for retrieving related information to a response or object. */
        Link: {
            /** @description Relationship of the link to the object requested. */
            rel?: string | null;
            /** @description A complete URL that shows how the action can be performed. */
            href?: string | null;
            /** @description Request method of the link. */
            method?: string | null;
        };
        /** @description Member of Parliament who has registered the interest. */
        Member: {
            /**
             * Format: int32
             * @description ID of the member.
             */
            id?: number;
            /** @description Member's current full name, as it should be displayed in text. */
            nameDisplayAs?: string | null;
            /** @description Member's current name in the format {surname}, {forename}, for use in an ordered list. */
            nameListAs?: string | null;
            /** @description The name of the House the Member is currently associated with. */
            house?: string | null;
            /** @description Constituency of Commons Members. */
            memberFrom?: string | null;
            /** @description Party the Member is currently associated with. */
            party?: string | null;
            /** @description A list of HATEOAS Links for retrieving further information about this member. */
            links?: components["schemas"]["Link"][] | null;
        };
        ObjectApiResponse: {
            error?: components["schemas"]["ApiResponseError"];
            response?: unknown;
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
        /** @description Category an interest can be registered with. */
        PublishedCategory: {
            /**
             * Format: int32
             * @description ID of the category.
             */
            id?: number;
            /** @description Number of the category in the code of conduct. */
            number?: string | null;
            /** @description Name of the category. */
            name?: string | null;
            /** @description The unique ID for any parent category to which this category is associated, if the category is associated with another category. */
            parentCategoryIds?: number[] | null;
            type?: components["schemas"]["RegisterType"];
            /** @description A list of HATEOAS Links for retrieving further information about this category. */
            links?: components["schemas"]["Link"][] | null;
        };
        /** @description Paginated search result with HATEOAS Links. */
        PublishedCategoryApiLinkedSearchResult: {
            /**
             * Format: int32
             * @description The skip value that was used in the query.
             */
            skip?: number;
            /**
             * Format: int32
             * @description The take value that was used in the query.
             */
            take?: number;
            /**
             * Format: int32
             * @description The total number of results which matches the query.
             */
            totalResults?: number;
            /** @description The list of items found for the specified page (by requested skip and take). */
            items?: components["schemas"]["PublishedCategory"][] | null;
            /** @description A list of HATEOAS Links for navigating through the paginated result. */
            links?: components["schemas"]["Link"][] | null;
        };
        /** @description Version of an interest which has been published. */
        PublishedInterest: {
            /**
             * Format: int32
             * @description ID of the interest.
             */
            id?: number;
            /** @description Title Summary for the interest. */
            summary?: string | null;
            /**
             * Format: int32
             * @description The unique ID for the payer (parent interest) to which this payment (child interest) is associated.
             */
            parentInterestId?: number | null;
            /**
             * Format: date
             * @description Registration Date on the published interest.
             */
            registrationDate?: string | null;
            /**
             * Format: date
             * @description Date when the interest was first published.
             */
            publishedDate?: string | null;
            /** @description A list of dates on which the interest has been updated since it has been published. */
            updatedDates?: string[] | null;
            category?: components["schemas"]["PublishedCategory"];
            member?: components["schemas"]["Member"];
            /** @description List of fields which are available for a member to add further information about the interest. */
            fields?: components["schemas"]["Field"][] | null;
            /** @description List of Interests which are sub interests of this interest. This property is only present if `ExpandChildInterests` is true, and is not defined by default. */
            childInterests?: components["schemas"]["PublishedInterest"][] | null;
            /** @description A list of HATEOAS Links for retrieving related information about this interest. */
            links?: components["schemas"]["Link"][] | null;
            /** @description Whether the interest has been rectified (e.g. when the interest was submitted late). */
            rectified?: boolean;
            /** @description The reason that the interest was rectified, or `null` if the interest was not rectified. */
            rectifiedDetails?: string | null;
        };
        /** @description Paginated search result with HATEOAS Links. */
        PublishedInterestApiLinkedSearchResult: {
            /**
             * Format: int32
             * @description The skip value that was used in the query.
             */
            skip?: number;
            /**
             * Format: int32
             * @description The take value that was used in the query.
             */
            take?: number;
            /**
             * Format: int32
             * @description The total number of results which matches the query.
             */
            totalResults?: number;
            /** @description The list of items found for the specified page (by requested skip and take). */
            items?: components["schemas"]["PublishedInterest"][] | null;
            /** @description A list of HATEOAS Links for navigating through the paginated result. */
            links?: components["schemas"]["Link"][] | null;
        };
        /** @description A published version of a register of interests. */
        PublishedRegister: {
            /**
             * Format: int32
             * @description ID of the register.
             */
            id?: number;
            /**
             * Format: date
             * @description Date when the Register was published.
             */
            publishedDate?: string;
            type?: components["schemas"]["RegisterType"];
            /** @description A list of HATEOAS Links for retrieving related information about this register. */
            links?: components["schemas"]["Link"][] | null;
        };
        /** @description Paginated search result with HATEOAS Links. */
        PublishedRegisterApiLinkedSearchResult: {
            /**
             * Format: int32
             * @description The skip value that was used in the query.
             */
            skip?: number;
            /**
             * Format: int32
             * @description The take value that was used in the query.
             */
            take?: number;
            /**
             * Format: int32
             * @description The total number of results which matches the query.
             */
            totalResults?: number;
            /** @description The list of items found for the specified page (by requested skip and take). */
            items?: components["schemas"]["PublishedRegister"][] | null;
            /** @description A list of HATEOAS Links for navigating through the paginated result. */
            links?: components["schemas"]["Link"][] | null;
        };
        /**
         * @description Whether a document contains the full register or only updates
         * @enum {string}
         */
        RegisterDocument: "Full" | "Updated";
        /**
         * @description The type of register of interests
         * @enum {string}
         */
        RegisterType: "Commons";
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

