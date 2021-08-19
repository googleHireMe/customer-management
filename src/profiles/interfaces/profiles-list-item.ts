import { FileType } from "../../customer-profiles/interfaces/file-type";

export interface ProfilesListItem {
    title: string;
    emails: string[];
    emailSchedule: string[];
    includedPricelists: string[];
    fileType: FileType;
    id: string;
    margin: number;
    isActive: boolean;
}