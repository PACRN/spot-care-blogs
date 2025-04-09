import { Cares } from "@/types/CareTypes";
import { create } from "zustand";

type State = {
    careTypes: Cares[];
}

type Action = {
    setCareTypes: (cares: Cares[]) => void;
}

const appStore = create<State & Action>((set) => ({
    careTypes: [],
    setCareTypes: (cares) => set({ careTypes: cares }),
}));

export default appStore;