import '../../stencil.core';
export declare class LoadingContentTag {
    state: string;
    progress: number;
    visible: boolean;
    current: number;
    total: number;
    containerWidth: number;
    containerHeight: number;
    componentDidLoad(): void;
    changeState: (event: any) => void;
    render(): JSX.Element;
}
