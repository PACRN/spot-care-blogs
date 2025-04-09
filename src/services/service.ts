
import { mapListToType } from "@/utilities/mapper";
import { Endpoint } from "./endpoint";
import { EndpointConstants } from "@/constants/EndpointConstants";
import { Cares } from "@/types/CareTypes";

export const Services = {
    LoadCareTypes: async () => {
        let result = await Endpoint.get(EndpointConstants.MsAllCategories);
        return mapListToType<Cares>(result["data"] ?? []).sort((a, b) => a.name.localeCompare(b.name));
    }
}