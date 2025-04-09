import { BaseResponse } from "@/types/responseTypes/baseResponse";

export function mapToType<T>(jsonData: any): T {
    return jsonData as T;
}

export function mapListToType<T>(jsonData: any[]): T[] {
    return jsonData.map(item => item as T);
}

export function mapToBaseResponse<T>(response: any): BaseResponse<T> {
    return {
        status: response.status || "error",
        message: response.message || "An unknown error occurred.",
        data: response.data as T
    };
}