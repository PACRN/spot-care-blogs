export type CareTypes =
    {
        CategoryId: number;
        CategoryName: string;
        CategoryGroupName: string;
        ParentCategoryId: number;
        CategoryDescription: string;
        CategoryIconAttribute: string;
        CategoryButtonText: string;
        ParentCategoryDescription: string;
        ParentCategoryIconAttribute: string;

        name: string;
        careTypes: []

    };


export type Cares = {
    name: string
    careTypes: string[]
}
