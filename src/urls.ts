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

export const initialize = (newHostnames: Hostnames) => {
    Object.assign(hostnames, newHostnames);
};

export const getApiHostname = () => {
    return hostnames.api;
};

export const getCommsHostname = (region?: string) => {
    return region ? `${region}.${hostnames.comms}` : hostnames.comms;
};

export const getCommsSessionHostname = () => {
    return hostnames.commsSession;
};

export const getRtsHostname = () => {
    return hostnames.rts;
};

export const getRtsDirectorHostname = () => {
    return hostnames.rtsDirector;
};

export const getMapiHostname = () => {
    return hostnames.mapi;
};
