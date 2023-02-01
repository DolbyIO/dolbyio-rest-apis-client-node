export interface IceServer {
    urls: string[];

    userName: string;

    credential: string;
}

export interface SubscribeResponse {
    urls: string[];

    jwt: string;

    iceServers: IceServer[];

    streamAccountId: string;
}

export interface PublishResponse extends SubscribeResponse {
    subscribeRequiresAuth: boolean;
}
