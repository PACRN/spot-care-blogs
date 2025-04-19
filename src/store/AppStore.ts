import { create } from "zustand";
import { Cares, CareTypes } from '../types/CareTypes';

type State = {
    careTypes: Cares[];
    loading: boolean;
    profileImage: string;
    isWishlistLoaded: boolean;
}

type Action = {
    setCareTypes: (cares: Cares[]) => void;
    setLoader: (isLoading: boolean) => void;
    setProfileImage: (image: string) => void;
    setIsWishlistLoaded: (isWishlistLoaded: boolean) => void;
}

const appStore = create<State & Action>((set) => ({
    originalSet: [],
    filteredPaginatedList: [],
    savedProviderList: [],
    careTypes: [],
    loading: false,
    providersList: [],
    filters: null,
    paginationDetails: {
        total: 0,
        currentPage: 0,
        totalPages: 0,
    },
    userDetail: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        token: ''
    },
    profileImage: '',
    isWishlistLoaded: false,
    setProfileImage: (image) => set({ profileImage: image }),

    setCareTypes: (cares) => set({ careTypes: cares }),
    setLoader: (isLoading) => set({ loading: isLoading }),
    setIsWishlistLoaded: (loading) => set({ isWishlistLoaded: loading })
}))

export default appStore;