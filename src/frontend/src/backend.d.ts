import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    customerName: string;
    status: string;
    issueDescription: string;
    preferredDate: string;
    deviceType: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllAppointments(): Promise<Array<[Principal, string, Appointment]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyAppointments(): Promise<Array<Appointment>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    requestAppointment(customerName: string, deviceType: string, issueDescription: string, preferredDate: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
