import {IForm} from "../../_shared";
import {INavigationStep} from "..";


export const createNavigationSteps = (pages: IForm[]): INavigationStep[] => {
    return pages.map(page => ({
        id: page.id,
        label: page.navigationLabel,
        description: page.description
    }));
};