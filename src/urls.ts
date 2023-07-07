export interface Hostnames {
    api?: string;
    comms?: string;
    commsSession?: string;
    rts?: string;
    rtsDirector?: string;
    mapi?: string;
}

const hostnames: Hostnames = {
    api: 'api.dolby.io',
    comms: 'comms.api.dolby.io',
    commsSession: 'session.voxeet.com',

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

export const getCommsHostname = (region?: string): string => {
    return region ? `${region}.${hostnames.comms}` : hostnames.comms;
};

export const getCommsSessionHostname = (): string => {
    return hostnames.commsSession;
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
