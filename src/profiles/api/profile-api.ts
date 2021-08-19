import { CustomerDependentApi } from "../../customers/api/customer-dependent-api";
import { Profile } from "../interfaces/profile";
import { ProfilesListItem } from "../interfaces/profiles-list-item";

export const profileApi = new CustomerDependentApi<Profile, ProfilesListItem>('api/customers', 'profiles');