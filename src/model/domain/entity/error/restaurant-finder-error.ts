export class RestaurantFinderError extends Error {}

export class RestaurantFinderNoCodeError extends RestaurantFinderError {}
export class RestaurantFinderCodeIsNotString extends RestaurantFinderError {}
export class RestaurantFinderCodeInvalid extends RestaurantFinderError {}

export class RestaurantFinderMessageInvalid extends RestaurantFinderError {}
export class RestaurantFinderNoMessage extends RestaurantFinderError {}
