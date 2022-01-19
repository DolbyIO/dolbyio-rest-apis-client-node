export interface CartesianCoordinates {
    x: number;
    y: number;
    z: number;
}

export interface SpatialEnvironment {
    scale: CartesianCoordinates;
    forward: CartesianCoordinates;
    up: CartesianCoordinates;
    right: CartesianCoordinates;
}

export interface SpatialListener {
    position: CartesianCoordinates;
    direction: CartesianCoordinates;
}

export interface SpatialUsers {
    [externalId: string]: CartesianCoordinates;
}
