class Urls {
    #API_HOSTNAME = 'api.dolby.io';
    #COMMS_HOSTNAME = 'comms.api.dolby.io';
    #COMMS_SESSION_HOSTNAME = 'session.voxeet.com';

    #RTS_HOSTNAME = 'api.millicast.com';
    #RTS_DIRECTOR_HOSTNAME = 'director.millicast.com';

    #MAPI_HOSTNAME = 'api.dolby.com';

    setApiHostname(value: string) {
        this.#API_HOSTNAME = value;
    }

    getApiHostname() {
        return this.#API_HOSTNAME;
    }

    setCommsHostname(value: string) {
        this.#COMMS_HOSTNAME = value;
    }

    getCommsHostname(region?: string) {
        return region ? `${region}.${this.#COMMS_HOSTNAME}` : this.#COMMS_HOSTNAME;
    }

    setCommsSessionHostname(value: string) {
        this.#COMMS_SESSION_HOSTNAME = value;
    }

    getCommsSessionHostname() {
        return this.#COMMS_SESSION_HOSTNAME;
    }

    getRtsHostname() {
        return this.#RTS_HOSTNAME;
    }

    getRtsDirectorHostname() {
        return this.#RTS_DIRECTOR_HOSTNAME;
    }

    getMapiHostname() {
        return this.#MAPI_HOSTNAME;
    }
}

export default new Urls();
