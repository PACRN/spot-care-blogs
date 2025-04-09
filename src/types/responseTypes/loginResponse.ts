export interface LoginResponse {
    id: number,
    token?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    profilePicture?: string;
}