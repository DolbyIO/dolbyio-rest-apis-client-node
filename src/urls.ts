export interface Hostnames {
    api?: string;
    rts?: string;
    rtsDirector?: string;
    mapi?: string;
}

const hostnames: Hostnames = {
    api: 'api.dolby.io',

    rts: 'api.millicast.com',
    rtsDirector: 'director.millicast.com',

    mapi: 'api.dolby.com',
};

export const initialize = (newHostnames: Hostnames): void => {
    Object.assign(hostnames, newHostnames);
};

export const getApiHostname = (): string => {
    return hostnames.api;
};

export const getRtsHostname = (): string => {
    return hostnames.rts;
};

export const getRtsDirectorHostname = (): string => {
    return hostnames.rtsDirector;
};

export const getMapiHostname = (): string => {
    return hostnames.mapi;
};
