import { Permission } from './permission';

export default interface Participant {
    externalId: string;
    permissions: Array<Permission>;
    notify: boolean;
}
