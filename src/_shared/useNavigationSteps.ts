import {useNavigate, useParams} from "react-router";
import {IForm} from "./interfaces/IFormField.ts";
import {useMemo} from "react";
import {EPages} from "./interfaces/IPages.ts";

interface INavigationStepsReturn {
    active: number;
    handleNavigation: (direction: ENavigationDirection) => void;
    isLastPage: boolean;
    isFirstPage: boolean;
    currentPage?: IForm;
}

interface IPageInfo {
    currentPageIndex: number;
    currentPage?: IForm;
    isLastPage: boolean;
    isFirstPage: boolean;
}

export enum ENavigationDirection {
    next = 'next',
    prev = 'prev'
}


export function useNavigationSteps(pages: IForm[]): INavigationStepsReturn {
    const {pageId} = useParams<{ pageId: string }>();
    const navigate = useNavigate();

    const pageInfo = useMemo<IPageInfo>(() => {
        const currentPageIndex = pages.findIndex((p) => p.id === pageId);
        return {
            currentPageIndex,
            currentPage: pages[currentPageIndex],
            isLastPage: currentPageIndex === pages.length - 1,
            isFirstPage: currentPageIndex === 0
        };
    }, [pages, pageId]);

    const {isFirstPage, isLastPage, currentPageIndex, currentPage} = pageInfo;

    const nextStep = () => {
        if (!isLastPage) {
            const nextPage = pages[currentPageIndex + 1];
            navigate(`/${EPages.form}/${nextPage.id}`);
        }
    };

    const prevStep = () => {
        if (!isFirstPage) {
            const prevPage = pages[currentPageIndex - 1];
            navigate(`/${EPages.form}/${prevPage.id}`)
        }
    };

    const handleNavigation = (direction: ENavigationDirection) => {
        switch (direction) {
            case ENavigationDirection.next:
                nextStep();
                break;

            case ENavigationDirection.prev:
                prevStep();
                break;
        }
    };

    return {
        active: currentPageIndex,
        handleNavigation,
        isLastPage,
        isFirstPage,
        currentPage,
    };
}