export class GemeniApiError extends Error {}

export class GemeniApiKeyError extends GemeniApiError {}
export class GemeniJsonParsingError extends GemeniApiError {}
export class RestaurantParamsParsingError extends GemeniApiError {}
